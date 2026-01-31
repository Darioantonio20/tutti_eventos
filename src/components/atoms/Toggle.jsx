import React from 'react';

const Toggle = ({ active, onChange, label, sublabel }) => {
    return (
        <div className="flex items-center justify-between w-full">
            {label && (
                <div className="flex flex-col">
                    <span className="text-slate-800 font-bold text-sm">{label}</span>
                    {sublabel && <span className="text-slate-400 text-xs font-medium">{sublabel}</span>}
                </div>
            )}
            <button
                type="button"
                onClick={() => onChange && onChange(!active)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${active ? 'bg-brand-primary' : 'bg-slate-200'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );
};

export default Toggle;
