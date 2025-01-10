const OperatorService = require('../services/OperatorService');

exports.getSchedules = async (req, res) => {
    try {
        const { status, date } = req.query; // Optional query parameters to filter by status or date
        let schedules = await OperatorService.fetchSchedules();

        // Filter schedules based on status or date if provided
        if (status) {
            schedules = schedules.filter(schedule => schedule.status === status);
        }
        if (date) {
            schedules = schedules.filter(schedule => schedule.date === date); // Assuming date is a string in the format 'YYYY-MM-DD'
        }

        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ error: 'Failed to fetch schedules' });
    }
};

exports.addOrUpdateSchedule = async (req, res) => {
    try {
        const scheduleData = req.body;
        await OperatorService.addOrUpdateSchedule(scheduleData);
        res.status(201).send('Schedule updated successfully.');
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).json({ error: 'Failed to update schedule' });
    }
};

exports.getReservations = async (req, res) => {
    try {
        const { status } = req.query; // Optional query parameter to filter by status
        let reservations = await OperatorService.fetchReservations();

        // Filter reservations by status if provided
        if (status) {
            reservations = reservations.filter(reservation => reservation.status === status);
        }

        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
};

exports.exportReports = async (req, res) => {
    try {
        const report = await OperatorService.generateReport();
        res.setHeader('Content-Disposition', 'attachment; filename="reports.csv"');
        res.setHeader('Content-Type', 'text/csv');  // Ensure proper content type for CSV
        res.send(report);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
};
