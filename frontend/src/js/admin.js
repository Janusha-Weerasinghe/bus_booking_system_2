document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const busList = document.getElementById('bus-list');
    const routeList = document.getElementById('route-list');
    const operatorList = document.getElementById('operator-list');
    const logList = document.getElementById('log-list');
    const statsOverview = document.getElementById('stats-overview');
    const addBusButton = document.getElementById('add-bus-btn');

    // Utility function to fetch data and update DOM
    const fetchAndDisplay = async (url, element, processData) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            element.innerHTML = processData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            element.innerHTML = `<div class="error">Error loading data. Please try again later.</div>`;
        }
    };

    // Template generator for displaying lists
    const generateListTemplate = (items, key = 'name') => {
        return items.map(item => `<div>${item[key] || JSON.stringify(item)}</div>`).join('');
    };

    // Fetch and display statistics
    const displayStats = async () => {
        await fetchAndDisplay('/api/admin/stats', statsOverview, stats => `
            <div>Total Buses: ${stats.totalBuses}</div>
            <div>Total Routes: ${stats.totalRoutes}</div>
            <div>Total Operators: ${stats.totalOperators}</div>
        `);
    };

    // Fetch and display all buses
    const displayBuses = async () => {
        await fetchAndDisplay('/api/admin/buses', busList, buses => generateListTemplate(buses, 'name'));
    };

    // Fetch and display all routes
    const displayRoutes = async () => {
        await fetchAndDisplay('/api/admin/routes', routeList, routes => generateListTemplate(routes, 'routeName'));
    };

    // Fetch and display all operators
    const displayOperators = async () => {
        await fetchAndDisplay('/api/admin/operators', operatorList, operators => generateListTemplate(operators, 'operatorName'));
    };

    // Fetch and display logs
    const displayLogs = async () => {
        await fetchAndDisplay('/api/admin/logs', logList, logs => generateListTemplate(logs, 'logMessage'));
    };

    // Add a new bus (POST request)
    addBusButton.addEventListener('click', async () => {
        const busData = {
            name: 'New Bus',
            capacity: 50, // Example data, should be taken from user input
            routeId: '123456', // Replace with actual route ID
        };

        try {
            const response = await fetch('/api/admin/buses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(busData),
            });

            if (!response.ok) {
                throw new Error(`Failed to add bus: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('New Bus Added:', result);
            displayBuses(); // Refresh bus list
        } catch (error) {
            console.error('Error adding bus:', error);
        }
    });

    // Initial data loading
    displayStats();
    displayBuses();
    displayRoutes();
    displayOperators();
    displayLogs();
});
