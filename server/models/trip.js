const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'busroute', required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  conductorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conductor', required: true },
  startLocation: { type: String, required: true, maxlength: 100 },
  endLocation: { type: String, required: true, maxlength: 100 },
  date: { type: Date, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trip', tripSchema);
