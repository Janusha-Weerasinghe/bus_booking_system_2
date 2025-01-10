
const rateLimit = require('express-rate-limit');

// Rate limiter for signup
exports.signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many accounts created from this IP, please try again later."
});

// Rate limiter for signin
exports.signinLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Limit each IP to 5 login attempts
    message: "Too many login attempts from this IP, please try again later."
});
