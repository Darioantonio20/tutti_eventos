import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/organisms/Sidebar';
import Card from '../components/atoms/Card';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const events = [
        {
            id: 1,
            title: 'Boda de Sofía',
            venue: 'Hacienda Los Arcángeles',
            time: 'En 15 días',
            progress: 85,
            icon: '🎉',
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-400',
            avatars: [
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
            ],
            extraAvatars: 3
        },
        {
            id: 2,
            title: 'Cumpleaños de Luis',
            venue: 'Salón Jardín Las Lomas',
            time: 'En 2 meses',
            progress: 40,
            icon: '🎂',
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-400',
            avatars: [
                'https://images.unsplash.com/photo-1535711684293-c1563859ea4e?w=100&h=100&fit=crop',
            ],
            extraAvatars: 0
        }
    ];

    const messages = [
        {
            id: 1,
            name: 'Tutti Bocado Catering',
            snippet: '¡Hola Ana! Ya tenemos lista la cotización actualizada para la boda.',
            time: '10:42 AM',
            avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop',
            unread: true
        },
        {
            id: 2,
            name: 'Lumiére Iluminación',
            snippet: 'Confirmado, llegaremos a las 4:00 PM para el montaje.',
            time: 'Ayer',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
            unread: false,
            initial: 'L',
            bg: 'bg-blue-50',
            color: 'text-blue-500'
        },
        {
            id: 3,
            name: 'Florería Las Rosas',
            snippet: '¿Te gustaron los arreglos de mesa que enviamos?',
            time: 'Lun',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
            unread: true,
            initial: 'F',
            bg: 'bg-purple-50',
            color: 'text-purple-500'
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-12 max-w-[1400px] mx-auto w-full space-y-10">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        {/* Sidebar Trigger */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-slate-600"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1">¡Hola, Ana! 👋</h1>
                            <p className="text-slate-400 font-bold text-sm">Aquí tienes el resumen de tus eventos para esta semana.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/crear-evento')}
                        className="bg-[#2eb8ff] text-white px-8 py-4 rounded-[1.4rem] font-bold shadow-[0_10px_25px_rgba(46,184,255,0.3)] hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Nuevo Evento
                    </button>
                </header>

                {/* Next Events Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black text-slate-800">Próximos Eventos</h2>
                        <button className="text-[#2eb8ff] font-bold text-xs uppercase tracking-widest hover:underline">Ver todos</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map(event => (
                            <Card key={event.id} className="p-8 group relative overflow-hidden border-slate-50">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 ${event.iconBg} rounded-2xl flex items-center justify-center text-xl shadow-sm`}>
                                        {event.icon}
                                    </div>
                                    <span className="bg-slate-50 text-slate-400 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">
                                        {event.time}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-slate-800 mb-1">{event.title}</h3>
                                <p className="text-slate-400 text-sm font-bold mb-6 italic">{event.venue}</p>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">Progreso</span>
                                        <span className="text-slate-800 text-xs font-black leading-none">{event.progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${event.progress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-[#2eb8ff] rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center -space-x-2">
                                    {event.avatars.map((url, i) => (
                                        <img key={i} src={url} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
                                    ))}
                                    {event.extraAvatars > 0 && (
                                        <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400">
                                            +{event.extraAvatars}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}

                        {/* Create New Event Placeholder */}
                        <button
                            onClick={() => navigate('/crear-evento')}
                            className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 group hover:border-[#2eb8ff]/40 transition-all hover:bg-white/50"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-[#2eb8ff]/10 group-hover:text-[#2eb8ff] transition-all">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </div>
                            <span className="text-slate-400 font-black text-sm group-hover:text-slate-600 transition-colors tracking-tight">Crear nuevo evento</span>
                        </button>
                    </div>
                </section>

                {/* Bottom Sections: Messages & Staff */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Pending Messages */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                Mensajes Pendientes
                                <svg className="text-slate-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </h2>
                        </div>
                        <Card className="p-0 overflow-hidden bg-white border-slate-50 shadow-sm">
                            <div className="divide-y divide-slate-50">
                                {messages.map(msg => (
                                    <button
                                        key={msg.id}
                                        className="w-full p-6 flex items-center gap-4 hover:bg-slate-50 transition-all group relative text-left"
                                        onClick={() => navigate('/mensajes')}
                                    >
                                        <div className="shrink-0 relative">
                                            {msg.initial ? (
                                                <div className={`w-12 h-12 rounded-2xl ${msg.bg} ${msg.color} flex items-center justify-center font-black text-lg`}>
                                                    {msg.initial}
                                                </div>
                                            ) : (
                                                <img src={msg.avatar} className="w-12 h-12 rounded-2xl object-crop shadow-sm" alt="Avatar" />
                                            )}
                                            {msg.unread && (
                                                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#2eb8ff] rounded-full border-[3px] border-white group-hover:scale-125 transition-transform" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 pr-12">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-black text-slate-800 text-sm">{msg.name}</h4>
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">{msg.time}</span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 truncate leading-relaxed">
                                                {msg.snippet}
                                            </p>
                                        </div>
                                        {msg.unread && (
                                            <div className="absolute right-6 w-2 h-2 bg-[#2eb8ff] rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
                                <button
                                    onClick={() => navigate('/mensajes')}
                                    className="text-[#2eb8ff] font-bold text-xs uppercase tracking-widest hover:underline"
                                >
                                    Ver todos los mensajes
                                </button>
                            </div>
                        </Card>
                    </div>

                    {/* Staff Summary */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-black text-slate-800">Resumen de Staff</h2>
                        <Card className="p-8 border-slate-50">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 text-[#2eb8ff] rounded-xl flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                </div>
                                <h3 className="font-black text-slate-800 text-sm">Equipo Asignado</h3>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-5xl font-black text-slate-900 tracking-tighter">12</span>
                                    <span className="bg-green-50 text-green-500 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter">
                                        +2 nuevos
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs font-bold italic mt-2">Colaboradores activos en tus eventos.</p>
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between items-end">
                                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">Proveedores contratados</span>
                                    <span className="text-slate-800 text-xs font-black leading-none">8/12</span>
                                </div>
                                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                    <div className="h-full w-[66%] bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-2xl border-2 border-slate-100 font-black text-sm text-slate-800 hover:bg-slate-50 transition-all">
                                Gestionar Staff
                            </button>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
