import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../components/Icons';

const WebsitePortfolio = () => {
    const portfolioItems = [
        {
            id: 1,
            title: 'Sumi-Ka Restaurant',
            category: 'Restaurant Website',
            description: 'Authentic Japanese yakitori restaurant with elegant design and interactive menu',
            image: '/sumika-card.jpg',
            link: '/sumika',
            tags: ['HTML/CSS', 'JavaScript', 'Responsive'],
            isExternal: true
        },
        {
            id: 2,
            title: 'HOTZILLA',
            category: 'Restaurant Website',
            description: 'Spicy Korean-fusion restaurant with bold design and interactive menu showcasing fire-meets-flavor experience',
            image: '/hotzilla-logo.jpg',
            link: '/hotzilla',
            tags: ['HTML/CSS', 'JavaScript', 'Responsive'],
            isExternal: true
        },
        {
            id: 3,
            title: 'Corporate Business Site',
            category: 'Corporate Website',
            description: 'Professional corporate website with team profiles and service showcases',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
            link: '#',
            tags: ['WordPress', 'Custom Theme', 'SEO'],
            isExternal: false
        },
        {
            id: 4,
            title: 'Creative Portfolio',
            category: 'Portfolio Site',
            description: 'Stunning portfolio website with smooth scrolling and parallax effects',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
            link: '#',
            tags: ['HTML/CSS', 'GSAP', 'Animations'],
            isExternal: false
        },
        {
            id: 5,
            title: 'SaaS Landing Page',
            category: 'Landing Page',
            description: 'High-converting landing page with compelling copy and clear CTAs',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            link: '#',
            tags: ['React', 'Tailwind', 'Analytics'],
            isExternal: false
        },
        {
            id: 6,
            title: 'Real Estate Platform',
            category: 'Property Listing',
            description: 'Interactive property listing platform with advanced search filters',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
            link: '#',
            tags: ['Next.js', 'Database', 'Maps API'],
            isExternal: false
        }
    ];

    const handleCardClick = (item) => {
        if (item.isExternal) {
            window.open(item.link, '_blank');
        }
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
            {/* Hero Section */}
            <section className="section" style={{
                padding: '4rem 2rem',
                background: 'linear-gradient(135deg, rgba(230, 165, 32, 0.05) 0%, rgba(122, 74, 0, 0.05) 100%)'
            }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Icon name="design" size={64} color="#E6A520" style={{ marginBottom: '1.5rem' }} />
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            color: '#7A4A00',
                            marginBottom: '1.5rem',
                            fontWeight: 'bold'
                        }}>
                            Website Portfolio
                        </h1>
                        <p style={{
                            fontSize: '1.2rem',
                            color: '#7A4A00',
                            opacity: 0.8,
                            lineHeight: 1.6,
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            Explore the stunning websites I've crafted for clients across various industries.
                            Each project represents a unique challenge and creative solution.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {portfolioItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="glass-card"
                                onClick={() => item.link !== '#' && handleCardClick(item)}
                                style={{
                                    overflow: 'hidden',
                                    cursor: item.link !== '#' ? 'pointer' : 'default',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    opacity: item.link === '#' ? 0.8 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (item.link !== '#') {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(230, 165, 32, 0.3)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Image */}
                                <div style={{
                                    width: '100%',
                                    height: '250px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    background: '#f0f0f0'
                                }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease',
                                            filter: item.link === '#' ? 'grayscale(100%)' : 'none'
                                        }}
                                    />
                                    {item.isExternal && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            background: '#E6A520',
                                            color: '#FFF8E7',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            boxShadow: '0 4px 12px rgba(230, 165, 32, 0.4)'
                                        }}>
                                            Live Site
                                        </div>
                                    )}
                                    {item.link === '#' && (
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'rgba(0,0,0,0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{
                                                background: 'rgba(255,255,255,0.9)',
                                                color: '#7A4A00',
                                                padding: '0.5rem 1.5rem',
                                                borderRadius: '20px',
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                Coming Soon
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <p style={{
                                        color: '#E6A520',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        marginBottom: '0.5rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        {item.category}
                                    </p>
                                    <h3 style={{
                                        color: '#7A4A00',
                                        fontSize: '1.5rem',
                                        marginBottom: '1rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        color: '#7A4A00',
                                        opacity: 0.8,
                                        lineHeight: 1.6,
                                        marginBottom: '1.5rem',
                                        flex: 1
                                    }}>
                                        {item.description}
                                    </p>

                                    {/* Tags */}
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.5rem'
                                    }}>
                                        {item.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    padding: '0.4rem 0.8rem',
                                                    background: 'rgba(230, 165, 32, 0.1)',
                                                    border: '1px solid rgba(230, 165, 32, 0.3)',
                                                    borderRadius: '20px',
                                                    color: '#7A4A00',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {item.link !== '#' && (
                                        <div style={{
                                            marginTop: '1rem',
                                            padding: '0.75rem',
                                            background: 'rgba(230, 165, 32, 0.05)',
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            color: '#E6A520',
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}>
                                            Click to Visit →
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', marginBottom: '1rem' }}>
                            Ready to Build Your Website?
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#7A4A00', opacity: 0.8, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Let's create something amazing together. Contact me to discuss your project.
                        </p>
                        <a
                            href="https://wa.me/601154455435"
                            target="_blank"
                            rel="noopener noreferrer"
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
                            Contact Me on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebsitePortfolio;
