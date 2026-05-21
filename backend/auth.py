"""
Auth helpers for the Orion Blog backend.

Admin login takes ADMIN_USERNAME + ADMIN_PASSWORD (env, with defaults). After
a successful POST /api/admin/login the frontend stores the password as a bearer
token and sends it on every authenticated request.

The MCP server is gated separately by the dynamic key managed in backend.keys.
"""

import os
import secrets

from fastapi import Header, HTTPException, status


DEFAULT_ADMIN_USERNAME = "Varakorn"
DEFAULT_ADMIN_PASSWORD = "admin123"


def admin_credentials() -> tuple[str, str]:
    return (
        os.environ.get("ADMIN_USERNAME", DEFAULT_ADMIN_USERNAME),
        os.environ.get("ADMIN_PASSWORD", DEFAULT_ADMIN_PASSWORD),
    )


def require_admin(authorization: str | None = Header(default=None)) -> None:
    _, expected_password = admin_credentials()
    token = _bearer(authorization)
    if not token or not secrets.compare_digest(token, expected_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials.",
            headers={"WWW-Authenticate": "Bearer"},
        )


def verify_admin_login(username: str, password: str) -> bool:
    expected_user, expected_pass = admin_credentials()
    user_ok = secrets.compare_digest(username or "", expected_user)
    pass_ok = secrets.compare_digest(password or "", expected_pass)
    return user_ok and pass_ok


def _bearer(authorization: str | None) -> str | None:
    if not authorization:
        return None
    parts = authorization.split(None, 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    return parts[1].strip()
