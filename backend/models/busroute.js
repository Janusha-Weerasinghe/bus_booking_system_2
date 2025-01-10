const mongoose = require('mongoose');

const busrouteSchema = new mongoose.Schema({
  routeName: { type: String, required: true, maxlength: 100 },  // Add routeName field
  startLocation: { type: String, required: true, maxlength: 100 },
  endLocation: { type: String, required: true, maxlength: 100 },
  distance: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('busroute', busrouteSchema);
