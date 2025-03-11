const mongoose = require('mongoose');

const consultancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  clientOrganization: {
    type: String,
    required: true
  },
  consultancyType: {
    type: String,
    enum: ['Technical', 'Academic', 'Research', 'Advisory', 'Other'],
    required: true
  },
  amountReceived: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'Pending'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  description: {
    type: String
  },
  supportingDocument: {
    type: Buffer
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails',
    required: true
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
consultancySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Consultancy', consultancySchema);