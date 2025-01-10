const mongoose = require('mongoose');

// Schema for Conductor
const conductorSchema = new mongoose.Schema({
  registeredId: { type: String, required: true, unique: true, maxlength: 50 }, // Conductor registration ID
  fullName: { type: String, required: true, maxlength: 100 },
  contactNumber: { type: String, required: true, maxlength: 15 },
  organizationRegisteredId: { type: String, ref: 'Organization', required: true }, // Foreign key to Organization table
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

  module.exports = mongoose.model('Conductor', conductorSchema);