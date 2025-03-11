const mongoose = require('mongoose');

const researchProjectSchema = new mongoose.Schema({
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
    enum: ['University', 'National', 'International', 'State', 'Local'],
    required: false
  },
  duration: {
    type: Number, // Duration in months
    required: false
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'Pending'],
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  supportingDocument: {
    type: Buffer
  },
  seedGrant: {
    type: Boolean,
    default: false
  },
  seedGrantYear: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
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

// Pre-save middleware to update the 'updatedAt' field on save
researchProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ResearchProject', researchProjectSchema);