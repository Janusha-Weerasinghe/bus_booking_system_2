const express = require('express');
const router = express.Router();
const BusController = require('../controllers/BusController');
const { authenticateToken, isAdmin, isOperator,isCommuter,checkRole } =require('../middlewares/authMiddleware');



// Get all buses
router.get('/buses',authenticateToken, checkRole(['Admin']), BusController.getAllBuses);

// Get bus by type
router.get('/buses/type/:type',authenticateToken, checkRole(['Admin'])  ,BusController.getBusByType);

// Get bus by route
router.get('/buses/route/:routeId', authenticateToken, checkRole(['Admin']), BusController.getBusByRoute);

// Get bus by organization
router.get('/buses/organization/:organizationId',authenticateToken, checkRole(['Admin']) , BusController.getBusByOrganization);

// Get bus by bus number
router.get('/buses/busnumber/:busNumber',authenticateToken, checkRole(['Admin'])  ,BusController.getBusByBusNumber);

// Add a new bus
router.post('/buses', authenticateToken, checkRole(['Admin']), BusController.addbus);

// Update a bus
router.put('/buses/:id',authenticateToken, checkRole(['Admin']), BusController.updatebus);

// Delete a bus
router.delete('/buses/:id', authenticateToken, checkRole(['Admin']), BusController.deleteBus);



// Route management
router.get('/busroutes/by-name',authenticateToken, checkRole(['Admin','Operator']) ,BusController.getBusRoutesByRouteName); // Fetch by routeName
router.get('/busroutes/by-location',authenticateToken, checkRole(['Admin','Operator']), BusController.getBusRoutesByLocation); // Fetch by startLocation or endLocation
router.post('/busroutes', authenticateToken, checkRole(['Admin','Operator']),BusController.addBusroute); // Add new bus route
router.put('/busroutes/:id',authenticateToken, checkRole(['Admin','Operator']), BusController.updateBusroute); // Update bus route by ID

 
// Schedule management
router.get('/schedules', authenticateToken, checkRole(['Admin','Operator']),BusController.getAllschedules);
router.post('/schedules', authenticateToken, checkRole(['Admin','Operator']),BusController.addSchedule);
router.put('/schedules/:id',authenticateToken, checkRole(['Admin','Operator']),BusController.updateSchedule);



// Add similar routes for routes, operators, and logs
module.exports = router;