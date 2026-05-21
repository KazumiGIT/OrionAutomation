import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceModal from '../components/ServiceModal';
import ScrollObserver from '../components/ScrollObserver';
import Icon from '../components/Icons';
import Button from '../components/Button';
import SEO from '../components/SEO';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const services = [
        {
            icon: 'sync',
            title: 'AI Automation Workflow',
            description: 'Automation workflows, pipeline automation, and production internal system automation.',
            link: '/ai-automation'
        },
        {
            icon: 'website',
            title: 'Premium Websites',
            description: 'High-performance websites with AI Chatbot integration and Modern Marketing (SEO/AEO/GEO) built in.',
            link: '/website'
        }
    ];

    const processSteps = [
        { icon: 'search', title: 'Discovery', desc: 'We analyze your business needs and goals.' },
        { icon: 'design', title: 'Strategy', desc: 'We design a custom roadmap for success.' },
        { icon: 'code', title: 'Development', desc: 'Our experts build your solution with precision.' },
        { icon: 'rocket', title: 'Launch', desc: 'We deploy, monitor, and optimize for growth.' }
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Orion Automation",
        "url": "https://orionautomation.xyz",
        "logo": "https://orionautomation.xyz/favicon.png",
        "sameAs": [
            "https://www.facebook.com/orionautomation",
            "https://twitter.com/orionautomation"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "601117993797",
            "contactType": "customer service"
        }
    };

    const sectionTitleStyle = {
        color: '#7A4A00',
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: '700',
        marginBottom: '0.5rem',
        textAlign: 'center'
    };

    const sectionSubtitleStyle = {
        color: '#7A4A00',
        opacity: 0.7,
        fontSize: '1.1rem',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto 3rem auto'
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem' }}
        >
            <SEO
                title="Home"
                description="Orion Automation builds AI automation workflows, pipeline automation, production internal system automation, and premium websites with AI Chatbots and Modern Marketing (SEO/AEO/GEO) built in."
                keywords="AI automation, workflow automation, pipeline automation, internal system automation, website development, AI chatbot, SEO, AEO, GEO, Orion Automation, Malaysia"
                canonical="/"
                structuredData={structuredData}
            />
            <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="container">
                <ScrollObserver>
                    {/* Hero Section */}
                    <div className="glass-card flex-center flex-col text-center animate-me mb-2xl" style={{
                        padding: '4rem 2rem',
                        minHeight: '88vh',
                        boxSizing: 'border-box',
                        background: 'linear-gradient(135deg, rgba(255, 248, 231, 0.9) 0%, rgba(230, 165, 32, 0.15) 100%)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <p style={{
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#E6A520',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                marginBottom: '1rem'
                            }}>
                                Welcome to
                            </p>
                            <h1 className="mb-md text-gradient-animate" style={{
                                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                                fontWeight: '800',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em'
                            }}>
                                Orion Automation
                            </h1>
                            <p className="mb-lg" style={{
                                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                                maxWidth: '650px',
                                color: '#7A4A00',
                                lineHeight: 1.6
                            }}>
                                Transform Your Business with <span style={{ color: '#E6A520', fontWeight: '700' }}>AI-Powered Solutions</span>
                            </p>
                            <div className="flex gap-md" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Button onClick={() => setIsModalOpen(true)} variant="primary" size="large">
                                    Explore Services
                                </Button>
                                <Button href="https://wa.me/601117993797" target="_blank" rel="noopener noreferrer" variant="outline" size="large">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-2" style={{ marginBottom: '4rem', gap: '1.5rem' }}>
                        {services.map((service, index) => (
                            <div key={index} className="glass-card hover-lift animate-me" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '2.5rem 2rem'
                            }}>
                                <div style={{ marginBottom: '1.5rem' }} className="icon-hover">
                                    <Icon name={service.icon} size={56} color="#E6A520" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 className="mb-sm" style={{ color: '#7A4A00', fontWeight: '700', fontSize: '1.4rem' }}>{service.title}</h3>
                                    <p className="mb-md" style={{ fontSize: '0.95rem', color: '#7A4A00', opacity: 0.75, lineHeight: 1.6 }}>{service.description}</p>
                                </div>
                                <Link to={service.link} style={{ textDecoration: 'none', marginTop: 'auto' }}>
                                    <Button variant="outline" size="small">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* About Us */}
                    <div className="glass-card flex-center flex-col text-center animate-me" style={{ 
                        padding: '4rem 3rem', 
                        marginBottom: '4rem',
                        background: 'linear-gradient(135deg, rgba(255, 248, 231, 0.85) 0%, rgba(230, 165, 32, 0.08) 100%)'
                    }}>
                        <h2 style={sectionTitleStyle}>Pioneering the Future</h2>
                        <p style={{ maxWidth: '700px', fontSize: '1.15rem', color: '#7A4A00', opacity: 0.85, lineHeight: 1.8, marginBottom: '2.5rem' }}>
                            We believe that every business, regardless of size, deserves access to <span style={{ color: '#E6A520', fontWeight: '600' }}>world-class automation solutions</span>. Our team combines technical excellence with creative innovation.
                        </p>
                        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <div style={{ textAlign: 'center' }}>
                                <Icon name="chatbot" size={36} color="#7A4A00" />
                                <p style={{ fontSize: '0.9rem', color: '#7A4A00', fontWeight: '600', opacity: 0.8, marginTop: '0.5rem' }}>AI-Powered</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Icon name="zap" size={36} color="#E6A520" />
                                <p style={{ fontSize: '0.9rem', color: '#7A4A00', fontWeight: '600', opacity: 0.8, marginTop: '0.5rem' }}>Fast</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Icon name="shield" size={36} color="#7A4A00" />
                                <p style={{ fontSize: '0.9rem', color: '#7A4A00', fontWeight: '600', opacity: 0.8, marginTop: '0.5rem' }}>Secure</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Icon name="chart" size={36} color="#7A4A00" />
                                <p style={{ fontSize: '0.9rem', color: '#7A4A00', fontWeight: '600', opacity: 0.8, marginTop: '0.5rem' }}>Scalable</p>
                            </div>
                        </div>
                    </div>

                    {/* Our Process */}
                    <div className="glass-card animate-me" style={{ padding: '3rem', marginBottom: '4rem' }}>
                        <h2 style={sectionTitleStyle}>Our Process</h2>
                        <p style={sectionSubtitleStyle}>A proven methodology that delivers results, every time.</p>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start',
                            position: 'relative',
                            flexWrap: 'wrap',
                            gap: '2rem'
                        }}>
                            {/* Connecting Line */}
                            <div style={{
                                position: 'absolute',
                                top: '30px',
                                left: '60px',
                                right: '60px',
                                height: '2px',
                                background: 'linear-gradient(90deg, rgba(230, 165, 32, 0.3) 0%, rgba(230, 165, 32, 0.6) 50%, rgba(230, 165, 32, 0.3) 100%)',
                                zIndex: 0
                            }} />
                            {processSteps.map((step, i) => (
                                <div key={i} style={{ 
                                    textAlign: 'center', 
                                    flex: '1 1 200px',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <div style={{
                                        width: '60px', 
                                        height: '60px', 
                                        borderRadius: '50%', 
                                        background: 'linear-gradient(135deg, rgba(230, 165, 32, 0.2) 0%, rgba(230, 165, 32, 0.1) 100%)',
                                        border: '2px solid #E6A520',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        margin: '0 auto 1rem auto'
                                    }}>
                                        <span style={{ 
                                            fontSize: '1.2rem', 
                                            fontWeight: '700', 
                                            color: '#E6A520' 
                                        }}>
                                            {i + 1}
                                        </span>
                                    </div>
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <Icon name={step.icon} size={24} color="#E6A520" />
                                    </div>
                                    <h4 style={{ color: '#7A4A00', marginBottom: '0.5rem', fontWeight: '700' }}>{step.title}</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#7A4A00', opacity: 0.7 }}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="glass-card flex-center flex-col text-center animate-me" style={{ 
                        padding: '5rem 3rem',
                        background: 'linear-gradient(135deg, rgba(230, 165, 32, 0.1) 0%, rgba(255, 248, 231, 0.9) 100%)'
                    }}>
                        <h2 className="mb-lg" style={{ 
                            color: '#7A4A00', 
                            fontSize: 'clamp(2rem, 4vw, 3rem)', 
                            fontWeight: '800' 
                        }}>
                            Ready to Transform Your Business?
                        </h2>
                        <p style={{ 
                            fontSize: '1.15rem', 
                            color: '#7A4A00', 
                            opacity: 0.8, 
                            marginBottom: '2.5rem', 
                            maxWidth: '550px' 
                        }}>
                            Let's scope your first automation, website, or AI chatbot — no fluff, no hard sell.
                        </p>
                        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="large" className="btn-shimmer">
                            Get Started Today
                        </Button>
                    </div>
                </ScrollObserver>
            </div>
        </motion.div>
    );
};

export default Home;
