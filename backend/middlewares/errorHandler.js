const rateLimit = require('express-rate-limit');

module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
