import React from 'react';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';

function App() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Brand Header Section mimicking the image's "RK" side */}
            <div className="relative h-[400px] overflow-hidden bg-brand-dark flex items-center justify-center">
                {/* Decorative Fluid background (simulated with gradients/blobs) */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[120%] bg-brand-primary/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute top-[20%] right-[0%] w-[40%] h-[80%] bg-brand-teal/20 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 text-center px-4 font-sans">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                            <span className="text-white text-2xl font-black italic">TK</span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                        TUTTI <span className="text-brand-primary font-light italic">EVENTOS</span>
                    </h1>
                    <p className="text-brand-accent/80 text-lg md:text-xl font-medium tracking-wide uppercase">
                        Inteligencia Artificial para momentos inolvidables
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Form Section */}
                    <div className="lg:col-span-1">
                        <Card className="shadow-2xl p-8 bg-white/80 backdrop-blur-lg border-white/40" hoverEffect={false}>
                            <h2 className="text-3xl font-black text-slate-800 mb-1">Bienvenido</h2>
                            <p className="text-slate-400 text-sm mb-8 font-medium italic">Inicia sesión para crear tu evento</p>

                            <div className="space-y-6">
                                <Input label="Correo electrónico" placeholder="ejemplo@correo.com" />
                                <Input label="Contraseña" type="password" placeholder="••••••••" />

                                <div className="text-right">
                                    <button className="text-brand-primary text-xs font-bold hover:underline">¿Olvidaste tu contraseña?</button>
                                </div>

                                <Button className="w-full py-4 text-sm" variant="primary">
                                    Iniciar Sesión
                                </Button>

                                <div className="relative flex items-center py-4">
                                    <div className="flex-grow border-t border-slate-100"></div>
                                    <span className="flex-shrink mx-4 text-slate-300 text-[10px] font-bold uppercase tracking-widest">O continúa con</span>
                                    <div className="flex-grow border-t border-slate-100"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="secondary" className="py-3 text-[11px] font-black uppercase">Google</Button>
                                    <Button variant="secondary" className="py-3 text-[11px] font-black uppercase">Facebook</Button>
                                </div>

                                <p className="text-center text-slate-400 text-xs font-medium pt-4">
                                    ¿No tienes cuenta? <button className="text-brand-primary font-bold hover:underline">Regístrate</button>
                                </p>
                            </div>
                        </Card>
                    </div>

                    {/* Atomic Design Showcase */}
                    <div className="lg:col-span-2 space-y-10">
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-10 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(46,184,255,0.5)]" />
                                <div>
                                    <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none">BRAND ATOMS</h2>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">Atomic Design System</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card variant="brand" className="p-10 group overflow-hidden relative">
                                    <div className="relative z-10">
                                        <Badge variant="brand" className="mb-6">Luxury Palette</Badge>
                                        <h3 className="text-3xl font-black text-white mb-3">Estética Fluida</h3>
                                        <p className="text-white/70 mb-8 text-sm leading-relaxed">
                                            Inspirado en el diseño curvo y elegante de la marca, procesado con IA.
                                        </p>
                                        <Button variant="glass" size="sm" className="px-6">Ver Componentes</Button>
                                    </div>
                                    {/* Decorative element */}
                                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-primary/30 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                                </Card>

                                <div className="space-y-6">
                                    <Card className="p-8 border-brand-primary/5">
                                        <Badge variant="info" className="mb-4">UI Feedback</Badge>
                                        <h3 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Interacciones Dinámicas</h3>
                                        <div className="flex flex-wrap gap-4">
                                            <Button size="sm">Primary</Button>
                                            <Button variant="outline" size="sm">Outline</Button>
                                        </div>
                                    </Card>

                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="h-16 bg-brand-dark rounded-2xl shadow-lg border border-white/5" title="#0F1D24" />
                                        <div className="h-16 bg-brand-primary rounded-2xl shadow-lg shadow-brand-primary/20" title="#2EB8FF" />
                                        <div className="h-16 bg-brand-teal rounded-2xl shadow-lg shadow-brand-teal/20" title="#00D2FF" />
                                        <div className="h-16 bg-brand-accent rounded-2xl shadow-lg" title="#5EEAD4" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Hola Mundo Banner */}
                        <section className="bg-white rounded-3xl p-1 shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-slate-50 rounded-[22px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tighter italic">"HOLA MUNDO"</h3>
                                    <p className="text-slate-500 font-medium">Arquitectura Atomic Design configurada y lista.</p>
                                </div>
                                <Button variant="primary" className="rounded-2xl px-12 group">
                                    Explorar Proyecto
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Button>
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;
