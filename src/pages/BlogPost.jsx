import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';
import { getPost, listPosts, resolveImageUrl } from '../lib/api';
import '../styles/blog.css';

const formatDateNice = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const renderSection = (section, idx) => {
    switch (section.type) {
        case 'h2':
            return <h2 key={idx}>{section.text}</h2>;
        case 'h3':
            return <h3 key={idx}>{section.text}</h3>;
        case 'p':
            return <p key={idx}>{section.text}</p>;
        case 'ul':
            return (
                <ul key={idx}>
                    {(section.items || []).map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            );
        case 'ol':
            return (
                <ol key={idx}>
                    {(section.items || []).map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ol>
            );
        case 'quote':
            return (
                <blockquote key={idx}>
                    “{section.text}”
                    {section.cite && <footer>— {section.cite}</footer>}
                </blockquote>
            );
        case 'cta':
            return (
                <div key={idx} className="blog-inline-cta">
                    <p>{section.text}</p>
                    <Link to={section.to || '/'} className="blog-btn">
                        {section.label || 'Learn more'} →
                    </Link>
                </div>
            );
        case 'img':
            if (!section.src) return null;
            return (
                <figure key={idx} className="blog-figure">
                    <img
                        src={resolveImageUrl(section.src)}
                        alt={section.alt || ''}
                        loading="lazy"
                    />
                    {section.caption && <figcaption>{section.caption}</figcaption>}
                </figure>
            );
        default:
            return null;
    }
};

const useReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
            setProgress(pct);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return progress;
};

const BlogPost = () => {
    const { slug } = useParams();
    const progress = useReadingProgress();

    const [post, setPost] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setLoading(true);
        setNotFound(false);

        let cancelled = false;
        (async () => {
            // 1. Try the API first
            try {
                const apiPost = await getPost(slug);
                if (cancelled) return;
                if (apiPost) {
                    setPost(apiPost);
                    try {
                        const all = await listPosts();
                        if (!cancelled) {
                            const rel = (all.posts || [])
                                .filter((p) => p.slug !== slug)
                                .slice(0, 3);
                            setRelated(rel);
                        }
                    } catch {
                        // ignore — related is optional
                    }
                    return;
                }
            } catch (err) {
                // 404 or backend offline — fall through to static
                if (err && err.status !== 404 && err.status !== undefined) {
                    // keep trying with static
                }
            }

            // 2. Fall back to static
            const staticPost = getPostBySlug(slug);
            if (cancelled) return;
            if (staticPost) {
                setPost(staticPost);
                setRelated(getRelatedPosts(slug, 3));
            } else {
                setNotFound(true);
            }
        })()
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (notFound) return <Navigate to="/blog" replace />;
    if (loading || !post) {
        return (
            <div className="blog-scope">
                <div className="blog-article-wrap" style={{ paddingTop: '8rem' }}>
                    <div className="blog-empty">Loading article…</div>
                </div>
            </div>
        );
    }

    const url = `https://orionautomation.xyz/blog/${post.slug}`;

    const articleStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        author: {
            '@type': 'Organization',
            name: post.author,
            url: 'https://orionautomation.xyz',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Orion Automation',
            url: 'https://orionautomation.xyz',
            logo: {
                '@type': 'ImageObject',
                url: 'https://orionautomation.xyz/favicon.png',
            },
        },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: post.category,
        keywords: post.keywords,
    };

    const breadcrumbStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orionautomation.xyz/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://orionautomation.xyz/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
    };

    return (
        <div className="blog-scope">
            <SEO
                title={post.title}
                description={post.description}
                keywords={post.keywords}
                canonical={`/blog/${post.slug}`}
                structuredData={[articleStructuredData, breadcrumbStructuredData]}
            />

            <div
                className="blog-progress"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Reading progress"
            />

            <article>
                <header className="blog-article-header">
                    <div className="blog-article-wrap">
                        <nav aria-label="Breadcrumb" className="blog-crumbs">
                            <Link to="/">Home</Link>
                            <span className="blog-crumbs__sep">/</span>
                            <Link to="/blog">Blog</Link>
                            <span className="blog-crumbs__sep">/</span>
                            <span className="blog-crumbs__current">{post.category}</span>
                        </nav>

                        <span className="blog-article__category">{post.category}</span>
                        <h1 className="blog-article__title">{post.title}</h1>
                        {post.excerpt && <p className="blog-article__lede">{post.excerpt}</p>}

                        <div className="blog-article__meta">
                            <span className="blog-article__meta-author">By {post.author}</span>
                            <span className="blog-article__meta-dot" aria-hidden="true" />
                            <span>Published {formatDateNice(post.publishedAt)}</span>
                            {post.updatedAt && post.updatedAt !== post.publishedAt && (
                                <>
                                    <span className="blog-article__meta-dot" aria-hidden="true" />
                                    <span>Updated {formatDateNice(post.updatedAt)}</span>
                                </>
                            )}
                            <span className="blog-article__meta-dot" aria-hidden="true" />
                            <span>{post.readMinutes} min read</span>
                        </div>
                    </div>
                </header>

                {post.coverImage && (
                    <div className="blog-article-wrap">
                        <figure className="blog-figure blog-figure--cover">
                            <img
                                src={resolveImageUrl(post.coverImage)}
                                alt={post.title}
                                loading="eager"
                            />
                        </figure>
                    </div>
                )}

                <div className="blog-article-wrap blog-article__body">
                    {(post.sections || []).map((section, idx) => renderSection(section, idx))}
                </div>
            </article>

            {related.length > 0 && (
                <section className="blog-related" aria-labelledby="related-title">
                    <div className="blog-wrap">
                        <h2 id="related-title" className="blog-related__title">
                            Keep reading
                        </h2>
                        <div className="blog-grid">
                            {related.map((p) => (
                                <Link
                                    key={p.slug}
                                    to={`/blog/${p.slug}`}
                                    className="blog-card"
                                    style={{ '--cover': p.cover || '#E6A520' }}
                                >
                                    <div className="blog-card__cover" aria-hidden="true" />
                                    <div className="blog-card__body">
                                        <span className="blog-card__category">{p.category}</span>
                                        <h3 className="blog-card__title">{p.title}</h3>
                                        <p className="blog-card__excerpt">{p.excerpt}</p>
                                        <div className="blog-card__meta">
                                            <span>{formatDateNice(p.publishedAt)}</span>
                                            <span>{p.readMinutes} min read</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="blog-related__footer">
                            <Link to="/blog" className="blog-btn blog-btn--ghost">
                                ← Back to all posts
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogPost;
