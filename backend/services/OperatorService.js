const database = require('../config/database');

exports.fetchSchedules = async () => {
    return database.query('SELECT * FROM schedules');
};

exports.addOrUpdateSchedule = async (scheduleData) => {
    const { busId, route, date, time } = scheduleData;
    return database.query(
        'INSERT INTO schedules (busId, route, date, time) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE route=?, date=?, time=?',
        [busId, route, date, time, route, date, time]
    );
};

exports.fetchReservations = async () => {
    return database.query('SELECT * FROM reservations');
};

exports.generateReport = async () => {
    const reservations = await database.query('SELECT * FROM reservations');
    let csv = 'Booking ID, Bus ID, Seats\n';
    reservations.forEach(r => {
        csv += `${r.bookingId}, ${r.busId}, ${r.seats}\n`;
    });
    return csv;
};
