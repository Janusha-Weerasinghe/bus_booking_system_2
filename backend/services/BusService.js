const bus = require('../models/bus');
const newbus = require('../models/bus');
const newBusRoute=require('../models/busroute');
const busroute = require('../models/busroute');
const schedule = require('../models/Schedule');
const newSchedule=require('../models/Schedule');


// Get all buses
exports.getAllBuses = async () => {
    return await bus.find();
};

// Get buses by type
exports.getBusByType = async (type) => {
    return await bus.find({ type: type });
};

// Get buses by route
exports.getBusByRoute = async (routeId) => {
    return await bus.find({ routeId: routeId });
};

// Get buses by organization
exports.getBusByOrganization = async (organizationId) => {
    return await bus.find({ organizationId: organizationId });
};

// Get bus by bus number
exports.getBusByBusNumber = async (busNumber) => {
    return await bus.findOne({ busNumber: busNumber });
};

// Add a new bus
exports.addbus = async (busData) => {
    const newBus = new bus(busData);
    return await newBus.save();
};

// Update a bus
exports.updatebus = async (busId, busData) => {
    return await bus.findByIdAndUpdate(busId, busData, { new: true });
};

// Delete a bus
exports.deleteBus = async (busId) => {
    return await bus.findByIdAndDelete(busId);
};

// Update a bus route
exports.updateBusRoute = async (routeId, routeData) => {
    return await busroute.findByIdAndUpdate(routeId, routeData, { new: true });
};


// Delete a bus
exports.deletebus = async (busId) => {
    return await bus.findByIdAndDelete(busId);
};



// Get bus routes by routeName
exports.getBusRoutesByRouteName = async (routeName) => {
    return await busroute.find({ routeName: { $regex: routeName, $options: 'i' } });
};

// Get bus routes by startLocation or endLocation
exports.getBusRoutesByLocation = async (startLocation, endLocation) => {
    return await busroute.find({
        $or: [
            { startLocation: { $regex: startLocation, $options: 'i' } },
            { endLocation: { $regex: endLocation, $options: 'i' } }
        ]
    });
};

// Add a new bus route
exports.addBusroute = async (routeData) => {
    const newBusRoute = new busroute(routeData);
    return await newBusRoute.save();
};

// Update a bus route by ID
exports.updateBusroute = async (busId, busData) => {
    return await busroute.findByIdAndUpdate(busId, busData, { new: true });
};




//Manage Shedules
exports.getAllschedules = async () => {
    return await schedule.find();
};

// Add a new schedule
exports.addSchedule = async (scheduleData) => {
    const schedule = new newSchedule(scheduleData);
    return await schedule.save();
};

// Update a schedule
exports.updateSchedule = async (scheduleId, scheduleData) => {
    return await schedule.findByIdAndUpdate(scheduleId, scheduleData, { new: true });
};
