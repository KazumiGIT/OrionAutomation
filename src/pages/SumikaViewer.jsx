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
        document.body.style.height = '100%';
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.overflowX = 'hidden';

        // Restore when component unmounts
        return () => {
            if (navbar) navbar.style.display = '';
            if (footer) footer.style.display = '';
            if (chatbot) chatbot.style.display = '';

            // Restore body scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.overflowX = '';
            document.documentElement.style.overflow = '';
            document.documentElement.style.overflowX = '';
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: '#2b2b2b',
            overflow: 'hidden',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100vw'
        }}>
            <iframe
                src="/SUMI-KA/index.html"
                style={{
                    flex: 1,
                    width: '100%',
                    maxWidth: '100vw',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                    overflow: 'hidden',
                    overflowX: 'hidden',
                    WebkitOverflowScrolling: 'touch'
                }}
                title="Sumi-Ka Restaurant Website"
                scrolling="yes"
            />
        </div>
    );
};

export default SumikaViewer;
