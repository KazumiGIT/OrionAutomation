import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAdmin } from '../context/AdminContext';
import {
    adminCreatePost,
    adminDeletePost,
    adminGetMcpKey,
    adminGetPost,
    adminListPosts,
    adminRotateMcpKey,
    adminUpdatePost,
    adminUploadImage,
    API_BASE,
    resolveImageUrl,
} from '../lib/api';
import '../styles/blog.css';
import './AdminBlog.css';

const EMPTY_POST = {
    slug: '',
    title: '',
    description: '',
    keywords: '',
    author: 'Orion Automation Team',
    category: 'General',
    readMinutes: 5,
    cover: '#E6A520',
    coverImage: '',
    excerpt: '',
    status: 'draft',
    sections: [],
};

const SECTION_TYPES = [
    { type: 'p', label: 'Paragraph' },
    { type: 'h2', label: 'Heading' },
    { type: 'h3', label: 'Sub-heading' },
    { type: 'ul', label: 'Bullet list' },
    { type: 'ol', label: 'Numbered list' },
    { type: 'quote', label: 'Pull quote' },
    { type: 'cta', label: 'Call-to-action' },
    { type: 'img', label: 'Image' },
];

const slugify = (text) =>
    (text || '')
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 80);

// ─────────────────────────────────────────────────────────────────────────────
// Login form

