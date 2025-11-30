import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, logout, updateProfile } = useUser();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: ''
    });

    useEffect(() => {
        if (!user) {
            navigate('/auth');
        } else {
            setFormData({
                name: user.name,
                username: user.username
            });
        }
    }, [user, navigate]);

    if (!user) return null;

    const handleSave = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setIsEditing(false);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '8rem' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--spacing-xl)' }}
                >
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-lg)',
                        marginBottom: 'var(--spacing-xl)',
                        borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
                        paddingBottom: 'var(--spacing-lg)'
                    }}>
                        <img
                            src={user.avatar}
                            alt="Profile"
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                border: '2px solid var(--color-gold)'
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            {isEditing ? (
                                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{
                                            background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid var(--color-gold)',
                                            padding: '0.5rem',
                                            color: 'white',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        style={{
                                            background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid var(--color-gold)',
                                            padding: '0.5rem',
                                            color: 'white',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button type="submit" className="btn btn-primary" style={{ padding: '0.25rem 1rem', fontSize: '0.8rem' }}>Save</button>
                                        <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary" style={{ padding: '0.25rem 1rem', fontSize: '0.8rem' }}>Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{user.name}</h1>
                                    <p style={{ color: 'var(--color-gold)', opacity: 0.8 }}>@{user.username}</p>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Member since {user.joinDate}</p>
                                </>
                            )}
                        </div>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn btn-secondary"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* Current Plan */}
                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h2 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-md)' }}>Current Plan</h2>
                        {user.currentPlan ? (
                            <div style={{
                                background: 'rgba(197, 168, 128, 0.1)',
                                padding: 'var(--spacing-lg)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-gold)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{user.currentPlan.title}</h3>
                                    <span style={{
                                        background: 'var(--color-gold)',
                                        color: 'black',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem'
                                    }}>ACTIVE</span>
                                </div>
                                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{user.currentPlan.price}</p>
                                <p style={{ opacity: 0.7 }}>Purchased on: {user.currentPlan.purchaseDate}</p>
                            </div>
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                padding: 'var(--spacing-xl)',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <p style={{ marginBottom: '1rem', opacity: 0.7 }}>You haven't purchased any plans yet.</p>
                                <button onClick={() => navigate('/')} className="btn btn-primary">Browse Services</button>
                            </div>
                        )}
                    </div>

                    {/* Account Actions */}
                    <div style={{ borderTop: '1px solid rgba(197, 168, 128, 0.2)', paddingTop: 'var(--spacing-lg)' }}>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                            style={{
                                background: 'transparent',
                                border: '1px solid #ff4444',
                                color: '#ff4444',
                                padding: '0.5rem 1.5rem',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 68, 68, 0.1)'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                            Log Out
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
