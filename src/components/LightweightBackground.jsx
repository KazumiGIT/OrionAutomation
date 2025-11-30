import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const LightweightBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create SVG Gears dynamically
        const createGear = (size, x, y, color, duration, direction) => {
            const gear = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            gear.setAttribute("viewBox", "0 0 100 100");
            gear.style.width = `${size}px`;
            gear.style.height = `${size}px`;
            gear.style.position = 'absolute';
            gear.style.left = `${x}%`;
            gear.style.top = `${y}%`;
            gear.style.opacity = '0.1';
            gear.style.zIndex = '-1';

            // Simple Gear Path
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M50 0 L60 10 L70 0 L80 15 L95 10 L90 25 L100 35 L90 45 L100 55 L90 65 L100 75 L85 80 L80 95 L65 90 L55 100 L45 90 L35 100 L20 95 L15 80 L0 75 L10 65 L0 55 L10 45 L0 35 L10 25 L5 10 L20 15 L30 0 L40 10 Z");
            path.setAttribute("fill", color);

            gear.appendChild(path);
            container.appendChild(gear);

            // Animate with Anime.js
            anime({
                targets: gear,
                rotate: direction === 'cw' ? 360 : -360,
                duration: duration,
                easing: 'linear',
                loop: true
            });
        };

        // Generate Gears
        createGear(300, -10, -10, '#FFD77A', 20000, 'cw');
        createGear(500, 80, 60, '#E6A520', 30000, 'ccw');
        createGear(200, 20, 80, '#7A4A00', 15000, 'cw');
        createGear(150, 90, 10, '#FFD77A', 12000, 'ccw');

        // Floating Particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#E6A520';
            particle.style.position = 'absolute';
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0.4';
            container.appendChild(particle);

            anime({
                targets: particle,
                translateX: () => anime.random(-50, 50) + 'vw',
                translateY: () => anime.random(-50, 50) + 'vh',
                scale: [0, 1],
                opacity: [0, 0.5, 0],
                easing: 'easeInOutSine',
                duration: () => anime.random(3000, 8000),
                delay: () => anime.random(0, 2000),
                loop: true
            });
        }

        return () => {
            container.innerHTML = ''; // Cleanup
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                overflow: 'hidden',
                background: '#FFF8E7'
            }}
        />
    );
};

export default LightweightBackground;
