import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CreateEvent from '../pages/CreateEvent';
import Messages from '../pages/Messages';
import Dashboard from '../pages/Dashboard';
import MyEvents from '../pages/MyEvents';
import EventDetail from '../pages/EventDetail';

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
            </Routes>
        </Router>
    );
};

export default AppRoutes;
