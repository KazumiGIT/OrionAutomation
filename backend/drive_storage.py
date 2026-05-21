"""
Google Drive storage adapter for Orion Blog.

Posts are stored as one JSON file per slug in DRIVE_POSTS_FOLDER_ID.
Images are stored in DRIVE_IMAGES_FOLDER_ID (defaults to same folder).

Schema for each post JSON:
{
  "slug":         "ai-chatbots-2026",          # unique URL slug, also the filename ({slug}.json)
  "title":        "...",
  "description":  "...",                        # meta description
  "keywords":     "kw1, kw2, kw3",
  "author":       "Orion Automation Team",
  "category":     "AI Chatbots",
  "readMinutes":  7,
  "publishedAt":  "2026-04-12",                 # ISO date
  "updatedAt":    "2026-05-10",
  "cover":        "#E6A520",                    # accent color
  "coverImage":   "/api/images/abc123",         # optional hero image URL
  "excerpt":      "...",
  "status":       "published" | "draft",
  "sections":     [ {type, ...}, ... ]
}

Setup
-----
1. Create a Google Cloud project, enable the Drive API.
2. Create a service account and download its JSON key.
3. Share your Drive folder with the service account email (Editor role).
4. Set env vars:
     GOOGLE_SERVICE_ACCOUNT_JSON   absolute path to the JSON key file
     DRIVE_POSTS_FOLDER_ID         folder id from the share URL
     DRIVE_IMAGES_FOLDER_ID        (optional, defaults to DRIVE_POSTS_FOLDER_ID)
"""

from __future__ import annotations

import io
import json
import os
import threading
import time
from typing import Any

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload, MediaIoBaseUpload

SCOPES = ["https://www.googleapis.com/auth/drive"]

POST_MIME = "application/json"


def _build_service():
    key_path = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
    if not key_path or not os.path.exists(key_path):
        raise RuntimeError(
            "GOOGLE_SERVICE_ACCOUNT_JSON env var must point to a valid service account JSON file."
        )
    creds = service_account.Credentials.from_service_account_file(key_path, scopes=SCOPES)
    return build("drive", "v3", credentials=creds, cache_discovery=False)


