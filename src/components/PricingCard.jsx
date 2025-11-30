import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const PricingCard = ({ title, price, setupFee, features, isPopular = false }) => {
    const { user, purchasePlan } = useUser();
    const navigate = useNavigate();

    const handlePurchase = () => {
        if (!user) {
            navigate('/auth');
            return;
        }

        purchasePlan({
            title,
            price,
            features
        });
        navigate('/profile');
    };

    return (
        <div
            className="glass-card hover-lift card-3d fade-in-up"
            style={{
                position: 'relative',
                border: isPopular ? '2px solid #E6A520' : '1px solid rgba(230, 165, 32, 0.2)',
                boxShadow: isPopular ? '0 8px 32px rgba(230, 165, 32, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {isPopular && (
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '20px',
                    background: 'linear-gradient(135deg, #E6A520 0%, #C58A20 100%)',
                    color: '#FFF8E7',
                    padding: '0.4rem 1.2rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    boxShadow: '0 4px 12px rgba(230, 165, 32, 0.4)'
                }}>
                    POPULAR
                </div>
            )}

            <div style={{ flex: 1 }}>
                <h3 style={{
                    color: '#E6A520',
                    marginBottom: '1rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}>
                    {title}
                </h3>

                {setupFee && (
                    <p style={{
                        color: '#7A4A00',
                        opacity: 0.7,
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                    }}>
                        Setup: <span style={{ color: '#E6A520', fontWeight: '600' }}>{setupFee}</span>
                    </p>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#7A4A00',
                    }}>
                        {price}
                    </span>
                    <span style={{
                        fontSize: '1rem',
                        color: '#7A4A00',
                        opacity: 0.6,
                    }}>
                        /month
                    </span>
                </div>

                <ul style={{
                    listStyle: 'none',
                    marginBottom: '1.5rem',
                    padding: 0,
                }}>
                    {features.map((feature, index) => (
                        <li key={index} style={{
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem',
                        }}>
                            <span style={{ color: '#E6A520', fontSize: '1.2rem', lineHeight: 1 }}>✓</span>
                            <span style={{ color: '#7A4A00', opacity: 0.9, lineHeight: 1.5 }}>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <Button
                onClick={handlePurchase}
                variant="primary"
                size="medium"
                style={{ width: '100%' }}
            >
                {user ? 'Purchase Plan' : 'Get Started'}
            </Button>
        </div>
    );
};

export default PricingCard;
