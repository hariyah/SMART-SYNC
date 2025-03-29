const mongoose = require('mongoose');

const AppUsageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    appName: { type: String, required: true },
    duration: { type: Number, required: true }, // In minutes
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AppUsage', AppUsageSchema);

