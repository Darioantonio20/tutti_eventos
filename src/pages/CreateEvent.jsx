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
    Sparkles: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>,
    Clock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
};

const CreateEvent = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Step 1 State - Date & Time
    const [isAllDay, setIsAllDay] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());

    // Time Selection State
    const [startTime, setStartTime] = useState({ hour: '09', minute: '00', meridiem: 'AM' });
    const [endTime, setEndTime] = useState({ hour: '06', minute: '00', meridiem: 'PM' });
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const [editingTimeType, setEditingTimeType] = useState('start'); // 'start' or 'end'

    // Step 2 State - Event Type
    const [selectedType, setSelectedType] = useState('Cumpleaños');
    const [customEventType, setCustomEventType] = useState('');
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    // Step 3 State - Budget
    const [minBudget, setMinBudget] = useState(15000);
    const [maxBudget, setMaxBudget] = useState(45000);
    const [selectedCurrency, setSelectedCurrency] = useState({ code: 'MXN', symbol: '$', label: 'Peso Mexicano' });
    const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);

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

    const currencies = [
        { code: 'MXN', symbol: '$', label: 'Peso Mexicano' },
        { code: 'USD', symbol: '$', label: 'Dólar Estadounidense' },
        { code: 'EUR', symbol: '€', label: 'Euro' },
        { code: 'COP', symbol: '$', label: 'Peso Colombiano' },
        { code: 'ARS', symbol: '$', label: 'Peso Argentino' },
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

    const handleBudgetInputChange = (e, type) => {
        // Remove non-digit chars to allow free typing but maintain numeric value
        const val = e.target.value.replace(/\D/g, '');
        const numVal = parseInt(val) || 0;

        if (type === 'min') {
            setMinBudget(numVal);
        } else {
            setMaxBudget(numVal);
        }
    };

    const handleCustomEventSubmit = (e) => {
        e.preventDefault();
        if (customEventType.trim()) {
            setSelectedType(customEventType);
            setIsCustomModalOpen(false);
        }
    };

    // Calendar Helper Functions
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            viewDate.getMonth() === today.getMonth() &&
            viewDate.getFullYear() === today.getFullYear()
        );
    };
    const isSelected = (day) => {
        return (
            day === selectedDate.getDate() &&
            viewDate.getMonth() === selectedDate.getMonth() &&
            viewDate.getFullYear() === selectedDate.getFullYear()
        );
    };
    const isPastDate = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateToCheck = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        return dateToCheck < today;
    };

    const handlePrevMonth = () => {
        const now = new Date();
        const prev = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
        if (prev.getFullYear() < now.getFullYear() || (prev.getFullYear() === now.getFullYear() && prev.getMonth() < now.getMonth())) return;
        setViewDate(prev);
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const daysName = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

    const renderCalendarDays = () => {
        const daysCount = getDaysInMonth(viewDate);
        const firstDay = getFirstDayOfMonth(viewDate);
        const daysArr = [];

        // Fill blanks
        for (let i = 0; i < firstDay; i++) {
            daysArr.push(<div key={`blank-${i}`} className="aspect-square" />);
        }

        // Fill dates
        for (let day = 1; day <= daysCount; day++) {
            const past = isPastDate(day);
            daysArr.push(
                <div key={day} className="aspect-square flex items-center justify-center px-1">
                    <button
                        disabled={past}
                        onClick={() => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
                        className={`
                            w-full h-full rounded-2xl flex items-center justify-center text-sm font-bold transition-all
                            ${isSelected(day)
                                ? 'bg-[#2eb8ff] text-white shadow-xl shadow-[#2eb8ff]/40 scale-110'
                                : past
                                    ? 'text-slate-200 cursor-not-allowed opacity-50'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:scale-95'
                            }
                            ${isToday(day) && !isSelected(day) ? 'ring-2 ring-[#2eb8ff]/20' : ''}
                        `}
                    >
                        {day}
                    </button>
                </div>
            );
        }

        return daysArr;
    };

    // Time Selection Helpers
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = ['00', '15', '30', '45'];

    const openTimePicker = (type) => {
        setEditingTimeType(type);
        setIsTimeModalOpen(true);
    };

    const updateTime = (key, value) => {
        if (editingTimeType === 'start') {
            setStartTime(prev => ({ ...prev, [key]: value }));
        } else {
            setEndTime(prev => ({ ...prev, [key]: value }));
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

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.05] tracking-tighter transition-all duration-500">
                                        {currentStep === 1 && "¿Cuándo es tu evento?"}
                                        {currentStep === 2 && "¿Qué tipo de evento estás planeando?"}
                                        {currentStep === 3 && "¿Cuál es tu presupuesto estimado?"}
                                        {currentStep === 4 && "¿Cuántos invitados esperas?"}
                                    </h1>
                                    <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm mt-6">
                                        {currentStep === 1 && "Selecciona una fecha tentativa. No te preocupes, podrás ajustarla más tarde if la disponibilidad cambia."}
                                        {currentStep === 2 && "Selecciona una categoría para que la IA personalice las opciones."}
                                        {currentStep === 3 && "Define un rango aproximado para que nuestra IA negocie las mejores opciones."}
                                        {currentStep === 4 && "Esto nos ayuda a calcular el espacio y los servicios ideales."}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right Side: Interactive Content Area */}
                <div className="w-full md:w-[60%] p-6 md:p-12 lg:p-16 bg-slate-50 overflow-y-auto flex items-center justify-center">
                    <div className="w-full max-w-5xl space-y-10 pb-24 md:pb-0 scroll-py-8">
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
                                                <div
                                                    onClick={() => openTimePicker('start')}
                                                    className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 hover:border-[#2eb8ff]/30 cursor-pointer shadow-sm transition-all active:scale-95 group"
                                                >
                                                    <span className="text-slate-400 group-hover:text-[#2eb8ff] transition-colors">{Icons.Clock}</span>
                                                    <span className="text-sm font-black text-slate-700">{startTime.hour}:{startTime.minute} {startTime.meridiem}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Fin</span>
                                                <div
                                                    onClick={() => openTimePicker('end')}
                                                    className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 hover:border-[#2eb8ff]/30 cursor-pointer shadow-sm transition-all active:scale-95 group"
                                                >
                                                    <span className="text-slate-400 group-hover:text-[#2eb8ff] transition-colors">{Icons.Clock}</span>
                                                    <span className="text-sm font-black text-slate-700">{endTime.hour}:{endTime.minute} {endTime.meridiem}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="bg-white rounded-[2rem] border-none shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 overflow-hidden">
                                        <div className="flex items-center justify-between mb-8">
                                            <AnimatePresence mode="wait">
                                                <motion.h3
                                                    key={viewDate.getTime()}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-xl font-black text-slate-800 tracking-tight"
                                                >
                                                    {months[viewDate.getMonth()]} {viewDate.getFullYear()}
                                                </motion.h3>
                                            </AnimatePresence>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={handlePrevMonth}
                                                    className={`p-2 border border-slate-100 rounded-xl hover:bg-slate-50 text-slate-400 transition-all active:scale-95 ${viewDate.getMonth() === new Date().getMonth() && viewDate.getFullYear() === new Date().getFullYear() ? 'opacity-30 cursor-not-allowed' : ''}`}
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                </button>
                                                <button
                                                    onClick={handleNextMonth}
                                                    className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 text-slate-400 transition-all active:scale-95"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                </button>
                                                <button
                                                    onClick={() => { setViewDate(new Date()); setSelectedDate(new Date()); }}
                                                    className="text-[#2eb8ff] text-[11px] font-black uppercase tracking-wider hover:underline ml-2"
                                                >
                                                    Ir a hoy
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-y-4 mb-4">
                                            {daysName.map(day => <div key={day} className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">{day}</div>)}
                                        </div>
                                        <div className="relative min-h-[240px]">
                                            <AnimatePresence mode="popLayout" custom={viewDate}>
                                                <motion.div
                                                    key={viewDate.getMonth() + "-" + viewDate.getFullYear()}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                    className="grid grid-cols-7 gap-y-2"
                                                >
                                                    {renderCalendarDays()}
                                                </motion.div>
                                            </AnimatePresence>
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
                                    <div className="grid grid-cols-2 gap-4">
                                        {eventTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => setSelectedType(type.id)}
                                                className={`
                                                    relative p-6 md:p-14 rounded-[2.5rem] bg-white transition-all duration-500 flex flex-col items-center text-center group
                                                    ${selectedType === type.id
                                                        ? 'ring-4 ring-[#2eb8ff]/20 border border-[#2eb8ff] shadow-[0_20px_60px_rgba(46,184,255,0.2)] scale-[1.02] z-10'
                                                        : 'border border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-slate-50'
                                                    }
                                                `}
                                            >
                                                {selectedType === type.id && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute top-3 right-3 md:top-5 md:right-5 w-8 h-8 md:w-10 md:h-10 bg-[#2eb8ff] rounded-full flex items-center justify-center shadow-lg transform"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </motion.div>
                                                )}
                                                <div className={`
                                                    w-20 h-20 md:w-32 md:h-32 mb-5 md:mb-8 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center text-4xl md:text-6xl transition-transform duration-500
                                                    ${selectedType === type.id ? 'scale-110' : 'group-hover:scale-110'}
                                                    ${type.bgColor} ${type.color}
                                                `}>
                                                    {type.icon}
                                                </div>
                                                <h3 className="text-lg md:text-3xl font-black text-slate-800 mb-2 leading-tight">{type.label}</h3>
                                                <p className="text-xs md:text-base font-bold text-slate-400 leading-tight">{type.sublabel}</p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Render Custom Selection if exists */}
                                    {selectedType !== 'Boda' && selectedType !== 'Cumpleaños' && selectedType !== 'Corporativo' && selectedType !== 'Graduación' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-1 rounded-[2rem] bg-gradient-to-r from-[#2eb8ff] to-[#00d2ff] p-[2px] shadow-lg shadow-blue-200"
                                        >
                                            <div className="bg-white rounded-[1.9rem] p-5 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-blue-50 text-[#2eb8ff] rounded-2xl flex items-center justify-center shadow-inner">{Icons.Sparkles}</div>
                                                    <div>
                                                        <h4 className="font-black text-slate-800 text-lg">{selectedType}</h4>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Personalizado</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => setIsCustomModalOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 transition-colors">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    <button
                                        onClick={() => setIsCustomModalOpen(true)}
                                        className="w-full bg-white p-2 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-[#2eb8ff]/30 group transition-all active:scale-[0.99] overflow-hidden"
                                    >
                                        <div className="flex items-center justify-between p-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-[#2eb8ff] group-hover:text-white transition-colors duration-300">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Otro tipo de evento</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-[#2eb8ff] transition-colors">Personalizar</p>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-[#2eb8ff] group-hover:bg-[#2eb8ff] transition-all">
                                                <svg className="text-slate-300 group-hover:text-white transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                            </div>
                                        </div>
                                    </button>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8 md:space-y-12"
                                >
                                    <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-10 md:p-16 flex flex-col items-center">
                                        <span className="text-xs md:text-sm font-black text-slate-300 uppercase tracking-[0.3em] mb-4 md:mb-8">Rango Seleccionado</span>
                                        <div className="flex flex-col items-center text-5xl md:text-8xl font-black text-slate-800 tracking-tighter leading-none">
                                            <div className="flex items-start">
                                                <span className="text-2xl md:text-4xl text-slate-300 mr-2 mt-2">{selectedCurrency.symbol}</span>
                                                <AnimatedNumber value={minBudget} />
                                            </div>
                                            <div className="w-full h-[2px] bg-slate-100 my-2 md:my-4 rounded-full" />
                                            <div className="flex items-start text-slate-700 scale-90">
                                                <span className="text-2xl md:text-4xl mr-2 mt-2 text-slate-400">{selectedCurrency.symbol}</span>
                                                <AnimatedNumber value={maxBudget} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-4 md:px-10 space-y-16">
                                        {/* Range Slider Container */}
                                        <div className="relative h-4 bg-slate-100 rounded-full">
                                            <div
                                                className="absolute h-full bg-[#2eb8ff] rounded-full opacity-30"
                                                style={{
                                                    left: `${(minBudget / 100000) * 100}%`,
                                                    right: `${100 - (maxBudget / 100000) * 100}%`
                                                }}
                                            />
                                            {/* Active Range Bar */}
                                            <div
                                                className="absolute h-full bg-[#2eb8ff] rounded-full shadow-[0_0_20px_rgba(46,184,255,0.5)]"
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
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 md:[&::-webkit-slider-thumb]:w-10 md:[&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 md:[&::-webkit-slider-thumb]:border-8 [&::-webkit-slider-thumb]:border-[#2eb8ff] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform z-20"
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="100000"
                                                step="1000"
                                                value={maxBudget}
                                                onChange={(e) => handleSliderChange(e, 'max')}
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 md:[&::-webkit-slider-thumb]:w-10 md:[&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 md:[&::-webkit-slider-thumb]:border-8 [&::-webkit-slider-thumb]:border-[#2eb8ff] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform z-20"
                                            />

                                            {/* Floating Labels */}
                                            <div
                                                className="absolute -top-12 md:-top-16 bg-[#2eb8ff] text-white text-xs md:text-sm font-black px-4 py-2 rounded-xl shadow-lg shadow-blue-200/50 -translate-x-1/2 transition-all"
                                                style={{ left: `${(minBudget / 100000) * 100}%` }}
                                            >
                                                Mín {selectedCurrency.symbol}{minBudget / 1000}k
                                            </div>
                                            <div
                                                className="absolute -top-12 md:-top-16 bg-[#2eb8ff] text-white text-xs md:text-sm font-black px-4 py-2 rounded-xl shadow-lg shadow-blue-200/50 -translate-x-1/2 transition-all"
                                                style={{ left: `${(maxBudget / 100000) * 100}%` }}
                                            >
                                                Máx {selectedCurrency.symbol}{maxBudget / 1000}k
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                                            {/* Min Input */}
                                            <div className="space-y-4">
                                                <span className="text-xs font-black text-slate-300 uppercase tracking-widest ml-2">Mínimo</span>
                                                <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-[1.5rem] px-6 py-6 md:py-8 shadow-sm focus-within:ring-4 focus-within:ring-[#2eb8ff]/10 focus-within:border-[#2eb8ff] transition-all group hover:border-slate-200">
                                                    <span className="text-slate-300 font-black text-xl md:text-2xl group-focus-within:text-[#2eb8ff] transition-colors">{selectedCurrency.symbol}</span>
                                                    <input
                                                        type="text"
                                                        value={minBudget.toLocaleString()}
                                                        onChange={e => handleBudgetInputChange(e, 'min')}
                                                        className="w-full bg-transparent border-none outline-none font-black text-slate-800 text-xl md:text-3xl"
                                                    />
                                                </div>
                                            </div>
                                            {/* Max Input */}
                                            <div className="space-y-4">
                                                <span className="text-xs font-black text-slate-300 uppercase tracking-widest ml-2">Máximo</span>
                                                <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-[1.5rem] px-6 py-6 md:py-8 shadow-sm focus-within:ring-4 focus-within:ring-[#2eb8ff]/10 focus-within:border-[#2eb8ff] transition-all group hover:border-slate-200">
                                                    <span className="text-slate-300 font-black text-xl md:text-2xl group-focus-within:text-[#2eb8ff] transition-colors">{selectedCurrency.symbol}</span>
                                                    <input
                                                        type="text"
                                                        value={maxBudget.toLocaleString()}
                                                        onChange={e => handleBudgetInputChange(e, 'max')}
                                                        className="w-full bg-transparent border-none outline-none font-black text-slate-800 text-xl md:text-3xl"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Currency Selector */}
                                        <div className="space-y-4">
                                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest ml-2">Moneda</span>
                                            <button
                                                onClick={() => setIsCurrencyModalOpen(true)}
                                                className="w-full flex items-center justify-between bg-white border border-slate-100 rounded-[1.5rem] px-6 py-6 md:py-8 shadow-sm hover:border-[#2eb8ff]/30 hover:shadow-lg hover:shadow-blue-50 transition-all group"
                                            >
                                                <div className="flex items-center gap-4 md:gap-6">
                                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-primary font-black text-lg md:text-2xl group-hover:scale-110 transition-transform">{selectedCurrency.symbol}</div>
                                                    <div className="text-left">
                                                        <span className="block text-lg md:text-2xl font-black text-slate-800">{selectedCurrency.label}</span>
                                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{selectedCurrency.code}</span>
                                                    </div>
                                                </div>
                                                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-[#2eb8ff] group-hover:text-white group-hover:border-[#2eb8ff] transition-all">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                                </div>
                                            </button>
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
                                    className="space-y-8 md:space-y-12"
                                >
                                    {/* Main Counter Card */}
                                    <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-12 md:p-24 flex flex-col items-center justify-center relative overflow-hidden">
                                        {/* Decorative background blur */}
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/50 to-transparent pointer-events-none" />

                                        <div className="relative flex items-center justify-between w-full max-w-lg gap-6">
                                            <button
                                                onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                                                className="w-16 h-16 md:w-24 md:h-24 bg-slate-100/80 hover:bg-slate-200 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-3xl md:text-5xl text-slate-400 transition-all active:scale-90"
                                            >
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>

                                            <div className="flex flex-col items-center">
                                                <span className="text-7xl md:text-9xl font-black text-slate-800 tracking-tighter leading-none mb-3">
                                                    <AnimatedNumber value={guests} />
                                                </span>
                                                <span className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-[0.4em] ml-1">Invitados</span>
                                            </div>

                                            <button
                                                onClick={() => setGuests(prev => prev + 1)}
                                                className="w-16 h-16 md:w-24 md:h-24 bg-[#2eb8ff] hover:bg-[#25abf0] rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-3xl md:text-5xl text-white shadow-lg shadow-blue-300/50 transition-all active:scale-90 hover:shadow-xl hover:-translate-y-1"
                                            >
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Suggested Ranges Grid */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-center gap-2 opacity-80">
                                            <svg className="text-[#2eb8ff]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                            <span className="text-sm font-bold text-slate-800">Rangos sugeridos</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {guestRanges.map((range) => (
                                                <button
                                                    key={range.id}
                                                    onClick={() => {
                                                        setGuestRange(range.id);
                                                        // Update guest count based on range (midpoint)
                                                        const val = range.range.includes('+') ? 350 : parseInt(range.range.split('-')[0]) + 10;
                                                        setGuests(val);
                                                    }}
                                                    className={`
                                                        relative p-6 rounded-[2rem] border transition-all duration-300 flex flex-col items-center text-center group
                                                        ${guestRange === range.id
                                                            ? 'bg-blue-50/30 border-[#2eb8ff] ring-1 ring-[#2eb8ff]/50 shadow-lg shadow-blue-100 z-10'
                                                            : 'bg-white border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-slate-100 hover:shadow-md hover:-translate-y-1'
                                                        }
                                                    `}
                                                >
                                                    {guestRange === range.id && (
                                                        <motion.div
                                                            layoutId="activeRange"
                                                            className="absolute top-4 right-4 w-3 h-3 bg-[#2eb8ff] rounded-full shadow-sm"
                                                        />
                                                    )}

                                                    <div className={`
                                                        text-3xl mb-4 transition-transform duration-300
                                                        ${guestRange === range.id ? 'scale-110' : 'group-hover:scale-110 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}
                                                        ${range.color}
                                                    `}>
                                                        {range.icon}
                                                    </div>

                                                    <div className="font-black text-slate-800 text-lg mb-1">{range.label}</div>
                                                    <div className={`
                                                        px-3 py-1 rounded-full text-[10px] font-bold tracking-wide
                                                        ${guestRange === range.id ? 'bg-[#2eb8ff] text-white' : 'bg-slate-100 text-slate-400'}
                                                    `}>
                                                        {range.range}
                                                    </div>
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

            {/* Modal for Time Selection */}
            <Modal
                isOpen={isTimeModalOpen}
                onClose={() => setIsTimeModalOpen(false)}
                title={`Editar Hora de ${editingTimeType === 'start' ? 'Inicio' : 'Fin'}`}
            >
                <div className="space-y-8">
                    <div className="flex justify-center gap-4">
                        {/* Hour Selecor */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Hora</span>
                            <div className="grid grid-cols-4 gap-2">
                                {hours.map(h => (
                                    <button
                                        key={h}
                                        onClick={() => updateTime('hour', h)}
                                        className={`w-10 h-10 rounded-xl font-bold transition-all ${(editingTimeType === 'start' ? startTime.hour : endTime.hour) === h ? 'bg-[#2eb8ff] text-white shadow-lg shadow-[#2eb8ff]/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        {h}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Minute Selector */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Minuto</span>
                            <div className="flex flex-col gap-2">
                                {minutes.map(m => (
                                    <button
                                        key={m}
                                        onClick={() => updateTime('minute', m)}
                                        className={`w-12 h-10 rounded-xl font-bold transition-all ${(editingTimeType === 'start' ? startTime.minute : endTime.minute) === m ? 'bg-[#2eb8ff] text-white shadow-lg shadow-[#2eb8ff]/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Meridiem Selector */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">AM/PM</span>
                            <div className="flex flex-col gap-2">
                                {['AM', 'PM'].map(mer => (
                                    <button
                                        key={mer}
                                        onClick={() => updateTime('meridiem', mer)}
                                        className={`w-12 h-10 rounded-xl font-bold transition-all ${(editingTimeType === 'start' ? startTime.meridiem : endTime.meridiem) === mer ? 'bg-[#2eb8ff] text-white shadow-lg shadow-[#2eb8ff]/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        {mer}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => setIsTimeModalOpen(false)}
                        className="w-full py-4 rounded-2xl text-sm font-black"
                    >
                        Confirmar Hora
                    </Button>
                </div>
            </Modal>

            {/* Modal for Currency Selection */}
            <Modal
                isOpen={isCurrencyModalOpen}
                onClose={() => setIsCurrencyModalOpen(false)}
                title="Seleccionar Moneda"
            >
                <div className="grid grid-cols-1 gap-3">
                    {currencies.map((curr) => (
                        <button
                            key={curr.code}
                            onClick={() => { setSelectedCurrency(curr); setIsCurrencyModalOpen(false); }}
                            className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${selectedCurrency.code === curr.code ? 'border-[#2eb8ff] bg-blue-50/50 shadow-sm' : 'border-slate-50 hover:border-slate-100 hover:bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${selectedCurrency.code === curr.code ? 'bg-[#2eb8ff] text-white' : 'bg-white text-slate-400 border border-slate-100'}`}>
                                    {curr.symbol}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-800">{curr.label}</h4>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{curr.code}</p>
                                </div>
                            </div>
                            {selectedCurrency.code === curr.code && (
                                <div className="w-6 h-6 bg-[#2eb8ff] rounded-full flex items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
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
