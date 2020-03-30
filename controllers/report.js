const Report = require('../models/Report');

exports.getReports = async (req, res, next) => {
    try {
        const reports = await Report.find();

        return res.status(200).json({
            success: true,
            count: reports.length,
            data: reports
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.addReport = async (req, res, next) => {
    try {
        const report = await Report.create(req.body);
        return res.status(201).json({
            success: true,
            data: report
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};



