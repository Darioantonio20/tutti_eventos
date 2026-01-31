import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/organisms/Sidebar';
import Card from '../components/atoms/Card';

// Professional Icons (Lucide-style SVGs)
const Icons = {
    Bell: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    Back: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
    Phone: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.28-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
    More: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>,
    Download: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
    Plus: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Search: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
    Edit: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
    Emoji: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
};

const INITIAL_CONVERSATIONS = [
    {
        id: 1,
        name: 'Tutti Bocado',
        time: '10:42 AM',
        snippet: 'Excelente elección. ¿Te gustaría...',
        avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop',
        online: true,
        filter: 'Todo'
    },
    {
        id: 2,
        name: 'Hacienda Los Arcángeles',
        time: 'Ayer',
        snippet: 'Claro, te enviamos el contrato firmad...',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M3 7v14M13 3v18M17 7v14M21 21V7" /></svg>,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        unread: 1,
        filter: 'No leídos'
    },
    {
        id: 3,
        name: 'Fotografía Click',
        time: 'Lun',
        snippet: 'Gracias por confirmar la fecha.',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        filter: 'Todo'
    },
    {
        id: 4,
        name: 'DJ Beats',
        time: '12 Oct',
        snippet: '¿Podrías enviarme la lista de canciones?',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        filter: 'Archivados'
    },
];

const INITIAL_MESSAGES = {
    1: [
        { id: 101, type: 'date', text: 'HOY, 15 OCT' },
        {
            id: 102,
            type: 'received',
            text: 'Hola Ana, espero que estés bien. 👋',
            time: '10:34 AM',
            avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop'
        },
        {
            id: 103,
            type: 'received',
            file: { name: 'Menú_Postres_2024.pdf', size: '2.4 MB' },
            text: 'Te adjunto las opciones de postres para la mesa principal.',
            time: '10:35 AM',
            avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop'
        },
        {
            id: 104,
            type: 'sent',
            text: '¡Me gusta la opción de los mini cheesecakes! Creo que encajarán perfecto con el tema.',
            time: '10:40 AM'
        },
        {
            id: 105,
            type: 'received',
            text: 'Excelente elección. ¿Te gustaría agendar una degustación para la próxima semana? Tenemos espacio el jueves a las 5 PM.',
            time: '10:42 AM',
            avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop'
        },
    ],
    2: [
        { id: 201, type: 'date', text: 'AYER' },
        { id: 202, type: 'received', text: 'Hola, recibimos tus requerimientos para la Hacienda.', time: '09:00 AM' },
        { id: 203, type: 'received', text: 'Claro, te enviamos el contrato firmado esta tarde.', time: '11:15 AM' },
    ],
    3: [
        { id: 301, type: 'date', text: 'LUNES' },
        { id: 302, type: 'received', text: 'El paquete de fotografía incluye 3 cámaras y drone.', time: '02:30 PM' },
        { id: 303, type: 'received', text: 'Gracias por confirmar la fecha.', time: '03:00 PM' },
    ],
    4: [
        { id: 401, type: 'date', text: '12 OCT' },
        { id: 402, type: 'received', text: 'Hola! Estamos listos para el sonido del evento.', time: '10:00 AM' },
        { id: 403, type: 'received', text: '¿Podrías enviarme la lista de canciones?', time: '10:05 AM' },
    ]
};

