const mongoose = require('mongoose');

const policyDocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  organisation: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  supportingDocument: {
    type: Buffer
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }
});

module.exports = mongoose.model('PolicyDocument', policyDocumentSchema);