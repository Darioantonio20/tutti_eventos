import React from 'react';

const variants = {
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    info: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
    brand: 'bg-gradient-to-r from-brand-primary to-brand-teal text-white border-transparent',
};

const Badge = ({ children, variant = 'info', className = '' }) => {
    return (
        <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
      ${variants[variant]}
      ${className}
    `}>
            {children}
        </span>
    );
};

export default Badge;
