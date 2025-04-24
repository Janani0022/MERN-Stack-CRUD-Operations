import Item from '../models/itemModel.js';

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new item
export const createItem = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    
    // Create new item
    const newItem = new Item({
      name,
      description,
      category,
      price
    });
    
    // Save to database
    const item = await newItem.save();
    
    res.status(201).json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an item
export const updateItem = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    
    // Build item object
    const itemFields = {};
    if (name) itemFields.name = name;
    if (description) itemFields.description = description;
    if (category) itemFields.category = category;
    if (price) itemFields.price = price;
    
    // Find and update
    let item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );
    
    res.json(item);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete an item
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    await Item.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
};