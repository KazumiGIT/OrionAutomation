import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const LoadingScreen = ({ onComplete }) => {
    const containerRef = useRef(null);
    const leftGateRef = useRef(null);
    const rightGateRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        // Text Pulse Animation
        anime({
            targets: textRef.current,
            opacity: [0.5, 1],
            duration: 800,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });

        // Exit Animation Sequence
        const exitTimeline = anime.timeline({
            autoplay: false,
            complete: () => {
                if (onComplete) onComplete();
            }
        });

        exitTimeline
            .add({
                targets: textRef.current,
                opacity: 0,
                duration: 500,
                delay: 1500 // Wait for initial load simulation
            })
            .add({
                targets: leftGateRef.current,
                translateX: '-100%',
                duration: 1000,
                easing: 'easeInOutExpo'
            })
            .add({
                targets: rightGateRef.current,
                translateX: '100%',
                duration: 1000,
                easing: 'easeInOutExpo',
                offset: '-=1000'
            })
            .add({
                targets: containerRef.current,
                opacity: 0,
                duration: 500,
                easing: 'linear'
            });

        // Trigger exit after a set time (simulating load)
        setTimeout(() => {
            exitTimeline.play();
        }, 2000);

    }, [onComplete]);

    return (
        <div ref={containerRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none'
        }}>
            {/* Left Gate */}
            <div ref={leftGateRef} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: '#FFF8E7',
                borderRight: '2px solid #E6A520',
                zIndex: 1
            }} />

            {/* Right Gate */}
            <div ref={rightGateRef} style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                background: '#FFF8E7',
                borderLeft: '2px solid #E6A520',
                zIndex: 1
            }} />

            {/* Center Content */}
            <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 ref={textRef} style={{
                    fontFamily: "'Rye', serif",
                    color: '#7A4A00',
                    letterSpacing: '0.2em',
                    fontSize: '1.5rem'
                }}>
                    INITIALIZING...
                </h2>
            </div>
        </div>
    );
};

export default LoadingScreen;
