const mongoose = require('mongoose');

// Schema for Organization
const organizationSchema = new mongoose.Schema({
  registeredId: { type: String, required: true, unique: true, maxlength: 50 }, // Organization registration ID
  name: { type: String, required: true, maxlength: 100 },
  address: { type: String },
  contactNumber: { type: String, maxlength: 15 },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Organization', organizationSchema);