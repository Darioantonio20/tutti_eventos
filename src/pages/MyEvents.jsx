import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/organisms/Sidebar';
import Card from '../components/atoms/Card';

// Shared Modal Component
const Modal = ({ isOpen, onClose, title, children }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h3>
                            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        {children}
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

const MyEvents = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // UI State
    const [activeModal, setActiveModal] = useState(null); // 'service', 'add-service', 'payment'
    const [selectedService, setSelectedService] = useState(null);
    const [toast, setToast] = useState(null);
    const [filter, setFilter] = useState('Todos');

    // Auto-hide toast
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message) => setToast(message);

    const services = [
        {
            id: 1,
            category: 'CATERING',
            name: 'Pastel de Bodas',
            provider: 'Tutti Bocado',
            price: '$8,500',
            image: 'https://images.unsplash.com/photo-1535254973040-607b474cb8c9?w=300&h=200&fit=crop',
            status: 'completed',
            details: 'Pastel de 4 niveles para 150 personas, sabor red velvet y vainilla.'
        },
        {
            id: 2,
            category: 'LUGAR',
            name: 'Salón Principal',
            provider: 'Hacienda Los Arcángel...',
            price: '$45,000',
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-400',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 21h18M3 7v14M13 3v18M17 7v14M21 21V7" /></svg>,
            status: 'completed',
            details: 'Renta del jardín central y salón techado por 12 horas. Incluye mobiliario básico.'
        },
        {
            id: 3,
            category: 'MÚSICA',
            name: 'DJ / Banda',
            provider: 'Sin proveedor asignado',
            price: '--',
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-400',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
            status: 'pending',
            details: 'Aún no has seleccionado un proveedor de música.'
        }
    ];

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setActiveModal('service');
    };

    const handleShare = () => {
        showToast('¡Enlace de evento copiado al portapapeles!');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900 pb-20 overflow-x-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3"
                    >
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-[10px]">✓</div>
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="px-6 md:px-12 py-8 flex items-center justify-between sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md z-30">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-slate-600 group"
                    >
                        <svg className="group-hover:scale-110 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all shadow-sm"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </button>
                        <nav className="flex items-center gap-2 text-[13px] font-bold">
                            <Link to="/mis-eventos" className="text-slate-400 hover:text-slate-600">Mis Eventos</Link>
                            <span className="text-slate-300">/</span>
                            <span className="text-slate-800">Boda de Sofía</span>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left Column */}
                <div className="lg:col-span-8 space-y-10">

                    {/* Event Highlights Card */}
                    <Card className="p-10 border-slate-50 relative overflow-hidden bg-white shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-none">Boda de Sofía</h1>
                                    <span className="bg-green-100/50 text-green-600 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-100">Activo</span>
                                </div>

                                <div className="flex flex-wrap gap-6 mb-8 text-slate-400">
                                    <div className="flex items-center gap-2 font-bold text-sm">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        15 Octubre, 2024
                                    </div>
                                    <div className="flex items-center gap-2 font-bold text-sm">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        Hacienda Los Arcángeles
                                    </div>
                                </div>

                                <div className="space-y-4 max-w-sm">
                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Progreso de planeación</span>
                                        <span className="text-[#2eb8ff] text-xs font-black">85%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '85%' }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-[#2eb8ff] rounded-full shadow-[0_2px_10px_rgba(46,184,255,0.3)]"
                                        />
                                    </div>
                                    <p className="text-slate-400 text-[11px] font-bold italic tracking-tight opacity-80">¡Casi listo! Solo faltan confirmar 2 proveedores.</p>
                                </div>
                            </div>

                            <div className="shrink-0 bg-slate-50/50 rounded-[2.5rem] p-8 flex flex-col items-center justify-center border border-slate-100 min-w-[150px] shadow-inner">
                                <span className="text-5xl font-black text-[#2eb8ff] tracking-tighter leading-none mb-1">15</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-4">DÍAS</span>
                                <div className="h-px w-8 bg-slate-200 mb-4" />
                                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest text-center leading-tight">Cuenta regresiva</span>
                            </div>
                        </div>
                    </Card>

                    {/* Services Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Servicios Contratados</h2>
                        <div className="flex gap-4">
                            {['Todos', 'Completados', 'Pendientes'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-brand-dark text-white' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services
                            .filter(s => filter === 'Todos' || (filter === 'Completados' && s.status === 'completed') || (filter === 'Pendientes' && s.status === 'pending'))
                            .map(service => (
                                <Card key={service.id} className="p-6 border-slate-50 group hover:shadow-lg transition-all duration-300 bg-white">
                                    <div className="flex gap-5">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm relative border border-slate-100">
                                            {service.image ? (
                                                <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
                                            ) : (
                                                <div className={`w-full h-full ${service.iconBg} ${service.iconColor} flex items-center justify-center`}>
                                                    {service.icon}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 py-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`${service.status === 'completed' ? 'text-[#2eb8ff]' : 'text-purple-400'} text-[9px] font-black uppercase tracking-[0.2em]`}>
                                                    {service.category}
                                                </span>
                                                {service.status === 'completed' ? (
                                                    <div className="w-6 h-6 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-sm">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 bg-orange-50/50 text-orange-400 rounded-full flex items-center justify-center border border-orange-100">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><circle cx="12" cy="12" r="1.5"></circle><circle cx="19" cy="12" r="1.5"></circle><circle cx="5" cy="12" r="1.5"></circle></svg>
                                                    </div>
                                                )}
                                            </div>
                                            <h4 className="font-black text-slate-800 mb-0.5 truncate text-[15px]">{service.name}</h4>
                                            <p className="text-xs font-bold text-slate-400 mb-4 italic truncate opacity-80">{service.provider}</p>

                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="font-black text-slate-800 text-[14px] leading-none">{service.price}</span>
                                                <button
                                                    onClick={() => service.status === 'completed' ? handleServiceClick(service) : showToast('Buscando proveedores...')}
                                                    className={`
                                                    px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all
                                                    ${service.status === 'completed'
                                                            ? 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100'
                                                            : 'bg-[#2eb8ff] text-white shadow-[0_5px_15px_rgba(46,184,255,0.3)] hover:scale-105 active:scale-95'}
                                                `}
                                                >
                                                    {service.status === 'completed' ? 'Ver detalle' : 'Buscar'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                        <button
                            onClick={() => setActiveModal('add-service')}
                            className="border-2 border-dashed border-slate-200 rounded-[2.2rem] p-6 flex flex-col items-center justify-center gap-4 group hover:border-[#2eb8ff]/40 transition-all hover:bg-white min-h-[140px] bg-slate-50/30"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-[#2eb8ff]/10 group-hover:text-[#2eb8ff] transition-all">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </div>
                            <span className="text-slate-400 font-black text-[13px] group-hover:text-slate-800 transition-colors tracking-tight">Añadir Servicio</span>
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="p-0 border-none bg-gradient-to-br from-[#2eb8ff] to-[#00d2ff] shadow-[0_30px_60px_-12px_rgba(46,184,255,0.45)] overflow-hidden text-white relative group">
                        <div className="p-9 space-y-9 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                    <svg className="text-white drop-shadow-md" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"></path></svg>
                                </div>
                                <h3 className="text-2xl font-black tracking-tight drop-shadow-sm">Guía de la IA</h3>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md p-7 rounded-[2.2rem] border border-white/10 shadow-inner">
                                <p className="text-sm font-bold leading-relaxed mb-6 opacity-95">
                                    Parece que te falta <span className="text-white font-black underline decoration-2 underline-offset-4 decoration-white/30">música</span>. Según el estilo de tu boda, te recominedo estas opciones:
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => showToast('Cargando recomendaciones de DJs...')} className="py-3 bg-white text-[#2eb8ff] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">Ver DJs</button>
                                    <button onClick={() => showToast('Cargando recomendaciones de Bandas...')} className="py-3 bg-white/15 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/20 hover:bg-white/25 transition-all">Ver Bandas</button>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 px-2">
                                <span className="text-2xl filter drop-shadow-sm">🔔</span>
                                <p className="text-sm font-bold leading-tight">
                                    <span className="opacity-80 font-medium">Recordatorio: El pago del salón vence en</span> <span className="font-black text-white decoration-white/40 ring-offset-2">3 días</span>.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate('/mensajes')}
                                className="w-full py-5 bg-black/10 hover:bg-black/20 transition-all rounded-[1.8rem] flex items-center justify-center gap-3 backdrop-blur-sm group/btn border border-white/5"
                            >
                                <svg className="group-hover/btn:scale-110 transition-transform" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                <span className="font-black text-sm tracking-tight">Preguntar a Tutti</span>
                            </button>
                        </div>
                    </Card>

                    {/* Quick Actions Panel */}
                    <Card className="p-9 border-slate-50 space-y-9 bg-white shadow-sm">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-2">Acciones Rápidas</h3>
                        <div className="space-y-4">
                            {[
                                { id: 'payment', label: 'Registrar Pagos', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>, bg: 'bg-green-50', color: 'text-green-500' },
                                { id: 'share', label: 'Compartir Evento', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>, bg: 'bg-indigo-50', color: 'text-indigo-500' },
                                { id: 'config', label: 'Configuración', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>, bg: 'bg-orange-50', color: 'text-orange-500' }
                            ].map((action) => (
                                <button
                                    key={action.id}
                                    onClick={() => {
                                        if (action.id === 'payment') setActiveModal('payment');
                                        else if (action.id === 'share') handleShare();
                                        else showToast('Módulo de configuración en desarrollo');
                                    }}
                                    className="w-full flex items-center gap-5 p-3 rounded-[1.4rem] hover:bg-slate-50 transition-all group/action"
                                >
                                    <div className={`w-11 h-11 ${action.bg} ${action.color} rounded-2xl flex items-center justify-center shadow-sm group-hover/action:scale-110 group-hover/action:rotate-3 transition-all duration-300`}>
                                        {action.icon}
                                    </div>
                                    <span className="font-black text-slate-700 text-[14px]">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>
            </main>

            {/* Modals */}
            <Modal
                isOpen={activeModal === 'service'}
                onClose={() => setActiveModal(null)}
                title={selectedService?.name}
            >
                <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-3xl">
                        <p className="text-slate-500 font-bold italic text-sm leading-relaxed">
                            {selectedService?.details}
                        </p>
                    </div>
                    <div className="flex justify-between items-center px-2">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Costo Total</span>
                            <span className="text-2xl font-black text-slate-800">{selectedService?.price}</span>
                        </div>
                        <button onClick={() => setActiveModal(null)} className="bg-brand-dark text-white px-8 py-3 rounded-2xl font-bold text-sm">Cerrar</button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={activeModal === 'add-service'}
                onClose={() => setActiveModal(null)}
                title="Añadir Nuevo Servicio"
            >
                <div className="space-y-4">
                    <input className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 ring-brand-primary/20" placeholder="Nombre del servicio..." />
                    <select className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 ring-brand-primary/20">
                        <option>Selecciona una categoría</option>
                        <option>Mesa de Dulces</option>
                        <option>Decoración</option>
                        <option>Fotografía</option>
                    </select>
                    <button
                        onClick={() => {
                            setActiveModal(null);
                            showToast('¡Servicio añadido a la lista de tareas!');
                        }}
                        className="w-full py-4 bg-[#2eb8ff] text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
                    >
                        Confirmar
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={activeModal === 'payment'}
                onClose={() => setActiveModal(null)}
                title="Registrar Pago"
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Monto Pagado</span>
                            <span className="font-black text-slate-800">$2,400</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Pendiente</span>
                            <span className="font-black text-orange-500">$6,100</span>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setActiveModal(null);
                            showToast('¡Pago registrado correctamente!');
                        }}
                        className="w-full py-4 bg-green-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-green-500/20"
                    >
                        Realizar Pago
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default MyEvents;
