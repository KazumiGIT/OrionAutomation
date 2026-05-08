import React from 'react';

const Skeleton = ({ 
    width = '100%', 
    height = '20px', 
    borderRadius = 'var(--radius-sm)',
    style = {} 
}) => {
    return (
        <div
            className="skeleton-pulse"
            style={{
                width,
                height,
                borderRadius,
                background: 'linear-gradient(90deg, rgba(230, 165, 32, 0.1) 25%, rgba(230, 165, 32, 0.2) 50%, rgba(230, 165, 32, 0.1) 75%)',
                backgroundSize: '200% 100%',
                animation: 'skeleton-shimmer 1.5s infinite',
                ...style
            }}
        />
    );
};

export const SkeletonCard = ({ rows = 3, style = {} }) => {
    return (
        <div className="glass-card" style={{ padding: 'var(--spacing-lg)', ...style }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                <Skeleton height="24px" width="60%" />
                {Array.from({ length: rows }).map((_, i) => (
                    <Skeleton key={i} height="16px" width={`${100 - (i * 15)}%`} />
                ))}
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                    <Skeleton width="80px" height="32px" borderRadius="var(--radius-sm)" />
                    <Skeleton width="80px" height="32px" borderRadius="var(--radius-sm)" />
                </div>
            </div>
        </div>
    );
};

export const SkeletonTestimonial = ({ style = {} }) => {
    return (
        <div className="glass-card" style={{ padding: 'var(--spacing-lg)', ...style }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <div style={{ flex: 1 }}>
                    <Skeleton height="18px" width="60%" style={{ marginBottom: '8px' }} />
                    <Skeleton height="14px" width="40%" />
                </div>
            </div>
            <Skeleton height="16px" width="100%" style={{ marginBottom: '8px' }} />
            <Skeleton height="16px" width="85%" />
        </div>
    );
};

export default Skeleton;
