"""
Orion Automation — AI Blog Generator
=====================================
This script uses Google Gemini AI to:
1. Generate a blog post title (relevant to Orion Automation services)
2. Generate the full blog body in Markdown
3. Generate a cover image using Gemini Imagen
4. Upload the image to Supabase Storage
5. Insert the blog record into Supabase blog_posts table

Run manually:  python backend/generate_blog.py
Or automated:  Called daily by GitHub Actions
"""

import os
import re
import uuid
import base64
import datetime
import sys
from pathlib import Path

# Load .env from project root (one level up from backend/)
from dotenv import load_dotenv
root_dir = Path(__file__).parent.parent
load_dotenv(root_dir / ".env")

import google.generativeai as genai
from supabase import create_client, Client

# ─── Configuration ────────────────────────────────────────────────────────────

GEMINI_API_KEY = os.environ.get("VITE_GEMINI_API_KEY") or os.environ.get("GEMINI_API_KEY")
SUPABASE_URL   = os.environ.get("VITE_SUPABASE_URL")   or os.environ.get("SUPABASE_URL")
SUPABASE_KEY   = os.environ.get("SUPABASE_SERVICE_KEY")  # Service role key (backend only)

if not all([GEMINI_API_KEY, SUPABASE_URL, SUPABASE_KEY]):
    print("❌  Missing required environment variables:")
    if not GEMINI_API_KEY: print("   - VITE_GEMINI_API_KEY (or GEMINI_API_KEY)")
    if not SUPABASE_URL:   print("   - VITE_SUPABASE_URL (or SUPABASE_URL)")
    if not SUPABASE_KEY:   print("   - SUPABASE_SERVICE_KEY")
    sys.exit(1)

