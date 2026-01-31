import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import Toggle from '../components/atoms/Toggle';
import Sidebar from '../components/organisms/Sidebar';
import AnimatedNumber from '../components/atoms/AnimatedNumber';
import Modal from '../components/atoms/Modal';

// Professional Icons (Lucide-style SVGs)
const Icons = {
    Boda: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
    Cumpleaños: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M12 11V7" /><path d="M11 4h2" /></svg>,
    Corporativo: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>,
    Graduación: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
    Intimo: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
    Mediano: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Grande: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 14.2 0L21 21Z" /><path d="M9 12h6" /></svg>,
    Masivo: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" /><rect width="18" height="18" x="3" y="4" rx="2" /><circle cx="12" cy="10" r="2" /><line x1="7" x2="7" y1="2" y2="4" /><line x1="17" x2="17" y1="2" y2="4" /></svg>,
    Currency: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>,
    Sparkles: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
};

const CreateEvent = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Step 1 State - Date & Time
    const [isAllDay, setIsAllDay] = useState(false);
    const [selectedDate, setSelectedDate] = useState(5);

    // Step 2 State - Event Type
    const [selectedType, setSelectedType] = useState('Cumpleaños');
    const [customEventType, setCustomEventType] = useState('');
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    // Step 3 State - Budget
    const [minBudget, setMinBudget] = useState(15000);
    const [maxBudget, setMaxBudget] = useState(45000);

    // Step 4 State - Guests
    const [guests, setGuests] = useState(85);
    const [guestRange, setGuestRange] = useState('Mediano');

    const eventTypes = [
        { id: 'Boda', label: 'Boda', sublabel: 'Celebraciones únicas', color: 'text-pink-500', bgColor: 'bg-pink-50', icon: Icons.Boda },
        { id: 'Cumpleaños', label: 'Cumpleaños', sublabel: 'Fiestas divertidas', color: 'text-purple-500', bgColor: 'bg-purple-50', icon: Icons.Cumpleaños },
        { id: 'Corporativo', label: 'Corporativo', sublabel: 'Reuniones y más', color: 'text-blue-500', bgColor: 'bg-blue-50', icon: Icons.Corporativo },
        { id: 'Graduación', label: 'Graduación', sublabel: 'Logros académicos', color: 'text-orange-500', bgColor: 'bg-orange-50', icon: Icons.Graduación },
    ];

    const guestRanges = [
        { id: 'Íntimo', label: 'Íntimo', range: '10 - 30', icon: Icons.Intimo, color: 'text-pink-500' },
        { id: 'Mediano', label: 'Mediano', range: '30 - 100', icon: Icons.Mediano, color: 'text-brand-primary' },
        { id: 'Grande', label: 'Grande', range: '100 - 300', icon: Icons.Grande, color: 'text-indigo-500' },
        { id: 'Masivo', label: 'Masivo', range: '300+', icon: Icons.Masivo, color: 'text-amber-500' },
    ];

    const days = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    const dates = [
        null, null, 1, 2, 3, 4, 5,
        6, 7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26,
        27, 28, 29, 30, 31
    ];

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
        else navigate('/');
    };

    const handleSliderChange = (e, type) => {
        const val = parseInt(e.target.value);
        if (type === 'min') {
            setMinBudget(Math.min(val, maxBudget - 1000));
        } else {
            setMaxBudget(Math.max(val, minBudget + 1000));
        }
    };

    const handleCustomEventSubmit = (e) => {
        e.preventDefault();
        if (customEventType.trim()) {
            setSelectedType(customEventType);
            setIsCustomModalOpen(false);
        }
    };

    return (
        <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden text-slate-900 border-t-4 border-[#2eb8ff]">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Header */}
            <header className="bg-white border-b border-slate-100 flex items-center h-14 md:h-16 px-4 md:px-8 z-40 shrink-0">
                <div className="flex-1 flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-600"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#2eb8ff] rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-black italic">TK</span>
                        </div>
                        <span className="font-black text-xl tracking-tighter text-slate-800">Tutti</span>
                    </div>
                </div>
                <div className="hidden md:block font-bold text-slate-800">Crear Evento</div>
                <div className="flex-1 flex justify-end">
                    <button onClick={() => navigate('/')} className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors px-4 py-2">
                        Cancelar
                    </button>
                </div>
            </header>

            {/* Split Main Content Area */}
            <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
                {/* Left Side: Context & Progress */}
                <div className="w-full md:w-[40%] p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white border-r border-slate-100 shrink-0 overflow-y-auto">
                    <div className="max-w-md w-full mx-auto md:mx-0 space-y-8 animate-fade-in">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2eb8ff]">Paso {currentStep} de 4</span>
                                <span className="text-[10px] font-black text-slate-300">{currentStep * 25}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#2eb8ff]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${currentStep * 25}%` }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2eb8ff]/5 rounded-full border border-[#2eb8ff]/10">
                                <svg className="text-[#2eb8ff]" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"></path></svg>
                                <span className="text-[#2eb8ff] text-[10px] font-black uppercase tracking-[0.1em]">Tutti AI Assistant</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.05] tracking-tighter transition-all duration-500">
                                {currentStep === 1 && "¿Cuándo es tu evento?"}
                                {currentStep === 2 && "¿Qué tipo de evento estás planeando?"}
                                {currentStep === 3 && "¿Cuál es tu presupuesto estimado?"}
                                {currentStep === 4 && "¿Cuántos invitados esperas?"}
                            </h1>
                            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm">
                                {currentStep === 1 && "Selecciona una fecha tentativa. No te preocupes, podrás ajustarla más tarde if la disponibilidad cambia."}
                                {currentStep === 2 && "Selecciona una categoría para que la IA personalice las opciones."}
                                {currentStep === 3 && "Define un rango aproximado para que nuestra IA negocie las mejores opciones."}
                                {currentStep === 4 && "Esto nos ayuda a calcular el espacio y los servicios ideales."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Interactive Content Area */}
                <div className="w-full md:w-[60%] p-6 md:p-12 lg:p-16 bg-slate-50 overflow-y-auto flex items-start justify-center">
                    <div className="w-full max-w-xl space-y-6 pb-24 md:pb-0 scroll-py-8">
                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <Card className="bg-white rounded-[2rem] border-none shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8">
                                        <Toggle active={isAllDay} onChange={setIsAllDay} label="Todo el día" sublabel="El evento dura 24 horas" />
                                        <div className={`grid grid-cols-2 gap-4 mt-8 transition-all duration-300 ${isAllDay ? 'opacity-30 pointer-events-none' : ''}`}>
                                            <div className="space-y-3">
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Inicio</span>
                                                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 hover:border-[#2eb8ff]/30 cursor-pointer shadow-sm transition-all active:scale-95">
                                                    <svg className="text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                    <span className="text-sm font-black text-slate-700">09:00 AM</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Fin</span>
                                                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 hover:border-[#2eb8ff]/30 cursor-pointer shadow-sm transition-all active:scale-95">
                                                    <svg className="text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                    <span className="text-sm font-black text-slate-700">06:00 PM</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="bg-white rounded-[2rem] border-none shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Octubre 2024</h3>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 text-slate-400 transition-all active:scale-95"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                                                <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 text-slate-400 transition-all active:scale-95"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                                                <button className="text-[#2eb8ff] text-[11px] font-black uppercase tracking-wider hover:underline ml-2">Ir a hoy</button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-y-4 mb-4">
                                            {days.map(day => <div key={day} className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">{day}</div>)}
                                        </div>
                                        <div className="grid grid-cols-7 gap-y-2">
                                            {dates.map((date, idx) => (
                                                <div key={idx} className="aspect-square flex items-center justify-center px-1">
                                                    {date !== null ? (
                                                        <button onClick={() => setSelectedDate(date)} className={`w-full h-full rounded-2xl flex items-center justify-center text-sm font-bold transition-all ${date === selectedDate ? 'bg-[#2eb8ff] text-white shadow-xl shadow-[#2eb8ff]/40 scale-110' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>{date}</button>
                                                    ) : null}
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {eventTypes.map((type) => (
                                            <button key={type.id} onClick={() => setSelectedType(type.id)} className={`relative p-8 rounded-[2rem] bg-white transition-all duration-500 flex flex-col items-center text-center group ${selectedType === type.id ? 'ring-2 ring-[#2eb8ff] shadow-[0_20px_60px_rgba(46,184,255,0.15)] scale-[1.02]' : 'shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1'}`}>
                                                {selectedType === type.id && <div className="absolute top-4 right-4 w-6 h-6 bg-[#2eb8ff] rounded-full flex items-center justify-center shadow-lg animate-scale-in"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>}
                                                <div className={`w-20 h-20 ${type.bgColor} ${type.color} rounded-[1.5rem] flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                                    {type.icon}
                                                </div>
                                                <h3 className="text-xl font-black text-slate-800 mb-2">{type.label}</h3>
                                                <p className="text-sm font-medium text-slate-400">{type.sublabel}</p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Render Custom Selection if exists */}
                                    {selectedType !== 'Boda' && selectedType !== 'Cumpleaños' && selectedType !== 'Corporativo' && selectedType !== 'Graduación' && (
                                        <div className="p-6 rounded-[2rem] bg-white border-2 border-[#2eb8ff] shadow-lg flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-blue-50 text-[#2eb8ff] rounded-2xl flex items-center justify-center">{Icons.Sparkles}</div>
                                                <div>
                                                    <h4 className="font-black text-slate-800">{selectedType}</h4>
                                                    <p className="text-xs font-medium text-slate-400">Tipo de evento personalizado</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setIsCustomModalOpen(true)} className="text-[#2eb8ff] text-xs font-black uppercase tracking-wider hover:underline">Editar</button>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setIsCustomModalOpen(true)}
                                        className="w-full bg-white p-6 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-transparent hover:border-[#2eb8ff]/20 flex items-center justify-between px-8 group transition-all active:scale-[0.99]"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#2eb8ff] group-hover:rotate-12 transition-transform">{Icons.Sparkles}</div>
                                            <div className="text-left">
                                                <h4 className="font-black text-slate-800">Otro tipo de evento</h4>
                                                <p className="text-xs font-medium text-slate-400">Personalizar desde cero</p>
                                            </div>
                                        </div>
                                        <svg className="text-slate-300 group-hover:text-[#2eb8ff] group-hover:translate-x-1 transition-all" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </button>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <Card className="bg-white rounded-[2rem] border-none shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-10 flex flex-col items-center">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Rango Seleccionado</span>
                                        <div className="flex flex-col items-center text-4xl md:text-5xl font-black text-slate-800 tracking-tighter">
                                            <div><AnimatedNumber value={minBudget} prefix="$" /></div>
                                            <div className="mt-1"><AnimatedNumber value={maxBudget} prefix="$" /></div>
                                        </div>
                                    </Card>
                                    <div className="px-6 py-4 space-y-12">
                                        <div className="relative h-2 bg-slate-200 rounded-full">
                                            <div
                                                className="absolute h-full bg-[#2eb8ff] rounded-full"
                                                style={{
                                                    left: `${(minBudget / 100000) * 100}%`,
                                                    right: `${100 - (maxBudget / 100000) * 100}%`
                                                }}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="100000"
                                                step="1000"
                                                value={minBudget}
                                                onChange={(e) => handleSliderChange(e, 'min')}
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#2eb8ff] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="100000"
                                                step="1000"
                                                value={maxBudget}
                                                onChange={(e) => handleSliderChange(e, 'max')}
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#2eb8ff] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                                            />

                                            <div
                                                className="absolute -top-10 bg-[#2eb8ff]/10 text-[#2eb8ff] text-[10px] font-black px-3 py-1.5 rounded-lg border border-[#2eb8ff]/10 -translate-x-1/2"
                                                style={{ left: `${(minBudget / 100000) * 100}%` }}
                                            >
                                                <AnimatedNumber value={minBudget / 1000} prefix="$" suffix="k" />
                                            </div>
                                            <div
                                                className="absolute -top-10 bg-[#2eb8ff]/10 text-[#2eb8ff] text-[10px] font-black px-3 py-1.5 rounded-lg border border-[#2eb8ff]/10 -translate-x-1/2"
                                                style={{ left: `${(maxBudget / 100000) * 100}%` }}
                                            >
                                                <AnimatedNumber value={maxBudget / 1000} prefix="$" suffix="k" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2.5">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Moneda</span>
                                            <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm hover:border-[#2eb8ff]/20 transition-all cursor-pointer group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-brand-primary">{Icons.Currency}</div>
                                                    <span className="text-sm font-bold text-slate-700">Peso Mexicano (MXN)</span>
                                                </div>
                                                <svg className="text-slate-300 group-hover:text-[#2eb8ff] transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2.5">
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Mínimo</span>
                                                <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm focus-within:ring-2 focus-within:ring-[#2eb8ff]/10 focus-within:border-[#2eb8ff] transition-all">
                                                    <span className="text-slate-300 font-bold">$</span>
                                                    <input type="number" value={minBudget} onChange={e => setMinBudget(Number(e.target.value))} className="w-full bg-transparent border-none outline-none font-black text-slate-800 text-sm" />
                                                </div>
                                            </div>
                                            <div className="space-y-2.5">
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Máximo</span>
                                                <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm focus-within:ring-2 focus-within:ring-[#2eb8ff]/10 focus-within:border-[#2eb8ff] transition-all">
                                                    <span className="text-slate-300 font-bold">$</span>
                                                    <input type="number" value={maxBudget} onChange={e => setMaxBudget(Number(e.target.value))} className="w-full bg-transparent border-none outline-none font-black text-slate-800 text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <Card className="bg-white rounded-[2rem] border-none shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-10 flex flex-col items-center">
                                        <div className="flex items-center gap-10">
                                            <button onClick={() => setGuests(prev => Math.max(1, prev - 1))} className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all active:scale-90">−</button>
                                            <div className="flex flex-col items-center min-w-[120px]">
                                                <span className="text-7xl font-black text-slate-800 tracking-tighter">
                                                    <AnimatedNumber value={guests} />
                                                </span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Invitados</span>
                                            </div>
                                            <button onClick={() => setGuests(prev => prev + 1)} className="w-16 h-16 bg-[#2eb8ff] rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg shadow-[#2eb8ff]/30 hover:scale-105 transition-all active:scale-90">+</button>
                                        </div>
                                    </Card>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 ml-2">
                                            <span className="text-[#2eb8ff]">{Icons.Mediano}</span>
                                            <span className="text-sm font-black text-slate-800">Rangos sugeridos</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {guestRanges.map((range) => (
                                                <button key={range.id} onClick={() => {
                                                    setGuestRange(range.id);
                                                    setGuests(parseInt(range.range.split(' - ')[0]) || 300);
                                                }} className={`p-6 rounded-3xl bg-white border-2 transition-all duration-300 relative group ${guestRange === range.id ? 'border-[#2eb8ff] shadow-lg scale-[1.02]' : 'border-transparent shadow-sm hover:border-slate-100 hover:shadow-md'}`}>
                                                    {guestRange === range.id && <div className="absolute top-3 right-3 w-2 h-2 bg-[#2eb8ff] rounded-full animate-pulse" />}
                                                    <div className={`text-2xl mb-3 group-hover:scale-110 transition-transform ${range.color}`}>{range.icon}</div>
                                                    <div className="font-black text-slate-800 text-lg">{range.label}</div>
                                                    <div className="text-xs font-bold text-slate-400 mt-1">{range.range}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Modal for Custom Event */}
            <Modal
                isOpen={isCustomModalOpen}
                onClose={() => setIsCustomModalOpen(false)}
                title="Personalizar Evento"
            >
                <form onSubmit={handleCustomEventSubmit} className="space-y-6">
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Nombre del evento</label>
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus-within:ring-2 focus-within:ring-[#2eb8ff]/10 focus-within:border-[#2eb8ff] transition-all">
                            <input
                                autoFocus
                                type="text"
                                placeholder="E.g. Festival de Jazz, Aniversario..."
                                value={customEventType}
                                onChange={e => setCustomEventType(e.target.value)}
                                className="w-full bg-transparent border-none outline-none font-bold text-slate-800 text-sm placeholder:text-slate-300"
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full py-4 rounded-2xl text-sm font-black"
                    >
                        Confirmar Tipo de Evento
                    </Button>
                </form>
            </Modal>

            {/* Footer */}
            <footer className="h-20 bg-white border-t border-slate-100 p-4 md:px-8 flex justify-center items-center z-50 shrink-0">
                <div className="max-w-5xl w-full flex justify-between items-center gap-6">
                    <Button
                        variant="secondary"
                        className="px-8 py-3.5 md:px-12 rounded-2xl bg-brand-dark border-none text-white font-black text-sm hover:bg-slate-800"
                        onClick={handleBack}
                    >
                        Atrás
                    </Button>
                    <div className="flex-grow hidden md:block"></div>
                    <Button
                        variant="primary"
                        className={`px-12 py-3.5 md:px-20 rounded-2xl shadow-[0_15px_30px_rgba(46,184,255,0.3)] text-sm font-black active:scale-95 transition-all
                            ${currentStep === 4 ? 'bg-gradient-to-r from-brand-primary to-blue-600 border-none' : 'bg-[#2eb8ff] text-white'}
                        `}
                        onClick={handleNext}
                    >
                        {currentStep === 4 ? (
                            <div className="flex items-center gap-2">
                                {Icons.Sparkles}
                                Generar Propuesta Inteligente
                            </div>
                        ) : (
                            <>Siguiente <svg className="ml-2 inline-block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></>
                        )}
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default CreateEvent;
