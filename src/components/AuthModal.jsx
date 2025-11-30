import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup } = useUser();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            if (login(formData.email, formData.password)) {
                onClose();
                setFormData({ name: '', email: '', password: '' });
            }
        } else {
            if (signup(formData.name, formData.email, formData.password)) {
                onClose();
                setFormData({ name: '', email: '', password: '' });
            }
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
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
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card"
                            style={{
                                maxWidth: '500px',
                                width: '100%',
                                padding: '2.5rem',
                                position: 'relative',
                                background: 'rgba(255, 248, 231, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(230, 165, 32, 0.3)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
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
                                    lineHeight: 1
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                            >
                                ✕
                            </button>

                            <h1 style={{
                                textAlign: 'center',
                                marginBottom: '2rem',
                                fontSize: '2rem',
                                color: '#7A4A00',
                                fontWeight: 'bold'
                            }}>
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h1>

                            {/* Tab Toggle */}
                            <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                marginBottom: '2rem',
                                borderBottom: '1px solid rgba(230, 165, 32, 0.2)',
                            }}>
                                <button
                                    onClick={() => setIsLogin(true)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: 'transparent',
                                        border: 'none',
                                        color: isLogin ? '#E6A520' : '#7A4A00',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        borderBottom: isLogin ? '2px solid #E6A520' : 'none',
                                        transition: 'all 0.3s ease',
                                        fontWeight: isLogin ? '600' : '500',
                                        opacity: isLogin ? 1 : 0.6
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setIsLogin(false)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: 'transparent',
                                        border: 'none',
                                        color: !isLogin ? '#E6A520' : '#7A4A00',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        borderBottom: !isLogin ? '2px solid #E6A520' : 'none',
                                        transition: 'all 0.3s ease',
                                        fontWeight: !isLogin ? '600' : '500',
                                        opacity: !isLogin ? 1 : 0.6
                                    }}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {!isLogin && (
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            color: '#7A4A00',
                                            fontSize: '0.9rem',
                                            fontWeight: '500'
                                        }}>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required={!isLogin}
                                            style={{
                                                width: '100%',
                                                padding: '0.875rem',
                                                background: 'rgba(255, 255, 255, 0.5)',
                                                border: '1px solid rgba(230, 165, 32, 0.3)',
                                                borderRadius: '8px',
                                                color: '#7A4A00',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = '#E6A520';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(230, 165, 32, 0.1)';
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = 'rgba(230, 165, 32, 0.3)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#7A4A00',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            background: 'rgba(255, 255, 255, 0.5)',
                                            border: '1px solid rgba(230, 165, 32, 0.3)',
                                            borderRadius: '8px',
                                            color: '#7A4A00',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = '#E6A520';
                                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(230, 165, 32, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(230, 165, 32, 0.3)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#7A4A00',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            background: 'rgba(255, 255, 255, 0.5)',
                                            border: '1px solid rgba(230, 165, 32, 0.3)',
                                            borderRadius: '8px',
                                            color: '#7A4A00',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = '#E6A520';
                                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(230, 165, 32, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(230, 165, 32, 0.3)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: '#E6A520',
                                        color: '#FFF8E7',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(230, 165, 32, 0.3)',
                                        marginTop: '0.5rem'
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
                                    {isLogin ? 'Login' : 'Create Account'}
                                </button>
                            </form>

                            {isLogin && (
                                <p style={{
                                    textAlign: 'center',
                                    marginTop: '1.5rem',
                                    opacity: 0.7,
                                    fontSize: '0.9rem',
                                    color: '#7A4A00'
                                }}>
                                    <a href="#" style={{ color: '#E6A520', textDecoration: 'none', fontWeight: '500' }}>Forgot password?</a>
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
