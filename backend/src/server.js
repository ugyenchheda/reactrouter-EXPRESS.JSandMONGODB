const express = require('express')
const cors = require('cors')
const Contact = require('./models/contactModels')

const Data = require('../demodata/data')
const app = express();
const PORT = 3000;

const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const contactRoutes = require('./routes/contactRoutes')
// Use of CORS middleware
app.use(cors());
app.use('/api/contacts', contactRoutes)


const mongoURI = 'mongodb://localhost:27017/contacts';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Close the MongoDB connection when the server is closed
app.on('close', () => {
  db.close();
  console.log('MongoDB connection closed');
});




// Defining routes
app.get('/api/contacts', async(req, res) => {
    try {
      const contacts = await Contact.find();
      console.log({contacts})
      res.json(Data);
    } catch (error) {
      console.error('Error getting contacts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});