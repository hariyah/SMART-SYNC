// src/components/AdminPanel.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Added import for Link

const AdminPanel = () => {
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch logs and users data
        const fetchData = async () => {
            try {
                const logsResponse = await axios.get('http://localhost:5000/api/admin/logs', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const usersResponse = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setLogs(logsResponse.data);
                setUsers(usersResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const deleteLog = async (logId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/logs/${logId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setLogs(logs.filter(log => log._id !== logId));
        } catch (error) {
            console.error("Error deleting log:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container">
            <nav>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/reports">View Reports</Link>
                    </li>
                </ul>
            </nav>
            <h2>Admin Panel</h2>
            <h3>Application Usage Logs</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Application</th>
                        <th>Duration (mins)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log._id}>
                            <td>{log.userId}</td>
                            <td>{log.appName}</td>
                            <td>{log.duration}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteLog(log._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Manage Users</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete User</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
