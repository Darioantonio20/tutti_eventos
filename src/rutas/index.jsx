import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../contenedor/App';
import Login from '../pages/Login';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/contenedor" element={<App />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
