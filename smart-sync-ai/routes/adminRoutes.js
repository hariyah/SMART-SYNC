const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const AppUsage = require('../models/AppUsage');
const User = require('../models/User');

// Get all logs (for Admin)
router.get('/logs', verifyToken, isAdmin, async (req, res) => {
    try {
        const logs = await AppUsage.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users (for Admin)
router.get('/users', verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete log (Admin only)
router.delete('/logs/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const log = await AppUsage.findByIdAndDelete(req.params.id);
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.status(200).json({ message: 'Log deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user (Admin only)
router.delete('/users/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all logs (for Admin)
router.get('/logs', verifyToken, isAdmin, async (req, res) => {
    try {
        const logs = await AppUsage.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;