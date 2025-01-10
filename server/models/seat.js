const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatId: { type: String, required: true, unique: true }, // Format: YYYYMMDD_TripID_SeatNumber
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  seatNumber: { type: String, required: true, maxlength: 10 },
  userNIC: { type: String, maxlength: 20 }, // NIC of the user
  phoneNumber: { type: String, maxlength: 15 }, // Phone number of the user
  status: { type: String, enum: ['Available', 'Booked'], default: 'Available' }, // Seat status
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Seat', seatSchema);
