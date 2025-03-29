require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Productivity = require("./models/Productivity");
const connectDB = require("./config/db");
const appUsageRoutes = require("./routes/AppUsageRoutes");
const authRoutes = require("./routes/authRoutes");
const { verifyToken, isAdmin } = require("./middleware/authMiddleware");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Public Routes
app.use("/api/auth", authRoutes);

// Protected Routes
app.use("/api/appUsage", verifyToken, appUsageRoutes);

// Admin-only route (example)
app.get("/api/admin/logs", verifyToken, isAdmin, async (req, res) => {
    try {
        const logs = await Productivity.find(); // Replace `AppUsage` with the correct model if needed
        res.status(200).json(logs);
    } catch (error) {
        console.error("Error fetching admin logs:", error.message || error);
        res.status(500).json({ message: "Failed to fetch admin logs." });
    }
});

const PYTHON_AI_URL = "http://127.0.0.1:5000/predict"; // Python AI Server

// API to get AI insights and store data in MongoDB
app.post("/api/insights", async (req, res) => {
    const { productive_hours, distraction_hours, task_completion_rate, app_usage_percentage } = req.body;

    // Validate input fields
    if (
        productive_hours == null ||
        distraction_hours == null ||
        task_completion_rate == null ||
        app_usage_percentage == null
    ) {
        return res.status(400).json({
            error: "Missing required fields: 'productive_hours', 'distraction_hours', 'task_completion_rate', and 'app_usage_percentage' are required.",
        });
    }

    if (
        typeof productive_hours !== "number" ||
        typeof distraction_hours !== "number" ||
        typeof task_completion_rate !== "number" ||
        typeof app_usage_percentage !== "number"
    ) {
        return res.status(400).json({ error: "Invalid data types: All fields must be numbers." });
    }

    try {
        // Send data to Python AI server
        const response = await axios.post(PYTHON_AI_URL, req.body);
        const recommendation = response.data.recommendation;

        // Save to MongoDB
        const newEntry = new Productivity({ ...req.body, recommendation });
        await newEntry.save();

        res.json({ recommendation });
    } catch (error) {
        console.error("Error fetching AI insights:", error.message || error);
        res.status(500).json({ error: "Failed to get insights from the AI server." });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
