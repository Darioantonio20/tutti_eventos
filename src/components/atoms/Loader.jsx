import React from 'react';

const Loader = ({ size = 'md', variant = 'gradient' }) => {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    };

    const variants = {
        gradient: (
            <div className={`${sizes[size]} relative`}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin"
                    style={{
                        maskImage: 'linear-gradient(transparent 50%, black 50%)',
                        WebkitMaskImage: 'linear-gradient(transparent 50%, black 50%)'
                    }}
                />
                <div className="absolute inset-1 rounded-full bg-white" />
                <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
            </div>
        ),
        dots: (
            <div className={`${sizes[size]} relative flex items-center justify-center`}>
                <div className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping" />
                <div className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
        ),
        pulse: (
            <div className={`${sizes[size]} relative`}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse opacity-75" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-ping" />
            </div>
        ),
    };

    return (
        <div className="inline-flex items-center justify-center">
            {variants[variant]}
        </div>
    );
};

export default Loader;
