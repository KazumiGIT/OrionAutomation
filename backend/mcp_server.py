"""
Orion Blog MCP Server (HTTP / Streamable HTTP transport)

Mounted on the FastAPI app at /mcp. Any HTTP-MCP client can connect with:

    Authorization: Bearer <MCP_API_KEY>

and call the tools below to manage blog posts on Google Drive.

The MCP_API_KEY env var gates the entire mount via an ASGI middleware so
unauthenticated clients can't even reach the MCP protocol layer.

Tools exposed
-------------
  list_posts(include_drafts=False)            -> list of summaries
  get_post(slug)                              -> full post
  create_post(...)                            -> creates draft / publishes
  update_post(slug, ...)                      -> partial update
  publish_post(slug)                          -> flips draft to published
  unpublish_post(slug)                        -> flips published to draft
  delete_post(slug)                           -> removes from Drive
  upload_image(filename, base64_data, mime)   -> returns proxy URL ready to embed
"""

from __future__ import annotations

import base64
from datetime import date
from typing import Any

from mcp.server.fastmcp import FastMCP
from starlette.types import ASGIApp, Receive, Scope, Send

from backend import keys
from backend.drive_storage import get_storage

mcp = FastMCP("orion-blog")


# ─── Tools ────────────────────────────────────────────────────────────────────

@mcp.tool()
def list_posts(include_drafts: bool = False) -> list[dict]:
    """List blog posts. Returns summaries (title, slug, status, category, dates)."""
    posts = get_storage().list_posts(include_drafts=include_drafts)
    return [
        {
            "slug": p.get("slug"),
            "title": p.get("title"),
            "status": p.get("status", "published"),
            "category": p.get("category"),
            "excerpt": p.get("excerpt"),
            "publishedAt": p.get("publishedAt"),
            "updatedAt": p.get("updatedAt"),
        }
        for p in posts
    ]


@mcp.tool()
def get_post(slug: str) -> dict:
    """Fetch the full content of a single post, including drafts."""
    post = get_storage().get_post(slug, include_drafts=True)
    if not post:
        raise ValueError(f"Post '{slug}' not found")
    return post


@mcp.tool()
def create_post(
    title: str,
    sections: list[dict],
    slug: str | None = None,
    description: str = "",
    keywords: str = "",
    author: str = "Orion Automation Team",
    category: str = "General",
    read_minutes: int = 5,
    cover: str = "#E6A520",
    cover_image: str | None = None,
    excerpt: str = "",
    status: str = "draft",
) -> dict:
    """
    Create a new blog post.

    Args:
      title:        Article title (required).
      sections:     Article body as a list of section dicts. Each section is
                    one of:
                      {"type": "p", "text": "..."}
                      {"type": "h2", "text": "..."}
                      {"type": "h3", "text": "..."}
                      {"type": "ul", "items": ["...", "..."]}
                      {"type": "ol", "items": ["...", "..."]}
                      {"type": "quote", "text": "...", "cite": "..."}
                      {"type": "cta", "text": "...", "to": "/...", "label": "..."}
                      {"type": "img", "src": "...", "alt": "...", "caption": "..."}
      slug:         URL slug. Auto-generated from title if omitted.
      status:       "draft" (default) or "published".

    Returns the saved post dict.
    """
    if status not in ("draft", "published"):
        raise ValueError("status must be 'draft' or 'published'")

    today = date.today().isoformat()
    final_slug = slug or _slugify(title)
    post = {
        "slug": final_slug,
        "title": title,
        "description": description,
        "keywords": keywords,
        "author": author,
        "category": category,
        "readMinutes": int(read_minutes),
        "publishedAt": today,
        "updatedAt": today,
        "cover": cover,
        "coverImage": cover_image,
        "excerpt": excerpt or description,
        "status": status,
        "sections": sections,
    }
    return get_storage().save_post(post)


