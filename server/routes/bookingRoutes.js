const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const { authenticateToken, isAdmin, isOperator,isCommuter,checkRole } = require('../middlewares/authMiddleware'); // Adjust path as needed


// Booking routes
router.get('/bookings',authenticateToken, checkRole(['Admin','Operator','Commuter']), BookingController.getAllBookings); // Get all bookings
router.post('/bookings',authenticateToken, checkRole(['Admin','Operator','Commuter']), BookingController.addBooking); // Add a new booking
router.put('/bookings/:id',authenticateToken, checkRole(['Admin','Operator','Commuter']), BookingController.updateBooking); // Update a booking
router.delete('/bookings/:id',authenticateToken, checkRole(['Admin','Operator','Commuter']), BookingController.deleteBooking); // Delete a booking

// Payment routes
router.get('/payments',authenticateToken, checkRole(['Admin','Operator','Commuter']), BookingController.getAllpayments);

// Seats routes

router.get('/seats',authenticateToken, checkRole(['Admin','Operator']),BookingController.getAllSeats);
router.post('/seats', authenticateToken, checkRole(['Admin','Operator']),BookingController.addSeat);
router.put('/seats/:id', authenticateToken, checkRole(['Admin','Operator']),BookingController.updateSeat);
router.delete('/seats/:id',authenticateToken, checkRole(['Admin','Operator']), BookingController.deleteSeat);


//  Trips routes
router.get('/trips', authenticateToken, checkRole(['Admin','Operator','Commuter']),BookingController.getAlltrips);
router.get('/trips',  checkRole(['Admin','Operator','Commuter']),BookingController.getFilteredTrips);
router.post('/trips', authenticateToken, checkRole(['Admin','Operator']),BookingController.addTrip); // Add a new trip
router.put('/trips/:id', authenticateToken, checkRole(['Admin','Operator']),BookingController.updateTrip); // Update a trip
router.delete('/trips/:id',authenticateToken, checkRole(['Admin','Operator']), BookingController.deleteTrip); // Delete a trip






module.exports = router;