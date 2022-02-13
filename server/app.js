const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// Routes (backend address for front end to reach)
// ex const testRoute = require('./routes/testRoute');
const bathroomRoute = require('./routes/bathrooms');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Display this when mongoose successfully connects to the database
mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");
});

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

// Add routes here
// ex: app.use(routeName);
// All requests arrive at App.js so now App.js redirects us to the right route
app.use('/bathrooms', bathroomRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


