import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Icon from '../components/Icons';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '2rem'
            }}
        >
            <SEO
                title="404 - Page Not Found"
                description="The page you're looking for doesn't exist."
                robots="noindex, nofollow"
            />
            <div className="glass-card text-center" style={{ maxWidth: '500px', padding: '4rem 2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Icon name="rocket" size={80} color="#E6A520" />
                </div>
                <h1 style={{ 
                    fontSize: 'clamp(4rem, 15vw, 8rem)', 
                    color: '#E6A520', 
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    lineHeight: 1
                }}>
                    404
                </h1>
                <h2 style={{ 
                    fontSize: '1.5rem', 
                    color: '#7A4A00', 
                    marginBottom: '1rem',
                    fontWeight: '600'
                }}>
                    Lost in Space?
                </h2>
                <p style={{ 
                    color: '#7A4A00', 
                    opacity: 0.8, 
                    marginBottom: '2rem',
                    lineHeight: 1.6
                }}>
                    The page you're looking for has drifted into another galaxy. 
                    Let's get you back on track.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/">
                        <Button variant="primary">
                            Back to Home
                        </Button>
                    </Link>
                    <Link to="/ai-chatbot">
                        <Button variant="outline">
                            Explore Services
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default NotFound;
