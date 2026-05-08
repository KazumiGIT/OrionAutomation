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
            rating: 5,
            avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Sarah&backgroundColor=E6A520'
        },
        {
            name: 'David Lim',
            company: 'Luxury Interiors',
            role: 'CEO',
            text: 'Orion delivered a website that perfectly captures our brand essence. Unmatched quality.',
            rating: 5,
            avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=David&backgroundColor=730000'
        },
        {
            name: 'Ahmad Razak',
            company: 'TechGear Malaysia',
            role: 'Operations Manager',
            text: "Orion's automation solutions cut our response time from hours to seconds.",
            rating: 5,
            avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Ahmad&backgroundColor=7A4A00'
        }
    ];

    const stats = [
        { number: '98%', label: 'Client Satisfaction' },
        { number: '500+', label: 'Projects Delivered' },
        { number: '24/7', label: 'Support Available' }
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

    const renderStars = (count) => {
        return Array.from({ length: count }).map((_, i) => (
            <Icon key={i} name="star-filled" size={18} color="#E6A520" style={{ marginRight: '2px' }} />
        ));
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
                        padding: '5rem 2rem',
                        minHeight: '55vh',
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
                    <div className="bento-grid" style={{ marginBottom: '4rem' }}>
                        {services.map((service, index) => (
                            <div key={index} className="bento-item glass-card hover-lift animate-me" style={{
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

                    {/* Stats */}
                    <div className="grid grid-3" style={{ marginBottom: '4rem' }}>
                        {stats.map((stat, index) => (
                            <div key={index} className="glass-card animate-me" style={{
                                padding: '2.5rem 2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ 
                                    fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
                                    color: '#E6A520', 
                                    marginBottom: '0.5rem', 
                                    fontWeight: '800',
                                    lineHeight: 1 
                                }}>
                                    {stat.number}
                                </h3>
                                <p style={{ color: '#7A4A00', fontSize: '1rem', fontWeight: '500', opacity: 0.8 }}>{stat.label}</p>
                            </div>
                        ))}
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

                    {/* Testimonials */}
                    <div className="glass-card animate-me" style={{ padding: '3rem', marginBottom: '4rem' }}>
                        <h2 style={sectionTitleStyle}>Client Success Stories</h2>
                        <p style={sectionSubtitleStyle}>Don't just take our word for it.</p>
                        <div className="grid grid-3" style={{ gap: '1.5rem' }}>
                            {testimonials.map((t, i) => (
                                <div key={i} className="glass-card animate-me" style={{ 
                                    padding: '2rem', 
                                    background: 'rgba(255, 248, 231, 0.5)',
                                    borderTop: '3px solid #E6A520'
                                }}>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <Icon name="quote" size={32} color="rgba(230, 165, 32, 0.3)" />
                                    </div>
                                    <div style={{ marginBottom: '1rem', display: 'flex', gap: '2px' }}>
                                        {renderStars(t.rating)}
                                    </div>
                                    <p className="mb-md" style={{ 
                                        fontStyle: 'italic', 
                                        color: '#7A4A00', 
                                        fontSize: '1rem', 
                                        lineHeight: 1.7, 
                                        opacity: 0.9 
                                    }}>
                                        "{t.text}"
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                                        <img 
                                            src={t.avatar} 
                                            alt={t.name}
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '50%',
                                                border: '2px solid #E6A520',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div>
                                            <h4 style={{ color: '#7A4A00', marginBottom: '0.2rem', fontWeight: '700', fontSize: '1rem' }}>{t.name}</h4>
                                            <p style={{ fontSize: '0.8rem', opacity: 0.7, color: '#7A4A00' }}>{t.role}, {t.company}</p>
                                        </div>
                                    </div>
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
                            Join hundreds of successful businesses already using our AI-powered solutions.
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
