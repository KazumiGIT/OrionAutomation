"""
Orion Automation — Blog API (FastAPI)
=====================================
REST API for fetching blog posts from Supabase.

Run locally:
  cd d:/CODE/Orion_Automation_Website
  uvicorn backend.main:app --reload --port 8000

Endpoints:
  GET /api/blogs          - List all blogs (paginated)
  GET /api/blogs/{id}     - Get single blog by ID
  GET /api/blogs/slug/{slug} - Get single blog by slug
"""

import os
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from supabase import create_client, Client

# Load .env from project root
load_dotenv(Path(__file__).parent.parent / ".env")

SUPABASE_URL = os.environ.get("VITE_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
# For read-only API we can use the anon key (public reads are allowed via RLS)
SUPABASE_KEY = os.environ.get("VITE_SUPABASE_ANON_KEY") or os.environ.get("SUPABASE_ANON_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(
    title="Orion Blog API",
    description="API for Orion Automation's AI-generated daily blog",
    version="1.0.0"
)

# ─── CORS ─────────────────────────────────────────────────────────────────────
# Allow requests from the React frontend (localhost in dev, your domain in prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://orionautomation.xyz",
        "https://www.orionautomation.xyz",
    ],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "Orion Blog API is running 🚀"}


@app.get("/api/blogs")
def list_blogs(
    page: int = Query(default=1, ge=1, description="Page number"),
    limit: int = Query(default=9, ge=1, le=50, description="Posts per page"),
):
    """
    Returns a paginated list of published blog posts, newest first.
    """
    offset = (page - 1) * limit

    try:
        # Get total count
        count_resp = supabase.table("blog_posts").select("id", count="exact").execute()
        total = count_resp.count or 0

        # Get paginated results
        resp = (
            supabase.table("blog_posts")
            .select("id, title, excerpt, image_url, slug, published_at")
            .order("published_at", desc=True)
            .range(offset, offset + limit - 1)
            .execute()
        )

        return {
            "posts": resp.data,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/blogs/slug/{slug}")
def get_blog_by_slug(slug: str):
    """Returns a single blog post by its URL slug."""
    try:
        resp = (
            supabase.table("blog_posts")
            .select("*")
            .eq("slug", slug)
            .single()
            .execute()
        )
        if not resp.data:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return resp.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/blogs/{post_id}")
def get_blog_by_id(post_id: str):
    """Returns a single blog post by its UUID."""
    try:
        resp = (
            supabase.table("blog_posts")
            .select("*")
            .eq("id", post_id)
            .single()
            .execute()
        )
        if not resp.data:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return resp.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
