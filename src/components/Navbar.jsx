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
    const location = useLocation();
    const { user, logout } = useUser();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Default guest avatar - using Boring Avatars style
    const getAvatar = (seed) => {
        return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=E6A520,7A4A00,FFF8E7`;
    };

    const defaultAvatar = getAvatar('guest');

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
                    padding: '0 2rem'
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

                    {/* Navigation Links */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Link
                            to="/"
                            className="nav-link"
                            style={{
                                color: location.pathname === '/' ? '#E6A520' : '#7A4A00',
                                textDecoration: 'none',
                                fontWeight: location.pathname === '/' ? '600' : '500',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                padding: '0.5rem 0'
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/ai-chatbot"
                            className="nav-link"
                            style={{
                                color: location.pathname === '/ai-chatbot' ? '#E6A520' : '#7A4A00',
                                textDecoration: 'none',
                                fontWeight: location.pathname === '/ai-chatbot' ? '600' : '500',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                padding: '0.5rem 0'
                            }}
                        >
                            AI Chatbots
                        </Link>
                        <Link
                            to="/website"
                            className="nav-link"
                            style={{
                                color: location.pathname === '/website' ? '#E6A520' : '#7A4A00',
                                textDecoration: 'none',
                                fontWeight: location.pathname === '/website' ? '600' : '500',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                padding: '0.5rem 0'
                            }}
                        >
                            Websites
                        </Link>
                        <Link
                            to="/marketing"
                            className="nav-link"
                            style={{
                                color: location.pathname === '/marketing' ? '#E6A520' : '#7A4A00',
                                textDecoration: 'none',
                                fontWeight: location.pathname === '/marketing' ? '600' : '500',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                padding: '0.5rem 0'
                            }}
                        >
                            Marketing
                        </Link>
                    </div>

                    {/* Profile Section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Profile Picture Button */}
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
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(197, 168, 128, 0.5)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = isDropdownOpen ? '0 0 20px rgba(197, 168, 128, 0.5)' : 'none'}
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

                            {/* Enhanced Dropdown Menu */}
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
                                    borderRadius: '12px',
                                    height: 'auto'
                                }}>
                                    {/* User Info Header */}
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

                                    {/* Auth/Profile Actions */}
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
                                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                                >
                                                    🚪 Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
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
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                >
                                                    🔐 Login / Sign Up
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
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
