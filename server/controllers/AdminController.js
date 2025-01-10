const AdminService = require('../services/AdminService');
const bus = require('../models/bus')

const role = require ('../models/role')
const user = require ('../models/user')
const organization = require('../models/organization')





// Fetch system statistics
exports.getStatistics = async (req, res, next) => {
    try {
        const stats = await AdminService.getStatistics();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};



// Manage routes
// exports.getAllRoutes = async (req, res) => {
//     try {
//         const routes = await CommuterService.getAllRoutes();
//         if (!routes || routes.length === 0) {
//             return res.status(404).json({ success: false, message: "No routes found" });
//         }
//         res.status(200).json({ success: true, data: routes});
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
//     }
// };


// Manage operators
exports.getOperators = async (req, res, next) => {
    try {
        const operators = await AdminService.getOperators();
        res.status(200).json({ success: true, data: operators });
    } catch (error) {
        next(error);
    }
};

exports.approveOperator = async (req, res, next) => {
    try {
        const approvedOperator = await AdminService.approveOperator(req.params.id);
        res.status(200).json({ success: true, data: approvedOperator });
    } catch (error) {
        next(error);
    }
};

// Fetch logs
exports.getLogs = async (req, res, next) => {
    try {
        const logs = await AdminService.getLogs();
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        next(error);
    }
};

// Get all buses
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await AdminService.getAllRoles();
        if (!roles || roles.length === 0) {
            return res.status(404).json({ success: false, message: "No roles found" });
        }
        res.status(200).json({ success: true, data: roles });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

