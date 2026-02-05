import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfile = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([
        { id: 1, label: "Verificar cuenta de correo", completed: true },
        { id: 2, label: "Completar perfil de organizador", completed: true },
        { id: 3, label: "Vincular método de pago", completed: true },
        { id: 4, label: "Sincronizar calendario de eventos", completed: false }
    ]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Dario Lopez',
        role: 'Usuario Premium',
        phone: '+52 55 1234 5678',
        email: 'dario@tutti.app',
        location: 'CDMX, México'
    });

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </button>
                        <h1 className="text-xl font-bold text-slate-800">Detalle de Perfil</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="hidden sm:flex px-4 py-2 rounded-lg border border-red-100 text-red-500 bg-red-50 hover:bg-red-100/80 text-xs font-bold uppercase tracking-wider transition-all items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            <span>Eliminar</span>
                        </button>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="px-5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            <span>Editar Perfil</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-4"
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-32 h-32 rounded-full bg-slate-200 shadow-xl flex items-center justify-center overflow-hidden border-4 border-white">
                                    <span className="text-4xl font-black text-slate-400">DL</span>
                                </div>
                                <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-1">{userData.name}</h2>
                            <p className="text-sm font-bold text-[#2eb8ff] uppercase tracking-widest mb-8">{userData.role}</p>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button
                                    onClick={() => {/* Logic for calling/logout */ }}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-200 text-slate-600 font-bold text-xs transition-all"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                    Cerrar Sesión
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-200 text-slate-600 font-bold text-xs transition-all">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    Correo
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Details & Tasks */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Top Card: Shift/Personal Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Información Personal</h3>
                                <div className="px-3 py-1 rounded bg-[#2eb8ff]/10 text-[#2eb8ff] text-[10px] font-bold uppercase tracking-wider">
                                    Confirmado
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Horario / Since */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Miembro Desde</div>
                                        <div className="font-bold text-slate-800 text-sm">Oct 2023</div>
                                        <div className="text-xs text-slate-400 mt-1">2 años activo</div>
                                    </div>
                                </div>

                                {/* Responsabilidad / Role */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Responsabilidad</div>
                                        <div className="font-bold text-slate-800 text-sm">Organizador</div>
                                        <div className="text-xs text-slate-400 mt-1">Zona Norte</div>
                                    </div>
                                </div>

                                {/* Móvil / Contact */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Móvil</div>
                                        <div className="font-bold text-slate-800 text-sm">{userData.phone}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom Card: Tasks */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 min-h-[300px]"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tareas Asignadas</h3>
                                <div className="px-3 py-1 rounded bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                                    {completedCount}/{tasks.length} Completadas
                                </div>
                            </div>

                            <div className="space-y-4">
                                {tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        onClick={() => toggleTask(task.id)}
                                        className="flex items-center gap-4 cursor-pointer group"
                                    >
                                        <div className={`
                                            w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0
                                            ${task.completed
                                                ? 'bg-green-500 border-green-500'
                                                : 'border-slate-300 group-hover:border-[#2eb8ff]'}
                                        `}>
                                            {task.completed && (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            )}
                                        </div>
                                        <span className={`text-sm font-bold transition-all ${task.completed ? 'text-slate-300 line-through' : 'text-slate-600 group-hover:text-[#2eb8ff]'}`}>
                                            {task.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Edit Modal */}
                <AnimatePresence>
                    {isEditModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsEditModalOpen(false)}
                                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-slate-800">Editar Perfil</h3>
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Nombre Completo</label>
                                        <input
                                            type="text"
                                            value={userData.name}
                                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2eb8ff] focus:gap-2 transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Teléfono</label>
                                            <input
                                                type="text"
                                                value={userData.phone}
                                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2eb8ff] focus:gap-2 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Ubicación</label>
                                            <input
                                                type="text"
                                                value={userData.location}
                                                onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2eb8ff] focus:gap-2 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            value={userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2eb8ff] focus:gap-2 transition-all"
                                        />
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <button
                                            onClick={() => setIsEditModalOpen(false)}
                                            className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => setIsEditModalOpen(false)}
                                            className="flex-1 py-3.5 rounded-xl bg-[#2eb8ff] text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-[#25abf0] hover:translate-y-px transition-all"
                                        >
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default UserProfile;
