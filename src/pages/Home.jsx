import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceModal from '../components/ServiceModal';
import ScrollObserver from '../components/ScrollObserver';
import Icon from '../components/Icons';
import AnimatedBackground from '../components/AnimatedBackground';
import Button from '../components/Button';
import SEO from '../components/SEO';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const services = [
        {
            icon: 'chatbot',
            title: 'AI Chatbots',
            description: 'Intelligent 24/7 customer support agents that learn and adapt.',
            link: '/ai-chatbot'
        },
        {
            icon: 'website',
            title: 'Premium Websites',
            description: 'Stunning, high-performance websites designed to convert.',
            link: '/website'
        },
        {
            icon: 'marketing',
            title: 'Strategic Marketing',
            description: 'Data-driven campaigns that maximize ROI.',
            link: '/marketing'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            company: 'Wellness Studio KL',
            role: 'Founder',
            text: 'The AI chatbot has transformed our booking process. We now handle 3x more appointments.',
            rating: 5
        },
        {
            name: 'David Lim',
            company: 'Luxury Interiors',
            role: 'CEO',
            text: 'Orion delivered a website that perfectly captures our brand essence. Unmatched quality.',
            rating: 5
        },
        {
            name: 'Ahmad Razak',
            company: 'TechGear Malaysia',
            role: 'Operations Manager',
            text: "Orion's automation solutions cut our response time from hours to seconds.",
            rating: 5
        }
    ];

    const stats = [
        { icon: 'star', number: '98%', label: 'Client Satisfaction' },
        { icon: 'rocket', number: '500+', label: 'Projects Delivered' },
        { icon: 'clock', number: '24/7', label: 'Support Available' }
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
        "logo": "https://orionautomation.xyz/favicon.jpg",
        "sameAs": [
            "https://www.facebook.com/orionautomation",
            "https://twitter.com/orionautomation"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+601154455435",
            "contactType": "customer service"
        }
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
                description="Orion Automation provides cutting-edge AI chatbots and premium website development services to transform your business. Elevate your digital presence today."
                keywords="AI chatbot, website development, automation, digital marketing, Orion Automation, Malaysia"
                canonical="/"
                structuredData={structuredData}
            />
            <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="container">
                <ScrollObserver>
                    {/* Hero Section */}
                    <div className="glass-card flex-center flex-col text-center animate-me mb-2xl" style={{
                        padding: '6rem 2rem',
                        minHeight: '60vh',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(230, 165, 32, 0.05) 100%)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <AnimatedBackground />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h1 className="mb-md" style={{
                                fontSize: 'clamp(3rem, 8vw, 6rem)',
                                color: '#7A4A00',
                                lineHeight: 1.1,
                                fontWeight: 'bold',
                                letterSpacing: '-0.02em'
                            }}>
                                ORION AUTOMATION
                            </h1>
                            <p className="mb-lg" style={{
                                fontSize: '1.3rem',
                                maxWidth: '700px',
                                color: '#7A4A00',
                                opacity: 0.8,
                                lineHeight: 1.6
                            }}>
                                Transform Your Business with <span style={{ color: '#E6A520', fontWeight: '600' }}>AI-Powered Solutions</span>
                            </p>
                            <div className="flex gap-md">
                                <Button onClick={() => setIsModalOpen(true)} variant="primary" size="large">
                                    Explore Services
                                </Button>
                                <Button href="https://wa.me/601154455435" target="_blank" rel="noopener noreferrer" variant="outline" size="large">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="bento-grid">
                        {services.map((service, index) => (
                            <div key={index} className="bento-item glass-card hover-lift animate-me" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '2.5rem 2rem'
                            }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <Icon name={service.icon} size={80} color="#E6A520" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 className="mb-sm" style={{ color: '#7A4A00', fontWeight: '700', fontSize: '1.4rem' }}>{service.title}</h3>
                                    <p className="mb-md" style={{ fontSize: '0.95rem', color: '#7A4A00', opacity: 0.7, lineHeight: 1.6 }}>{service.description}</p>
                                </div>
                                <Link to={service.link} style={{ textDecoration: 'none', marginTop: 'auto' }}>
                                    <Button variant="outline" size="small">
                                        Learn More →
                                    </Button>
                                </Link>
                            </div>
                        ))}

                        {/* About Us */}
                        <div className="bento-item large glass-card flex-center flex-col text-center animate-me" style={{ padding: '3rem' }}>
                            <h2 className="mb-md" style={{ color: '#7A4A00', fontSize: '2.2rem', fontWeight: 'bold' }}>Pioneering the Future</h2>
                            <p style={{ maxWidth: '700px', fontSize: '1.1rem', color: '#7A4A00', opacity: 0.8, lineHeight: 1.8, marginBottom: '2rem' }}>
                                We believe that every business, regardless of size, deserves access to <span style={{ color: '#E6A520', fontWeight: '600' }}>world-class automation solutions</span>. Our team combines technical excellence with creative innovation.
                            </p>
                            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Icon name="chatbot" size={40} color="#7A4A00" />
                                    <p style={{ fontSize: '0.9rem', color: '#7A4A00', fontWeight: '600', opacity: 0.8, marginTop: '0.5rem' }}>AI-Powered</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Icon name="zap" size={40} color="#7A4A00" />
                                    <p style={{ fontSize: '0.9rem', color: '#7A4A00', fontWeight: '600', opacity: 0.8, marginTop: '0.5rem' }}>Fast</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Icon name="shield" size={40} color="#7A4A00" />
                                    <p style={{ fontSize: '0.9rem', color: '#7A4A00', fontWeight: '600', opacity: 0.8, marginTop: '0.5rem' }}>Secure</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Icon name="chart" size={40} color="#7A4A00" />
                                    <p style={{ fontSize: '0.9rem', color: '#7A4A00', fontWeight: '600', opacity: 0.8, marginTop: '0.5rem' }}>Scalable</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        {stats.map((stat, index) => (
                            <div key={index} className="bento-item glass-card animate-me" style={{
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <Icon name={stat.icon} size={40} color="#E6A520" />
                                </div>
                                <h3 style={{ fontSize: '3.5rem', color: '#E6A520', marginBottom: '0.5rem', fontWeight: 'bold' }}>{stat.number}</h3>
                                <p style={{ color: '#7A4A00', fontSize: '1.05rem', fontWeight: '600', opacity: 0.8 }}>{stat.label}</p>
                            </div>
                        ))}

                        {/* Our Process */}
                        <div className="bento-item full glass-card animate-me" style={{ padding: '3rem' }}>
                            <h2 className="text-center mb-xl" style={{ color: '#7A4A00', fontSize: '2.2rem', fontWeight: 'bold' }}>Our Process</h2>
                            <div className="grid grid-4" style={{ gap: '2rem' }}>
                                {processSteps.map((step, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(230, 165, 32, 0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto'
                                        }}>
                                            <Icon name={step.icon} size={30} color="#E6A520" />
                                        </div>
                                        <h4 style={{ color: '#7A4A00', marginBottom: '0.5rem', fontWeight: 'bold' }}>{step.title}</h4>
                                        <p style={{ fontSize: '0.9rem', color: '#7A4A00', opacity: 0.7 }}>{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonials */}
                        <div className="bento-item full glass-card animate-me" style={{ padding: '3rem' }}>
                            <h2 className="text-center mb-xl" style={{ color: '#7A4A00', fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Client Success Stories</h2>
                            <div className="grid grid-3">
                                {testimonials.map((t, i) => (
                                    <div key={i} className="glass-card animate-me" style={{ padding: '2rem', borderLeft: '3px solid #E6A520' }}>
                                        <div style={{
                                            width: '50px', height: '50px', borderRadius: '50%', background: '#E6A520',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.3rem', fontWeight: 'bold', color: '#FFF8E7', marginBottom: '1rem'
                                        }}>
                                            {t.name.charAt(0)}
                                        </div>
                                        <div style={{ marginBottom: '1rem', color: '#E6A520', fontSize: '1rem' }}>
                                            {'⭐'.repeat(t.rating)}
                                        </div>
                                        <p className="mb-md" style={{ fontStyle: 'italic', color: '#7A4A00', fontSize: '1rem', lineHeight: 1.6, opacity: 0.9 }}>"{t.text}"</p>
                                        <h4 style={{ color: '#E6A520', marginBottom: '0.3rem', fontWeight: 'bold', fontSize: '1.05rem' }}>{t.name}</h4>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.7, color: '#7A4A00' }}>{t.role} • {t.company}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bento-item full glass-card flex-center flex-col text-center animate-me" style={{ padding: '4rem 3rem' }}>
                            <h2 className="mb-lg" style={{ color: '#7A4A00', fontSize: '2.5rem', fontWeight: 'bold' }}>Ready to Transform Your Business?</h2>
                            <p style={{ fontSize: '1.2rem', color: '#7A4A00', opacity: 0.8, marginBottom: '2rem', maxWidth: '600px' }}>
                                Join hundreds of successful businesses already using our AI-powered solutions.
                            </p>
                            <Button onClick={() => setIsModalOpen(true)} variant="primary" size="large">
                                Get Started Today 🚀
                            </Button>
                        </div>
                    </div>
                </ScrollObserver>
            </div>
        </motion.div>
    );
};

export default Home;
