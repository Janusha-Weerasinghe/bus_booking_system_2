const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true, maxlength: 50 },
  paymentDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Successful', 'Failed'], required: true }
});

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;