@mcp.tool()
def update_post(slug: str, updates: dict) -> dict:
    """
    Patch an existing post. Pass only the fields you want to change.
    Updates the `updatedAt` field automatically.
    """
    storage = get_storage()
    existing = storage.get_post(slug, include_drafts=True)
    if not existing:
        raise ValueError(f"Post '{slug}' not found")
    merged = {**existing, **updates}
    merged["slug"] = slug
    merged["updatedAt"] = date.today().isoformat()
    return storage.save_post(merged)


@mcp.tool()
def publish_post(slug: str) -> dict:
    """Flip a draft to published."""
    return update_post(slug, {"status": "published"})


@mcp.tool()
def unpublish_post(slug: str) -> dict:
    """Flip a published post back to draft."""
    return update_post(slug, {"status": "draft"})


@mcp.tool()
def delete_post(slug: str) -> dict:
    """Permanently delete a post from Drive."""
    ok = get_storage().delete_post(slug)
    if not ok:
        raise ValueError(f"Post '{slug}' not found")
    return {"ok": True, "slug": slug}


@mcp.tool()
def upload_image(filename: str, base64_data: str, mime: str = "image/png") -> dict:
    """
    Upload an image to the configured Drive folder. Returns a dict with:
      url:     proxy URL you can drop directly into a post (e.g. /api/images/abc)
      file_id: Drive file id
      mime:    MIME type stored

    To embed in an article, add an image section:
      {"type": "img", "src": "<url>", "alt": "...", "caption": "..."}
    """
    try:
        content = base64.b64decode(base64_data)
    except Exception as e:
        raise ValueError(f"base64_data is not valid base64: {e}")
    if len(content) > 10 * 1024 * 1024:
        raise ValueError("Image must be under 10 MB")
    safe = filename.strip() or "image"
    info = get_storage().upload_image(filename=safe, content=content, mime=mime)
    return {
        "url": f"/api/images/{info['id']}",
        "file_id": info["id"],
        "mime": info["mime"],
    }


# ─── Slug helper ──────────────────────────────────────────────────────────────

import re as _re
import unicodedata as _ud


def _slugify(text: str) -> str:
    text = _ud.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = _re.sub(r"[^a-z0-9\s-]", "", text)
    text = _re.sub(r"\s+", "-", text.strip())
    text = _re.sub(r"-+", "-", text)
    return text[:80] or "post"


# ─── ASGI bearer-token middleware ─────────────────────────────────────────────

class BearerMiddleware:
    """Reject any request that doesn't carry a valid Authorization: Bearer <MCP key>.

    The expected key is generated by the admin from the CMS and stored by
    backend.keys. Until the admin clicks Generate, MCP is effectively offline.
    """

    def __init__(self, app: ASGIApp):
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        if keys.get_key() is None:
            await _send_json(
                send,
                503,
                {"error": "MCP key has not been generated yet — open the CMS and generate one."},
            )
            return

        headers = dict(scope.get("headers") or [])
        auth = headers.get(b"authorization", b"").decode("latin-1")
        token = _bearer(auth)
        if not keys.is_valid(token):
            await _send_json(send, 401, {"error": "Invalid MCP API key"})
            return

        await self.app(scope, receive, send)


async def _send_json(send: Send, status_code: int, payload: dict) -> None:
    import json as _json
    body = _json.dumps(payload).encode("utf-8")
    await send({
        "type": "http.response.start",
        "status": status_code,
        "headers": [
            (b"content-type", b"application/json"),
            (b"content-length", str(len(body)).encode("latin-1")),
            (b"www-authenticate", b"Bearer"),
        ],
    })
    await send({"type": "http.response.body", "body": body})


def _bearer(authorization: str | None) -> str | None:
    if not authorization:
        return None
    parts = authorization.split(None, 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    return parts[1].strip()


# Build the Streamable-HTTP ASGI app from FastMCP and wrap it with auth.
_inner_app = mcp.streamable_http_app()
mcp_asgi_app = BearerMiddleware(_inner_app)
