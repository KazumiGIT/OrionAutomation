import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, structuredData, robots }) => {
    const siteUrl = 'https://orionautomation.xyz';
    const fullUrl = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : siteUrl;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title} | Orion Automation</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {robots && <meta name="robots" content={robots} />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${siteUrl}/og-image.jpg`} />

            {/* Structured Data (JSON-LD) — accepts a single object or an array of objects */}
            {structuredData &&
                (Array.isArray(structuredData) ? structuredData : [structuredData]).map((schema, i) => (
                    <script key={i} type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                ))}
        </Helmet>
    );
};

export default SEO;
