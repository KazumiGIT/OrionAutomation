import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const ScrollObserver = ({ children }) => {
    const observerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate children elements with .animate-me class
                    anime({
                        targets: entry.target.querySelectorAll('.animate-me'),
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        delay: anime.stagger(100),
                        easing: 'easeOutCubic'
                    });

                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, []);

    return <div ref={observerRef}>{children}</div>;
};

export default ScrollObserver;
