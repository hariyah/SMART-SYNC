// src/components/Reports.js

import React, { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Reports = () => {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/logs', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setLogs(response.data);
            } catch (error) {
                console.error('Error fetching logs:', error);
                setError("Failed to fetch logs. Please try again later.");
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Reports</h2>
            {error && <p className="text-danger">{error}</p>}
            {logs.length === 0 && !error ? (
                <p>No logs available to generate reports.</p>
            ) : (
                <div>
                    <h4>Charts will be displayed here</h4>
                    {/* Example Pie Chart */}
                    <Pie
                        data={{
                            labels: ["Example 1", "Example 2"],
                            datasets: [
                                {
                                    label: "Example Data",
                                    data: [10, 20],
                                    backgroundColor: ["#FF6384", "#36A2EB"],
                                },
                            ],
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Reports;
