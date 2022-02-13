const mongoose = require('mongoose');

// Read more about mongoose schemas here: https://mongoosejs.com/docs/guide.html
// Read more about valid types here: https://mongoosejs.com/docs/schematypes.html

// Populate field names and types for the Bathroom model
const bathroomSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  name: String,
  latitude: Number,
  longitude: Number,
  img: String,
});

module.exports = mongoose.model('Bathroom', bathroomSchema, 'bathrooms');
