const express = require('express');

// Importing mongoose schemas
const Bathroom = require('../models/bathroom_schema');

// Create a router
const router = express.Router();

// HTTP commands to send to back-end with given router address

// Create a route to get all bathroom data from backend
// req=HTTP request from frontend
// res=HTTP respond for backend to populate and send to frontend
// 200=success
// 300=redirect
// 404=not found
// 500=error
router.get('/', async (req, res) => {
  try {
    const filter = {}; // Condition for object to meet
    const mongoResponse = await Bathroom.find(filter); // Select those that met the condition
    res.status(200).send(mongoResponse); // sending status and response to the frontend
  } catch (err) {
    res.status(500).json({ message: err.message }); // Let frontend know there is error
  }
});

// IMPORTANT: Anytime you want to use data from 2 files you have to export it in one file and import it in the other file
module.exports = router;
