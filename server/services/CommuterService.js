const Route = require('../models/busroute');
const Booking = require('../models/Booking');

exports.getAllRoutes = async () => {
    return await Route.find();
};

exports.bookTicket = async (bookingData) => {
    const booking = new Booking(bookingData);
    return await booking.save();
};

exports.getBookings = async (userId) => {
    return await Booking.find({ userId });
};
