const express = require('express');
const router = express.Router();
const { logAppUsage, getAppUsageLogs } = require('../controllers/AppUsageController');

router.post('/log', logAppUsage);
router.get('/logs', getAppUsageLogs);

module.exports = router;
