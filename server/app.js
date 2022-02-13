const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importing routes
// Routes define how the server will respond to client requests
// Read more about routing here: https://expressjs.com/en/starter/basic-routing.html
const bathroomRoute = require('./routes/bathrooms');

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
