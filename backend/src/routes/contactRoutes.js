
const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// Define API routes for contacts

// Example endpoint to get all contacts
router.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});