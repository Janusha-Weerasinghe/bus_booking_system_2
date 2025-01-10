const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

// Statistics route
router.get('/stats', AdminController.getStatistics);


// Operator management
router.get('/operators', AdminController.getOperators);
router.put('/operators/:id/approve', AdminController.approveOperator);

// Logs
router.get('/logs', AdminController.getLogs);

//Role Management
router.get('/roles', AdminController.getAllRoles)


// Add similar routes for routes, operators, and logs
module.exports = router;
