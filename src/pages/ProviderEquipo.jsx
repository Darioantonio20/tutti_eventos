import React, { useState } from 'react';
import ProviderSidebar from '../components/organisms/ProviderSidebar';
import Modal from '../components/atoms/Modal';
import { motion } from 'framer-motion';

const ProviderEquipo = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Modals states
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false);

    const [selectedMember, setSelectedMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Dynamic Staff List
    const [staffList, setStaffList] = useState([
        {
            id: 1,
            name: 'Alejandro Vega',
            role: 'Chef Principal',
            status: 'EN SITIO',
            statusColor: 'bg-emerald-100/50 text-emerald-600',
            borderColor: 'border-l-emerald-500',
            details: 'Check-in: 13:45',
            tasks: '3 Tareas',
            type: 'assigned',
            avatar: (
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
            )
        },
        {
            id: 2,
            name: 'Carla Mendez',
            role: 'Capitán de Meseros',
            status: 'PENDIENTE',
            statusColor: 'bg-amber-100/50 text-amber-600',
            borderColor: 'border-l-amber-500',
            details: 'Llegada est: 14:00',
            initials: 'CM',
            type: 'pending'
        },
        {
            id: 3,
            name: 'Posición Vacante',
            role: 'Ayudante General',
            status: 'SIN ASIGNAR',
            statusColor: 'bg-slate-100 text-slate-400',
            borderColor: 'border-l-slate-300',
            alert: 'Requerido urgentemente',
            type: 'vacant'
        }
    ]);

    // Stats calculation
    const totalSlots = 12;
    const inSiteCount = staffList.filter(m => m.status === 'EN SITIO').length;
    const pendingCount = staffList.filter(m => m.status === 'PENDIENTE').length;
    const unassignedCount = staffList.filter(m => m.status === 'SIN ASIGNAR').length;
    const progressPercentage = Math.round((inSiteCount / totalSlots) * 100);

    const stats = [
        { label: 'TOTAL EQUIPO', value: totalSlots, color: 'bg-white', textColor: 'text-slate-900' },
        { label: 'EN SITIO', value: inSiteCount, color: 'bg-emerald-50', textColor: 'text-emerald-600' },
        { label: 'POR LLEGAR', value: pendingCount, color: 'bg-amber-50', textColor: 'text-amber-600' },
        { label: 'SIN ASIGNAR', value: unassignedCount, color: 'bg-blue-50/50', textColor: 'text-slate-500' },
    ];

    // Handlers
    const handleCheckIn = (memberId) => {
        setIsLoading(true);
        setTimeout(() => {
            setStaffList(staffList.map(m => {
                if (m.id === memberId) {
                    return {
                        ...m,
                        status: 'EN SITIO',
                        statusColor: 'bg-emerald-100/50 text-emerald-600',
                        borderColor: 'border-l-emerald-500',
                        details: `Check-in: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                        type: 'assigned',
                        avatar: (
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        )
                    };
                }
                return m;
            }));
            setIsLoading(false);
        }, 600);
    };

    const handleAssignMember = (memberId) => {
        setSelectedMember(staffList.find(m => m.id === memberId));
        setIsAssignModalOpen(true);
    };

    const confirmAssignment = (personName) => {
        setStaffList(staffList.map(m => {
            if (m.id === selectedMember.id) {
                return {
                    ...m,
                    name: personName,
                    status: 'PENDIENTE',
                    statusColor: 'bg-amber-100/50 text-amber-600',
                    borderColor: 'border-l-amber-500',
                    details: 'Llegada est: 14:15',
                    initials: personName.split(' ').map(n => n[0]).join('').toUpperCase(),
                    type: 'pending',
                    alert: null
                };
            }
            return m;
        }));
        setIsAssignModalOpen(false);
    };

    const openTasks = (member) => {
        setSelectedMember(member);
        setIsTasksModalOpen(true);
    };

    const openMessage = (member) => {
        setSelectedMember(member);
        setIsMessageModalOpen(true);
    };

    const handleCall = (name) => {
        alert(`Iniciando llamada con ${name}...`);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            <ProviderSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 lg:ml-[280px] p-4 md:p-8 lg:p-10">
                {/* Event Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-slate-50 mb-10 overflow-hidden relative"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div className="space-y-6 text-center lg:text-left">
                            <span className="inline-flex px-4 py-1.5 rounded-full bg-blue-50 text-brand-primary text-[10px] font-black uppercase tracking-widest">
                                Próximo Evento
                            </span>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Boda de Sofía y Mateo</h1>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-400 font-bold text-sm">
                                <div className="flex items-center gap-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    24 Oct, 2023
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    14:00 - 23:00 hrs
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    Jardín Los Encinos
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-[320px] space-y-4">
                            <div className="flex items-center justify-between text-xs font-black">
                                <span className="text-slate-400 uppercase tracking-widest leading-none">Asistencia del personal</span>
                                <span className="text-slate-900">{inSiteCount}/{totalSlots} Check-in</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: `${progressPercentage}%` }}
                                    className="h-full bg-emerald-500 rounded-full"
                                />
                            </div>
                            <span className="block text-right text-[10px] font-bold text-slate-400">{progressPercentage}% completado</span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx }}
                            className={`${stat.color} p-8 rounded-[32px] border border-slate-50 shadow-sm flex flex-col gap-2`}
                        >
                            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{stat.label}</span>
                            <span className={`text-3xl font-black ${stat.textColor}`}>{stat.value}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    {/* Assigned Personnel List */}
                    <div className="xl:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Personal Asignado</h2>
                            <div className="flex items-center gap-4">
                                <button className="text-slate-300 hover:text-slate-900 transition-colors">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                </button>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-2 pr-2 py-1 bg-transparent border-b border-slate-200 text-xs font-bold outline-none focus:border-brand-primary transition-all w-24"
                                    />
                                    <svg className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {staffList.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase())).map((member, idx) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className={`bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 border-l-[6px] ${member.borderColor} flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-md transition-all`}
                                >
                                    <div className="flex items-center gap-6 flex-1">
                                        {member.avatar ? member.avatar : (
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm ${member.type === 'vacant' ? 'bg-slate-50 text-slate-300 border-2 border-dashed border-slate-200' : 'bg-slate-100 text-slate-500'}`}>
                                                {member.initials || <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>}
                                            </div>
                                        )}
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-black text-slate-900">{member.name}</h3>
                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase ${member.statusColor}`}>
                                                    {member.status}
                                                </span>
                                            </div>
                                            <p className="text-xs font-bold text-brand-primary">{member.role}</p>
                                            <div className="flex items-center gap-4 pt-1">
                                                {member.details && (
                                                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                        {member.details}
                                                    </div>
                                                )}
                                                {member.tasks && (
                                                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                                        {member.tasks}
                                                    </div>
                                                )}
                                                {member.alert && (
                                                    <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-black italic animate-pulse">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                                        {member.alert}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {member.type === 'assigned' && (
                                            <>
                                                <button onClick={() => openTasks(member)} className="px-5 py-2.5 bg-white border border-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-brand-primary transition-all flex items-center gap-2">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                    Ver Tareas
                                                </button>
                                                <button onClick={() => openMessage(member)} className="px-5 py-2.5 bg-white border border-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-brand-primary transition-all flex items-center gap-2">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                                    Mensaje
                                                </button>
                                            </>
                                        )}
                                        {member.type === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleCheckIn(member.id)}
                                                    className="px-5 py-2.5 bg-brand-primary text-white rounded-xl text-xs font-black shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                                                >
                                                    <svg className={isLoading ? 'animate-spin' : ''} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                                                    Check-In
                                                </button>
                                                <button onClick={() => handleCall(member.name)} className="px-5 py-2.5 bg-white border border-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-brand-primary transition-all flex items-center gap-2">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                    Llamar
                                                </button>
                                            </>
                                        )}
                                        {member.type === 'vacant' && (
                                            <button
                                                onClick={() => handleAssignMember(member.id)}
                                                className="px-8 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-black hover:bg-slate-900 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                                            >
                                                Asignar
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Sidebar Actions */}
                    <div className="space-y-10">
                        {/* Acciones Rápidas */}
                        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-50 space-y-6">
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Acciones Rápidas</h3>
                            <div className="space-y-4">
                                <button onClick={() => setIsQRModalOpen(true)} className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-brand-primary transition-all shadow-sm">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect x="7" y="7" width="10" height="10"></rect></svg>
                                    Escanear QR
                                </button>
                                <button onClick={() => setIsNewMemberModalOpen(true)} className="w-full flex items-center justify-center gap-3 py-4 bg-brand-primary text-white rounded-2xl text-sm font-black shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="16" y1="11" x2="22" y2="11"></line></svg>
                                    Nuevo Miembro
                                </button>
                            </div>
                        </div>

                        {/* Agregar del Repositorio */}
                        <div className="bg-slate-50/50 rounded-[40px] p-10 border-2 border-dashed border-slate-200 flex flex-col items-center text-center space-y-6">
                            <div className="w-14 h-14 bg-blue-50 text-brand-primary rounded-2xl flex items-center justify-center shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="16" y1="11" x2="22" y2="11"></line></svg>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-black text-slate-800 tracking-tight">Agregar del Repositorio</h4>
                                <p className="text-xs font-bold text-slate-400 leading-relaxed max-w-[200px]">
                                    Selecciona miembros de tu equipo existente o busca freelancers disponibles.
                                </p>
                            </div>
                            <button className="bg-white px-6 py-3 rounded-2xl border border-slate-100 text-sm font-black text-slate-700 shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                Buscar Personal
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODALS */}

            {/* Task List Modal */}
            <Modal isOpen={isTasksModalOpen} onClose={() => setIsTasksModalOpen(false)} title={`Tareas: ${selectedMember?.name}`}>
                <div className="space-y-6">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {(selectedMember?.taskList || [
                            { id: 1, t: 'Montaje de estación principal', s: 'done' },
                            { id: 2, t: 'Preparación de aperitivos', s: 'pending' },
                            { id: 3, t: 'Coordinación con equipo de limpieza', s: 'pending' },
                        ]).map((task) => (
                            <motion.button
                                key={task.id}
                                onClick={() => {
                                    const updatedStaff = staffList.map(m => {
                                        if (m.id === selectedMember.id) {
                                            const currentTasks = m.taskList || [
                                                { id: 1, t: 'Montaje de estación principal', s: 'done' },
                                                { id: 2, t: 'Preparación de aperitivos', s: 'pending' },
                                                { id: 3, t: 'Coordinación con equipo de limpieza', s: 'pending' },
                                            ];
                                            const newTasks = currentTasks.map(t =>
                                                t.id === task.id ? { ...t, s: t.s === 'done' ? 'pending' : 'done' } : t
                                            );
                                            const doneCount = newTasks.filter(t => t.s === 'done').length;
                                            return { ...m, taskList: newTasks, tasks: `${doneCount}/${newTasks.length} Tareas` };
                                        }
                                        return m;
                                    });
                                    setStaffList(updatedStaff);
                                    setSelectedMember(updatedStaff.find(m => m.id === selectedMember.id));
                                }}
                                className="w-full flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-primary/30 transition-all text-left group"
                            >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${task.s === 'done' ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-200 group-hover:border-brand-primary'}`}>
                                    {task.s === 'done' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                </div>
                                <span className={`text-[13px] font-bold transition-all ${task.s === 'done' ? 'text-slate-400 line-through' : 'text-slate-600'}`}>{task.t}</span>
                            </motion.button>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex gap-2">
                            <input
                                id="new-task-input"
                                type="text"
                                placeholder="Nueva tarea..."
                                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-primary text-sm font-bold"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                        const newTaskText = e.target.value.trim();
                                        const updatedStaff = staffList.map(m => {
                                            if (m.id === selectedMember.id) {
                                                const currentTasks = m.taskList || [
                                                    { id: 1, t: 'Montaje de estación principal', s: 'done' },
                                                    { id: 2, t: 'Preparación de aperitivos', s: 'pending' },
                                                    { id: 3, t: 'Coordinación con equipo de limpieza', s: 'pending' },
                                                ];
                                                const newTasks = [...currentTasks, { id: Date.now(), t: newTaskText, s: 'pending' }];
                                                const doneCount = newTasks.filter(t => t.s === 'done').length;
                                                return { ...m, taskList: newTasks, tasks: `${doneCount}/${newTasks.length} Tareas` };
                                            }
                                            return m;
                                        });
                                        setStaffList(updatedStaff);
                                        setSelectedMember(updatedStaff.find(m => m.id === selectedMember.id));
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    const input = document.getElementById('new-task-input');
                                    if (input.value.trim()) {
                                        const newTaskText = input.value.trim();
                                        const updatedStaff = staffList.map(m => {
                                            if (m.id === selectedMember.id) {
                                                const currentTasks = m.taskList || [
                                                    { id: 1, t: 'Montaje de estación principal', s: 'done' },
                                                    { id: 2, t: 'Preparación de aperitivos', s: 'pending' },
                                                    { id: 3, t: 'Coordinación con equipo de limpieza', s: 'pending' },
                                                ];
                                                const newTasks = [...currentTasks, { id: Date.now(), t: newTaskText, s: 'pending' }];
                                                const doneCount = newTasks.filter(t => t.s === 'done').length;
                                                return { ...m, taskList: newTasks, tasks: `${doneCount}/${newTasks.length} Tareas` };
                                            }
                                            return m;
                                        });
                                        setStaffList(updatedStaff);
                                        setSelectedMember(updatedStaff.find(m => m.id === selectedMember.id));
                                        input.value = '';
                                    }
                                }}
                                className="p-3 bg-brand-primary text-white rounded-xl shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </button>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 mt-2 ml-1 italic">Presiona Enter para añadir rápido</p>
                    </div>
                </div>
            </Modal>

            {/* Message Modal */}
            <Modal isOpen={isMessageModalOpen} onClose={() => setIsMessageModalOpen(false)} title={`Chat con ${selectedMember?.name}`}>
                <div className="space-y-4">
                    <div className="h-[200px] bg-slate-50 rounded-[32px] p-6 overflow-y-auto space-y-4">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm w-fit max-w-[80%]">
                            <p className="text-xs font-bold text-slate-600">Hola, ¿ya está listo el montaje?</p>
                        </div>
                        <div className="bg-brand-primary p-4 rounded-2xl rounded-tr-none shadow-sm w-fit max-w-[80%] ml-auto">
                            <p className="text-xs font-black text-white text-right">En 5 minutos empezamos la preparación.</p>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Escribe un mensaje..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-primary font-bold text-sm" />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </div>
            </Modal>

            {/* QR Spinner (Simulated) */}
            <Modal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} title="Escanear QR de Personal">
                <div className="flex flex-col items-center gap-8 py-4 text-center">
                    <div className="w-64 h-64 border-4 border-dashed border-slate-200 rounded-[40px] flex items-center justify-center relative bg-slate-50 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-transparent animate-scan"></div>
                        <svg className="text-slate-300" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect x="7" y="7" width="10" height="10"></rect></svg>
                    </div>
                    <p className="text-sm font-bold text-slate-500 max-w-[200px]">Apunta la cámara al código QR de la credencial del miembro.</p>
                </div>
            </Modal>

            {/* Assign Member Modal */}
            <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title="Asignar Personal">
                <div className="space-y-4">
                    <p className="text-[13px] font-bold text-slate-500 mb-4">Selecciona un miembro disponible para el cargo de <span className="text-brand-primary uppercase">{selectedMember?.role}</span></p>
                    {['Roberto Gómez', 'Elena Martínez', 'Oscar Portillo'].map((name, i) => (
                        <button
                            key={i}
                            onClick={() => confirmAssignment(name)}
                            className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[24px] hover:border-brand-primary hover:bg-brand-primary/5 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xs">{name.split(' ').map(n => n[0]).join('')}</div>
                                <div className="text-left">
                                    <h4 className="font-black text-slate-800 text-sm">{name}</h4>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Disponible</span>
                                </div>
                            </div>
                            <svg className="text-slate-300 group-hover:text-brand-primary transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    ))}
                </div>
            </Modal>

            {/* New Member Modal */}
            <Modal isOpen={isNewMemberModalOpen} onClose={() => setIsNewMemberModalOpen(false)} title="Contratar Nuevo Miembro">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsNewMemberModalOpen(false); }}>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nombre del Freelancer</label>
                        <input type="text" placeholder="Ej. Juan Perez" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[20px] outline-none focus:border-brand-primary font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Rol Necesario</label>
                        <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[20px] outline-none focus:border-brand-primary font-bold">
                            <option>Mesero</option>
                            <option>Seguridad</option>
                            <option>Limpieza</option>
                        </select>
                    </div>
                    <button className="w-full py-5 bg-brand-primary text-white rounded-[24px] font-black shadow-lg shadow-brand-primary/20 hover:scale-[1.02] transition-all mt-4">Publicar Vacante</button>
                </form>
            </Modal>

        </div>
    );
};

export default ProviderEquipo;
