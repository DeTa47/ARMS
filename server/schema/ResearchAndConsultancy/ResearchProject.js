const mongoose = require('mongoose');

const researchProjectSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generate ObjectId if not provided
  },
  title: {
    type: String,
    required: false
  },
  fundingAgency: {
    type: String,
    required: false
  },
  totalGrantSanctioned: {
    type: Number,
    required: false
  },
  totalGrantReceived: {
    type: Number,
    required: false
  },
  projectNature: {
    type: String,
    required: false
  },
  level: {
    type: String,
    required: false
  },
  duration: {
    type: Number, // Duration in months
    required: false
  },
  status: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  supportingDocument: {
    type: mongoose.Schema.Types.ObjectId, // Ensure this is an ObjectId
    ref: 'File', // Reference the File schema
    required: false, // Make this field optional
  },
  seedGrant: {
    type: String,
    default: 'No',
  },
  seedGrantYear: {
    type: Number
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ResearchProject', researchProjectSchema);