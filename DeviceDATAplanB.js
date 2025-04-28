////basic code------------------------------------------------------
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
////const DATA_FILE = 'data.json';
////
////// Function to read JSON file
////const readData = () => {
////    try {
////        const data = fs.readFileSync(DATA_FILE);
////        return JSON.parse(data);
////    } catch (error) {
////        return []; // Return empty array if file does not exist or is empty
////    }
////};
////
////// Function to write JSON file
////const writeData = (newData) => {
////    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
////};
////
////// Endpoint to receive GPS data from ESP8266
////app.post('/update', (req, res) => {
////    const { vehicle_id, date, time, latitude, longitude } = req.body;
////
////    let gpsData = readData();
////    gpsData.push({ vehicle_id, date, time, latitude, longitude });
////
////    writeData(gpsData);
////    res.status(200).send('Data received and stored successfully');
////});
////
////// Endpoint to serve JSON data
////app.get('/data', (req, res) => {
////    res.json(readData());
////});
////
////// Serve the HTML page
////app.get('/', (req, res) => {
////    res.sendFile(path.join(__dirname, 'public', 'index.html'));
////});
////
////// Start the server
////const PORT = 4000;
////app.listen(PORT, () => {
////   console.log(`Server running at http://localhost:${PORT}`);
////});
//
//
//
//
//
//
//
//
//
//// update with file--------------------------------------------
//
//
////
////const express = require('express');
////const fs = require('fs');
////const path = require('path');
////
////const app = express();
////app.use(express.json()); // Built-in body parser in Express
////app.use(express.static('public')); // Serve static files from 'public' folder
////
////const DATA_FILE = 'data.json';
////
////// Function to read JSON file
////const readData = () => {
////    try {
////        if (fs.existsSync(DATA_FILE)) {
////            const data = fs.readFileSync(DATA_FILE, 'utf8'); // Read file as string
////            if (data.trim() === '') {
////                return []; // Return empty array if file is empty
////            }
////            return JSON.parse(data); // Parse JSON if the data is not empty
////        }
////        return []; // Return empty array if file doesn't exist
////    } catch (error) {
////        console.error('Error reading data file:', error);
////        return []; // Return empty array in case of error
////    }
////};
////
////// Function to write JSON file
////const writeData = (newData) => {
////    try {
////        fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
////    } catch (error) {
////        console.error('Error writing data file:', error);
////    }
////};
////
////// Endpoint to receive GPS data from ESP8266
////app.post('/update', (req, res) => {
////    const { vehicle_id, date, time, latitude, longitude } = req.body;
////
////    if (!vehicle_id || !date || !time || !latitude || !longitude) {
////        return res.status(400).send('Missing required data');
////    }
////
////    let gpsData = readData();
////    gpsData.push({ vehicle_id, date, time, latitude, longitude });
////
////    writeData(gpsData);
////    res.status(200).send('Data received and stored successfully');
////});
////
////// Endpoint to serve JSON data
////app.get('/data', (req, res) => {
////    res.json(readData());
////});
////
////// Serve the HTML page
////app.get('/', (req, res) => {
////    res.sendFile(path.join(__dirname, 'public', 'index.html'));
////});
////
////// Start the server
////const PORT = 4000;
////app.listen(PORT, () => {
////   console.log(`Server running at http://localhost:${PORT}`);
////});
//
//
//
////});
////
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
////const DATA_FILE = 'data.json';
////
////// Function to read JSON file safely
////const readData = () => {
////    try {
////        if (!fs.existsSync(DATA_FILE)) return []; // Check if file exists
////        const data = fs.readFileSync(DATA_FILE, 'utf8');
////        return data ? JSON.parse(data) : []; // Return parsed JSON or empty array
////    } catch (error) {
////        console.error("Error reading data:", error);
////        return [];
////    }
////};
////
////// Function to write JSON file safely
////const writeData = (newData) => {
////    try {
////        fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
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
////const PORT = 4000;
////app.listen(PORT, () => {
////  console.log(`Server running at http://localhost:${PORT}`);
//
//
//
//
//
//
//
//
//
//
//const express = require('express');
//const fs = require('fs');
//const bodyParser = require('body-parser');
//const path = require('path');
//
//const app = express();
//app.use(bodyParser.json());
//app.use(express.static('public')); // Serve static files from 'public' folder
//
//// Directory to save the data files
//const DATA_DIRECTORY = path.join(__dirname, 'dates_and_data');
//
//// Ensure the directory exists
//if (!fs.existsSync(DATA_DIRECTORY)) {
//    fs.mkdirSync(DATA_DIRECTORY);
//}
//
//// Function to generate the file name based on the current date
//const getFileName = () => {
//    const date = new Date();
//    const year = date.getFullYear();
//    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits
//    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
//    return path.join(DATA_DIRECTORY, `${year}-${month}-${day}.json`); // Format: YYYY-MM-DD.json
//};
//
//// Function to read JSON data from the daily file
//const readData = () => {
//    const fileName = getFileName();
//    try {
//        if (!fs.existsSync(fileName)) return []; // If the file doesn't exist, return an empty array
//        const data = fs.readFileSync(fileName, 'utf8');
//        return data ? JSON.parse(data) : []; // Parse JSON or return an empty array
//    } catch (error) {
//        console.error("Error reading data:", error);
//        return [];
//    }
//};
//
//// Function to write JSON data to the daily file
//const writeData = (newData) => {
//    const fileName = getFileName();
//    try {
//        fs.writeFileSync(fileName, JSON.stringify(newData, null, 2)); // Format with indentation
//    } catch (error) {
//        console.error("Error writing data:", error);
//    }
//};
//
//// Endpoint to receive GPS data from ESP32
//app.post('/update', (req, res) => {
//    const { vehicle_id, date, time, latitude, longitude } = req.body;
//
//    if (!vehicle_id || !date || !time || !latitude || !longitude) {
//        return res.status(400).send("Invalid data format");
//    }
//
//    let gpsData = readData();
//    gpsData.push({ vehicle_id, date, time, latitude, longitude });
//
//    writeData(gpsData);
//    res.status(200).send('Data received and stored successfully');
//});
//
//// Endpoint to serve stored GPS data
//app.get('/data', (req, res) => {
//    res.json(readData());
//});
//
//// Serve an HTML page
//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});
//
//// Start the server
//const PORT = 4000;
//app.listen(PORT, () => {
//    console.log(`Server running at http://localhost:${PORT}`);
//});




















const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' folder

const DATA_FILE = 'data.json';

// Function to read JSON file safely
const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) return []; // Check if file exists
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return data ? JSON.parse(data) : []; // Return parsed JSON or empty array
    } catch (error) {
        console.error("Error reading data:", error);
        return [];
    }
};

// Function to write JSON file safely
const writeData = (newData) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
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

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
