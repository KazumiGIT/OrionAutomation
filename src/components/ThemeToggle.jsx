import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const getThemeLabel = () => {
        if (theme === 'vibrant-blue') return 'Vibrant Blue';
        if (theme === 'green') return 'Green';
        return 'Classic';
    };

    const getThemeIcon = () => {
        if (theme === 'vibrant-blue') {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" fill="url(#vibrant-blue-gradient)" />
                    <defs>
                        <linearGradient id="vibrant-blue-gradient" x1="7" y1="7" x2="17" y2="17">
                            <stop offset="0%" stopColor="#77A8A8" />
                            <stop offset="100%" stopColor="#7E7CEB" />
                        </linearGradient>
                    </defs>
                </svg>
            );
        }

        if (theme === 'green') {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" fill="url(#green-gradient)" />
                    <defs>
                        <linearGradient id="green-gradient" x1="7" y1="7" x2="17" y2="17">
                            <stop offset="0%" stopColor="#01693E" />
                            <stop offset="100%" stopColor="#CDEAF9" />
                        </linearGradient>
                    </defs>
                </svg>
            );
        }

        // Classic theme
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" fill="url(#classic-gradient)" />
                <defs>
                    <linearGradient id="classic-gradient" x1="7" y1="7" x2="17" y2="17">
                        <stop offset="0%" stopColor="#730000" />
                        <stop offset="100%" stopColor="#C5A880" />
                    </linearGradient>
                </defs>
            </svg>
        );
    };

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch theme (current: ${getThemeLabel()})`}
            title={`Current: ${getThemeLabel()} theme`}
        >
            <div className="theme-toggle-icon">
                {getThemeIcon()}
            </div>
            <span className="theme-toggle-label">
                {getThemeLabel()}
            </span>
        </button>
    );
};

export default ThemeToggle;
