const express = require('express');
const router = express.Router();
const validate = require('validate.js');
const { getReports, addReport } = require('../controllers/report');

router.route('/get').get(getReports);
router.route('/post').post(addReport);

module.exports = router;