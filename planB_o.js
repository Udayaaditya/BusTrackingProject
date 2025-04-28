//const http = require('http');
//const fs = require('fs');  // File System module to read the JSON file
//
//// Handle uncaught exceptions globally
//process.on('uncaughtException', (err) => {
//    console.error('Uncaught Exception:', err);
//    // Optionally, you can exit the process after logging the error
//    // process.exit(1);
//});
//
//// Create an HTTP server
//const server = http.createServer((req, res) => {
//    // Set the response HTTP header with content type as JSON
//    res.writeHead(200, { 'Content-Type': 'application/json' });
//
//    // Read the data from the data.json file
//    fs.readFile('data.json', 'utf8', (err, data) => {
//        if (err) {
//            // Log the full error message for debugging purposes
//            console.error('Error reading the JSON file:', err);
//
//            // If there is an error, send it in the response
//            res.statusCode = 500;
//            res.end(JSON.stringify({ error: 'Error reading the JSON file', details: err.message }));
//        } else {
//            try {
//                // Parse the JSON data and send it in the response
//                const jsonData = JSON.parse(data);
//                res.end(JSON.stringify(jsonData));
//            } catch (parseErr) {
//                // Handle error if JSON parsing fails
//                console.error('Error parsing JSON data:', parseErr);
//                res.statusCode = 500;
//                res.end(JSON.stringify({ error: 'Error parsing JSON data', details: parseErr.message }));
//            }
//        }
//    });
//});
//
//// Server listens on port 3000 and logs a message when running
//server.listen(3000, () => {
//    console.log('Server running at http://localhost:3000/');
//});
//
//
//
//
////
////
////const express = require('express');
////const fs = require('fs');
////const bodyParser = require('body-parser');
////const path = require('path');
////
////const app = express();
////app.use(bodyParser.json());
////app.use(express.static('public')); // Serve static files from 'public' folder
////
////// Directory to save the data files
////const DATA_DIRECTORY = path.join(__dirname, 'dates_and_data');
////
////// Ensure the directory exists
////if (!fs.existsSync(DATA_DIRECTORY)) {
////    fs.mkdirSync(DATA_DIRECTORY);
////}
////
////// Function to generate the file name based on the current date
////const getFileName = () => {
////    const date = new Date();
////    const year = date.getFullYear();
////    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits
////    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
////    return path.join(DATA_DIRECTORY, `${year}-${month}-${day}.json`); // Format: YYYY-MM-DD.json
////};
////
////// Function to read JSON data from the daily file
////const readData = () => {
////    const fileName = getFileName();
////    try {
////        if (!fs.existsSync(fileName)) return []; // If the file doesn't exist, return an empty array
////        const data = fs.readFileSync(fileName, 'utf8');
////        return data ? JSON.parse(data) : []; // Parse JSON or return an empty array
////    } catch (error) {
////        console.error("Error reading data:", error);
////        return [];
////    }
////};
////
////// Function to write JSON data to the daily file
////const writeData = (newData) => {
////    const fileName = getFileName();
////    try {
////        fs.writeFileSync(fileName, JSON.stringify(newData, null, 2)); // Format with indentation
////    } catch (error) {
////        console.error("Error writing data:", error);
////    }
////};
////
////// Endpoint to receive GPS data from ESP32
////app.post('/update', (req, res) => {
////    const { vehicle_id, date, time, latitude, longitude } = req.body;
////
////    if (!vehicle_id || !date || !time || !latitude || !longitude) {
////        return res.status(400).send("Invalid data format");
////    }
////
////    let gpsData = readData();
////    gpsData.push({ vehicle_id, date, time, latitude, longitude });
////
////    writeData(gpsData);
////    res.status(200).send('Data received and stored successfully');
////});
////
////// Endpoint to serve stored GPS data
////app.get('/data', (req, res) => {
////    res.json(readData());
////});
////
////// Serve an HTML page
////app.get('/', (req, res) => {
////    res.sendFile(path.join(__dirname, 'public', 'index.html'));
////});
////
////// Start the server
////const PORT = 4100;
////app.listen(PORT, () => {
////    console.log(`Server running at http://localhost:${PORT}`);
////});






// Import required modules
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

// Create an Express app
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// Serve the data from 'data.json' as JSON
app.get('/', (req, res) => {
    // Set the response content type to application/json
    res.header('Content-Type', 'application/json');

    // Define the path to the data.json file
    const dataFilePath = path.join(__dirname, 'data.json');

    // Read the 'data.json' file
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            // Handle errors reading the file
            console.error('Error reading the JSON file:', err);
            res.status(500).json({
                error: 'Error reading the JSON file',
                details: err.message
            });
        } else {
            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);
                // Send the JSON data as the response
                res.json(jsonData);
            } catch (parseErr) {
                // Handle JSON parsing errors
                console.error('Error parsing JSON data:', parseErr);
                res.status(500).json({
                    error: 'Error parsing JSON data',
                    details: parseErr.message
                });
            }
        }
    });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
