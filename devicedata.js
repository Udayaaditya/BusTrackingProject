const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const DATA_FILE = 'data.json';

// Function to read JSON file
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (error) {
        return []; // Return empty array if file does not exist or is empty
    }
};

// Function to write JSON file
const writeData = (newData) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
};

// Endpoint to receive GPS data from ESP8266
app.post('/update', (req, res) => {
    const { vehicle_id, date, time, latitude, longitude } = req.body;

    // Read existing data
    let gpsData = readData();

    // Add new GPS data
    gpsData.push({ vehicle_id, date, time, latitude, longitude });

    // Save updated data to JSON file
    writeData(gpsData);

    res.status(200).send('Data received and stored successfully');
});

// Endpoint to serve JSON data for Python script
app.get('/data', (req, res) => {
    res.json(readData());
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
