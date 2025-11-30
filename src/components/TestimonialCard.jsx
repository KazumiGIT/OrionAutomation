import React from 'react';

const TestimonialCard = ({ name, company, role, text, rating = 5 }) => {
    return (
        <div className="glass-card fade-in-up hover-lift">
            <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    {[...Array(rating)].map((_, i) => (
                        <span key={i} style={{ color: 'var(--color-gold)', fontSize: '1.2rem' }}>★</span>
                    ))}
                </div>

                <p style={{
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    marginBottom: 'var(--spacing-lg)',
                    opacity: 0.9,
                    lineHeight: 1.6,
                }}>
                    "{text}"
                </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(197, 168, 128, 0.2)', paddingTop: 'var(--spacing-md)' }}>
                <p style={{
                    fontWeight: 600,
                    color: 'var(--color-gold)',
                    marginBottom: 'var(--spacing-xs)',
                }}>
                    {name}
                </p>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                    {role} at {company}
                </p>
            </div>
        </div>
    );
};

export default TestimonialCard;
