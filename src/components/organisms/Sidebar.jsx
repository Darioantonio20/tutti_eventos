import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'Inicio', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>, path: '/crear-evento' },
        { label: 'Mis Eventos', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>, path: '#' },
        { label: 'Presupuesto', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>, path: '#' },
        { label: 'Invitados', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, path: '#' },
        { label: 'Checklist', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>, path: '#' },
    ];

    return (
        <>
            {/* Light Overlay - Matching provided image style */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-[60] transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar - Clean, light theme to match the wizard's aesthetic */}
            <aside className={`
        fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-[15px_0_40px_rgba(0,0,0,0.04)] transition-transform duration-400 ease-out border-r border-slate-100
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Header Section */}
                    <div className="px-6 py-8 flex items-center justify-between border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                                <span className="text-white text-sm font-black italic">TK</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-slate-800 tracking-tighter leading-none">Tutti</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Planner Assistant</span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl text-slate-300 hover:text-slate-500 hover:bg-slate-50 transition-all"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* Navigation Section */}
                    <div className="p-4 flex-grow">
                        <nav className="space-y-1">
                            {menuItems.map((item, idx) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (item.path !== '#') navigate(item.path);
                                            onClose();
                                        }}
                                        className={`
                      w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-sm
                      ${isActive
                                                ? 'bg-brand-primary/10 text-brand-primary shadow-sm shadow-brand-primary/5'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
                    `}
                                    >
                                        <span className={`transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-70'}`}>
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Assistant Info Banner */}
                    <div className="px-6 py-8">
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-brand-primary/20 rounded-lg flex items-center justify-center">
                                    <svg className="text-brand-primary" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"></path></svg>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tutti AI</span>
                            </div>
                            <p className="text-xs font-bold text-slate-600 leading-relaxed">
                                Personaliza tu evento con sugerencias inteligentes.
                            </p>
                            <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline mt-1">
                                Saber más →
                            </button>
                        </div>
                    </div>

                    {/* Footer Profile Section */}
                    <div className="p-6 border-t border-slate-50 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-sm font-bold text-slate-500 overflow-hidden">
                            DL
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-800 leading-none">Dario Lopez</span>
                            <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest mt-1">Usuario Premium</span>
                        </div>
                        <button className="ml-auto text-slate-300 hover:text-red-500 transition-colors" title="Cerrar Sesión">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
