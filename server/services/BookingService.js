const booking = require('../models/booking');
const newBooking= require('../models/booking');
const newseat = require ('../models/seat');
const payment = require('../models/payment');
const seat = require('../models/seat');
const trip = require('../models/trip');


// Manage bookings
exports.getAllbookings = async () => {
    return await booking.find();
};
// exports.getAllbookings = async () => {
//     try {
//         const bookings = await booking.find();
//         console.log('Bookings:', bookings); // Debug log
//         return bookings;
//     } catch (error) {
//         console.error('Error fetching bookings:', error);
//         throw error; // Let the controller handle it
//     }
// };


// // Get all bookings
// exports.getAllBookings = async () => {
//     return await booking.find()
//         .populate('userId', 'name email')  // Populate user info if needed
//         .populate('tripId', 'routeId busId departureTime')  // Populate trip details if needed
//         .populate('seatId', 'seatNumber');  // Populate seat details if needed
// };

// Add a new booking
exports.addBooking = async (bookingData) => {
    const newBooking = new booking(bookingData);
    return await newBooking.save();
};

// Update a booking
exports.updateBooking = async (bookingId, updatedData) => {
    return await booking.findByIdAndUpdate(bookingId, updatedData, { new: true });
};

// Delete a booking
exports.deleteBooking = async (bookingId) => {
    return await booking.findByIdAndDelete(bookingId);};


// Manage payments
exports.getAllpayments = async () => {
    return await payment.find();
};

// Get all seats
exports.getAllSeats = async () => {
    return await seat.find()
        .populate('busId', 'busNumber')  // Optional: Populate bus details if needed
        .populate('tripId', 'routeId departureTime');  // Optional: Populate trip details if needed
};

// Add a new seat
exports.addSeat = async (seatData) => {
    const newSeat = new Seat(seatData);
    return await newseat.save();
};

// Update a seat
exports.updateSeat = async (seatId, updatedData) => {
    return await seat.findByIdAndUpdate(seatId, updatedData, { new: true });
};

// Delete a seat
exports.deleteSeat = async (seatId) => {
    return await seat.findByIdAndDelete(seatId);
};
// Manage trips
exports.getAlltrips = async () => {
    return await trip.find();
};

// Get filtered trips from the database
exports.getFilteredTrips = async (filter) => {
    return await trip.find({
        date: filter.date,
        busType: filter.busType,
        startLocation: filter.startLocation,
        endLocation: filter.endLocation
    });
};



// Add a new trip
exports.addTrip = async (tripData) => {
    const trip = new trip(tripData);
    return await trip.save();
};


// Update a trip
exports.updateTrip = async (tripId, updatedData) => {
    return await trip.findByIdAndUpdate(tripId, updatedData, { new: true });
};


// Delete a trip
exports.deleteTrip = async (tripId) => {
    return await trip.findByIdAndDelete(tripId);
};
