import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from './ServiceModal';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, logout, updateProfile } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: ''
    });
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setFormData({
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
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(8px)',
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
                            border: '2px solid #E6A520',
                            boxShadow: '0 20px 60px rgba(230, 165, 32, 0.3)',
                            padding: '2rem',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            background: 'rgba(255, 248, 231, 0.95)'
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
                                color: '#7A4A00',
                                fontSize: '2rem',
                                cursor: 'pointer',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(230, 165, 32, 0.2)'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                            ×
                        </button>

                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            marginBottom: '2rem',
                            paddingBottom: '1.5rem',
                            borderBottom: '2px solid rgba(230, 165, 32, 0.3)'
                        }}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        border: '3px solid #E6A520',
                                        objectFit: 'cover',
                                        boxShadow: '0 4px 12px rgba(230, 165, 32, 0.3)'
                                    }}
                                />
                                <button
                                    onClick={triggerFileInput}
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        background: '#E6A520',
                                        border: '2px solid #FFF8E7',
                                        borderRadius: '50%',
                                        width: '36px',
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: '#000',
                                        fontSize: '16px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    title="Upload Photo"
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'scale(1.1)';
                                        e.target.style.background = '#D49520';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.background = '#E6A520';
                                    }}
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
                                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                border: '2px solid #E6A520',
                                                padding: '0.75rem',
                                                color: '#000',
                                                borderRadius: '8px',
                                                fontSize: '1rem',
                                                fontWeight: '600'
                                            }}
                                            placeholder="Username"
                                        />
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                            <button
                                                type="submit"
                                                style={{
                                                    flex: 1,
                                                    background: '#E6A520',
                                                    color: '#000',
                                                    border: 'none',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = '#D49520'}
                                                onMouseLeave={(e) => e.target.style.background = '#E6A520'}
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                style={{
                                                    flex: 1,
                                                    background: 'transparent',
                                                    color: '#7A4A00',
                                                    border: '2px solid #7A4A00',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = 'rgba(122, 74, 0, 0.1)'}
                                                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h2 style={{
                                            fontSize: '1.8rem',
                                            marginBottom: '0.25rem',
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}>
                                            @{user.username}
                                        </h2>
                                        <p style={{
                                            fontSize: '0.85rem',
                                            color: '#7A4A00',
                                            opacity: 0.7
                                        }}>
                                            Member since {user.joinDate}
                                        </p>
                                    </>
                                )}
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    style={{
                                        background: '#E6A520',
                                        color: '#000',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 8px rgba(230, 165, 32, 0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#D49520';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = '#E6A520';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        {/* Current Plan */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{
                                color: '#000',
                                marginBottom: '1rem',
                                fontSize: '1.3rem',
                                fontWeight: 'bold'
                            }}>
                                Current Plan
                            </h3>
                            {user.currentPlan ? (
                                <div style={{
                                    background: 'rgba(230, 165, 32, 0.1)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '2px solid #E6A520'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <h4 style={{ fontSize: '1.2rem', margin: 0, color: '#000', fontWeight: 'bold' }}>{user.currentPlan.title}</h4>
                                        <span style={{
                                            background: '#E6A520',
                                            color: '#000',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px',
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem'
                                        }}>ACTIVE</span>
                                    </div>
                                    <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#000', fontWeight: '600' }}>{user.currentPlan.price}</p>
                                    <p style={{ color: '#7A4A00', fontSize: '0.85rem' }}>Purchased on: {user.currentPlan.purchaseDate}</p>
                                </div>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    background: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: '12px',
                                    border: '2px dashed #E6A520'
                                }}>
                                    <p style={{ marginBottom: '1.5rem', color: '#7A4A00', fontSize: '1rem' }}>You haven't purchased any plans yet.</p>
                                    <button
                                        onClick={() => setIsServiceModalOpen(true)}
                                        style={{
                                            background: '#E6A520',
                                            color: '#000',
                                            border: 'none',
                                            padding: '1rem 2rem',
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                            width: '100%',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 12px rgba(230, 165, 32, 0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = '#D49520';
                                            e.target.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = '#E6A520';
                                            e.target.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        Browse Services
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Account Actions */}
                        <div style={{ borderTop: '2px solid rgba(230, 165, 32, 0.3)', paddingTop: '1.5rem' }}>
                            <button
                                onClick={() => {
                                    logout();
                                    onClose();
                                }}
                                style={{
                                    background: 'transparent',
                                    border: '2px solid #ff4444',
                                    color: '#ff4444',
                                    padding: '0.75rem 2rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    width: '100%'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(255, 68, 68, 0.1)';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                🚪 Log Out
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
