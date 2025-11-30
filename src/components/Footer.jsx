import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="glass" style={{
            marginTop: 'auto',
            padding: 'var(--spacing-xl) 0',
            borderTop: '1px solid rgba(197, 168, 128, 0.1)',
        }}>
            <div className="container">
                <div className="grid grid-3" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <div>
                        <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-gold)',
                            fontSize: '1.2rem',
                            marginBottom: 'var(--spacing-sm)',
                        }}>
                            ORION AUTOMATION
                        </h3>
                        <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                            Transform your business with AI-powered solutions.
                        </p>
                    </div>

                    <div>

                    </div>

                    <div>

                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-gold)',
                            fontSize: '1rem',
                            marginBottom: 'var(--spacing-sm)',
                        }}>
                            Contact
                        </h4>
                        <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                            Email: marketing@orionautomation.xyz<br />
                            <a href="https://wa.me/601154455435" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                WhatsApp: +60 11-5445 5435
                            </a>
                        </p>
                    </div>
                </div>

                <div style={{
                    textAlign: 'center',
                    paddingTop: 'var(--spacing-lg)',
                    borderTop: '1px solid rgba(197, 168, 128, 0.1)',
                    opacity: 0.6,
                    fontSize: '0.85rem',
                }}>
                    © 2025 Orion Automation. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
