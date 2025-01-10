const bus = require('../models/bus');

const role = require ('../models/role');
//const Operator = require('../models/Operator');
//const Log = require('../models/Log');


// Fetch system statistics
exports.getStatistics = async () => {
    const totalBuses = await Bus.countDocuments();
    const totalRoutes = await Route.countDocuments();
    const totalOperators = await Operator.countDocuments();
    return { totalBuses, totalRoutes, totalOperators };
};



// Manage operators
exports.getOperators = async () => {
    return await Operator.find({ isApproved: false });
};

exports.approveOperator = async (operatorId) => {
    return await Operator.findByIdAndUpdate(operatorId, { isApproved: true }, { new: true });
};

// Fetch logs
exports.getLogs = async () => {
    return await Log.find();
};


// Fetch all buses
exports.getAllRoles = async () => {
    return await role.find();
};