const LoginPanel = () => {
    const { login } = useAdmin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <form onSubmit={onSubmit} className="admin-login__card">
                <h1 className="admin-login__title">Admin sign-in</h1>
                <p className="admin-login__sub">
                    Sign in to manage posts and generate MCP API keys.
                </p>
                <label className="admin-field">
                    <span>Username</span>
                    <input
                        type="text"
                        autoFocus
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Varakorn"
                    />
                </label>
                <label className="admin-field">
                    <span>Password</span>
                    <input
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </label>
                {error && <div className="admin-error">{error}</div>}
                <button type="submit" className="blog-btn" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
                <Link to="/blog" className="admin-back">
                    ← Back to blog
                </Link>
            </form>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// API Keys panel

const ApiKeysPanel = () => {
    const [keyData, setKeyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [revealed, setRevealed] = useState(false);
    const [justRotated, setJustRotated] = useState(false);
    const [copied, setCopied] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await adminGetMcpKey();
            setKeyData(data);
        } catch (err) {
            if (err.status === 404 || err.status === undefined || err.status >= 500) {
                setError(
                    'Backend not connected — start the Python API (see backend/SETUP.md) to generate or rotate the MCP key.'
                );
            } else {
                setError(err.message || 'Failed to load key');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const generate = async () => {
        if (
            keyData?.key &&
            !window.confirm(
                'Rotate the MCP API key? Any automation still using the old key will stop working immediately.'
            )
        ) {
            return;
        }
        setBusy(true);
        setError('');
        try {
            const data = await adminRotateMcpKey();
            setKeyData(data);
            setRevealed(true);
            setJustRotated(true);
            setTimeout(() => setJustRotated(false), 4000);
        } catch (err) {
            setError(err.message || 'Failed to generate key');
        } finally {
            setBusy(false);
        }
    };

    const copy = async () => {
        if (!keyData?.key) return;
        try {
            await navigator.clipboard.writeText(keyData.key);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Ignore — older browsers
        }
    };

    const mcpUrl = `${API_BASE}/mcp`;

    return (
        <div className="admin-keys">
            <header className="admin-list__head">
                <div>
                    <h1>API Keys</h1>
                    <p>The MCP API key external automation software uses to publish posts.</p>
                </div>
                <div className="admin-list__actions">
                    <button
                        onClick={generate}
                        disabled={busy}
                        className="blog-btn"
                    >
                        {busy
                            ? 'Generating…'
                            : keyData?.key
                                ? 'Rotate key'
                                : 'Generate key'}
                    </button>
                </div>
            </header>

            {error && <div className="admin-error">{error}</div>}
            {justRotated && (
                <div className="admin-success">
                    New key generated. Copy it now — the old key has stopped working.
                </div>
            )}

            <div className="admin-keys__card">
                <div className="admin-keys__row">
                    <span className="admin-keys__label">MCP key</span>
                    {loading ? (
                        <span className="admin-keys__value admin-keys__value--muted">Loading…</span>
                    ) : !keyData?.key ? (
                        <span className="admin-keys__value admin-keys__value--muted">
                            Not generated yet
                        </span>
                    ) : (
                        <div className="admin-keys__value">
                            <code>
                                {revealed
                                    ? keyData.key
                                    : '•'.repeat(Math.min(48, keyData.key.length))}
                            </code>
                            <div className="admin-keys__actions">
                                <button onClick={() => setRevealed((r) => !r)}>
                                    {revealed ? 'Hide' : 'Show'}
                                </button>
                                <button onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="admin-keys__row">
                    <span className="admin-keys__label">MCP endpoint</span>
                    <div className="admin-keys__value">
                        <code>{mcpUrl}</code>
                    </div>
                </div>

                {keyData?.createdAt && (
                    <div className="admin-keys__row">
                        <span className="admin-keys__label">Created</span>
                        <span className="admin-keys__value admin-keys__value--muted">
                            {new Date(keyData.createdAt).toLocaleString()}
                        </span>
                    </div>
                )}

                {keyData?.rotatedAt && keyData.rotatedAt !== keyData.createdAt && (
                    <div className="admin-keys__row">
                        <span className="admin-keys__label">Last rotated</span>
                        <span className="admin-keys__value admin-keys__value--muted">
                            {new Date(keyData.rotatedAt).toLocaleString()}
                        </span>
                    </div>
                )}
            </div>

            <details className="admin-keys__how">
                <summary>How to plug this into your automation software</summary>
                <p>
                    Send requests to the endpoint above with the header
                    <code> Authorization: Bearer &lt;key&gt;</code>. The endpoint speaks the official
                    MCP Streamable HTTP protocol, so any MCP-compatible client works.
                </p>
                <p>Quick Python example:</p>
                <pre>{`from mcp import ClientSession
from mcp.client.streamable_http import streamablehttp_client

URL = "${mcpUrl}"
KEY = "<paste your key here>"

async with streamablehttp_client(
    URL, headers={"Authorization": f"Bearer {KEY}"}
) as (read, write, _):
    async with ClientSession(read, write) as session:
        await session.initialize()
        await session.call_tool("create_post", {
            "title": "Hello from automation",
            "category": "AI Chatbots",
            "status": "published",
            "sections": [
                {"type": "p", "text": "Created via MCP."}
            ],
        })`}</pre>
                <p>Tools available: <code>list_posts</code>, <code>get_post</code>, <code>create_post</code>,
                    {' '}<code>update_post</code>, <code>publish_post</code>, <code>unpublish_post</code>,
                    {' '}<code>delete_post</code>, <code>upload_image</code>.</p>
            </details>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// List view

const StatusPill = ({ status }) => (
    <span className={`admin-pill admin-pill--${status}`}>{status}</span>
);

const ListView = ({ posts, onEdit, onNew, onDelete, onRefresh, loading }) => {
    const [filter, setFilter] = useState('all');

    const filtered = useMemo(() => {
        if (filter === 'all') return posts;
        return posts.filter((p) => (p.status || 'published') === filter);
    }, [filter, posts]);

    return (
        <div className="admin-list">
            <header className="admin-list__head">
                <div>
                    <h1>Blog CMS</h1>
                    <p>Manage published posts and drafts.</p>
                </div>
                <div className="admin-list__actions">
                    <button onClick={onRefresh} className="blog-btn blog-btn--ghost" disabled={loading}>
                        {loading ? 'Refreshing…' : 'Refresh'}
                    </button>
                    <button onClick={onNew} className="blog-btn">+ New post</button>
                </div>
            </header>

            <div className="admin-tabs">
                {['all', 'published', 'draft'].map((tab) => (
                    <button
                        key={tab}
                        data-active={filter === tab}
                        onClick={() => setFilter(tab)}
                        className="admin-tab"
                    >
                        {tab[0].toUpperCase() + tab.slice(1)}
                        <span className="admin-tab__count">
                            {tab === 'all'
                                ? posts.length
                                : posts.filter((p) => (p.status || 'published') === tab).length}
                        </span>
                    </button>
                ))}
            </div>

            {loading && filtered.length === 0 ? (
                <div className="admin-empty">Loading posts…</div>
            ) : filtered.length === 0 ? (
                <div className="admin-empty">
                    No posts here yet. Click <strong>+ New post</strong> to create one, or use the
                    MCP server to publish from your automation tools.
                </div>
            ) : (
                <div className="admin-table" role="table">
                    <div className="admin-table__head" role="row">
                        <div role="columnheader">Title</div>
                        <div role="columnheader">Category</div>
                        <div role="columnheader">Status</div>
                        <div role="columnheader">Updated</div>
                        <div role="columnheader" aria-label="Actions" />
                    </div>
                    {filtered.map((p) => (
                        <div key={p.slug} className="admin-table__row" role="row">
                            <div role="cell">
                                <div className="admin-table__title">{p.title}</div>
                                <div className="admin-table__slug">/{p.slug}</div>
                            </div>
                            <div role="cell">{p.category}</div>
                            <div role="cell">
                                <StatusPill status={p.status || 'published'} />
                            </div>
                            <div role="cell" className="admin-table__date">
                                {p.updatedAt || p.publishedAt}
                            </div>
                            <div role="cell" className="admin-table__actions">
                                <button onClick={() => onEdit(p.slug)}>Edit</button>
                                {(p.status || 'published') === 'published' && (
                                    <a
                                        href={`/blog/${p.slug}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View
                                    </a>
                                )}
                                <button
                                    onClick={() => onDelete(p.slug, p.title)}
                                    className="admin-table__danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Section editor

const SectionEditor = ({ section, index, onChange, onRemove, onMove, isFirst, isLast }) => {
    const update = (patch) => onChange({ ...section, ...patch });

    return (
        <div className="admin-section">
            <header className="admin-section__head">
                <span className="admin-section__badge">
                    {SECTION_TYPES.find((t) => t.type === section.type)?.label || section.type}
                </span>
                <div className="admin-section__controls">
                    <button onClick={() => onMove(index, -1)} disabled={isFirst} title="Move up">↑</button>
                    <button onClick={() => onMove(index, 1)} disabled={isLast} title="Move down">↓</button>
                    <button onClick={() => onRemove(index)} className="admin-section__remove">
                        Remove
                    </button>
                </div>
            </header>

            {(section.type === 'p' || section.type === 'h2' || section.type === 'h3') && (
                <textarea
                    rows={section.type === 'p' ? 4 : 2}
                    value={section.text || ''}
                    onChange={(e) => update({ text: e.target.value })}
                    placeholder={section.type === 'p' ? 'Paragraph text' : 'Heading text'}
                />
            )}

            {(section.type === 'ul' || section.type === 'ol') && (
                <textarea
                    rows={5}
                    value={(section.items || []).join('\n')}
                    onChange={(e) =>
                        update({ items: e.target.value.split('\n').filter((l) => l.trim()) })
                    }
                    placeholder={'One item per line\nLike this'}
                />
            )}

            {section.type === 'quote' && (
                <>
                    <textarea
                        rows={3}
                        value={section.text || ''}
                        onChange={(e) => update({ text: e.target.value })}
                        placeholder="Quote text"
                    />
                    <input
                        type="text"
                        value={section.cite || ''}
                        onChange={(e) => update({ cite: e.target.value })}
                        placeholder="Citation (optional)"
                    />
                </>
            )}

            {section.type === 'cta' && (
                <>
                    <input
                        type="text"
                        value={section.text || ''}
                        onChange={(e) => update({ text: e.target.value })}
                        placeholder="CTA prompt — e.g. Ready to ship?"
                    />
                    <div className="admin-grid-2">
                        <input
                            type="text"
                            value={section.to || ''}
                            onChange={(e) => update({ to: e.target.value })}
                            placeholder="Destination, e.g. /ai-chatbot"
                        />
                        <input
                            type="text"
                            value={section.label || ''}
                            onChange={(e) => update({ label: e.target.value })}
                            placeholder="Button label"
                        />
                    </div>
                </>
            )}

            {section.type === 'img' && (
                <ImagePicker
                    src={section.src}
                    alt={section.alt}
                    caption={section.caption}
                    onChange={(patch) => update(patch)}
                />
            )}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Image picker

const ImagePicker = ({ src, alt, caption, onChange }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const onPick = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setError('');
        setUploading(true);
        try {
            const res = await adminUploadImage(file);
            onChange({ src: res.url });
        } catch (err) {
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    return (
        <div className="admin-image">
            {src ? (
                <div className="admin-image__preview">
                    <img src={resolveImageUrl(src)} alt={alt || ''} />
                </div>
            ) : (
                <div className="admin-image__empty">No image selected</div>
            )}
            <div className="admin-image__controls">
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="blog-btn blog-btn--ghost"
                >
                    {uploading ? 'Uploading…' : src ? 'Replace image' : 'Upload image'}
                </button>
                {src && (
                    <button
                        type="button"
                        onClick={() => onChange({ src: '' })}
                        className="admin-section__remove"
                    >
                        Clear
                    </button>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={onPick}
                />
            </div>
            <input
                type="text"
                value={src || ''}
                onChange={(e) => onChange({ src: e.target.value })}
                placeholder="Image URL (or upload above)"
            />
            <input
                type="text"
                value={alt || ''}
                onChange={(e) => onChange({ alt: e.target.value })}
                placeholder="Alt text (for accessibility)"
            />
            <input
                type="text"
                value={caption || ''}
                onChange={(e) => onChange({ caption: e.target.value })}
                placeholder="Caption (optional)"
            />
            {error && <div className="admin-error">{error}</div>}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Editor

const Editor = ({ initial, isNew, onCancel, onSaved }) => {
    const [post, setPost] = useState(initial);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [slugDirty, setSlugDirty] = useState(!isNew);

    const update = (patch) => setPost((p) => ({ ...p, ...patch }));

    const onTitleChange = (val) => {
        update({ title: val });
        if (!slugDirty) update({ slug: slugify(val) });
    };

    const addSection = (type) => {
        const base = { type };
        if (type === 'ul' || type === 'ol') base.items = [''];
        else if (type === 'cta') Object.assign(base, { text: '', to: '/', label: 'Learn more' });
        else if (type === 'img') Object.assign(base, { src: '', alt: '', caption: '' });
        else base.text = '';
        update({ sections: [...(post.sections || []), base] });
    };

    const setSection = (i, next) =>
        update({ sections: post.sections.map((s, idx) => (idx === i ? next : s)) });

    const removeSection = (i) =>
        update({ sections: post.sections.filter((_, idx) => idx !== i) });

    const moveSection = (i, dir) => {
        const next = [...post.sections];
        const j = i + dir;
        if (j < 0 || j >= next.length) return;
        [next[i], next[j]] = [next[j], next[i]];
        update({ sections: next });
    };

    const save = async (statusOverride) => {
        setError('');
        setSaving(true);
        const payload = {
            ...post,
            slug: post.slug || slugify(post.title),
            readMinutes: Number(post.readMinutes) || 5,
            excerpt: post.excerpt || post.description,
            status: statusOverride || post.status,
        };
        try {
            const saved = isNew
                ? await adminCreatePost(payload)
                : await adminUpdatePost(initial.slug, payload);
            onSaved(saved);
        } catch (err) {
            setError(err.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-editor">
            <header className="admin-editor__head">
                <div>
                    <button onClick={onCancel} className="admin-back" type="button">
                        ← Back to list
                    </button>
                    <h1>{isNew ? 'New post' : 'Edit post'}</h1>
                </div>
                <div className="admin-editor__actions">
                    <button
                        onClick={() => save('draft')}
                        disabled={saving}
                        className="blog-btn blog-btn--ghost"
                    >
                        {saving ? 'Saving…' : 'Save draft'}
                    </button>
                    <button
                        onClick={() => save('published')}
                        disabled={saving}
                        className="blog-btn"
                    >
                        {saving ? 'Saving…' : 'Publish'}
                    </button>
                </div>
            </header>

            {error && <div className="admin-error">{error}</div>}

            <div className="admin-editor__grid">
                <div className="admin-editor__main">
                    <label className="admin-field">
                        <span>Title</span>
                        <input
                            type="text"
                            value={post.title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            placeholder="Article title"
                        />
                    </label>

                    <label className="admin-field">
                        <span>Slug (URL)</span>
                        <input
                            type="text"
                            value={post.slug}
                            onChange={(e) => {
                                setSlugDirty(true);
                                update({ slug: slugify(e.target.value) });
                            }}
                            placeholder="my-post"
                        />
                    </label>

                    <label className="admin-field">
                        <span>Excerpt (card preview)</span>
                        <textarea
                            rows={2}
                            value={post.excerpt}
                            onChange={(e) => update({ excerpt: e.target.value })}
                            placeholder="Short summary shown on the blog index"
                        />
                    </label>

                    <h2 className="admin-editor__section-title">Body</h2>
                    {(post.sections || []).map((s, i) => (
                        <SectionEditor
                            key={i}
                            index={i}
                            section={s}
                            onChange={(next) => setSection(i, next)}
                            onRemove={removeSection}
                            onMove={moveSection}
                            isFirst={i === 0}
                            isLast={i === post.sections.length - 1}
                        />
                    ))}

                    <div className="admin-add-section">
                        <span>Add section:</span>
                        {SECTION_TYPES.map((t) => (
                            <button
                                key={t.type}
                                type="button"
                                onClick={() => addSection(t.type)}
                            >
                                + {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                <aside className="admin-editor__side">
                    <label className="admin-field">
                        <span>Status</span>
                        <select
                            value={post.status}
                            onChange={(e) => update({ status: e.target.value })}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </label>

                    <label className="admin-field">
                        <span>Category</span>
                        <input
                            type="text"
                            value={post.category}
                            onChange={(e) => update({ category: e.target.value })}
                            placeholder="AI Chatbots"
                        />
                    </label>

                    <label className="admin-field">
                        <span>Author</span>
                        <input
                            type="text"
                            value={post.author}
                            onChange={(e) => update({ author: e.target.value })}
                        />
                    </label>

                    <label className="admin-field">
                        <span>Read minutes</span>
                        <input
                            type="number"
                            min="1"
                            max="60"
                            value={post.readMinutes}
                            onChange={(e) => update({ readMinutes: e.target.value })}
                        />
                    </label>

                    <label className="admin-field">
                        <span>Cover accent</span>
                        <input
                            type="color"
                            value={post.cover}
                            onChange={(e) => update({ cover: e.target.value })}
                        />
                    </label>

                    <label className="admin-field">
                        <span>SEO description</span>
                        <textarea
                            rows={3}
                            value={post.description}
                            onChange={(e) => update({ description: e.target.value })}
                            placeholder="Meta description (155 chars max)"
                        />
                    </label>

                    <label className="admin-field">
                        <span>Keywords</span>
                        <textarea
                            rows={2}
                            value={post.keywords}
                            onChange={(e) => update({ keywords: e.target.value })}
                            placeholder="comma, separated, keywords"
                        />
                    </label>
                </aside>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Page

const AdminBlog = () => {
    const { isAdmin, ready, logout } = useAdmin();
    const navigate = useNavigate();

    const [section, setSection] = useState('posts'); // 'posts' | 'keys'
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(null); // null | 'new' | <slug>
    const [editingPost, setEditingPost] = useState(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await adminListPosts();
            setPosts(res.posts || []);
        } catch (err) {
            if (err.status === 401) {
                logout();
                return;
            }
            if (err.status === 404 || err.status === undefined || err.status >= 500) {
                setError(
                    'Backend not connected — sign-in is working, but the Python API is offline. ' +
                    'Start it (see backend/SETUP.md) to load posts, save changes, and generate MCP keys.'
                );
            } else {
                setError(err.message || 'Failed to load posts');
            }
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        if (isAdmin) refresh();
    }, [isAdmin, refresh]);

    const onEdit = async (slug) => {
        try {
            const post = await adminGetPost(slug);
            setEditingPost(post);
            setEditing(slug);
        } catch (err) {
            setError(err.message || 'Failed to load post');
        }
    };

    const onNew = () => {
        setEditingPost({ ...EMPTY_POST });
        setEditing('new');
    };

    const onDelete = async (slug, title) => {
        if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
        try {
            await adminDeletePost(slug);
            await refresh();
        } catch (err) {
            setError(err.message || 'Delete failed');
        }
    };

    const onSaved = async () => {
        setEditing(null);
        setEditingPost(null);
        await refresh();
    };

    if (!ready) return null;

    return (
        <div className="blog-scope admin-shell">
            <SEO
                title="Blog CMS"
                description="Admin interface for the Orion blog."
                canonical="/admin/blog"
                robots="noindex, nofollow"
            />

            {!isAdmin ? (
                <LoginPanel />
            ) : (
                <div className="admin-wrap">
                    <nav className="admin-nav">
                        <Link to="/" className="admin-nav__brand">← Orion</Link>
                        <div className="admin-nav__sections">
                            <button
                                data-active={section === 'posts'}
                                onClick={() => {
                                    setSection('posts');
                                    setEditing(null);
                                    setEditingPost(null);
                                }}
                                className="admin-nav__section"
                            >
                                📝 Posts
                            </button>
                            <button
                                data-active={section === 'keys'}
                                onClick={() => {
                                    setSection('keys');
                                    setEditing(null);
                                    setEditingPost(null);
                                }}
                                className="admin-nav__section"
                            >
                                🔑 API Keys
                            </button>
                        </div>
                        <div className="admin-nav__right">
                            <Link to="/blog" className="admin-nav__link">View blog</Link>
                            <button onClick={logout} className="admin-nav__logout">
                                Sign out
                            </button>
                        </div>
                    </nav>

                    {error && <div className="admin-error admin-error--top">{error}</div>}

                    {section === 'keys' ? (
                        <ApiKeysPanel />
                    ) : editing && editingPost ? (
                        <Editor
                            initial={editingPost}
                            isNew={editing === 'new'}
                            onCancel={() => {
                                setEditing(null);
                                setEditingPost(null);
                            }}
                            onSaved={onSaved}
                        />
                    ) : (
                        <ListView
                            posts={posts}
                            loading={loading}
                            onEdit={onEdit}
                            onNew={onNew}
                            onDelete={onDelete}
                            onRefresh={refresh}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminBlog;
