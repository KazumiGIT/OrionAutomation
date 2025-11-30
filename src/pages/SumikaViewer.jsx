import React, { useEffect } from 'react';

const SumikaViewer = () => {
    useEffect(() => {
        // Hide navbar, footer, and chatbot when component mounts
        const navbar = document.querySelector('nav');
        const footer = document.querySelector('footer');
        const chatbot = document.getElementById('chatbot-widget');

        if (navbar) navbar.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (chatbot) chatbot.style.display = 'none';

        // Restore when component unmounts
        return () => {
            if (navbar) navbar.style.display = '';
            if (footer) footer.style.display = '';
            if (chatbot) chatbot.style.display = '';
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999, // Ensure it's on top of everything
            background: '#2b2b2b'
        }}>
            <iframe
                src="/SUMI-KA/index.html"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                }}
                title="Sumi-Ka Restaurant Website"
            />
        </div>
    );
};

export default SumikaViewer;
