import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useUser } from '../context/UserContext';

const ChatbotWidget = () => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: (() => {
                const saved = localStorage.getItem('chatbotSettings');
                const name = saved ? JSON.parse(saved).botName : 'Orion AI';
                return `Hello! I am ${name} powered by Google Gemini. How can I assist you today?`;
            })()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Initialize Gemini API
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

        // Add user message
        const userMessage = { type: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Get settings from localStorage or use defaults
            const savedSettings = localStorage.getItem('chatbotSettings');
            const settings = savedSettings ? JSON.parse(savedSettings) : {
                botName: 'Orion AI',
                aiGoal: 'You are Orion AI, a friendly assistant for Orion Automation. Help visitors learn about our services and connect with us.',
                personality: 'Conversational, helpful, and concise. Keep responses SHORT (2-3 sentences max). Sound human and friendly, not robotic.',
                knowledgeBase: `ORION AUTOMATION - Complete Info:

🤖 AI CHATBOT SERVICES:
- Basic Plan: RM 399/month - Perfect for small businesses, 1,000 messages/month, basic customization
- Advanced Plan: RM 799/month - Growing businesses, 5,000 messages/month, full customization, analytics
- Enterprise Plan: RM 1,499/month - Large companies, unlimited messages, priority support, advanced AI

💻 WEBSITE DEVELOPMENT:
- Essential Package: RM 8,900 - 5-page responsive website, mobile-friendly, basic SEO, 1 month support
- Premium Package: RM 19,900 - 10-page custom design, advanced SEO, e-commerce ready, 3 months support
- Elite Package: RM 39,900 - Unlimited pages, premium design, full e-commerce, 6 months support, custom features

📱 MARKETING & SEO:
- Social media management
- Google Ads & Facebook Ads
- SEO optimization
- Content creation
- Email marketing campaigns

📍 CONTACT:
- Email: marketing@orionautomation.xyz
- WhatsApp: +60 11-5445 5435
- Website: orionautomation.xyz
- Location: Based in Malaysia, serving globally

🎯 WHAT WE DO:
We help businesses grow with AI chatbots, beautiful websites, and smart marketing. Our mission is making automation accessible to everyone.

✨ PORTFOLIO:
- Sumi-Ka Restaurant website (authentic Japanese yakitori restaurant in SS15 Subang Jaya)
- Multiple e-commerce platforms
- Corporate websites
- Custom web applications

RESPONSE STYLE:
- Keep it SHORT (2-3 sentences)
- Be friendly and conversational
- Use emojis occasionally 
- If asked about pricing, mention packages briefly
- Always offer to connect them via WhatsApp or email for details
- Sound like a helpful human, not a robot`
            };

            // Create context based on settings
            let userContext = '';
            if (user) {
                userContext = `
CURRENT USER INFO:
- Username: ${user.username}
- Email: ${user.email}
- Current Plan: ${user.currentPlan ? `${user.currentPlan.title} (${user.currentPlan.price})` : 'No active plan'}
- Member Since: ${user.joinDate}

INSTRUCTION: You are talking to @${user.username}. Use their username occasionally to be friendly. You know their plan status, so if they ask about upgrades, refer to their current plan.`;
            } else {
                userContext = `
CURRENT USER INFO: Guest User (Not logged in)

INSTRUCTION: The user is a guest. Encourage them to sign up or log in if they ask about account-specific features.`;
            }

            const context = `You are ${settings.botName}.

${settings.aiGoal}

Personality: ${settings.personality}

${userContext}

Knowledge Base:
${settings.knowledgeBase}

CRITICAL: Keep your response SHORT (maximum 2-3 sentences). Be conversational and human-like.

User question: ${currentInput}`;

            // Call Gemini API
            const result = await model.generateContent(context);
            const response = await result.response;
            const botResponse = response.text();

            // Add bot response
            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        } catch (error) {
            console.error('Gemini API error:', error);
            let errorMessage = "I'm having trouble connecting right now. ";

            if (error.message?.includes('API key')) {
                errorMessage += "Please check the API configuration.";
            } else if (error.message?.includes('quota')) {
                errorMessage += "API quota exceeded. Please try again later.";
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
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
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
                    bottom: '7rem',
                    right: '2rem',
                    width: '350px',
                    height: '500px',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    overflow: 'hidden',
                    animation: 'slideInUp 0.3s ease-out',
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
                                maxWidth: '80%',
                                padding: '0.8rem',
                                borderRadius: '12px',
                                background: msg.type === 'user' ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.1)',
                                color: msg.type === 'user' ? '#000' : '#7A4A00',
                                fontSize: '0.9rem',
                                borderBottomRightRadius: msg.type === 'user' ? '2px' : '12px',
                                borderBottomLeftRadius: msg.type === 'bot' ? '2px' : '12px',
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
                        padding: '1rem',
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
                                padding: '0.5rem 1rem',
                                color: '#fff',
                                outline: 'none',
                                opacity: isLoading ? 0.6 : 1,
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
