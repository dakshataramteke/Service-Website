// server.js
const express = require("express");
const cors = require("cors");
const db = require("./models/db.js");
const bodyParser = require("body-parser");
// const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route to get all users
app.get("/contactus", (req, res) => {
  res.send("Working ");
});


// RO Installation
app.post("/RO_Installation", async (req, res) => {
  console.log("Received data:", req.body);

  // Extract values from the request body
  const { name, phone, email, address, model, description, date, time } = req.body;

  // Prepare the SQL query
  const sql = 'INSERT INTO installation (name, phone, email, address, model, description, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  // Values to be inserted
  const values = [name, phone, email, address, model, description, date, time];
  // console.log('DB object:', db);
 
  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Data inserted successfully:", result);
    return res.status(201).json({ message: "Data inserted successfully", result });
  });
});

//Maintenance
app.post("/RO_Maintenance", async (req, res) => {
  console.log(req.body);
  const { name, phone, email, address, model, description,  date, time, service
  } = req.body;

// Prepare the SQL query
const sql = 'INSERT INTO maintenance (name, phone, email, address, model, description, date, time , service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

// Values to be inserted
const values = [name, phone, email, address, model, description, date, time,service];
// console.log('DB object:', db);

// Execute the query
db.query(sql, values, (err, result) => {
  if (err) {
    console.error("Error inserting data:", err);
    return res.status(500).json({ error: "Database error" });
  }
  console.log("Data inserted successfully:", result);
  return res.status(201).json({ message: "Data inserted successfully", result });
});
});

//Water Quality 

app.post("/Water_Quality_Testing", async (req, res) => {
    console.log("Received data:", req.body); // Log the received data
    const { name, phone, email, address, model, description, date, time } =
      req.body;
  
// Prepare the SQL query
const sql = 'INSERT INTO water_quality (name, phone, email, address, model, description, date, time ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)';

// Values to be inserted
const values = [name, phone, email, address, model, description, date, time];
// console.log('DB object:', db);

// Execute the query
db.query(sql, values, (err, result) => {
  if (err) {
    console.error("Error inserting data:", err);
    return res.status(500).json({ error: "Database error" });
  }
  console.log("Data inserted successfully:", result);
  return res.status(201).json({ message: "Data inserted successfully", result });
});
   
  });


  // Emergency Repair
  app.post("/Emergency_Repair", async (req, res) => {
    console.log(req.body);
    const { name, phone, email, address, model, description,  date, time, service
    } = req.body;
  
  // Prepare the SQL query
  const sql = 'INSERT INTO emergency_repair (name, phone, email, address, model, description, date, time , service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  // Values to be inserted
  const values = [name, phone, email, address, model, description, date, time,service];
  // console.log('DB object:', db);
  
  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Data inserted successfully:", result);
    return res.status(201).json({ message: "Data inserted successfully", result });
  });
  });
  

  //contact us 

  app.post("/contactus",(req,res)=>{
    console.log(req.body);
    const { name,  email, subject,message
    } = req.body;
  
  // Prepare the SQL query
  const sql = 'INSERT INTO contact ( name,  email, subject,message) VALUES (?, ?, ?, ?)';
  
  // Values to be inserted
  const values = [ name,  email, subject,message];
  // console.log('DB object:', db);
  
  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Data inserted successfully:", result);
    return res.status(201).json({ message: "Data inserted successfully", result });
  });
  })
  
// Start the server
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
