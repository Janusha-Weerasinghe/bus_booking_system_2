document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const bookingList = document.getElementById('booking-list');
    const routeSelect = document.getElementById('route');

    // Fetch routes from API
    async function fetchRoutes() {
        try {
            const response = await fetch('/api/commuter/routes');
            const routes = await response.json();
            routes.data.forEach(route => {
                const option = document.createElement('option');
                option.value = route.id;
                option.textContent = `${route.start} - ${route.end}`;
                routeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    }

    // Submit booking form
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const route = routeSelect.value;
        const date = document.getElementById('date').value;

        try {
            const response = await fetch('/api/commuter/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ route, date })
            });

            const result = await response.json();
            if (result.success) {
                const booking = document.createElement('div');
                booking.textContent = `Booking confirmed: Route ${route}, Date ${date}`;
                bookingList.appendChild(booking);
            } else {
                alert('Failed to book ticket.');
            }
        } catch (error) {
            console.error('Error booking ticket:', error);
        }
    });

    // Load routes on page load
    fetchRoutes();
});
