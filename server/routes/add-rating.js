const express = require('express');

// Importing mongoose schemas
const Bathroom = require('../models/bathroom_schema');

// Create a router
const router = express.Router();

// Create a route to add bathroom's review
router.get('/', async (req, res) => {
  try {
    //get query info for bathroom
    let bathroomId=req.query.id;
    let newRating=req.query.rate
    console.log("NEW RATING: <",bathroomId,"> <",newRating,">")

    //get old rating and recalculate

    //add new rating for bathroom based on ID
    const filter = {}; // Condition for object to meet "{}"="all"
    const mongoResponse = await Bathroom.find(filter); // Select those that met the condition
    
    //send response
    res.status(200).send(); // sending status and response to the frontend
  } catch (err) {
    //error handling
    res.status(500).json({ message: err.message }); // Let frontend know there is error
  }
});

// export for server to use
module.exports = router;