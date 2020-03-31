const express = require('express');
const router = express.Router();
const { getReports, addReport } = require('../controllers/report');

//get marked coordinates
router.route('/').get(getReports);

//file a report to specific coordinate
router.route('/').post(addReport);

module.exports = router;