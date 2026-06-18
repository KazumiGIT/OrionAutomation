import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { sendChatMessage } from '../lib/api';

// The Gemini key and all guardrails live on the backend (POST /api/chat).
// Nothing AI-related ships in this bundle, so the rules can't be bypassed.

const ChatbotWidget = () => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: (() => {
                const saved = localStorage.getItem('chatbotSettings');
                const name = saved ? JSON.parse(saved).botName : 'Orion AI';
                return `Hello! I am ${name}. How can I assist you today?`;
            })()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const currentInput = input.trim();

        // Build recent conversation history (exclude the very first greeting).
        const history = messages
            .slice(1)
            .map((m) => ({ role: m.type === 'user' ? 'user' : 'model', text: m.text }));

        // Optional personalization hint. The backend treats this as untrusted and
        // never uses it for access control.
        const userCtx = user
            ? {
                username: user.username,
                plan: user.currentPlan ? `${user.currentPlan.title} (${user.currentPlan.price})` : 'No active plan',
            }
            : null;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: currentInput }]);
        setInput('');
        setIsLoading(true);

        try {
            const { reply } = await sendChatMessage({
                message: currentInput,
                history,
                user: userCtx,
            });
            setMessages(prev => [...prev, { type: 'bot', text: reply }]);
            setApiError(false);
        } catch (error) {
            console.error('Chat error:', error);
            let errorMessage = "I'm having trouble connecting right now. ";

            if (error.status === 429) {
                errorMessage = "You're sending messages a little too fast. Please wait a moment and try again.";
            } else if (error.status === 503) {
                errorMessage = "The chatbot is temporarily unavailable. Please reach us at marketing@orionautomation.xyz.";
                setApiError(true);
            } else {
                errorMessage += "Please try asking your question again, or contact us at marketing@orionautomation.xyz";
            }

            setMessages(prev => [...prev, { type: 'bot', text: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                id="chatbot-widget"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    right: '1.5rem',
                    width: window.innerWidth <= 768 ? '55px' : '60px',
                    height: window.innerWidth <= 768 ? '55px' : '60px',
                    borderRadius: '50%',
                    background: 'var(--color-merlot)',
                    border: '2px solid var(--color-gold)',
                    color: 'var(--color-gold)',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    zIndex: 1000,
                    boxShadow: '0 0 20px rgba(115, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
                className="hover-lift"
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="glass-card" style={{
                    position: 'fixed',
                    bottom: window.innerWidth <= 768 ? '0' : '7rem',
                    right: window.innerWidth <= 768 ? '0' : '2rem',
                    left: window.innerWidth <= 768 ? '0' : 'auto',
                    width: window.innerWidth <= 768 ? '100%' : '350px',
                    height: window.innerWidth <= 768 ? '85vh' : '500px',
                    maxHeight: window.innerWidth <= 768 ? '85vh' : '80vh',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    overflow: 'hidden',
                    animation: 'slideInUp 0.3s ease-out',
                    borderRadius: window.innerWidth <= 768 ? '16px 16px 0 0' : '12px',
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(115, 0, 0, 0.3)',
                        borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#00ff00',
                            boxShadow: '0 0 5px #00ff00',
                        }} />
                        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-gold)' }}>
                            {(() => {
                                const saved = localStorage.getItem('chatbotSettings');
                                return saved ? JSON.parse(saved).botName : 'Orion AI Assistant';
                            })()}
                        </h3>
                        <span style={{
                            marginLeft: 'auto',
                            fontSize: '0.7rem',
                            color: 'var(--color-gold)',
                            opacity: 0.7,
                            background: 'rgba(197, 168, 128, 0.1)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '10px'
                        }}>Powered by Gemini</span>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        padding: '1rem',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: window.innerWidth <= 768 ? '75%' : '80%',
                                padding: window.innerWidth <= 768 ? '0.6rem' : '0.8rem',
                                borderRadius: '12px',
                                background: msg.type === 'user' ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.1)',
                                color: msg.type === 'user' ? '#000' : '#7A4A00',
                                fontSize: window.innerWidth <= 768 ? '0.85rem' : '0.9rem',
                                borderBottomRightRadius: msg.type === 'user' ? '2px' : '12px',
                                borderBottomLeftRadius: msg.type === 'bot' ? '2px' : '12px',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{
                                alignSelf: 'flex-start',
                                maxWidth: '80%',
                                padding: '0.8rem',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: '#7A4A00',
                                fontSize: '0.9rem',
                                display: 'flex',
                                gap: '0.5rem',
                                alignItems: 'center',
                            }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: 'var(--color-gold)',
                                    animation: 'pulse 1s infinite'
                                }} />
                                <span>Thinking...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} style={{
                        padding: window.innerWidth <= 768 ? '0.75rem' : '1rem',
                        borderTop: '1px solid rgba(197, 168, 128, 0.2)',
                        display: 'flex',
                        gap: '0.5rem',
                    }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            style={{
                                flex: 1,
                                background: 'rgba(0, 0, 0, 0.3)',
                                border: '1px solid rgba(197, 168, 128, 0.3)',
                                borderRadius: '20px',
                                padding: window.innerWidth <= 768 ? '0.5rem 0.75rem' : '0.5rem 1rem',
                                color: '#fff',
                                outline: 'none',
                                opacity: isLoading ? 0.6 : 1,
                                fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                background: isLoading ? 'rgba(197, 168, 128, 0.5)' : 'var(--color-gold)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '35px',
                                height: '35px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ChatbotWidget;
