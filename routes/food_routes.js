const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// Get all foods
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search food and calculate nutrients
router.get('/search', async (req, res) => {
  try {
    const { name, weight } = req.query;
    
    if (!name || !weight) {
      return res.status(400).json({ message: 'Name and weight are required' });
    }

    const food = await Food.findOne({ name: name.toLowerCase() });
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const weightFactor = parseFloat(weight) / 100;
    const calculatedNutrients = {
      name: food.name,
      weight: parseFloat(weight),
      calories: Math.round(food.nutrients.calories * weightFactor),
      protein: (food.nutrients.protein * weightFactor).toFixed(1),
      carbs: (food.nutrients.carbs * weightFactor).toFixed(1),
      fat: (food.nutrients.fat * weightFactor).toFixed(1)
    };

    res.json(calculatedNutrients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new food (for admin/testing)
router.post('/', async (req, res) => {
  const food = new Food({
    name: req.body.name,
    nutrients: req.body.nutrients
  });

  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/ping', async (req, res) => {
  try {

    res.json({"message":"i am active:)"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;