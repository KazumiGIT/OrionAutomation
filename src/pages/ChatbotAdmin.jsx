import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatbotAdmin = () => {
    // Settings State
    const [settings, setSettings] = useState({
        botName: 'Orion AI',
        aiGoal: 'Provide helpful information about our services and schedule appointments.',
        personality: 'Professional, friendly, and concise.',
        knowledgeBase: `Services:
- AI Chatbots: Starting from RM 399/month
- Website Development: Starting from RM 8,900
- Marketing & SEO services

Contact: marketing@orionautomation.xyz`
    });

    // Preview Chat State
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! This is a preview of your custom chatbot. How can I help?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('chatbotSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('chatbotSettings', JSON.stringify(settings));
        alert('Settings saved! The global chatbot has been updated.');
    };

    // Chat Logic (Preview)
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { type: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Construct dynamic context based on settings
            const context = `You are ${settings.botName}.
            
            Your Goal: ${settings.aiGoal}
            
            Your Personality: ${settings.personality}
            
            Knowledge Base:
            ${settings.knowledgeBase}
            
            Please answer the following question based on the above instructions:
            ${currentInput}`;

            const result = await model.generateContent(context);
            const response = await result.response;
            const botResponse = response.text();

            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        } catch (error) {
            console.error('Preview Error:', error);
            setMessages(prev => [...prev, { type: 'bot', text: "Error: Could not generate response. Please check your API key or connection." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '50px' }}
        >
            <div className="container">
                <h1 className="text-center mb-xl" style={{ color: 'var(--color-gold)' }}>AI Chatbot Admin Dashboard</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                    {/* Left Column: Settings */}
                    <div className="glass-card">
                        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Configuration</h2>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Bot Name</label>
                            <input
                                type="text"
                                name="botName"
                                value={settings.botName}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>AI Goal</label>
                            <textarea
                                name="aiGoal"
                                value={settings.aiGoal}
                                onChange={handleChange}
                                rows="3"
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Personality</label>
                            <input
                                type="text"
                                name="personality"
                                value={settings.personality}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Knowledge Base</label>
                            <textarea
                                name="knowledgeBase"
                                value={settings.knowledgeBase}
                                onChange={handleChange}
                                rows="6"
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            className="hover-lift"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--color-gold)',
                                color: '#000',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Save Settings
                        </button>
                    </div>

                    {/* Right Column: Preview & Integration */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Live Preview */}
                        <div className="glass-card" style={{ height: '500px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>Live Preview: {settings.botName}</h3>
                            </div>

                            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {messages.map((msg, idx) => (
                                    <div key={idx} style={{
                                        alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%',
                                        padding: '0.8rem',
                                        borderRadius: '12px',
                                        background: msg.type === 'user' ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.1)',
                                        color: msg.type === 'user' ? '#000' : '#fff',
                                        fontSize: '0.9rem'
                                    }}>
                                        {msg.text}
                                    </div>
                                ))}
                                {isLoading && <div style={{ color: '#fff', opacity: 0.7, fontSize: '0.9rem' }}>Thinking...</div>}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: 'none' }}
                                />
                                <button type="submit" style={{ padding: '0.5rem 1rem', background: 'var(--color-gold)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
                            </form>
                        </div>

                        {/* Integration Hub */}
                        <div className="glass-card">
                            <h3 style={{ marginBottom: '1rem', color: 'var(--color-gold)' }}>Integrations</h3>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {['WhatsApp', 'Instagram', 'Messenger'].map(platform => (
                                    <button key={platform} className="hover-lift" style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <span style={{ fontSize: '1.5rem' }}>🔗</span>
                                        {platform}
                                        <span style={{ fontSize: '0.7rem', opacity: 0.7, background: 'var(--color-merlot)', padding: '2px 6px', borderRadius: '4px' }}>PRO</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatbotAdmin;
