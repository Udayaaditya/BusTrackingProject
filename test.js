const axios = require('axios');
const mysql = require('mysql2');

// API endpoint
const url = "https://gps.cloudecommerce.in/data.php";

// Fetch JSON data from the API
axios.get(url)
  .then(response => {
    const jsonDocs = response.data;  // JSON data from the API
    
    // Print the response to confirm its structure
    console.log(jsonDocs);

    // MySQL connection
    const connection = mysql.createConnection({
      host: "172.7.75.104",    // Replace with your database host
      port: 3306,              // Specify the port separately
      user: "root",            // Replace with your MySQL username
      password: "mca@54321",   // Replace with your MySQL password
      database: "chat"         // Replace with your database name
    });

    // SQL query to insert data
    const sql = `
      INSERT INTO vehicle_data1 (vehicle_id, date, time, latitude, longitude)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Loop through the list of JSON objects and insert into the database
    jsonDocs.forEach((jsonDoc) => {
      connection.execute(sql, [
        jsonDoc.vehicle_id,   // Replace with the actual key from your API response
        jsonDoc.date,
        jsonDoc.time,
        jsonDoc.latitude,
        jsonDoc.longitude
      ], (err, results) => {
        if (err) {
          console.error("Error inserting data into database:", err);
          return;
        }
        console.log("Data inserted successfully!");
      });
    });

    // Close the connection
    connection.end();

  })
  .catch(error => {
    console.error("Error fetching data from API:", error);
  });
