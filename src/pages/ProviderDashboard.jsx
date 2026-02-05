import React, { useState } from 'react';
import ProviderSidebar from '../components/organisms/ProviderSidebar';
import { motion, AnimatePresence } from 'framer-motion';

const ProviderDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const stats = [
        {
            label: 'Agenda del día', value: '3 Eventos Hoy', icon: (
                <div className="w-12 h-12 bg-blue-50 text-brand-primary rounded-2xl flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
            )
        },
        {
            label: 'Reputación', value: '4.9 Calificación', icon: (
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
            )
        },
    ];

    const agendaItems = [
        {
            id: 1,
            title: 'Boda Familia López',
            status: 'CONFIRMADO',
            statusColor: 'text-emerald-500 bg-emerald-50',
            time: '14:00 - 18:00',
            location: 'Salón Real, Av. Reforma 123, Centro',
            icon: (
                <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8V2M14 8V2M22 2v14a3 3 0 0 1-3 3h-1v2h-2v-2h-1a3 3 0 0 1-3-3V2M7 2v12a5 3 0 0 1-5 3v4h2v-4a5 3 0 0 1 5-3V2" /></svg>
                </div>
            )
        },
        {
            id: 2,
            title: 'Cumpleaños Carla',
            status: 'PENDIENTE',
            statusColor: 'text-orange-500 bg-orange-50',
            time: '18:30 - 22:00',
            location: 'Jardín Central, Lomas Verdes',
            icon: (
                <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                </div>
            )
        }
    ];

    const notifications = [
        { id: 1, title: 'Nueva reservación', message: 'La familia Pérez ha reservado para el 12 de Nov.', time: 'Hace 5 min', type: 'new' },
        { id: 2, title: 'Presupuesto aprobado', message: 'Tu cotización para "XV Años Sofia" fue aceptada.', time: 'Hace 1 hora', type: 'success' },
        { id: 3, title: 'Recordatorio', message: 'Recuerda subir tus comprobantes fiscales.', time: 'Hace 3 horas', type: 'alert' }
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            <ProviderSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 lg:ml-[280px] p-4 md:p-10">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <span className="text-slate-400 font-bold text-sm">Martes, 24 Octubre 2023</span>
                        <h1 className="text-[32px] font-black text-slate-900 tracking-tight">Hola, Catering Delicioso</h1>
                    </div>
                    <div className="flex items-center gap-4 relative">
                        <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all font-bold text-slate-600">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                            Ayuda
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className={`w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 relative hover:text-brand-primary transition-all ${isNotificationsOpen ? 'ring-4 ring-brand-primary/5 border-brand-primary text-brand-primary' : ''}`}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>

                            {/* Notifications Dropdown */}
                            <AnimatePresence>
                                {isNotificationsOpen && (
                                    <>
                                        {/* Backdrop for closing */}
                                        <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-[32px] border border-slate-100 shadow-2xl z-50 overflow-hidden"
                                        >
                                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                                <h3 className="text-lg font-black text-slate-900 leading-none">Notificaciones</h3>
                                                <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">{notifications.length} NUEVAS</span>
                                            </div>
                                            <div className="max-h-[400px] overflow-y-auto">
                                                {notifications.map((notif) => (
                                                    <div key={notif.id} className="p-5 border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                                        <div className="flex gap-4">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.type === 'new' ? 'bg-blue-50 text-blue-500' :
                                                                    notif.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-orange-50 text-orange-500'
                                                                }`}>
                                                                {notif.type === 'new' ? (
                                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                                                ) : notif.type === 'success' ? (
                                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                                ) : (
                                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                                                )}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <h4 className="text-sm font-black text-slate-800 tracking-tight">{notif.title}</h4>
                                                                <p className="text-xs font-bold text-slate-500 leading-relaxed">{notif.message}</p>
                                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pt-1">{notif.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full py-4 text-xs font-black text-brand-primary uppercase tracking-widest hover:bg-brand-primary/5 transition-colors">
                                                Ver todas las notificaciones
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    {/* Left Column: Stats & Agenda */}
                    <div className="xl:col-span-2 space-y-10">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex items-center gap-4">
                                    {stat.icon}
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                        <span className="text-lg font-black text-slate-900 leading-tight mt-1">{stat.value}</span>
                                    </div>
                                </div>
                            ))}
                            {/* Wallet Card */}
                            <div className="bg-slate-900 p-6 rounded-[32px] shadow-xl flex flex-col justify-between h-[120px] md:h-auto overflow-hidden relative group">
                                <div className="z-10">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SALDO DISPONIBLE</span>
                                    <h3 className="text-2xl font-black text-white mt-1">$2,450.00</h3>
                                </div>
                                <button className="z-10 mt-4 bg-white/10 text-white hover:bg-white hover:text-slate-900 px-4 py-2 rounded-xl font-bold text-xs transition-all w-fit">
                                    Retirar
                                </button>
                                {/* Decorative circle */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full group-hover:scale-110 transition-transform"></div>
                            </div>
                        </div>

                        {/* Tu Agenda Timeline */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tu Agenda</h2>
                                <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                                    <button className="hover:text-slate-900 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                    </button>
                                    <span className="text-slate-900">Hoy</span>
                                    <button className="hover:text-slate-900 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-0 relative">
                                {/* Timeline Line */}
                                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

                                {agendaItems.map((item, idx) => (
                                    <div key={item.id} className="relative pl-14 pb-10 group">
                                        <div className="absolute left-0 top-0 z-10 transition-transform group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                        <div className="bg-white p-6 rounded-[36px] border border-slate-50 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${item.statusColor}`}>
                                                        {item.status}
                                                    </span>
                                                    <span className="text-brand-primary font-black text-sm">{item.time}</span>
                                                </div>
                                                <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-primary transition-colors">{item.title}</h3>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                    <span className="text-xs font-bold leading-tight">{item.location}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    <button className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all">Ver Detalles</button>
                                                    <button className="px-5 py-2.5 border border-slate-100 hover:border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all">Contactar Cliente</button>
                                                </div>
                                            </div>
                                            {/* Mini Map Placeholder */}
                                            <div className="w-full md:w-[160px] h-[120px] rounded-[24px] bg-slate-50 relative overflow-hidden flex items-center justify-center group/map">
                                                <img
                                                    src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=300&h=200&fit=crop"
                                                    alt="Map"
                                                    className="w-full h-full object-cover opacity-60 group-hover/map:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent flex items-end justify-center pb-3">
                                                    <span className="text-[10px] font-black text-white hover:underline cursor-pointer">Ver Mapa</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: AI & Management */}
                    <div className="space-y-8">
                        {/* Tutti AI Insight */}
                        <div className="bg-[#f0f3ff] p-8 rounded-[40px] border border-blue-100/50 space-y-6 relative overflow-hidden group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm shadow-brand-primary/10">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-brand-primary uppercase tracking-widest">Tutti AI Insight</span>
                                    <span className="text-[10px] font-bold text-slate-400 mt-0.5">Recomendación en tiempo real</span>
                                </div>
                            </div>
                            <p className="text-[15px] font-bold text-slate-600 leading-relaxed">
                                Se espera tráfico pesado cerca del <span className="text-slate-900">Salón Real</span> a las 14:00. Se recomienda salir 15 minutos antes para el montaje.
                            </p>
                            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-all"></div>
                        </div>

                        {/* Gestión Rápida */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Gestión Rápida</h3>
                            <button className="w-full bg-gradient-to-br from-brand-primary to-[#1da1f2] p-8 rounded-[40px] text-left space-y-4 shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all group relative overflow-hidden">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-black text-white leading-tight">Cargar Nuevo Servicio</h4>
                                    <p className="text-white/70 text-sm font-bold flex items-center gap-1">
                                        Subir fotos y precios
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </p>
                                </div>
                                {/* Shine effect */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </button>
                        </div>

                        {/* Mini Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm space-y-3 hover:shadow-md transition-all">
                                <div className="text-brand-primary">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-slate-900">12</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Eventos Activos</span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm space-y-3 hover:shadow-md transition-all">
                                <div className="text-fuchsia-500">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /><polygon points="12 8 13.3 10.7 16.2 11.1 14.1 13.2 14.6 16.1 12 14.7 9.4 16.1 9.9 13.2 7.8 11.1 10.7 10.7 12 8" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-slate-900">8</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Reseñas Nuevas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProviderDashboard;
