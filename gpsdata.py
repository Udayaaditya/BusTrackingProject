# import requests
# import mysql.connector
#
# # API endpoint
# url = "https://gps.cloudecommerce.in/data.php"
#
# # Fetch JSON data from the API
# try:
#     response = requests.get(url)
#     response.raise_for_status()  # Raise an error for HTTP status codes 4xx/5xx
#     jsonDocs = response.json()   # Parse the JSON response
#
#     # Print the response to confirm its structure
#     print(jsonDocs)
#
# except requests.exceptions.RequestException as e:
#     print(f"Error fetching data from API: {e}")
#     exit()
#
# # MySQL connection
# try:
#     conn = mysql.connector.connect(
#         host="172.7.75.104",       # Replace with your database host
#         port=3306,              # Specify the port separately
#         user="root",            # Replace with your MySQL username
#         password="mca@54321",        # Replace with your MySQL password
#         database="chat"         # Replace with your database name
#     )
#     cursor = conn.cursor()
#
#     # SQL query to insert data
#     sql = """
#     INSERT INTO vehicle_data1 (vehicle_id, date, time, latitude, longitude)
#     VALUES (%s, %s, %s, %s, %s)
#     """
#
#     # Loop through the list of JSON objects and insert into the database
#     for jsonDoc in jsonDocs:
#         cursor.execute(sql, (
#             jsonDoc["vehicle_id"],  # Replace with the actual key from your API response
#             jsonDoc["date"],
#             jsonDoc["time"],
#             jsonDoc["latitude"],
#             jsonDoc["longitude"]
#         ))
#
#     # Commit the transaction
#     conn.commit()
#     print("Data inserted successfully!")
#
# except mysql.connector.Error as db_error:
#     print(f"Database error: {db_error}")
#
# finally:
#     # Properly close the cursor and connection
#     if 'cursor' in locals() and cursor:
#         cursor.close()
#     if 'conn' in locals() and conn:
#         conn.close()