const Messages = () => {
    // const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Todo');
    const [activeConvId, setActiveConvId] = useState(1);
    const [messageInput, setMessageInput] = useState('');
    const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
    const [messagesByConv, setMessagesByConv] = useState(INITIAL_MESSAGES);
    const messagesEndRef = useRef(null);

    const activeConv = useMemo(() => conversations.find(c => c.id === activeConvId), [conversations, activeConvId]);
    const currentMessages = useMemo(() => messagesByConv[activeConvId] || [], [messagesByConv, activeConvId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages, activeConvId]);

    const filteredConversations = conversations.filter(conv => {
        if (activeFilter === 'Todo') return true;
        return conv.filter === activeFilter;
    });

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        const newMessage = {
            id: Date.now(),
            type: 'sent',
            text: messageInput,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessagesByConv(prev => ({
            ...prev,
            [activeConvId]: [...(prev[activeConvId] || []), newMessage]
        }));

        // Update snippet in conversation list
        setConversations(prev => prev.map(conv =>
            conv.id === activeConvId
                ? { ...conv, snippet: messageInput, time: 'Ahora' }
                : conv
        ));

        setMessageInput('');
    };

    const handleSelectConversation = (id) => {
        setActiveConvId(id);
        // Mark as read
        setConversations(prev => prev.map(conv =>
            conv.id === id ? { ...conv, unread: 0 } : conv
        ));
    };

    return (
        <div className="h-screen bg-white flex flex-col font-sans overflow-hidden text-slate-900 md:flex-row">
            {/* Global Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Conversation List Sidebar */}
            <aside className="w-full md:w-[400px] border-r border-slate-100 flex flex-col h-full bg-white z-20 shrink-0 overflow-hidden">
                {/* Conversations Header */}
                <div className="p-6 pb-2 shrink-0">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            {/* Hamburger Menu (Triggers Global Sidebar) */}
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-3 -ml-2 hover:bg-slate-50 rounded-2xl transition-all text-slate-600 group"
                            >
                                <svg className="group-hover:scale-110 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            </button>
                            <h1 className="font-black text-2xl text-slate-800 tracking-tight">Mensajes</h1>
                        </div>
                        <button className="text-[#2eb8ff] hover:scale-110 transition-transform p-1">
                            {Icons.Edit}
                        </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 p-1.5 bg-slate-50/80 rounded-[1.2rem]">
                        {['Todo', 'No leídos', 'Archivados'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`
                                    flex-1 py-2.5 px-3 rounded-[0.8rem] text-xs font-black transition-all
                                    ${activeFilter === filter ? 'bg-white text-slate-800 shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}
                                `}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List Container */}
                <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1 scrollbar-hide">
                    {filteredConversations.map(conv => (
                        <button
                            key={conv.id}
                            onClick={() => handleSelectConversation(conv.id)}
                            className={`
                                w-full p-4 rounded-[1.8rem] flex items-center gap-4 transition-all relative group
                                ${conv.id === activeConvId ? 'bg-slate-50/80' : 'hover:bg-slate-50/40'}
                            `}
                        >
                            {/* Active Indicator Bar */}
                            {conv.id === activeConvId && (
                                <motion.div
                                    layoutId="active-bar"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#2eb8ff] rounded-r-full"
                                />
                            )}

                            <div className="relative shrink-0">
                                {conv.avatar ? (
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shadow-sm ring-2 ring-white">
                                        <img src={conv.avatar} alt={conv.name} />
                                    </div>
                                ) : (
                                    <div className={`w-14 h-14 rounded-2xl ${conv.bgColor} ${conv.color} flex items-center justify-center shadow-sm ring-2 ring-white`}>
                                        {conv.icon}
                                    </div>
                                )}
                                {conv.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-white"></div>}
                            </div>

                            <div className="flex-1 text-left min-w-0 pr-2">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-black text-sm truncate ${conv.id === activeConvId ? 'text-slate-900' : 'text-slate-700'}`}>{conv.name}</h3>
                                    <span className="text-[10px] font-bold text-slate-300 uppercase shrink-0 mt-0.5">{conv.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className={`text-xs font-medium truncate ${conv.unread ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                                        {conv.snippet}
                                    </p>
                                    {conv.unread > 0 && (
                                        <div className="w-5 h-5 bg-[#2eb8ff] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0 ml-2">
                                            {conv.unread}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Right Panel: Chat Content Area */}
            <main className="flex-1 flex flex-col h-full bg-white relative">
                {/* Chat Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-50 flex items-center h-20 px-6 shrink-0 z-30 sticky top-0">
                    <div className="flex-1 flex items-center gap-4">
                        <div className="relative">
                            {activeConv?.avatar ? (
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shadow-sm">
                                    <img src={activeConv.avatar} alt="Avatar" />
                                </div>
                            ) : (
                                <div className={`w-12 h-12 rounded-2xl ${activeConv?.bgColor} ${activeConv?.color} flex items-center justify-center shadow-sm`}>
                                    {activeConv?.icon}
                                </div>
                            )}
                            {activeConv?.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>}
                        </div>
                        <div>
                            <h2 className="font-black text-slate-800 leading-none mb-1.5">{activeConv?.name}</h2>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em] flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${activeConv?.online ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                                {activeConv?.online ? 'En línea' : 'Desconectado'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-3 text-slate-400 hover:text-[#2eb8ff] transition-all rounded-[1rem] hover:bg-blue-50/50 active:scale-95">
                            {Icons.Phone}
                        </button>
                        <button className="p-3 text-slate-400 hover:text-[#2eb8ff] transition-all rounded-[1rem] hover:bg-blue-50/50 active:scale-95">
                            {Icons.Search}
                        </button>
                        <button className="p-3 text-slate-400 hover:text-[#2eb8ff] transition-all rounded-[1rem] hover:bg-blue-50/50 active:scale-95">
                            {Icons.More}
                        </button>
                    </div>
                </header>

                {/* Messages List Area */}
                <div className="flex-1 overflow-y-auto bg-white p-6 space-y-8 pb-32 scroll-smooth">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {currentMessages.map((msg) => {
                            if (msg.type === 'date') {
                                return (
                                    <div key={msg.id} className="flex justify-center my-6">
                                        <span className="bg-slate-50 text-slate-300 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-slate-100/50">
                                            {msg.text}
                                        </span>
                                    </div>
                                );
                            }

                            const isSent = msg.type === 'sent';
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                    className={`flex ${isSent ? 'justify-end' : 'justify-start'} gap-3 items-end group`}
                                >
                                    {!isSent && (
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border-2 border-white shadow-sm mb-6 transition-transform group-hover:scale-105">
                                            <img src={msg.avatar || activeConv.avatar} alt="Avatar" />
                                        </div>
                                    )}
                                    <div className={`flex flex-col ${isSent ? 'items-end' : 'items-start'} max-w-[75%]`}>
                                        {msg.file && (
                                            <Card className="p-4 bg-white rounded-[2rem] border-slate-50 shadow-sm mb-2 flex items-center gap-4 group/file hover:border-[#2eb8ff]/30 transition-all cursor-pointer">
                                                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shrink-0 group-hover/file:rotate-6 transition-transform">
                                                    <span className="font-black text-[10px]">PDF</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-slate-800 text-sm truncate">{msg.file.name}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{msg.file.size}</p>
                                                </div>
                                                <button className="p-2.5 text-slate-400 hover:text-[#2eb8ff] transition-all rounded-xl bg-slate-50 group-hover/file:bg-blue-50/50">
                                                    {Icons.Download}
                                                </button>
                                            </Card>
                                        )}
                                        <div className={`
                                            px-6 py-4 rounded-[2.2rem] text-sm font-medium leading-relaxed shadow-sm transition-all
                                            ${isSent
                                                ? 'bg-[#2eb8ff] text-white rounded-br-md shadow-[#2eb8ff]/10 group-hover:shadow-lg'
                                                : 'bg-white text-slate-700 border border-slate-50 rounded-bl-md group-hover:shadow-md'
                                            }
                                        `}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-2 px-3 flex items-center gap-2">
                                            {msg.time}
                                            {isSent && (
                                                <div className="flex -space-x-1.5">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                    {isSent && (
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border-2 border-white shadow-sm mb-6 transition-transform group-hover:scale-105">
                                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </AnimatePresence>
                </div>

                {/* Integrated Chat Input Controls */}
                <div className="absolute bottom-6 left-0 right-0 px-6 shrink-0 z-40 bg-gradient-to-t from-white via-white/90 to-transparent pt-6">
                    <form
                        onSubmit={handleSendMessage}
                        className="max-w-4xl mx-auto flex items-center gap-4"
                    >
                        <button
                            type="button"
                            className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-[#2eb8ff] transition-all hover:scale-110 active:scale-95"
                        >
                            {Icons.Plus}
                        </button>

                        <div className="flex-1 bg-slate-50/80 backdrop-blur-sm rounded-[2.2rem] flex items-center px-6 py-4 border border-slate-100 focus-within:ring-4 focus-within:ring-[#2eb8ff]/5 focus-within:border-[#2eb8ff]/20 focus-within:bg-white transition-all shadow-sm">
                            <input
                                autoFocus
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-800 placeholder:text-slate-300"
                            />
                            <button type="button" className="p-1.5 text-slate-300 hover:text-[#2eb8ff] transition-colors">
                                {Icons.Emoji}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={!messageInput.trim()}
                            className={`
                                w-14 h-14 rounded-[1.4rem] flex items-center justify-center transition-all shadow-xl active:scale-90
                                ${messageInput.trim()
                                    ? 'bg-[#2eb8ff] text-white shadow-blue-500/30 hover:scale-105 hover:bg-[#25b0f5]'
                                    : 'bg-slate-100 text-slate-300 shadow-none cursor-not-allowed'}
                            `}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Messages;
