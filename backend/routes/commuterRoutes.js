const express = require('express');
const router = express.Router();
const CommuterController = require('../controllers/CommuterController');

// Routes for commuters
//router.get('/routes', CommuterController.getAllRoutes);
router.get('/', CommuterController.getAllRoutes);
router.post('/bookings', CommuterController.bookTicket);
router.get('/bookings', CommuterController.getBookings);

module.exports = router;
