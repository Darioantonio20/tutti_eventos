import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProviderSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            label: 'Dashboard',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
            path: '/proveedor/dashboard'
        },
        {
            label: 'Personal',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
            path: '/proveedor/personal'
        },
        {
            label: 'Equipo',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
            path: '/proveedor/equipo'
        },
    ];

    return (
        <>
            {/* Light Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-[60] lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-[15px_0_40px_rgba(0,0,0,0.04)] transition-transform duration-400 ease-out border-r border-slate-100 lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header/Logo Section */}
                    <div className="px-8 py-10 flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>
                        <span className="text-[22px] font-black text-slate-800 tracking-tighter">Tutti IA</span>
                    </div>

                    {/* Navigation Section */}
                    <div className="flex-grow px-4 mt-4">
                        <nav className="space-y-2">
                            {menuItems.map((item, idx) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            navigate(item.path);
                                            onClose();
                                        }}
                                        className={`
                                            w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-[15px] group
                                            ${isActive
                                                ? 'bg-brand-primary/10 text-brand-primary shadow-sm shadow-brand-primary/5'
                                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
                                        `}
                                    >
                                        <span className={`transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-70 group-hover:opacity-100'}`}>
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(46,184,255,0.5)]"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Footer Profile Section */}
                    <div className="p-8 border-t border-slate-50">
                        <div
                            onClick={() => navigate('/perfil')}
                            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity group"
                        >
                            <div className="w-11 h-11 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-slate-800 leading-none">Catering Delicioso</span>
                                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mt-1.5 flex items-center gap-1">
                                    Proveedor Pro
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                </span>
                            </div>
                            <button className="ml-auto text-slate-300 hover:text-slate-500 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default ProviderSidebar;
