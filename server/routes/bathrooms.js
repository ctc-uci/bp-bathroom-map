const express = require('express');

// Importing mongoose schemas
const Bathroom = require('../models/bathroom_schema');

// Create a router
const router = express.Router();

// Create a route to get all bathroom data from backend
router.get('/', async (req, res) => {
  try {
    //collect all bathroom
    const filter = {}; // Condition for object to meet "{}"="all"
    const mongoResponse = await Bathroom.find(filter); // Select those that met the condition
    
    //send response
    res.status(200).send(mongoResponse);
  } catch (err) {
    //error handling
    res.status(500).json({ message: err.message });
  }
});

// export for server to use
module.exports = router;

