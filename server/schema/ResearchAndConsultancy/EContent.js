const mongoose = require('mongoose');

const eContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  typeOfEContent: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  briefDetails: {
    type: String
  },
  quadrant: {
    type: String
  },
  publishingDate: {
    type: Date
  },
  publishingAuthorities: {
    type: String
  },
  link: {
    type: String
  },
  typeOfEContent: {
    type: String
  },
  supportingDocument: {
    type: String // Assuming this is a file path or URL
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }
});

module.exports = mongoose.model('EContent', eContentSchema);