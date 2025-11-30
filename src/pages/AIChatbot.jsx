import React from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../components/PricingCard';
import TestimonialCard from '../components/TestimonialCard';
import Icon from '../components/Icons';
import AnimatedBackground from '../components/AnimatedBackground';

const AIChatbot = () => {
    const plans = [
        {
            title: 'Basic Plan',
            price: 'RM 399',
            setupFee: 'RM 499 (RM 0 for annual)',
            features: [
                '1 Platform (WhatsApp/Messenger/Instagram)',
                'Smart Chatbot (24/7)',
                'Auto Response for Common Enquiries',
                'Appointment Booking System',
                '1 Calendar for booking'
            ]
        },
        {
            title: 'Premium AI Automation',
            price: 'RM 699',
            setupFee: 'RM 999',
            isPopular: true,
            features: [
                'Up to 3 Platforms',
                'Everything in Basic',
                '3 AI Automation Workflows',
                '3 Calendars',
                'CRM Integration (Pipeline, Contact, Tags)'
            ]
        },
        {
            title: 'Complete Plan',
            price: 'RM 999',
            setupFee: 'RM 2,599',
            features: [
                'Up to 3 Platforms',
                'Everything in Premium',
                'Website + Live AI Chatbot Widget',
                'AI Voice Call (Phone Number)',
                '10 Calendar Integration',
                '10 Workflow Automations',
                'Monthly Chatbot Training (tone, flow, style)',
                'Monthly Email Marketing Automation',
                'Monthly Dashboard Insights'
            ]
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            company: 'Wellness Studio KL',
            role: 'Founder',
            text: 'The AI chatbot has transformed our booking process. We now handle 3x more appointments without hiring additional staff. Customer satisfaction is at an all-time high!',
            rating: 5
        },
        {
            name: 'Ahmad Razak',
            company: 'TechGear Malaysia',
            role: 'Operations Manager',
            text: 'Orion\'s chatbot automation cut our response time from hours to seconds. The CRM integration is seamless, and we\'ve seen a 40% increase in lead conversions.',
            rating: 5
        },
        {
            name: 'Michelle Tan',
            company: 'Gourmet Delights',
            role: 'Owner',
            text: 'Best investment we\'ve made! The chatbot handles customer inquiries 24/7, and the monthly training keeps it getting smarter. Our team can now focus on what matters most.',
            rating: 5
        }
    ];

    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
            {/* Hero Section */}
            <section className="section" style={{
                padding: '6rem 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <AnimatedBackground />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            color: '#7A4A00',
                            marginBottom: '1.5rem',
                            fontWeight: 'bold',
                            lineHeight: 1.1
                        }}>
                            AI Chatbots That <span style={{ color: '#E6A520' }}>Never Sleep</span>
                        </h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#7A4A00',
                            opacity: 0.8,
                            marginBottom: '2.5rem',
                            lineHeight: 1.6
                        }}>
                            Automate customer conversations, bookings, and support 24/7 across WhatsApp, Messenger, and Instagram
                        </p>
                        <a
                            href="https://wa.me/601154455435"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2.5rem',
                                background: '#E6A520',
                                color: '#FFF8E7',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 12px rgba(230, 165, 32, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(230, 165, 32, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(230, 165, 32, 0.3)';
                            }}
                        >
                            Get Started
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* The Problem */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <Icon name="chart" size={64} color="#E6A520" style={{ marginBottom: '1.5rem' }} />
                        <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', marginBottom: '1.5rem' }}>The Problem</h2>
                        <p style={{ fontSize: '1.2rem', color: '#7A4A00', opacity: 0.8, maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
                            Missing customer messages at 2 AM? Losing leads because you can't respond instantly?
                            Your competitors are automating while you're manually replying to the same questions over and over.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Solution - Features */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        The Solution
                    </h2>
                    <div className="grid grid-2" style={{ gap: '2rem' }}>
                        <div className="glass-card hover-lift" style={{ padding: '2rem' }}>
                            <Icon name="zap" size={48} color="#E6A520" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>Instant Responses</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Answer customer inquiries in seconds, not hours. Your AI chatbot responds instantly, 24/7.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2rem' }}>
                            <Icon name="calendar" size={48} color="#E6A520" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>Smart Booking</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Let customers book appointments directly through chat. Automated reminders reduce no-shows.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2rem' }}>
                            <Icon name="sync" size={48} color="#E6A520" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>CRM Integration</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Every conversation is tracked. Leads are automatically organized and tagged for follow-up.
                            </p>
                        </div>
                        <div className="glass-card hover-lift" style={{ padding: '2rem' }}>
                            <Icon name="target" size={48} color="#E6A520" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#7A4A00', marginBottom: '1rem' }}>Multi-Platform</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                One chatbot across WhatsApp, Messenger, and Instagram. Manage everything from one dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        Who Needs This?
                    </h2>
                    <div className="grid grid-3" style={{ gap: '2rem' }}>
                        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.3rem', color: '#E6A520', marginBottom: '1rem' }}>Real Estate Agents</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Schedule property viewings automatically. Qualify leads while you sleep.
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.3rem', color: '#E6A520', marginBottom: '1rem' }}>E-Commerce</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Answer product questions instantly. Process orders through chat.
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.3rem', color: '#E6A520', marginBottom: '1rem' }}>Healthcare</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Book appointments 24/7. Send automated reminders to reduce no-shows.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        Pricing Plans
                    </h2>
                    <div className="grid grid-3" style={{ gap: '2rem' }}>
                        {plans.map((plan, index) => (
                            <PricingCard key={index} {...plan} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        What Our Clients Say
                    </h2>
                    <div className="grid grid-3" style={{ gap: '2rem' }}>
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '4rem 2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', marginBottom: '1.5rem' }}>
                            Ready to Automate Your Business?
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#7A4A00', opacity: 0.8, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Join hundreds of businesses already using AI chatbots to scale their customer service
                        </p>
                        <a
                            href="https://wa.me/601154455435"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2.5rem',
                                background: '#E6A520',
                                color: '#FFF8E7',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 12px rgba(230, 165, 32, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(230, 165, 32, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(230, 165, 32, 0.3)';
                            }}
                        >
                            Contact Us on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AIChatbot;
