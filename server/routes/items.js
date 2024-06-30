const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../models/Item');

// @route GET /api/items
// @desc Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
});

// @route POST /api/items
// @desc Create an item
router.post('/', async (req, res) => {
  const newItem = new Item({ name: req.body.name });

  try {
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE /api/items/:id
// @desc Delete an item
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('Delete request received for id:', id);
  
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
  
    try {
      const item = await Item.findById(id);
      if (!item) {
        console.log('Item not found');
        return res.status(404).json({ message: 'Item not found' });
      }
  
      await Item.deleteOne({ _id: id });  // Use deleteOne with the correct id
      res.json({ message: 'Item deleted' });
    } catch (err) {
      console.error('Error deleting item:', err.message);
      res.status(500).json({ message: err.message });
    }
  });
  
  // @route PUT /api/items/:id
// @desc Update an item
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('Update request received for id:', id);
  
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
  
    try {
      const item = await Item.findById(id);
      if (!item) {
        console.log('Item not found');
        return res.status(404).json({ message: 'Item not found' });
      }
  
      item.name = req.body.name;
      const updatedItem = await item.save();
      res.json(updatedItem);
    } catch (err) {
      console.error('Error updating item:', err.message);
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
