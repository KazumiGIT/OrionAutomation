import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getAllPosts as getStaticPosts } from '../data/blogPosts';
import { listPosts } from '../lib/api';
import '../styles/blog.css';

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const Blog = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState('api'); // 'api' | 'static'

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await listPosts();
                if (cancelled) return;
                const posts = res?.posts || [];
                if (posts.length > 0) {
                    setAllPosts(posts);
                    setSource('api');
                } else {
                    setAllPosts(getStaticPosts());
                    setSource('static');
                }
            } catch {
                if (cancelled) return;
                setAllPosts(getStaticPosts());
                setSource('static');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(allPosts.map((p) => p.category).filter(Boolean)))],
        [allPosts]
    );
    const [activeCategory, setActiveCategory] = useState('All');

    const visiblePosts = useMemo(
        () =>
            activeCategory === 'All'
                ? allPosts
                : allPosts.filter((p) => p.category === activeCategory),
        [allPosts, activeCategory]
    );

    const [featured, ...rest] = visiblePosts;

    const blogStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Orion Automation Blog',
        description:
            'Practical guides on AI chatbots, modern websites, marketing automation, and SEO for small businesses.',
        url: 'https://orionautomation.xyz/blog',
        publisher: {
            '@type': 'Organization',
            name: 'Orion Automation',
            url: 'https://orionautomation.xyz',
        },
        blogPost: allPosts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            description: p.description,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt || p.publishedAt,
            url: `https://orionautomation.xyz/blog/${p.slug}`,
            author: { '@type': 'Organization', name: p.author },
        })),
    };

    return (
        <div className="blog-scope">
            <SEO
                title="Blog — AI, Websites, Marketing & SEO Insights"
                description="Practical guides on AI chatbots, modern small business websites, marketing automation, and SEO. Written by the Orion Automation team."
                keywords="AI chatbot blog, small business website tips, marketing automation, SEO 2026, AI search optimization, Orion Automation blog"
                canonical="/blog"
                structuredData={blogStructuredData}
            />

            {/* Hero */}
            <header className="blog-hero">
                <div className="blog-wrap">
                    <span className="blog-hero__eyebrow">The Orion Journal</span>
                    <h1 className="blog-hero__title">Build better. Automate smarter.</h1>
                    <p className="blog-hero__subtitle">
                        Hands-on guides on AI chatbots, modern websites, marketing automation, and
                        getting found in the age of AI search.
                    </p>

                    <div className="blog-filter" role="tablist" aria-label="Filter posts by category">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={cat === activeCategory}
                                data-active={cat === activeCategory}
                                onClick={() => setActiveCategory(cat)}
                                className="blog-chip"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Featured */}
            <section className="blog-wrap" aria-labelledby="featured-heading">
                <h2 id="featured-heading" style={{ position: 'absolute', left: '-9999px' }}>
                    Featured post
                </h2>
                {loading ? (
                    <div className="blog-empty">Loading the latest articles…</div>
                ) : featured ? (
                    <Link to={`/blog/${featured.slug}`} className="blog-featured">
                        <div className="blog-featured__tag">Featured · {featured.category}</div>
                        <h3 className="blog-featured__title">{featured.title}</h3>
                        <p className="blog-featured__excerpt">{featured.excerpt}</p>
                        <div className="blog-featured__meta">
                            <span>{formatDate(featured.publishedAt)}</span>
                            <span className="blog-featured__meta-dot" aria-hidden="true" />
                            <span>{featured.readMinutes} min read</span>
                            <span className="blog-featured__meta-dot" aria-hidden="true" />
                            <span>By {featured.author}</span>
                        </div>
                        <div className="blog-featured__arrow">Read the article →</div>
                    </Link>
                ) : (
                    <div className="blog-empty">No posts in this category yet. Check back soon.</div>
                )}
            </section>

            {/* Latest grid */}
            <section className="blog-wrap" aria-labelledby="latest-heading">
                {rest.length > 0 && (
                    <>
                        <h2 id="latest-heading" className="blog-section-title">
                            Latest articles
                        </h2>
                        <div className="blog-grid">
                            {rest.map((post) => (
                                <Link
                                    key={post.slug}
                                    to={`/blog/${post.slug}`}
                                    className="blog-card"
                                    style={{ '--cover': post.cover || '#E6A520' }}
                                >
                                    <div className="blog-card__cover" aria-hidden="true" />
                                    <div className="blog-card__body">
                                        <span className="blog-card__category">{post.category}</span>
                                        <h3 className="blog-card__title">{post.title}</h3>
                                        <p className="blog-card__excerpt">{post.excerpt}</p>
                                        <div className="blog-card__meta">
                                            <span>{formatDate(post.publishedAt)}</span>
                                            <span className="blog-card__read-time">
                                                {post.readMinutes} min read
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </section>

            {/* CTA */}
            <section className="blog-cta-section">
                <div className="blog-wrap">
                    <h2 className="blog-cta-section__title">Ready to put these ideas to work?</h2>
                    <p className="blog-cta-section__text">
                        Whether it is an AI chatbot, a new website, or a marketing system — we can
                        help you ship it.
                    </p>
                    <Link to="/ai-chatbot" className="blog-btn">
                        Explore Our Services →
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Blog;
