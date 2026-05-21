import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../components/Icons';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';

const Marketing = () => {
    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <SEO
                title="Modern Marketing — SEO / AEO / GEO"
                description="Modern Marketing for the AI era: SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO). Get found by search engines, AI assistants, and generative answers."
                keywords="Modern Marketing, SEO, AEO, GEO, Answer Engine Optimization, Generative Engine Optimization, AI search, ChatGPT SEO, Perplexity SEO, Malaysia"
                canonical="/marketing"
            />

            {/* Hero */}
            <section className="section" style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <AnimatedBackground />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
                    >
                        <p style={{
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#E6A520',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            marginBottom: '1rem'
                        }}>
                            A Sub-Category of Websites
                        </p>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            color: '#7A4A00',
                            marginBottom: '1.5rem',
                            fontWeight: 'bold',
                            lineHeight: 1.1
                        }}>
                            Modern <span style={{ color: '#E6A520' }}>Marketing</span>
                        </h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#7A4A00',
                            opacity: 0.8,
                            marginBottom: '2.5rem',
                            lineHeight: 1.6
                        }}>
                            SEO · AEO · GEO — get found by search engines, AI assistants, and generative answers.
                        </p>
                        <a
                            href="https://wa.me/601117993797"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2.5rem',
                                background: '#E6A520',
                                color: '#FFF8E7',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 12px rgba(230, 165, 32, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(230, 165, 32, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(230, 165, 32, 0.3)';
                            }}
                        >
                            Get Found Everywhere
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Why Modern Marketing */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <div className="grid grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', color: '#E6A520', marginBottom: '1.5rem' }}>
                                The Search Landscape Changed
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: '#7A4A00', opacity: 0.8, marginBottom: '1rem', lineHeight: 1.7 }}>
                                Customers no longer just Google. They ask ChatGPT, Perplexity, Gemini, and Claude.
                                If your website only ranks on Google in 2026, you're losing half the conversation.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: '#7A4A00', opacity: 0.8, lineHeight: 1.7 }}>
                                Modern Marketing means engineering your web presence so traditional search engines,
                                answer engines, and generative AI all surface <em>you</em> as the recommended answer.
                            </p>
                        </div>
                        <div className="glass-card" style={{
                            padding: '3rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '300px'
                        }}>
                            <Icon name="target" size={120} color="#E6A520" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO / AEO / GEO */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '0.75rem' }}>
                        SEO · AEO · GEO
                    </h2>
                    <p style={{ color: '#7A4A00', opacity: 0.7, textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                        Three disciplines, one outcome: be the answer wherever your customer searches.
                    </p>
                    <div className="grid grid-3" style={{ gap: '2rem' }}>
                        <div className="glass-card hover-lift" style={{ padding: '2.5rem' }}>
                            <Icon name="search" size={56} color="#E6A520" style={{ marginBottom: '1.25rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '0.5rem' }}>SEO</h3>
                            <p style={{ color: '#E6A520', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Search Engine Optimization
                            </p>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Rank on Google and Bing for the keywords that actually bring buyers. Technical SEO,
                                content strategy, backlinks, and Core Web Vitals — all the fundamentals, done right.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2.5rem' }}>
                            <Icon name="chatbot" size={56} color="#E6A520" style={{ marginBottom: '1.25rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '0.5rem' }}>AEO</h3>
                            <p style={{ color: '#E6A520', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Answer Engine Optimization
                            </p>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Get cited inside featured snippets, voice assistants, and Perplexity-style answer engines.
                                Structured data, FAQ schema, and concise, citable content built for direct answers.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2.5rem' }}>
                            <Icon name="zap" size={56} color="#E6A520" style={{ marginBottom: '1.25rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '0.5rem' }}>GEO</h3>
                            <p style={{ color: '#E6A520', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Generative Engine Optimization
                            </p>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Be the brand ChatGPT, Claude, and Gemini recommend. Authoritative content,
                                clean entity signals, and AI-readable structure so generative engines pick you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expected Outcomes */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        Expected Outcomes
                    </h2>
                    <div className="grid grid-2" style={{ gap: '2rem' }}>
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#E6A520', marginBottom: '0.5rem' }}>+150%</div>
                            <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', marginBottom: '0.5rem' }}>Organic Traffic</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.7, fontSize: '0.95rem' }}>
                                Average organic growth in the first 6 months
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#E6A520', marginBottom: '0.5rem' }}>+40%</div>
                            <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', marginBottom: '0.5rem' }}>Conversion Rate</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.7, fontSize: '0.95rem' }}>
                                Better intent targeting drives better conversions
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#E6A520', marginBottom: '0.5rem' }}>+200%</div>
                            <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', marginBottom: '0.5rem' }}>AI Mentions</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.7, fontSize: '0.95rem' }}>
                                Brand surface area inside generative AI answers
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#E6A520', marginBottom: '0.5rem' }}>3-5x</div>
                            <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', marginBottom: '0.5rem' }}>ROI</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.7, fontSize: '0.95rem' }}>
                                Return on marketing investment
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Linked with Websites */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <Icon name="website" size={56} color="#E6A520" style={{ marginBottom: '1.25rem' }} />
                        <h2 style={{ fontSize: '2rem', color: '#7A4A00', marginBottom: '1rem' }}>
                            Marketing Lives on Your Website
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#7A4A00', opacity: 0.8, maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                            Modern Marketing only works if your website is engineered for it — fast, structured,
                            and AI-readable. That's why it ships as a sub-category of our Websites service.
                        </p>
                        <Link
                            to="/website"
                            style={{
                                display: 'inline-block',
                                padding: '0.85rem 2rem',
                                background: 'transparent',
                                color: '#E6A520',
                                border: '2px solid #E6A520',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            See Our Websites Service →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '4rem 2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', marginBottom: '1.5rem' }}>
                            Ready to Be the Answer?
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#7A4A00', opacity: 0.8, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Let's engineer your presence for the new era of search and AI.
                        </p>
                        <a
                            href="https://wa.me/601117993797"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2.5rem',
                                background: '#E6A520',
                                color: '#FFF8E7',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 12px rgba(230, 165, 32, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(230, 165, 32, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(230, 165, 32, 0.3)';
                            }}
                        >
                            Contact Us on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Marketing;
