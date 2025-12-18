const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { MenuItem, Order } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kova-restaurant';

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// GET all menu items (grouped by category)
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ available: true }).sort({ category: 1, name: 1 });
    
    const groupedMenu = menuItems.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        _id: item._id,
        name: item.name,
        price: item.price,
        description: item.description,
      });
      return acc;
    }, {});

    const menuCategories = Object.keys(groupedMenu).map(category => ({
      name: category,
      items: groupedMenu[category]
    }));

    res.json(menuCategories);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

// POST create new order
app.post('/api/orders', async (req, res) => {
  try {
    console.log('Received order request:', JSON.stringify(req.body, null, 2));
    
    const { items, customerInfo, notes } = req.body;

    if (!items || items.length === 0) {
      console.error('No items in order');
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      console.log('Processing item:', item);
      
      const menuItem = await MenuItem.findById(item.menuItemId || item._id);
      if (!menuItem) {
        console.error(`Menu item not found: ${item.menuItemId || item._id}`);
        return res.status(404).json({ message: `Menu item not found: ${item.name}` });
      }
      if (!menuItem.available) {
        console.error(`Menu item not available: ${item.name}`);
        return res.status(400).json({ message: `Menu item not available: ${item.name}` });
      }

      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity
      });

      totalAmount += menuItem.price * item.quantity;
    }

    const newOrder = new Order({
      items: orderItems,
      totalAmount,
      customerInfo,
      notes
    });

    const savedOrder = await newOrder.save();
    console.log('Order saved successfully:', savedOrder.orderNumber);
    
    res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
});

// Serve frontend at root
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;