const CommuterService = require('../services/CommuterService');
const route = require ('../models/busroute')

// exports.getRoutes = async (req, res, next) => {
//     try {
//         const routes = await CommuterService.getRoutes();
//         res.status(200).json({ success: true, data: routes });
//     } catch (error) {
//         next(error);
//     }
// };

exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await CommuterService.getAllRoutes();
        if (!routes || routes.length === 0) {
            return res.status(404).json({ success: false, message: "No routes found" });
        }
        res.status(200).json({ success: true, data: routes});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};


exports.bookTicket = async (req, res, next) => {
    try {
        const booking = await CommuterService.bookTicket(req.body);
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        next(error);
    }
};

exports.getBookings = async (req, res, next) => {
    try {
        const bookings = await CommuterService.getBookings(req.user.id);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        next(error);
    }
};