genai.configure(api_key=GEMINI_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

IMAGE_BUCKET = "blog-images"

# ─── Blog Topics ──────────────────────────────────────────────────────────────
# Orion Automation covers: AI automation, web development, digital marketing
# Each run picks a fresh angle. Gemini decides the specific title.

BLOG_TOPICS = [
    "AI automation for Malaysian small businesses",
    "web design trends that increase conversions",
    "how to use AI chatbots to improve customer service",
    "digital marketing strategies for local businesses in Malaysia",
    "automating repetitive business tasks with AI",
    "why your business needs a mobile-first website in 2025",
    "email marketing automation tips for higher open rates",
    "SEO strategies for Malaysian businesses to rank on Google",
    "how AI is transforming the way businesses operate",
    "social media automation: saving time while growing your brand",
    "the future of e-commerce in Malaysia",
    "how to generate leads online using automation",
    "building a professional brand online without a big budget",
    "why website speed matters for your business growth",
    "using AI tools to create content faster",
]

import random
today_seed = datetime.date.today().toordinal()
random.seed(today_seed)
selected_topic = random.choice(BLOG_TOPICS)

# ─── Step 1: Generate Blog Post (Title + Body) ────────────────────────────────

def generate_blog_text(topic: str) -> dict:
    """Ask Gemini to generate a complete blog post."""
    print(f"🤖  Generating blog post about: {topic}")

    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""You are a professional content writer for Orion Automation, a Malaysian digital agency 
specializing in AI automation, web development, and digital marketing.

Write a high-quality, SEO-optimized blog post on the following topic:
"{topic}"

Format your response as plain text with these exact sections separated by ---:
TITLE: [an engaging, specific blog post title — max 10 words]
---
EXCERPT: [a 1-2 sentence summary of the post for previews — max 30 words]
---
BODY:
[Full blog post body in Markdown format. 
- Length: 500-700 words
- Use ## for section headings
- Use bullet points where appropriate
- Write in a professional but approachable tone
- Include practical tips relevant to Malaysian businesses
- End with a call to action mentioning Orion Automation
- Do NOT include the title at the top of the body]
"""

    response = model.generate_content(prompt)
    raw = response.text.strip()

    # Parse the structured response
    try:
        parts = raw.split("---")
        title_line = [p.strip() for p in parts if p.strip().startswith("TITLE:")][0]
        excerpt_line = [p.strip() for p in parts if p.strip().startswith("EXCERPT:")][0]
        body_parts = [p.strip() for p in parts if p.strip().startswith("BODY:")]

        title = title_line.replace("TITLE:", "").strip()
        excerpt = excerpt_line.replace("EXCERPT:", "").strip()
        body = body_parts[0].replace("BODY:", "").strip() if body_parts else ""

    except Exception:
        # Fallback: use full response as body
        lines = raw.split("\n")
        title = lines[0].strip("# ").strip() if lines else topic
        excerpt = " ".join(raw.split()[:25]) + "..."
        body = raw

    print(f"✅  Title: {title}")
    return {"title": title, "excerpt": excerpt, "body": body}


# ─── Step 2: Generate Cover Image ─────────────────────────────────────────────

def generate_blog_image(title: str) -> bytes | None:
    """
    Use Gemini Imagen to generate a cover image.
    Falls back to a descriptive prompt if Imagen is unavailable.
    """
    print(f"🎨  Generating cover image for: {title}")

    try:
        imagen = genai.ImageGenerationModel("imagen-3.0-generate-002")
        image_prompt = (
            f"Professional blog cover image for an article titled '{title}'. "
            "Modern flat design, digital technology theme, gold and amber color palette, "
            "clean minimalist layout, suitable for a Malaysian business website. "
            "No text in the image."
        )
        result = imagen.generate_images(
            prompt=image_prompt,
            number_of_images=1,
            aspect_ratio="16:9",
            safety_filter_level="block_some",
            person_generation="dont_allow",
        )
        image_bytes = result.images[0]._image_bytes
        print("✅  Image generated via Imagen 3")
        return image_bytes

    except Exception as e:
        print(f"⚠️   Imagen unavailable ({e}), using placeholder image URL instead")
        return None


# ─── Step 3: Upload Image to Supabase Storage ─────────────────────────────────

def upload_image_to_supabase(image_bytes: bytes, filename: str) -> str:
    """Upload image bytes to Supabase Storage and return the public URL."""
    print(f"☁️   Uploading image: {filename}")

    try:
        supabase.storage.from_(IMAGE_BUCKET).upload(
            path=filename,
            file=image_bytes,
            file_options={"content-type": "image/png", "upsert": "true"},
        )
        public_url = supabase.storage.from_(IMAGE_BUCKET).get_public_url(filename)
        print(f"✅  Image URL: {public_url}")
        return public_url
    except Exception as e:
        print(f"❌  Image upload failed: {e}")
        return ""


# ─── Step 4: Create Slug from Title ───────────────────────────────────────────

def slugify(text: str) -> str:
    """Convert a title to a URL-safe slug."""
    slug = text.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"[\s]+", "-", slug.strip())
    slug = re.sub(r"-+", "-", slug)
    date_prefix = datetime.date.today().strftime("%Y%m%d")
    return f"{date_prefix}-{slug[:60]}"


# ─── Step 5: Insert Blog Post into Supabase ───────────────────────────────────

def save_blog_to_supabase(title: str, body: str, excerpt: str, image_url: str) -> str:
    """Insert blog post into Supabase and return the post ID."""
    print("💾  Saving blog post to Supabase...")

    slug = slugify(title)
    now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()

    record = {
        "title": title,
        "body": body,
        "excerpt": excerpt,
        "image_url": image_url,
        "slug": slug,
        "published_at": now_iso,
    }

    try:
        response = supabase.table("blog_posts").insert(record).execute()
        post_id = response.data[0]["id"]
        print(f"✅  Blog saved! ID: {post_id}, Slug: {slug}")
        return post_id
    except Exception as e:
        print(f"❌  Failed to save blog: {e}")
        raise


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("=" * 55)
    print("  Orion Blog Generator — Powered by Gemini AI")
    print(f"  Date: {datetime.date.today().isoformat()}")
    print("=" * 55)

    # 1. Generate blog text
    blog = generate_blog_text(selected_topic)

    # 2. Generate cover image
    image_bytes = generate_blog_image(blog["title"])

    # 3. Upload image (if generated)
    image_url = ""
    if image_bytes:
        filename = f"{slugify(blog['title'])}.png"
        image_url = upload_image_to_supabase(image_bytes, filename)

    # Fallback image if Imagen unavailable (stylish placeholder)
    if not image_url:
        image_url = (
            "https://images.unsplash.com/photo-1677442136019-21780ecad995"
            "?w=1200&q=80&auto=format&fit=crop"
        )

    # 4. Save to Supabase
    post_id = save_blog_to_supabase(
        title=blog["title"],
        body=blog["body"],
        excerpt=blog["excerpt"],
        image_url=image_url,
    )

    print("\n" + "=" * 55)
    print("  ✅  Blog post published successfully!")
    print(f"  📰  Title:    {blog['title']}")
    print(f"  🆔  Post ID:  {post_id}")
    print(f"  🖼️   Image:    {image_url[:60]}...")
    print("=" * 55)


if __name__ == "__main__":
    main()
