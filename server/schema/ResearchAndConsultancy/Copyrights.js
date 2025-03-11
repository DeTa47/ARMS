const mongoose = require('mongoose');

const copyrightsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  referenceNo: {
    type: String,
    required: true
  },
  publicationDate: {
    type: Date
  },
  link: {
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

module.exports = mongoose.model('Copyrights', copyrightsSchema);