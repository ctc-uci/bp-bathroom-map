const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importing routes to define how the server will respond to client requests
// Read more about routing here: https://expressjs.com/en/starter/basic-routing.html
const bathroomRoute = require('./routes/bathrooms');
const reviewRoute = require('./routes/review');

// Grab configuration variables from the .env file
require('dotenv').config();

// Create a new express app, and set its port
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Display this when mongoose successfully connects to the database
mongoose.connection.on('open', function () {
  console.log('mongodb is connected!!');
});

// Specify CORS origin
// Read more about CORS here: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
  }),
);

app.use(
  express.urlencoded({ extended: true }),
  express.json(),
  cors({ credentials: true, origin: true }),
);

// Adding routes (imported above)
// All requests arrive at App.js so now App.js redirects us to the right route
// Any request to '/bathrooms' will be sent to bathroomRoute to be handled
app.use('/bathrooms', bathroomRoute);
// localhost:3001/bathrooms
app.use('/review', reviewRoute); 
// localhost:3001/review?id=62081a3071799594b34a3c42&rate=4&review=not+clean

// Run the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
/* 

//////////////////////////////// SKELETON //////////////////////////////////
- bathroom table structure
    - _id : string
    - name : string
    - latitude : float
    - longitude : float
    - img : string
    - type : (“gender inclusive”, “male only”, “female only”, “splitted”) (array of strings)
    - availability : string "0:00 to 24:00"
    - avg_rating : string "<0-5>/5"
    - rating_count : int
    - review : (array of string)
    - tags : (array of strings) 

- handle HTTP request from client:
    + Needs + wants:
        1/set up client's frontend with:
          - front end files (HTML, CSS, JS, etc.)
          - list of bathrooms with the following infos for each (TO DO)
        3/getting closest bathroom 
        2/adding review to MongoDB (TO DO)
        3/recalculate rating in MongoDB (TO DO)
    + Nice to have (I think this will require user to have account):
        1/ favorite bathroom list
        2/ bathroom emergency ping
        3/ bathroom traffic (how many spots does it have left) ---------> last in priority (complicated)
*/