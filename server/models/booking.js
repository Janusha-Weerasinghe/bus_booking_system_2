const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  seatId: { type: String, ref: 'Seat', required: true },
  bookingDate: { type: Date, default: Date.now },
  bookingStatus: { type: String, enum: ['Confirmed', 'Cancelled'], required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
