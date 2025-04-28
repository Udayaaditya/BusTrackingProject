const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Function to generate the file name based on the current date
const getFileName = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    return `${year}-${month}-${day}.json`; // Format: YYYY-MM-DD.json
};

// Function to read JSON data from the daily file
const readData = () => {
    const fileName = getFileName();
    try {
        if (!fs.existsSync(fileName)) return []; // If the file doesn't exist, return an empty array
        const data = fs.readFileSync(fileName, 'utf8');
        return data ? JSON.parse(data) : []; // Parse JSON or return an empty array
    } catch (error) {
        console.error("Error reading data:", error);
        return [];
    }
};

// Function to write JSON data to the daily file
const writeData = (newData) => {
    const fileName = getFileName();
    try {
        fs.writeFileSync(fileName, JSON.stringify(newData, null, 2)); // Format with indentation
    } catch (error) {
        console.error("Error writing data:", error);
    }
};

// Endpoint to receive GPS data from ESP32
app.post('/update', (req, res) => {
    const { vehicle_id, date, time, latitude, longitude } = req.body;

    if (!vehicle_id || !date || !time || !latitude || !longitude) {
        return res.status(400).send("Invalid data format");
    }

    let gpsData = readData();
    gpsData.push({ vehicle_id, date, time, latitude, longitude });

    writeData(gpsData);
    res.status(200).send('Data received and stored successfully');
});

// Endpoint to serve stored GPS data
app.get('/data', (req, res) => {
    res.json(readData());
});

// Serve an HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
