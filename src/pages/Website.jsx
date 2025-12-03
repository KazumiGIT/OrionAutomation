import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import TestimonialCard from '../components/TestimonialCard';
import Icon from '../components/Icons';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';

const Website = () => {
    const packages = [
        {
            title: 'Standard Digital Presence',
            price: 'RM 2,999',
            setupFee: 'Timeline: 2-3 weeks',
            features: [
                'Bespoke Visual Design',
                'Up to 5 Strategic Pages',
                'Intelligent Responsiveness',
                'Performance Optimization',
                'Basic SEO Setup',
                'Contact Form Integration',
                '1 Month Support'
            ]
        },
        {
            title: 'Business Digital Experience',
            price: 'RM 5,999',
            setupFee: 'Timeline: 4-6 weeks',
            isPopular: true,
            features: [
                'Everything in Standard',
                'Up to 10 Pages',
                'Advanced Interactive Features',
                'CMS Integration (Blog/News)',
                'Advanced SEO Strategy',
                'Social Media Integration',
                'Google Analytics Setup',
                '3 Months Premium Support'
            ]
        },
        {
            title: 'E-Commerce Ecosystem',
            price: 'RM 8,999+',
            setupFee: 'Timeline: 8-12 weeks',
            features: [
                'Everything in Business',
                'Unlimited Pages',
                'Full E-commerce Functionality',
                'Payment Gateway Integration',
                'Product Management System',
                'User Accounts & Login',
                'Advanced Analytics Dashboard',
                '6 Months Premium Support',
                'Dedicated Project Manager'
            ]
        }
    ];

    const testimonials = [
        {
            name: 'David Lim',
            company: 'Luxury Interiors',
            role: 'CEO',
            text: 'Orion delivered a website that perfectly captures our brand essence. The attention to detail and premium feel has significantly elevated our online presence. Inquiries have doubled!',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            company: 'TechStart Solutions',
            role: 'Founder',
            text: 'From concept to launch, the team was exceptional. The Business package gave us everything we needed—beautiful design, seamless functionality, and ongoing support that\'s second to none.',
            rating: 5
        },
        {
            name: 'James Wong',
            company: 'Gourmet Haven',
            role: 'Owner',
            text: 'The E-commerce package transformed our entire digital ecosystem. The integration is flawless, and our online sales have tripled. Worth every ringgit!',
            rating: 5
        }
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Website Development",
        "provider": {
            "@type": "Organization",
            "name": "Orion Automation"
        },
        "areaServed": "Malaysia",
        "description": "Stunning, high-performance websites designed to convert. Custom design, mobile-first, and SEO ready.",
        "offers": {
            "@type": "Offer",
            "price": "2999",
            "priceCurrency": "MYR"
        }
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <SEO
                title="Premium Website Development"
                description="Get a stunning, high-performance website designed to convert. Custom design, mobile-first, and SEO optimized. Transform your digital presence."
                keywords="website development, web design, custom website, e-commerce, SEO, mobile responsive, Malaysia"
                canonical="/website"
                structuredData={structuredData}
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
                            Digital <span style={{ color: '#E6A520' }}>Masterpieces</span>
                        </h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#7A4A00',
                            opacity: 0.8,
                            marginBottom: '2.5rem',
                            lineHeight: 1.6
                        }}>
                            Websites that don't just look good—they convert visitors into customers
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
                            Start Your Project
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Portfolio Button Section */}
            <section className="section" style={{ padding: '2rem 0', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="glass-card" style={{ padding: '2rem', display: 'inline-block' }}>
                        <h3 style={{ color: '#7A4A00', marginBottom: '1rem', fontSize: '1.5rem' }}>
                            Want to See My Work?
                        </h3>
                        <p style={{ color: '#7A4A00', opacity: 0.8, marginBottom: '1.5rem', maxWidth: '500px' }}>
                            Check out my portfolio of stunning websites I've built for clients across various industries.
                        </p>
                        <Link
                            to="/website-portfolio"
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2.5rem',
                                background: 'linear-gradient(135deg, #E6A520 0%, #C58A20 100%)',
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
                            View My Portfolio 🎨
                        </Link>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <Icon name="design" size={64} color="#E6A520" style={{ marginBottom: '1.5rem' }} />
                        <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', marginBottom: '1.5rem' }}>More Than Just Code</h2>
                        <p style={{ fontSize: '1.2rem', color: '#7A4A00', opacity: 0.8, maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
                            We don't build templates. We craft digital experiences that tell your story,
                            engage your audience, and drive real business results.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        What You Get
                    </h2>
                    <div className="grid grid-2" style={{ gap: '2rem' }}>
                        <div className="glass-card hover-lift" style={{ padding: '2rem' }}>
                            <Icon name="design" size={48} color="#E6A520" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>Custom Design</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                No templates. Every pixel is designed specifically for your brand and audience.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2rem' }}>
                            <Icon name="zap" size={48} color="#E6A520" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>Lightning Fast</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Optimized for speed. Your site loads in under 2 seconds, keeping visitors engaged.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2rem' }}>
                            <Icon name="mobile" size={48} color="#E6A520" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>Mobile First</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Perfect on every device. 70% of web traffic is mobile—we design for that reality.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2rem' }}>
                            <Icon name="search" size={48} color="#E6A520" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>SEO Ready</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Built to rank. Clean code, fast loading, and optimized structure for search engines.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Development Timeline */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        Development Journey
                    </h2>
                    <div className="grid grid-2" style={{ gap: '2rem' }}>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#E6A520',
                                    color: '#FFF8E7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem'
                                }}>1</div>
                                <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', margin: 0 }}>Discovery</h3>
                            </div>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                We learn about your business, goals, and target audience. This shapes everything.
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#E6A520',
                                    color: '#FFF8E7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem'
                                }}>2</div>
                                <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', margin: 0 }}>Design</h3>
                            </div>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Custom mockups and prototypes. You see exactly what you're getting before we code.
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#E6A520',
                                    color: '#FFF8E7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem'
                                }}>3</div>
                                <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', margin: 0 }}>Development</h3>
                            </div>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Clean, modern code. Fast, secure, and built to scale with your business.
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#E6A520',
                                    color: '#FFF8E7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem'
                                }}>4</div>
                                <h3 style={{ fontSize: '1.3rem', color: '#7A4A00', margin: 0 }}>Launch & Support</h3>
                            </div>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                We handle deployment and provide ongoing support. You're never left alone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        Website Packages
                    </h2>
                    <div className="grid grid-3" style={{ gap: '2rem' }}>
                        {packages.map((pkg, index) => (
                            <PricingCard key={index} {...pkg} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        Client Success Stories
                    </h2>
                    <div className="grid grid-3" style={{ gap: '2rem' }}>
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '4rem 2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', marginBottom: '1.5rem' }}>
                            Ready to Build Your Digital Presence?
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#7A4A00', opacity: 0.8, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Let's create something amazing together
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

export default Website;
