const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  NICnumber: { 
    type: String, 
    required: [true, 'NIC number is required!'], 
    unique: true, 
    index: true  // Adding index to ensure it's optimized for lookups
  },
  fullName: { type: String, required: true },
  email: { 
    type: String, 
    required: [true, 'Email is required!'], 
    trim: true, 
    unique: true, 
    lowercase: true 
  },
  password: { type: String, required: [true,'Password is required!'] },
  roleID: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  contactNumber: { type: String },
  organizationRegisteredId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: function () { return this.roleID === 'operator'; } },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String, select: false },
  verificationCodeValidation: { type: Number, select: false },
  forgotPasswordCode: { type: String, select: false },
  forgotPasswordCodeValidation: { type: Number, select: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
