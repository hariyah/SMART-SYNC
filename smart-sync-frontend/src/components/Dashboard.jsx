import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [productiveHours] = useState(5); // Replace with real user data
    const [distractionHours] = useState(2); // Replace with real user data
    const [taskCompletionRate] = useState(85); // Replace with real user data
    const [appUsagePercentage] = useState(70); // Replace with real user data
    const [recommendation, setRecommendation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchInsights = useCallback(async () => {
        const data = {
            productive_hours: productiveHours,
            distraction_hours: distractionHours,
            task_completion_rate: taskCompletionRate,
            app_usage_percentage: appUsagePercentage
        };

        setLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:4001/api/insights", data);
            setRecommendation(response.data.recommendation || "No recommendation available");
        } catch (error) {
            console.error("Error fetching AI insights:", error);
            setError("Failed to fetch insights. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [productiveHours, distractionHours, taskCompletionRate, appUsagePercentage]);

    useEffect(() => {
        fetchInsights();
    }, [fetchInsights]);

    return (
        <div className="container mt-4">
            <h1 className="text-center text-primary">AI Productivity Insights</h1>
            <div className="card p-3 shadow-sm">
                <h3 style={{ textAlign: "center" }}>AI Recommendation</h3>
                {error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <p>
                        {loading
                            ? "Loading..."
                            : recommendation
                            ? recommendation
                            : !error && "Click the button to get insights"}
                    </p>
                )}
                <button className="btn btn-primary" onClick={fetchInsights} disabled={loading}>
                    {loading ? "Fetching..." : "Get AI Insights"}
                </button>
            </div>

            <div className="row mt-3">
                {/* Productivity Score */}
                <div className="col-md-6">
                    <div className="card p-3 shadow-sm">
                        <h3>Productivity Score</h3>
                        <p className="display-4 text-success">{taskCompletionRate}%</p>
                    </div>
                </div>

                {/* Peak Productivity Hours */}
                <div className="col-md-6">
                    <div className="card p-3 shadow-sm">
                        <h3>Peak Productivity Hours</h3>
                        <p className="display-6">10 AM - 12 PM</p>
                    </div>
                </div>

                {/* App Usage Breakdown */}
                <div className="col-md-12 mt-3">
                    <div className="card p-3 shadow-sm">
                        <h3>App Usage Breakdown</h3>
                        <p>Time spent on different applications</p>
                        {/* Placeholder for chart */}
                        <div className="chart-placeholder" style={{ height: "200px", background: "#f0f0f0" }}>
                            <p className="text-center text-muted">Chart will be displayed here</p>
                        </div>
                    </div>
                </div>

                {/* AI Recommendations */}
                <div className="col-md-12 mt-3">
                    <div className="card p-3 shadow-sm">
                        <h3>AI Recommendations</h3>
                        <ul>
                            <li>You're most productive between 10 AM - 12 PM.</li>
                            <li>Try taking a 5-minute break after 90 minutes of focus.</li>
                            <li>Reduce time on social media for better efficiency.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
