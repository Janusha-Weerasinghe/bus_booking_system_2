document.addEventListener('DOMContentLoaded', () => {
    const scheduleForm = document.getElementById('schedule-form');
    const scheduleList = document.getElementById('schedule-list');
    const reservationList = document.getElementById('reservation-list');
    const exportReportsBtn = document.getElementById('export-reports-btn');

    // Fetch and display schedules
    function fetchSchedules() {
        fetch('/api/operator/schedules')
            .then(res => res.json())
            .then(data => {
                scheduleList.innerHTML = '';
                data.forEach(schedule => {
                    const li = document.createElement('li');
                    li.textContent = `Bus ID: ${schedule.busId}, Route: ${schedule.route}, Date: ${schedule.date}, Time: ${schedule.time}`;
                    scheduleList.appendChild(li);
                });
            });
    }

    // Fetch and display reservations
    function fetchReservations() {
        fetch('/api/operator/reservations')
            .then(res => res.json())
            .then(data => {
                reservationList.innerHTML = '';
                data.forEach(reservation => {
                    const li = document.createElement('li');
                    li.textContent = `Booking ID: ${reservation.bookingId}, Bus ID: ${reservation.busId}, Seats: ${reservation.seats}`;
                    reservationList.appendChild(li);
                });
            });
    }

    // Handle schedule updates
    scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const busId = document.getElementById('bus-id').value;
        const route = document.getElementById('route').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        fetch('/api/operator/schedules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ busId, route, date, time })
        }).then(res => {
            if (res.ok) {
                alert('Schedule updated successfully!');
                fetchSchedules();
                scheduleForm.reset();
            }
        });
    });

    // Export reports
    exportReportsBtn.addEventListener('click', () => {
        fetch('/api/operator/reports')
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'reports.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
    });

    // Initial data fetch
    fetchSchedules();
    fetchReservations();
});
