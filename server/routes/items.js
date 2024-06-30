const express = require('express');
const router = express.Router();
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
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw Error('Item not found');

    await item.remove();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
