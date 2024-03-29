const mongoose = require('mongoose');

// Define the schema for a contact
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  profile_link: String,
  image: String,
  description: String,
});

// Create a Mongoose model named 'Contact' based on the schema
const Contact = mongoose.model('Contact', contactSchema);

// Export the Contact model
module.exports = Contact;