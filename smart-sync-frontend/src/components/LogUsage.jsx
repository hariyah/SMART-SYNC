import React, { useState } from 'react';
import axios from 'axios';

const LogUsage = () => {
    const [appName, setAppName] = useState('');
    const [duration, setDuration] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/appUsage/log', { appName, duration });
            setMessage(response.data.message);
            setAppName('');
            setDuration('');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 mx-auto" style={{ maxWidth: '1000px' }}>
                <h3 className="text-center mb-3">Log Application Usage</h3>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Application Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={appName}
                            onChange={e => setAppName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Duration (in minutes)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Log Usage</button>
                </form>
            </div>
        </div>
    );
};

export default LogUsage;
