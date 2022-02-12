
const Bathroom = require('../models/bathroom_schema');

// Query
module.exports = {
  // Query 1: Get all bathrooms
  getAllBathrooms: async () => {
    const filter = {}; // Condition for object to meet
    return Bathroom.find(filter); // Select those that met the condition
  },
};
