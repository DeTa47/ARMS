const mongoose = require('mongoose');

const extensionSchema = new mongoose.Schema({
  nameOfActivity: {
    type: String,
    required: true
  },
  natureOfActivity: {
    type: String
  },
  level: {
    type: String
  },
  sponsoredBy: {
    type: String
  },
  place: {
    type: String
  },
  date: {
    type: Date
  },
  supportingDocument: {
    type: String // Assuming this is a file path or URL
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }
});

module.exports = mongoose.model('Extension', extensionSchema);