import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ProfileModal from './ProfileModal';
import AuthModal from './AuthModal';
import Icon from './Icons';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useUser();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Default guest avatar - using Boring Avatars style
    const getAvatar = (seed) => {
        return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=E6A520,7A4A00,FFF8E7`;
    };

    const defaultAvatar = getAvatar('guest');

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/ai-chatbot', label: 'AI Chatbots' },
        { path: '/website', label: 'Websites' },
        { path: '/marketing', label: 'Marketing' },
        { path: '/website-portfolio', label: 'Portfolio' }
    ];

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '1rem 0',
                transition: 'all 0.3s ease',
                background: scrolled
                    ? 'rgba(255, 248, 231, 0.8)'
                    : 'rgba(255, 248, 231, 0.5)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: scrolled
                    ? '1px solid rgba(230, 165, 32, 0.3)'
                    : '1px solid rgba(230, 165, 32, 0.1)',
                boxShadow: scrolled
                    ? '0 4px 20px rgba(122, 74, 0, 0.1)'
                    : 'none'
            }}>
                <div className="container navbar-container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 2rem',
                    position: 'relative'
                }}>
                    {/* Logo */}
                    <Link to="/" className="logo" style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #E6A520 0%, #7A4A00 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}>
                        <Icon name="rocket" size={32} color="#E6A520" />
                        ORION
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="nav-links-desktop">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="nav-link"
                                style={{
                                    color: location.pathname === link.path ? '#E6A520' : '#7A4A00',
                                    textDecoration: 'none',
                                    fontWeight: location.pathname === link.path ? '600' : '500',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    padding: '0.5rem 0'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Profile Section (Desktop) */}
                    <div className="nav-links-desktop" style={{ flex: '0 0 auto' }}>
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                style={{
                                    background: 'transparent',
                                    border: '2px solid var(--color-gold)',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    padding: '3px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    boxShadow: isDropdownOpen ? '0 0 20px rgba(197, 168, 128, 0.5)' : 'none'
                                }}
                            >
                                <img
                                    src={user ? getAvatar(user.email) : defaultAvatar}
                                    alt={user ? user.name : 'Guest'}
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="glass-card fade-in" style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: '0',
                                    marginTop: '0.75rem',
                                    width: '280px',
                                    padding: '0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    zIndex: 10000,
                                    border: '1px solid var(--color-gold)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                                    background: 'rgba(255, 248, 231, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '12px'
                                }}>
                                    <div style={{
                                        padding: '1.25rem',
                                        background: 'rgba(230, 165, 32, 0.1)',
                                        borderBottom: '1px solid rgba(230, 165, 32, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <img
                                            src={user ? getAvatar(user.email) : defaultAvatar}
                                            alt={user ? user.name : 'Guest'}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                border: '2px solid var(--color-gold)',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                            <div style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                color: '#7A4A00',
                                                marginBottom: '0.25rem',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {user ? user.name : 'Guest'}
                                            </div>
                                            <div style={{
                                                fontSize: '0.85rem',
                                                color: 'var(--color-gold)',
                                                opacity: 0.8,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {user ? `@${user.username}` : 'Guest User'}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ padding: '0.75rem 0 1rem' }}>
                                        {user ? (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setIsProfileModalOpen(true);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="nav-link"
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        padding: '0.75rem 1.25rem',
                                                        color: '#7A4A00',
                                                        display: 'block',
                                                        fontSize: '1rem',
                                                        width: '100%',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    👤 My Profile
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        padding: '0.75rem 1.25rem',
                                                        color: '#ff6b6b',
                                                        display: 'block',
                                                        fontSize: '1rem',
                                                        width: '100%',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    🚪 Logout
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setIsAuthModalOpen(true);
                                                    setIsDropdownOpen(false);
                                                }}
                                                style={{
                                                    display: 'block',
                                                    textAlign: 'center',
                                                    margin: '0 1.25rem 0.75rem',
                                                    padding: '0.75rem',
                                                    background: 'var(--color-gold)',
                                                    color: '#FFF8E7',
                                                    borderRadius: 'var(--radius-sm)',
                                                    fontWeight: 'bold',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    width: 'calc(100% - 2.5rem)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                🔐 Login / Sign Up
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hamburger Menu Button */}
                    <button
                        className="nav-hamburger"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Icon name="menu" size={28} color="#7A4A00" />
                    </button>

                    {/* Mobile Menu */}
                    <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    color: location.pathname === link.path ? '#E6A520' : '#7A4A00',
                                    textDecoration: 'none',
                                    fontWeight: location.pathname === link.path ? '700' : '500',
                                    fontSize: '1.1rem',
                                    padding: '0.5rem 0',
                                    textAlign: 'center'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div style={{ height: '1px', background: 'rgba(230, 165, 32, 0.2)', margin: '0.5rem 0' }} />

                        {user ? (
                            <>
                                <button
                                    onClick={() => {
                                        setIsProfileModalOpen(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#7A4A00',
                                        fontSize: '1.1rem',
                                        padding: '0.5rem 0',
                                        cursor: 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    My Profile
                                </button>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#ff6b6b',
                                        fontSize: '1.1rem',
                                        padding: '0.5rem 0',
                                        cursor: 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsAuthModalOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                style={{
                                    background: 'var(--color-gold)',
                                    color: '#FFF8E7',
                                    border: 'none',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginTop: '0.5rem'
                                }}
                            >
                                Login / Sign Up
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    );
};

export default Navbar;
