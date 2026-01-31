import React from 'react';

const variants = {
    primary: 'bg-gradient-to-r from-brand-primary to-brand-teal text-white hover:shadow-[0_0_30px_rgba(46,184,255,0.6)]',
    secondary: 'bg-brand-dark text-white border border-white/10 hover:bg-slate-800',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10',
    ghost: 'text-brand-primary hover:bg-brand-primary/5',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
};

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base font-bold',
    lg: 'px-10 py-4 text-lg font-bold',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
    icon: Icon,
    ...props
}) => {
    const baseStyles = 'rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg cursor-pointer';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {/* Subtle Shine */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {Icon && <Icon className="w-5 h-5 relative z-10" />}
            <span className="relative z-10">{children}</span>
        </button>
    );
};

export default Button;
