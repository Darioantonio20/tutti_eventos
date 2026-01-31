import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../contenedor/App';
import Login from '../pages/Login';
import CreateEvent from '../pages/CreateEvent';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/contenedor" element={<App />} />
                <Route path="/crear-evento" element={<CreateEvent />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
