import React, { useEffect, useRef } from 'react';
import '../styles/animations.css';

const ParticleBackground = () => {
    const containerRef = useRef(null);
    const particleCount = 50; // Reduced count for performance with interaction
    const colors = ['var(--color-gold)', 'var(--color-merlot)', '#C5A880', '#730000'];
    const sizes = ['small', 'medium', 'large'];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const particles = container.getElementsByClassName('particle');
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            Array.from(particles).forEach(particle => {
                const rect = particle.getBoundingClientRect();
                const particleX = rect.left + rect.width / 2;
                const particleY = rect.top + rect.height / 2;

                const deltaX = mouseX - particleX;
                const deltaY = mouseY - particleY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (distance < 150) {
                    const angle = Math.atan2(deltaY, deltaX);
                    const force = (150 - distance) / 150;
                    const moveX = Math.cos(angle) * force * -20;
                    const moveY = Math.sin(angle) * force * -20;

                    particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    particle.style.transform = 'translate(0, 0)';
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const particles = Array.from({ length: particleCount }).map((_, i) => {
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 15 + Math.random() * 25;

        return (
            <div
                key={i}
                className={`particle ${size}`}
                style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    background: color,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    transition: 'transform 0.2s ease-out'
                }}
            />
        );
    });

    return <div ref={containerRef} className="particle-container">{particles}</div>;
};

export default ParticleBackground;
