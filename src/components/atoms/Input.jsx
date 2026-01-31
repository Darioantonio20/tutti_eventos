import React, { useState } from 'react';

const Input = ({
    label,
    type = 'text',
    placeholder,
    error,
    icon: Icon,
    required = false,
    className = '',
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`relative w-full group ${className}`}>
            {label && (
                <label className={`
          block text-sm font-bold mb-2 transition-all duration-300 
          ${isFocused
                        ? 'text-brand-primary translate-x-1'
                        : 'text-slate-600'
                    }
        `}>
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className={`
        relative flex items-center w-full rounded-2xl transition-all duration-500 
        bg-slate-50 border-2
        ${error
                    ? 'border-red-400 bg-red-50/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                    : isFocused
                        ? 'border-brand-primary bg-white shadow-[0_0_20px_rgba(46,184,255,0.15)] scale-[1.01]'
                        : 'border-slate-100 hover:border-slate-200'
                }
      `}>
                {/* Leading Icon */}
                {Icon && (
                    <div className={`
            pl-4 transition-all duration-300 
            ${isFocused ? 'text-brand-primary scale-110' : 'text-slate-400'}
          `}>
                        <Icon size={18} />
                    </div>
                )}

                <input
                    type={inputType}
                    className={`
            w-full px-4 py-4 bg-transparent border-none outline-none 
            text-slate-800 placeholder-slate-400 rounded-2xl font-medium text-sm
            ${Icon ? 'pl-2' : 'pl-4'}
            ${isPassword ? 'pr-12' : 'pr-4'}
          `}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {/* Password Toggle Eye Icon */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 p-1.5 rounded-lg text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 transition-all duration-300 active:scale-90"
                        tabIndex="-1"
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        )}
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-2 flex items-center gap-1.5 animate-fade-in pl-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Input;
