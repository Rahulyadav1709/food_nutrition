const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  nutrients: {
    calories: { type: Number, required: true }, // per 100g
    protein: { type: Number, required: true },  // per 100g
    carbs: { type: Number, required: true },    // per 100g
    fat: { type: Number, required: true }      // per 100g
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('nutrition', foodSchema);