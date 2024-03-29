const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModels');

// Endpoint to get all contacts
router.get('/api/contacts', async (req, res) => {
  try {
    // Use the Contact model to find all contacts in the MongoDB collection
    const contacts = await Contact.find();
    
    // Log the retrieved contacts to the console
    console.log({ contacts });
    
    // Respond with the retrieved contacts in the JSON format
    res.json(contacts);
  } catch (error) {
    // Handle errors, log the error to the console, and respond with a 500 Internal Server Error
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router to be used in your main application
module.exports = router;
