const express = require('express');

// Importing mongoose schemas
const Bathroom = require('../models/bathroom_schema');

// Create a router
const router = express.Router();

// Create a route to add bathroom's review
router.get('/', async (req, res) => {
  try {
    //get query info for bathroom from request
    let bathroomId=req.query.id;
    let bathroomReview=req.query.review
    console.log("NEW REVIEW: <",bathroomId,"> <",bathroomReview,">")

    //add review for bathroom based on ID 
    //resource: (https://mongoosejs.com/docs/tutorials/findoneandupdate.html)
    let updated = await Bathroom.findOneAndUpdate(
      { _id: bathroomId }, //----> filter to choose bathroom on ID to update 
      { $push: { reviews: bathroomReview } }, //----> action to push new review into "reviews" list
      { new: true} //flag to return the newest info of this bathroom for front end to update
    )
    
    //send response
    res.status(200).send(updated); // sending status and response to the frontend
  } catch (err) {
    //error handling
    res.status(500).json({ message: err.message }); // Let frontend know there is error
  }
});

// export for server to use
module.exports = router;