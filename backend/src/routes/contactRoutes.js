import express from 'express';
const router = express.Router();
import Contacts from  '../models/contactModel';
import Data from  '../../demodata/data';

// Define API routes for contacts

// Example endpoint to get all contacts
router.get('/api/contacts', async (req, res) => {
  try {
    //const contacts = await Contact.find();
    res.json(Data);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;