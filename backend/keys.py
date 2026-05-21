"""
MCP API key store.

The key only exists once the admin generates it from the CMS. It is persisted
in `backend/.mcp_key.json` (gitignored) so it survives restarts and deploys.
"""

from __future__ import annotations

import json
import secrets
import threading
from datetime import datetime, timezone
from pathlib import Path

_KEY_FILE = Path(__file__).parent / ".mcp_key.json"
_lock = threading.Lock()
_cached: dict | None = None


def _load() -> dict | None:
    global _cached
    if _cached is not None:
        return _cached
    if _KEY_FILE.exists():
        try:
            _cached = json.loads(_KEY_FILE.read_text(encoding="utf-8"))
            return _cached
        except Exception:
            return None
    return None


def get_key() -> str | None:
    """Returns the current key, or None if no key has been generated yet."""
    data = _load()
    return (data or {}).get("key")


def get_metadata() -> dict | None:
    """Returns the full record (key + created/rotated timestamps), or None."""
    return _load()


def rotate() -> dict:
    """Generates a new key, persists it, returns the full record."""
    global _cached
    new_key = secrets.token_urlsafe(48)
    record = {
        "key": new_key,
        "createdAt": (_cached or {}).get("createdAt") or _now_iso(),
        "rotatedAt": _now_iso(),
    }
    with _lock:
        _KEY_FILE.write_text(json.dumps(record, indent=2), encoding="utf-8")
        _cached = record
    return record


def is_valid(token: str | None) -> bool:
    """Constant-time comparison against the current key."""
    if not token:
        return False
    current = get_key()
    if not current:
        return False
    return secrets.compare_digest(token, current)


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")
