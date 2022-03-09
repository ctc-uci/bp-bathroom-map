const mongoose = require('mongoose');

// Read more about mongoose schemas here: https://mongoosejs.com/docs/guide.html
// Read more about valid types here: https://mongoosejs.com/docs/schematypes.html

// Populate field names and types for the Bathroom model
const reviewSchema = new mongoose.Schema({
  rating: Number,
  review: {
    type: String,
    default: '',
  },
})
const bathroomSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  name: String,
  latitude: Number,
  longitude: Number,
  img: String,
  reviews:[reviewSchema],
});

module.exports = mongoose.model('Bathroom', bathroomSchema, 'bathrooms');

/*
- bathroom table structure
    - _id : string
    - name : string
    - latitude : float
    - longitude : float
    - img : string
    
    - type : (“gender inclusive”, “male only”, “female only”, “splitted”) (array of strings)
    - availability : string "0:00 to 24:00"
    - review : (array of {string,rating})
    - tags : (array of strings) 
*/
