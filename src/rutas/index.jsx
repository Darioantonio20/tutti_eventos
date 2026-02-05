import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CreateEvent from '../pages/CreateEvent';
import Messages from '../pages/Messages';
import Dashboard from '../pages/Dashboard';
import MyEvents from '../pages/MyEvents';
import EventDetail from '../pages/EventDetail';
import UserProfile from '../pages/UserProfile';
import ProviderRegistration from '../pages/ProviderRegistration';
import ProviderDashboard from '../pages/ProviderDashboard';
import ProviderPersonal from '../pages/ProviderPersonal';
import ProviderEquipo from '../pages/ProviderEquipo';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/crear-evento" element={<CreateEvent />} />
                <Route path="/mensajes" element={<Messages />} />
                <Route path="/mis-eventos" element={<MyEvents />} />
                <Route path="/evento/:id" element={<EventDetail />} />
                <Route path="/perfil" element={<UserProfile />} />
                <Route path="/registro-proveedor" element={<ProviderRegistration />} />
                <Route path="/proveedor/dashboard" element={<ProviderDashboard />} />
                <Route path="/proveedor/personal" element={<ProviderPersonal />} />
                <Route path="/proveedor/equipo" element={<ProviderEquipo />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
