// Load env 
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

// Import dependencies
const express = require('express');
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const kidController = require("./controllers/kidController");



// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routing

app.get("/kid", kidController.fetchKids);

app.get('/kid/:id', kidController.fetchKid);

app.post('/kid', kidController.createKid);

app.put('/kid/:id', kidController.updateKid);

app.delete("/kid/:id", kidController.deleteKid);
// Start our server
app.listen(process.env.PORT);
//je