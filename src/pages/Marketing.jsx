import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../components/Icons';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';

const Marketing = () => {
    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <SEO
                title="Strategic Marketing"
                description="Data-driven marketing strategies to grow your business. SEO, social media, and PPC campaigns that deliver real ROI."
                keywords="digital marketing, SEO, social media marketing, PPC, online advertising, growth marketing, Malaysia"
                canonical="/marketing"
            />
            {/* Hero Section */}
            <section className="section" style={{
                padding: '6rem 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <AnimatedBackground />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            color: '#7A4A00',
                            marginBottom: '1.5rem',
                            fontWeight: 'bold',
                            lineHeight: 1.1
                        }}>
                            Strategic <span style={{ color: '#E6A520' }}>Growth</span>
                        </h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#7A4A00',
                            opacity: 0.8,
                            marginBottom: '2.5rem',
                            lineHeight: 1.6
                        }}>
                            Data-driven marketing that turns clicks into customers
                        </p>
                        <a
                            href="https://wa.me/601154455435"
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
                            Grow Your Business
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* The Vision */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <div className="grid grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', color: '#E6A520', marginBottom: '1.5rem' }}>
                                Data-Driven Dominance
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: '#7A4A00', opacity: 0.8, marginBottom: '1rem', lineHeight: 1.7 }}>
                                Marketing isn't just about pretty pictures. It's about capturing territory in the minds of your customers.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: '#7A4A00', opacity: 0.8, lineHeight: 1.7 }}>
                                We're building a suite of marketing tools and services designed to give you an unfair advantage.
                                Precision targeting, compelling narratives, and relentless optimization.
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

            {/* Services Arsenal */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        The Arsenal <span style={{ fontSize: '1.2rem', opacity: 0.6 }}>(Coming Soon)</span>
                    </h2>
                    <div className="grid grid-3" style={{ gap: '2rem' }}>
                        <div className="glass-card hover-lift" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <Icon name="search" size={64} color="#E6A520" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>SEO Supremacy</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Rank #1. Capture organic traffic that is actively looking for you.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <Icon name="social" size={64} color="#E6A520" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>Social Warfare</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Engage, entertain, and convert on the platforms that matter.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <Icon name="target" size={64} color="#E6A520" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>PPC Precision</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Laser-targeted ads that turn pennies into dollars.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Growth Metrics */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        Expected Outcomes
                    </h2>
                    <div className="grid grid-2" style={{ gap: '2rem' }}>
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#E6A520', marginBottom: '0.5rem' }}>
                                +150%
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', marginBottom: '0.5rem' }}>Traffic Increase</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.7, fontSize: '0.95rem' }}>
                                Average organic traffic growth in first 6 months
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#E6A520', marginBottom: '0.5rem' }}>
                                +40%
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', marginBottom: '0.5rem' }}>Conversion Rate</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.7, fontSize: '0.95rem' }}>
                                Improved conversion through optimization
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#E6A520', marginBottom: '0.5rem' }}>
                                +200%
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', marginBottom: '0.5rem' }}>Lead Quality</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.7, fontSize: '0.95rem' }}>
                                Better targeting means better leads
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#E6A520', marginBottom: '0.5rem' }}>
                                3-5x
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', marginBottom: '0.5rem' }}>ROI</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.7, fontSize: '0.95rem' }}>
                                Return on marketing investment
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ padding: '5rem 2rem', textAlign: 'center', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '4rem 2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', marginBottom: '1.5rem' }}>
                            Ready to Dominate Your Market?
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#7A4A00', opacity: 0.8, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Let's build a marketing strategy that actually works
                        </p>
                        <a
                            href="https://wa.me/601154455435"
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
