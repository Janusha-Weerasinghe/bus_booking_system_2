const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Busroute', required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    
});

module.exports = mongoose.model('Schedule', scheduleSchema);
