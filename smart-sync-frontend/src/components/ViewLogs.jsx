import React, { useState } from 'react';
import axios from 'axios';

const ViewLogs = () => {
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState('');
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');

    const fetchLogs = async () => {
        console.log('fetchLogs called'); // Debugging log
        if (!userId.trim() || !date.trim()) {
            setError('Both User ID and Date are required.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5000/api/appUsage/logs', {
                params: { userId, date }
            });
            setLogs(response.data);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred while fetching logs.');
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#f8f9fa' }}
        >
            <div className="card p-4">
                <h3 className="text-center mb-3">View Logs</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label className="form-label">User ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary w-100 mb-3" onClick={fetchLogs}>
                    View Logs
                </button>
                {logs.length > 0 && (
                    <table className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>Application</th>
                                <th>Duration (Minutes)</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, index) => (
                                <tr key={index}>
                                    <td>{log.appName}</td>
                                    <td>{log.duration}</td>
                                    <td>{new Date(log.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ViewLogs;
