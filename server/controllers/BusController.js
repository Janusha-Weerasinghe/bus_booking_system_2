const BusService = require('../services/BusService');
const bus = require('../models/bus');
const busroute = require ('../models/busroute');
const schedule = require ('../models/schedule');
const express = require('express');
const { check, validationResult } = require('express-validator');



// Get all buses
exports.getAllBuses = async (req, res) => {
    try {
        const buses = await BusService.getAllBuses();
        if (!buses || buses.length === 0) {
            return res.status(404).json({ success: false, message: "No buses found" });
        }
        res.status(200).json({ success: true, data: buses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get bus by type
exports.getBusByType = async (req, res) => {
    try {
        const buses = await BusService.getBusByType(req.params.type);
        if (!buses || buses.length === 0) {
            return res.status(404).json({ success: false, message: `No buses found of type ${req.params.type}` });
        }
        res.status(200).json({ success: true, data: buses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get bus by route
exports.getBusByRoute = async (req, res) => {
    try {
        const buses = await BusService.getBusByRoute(req.params.routeId);
        if (!buses || buses.length === 0) {
            return res.status(404).json({ success: false, message: `No buses found for route ${req.params.routeId}` });
        }
        res.status(200).json({ success: true, data: buses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get bus by organization
exports.getBusByOrganization = async (req, res) => {
    try {
        const buses = await BusService.getBusByOrganization(req.params.organizationId);
        if (!buses || buses.length === 0) {
            return res.status(404).json({ success: false, message: `No buses found for organization ${req.params.organizationId}` });
        }
        res.status(200).json({ success: true, data: buses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get bus by bus number
exports.getBusByBusNumber = async (req, res) => {
    try {
        const bus = await BusService.getBusByBusNumber(req.params.busNumber);
        if (!bus) {
            return res.status(404).json({ success: false, message: `No bus found with number ${req.params.busNumber}` });
        }
        res.status(200).json({ success: true, data: bus });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Add a new bus
exports.addbus = async (req, res, next) => {
    try {
        const newBus = await BusService.addbus(req.body);
        res.status(201).json({
            success: true,
            data: {
                type: "bus",
                id: newBus._id.toString(),
                attributes: {
                    busNumber: newBus.busNumber,
                    permitNo: newBus.permitNo,
                    type: newBus.type,
                    capacity: newBus.capacity,
                    operatorId: newBus.operatorId.toString(),
                    driverId:newBus.driverId,
                    conducterId:newBus.conducterId,
                    createdAt: newBus.createdAt,
                    updatedAt: newBus.updatedAt
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update a bus
exports.updatebus = async (req, res, next) => {
    try {
        const updatedBus = await BusService.updatebus(req.params.id, req.body);
        if (!updatedBus) {
            return res.status(404).json({ success: false, message: "Bus not found" });
        }
        res.status(200).json({
            success: true,
            data: {
                type: "bus",
                id: updatedBus._id.toString(),
                attributes: {
                    busNumber: updatedBus.busNumber,
                    permitNo: updatedBus.permitNo,
                    type: updatedBus.type,
                    capacity: updatedBus.capacity,
                    operatorId: updatedBus.operatorId.toString(),
                    driverId:newBus.driverId,
                    conducterId:newBus.conducterId,
                    createdAt: updatedBus.createdAt,
                    updatedAt: updatedBus.updatedAt
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete a bus
exports.deleteBus = async (req, res, next) => {
    try {
        const busDeleted = await BusService.deleteBus(req.params.id);
        if (!busDeleted) {
            return res.status(404).json({ success: false, message: "Bus not found" });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};



// Get bus routes by routeName
exports.getBusRoutesByRouteName = async (req, res, next) => {
    const { routeName } = req.query;

    if (!routeName) {
        return res.status(400).json({ success: false, message: "Route name is required" });
    }

    try {
        const busRoutes = await BusService.getBusRoutesByRouteName(routeName);
        res.status(200).json({ success: true, data: busRoutes });
    } catch (error) {
        next(error);
    }
};

// Get bus routes by startLocation or endLocation
exports.getBusRoutesByLocation = async (req, res, next) => {
    const { startLocation, endLocation } = req.query;

    if (!startLocation && !endLocation) {
        return res.status(400).json({ success: false, message: "Either startLocation or endLocation is required" });
    }

    try {
        const busRoutes = await BusService.getBusRoutesByLocation(startLocation, endLocation);
        res.status(200).json({ success: true, data: busRoutes });
    } catch (error) {
        next(error);
    }
};

// Add a new bus route
exports.addBusroute = async (req, res, next) => {
    try {
        const newBusRoute = await BusService.addBusroute(req.body);

        // Transform MongoDB data to JSON:API compliant format
        const response = {
            success: true,
            data: {
                type: "busroute",
                id: newBusRoute._id.toString(), // Convert ObjectId to string
                attributes: {
                    routeName: newBusRoute.routeName,
                    startLocation: newBusRoute.startLocation,
                    endLocation: newBusRoute.endLocation,
                    distance: newBusRoute.distance,
                    createdAt: newBusRoute.createdAt
                }
            }
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

// Update an existing bus route
exports.updateBusroute = async (req, res, next) => {
    try {
        const updatedRoute = await BusService.updateBusroute(req.params.id, req.body);

        if (!updatedRoute) {
            return res.status(404).json({ success: false, message: "Bus route not found" });
        }

        res.status(200).json({
            success: true,
            data: {
                type: "busroute",
                id: updatedRoute._id.toString(),
                attributes: {
                    routeName: updatedRoute.routeName,
                    startLocation: updatedRoute.startLocation,
                    endLocation: updatedRoute.endLocation,
                    distance: updatedRoute.distance,
                    createdAt: updatedRoute.createdAt
                }
            }
        });
    } catch (error) {
        next(error);
    }
};







//Manage schedule
exports.getAllschedules = async (req, res) => {
    try {
        const schedules = await BusService.getAllschedules();
        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ success: false, message: "No shedules found" });
        }
        res.status(200).json({ success: true, data: schedules });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

exports.addSchedule = async (req, res, next) => {
    try {
        const newSchedule = await BusService.addSchedule(req.body);

        // Transform MongoDB data to JSON:API compliant format
        const response = {
            success: true,
            data: {
                type: "schedule",
                id: newSchedule._id.toString(), // Convert ObjectId to string
                attributes: {
                    bus: newSchedule.bus.toString(), // Convert ObjectId to string
                    route: newSchedule.route.toString(), // Convert ObjectId to string
                    departureTime: newSchedule.departureTime,
                    arrivalTime: newSchedule.arrivalTime
                }
            }
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};



exports.updateSchedule = async (req, res, next) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const scheduleId = req.params.id;

        // Check if the ID is valid
        if (!scheduleId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid schedule ID" });
        }

        const updatedSchedule = await schedule.findByIdAndUpdate(scheduleId, req.body, { new: true });

        if (!updatedSchedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }

        // Respond with JSON:API structure
        res.status(200).json({
            success: true,
            data: {
                type: "schedule",
                id: updatedSchedule._id.toString(),
                attributes: {
                    bus: updatedSchedule.bus,
                    route: updatedSchedule.route,
                    departureTime: updatedSchedule.departureTime,
                    arrivalTime: updatedSchedule.arrivalTime
                }
            }
        });
    } catch (error) {
        next(error);
    }
};
