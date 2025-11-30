import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, link }) => {
    return (
        <div className="glass-card hover-lift card-3d fade-in-up">
            <div style={{ flex: 1 }}>
                <div style={{
                    fontSize: '3rem',
                    marginBottom: 'var(--spacing-md)',
                    textAlign: 'center',
                }}>
                    {icon}
                </div>

                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-gold)',
                    marginBottom: 'var(--spacing-sm)',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                }}>
                    {title}
                </h3>

                <p style={{
                    color: 'var(--color-ivory)',
                    opacity: 0.8,
                    textAlign: 'center',
                    marginBottom: 'var(--spacing-lg)',
                    lineHeight: 1.6,
                }}>
                    {description}
                </p>
            </div>

            <Link to={link} style={{ textDecoration: 'none', display: 'block' }}>
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                    Learn More
                </button>
            </Link>
        </div>
    );
};

export default ServiceCard;
