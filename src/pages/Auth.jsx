import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            if (login(formData.email, formData.password)) {
                navigate('/profile');
            }
        } else {
            if (signup(formData.name, formData.email, formData.password)) {
                navigate('/profile');
            }
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <section className="section" style={{ paddingTop: '8rem' }}>
                <div className="container flex-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card"
                        style={{
                            maxWidth: '500px',
                            width: '100%',
                            padding: 'var(--spacing-2xl)',
                        }}
                    >
                        <h1 style={{
                            textAlign: 'center',
                            marginBottom: 'var(--spacing-lg)',
                            fontSize: '2rem',
                        }}>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>

                        {/* Tab Toggle */}
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-sm)',
                            marginBottom: 'var(--spacing-xl)',
                            borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
                        }}>
                            <button
                                onClick={() => setIsLogin(true)}
                                style={{
                                    flex: 1,
                                    padding: 'var(--spacing-sm)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: isLogin ? 'var(--color-gold)' : 'var(--color-ivory)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    borderBottom: isLogin ? '2px solid var(--color-gold)' : 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                style={{
                                    flex: 1,
                                    padding: 'var(--spacing-sm)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: !isLogin ? 'var(--color-gold)' : 'var(--color-ivory)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    borderBottom: !isLogin ? '2px solid var(--color-gold)' : 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {!isLogin && (
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: 'var(--spacing-xs)',
                                        color: 'var(--color-gold)',
                                        fontSize: '0.9rem',
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
                                            padding: 'var(--spacing-sm)',
                                            background: 'rgba(15, 15, 15, 0.5)',
                                            border: '1px solid rgba(197, 168, 128, 0.2)',
                                            borderRadius: 'var(--radius-sm)',
                                            color: 'var(--color-ivory)',
                                            fontSize: '1rem',
                                        }}
                                    />
                                </div>
                            )}

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: 'var(--spacing-xs)',
                                    color: 'var(--color-gold)',
                                    fontSize: '0.9rem',
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
                                        padding: 'var(--spacing-sm)',
                                        background: 'rgba(15, 15, 15, 0.5)',
                                        border: '1px solid rgba(197, 168, 128, 0.2)',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'var(--color-ivory)',
                                        fontSize: '1rem',
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: 'var(--spacing-xs)',
                                    color: 'var(--color-gold)',
                                    fontSize: '0.9rem',
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
                                        padding: 'var(--spacing-sm)',
                                        background: 'rgba(15, 15, 15, 0.5)',
                                        border: '1px solid rgba(197, 168, 128, 0.2)',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'var(--color-ivory)',
                                        fontSize: '1rem',
                                    }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary mt-md" style={{ width: '100%' }}>
                                {isLogin ? 'Login' : 'Create Account'}
                            </button>
                        </form>

                        {isLogin && (
                            <p style={{
                                textAlign: 'center',
                                marginTop: 'var(--spacing-md)',
                                opacity: 0.7,
                                fontSize: '0.9rem',
                            }}>
                                <a href="#" style={{ color: 'var(--color-gold)' }}>Forgot password?</a>
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Auth;
