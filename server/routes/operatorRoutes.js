const express = require('express');
const router = express.Router();
const OperatorController = require('../controllers/OperatorController');

router.get('/schedules', OperatorController.getSchedules);
router.post('/schedules', OperatorController.addOrUpdateSchedule);
router.get('/reservations', OperatorController.getReservations);
router.get('/reports', OperatorController.exportReports);

module.exports = router;
