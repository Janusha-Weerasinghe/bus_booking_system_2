const mongoose = require('mongoose');

// Schema for Bus
const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, maxlength: 20 },
  permitNo: { type: String, required: true, unique: true, maxlength: 50 },
  type: { type: String, enum: ['Luxury', 'Normal'], required: true },
  capacity: { type: Number, required: true },
  operatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // New fields
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true }, // Foreign key to Driver
  conductorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conductor', required: true }, // Foreign key to Conductor
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, // Foreign key to Organization
  seatPrice: { type: Number, required: true }, // Price for each seat
  phoneNumber: { type: String, maxlength: 15 }, // Phone number associated with the bus
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const bus = mongoose.model("bus", busSchema);
module.exports = bus;