import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
    return (
        <div className="animated-bg">
            {/* Animated Gradient Mesh */}
            <div className="gradient-mesh"></div>

            {/* Floating Geometric Shapes */}
            <div className="shapes-container">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
            </div>

            {/* Animated Grid Lines */}
            <svg className="grid-overlay" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(230, 165, 32, 0.1)" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
};

export default AnimatedBackground;
