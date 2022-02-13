//this is thien's branch - testing update
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
  }),
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
/* 

//////////////////////////////// SKELETON //////////////////////////////////
- connect to MongoDB + create table structure
    + bathroom table:
        - rating
        - availability
        - type of bathrooms (gender inclusive, only male, only female, both?)
    + tags table:
        - tag name
        - bathroom that the tag belongs to
    + review:
        - review's content
        - bathroom that the review is for
- handle HTTP request from client:
    + Needs + wants:
        1/set up client's frontend with:
          - front end files (HTML, CSS, JS, etc.)
          - list of bathrooms with the following infos for each:
            + rating 
            + review 
            + availability (hours of service?)
            + tags
            + type of bathrooms (gender inclusive, only male, only female, both?)
        2/adding review to MongoDB
        3/recalculate rating in MongoDB
    + Nice to have (I think this will require user to have account):
        1/ favorite bathroom list
        2/ bathroom emergency ping
        3/ bathroom traffic (how many spots does it have left) ---------> last in priority (complicated)
*/