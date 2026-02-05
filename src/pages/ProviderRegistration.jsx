import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/atoms/Modal';

// Iconos SVG que coinciden con el diseño
const Icons = {
    Back: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
    ),
    Music: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2eb8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
    ),
    Salon: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="22" x2="9" y2="22" /><line x1="15" y1="22" x2="15" y2="22" /><line x1="12" y1="6" x2="12" y2="6" /><line x1="12" y1="10" x2="12" y2="10" /><line x1="12" y1="14" x2="12" y2="14" /><line x1="12" y1="18" x2="12" y2="18" /></svg>
    ),
    Food: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8V2M14 8V2M22 2v14a3 3 0 0 1-3 3h-1v2h-2v-2h-1a3 3 0 0 1-3-3V2M7 2v12a5 3 0 0 1-5 3v4h2v-4a5 3 0 0 1 5-3V2" /></svg>
    ),
    Photography: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
    ),
    Decoration: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.8 11.3 2 22l10.7-3.8M4 14.8l.7 1.2M15 4.2a2.4 2.4 0 0 0-3.3 0l-8.4 8.4a2.4 2.4 0 0 0 0 3.3L5.4 18c.9.9 2.4.9 3.3 0l8.4-8.4a2.4 2.4 0 0 0 0-3.3L15 4.2Z" /></svg>
    ),
    Other: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
    ),
    Business: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2eb8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
    ),
    Shop: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
    ),
    Lock: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    ),
    // Iconos Paso 2
    Admin: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2eb8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>
    ),
    Phone: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
    ),
    Mail: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
    ),
    RFC: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
    ),
    Legal: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2eb8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
    ),
    Building: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="22" x2="9" y2="22" /><line x1="15" y1="22" x2="15" y2="22" /><line x1="12" y1="6" x2="12" y2="6" /><line x1="12" y1="10" x2="12" y2="10" /><line x1="12" y1="14" x2="12" y2="14" /><line x1="12" y1="18" x2="12" y2="18" /></svg>
    ),
    CloudUpload: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2eb8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="m9 15 3-3 3 3" /></svg>
    )
};