class DriveStorage:
    """Thread-safe Google Drive blog storage with a short in-memory cache for the post index."""

    def __init__(self, posts_folder: str | None = None, images_folder: str | None = None):
        self.posts_folder = posts_folder or os.environ.get("DRIVE_POSTS_FOLDER_ID")
        self.images_folder = (
            images_folder
            or os.environ.get("DRIVE_IMAGES_FOLDER_ID")
            or self.posts_folder
        )
        if not self.posts_folder:
            raise RuntimeError("DRIVE_POSTS_FOLDER_ID env var is required.")

        self._service = _build_service()
        self._lock = threading.Lock()
        # Cached: slug -> (drive_file_id, post_dict). TTL on full list refresh.
        self._index: dict[str, tuple[str, dict]] | None = None
        self._index_loaded_at: float = 0.0
        self._index_ttl_seconds = 30.0

    # ─── Index / list ─────────────────────────────────────────────────────────

    def _load_index(self, force: bool = False) -> None:
        now = time.time()
        if (
            not force
            and self._index is not None
            and (now - self._index_loaded_at) < self._index_ttl_seconds
        ):
            return

        with self._lock:
            # Re-check after acquiring lock
            now = time.time()
            if (
                not force
                and self._index is not None
                and (now - self._index_loaded_at) < self._index_ttl_seconds
            ):
                return

            index: dict[str, tuple[str, dict]] = {}
            page_token = None
            query = (
                f"'{self.posts_folder}' in parents and "
                f"mimeType='{POST_MIME}' and trashed=false"
            )
            while True:
                resp = self._service.files().list(
                    q=query,
                    spaces="drive",
                    fields="nextPageToken, files(id, name)",
                    pageToken=page_token,
                    pageSize=100,
                ).execute()
                for f in resp.get("files", []):
                    name = f["name"]
                    if not name.endswith(".json"):
                        continue
                    slug = name[:-5]
                    try:
                        post = self._download_json(f["id"])
                    except Exception as e:
                        print(f"⚠️   Skipping unreadable post {name}: {e}")
                        continue
                    # Normalize slug
                    post.setdefault("slug", slug)
                    index[post["slug"]] = (f["id"], post)
                page_token = resp.get("nextPageToken")
                if not page_token:
                    break
            self._index = index
            self._index_loaded_at = time.time()

    def _invalidate(self) -> None:
        self._index = None
        self._index_loaded_at = 0.0

    # ─── CRUD ─────────────────────────────────────────────────────────────────

    def list_posts(self, include_drafts: bool = False) -> list[dict]:
        self._load_index()
        posts = [p for (_id, p) in self._index.values()]
        if not include_drafts:
            posts = [p for p in posts if p.get("status", "published") == "published"]
        posts.sort(key=lambda p: p.get("publishedAt") or "", reverse=True)
        return posts

    def get_post(self, slug: str, include_drafts: bool = False) -> dict | None:
        self._load_index()
        entry = self._index.get(slug)
        if not entry:
            return None
        post = entry[1]
        if not include_drafts and post.get("status", "published") != "published":
            return None
        return post

    def save_post(self, post: dict) -> dict:
        slug = post.get("slug")
        if not slug:
            raise ValueError("post.slug is required")

        post.setdefault("status", "draft")
        post.setdefault("sections", [])

        self._load_index()
        existing = self._index.get(slug)
        filename = f"{slug}.json"
        body_bytes = json.dumps(post, ensure_ascii=False, indent=2).encode("utf-8")
        media = MediaIoBaseUpload(io.BytesIO(body_bytes), mimetype=POST_MIME, resumable=False)

        if existing:
            file_id = existing[0]
            self._service.files().update(fileId=file_id, media_body=media).execute()
        else:
            metadata = {"name": filename, "parents": [self.posts_folder], "mimeType": POST_MIME}
            created = self._service.files().create(
                body=metadata, media_body=media, fields="id"
            ).execute()
            file_id = created["id"]

        self._invalidate()
        return post

    def delete_post(self, slug: str) -> bool:
        self._load_index()
        entry = self._index.get(slug)
        if not entry:
            return False
        file_id = entry[0]
        self._service.files().delete(fileId=file_id).execute()
        self._invalidate()
        return True

    # ─── Images ───────────────────────────────────────────────────────────────

    def upload_image(self, *, filename: str, content: bytes, mime: str) -> dict:
        """Upload an image to the images folder. Returns {id, name, mime}."""
        metadata = {"name": filename, "parents": [self.images_folder], "mimeType": mime}
        media = MediaIoBaseUpload(io.BytesIO(content), mimetype=mime, resumable=False)
        created = self._service.files().create(
            body=metadata, media_body=media, fields="id, name, mimeType"
        ).execute()
        return {"id": created["id"], "name": created["name"], "mime": created["mimeType"]}

    def download_image(self, file_id: str) -> tuple[bytes, str]:
        """Download an image by Drive file id. Returns (bytes, mime)."""
        meta = self._service.files().get(fileId=file_id, fields="mimeType, name").execute()
        mime = meta.get("mimeType", "application/octet-stream")
        request = self._service.files().get_media(fileId=file_id)
        buf = io.BytesIO()
        downloader = MediaIoBaseDownload(buf, request)
        done = False
        while not done:
            _, done = downloader.next_chunk()
        return buf.getvalue(), mime

    def list_images(self, limit: int = 100) -> list[dict]:
        query = (
            f"'{self.images_folder}' in parents and "
            f"mimeType contains 'image/' and trashed=false"
        )
        resp = self._service.files().list(
            q=query,
            spaces="drive",
            fields="files(id, name, mimeType, createdTime)",
            pageSize=limit,
            orderBy="createdTime desc",
        ).execute()
        return resp.get("files", [])

    # ─── Internal helpers ─────────────────────────────────────────────────────

    def _download_json(self, file_id: str) -> dict:
        request = self._service.files().get_media(fileId=file_id)
        buf = io.BytesIO()
        downloader = MediaIoBaseDownload(buf, request)
        done = False
        while not done:
            _, done = downloader.next_chunk()
        return json.loads(buf.getvalue().decode("utf-8"))


# Module-level singleton (lazy)
_storage_instance: DriveStorage | None = None


def get_storage() -> DriveStorage:
    global _storage_instance
    if _storage_instance is None:
        _storage_instance = DriveStorage()
    return _storage_instance
