const mongoose = require('mongoose');

// Define a MongoDB schema for a ticket

//Create a new ticket with these pieces of information; title, description, contactinformation, created timestamp, latest ticket update timestamp
// Update a ticket’s information and status (pending, accepted, resolved, rejected).
const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A ticket must have a title'],
    unique: true,
    trim: true,
    maxlength: [40, 'A ticket title must have less or equal then 40 characters']
  },
  description: {
    type: String,
    required: [true, 'A ticket must have a description'],
    trim: true,
    maxlength: [
      200,
      'A ticket description must have less or equal then 200 characters'
    ]
  },
  contactinformation: {
    type: String,
    required: [true, 'A ticket must have a contact information'],
    trim: true,
    maxlength: [
      40,
      'A ticket contact information must have less or equal then 40 characters'
    ]
  },
  created: {
    type: Date,
    default: Date.now()
  },
  latestupdate: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'resolved', 'rejected'],
    default: 'pending'
  }
});

// Compile the schema into a model
const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