const ProviderRegistration = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);
    const [tempOtherService, setTempOtherService] = useState('');
    const [formData, setFormData] = useState({
        // Step 1
        category: 'musica',
        otherService: '',
        businessName: '',
        businessDescription: '',
        // Step 2
        phone: '',
        adminEmail: '',
        rfc: '',
        legalName: '',
        address: '',
        streetNum: '',
        zipCode: '',
        city: ''
    });

    const categories = [
        { id: 'musica', name: 'Música', icon: <Icons.Music /> },
        { id: 'salon', name: 'Salón', icon: <Icons.Salon /> },
        { id: 'comida', name: 'Comida', icon: <Icons.Food /> },
        { id: 'fotografia', name: 'Fotografía', icon: <Icons.Photography /> },
        { id: 'decoracion', name: 'Decoración', icon: <Icons.Decoration /> },
        { id: 'otro', name: 'Otro', icon: <Icons.Other /> }
    ];

    const handleCategorySelect = (categoryId) => {
        setFormData({ ...formData, category: categoryId });
        if (categoryId === 'otro') {
            setIsOtherModalOpen(true);
        }
    };

    const confirmOtherService = () => {
        setFormData({ ...formData, otherService: tempOtherService });
        setIsOtherModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContinue = (e) => {
        e.preventDefault();
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-0 md:p-8 font-sans">
            <div className="w-full max-w-[900px] bg-white rounded-none md:rounded-[32px] shadow-sm md:shadow-2xl overflow-hidden min-h-screen md:min-h-0">

                {/* Header Superior */}
                <div className="bg-white px-6 py-6 flex items-center justify-between border-b border-slate-50">
                    <button onClick={handleBack} className="text-slate-600 hover:bg-slate-50 p-2 rounded-full transition-all">
                        <Icons.Back />
                    </button>
                    <h1 className="text-lg font-bold text-slate-800 tracking-tight">Registro de Proveedor</h1>
                    <div className="w-10"></div>
                </div>

                {/* Paso y Progreso Segmentado */}
                <div className="px-8 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[11px] font-black text-brand-primary uppercase tracking-widest">PASO {currentStep} DE 3</span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">
                            {currentStep === 1 ? 'Categoría y Perfil' : 'Información Legal y Contacto'}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 1 ? 'bg-brand-primary' : 'bg-slate-100'}`}></div>
                        <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 2 ? 'bg-brand-primary' : 'bg-slate-100'}`}></div>
                        <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 3 ? 'bg-brand-primary' : 'bg-slate-100'}`}></div>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="px-8 md:px-16 py-10">
                    <form onSubmit={handleContinue} className="space-y-12">

                        {/* PASO 1: Categoría y Perfil */}
                        {currentStep === 1 && (
                            <div className="space-y-10 animate-fade-in">
                                <div className="text-center md:text-left">
                                    <h2 className="text-[32px] font-black text-slate-900 leading-tight mb-4">
                                        ¿Qué servicios ofreces?
                                    </h2>
                                    <p className="text-slate-500 font-medium text-base max-w-lg leading-relaxed">
                                        Selecciona la categoría principal que mejor describa tu negocio para personalizar tu experiencia.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => handleCategorySelect(cat.id)}
                                            className={`
                                                relative w-full aspect-[1.1] rounded-[24px] border-2 transition-all duration-300
                                                flex flex-col items-center justify-center gap-4 group
                                                ${formData.category === cat.id
                                                    ? 'border-brand-primary bg-white shadow-xl shadow-brand-primary/10'
                                                    : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'
                                                }
                                            `}
                                        >
                                            {formData.category === cat.id && (
                                                <div className="absolute top-4 right-4 text-brand-primary animate-scale-in">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                                        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className={`
                                                w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                                                ${formData.category === cat.id ? 'bg-blue-50/50' : 'bg-slate-50'}
                                            `}>
                                                {cat.icon}
                                            </div>
                                            <span className={`font-bold text-base transition-all ${formData.category === cat.id ? 'text-slate-900' : 'text-slate-500'
                                                }`}>
                                                {cat.id === 'otro' && formData.otherService ? formData.otherService : cat.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Botón para cambiar servicio personalizado si ya se eligió */}
                                {formData.category === 'otro' && formData.otherService && (
                                    <div className="flex justify-center -mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setIsOtherModalOpen(true)}
                                            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1.5"
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                            Cambiar tipo de servicio
                                        </button>
                                    </div>
                                )}

                                <div className="bg-slate-50/50 rounded-[32px] p-8 space-y-8 border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="text-brand-primary">
                                            <Icons.Business />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Detalles del Negocio</h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2.5">
                                            <label className="text-sm font-bold text-slate-700 tracking-wide">Nombre de tu Empresa</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none border-r border-slate-100 pr-3">
                                                    <Icons.Shop />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="businessName"
                                                    placeholder="Ej. Sonido Fantástico"
                                                    value={formData.businessName}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-14 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2.5">
                                            <label className="text-sm font-bold text-slate-700 tracking-wide">Breve Descripción</label>
                                            <textarea
                                                name="businessDescription"
                                                rows="4"
                                                placeholder="Cuéntanos sobre tu experiencia y qué te hace único..."
                                                value={formData.businessDescription}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none resize-none"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASO 2: Datos Legales y de Contacto */}
                        {currentStep === 2 && (
                            <div className="space-y-10 animate-fade-in">
                                <div className="text-center md:text-left">
                                    <h2 className="text-[32px] font-black text-slate-900 leading-[1.1] mb-4">
                                        Datos Legales y de Contacto
                                    </h2>
                                    <p className="text-slate-500 font-medium text-base max-w-lg leading-relaxed">
                                        Esta información es necesaria para formalizar nuestra relación comercial y asegurar pagos correctos.
                                    </p>
                                </div>

                                {/* Contacto Administrativo */}
                                <div className="bg-slate-50/50 rounded-[32px] p-8 space-y-6 border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="text-brand-primary">
                                            <Icons.Admin />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Contacto Administrativo</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2.5">
                                            <label className="text-sm font-bold text-slate-700 tracking-wide">Teléfono de contacto</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none border-r border-slate-100 pr-3">
                                                    <Icons.Phone />
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Ej. +52 55 1234 5678"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-14 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2.5">
                                            <label className="text-sm font-bold text-slate-700 tracking-wide">Correo administrativo</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none border-r border-slate-100 pr-3">
                                                    <Icons.Mail />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="adminEmail"
                                                    placeholder="admin@tuempresa.com"
                                                    value={formData.adminEmail}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-14 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Información de Facturación */}
                                <div className="bg-slate-50/50 rounded-[32px] p-8 space-y-6 border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="text-brand-primary">
                                            <Icons.Legal />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Información de Facturación</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2.5">
                                            <label className="text-sm font-bold text-slate-700 tracking-wide">RFC</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none border-r border-slate-100 pr-3">
                                                    <Icons.RFC />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="rfc"
                                                    placeholder="ABCD800101XXX"
                                                    value={formData.rfc}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-14 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none uppercase"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2.5">
                                            <label className="text-sm font-bold text-slate-700 tracking-wide">Razón Social</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none border-r border-slate-100 pr-3">
                                                    <Icons.Building />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="legalName"
                                                    placeholder="Nombre legal de la empresa"
                                                    value={formData.legalName}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-14 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dirección Física */}
                                    <div className="pt-4 space-y-4">
                                        <label className="text-sm font-bold text-slate-700 tracking-wide">Dirección Física Completa</label>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Calle"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none"
                                            required
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="streetNum"
                                                placeholder="Núm."
                                                value={formData.streetNum}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="zipCode"
                                                placeholder="CP"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none"
                                                required
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="Ciudad / Municipio"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Upload Constancia */}
                                <div className="bg-[#effaff] rounded-[32px] p-8 border-2 border-dashed border-[#bee3f8] flex flex-col items-center text-center space-y-4">
                                    <div className="bg-white p-4 rounded-full shadow-sm">
                                        <Icons.CloudUpload />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[17px] font-bold text-slate-800">Constancia de Situación Fiscal</h4>
                                        <p className="text-slate-400 text-sm font-medium">Sube tu constancia actualizada en formato PDF</p>
                                    </div>
                                    <button type="button" className="mt-2 px-8 py-3 bg-white border-2 border-brand-primary text-brand-primary rounded-[15px] font-bold text-sm hover:bg-brand-primary hover:text-white transition-all">
                                        + Seleccionar Archivo
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PASO 3: Confirmación y Éxito */}
                        {currentStep === 3 && (
                            <div className="space-y-10 animate-fade-in text-center">
                                <div className="space-y-6 flex flex-col items-center">
                                    <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary animate-scale-in">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-3xl font-black text-slate-900 leading-tight">
                                            ¡Todo listo para empezar!
                                        </h2>
                                        <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto leading-relaxed">
                                            Hemos recibido tu información. Ahora puedes acceder a tu panel de control y comenzar a ofrecer tus servicios.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-50/50 rounded-[32px] p-8 border border-slate-100 text-left space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Resumen de Registro</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                            <span className="text-slate-500 font-medium">Categoría:</span>
                                            <span className="text-slate-800 font-bold capitalize">{formData.category === 'otro' ? formData.otherService : formData.category}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                            <span className="text-slate-500 font-medium">Empresa:</span>
                                            <span className="text-slate-800 font-bold">{formData.businessName}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3">
                                            <span className="text-slate-500 font-medium">RFC:</span>
                                            <span className="text-slate-800 font-bold uppercase">{formData.rfc}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm font-medium">
                                    Al continuar, aceptas nuestros términos de servicio y políticas de privacidad para proveedores.
                                </p>
                            </div>
                        )}

                        {/* Botón Acción */}
                        <div className="space-y-6">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    if (currentStep === 3) {
                                        e.preventDefault();
                                        navigate('/proveedor/dashboard');
                                    }
                                }}
                                className="w-full bg-brand-primary hover:bg-[#1da1f2] text-white py-5 rounded-[20px] font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-brand-primary/20"
                            >
                                {currentStep === 3 ? 'Comenzar ahora' : 'Continuar'}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </button>

                            <div className="flex items-center justify-center gap-2 text-slate-400 text-[13px] font-bold">
                                <Icons.Lock />
                                <span>Tus datos están protegidos</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal para especificar "Otro" servicio */}
            <Modal
                isOpen={isOtherModalOpen}
                onClose={() => setIsOtherModalOpen(false)}
                title="Especifica tu servicio"
            >
                <div className="space-y-8">
                    <p className="text-slate-500 font-medium leading-relaxed">
                        Cuéntanos qué tipo de servicio ofreces para poder categorizar tu perfil correctamente.
                    </p>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 tracking-wide uppercase">Nombre del Servicio</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-primary">
                                <Icons.Other />
                            </div>
                            <input
                                type="text"
                                autoFocus
                                placeholder="Ej. Iluminación, Animación, etc."
                                value={tempOtherService}
                                onChange={(e) => setTempOtherService(e.target.value)}
                                className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium text-slate-700 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={confirmOtherService}
                        disabled={!tempOtherService.trim()}
                        className="w-full bg-brand-primary hover:bg-[#1da1f2] text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Confirmar Servicio
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ProviderRegistration;
