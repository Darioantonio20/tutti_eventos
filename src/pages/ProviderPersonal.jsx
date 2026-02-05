import React, { useState, useEffect } from 'react';
import ProviderSidebar from '../components/organisms/ProviderSidebar';
import Modal from '../components/atoms/Modal';
import { motion, AnimatePresence } from 'framer-motion';

const ProviderPersonal = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('TODOS');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeActionId, setActiveActionId] = useState(null);

    // Initial Staff List
    const initialStaff = [
        { id: 1, name: 'Sofia Ramirez', role: 'Coordinadora', status: 'CONFIRMADO', contact: 'sofia.ramirez@tutti.ia', lastActive: 'Hace 12 min', initials: 'SR', color: 'bg-blue-100 text-blue-600' },
        { id: 2, name: 'Juan Méndez', role: 'Meseros', status: 'CONFIRMADO', contact: 'juan.mendez@tutti.ia', lastActive: 'Hace 1 hora', initials: 'JM', color: 'bg-purple-100 text-purple-600' },
        { id: 3, name: 'Valentina Ruiz', role: 'Hostess', status: 'PENDIENTE', contact: 'v.ruiz@tutti.ia', lastActive: 'Ayer', initials: 'VR', color: 'bg-orange-100 text-orange-600' },
        { id: 4, name: 'DJ BeatMaster', role: 'Música', status: 'CONFIRMADO', contact: '+52 55 1234 5678', lastActive: 'Hace 3 horas', initials: 'DJ', color: 'bg-pink-100 text-pink-600' },
        { id: 5, name: 'Alex Torres', role: 'Seguridad', status: 'INACTIVO', contact: 'a.torres@tutti.ia', lastActive: 'Hace 2 días', initials: 'AT', color: 'bg-indigo-100 text-indigo-600' },
    ];

    const [staffList, setStaffList] = useState(initialStaff);
    const [newStaff, setNewStaff] = useState({ name: '', role: '', contact: '', status: 'PENDIENTE' });

    // Stats Calculation
    const totalStaff = staffList.length;
    const confirmedCount = staffList.filter(s => s.status === 'CONFIRMADO').length;
    const pendingCount = staffList.filter(s => s.status === 'PENDIENTE').length;

    const stats = [
        { label: 'TOTAL STAFF', value: totalStaff, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, color: 'bg-blue-50 text-blue-500' },
        { label: 'CONFIRMADOS', value: confirmedCount, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>, color: 'bg-emerald-50 text-emerald-500' },
        { label: 'PENDIENTES', value: pendingCount, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>, color: 'bg-orange-50 text-orange-500' },
        { label: 'TURNOS', value: '8h', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>, color: 'bg-fuchsia-50 text-fuchsia-500' },
    ];

    // Filter Logic
    const filteredStaff = staffList.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.contact.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'TODOS' || member.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleReload = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStaffList([...initialStaff]);
        }, 800);
    };

    const handleAddStaff = (e) => {
        e.preventDefault();
        const initials = newStaff.name.split(' ').map(n => n[0]).join('').toUpperCase();
        const colorOptions = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600', 'bg-pink-100 text-pink-600', 'bg-indigo-100 text-indigo-600'];
        const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

        const memberToAdd = {
            id: Date.now(),
            ...newStaff,
            lastActive: 'Recién agregado',
            initials: initials || '??',
            color: randomColor
        };

        setStaffList([memberToAdd, ...staffList]);
        setIsAddModalOpen(false);
        setNewStaff({ name: '', role: '', contact: '', status: 'PENDIENTE' });
    };

    const handleDeleteMember = (id) => {
        setStaffList(staffList.filter(m => m.id !== id));
        setActiveActionId(null);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'CONFIRMADO': return 'bg-emerald-100/50 text-emerald-600 border-emerald-100';
            case 'PENDIENTE': return 'bg-orange-100/50 text-orange-600 border-orange-100';
            case 'INACTIVO': return 'bg-slate-100/50 text-slate-500 border-slate-100';
            default: return 'bg-slate-100 text-slate-500';
        }
    };

    // Close action menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveActionId(null);
        if (activeActionId) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [activeActionId]);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            <ProviderSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 lg:ml-[280px] p-4 md:p-10">
                {/* Header / Breadcrumbs */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-[13px] font-bold text-slate-400 mb-4 tracking-wide uppercase">
                        <span>Eventos</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        <span>Boda Civil</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        <span className="text-slate-800">Personal</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h1 className="text-[32px] font-black text-slate-900 tracking-tight">Equipo del Evento</h1>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input
                                    type="text"
                                    placeholder="Buscar miembro..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-2xl w-[260px] text-sm font-bold text-slate-600 placeholder:text-slate-400 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all shadow-sm"
                                />
                            </div>

                            {/* Filter Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 shadow-sm hover:shadow-md transition-all">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                    {statusFilter === 'TODOS' ? 'Filtrar' : statusFilter}
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                                    <button onClick={() => setStatusFilter('TODOS')} className="w-full text-left px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Todos</button>
                                    <button onClick={() => setStatusFilter('CONFIRMADO')} className="w-full text-left px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Confirmado</button>
                                    <button onClick={() => setStatusFilter('PENDIENTE')} className="w-full text-left px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Pendiente</button>
                                    <button onClick={() => setStatusFilter('INACTIVO')} className="w-full text-left px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Inactivo</button>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3.5 bg-brand-primary text-white rounded-2xl text-sm font-black shadow-lg shadow-brand-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                Añadir Personal
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase">{stat.label}</span>
                                <span className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Table Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-[40px] border border-slate-50 shadow-sm overflow-hidden min-h-[400px]"
                >
                    <div className="px-8 py-8 flex items-center justify-between border-b border-slate-50">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Miembros Asignados</h3>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleReload}
                                className={`text-slate-400 hover:text-brand-primary transition-all ${isLoading ? 'animate-spin' : ''}`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
                            </button>
                            <button className="text-slate-400 hover:text-brand-primary transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Miembro</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Rol</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Contacto</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Última Conexión</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 relative">
                                <AnimatePresence>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="6" className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
                                                    <span className="text-sm font-bold text-slate-400">Actualizando personal...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredStaff.length > 0 ? (
                                        filteredStaff.map((member) => (
                                            <motion.tr
                                                layout
                                                key={member.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="group hover:bg-slate-50/30 transition-colors"
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[13px] border-2 border-white shadow-sm transition-transform group-hover:scale-110 ${member.color}`}>
                                                            {member.initials}
                                                        </div>
                                                        <span className="font-black text-slate-800 tracking-tight">{member.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className={`text-[13px] font-bold ${member.id === 1 ? 'text-brand-primary' : 'text-slate-500'}`}>
                                                        {member.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black border tracking-wide whitespace-nowrap ${getStatusStyles(member.status)}`}>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                                        {member.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors cursor-pointer group/mail">
                                                        {member.contact.includes('@') ? (
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                        ) : (
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                        )}
                                                        <span className="text-[13px] font-bold group-hover/mail:underline truncate max-w-[150px]">{member.contact}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <span className="text-[13px] font-bold text-slate-400 whitespace-nowrap">{member.lastActive}</span>
                                                </td>
                                                <td className="px-8 py-6 text-right relative">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveActionId(activeActionId === member.id ? null : member.id);
                                                        }}
                                                        className="p-2 text-slate-300 hover:text-slate-900 transition-all hover:bg-white rounded-xl"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                                    </button>

                                                    {/* Row Action Dropdown */}
                                                    {activeActionId === member.id && (
                                                        <div className="absolute right-8 top-14 w-36 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden text-left">
                                                            <button className="w-full px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteMember(member.id)}
                                                                className="w-full px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-2"
                                                            >
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                    </div>
                                                    <h4 className="text-slate-800 font-black">No se encontraron miembros</h4>
                                                    <p className="text-slate-400 text-sm font-medium">Intenta con otro término de búsqueda o filtro.</p>
                                                    <button onClick={() => { setSearchTerm(''); setStatusFilter('TODOS'); }} className="mt-2 text-brand-primary font-bold text-sm hover:underline">Limpiar filtros</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    <div className="px-8 py-8 flex items-center justify-between bg-slate-50/30 border-t border-slate-50">
                        <span className="text-[13px] font-bold text-slate-400">Mostrando {filteredStaff.length} de {totalStaff} miembros</span>
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 border border-slate-100 rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-white transition-all shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button className="w-10 h-10 border border-slate-100 rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-white transition-all shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Modal: Añadir Personal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Añadir Nuevo Personal"
            >
                <form onSubmit={handleAddStaff} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nombre Completo</label>
                        <input
                            type="text"
                            required
                            placeholder="Ej. Sofia Ramirez"
                            value={newStaff.name}
                            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-bold text-slate-700"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Rol / Cargo</label>
                            <input
                                type="text"
                                required
                                placeholder="Ej. Mesero"
                                value={newStaff.role}
                                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-bold text-slate-700"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Estado</label>
                            <select
                                value={newStaff.status}
                                onChange={(e) => setNewStaff({ ...newStaff, status: e.target.value })}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-bold text-slate-700"
                            >
                                <option value="CONFIRMADO">Confirmado</option>
                                <option value="PENDIENTE">Pendiente</option>
                                <option value="INACTIVO">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Contacto (Email o Tel)</label>
                        <input
                            type="text"
                            required
                            placeholder="email@ejemplo.com"
                            value={newStaff.contact}
                            onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-bold text-slate-700"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-brand-primary text-white rounded-[20px] font-black shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Guardar Miembro
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default ProviderPersonal;
