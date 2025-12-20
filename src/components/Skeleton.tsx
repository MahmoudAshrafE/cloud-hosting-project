import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'rect' | 'circle' | 'text';
}

const Skeleton = ({ className = '', variant = 'rect' }: SkeletonProps) => {
    const baseClasses = 'animate-pulse bg-slate-800/50 dark:bg-slate-800/50';
    const variantClasses = {
        rect: 'rounded-2xl',
        circle: 'rounded-full',
        text: 'rounded-md h-4 w-full',
    };

    return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />;
};

export default Skeleton;
