const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const Contact = require('./models/contactModels');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB connection setup
const mongoURI = 'mongodb://localhost:27017/contactapp';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your API routes
app.use('/api/contacts', contactRoutes);

// Define a simple route for the root path
// Defining routes
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log({ contacts });
    res.json(contacts); // Send the actual contacts instead of the placeholder Data
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
