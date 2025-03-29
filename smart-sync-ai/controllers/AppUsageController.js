const AppUsage = require('../models/AppUsage');

// Log Application Usage
exports.logAppUsage = async (req, res) => {
    try {
        const { userId, appName, duration } = req.body;

        const newLog = new AppUsage({ userId, appName, duration });
        await newLog.save();

        res.status(201).json({ message: 'Application usage logged successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Application Usage Logs
exports.getAppUsageLogs = async (req, res) => {
    try {
        const { userId, date } = req.query;

        const query = { userId };
        if (date) query.date = { $gte: new Date(date), $lte: new Date(date).setHours(23, 59, 59, 999) };

        const logs = await AppUsage.find(query);
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Data Integrity Checks & Validations
exports.logAppUsage = async (req, res) => {
    try {
        const { userId, appName, duration } = req.body;

        if (!appName || !duration) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (duration <= 0) {
            return res.status(400).json({ message: 'Duration must be positive' });
        }

        const newLog = new AppUsage({ userId: req.userId, appName, duration });
        await newLog.save();

        res.status(201).json({ message: 'Application usage logged successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
