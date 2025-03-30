import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogUsage from './components/LogUsage';
import ViewLogs from './components/ViewLogs';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Reports from './components/Reports';
import Login from './components/Login';
import Reg from './components/Register';
import axios from 'axios';

// Axios Interceptor
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);

    const handleSetToken = (newToken, newRole) => {
        setToken(newToken);
        setRole(newRole);
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
    };

    const handleLogout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 px-4">
                    <NavLink className="navbar-brand" to="/">SMART SYNC</NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            {token && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/">Log Usage</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/view-logs">View Logs</NavLink>
                                    </li>
                                    {role === 'Admin' && (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/admin">Admin Panel</NavLink>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/reports">Reports</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-danger ml-3" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            )}
                            {!token && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/reg">Register</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={ token ?<LogUsage/> : <Navigate to="/login" />} />
                    <Route path="/view-logs" element={token ? <ViewLogs /> : <Navigate to="/login" />} />
                    <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/reports" element={token ? <Reports /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login setToken={handleSetToken} />} />
                    <Route path="/reg" element={<Reg />} />
                    {role === 'Admin' && <Route path="/admin" element={<AdminPanel />} />}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
