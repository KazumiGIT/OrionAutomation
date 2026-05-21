import React from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../components/PricingCard';
import TestimonialCard from '../components/TestimonialCard';
import Icon from '../components/Icons';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';

const AIAutomation = () => {
    const pillars = [
        {
            icon: 'sync',
            title: 'Automation Workflow',
            description:
                'End-to-end workflows that connect your tools, eliminate manual handoffs, and run 24/7. From lead capture to fulfillment, every step is orchestrated.',
            highlights: [
                'Multi-step workflow design',
                'Cross-platform integrations (CRM, email, sheets, payments)',
                'Conditional logic, branching, and human-in-the-loop',
                'Real-time triggers and scheduled jobs'
            ]
        },
        {
            icon: 'chart',
            title: 'Pipeline Automation',
            description:
                'Automated data pipelines that move, transform, and enrich information across your stack. Reliable, observable, and built to scale with your business.',
            highlights: [
                'ETL / ELT pipelines (APIs, databases, files)',
                'Lead and sales pipeline automation',
                'Data enrichment and deduplication',
                'Monitoring, retries, and error alerting'
            ]
        },
        {
            icon: 'code',
            title: 'Production Internal System Automation',
            description:
                'Automate the systems your team actually runs production on — inventory, ops, finance, HR, support. Replace repetitive internal tasks with reliable software.',
            highlights: [
                'Internal dashboards and admin tools',
                'Inventory, ops, and approval workflows',
                'Document generation and reporting',
                'Role-based access and audit trails'
            ]
        }
    ];

    const plans = [
        {
            title: 'Starter Automation',
            price: 'RM 1,499',
            setupFee: 'Setup: from RM 999',
            features: [
                '1 Core Workflow (up to 5 steps)',
                'Integrate up to 3 tools/APIs',
                'Trigger-based execution',
                'Basic error logging',
                '1 Month Support'
            ]
        },
        {
            title: 'Pipeline Pro',
            price: 'RM 2,999',
            setupFee: 'Setup: from RM 1,999',
            isPopular: true,
            features: [
                'Up to 3 Workflows / Pipelines',
                'Integrate up to 8 tools/APIs',
                'Scheduled + real-time triggers',
                'Data transformation & enrichment',
                'Monitoring dashboard & alerts',
                '3 Months Premium Support'
            ]
        },
        {
            title: 'Production Systems',
            price: 'RM 5,999+',
            setupFee: 'Setup: Custom Scope',
            features: [
                'Unlimited workflows / pipelines',
                'Custom internal tools & dashboards',
                'Role-based access & audit logs',
                'Full integration with internal systems',
                'SLA-backed monitoring',
                'Dedicated automation engineer',
                '6 Months Premium Support'
            ]
        }
    ];

    const testimonials = [
        {
            name: 'Ahmad Razak',
            company: 'TechGear Malaysia',
            role: 'Operations Manager',
            text: 'Orion automated our order-to-fulfillment pipeline. What used to take our ops team 4 hours a day now runs itself. We reclaimed an entire headcount.',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            company: 'TechStart Solutions',
            role: 'Founder',
            text: 'They mapped out our internal workflows and rebuilt them as automated pipelines. Reporting that took days now lands in our inbox every morning.',
            rating: 5
        },
        {
            name: 'Sarah Chen',
            company: 'Wellness Studio KL',
            role: 'Founder',
            text: 'From lead capture to booking confirmation, the entire pipeline is automated. We doubled bookings without adding staff.',
            rating: 5
        }
    ];

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'AI Automation Workflow',
        provider: {
            '@type': 'Organization',
            name: 'Orion Automation'
        },
        areaServed: 'Malaysia',
        description:
            'AI-powered automation workflows, data pipeline automation, and production internal system automation for modern businesses.',
        offers: {
            '@type': 'Offer',
            price: '1499',
            priceCurrency: 'MYR'
        }
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <SEO
                title="AI Automation Workflow"
                description="AI-powered automation: workflow automation, pipeline automation, and production internal system automation. Eliminate manual work and scale your operations."
                keywords="AI automation, workflow automation, pipeline automation, internal system automation, business process automation, Malaysia"
                canonical="/ai-automation"
                structuredData={structuredData}
            />

            {/* Hero */}
            <section className="section" style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
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
                            AI Automation <span style={{ color: '#E6A520' }}>Workflow</span>
                        </h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#7A4A00',
                            opacity: 0.8,
                            marginBottom: '2.5rem',
                            lineHeight: 1.6
                        }}>
                            Automation Workflow · Pipeline Automation · Production Internal System Automation
                        </p>
                        <a
                            href="https://wa.me/601117993797"
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
                            Automate My Business
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* The Problem */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <Icon name="alert" size={64} color="#E6A520" style={{ marginBottom: '1.5rem' }} />
                        <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', marginBottom: '1.5rem' }}>The Hidden Cost of Manual Work</h2>
                        <p style={{ fontSize: '1.2rem', color: '#7A4A00', opacity: 0.8, maxWidth: '720px', margin: '0 auto', lineHeight: 1.7 }}>
                            Your team is buried in copy-paste, spreadsheet shuffling, and tools that don't talk to each other.
                            Every manual step is a chance for delays, errors, and burnout. Automation is no longer a luxury — it's the new baseline.
                        </p>
                    </div>
                </div>
            </section>

            {/* Three Pillars */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '0.75rem' }}>
                        Three Pillars of Automation
                    </h2>
                    <p style={{ color: '#7A4A00', opacity: 0.7, textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                        From single-task workflows to full production systems — we automate at every layer of your business.
                    </p>
                    <div className="grid grid-3" style={{ gap: '2rem' }}>
                        {pillars.map((pillar, index) => (
                            <div key={index} className="glass-card hover-lift" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                                <Icon name={pillar.icon} size={56} color="#E6A520" style={{ marginBottom: '1.25rem' }} />
                                <h3 style={{ fontSize: '1.4rem', color: '#7A4A00', marginBottom: '1rem', fontWeight: 700 }}>
                                    {pillar.title}
                                </h3>
                                <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                    {pillar.description}
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {pillar.highlights.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', color: '#7A4A00', opacity: 0.85, fontSize: '0.95rem' }}>
                                            <Icon name="check" size={18} color="#E6A520" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Needs This */}
            <section className="section" style={{ padding: '4rem 2rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        Who Needs This?
                    </h2>
                    <div className="grid grid-3" style={{ gap: '2rem' }}>
                        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.3rem', color: '#E6A520', marginBottom: '1rem' }}>Ops & Logistics</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Automate order processing, inventory sync, and fulfillment status across your tools.
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.3rem', color: '#E6A520', marginBottom: '1rem' }}>Sales & CRM</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Lead routing, follow-ups, and pipeline updates — automatic, instant, never forgotten.
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.3rem', color: '#E6A520', marginBottom: '1rem' }}>Finance & Reporting</h3>
                            <p style={{ color: '#7A4A00', opacity: 0.8, lineHeight: 1.6 }}>
                                Invoices, statements, daily reports — generated, sent, and archived without lifting a finger.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section" style={{ padding: '4rem 2rem', background: 'rgba(230, 165, 32, 0.03)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', color: '#7A4A00', textAlign: 'center', marginBottom: '3rem' }}>
                        Automation Packages
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
                            Let's map your workflows and replace manual work with reliable automation.
                        </p>
                        <a
                            href="https://wa.me/601117993797"
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

export default AIAutomation;
