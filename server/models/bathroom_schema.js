const mongoose = require('mongoose');

// Populate fields for the Bathroom model
const bathroomSchema = new mongoose.Schema({
  _id: String,
  name: String,
  latitude: Number,
  longitude: Number,
  img: String,
});

module.exports = mongoose.model('Bathroom', bathroomSchema, 'bathrooms');
