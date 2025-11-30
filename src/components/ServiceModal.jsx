import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const services = [
        {
            title: 'AI Chatbot',
            description: 'Automate customer interactions 24/7.',
            link: '/ai-chatbot',
            icon: '🤖'
        },
        {
            title: 'Premium Website',
            description: 'Stunning, high-performance websites.',
            link: '/website',
            icon: '💻'
        },
        {
            title: 'Strategic Marketing',
            description: 'Data-driven campaigns for growth.',
            link: '/marketing',
            icon: '📈'
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(5px)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="glass-card"
                        style={{
                            maxWidth: '400px',
                            width: '100%',
                            position: 'relative',
                            border: '1px solid var(--color-gold)',
                            boxShadow: 'var(--shadow-glow-gold)',
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-ivory)',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                            }}
                        >
                            ×
                        </button>

                        <h2 className="text-center mb-lg" style={{ color: 'var(--color-gold)' }}>
                            Choose a Service
                        </h2>

                        <div className="grid" style={{ gap: '1rem' }}>
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    to={service.link}
                                    onClick={onClose}
                                    className="glass-card hover-lift"
                                    style={{
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(197, 168, 128, 0.2)',
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>{service.icon}</span>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--color-ivory)' }}>
                                            {service.title}
                                        </h3>
                                        <p style={{ fontSize: '0.9rem', opacity: 0.7, margin: 0 }}>
                                            {service.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
