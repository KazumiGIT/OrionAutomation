// Thin API client for the Orion blog backend.
//
// Set VITE_API_URL in your .env to point at the backend. Falls back to
// http://localhost:8000 for local dev.

const RAW_BASE =
    (import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:8000';
export const API_BASE = RAW_BASE.replace(/\/+$/, '');

const TOKEN_KEY = 'orion_admin_token';

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);
export const setAdminToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearAdminToken = () => localStorage.removeItem(TOKEN_KEY);

/** Turn a relative /api/images path into an absolute URL the browser can fetch. */
export const resolveImageUrl = (src) => {
    if (!src) return src;
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith('/')) return `${API_BASE}${src}`;
    return src;
};

async function request(path, { method = 'GET', body, admin = false, formData } = {}) {
    const headers = {};
    if (admin) {
        const token = getAdminToken();
        if (!token) {
            const err = new Error('Not signed in as admin');
            err.status = 401;
            throw err;
        }
        headers.Authorization = `Bearer ${token}`;
    }

    let payload;
    if (formData) {
        payload = formData;
    } else if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
        payload = JSON.stringify(body);
    }

    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: payload,
    });

    if (!res.ok) {
        let detail;
        try {
            detail = (await res.json()).detail;
        } catch {
            detail = await res.text();
        }
        const err = new Error(detail || `Request failed (${res.status})`);
        err.status = res.status;
        throw err;
    }

    if (res.status === 204) return null;
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
}

// ─── Public ───────────────────────────────────────────────────────────────────

export const listPosts = () => request('/api/blogs');
export const getPost = (slug) => request(`/api/blogs/${encodeURIComponent(slug)}`);

// ─── Admin ────────────────────────────────────────────────────────────────────

export const adminLogin = (username, password) =>
    request('/api/admin/login', { method: 'POST', body: { username, password } });

export const adminGetMcpKey = () => request('/api/admin/mcp-key', { admin: true });
export const adminRotateMcpKey = () =>
    request('/api/admin/mcp-key/rotate', { method: 'POST', admin: true });

export const adminListPosts = () => request('/api/admin/blogs', { admin: true });

export const adminGetPost = (slug) =>
    request(`/api/admin/blogs/${encodeURIComponent(slug)}`, { admin: true });

export const adminCreatePost = (post) =>
    request('/api/admin/blogs', { method: 'POST', body: post, admin: true });

export const adminUpdatePost = (slug, post) =>
    request(`/api/admin/blogs/${encodeURIComponent(slug)}`, {
        method: 'PUT',
        body: post,
        admin: true,
    });

export const adminDeletePost = (slug) =>
    request(`/api/admin/blogs/${encodeURIComponent(slug)}`, {
        method: 'DELETE',
        admin: true,
    });

export const adminUploadImage = (file) => {
    const fd = new FormData();
    fd.append('file', file);
    return request('/api/admin/images', { method: 'POST', formData: fd, admin: true });
};

export const adminListImages = () => request('/api/admin/images', { admin: true });
