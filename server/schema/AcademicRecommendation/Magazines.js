const mongoose = require('mongoose');

const magazinesSchema = new mongoose.Schema({
  srNo: {
    type: Number
  },
  title: {
    type: String
  },
  mode: {
    type: String
  },
  publishingAgency: {
    type: String
  },
  volumeNo: {
    type: String
  },
  publicationDate: {
    type: Date
  },
  additionalAttachment: {
    type: Boolean
  },
  attachment: {
    type: String
  },
  numberOfIssuesPerYear: {
    type: Number
  },
  approxPrice: {
    type: Number
  },
  currency: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }
});

module.exports = mongoose.model('Magazines', magazinesSchema);