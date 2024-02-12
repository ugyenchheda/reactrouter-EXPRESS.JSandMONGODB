const express = require('express')
const router = express.Router();
const Contacts = require('../models/contactModels')

// Define API routes for contacts

// Example endpoint to get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contacts.find();
    console.log({contacts})
    res.json('Data');
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;