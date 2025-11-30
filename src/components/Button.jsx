import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    href,
    onClick,
    className = '',
    style = {},
    ...props
}) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: '600',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        textDecoration: 'none',
        fontFamily: 'inherit',
        position: 'relative',
        overflow: 'hidden',
        ...style
    };

    const sizes = {
        small: {
            padding: '0.625rem 1.5rem',
            fontSize: '0.95rem'
        },
        medium: {
            padding: '0.875rem 2rem',
            fontSize: '1rem'
        },
        large: {
            padding: '1.125rem 2.5rem',
            fontSize: '1.1rem'
        }
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, #E6A520 0%, #C58A20 100%)',
            color: '#FFF8E7',
            boxShadow: '0 4px 15px rgba(230, 165, 32, 0.3)',
        },
        secondary: {
            background: 'rgba(255, 248, 231, 0.1)',
            color: '#E6A520',
            border: '2px solid #E6A520',
            boxShadow: '0 4px 15px rgba(230, 165, 32, 0.1)',
        },
        outline: {
            background: 'transparent',
            color: '#7A4A00',
            border: '2px solid rgba(230, 165, 32, 0.4)',
            boxShadow: 'none',
        },
        ghost: {
            background: 'transparent',
            color: '#7A4A00',
            border: 'none',
            boxShadow: 'none',
        }
    };

    const hoverStyles = {
        primary: {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(230, 165, 32, 0.4)',
            background: 'linear-gradient(135deg, #F0B530 0%, #D09530 100%)'
        },
        secondary: {
            transform: 'translateY(-2px)',
            background: 'rgba(230, 165, 32, 0.1)',
            boxShadow: '0 8px 25px rgba(230, 165, 32, 0.2)'
        },
        outline: {
            transform: 'translateY(-2px)',
            background: 'rgba(230, 165, 32, 0.05)',
            borderColor: '#E6A520',
            boxShadow: '0 4px 15px rgba(230, 165, 32, 0.15)'
        },
        ghost: {
            background: 'rgba(230, 165, 32, 0.08)'
        }
    };

    const activeStyles = {
        transform: 'translateY(0)',
        boxShadow: variants[variant].boxShadow
    };

    const combinedStyles = {
        ...baseStyles,
        ...sizes[size],
        ...variants[variant]
    };

    const handleMouseEnter = (e) => {
        Object.assign(e.currentTarget.style, hoverStyles[variant]);
    };

    const handleMouseLeave = (e) => {
        Object.assign(e.currentTarget.style, {
            transform: 'translateY(0)',
            boxShadow: variants[variant].boxShadow,
            background: variants[variant].background
        });
    };

    const handleMouseDown = (e) => {
        Object.assign(e.currentTarget.style, activeStyles);
    };

    const handleMouseUp = (e) => {
        Object.assign(e.currentTarget.style, hoverStyles[variant]);
    };

    if (href) {
        return (
            <a
                href={href}
                className={className}
                style={combinedStyles}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            className={className}
            style={combinedStyles}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
