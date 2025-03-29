const mongoose = require("mongoose");

const ProductivitySchema = new mongoose.Schema({
    productive_hours: {
        type: Number,
        required: [true, "Productive hours are required."],
        min: [0, "Productive hours must be a non-negative number."]
    },
    distraction_hours: {
        type: Number,
        required: [true, "Distraction hours are required."],
        min: [0, "Distraction hours must be a non-negative number."]
    },
    task_completion_rate: {
        type: Number,
        required: [true, "Task completion rate is required."],
        min: [0, "Task completion rate must be a non-negative number."],
        max: [100, "Task completion rate cannot exceed 100%."]
    },
    app_usage_percentage: {
        type: Number,
        required: [true, "App usage percentage is required."],
        min: [0, "App usage percentage must be a non-negative number."],
        max: [100, "App usage percentage cannot exceed 100%."]
    },
    recommendation: {
        type: String,
        required: [true, "Recommendation is required."],
        max_length: [500, "Recommendation cannot exceed 500 characters."]
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Productivity = mongoose.model("Productivity", ProductivitySchema);

module.exports = Productivity;
