import React from 'react';

const Card = ({ children, className = '', hoverEffect = true, variant = 'default' }) => {
    const variants = {
        default: 'bg-white border-slate-100',
        brand: 'bg-brand-dark text-white border-white/5 shadow-2xl',
        glass: 'bg-white/70 backdrop-blur-xl border-white/40 shadow-xl',
    };

    return (
        <div className={`
      rounded-2xl p-6 border
      ${variants[variant]}
      ${hoverEffect ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out' : 'transition-all duration-300'}
      ${className}
    `}>
            {children}
        </div>
    );
};

export default Card;
