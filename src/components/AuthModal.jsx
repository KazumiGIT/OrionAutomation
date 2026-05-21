import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose }) => {
    const { login: adminLogin } = useAdmin();
    const { signup: setMockUser } = useUser();

    const [formData, setFormData] = useState({ name: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const reset = () => {
        setFormData({ name: '', password: '' });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await adminLogin(formData.name, formData.password);
            // Mirror admin into the avatar/profile UI so the dropdown reads "logged in".
            setMockUser(formData.name, `${formData.name.toLowerCase()}@orion.local`, formData.password);
            reset();
            onClose();
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const inputStyle = {
        width: '100%',
        padding: '0.875rem',
        background: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(230, 165, 32, 0.3)',
        borderRadius: '8px',
        color: '#7A4A00',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#7A4A00',
        fontSize: '0.9rem',
        fontWeight: '500',
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
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem'
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="glass-card"
                        style={{
                            maxWidth: '440px',
                            width: '100%',
                            padding: '2.5rem',
                            position: 'relative',
                            background: 'rgba(255, 248, 231, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(230, 165, 32, 0.3)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#7A4A00',
                                opacity: 0.6,
                                transition: 'opacity 0.3s ease',
                                padding: '0.5rem',
                                lineHeight: 1,
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
                        >
                            ✕
                        </button>

                        <h1 style={{
                            textAlign: 'center',
                            marginBottom: '0.5rem',
                            fontSize: '2rem',
                            color: '#7A4A00',
                            fontWeight: 'bold',
                        }}>
                            Welcome Back
                        </h1>
                        <p style={{
                            textAlign: 'center',
                            marginBottom: '2rem',
                            color: '#7A4A00',
                            opacity: 0.7,
                            fontSize: '0.95rem',
                        }}>
                            Sign in to manage the blog.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                        >
                            <div>
                                <label style={labelStyle} htmlFor="login-name">Name</label>
                                <input
                                    id="login-name"
                                    type="text"
                                    autoComplete="username"
                                    placeholder="Varakorn"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                    autoFocus
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#E6A520';
                                        e.currentTarget.style.boxShadow =
                                            '0 0 0 3px rgba(230, 165, 32, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor =
                                            'rgba(230, 165, 32, 0.3)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            <div>
                                <label style={labelStyle} htmlFor="login-password">Password</label>
                                <input
                                    id="login-password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#E6A520';
                                        e.currentTarget.style.boxShadow =
                                            '0 0 0 3px rgba(230, 165, 32, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor =
                                            'rgba(230, 165, 32, 0.3)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            {error && (
                                <div
                                    role="alert"
                                    style={{
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(192, 0, 0, 0.08)',
                                        color: '#8a0000',
                                        border: '1px solid rgba(192, 0, 0, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: loading ? '#C5891A' : '#E6A520',
                                    color: '#FFF8E7',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: loading ? 'wait' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(230, 165, 32, 0.3)',
                                    marginTop: '0.5rem',
                                }}
                                onMouseEnter={(e) => {
                                    if (loading) return;
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow =
                                        '0 6px 16px rgba(230, 165, 32, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow =
                                        '0 4px 12px rgba(230, 165, 32, 0.3)';
                                }}
                            >
                                {loading ? 'Signing in…' : 'Login'}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
