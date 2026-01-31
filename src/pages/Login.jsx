import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden font-sans">
            {/* SECCIÓN IZQUIERDA: Identidad de Marca (Basada en la imagen) */}
            <div className="w-full md:w-1/2 relative min-h-[40vh] md:min-h-screen bg-brand-dark flex items-center p-8 md:p-16 overflow-hidden">
                {/* Fondo Fluido Animado */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-brand-primary/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] bg-brand-teal/15 blur-[100px] rounded-full" />
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="relative z-10 w-full max-w-lg">
                    {/* Logo Estilo "RK" */}
                    <div className="mb-12 inline-flex items-center gap-3">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center">
                            <span className="text-white text-2xl font-black tracking-tighter italic">TK</span>
                        </div>
                        <span className="text-white font-black text-xl tracking-widest hidden sm:block uppercase">Tutti Eventos</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6 underline decoration-brand-primary decoration-4 underline-offset-8">
                        Celebra <br /> momentos <br /> inolvidables.
                    </h2>

                    <p className="text-brand-accent/70 text-lg md:text-xl font-medium max-w-md leading-relaxed">
                        La inteligencia artificial que hace realidad el evento de tus sueños.
                    </p>
                </div>
            </div>

            {/* SECCIÓN DERECHA: Formulario de Login */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
                <div className="w-full max-w-md space-y-10 animate-fade-in">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                            Bienvenido a <span className="text-brand-primary">Tutti Eventos IA</span>
                        </h1>
                        <p className="text-slate-400 font-medium italic">Inicia sesión para crear tu evento</p>
                    </div>

                    <form className="space-y-6" onSubmit={() => navigate('/crear-evento')}>
                        <div className="space-y-5">
                            <Input
                                label="Correo electrónico"
                                placeholder="ejemplo@correo.com"
                                type="email"
                                required
                            />
                            <div className="space-y-2">
                                <Input
                                    label="Contraseña"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                />
                                <div className="flex justify-end pr-1">
                                    <button type="button" className="text-xs font-black text-brand-primary hover:text-brand-teal transition-colors uppercase tracking-wider">
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full py-4.5 rounded-2xl text-base shadow-xl"
                            variant="primary"
                        >
                            Iniciar Sesión
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-slate-100"></div>
                            <span className="flex-shrink mx-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">O continúa con</span>
                            <div className="flex-grow border-t border-slate-100"></div>
                        </div>

                        <div className="flex gap-4">
                            <button type="button" className="flex-1 py-3.5 px-4 border border-slate-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all font-bold text-slate-600 shadow-sm border-b-4 active:border-b-0 active:translate-y-0.5">
                                Google
                            </button>
                            <button type="button" className="flex-1 py-3.5 px-4 border border-slate-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all font-bold text-slate-600 shadow-sm border-b-4 active:border-b-0 active:translate-y-0.5">
                                Facebook
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-slate-400 font-medium text-sm">
                        ¿No tienes cuenta? <button className="text-brand-primary font-black hover:underline ml-1">Regístrate</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
