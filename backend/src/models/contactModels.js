const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    _id: {type: String, required: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
  notes: { type: String, required: true },
  profile_link: { type: String, required: true },
  image: { type: String, required: true },
  // Add more properties as needed
});

const Contact = mongoose.model('lists', contactSchema);

module.exports = Contact;