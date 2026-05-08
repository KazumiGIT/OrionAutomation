import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icons';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validatePassword = (password) => {
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        return '';
    };

    const validateName = (name) => {
        if (!name) return 'Full name is required';
        if (name.length < 2) return 'Name must be at least 2 characters';
        return '';
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'name': return validateName(value);
            case 'email': return validateEmail(value);
            case 'password': return validatePassword(value);
            default: return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};
        if (!isLogin) {
            const nameError = validateName(formData.name);
            if (nameError) newErrors.name = nameError;
        }
        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        
        setTimeout(() => {
            if (isLogin) {
                if (login(formData.email, formData.password)) {
                    navigate('/profile');
                } else {
                    setErrors({ email: 'Invalid email or password' });
                }
            } else {
                if (signup(formData.name, formData.email, formData.password)) {
                    navigate('/profile');
                } else {
                    setErrors({ email: 'Email already exists' });
                }
            }
            setIsSubmitting(false);
        }, 500);
    };

    const inputStyle = (hasError) => ({
        width: '100%',
        padding: 'var(--spacing-sm)',
        paddingRight: hasError ? 'var(--spacing-xl)' : 'var(--spacing-2xl)',
        background: 'rgba(15, 15, 15, 0.5)',
        border: `1px solid ${hasError ? '#ff6b6b' : 'rgba(197, 168, 128, 0.2)'}`,
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-ivory)',
        fontSize: '1rem',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    });

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

                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-sm)',
                            marginBottom: 'var(--spacing-xl)',
                            borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
                        }}>
                            <button
                                type="button"
                                onClick={() => { setIsLogin(true); setErrors({}); }}
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
                                type="button"
                                onClick={() => { setIsLogin(false); setErrors({}); }}
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

                        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {!isLogin && (
                                <div>
                                    <label htmlFor="name" style={{
                                        display: 'block',
                                        marginBottom: 'var(--spacing-xs)',
                                        color: 'var(--color-gold)',
                                        fontSize: '0.9rem',
                                    }}>
                                        Full Name
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? 'name-error' : undefined}
                                            style={inputStyle(!!errors.name)}
                                        />
                                        {errors.name && (
                                            <Icon name="alert" size={16} color="#ff6b6b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                        )}
                                    </div>
                                    {errors.name && (
                                        <p id="name-error" role="alert" style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" style={{
                                    display: 'block',
                                    marginBottom: 'var(--spacing-xs)',
                                    color: 'var(--color-gold)',
                                    fontSize: '0.9rem',
                                }}>
                                    Email
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                        style={inputStyle(!!errors.email)}
                                    />
                                    {errors.email && (
                                        <Icon name="alert" size={16} color="#ff6b6b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                    )}
                                </div>
                                {errors.email && (
                                    <p id="email-error" role="alert" style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" style={{
                                    display: 'block',
                                    marginBottom: 'var(--spacing-xs)',
                                    color: 'var(--color-gold)',
                                    fontSize: '0.9rem',
                                }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={!!errors.password}
                                        aria-describedby={errors.password ? 'password-error' : undefined}
                                        style={inputStyle(!!errors.password)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        style={{
                                            position: 'absolute',
                                            right: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '0',
                                            display: 'flex',
                                        }}
                                    >
                                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} color="var(--color-gold)" />
                                    </button>
                                </div>
                                {errors.password && (
                                    <p id="password-error" role="alert" style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary mt-md" 
                                style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
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
