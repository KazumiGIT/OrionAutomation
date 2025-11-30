import React, { useEffect } from 'react';

const SumikaViewer = () => {
    useEffect(() => {
        // Hide navbar, footer, and chatbot
        const navbar = document.querySelector('nav');
        const footer = document.querySelector('footer');
        const chatbot = document.getElementById('chatbot-widget');

        if (navbar) navbar.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (chatbot) chatbot.style.display = 'none';

        // Lock body scroll to prevent background scrolling/shaking
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        // Restore when component unmounts
        return () => {
            if (navbar) navbar.style.display = '';
            if (footer) footer.style.display = '';
            if (chatbot) chatbot.style.display = '';

            // Restore body scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0, // Better than 100vh for mobile
            zIndex: 9999,
            background: '#2b2b2b',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <iframe
                src="/SUMI-KA/index.html"
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                    WebkitOverflowScrolling: 'touch' // Smooth scroll for iOS
                }}
                title="Sumi-Ka Restaurant Website"
            />
        </div>
    );
};

export default SumikaViewer;
