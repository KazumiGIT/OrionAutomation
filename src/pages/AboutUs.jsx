import React from 'react';
import SEO from '../components/SEO';

const AboutUs = () => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <SEO
                title="About Us"
                description="Learn about Orion Automation, our mission, values, and the team behind our AI-powered solutions. We empower businesses with intelligent automation."
                keywords="about Orion Automation, AI company, automation experts, digital transformation, our story, mission, values"
                canonical="/about-us"
            />
            {/* Hero Section */}
            <section className="section" style={{ paddingTop: '8rem' }}>
                <div className="container text-center">
                    <h1 className="fade-in text-glow-animate mb-lg">
                        About Orion Automation
                    </h1>

                    <p className="fade-in delay-1" style={{
                        fontSize: '1.3rem',
                        maxWidth: '800px',
                        margin: '0 auto var(--spacing-xl)',
                        opacity: 0.9,
                    }}>
                        Pioneering the future of business automation with cutting-edge AI solutions.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section style={{
                padding: 'var(--spacing-2xl) 0',
                background: 'rgba(10, 10, 10, 0.3)',
            }}>
                <div className="container">
                    <div className="grid grid-2" style={{ alignItems: 'center', gap: 'var(--spacing-2xl)' }}>
                        <div className="fade-in-up">
                            <h2 className="mb-lg">Our Story</h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-md)', opacity: 0.9 }}>
                                Founded with a vision to democratize AI technology, Orion Automation has been at the forefront of digital transformation since our inception.
                            </p>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                                We believe that every business, regardless of size, deserves access to world-class automation solutions. Our team of experts combines technical excellence with creative innovation to deliver results that exceed expectations.
                            </p>
                        </div>

                        <div className="glass-card fade-in-up delay-1" style={{ padding: 'var(--spacing-2xl)' }}>
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-lg)' }}>
                                Our Mission
                            </h3>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8 }}>
                                To empower businesses with intelligent automation solutions that drive growth, enhance customer experiences, and unlock new possibilities in the digital age.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center mb-xl fade-in-up">
                        Our Core Values
                    </h2>

                    <div className="grid grid-3">
                        <div className="glass-card fade-in-up delay-1">
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-sm)' }}>
                                🎯 Excellence
                            </h3>
                            <p style={{ opacity: 0.9 }}>
                                We pursue perfection in every project, delivering solutions that set new standards in quality and innovation.
                            </p>
                        </div>

                        <div className="glass-card fade-in-up delay-2">
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-sm)' }}>
                                🤝 Partnership
                            </h3>
                            <p style={{ opacity: 0.9 }}>
                                Your success is our success. We work alongside you as true partners, invested in your long-term growth.
                            </p>
                        </div>

                        <div className="glass-card fade-in-up delay-3">
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-sm)' }}>
                                🚀 Innovation
                            </h3>
                            <p style={{ opacity: 0.9 }}>
                                We stay ahead of the curve, constantly exploring new technologies to give you a competitive edge.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section style={{
                padding: 'var(--spacing-2xl) 0',
                background: 'rgba(10, 10, 10, 0.3)',
            }}>
                <div className="container">
                    <h2 className="text-center mb-xl fade-in-up">
                        Why Choose Us
                    </h2>

                    <div className="grid grid-2">
                        <div className="glass-card fade-in-up delay-1">
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-sm)' }}>
                                ⚡ Proven Expertise
                            </h3>
                            <p style={{ opacity: 0.9 }}>
                                Years of experience delivering successful AI automation projects across diverse industries.
                            </p>
                        </div>

                        <div className="glass-card fade-in-up delay-2">
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-sm)' }}>
                                🎨 Tailored Solutions
                            </h3>
                            <p style={{ opacity: 0.9 }}>
                                No cookie-cutter approaches. Every solution is custom-crafted to fit your unique business needs.
                            </p>
                        </div>

                        <div className="glass-card fade-in-up delay-3">
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-sm)' }}>
                                📊 Measurable Results
                            </h3>
                            <p style={{ opacity: 0.9 }}>
                                We focus on outcomes that matter—increased efficiency, higher conversions, and better customer satisfaction.
                            </p>
                        </div>

                        <div className="glass-card fade-in-up delay-4">
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-sm)' }}>
                                🔒 Ongoing Support
                            </h3>
                            <p style={{ opacity: 0.9 }}>
                                Our commitment doesn't end at launch. We provide continuous support to ensure your success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container text-center">
                    <h2 className="fade-in-up mb-lg">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="fade-in-up delay-1" style={{
                        fontSize: '1.2rem',
                        maxWidth: '600px',
                        margin: '0 auto var(--spacing-xl)',
                        opacity: 0.9,
                    }}>
                        Let's discuss how Orion Automation can help you achieve your goals.
                    </p>
                    <button className="btn btn-primary fade-in-up delay-2">
                        Get in Touch
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
