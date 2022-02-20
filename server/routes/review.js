const express = require('express');

// Importing mongoose schemas
const Bathroom = require('../models/bathroom_schema');

// Create a router
const router = express.Router();

// localhost:3001/review?id=62081a3071799594b34a3c42&rate=4&review=not+clean

// Create a route to add bathroom's review
router.post('/', async (req, res) => {
  try {
    //get query info for bathroom from request
    const bathroomId = req.query.id;
    const bathroomReview = req.query?.review; //optional ---> undefined if not existed
    const bathroomRating = req.query?.rate;  //mandatory ---> undefined if not existed
    if(!bathroomRating) { // throws an error if bathroomRating wasn't specified
      res.status(400).json({ message: "bad request: rating missing" });
    }

    console.log("NEW REVIEW: <",bathroomId,"> <",bathroomRating,"> <",bathroomReview)

    //add review for bathroom based on ID 
    //resource: (https://mongoosejs.com/docs/tutorials/findoneandupdate.html)------> TODO:
    const updated = await Bathroom.findOneAndUpdate(
      { _id: bathroomId }, //----> filter to choose bathroom on ID to update 
      { $push: { reviews: {rating:bathroomRating, review:bathroomReview} } }, //----> action to push new review into "reviews" list
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