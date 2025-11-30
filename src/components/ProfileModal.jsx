import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from './ServiceModal';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, logout, updateProfile } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: ''
    });
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                username: user.username
            });
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSave = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProfile({ avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

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
                        zIndex: 1500,
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
                            maxWidth: '500px',
                            width: '100%',
                            position: 'relative',
                            border: '1px solid var(--color-gold)',
                            boxShadow: 'var(--shadow-glow-gold)',
                            padding: 'var(--spacing-xl)',
                            maxHeight: '90vh',
                            overflowY: 'auto'
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

                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-lg)',
                            marginBottom: 'var(--spacing-xl)',
                            borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
                            paddingBottom: 'var(--spacing-lg)'
                        }}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        border: '2px solid var(--color-gold)',
                                        objectFit: 'cover'
                                    }}
                                />
                                <button
                                    onClick={triggerFileInput}
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        background: 'var(--color-gold)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: 'black',
                                        fontSize: '12px'
                                    }}
                                    title="Upload Photo"
                                >
                                    📷
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </div>

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
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.name}</h2>
                                        <p style={{ color: 'var(--color-gold)', opacity: 0.8, fontSize: '0.9rem' }}>@{user.username}</p>
                                        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Member since {user.joinDate}</p>
                                    </>
                                )}
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="btn btn-secondary"
                                    style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        {/* Current Plan */}
                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--spacing-md)', fontSize: '1.2rem' }}>Current Plan</h3>
                            {user.currentPlan ? (
                                <div style={{
                                    background: 'rgba(197, 168, 128, 0.1)',
                                    padding: 'var(--spacing-md)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-gold)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{user.currentPlan.title}</h4>
                                        <span style={{
                                            background: 'var(--color-gold)',
                                            color: 'black',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '12px',
                                            fontWeight: 'bold',
                                            fontSize: '0.7rem'
                                        }}>ACTIVE</span>
                                    </div>
                                    <p style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{user.currentPlan.price}</p>
                                    <p style={{ opacity: 0.7, fontSize: '0.8rem' }}>Purchased on: {user.currentPlan.purchaseDate}</p>
                                </div>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: 'var(--spacing-lg)',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    <p style={{ marginBottom: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>You haven't purchased any plans yet.</p>
                                    <button
                                        onClick={() => setIsServiceModalOpen(true)}
                                        className="btn btn-primary"
                                        style={{ width: '100%' }}
                                    >
                                        Browse Services
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Account Actions */}
                        <div style={{ borderTop: '1px solid rgba(197, 168, 128, 0.2)', paddingTop: 'var(--spacing-lg)' }}>
                            <button
                                onClick={() => {
                                    logout();
                                    onClose();
                                }}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #ff4444',
                                    color: '#ff4444',
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: 'var(--radius-sm)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.9rem'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 68, 68, 0.1)'}
                                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                            >
                                Log Out
                            </button>
                        </div>
                    </motion.div>

                    {/* Nested Service Modal */}
                    <ServiceModal
                        isOpen={isServiceModalOpen}
                        onClose={() => setIsServiceModalOpen(false)}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProfileModal;
