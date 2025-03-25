const mongoose = require('mongoose');

const publishedArticlesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  },
  authors: {
    type: String,
    required: true
  },
  numberOfAuthors: {
    type: Number
  },
  authorType: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  editedType: {
    type: String
  },
  isbn: {
    type: String
  },
  issn: {
    type: String
  },
  journalName: {
    type: String
  },
  volumeNo: {
    type: String
  },
  pageNo: {
    type: String
  },
  date: {
    type: Date
  },
  level: {
    type: String
  },
  peerReviewed: {
    type: Boolean
  },
  hIndex: {
    type: Number
  },
  impactFactor: {
    type: Number
  },
  doi: {
    type: String
  },
  inScopus: {
    type: Boolean
  },
  inUGCCare: {
    type: Boolean
  },
  inClarivate: {
    type: Boolean
  },
  inOldUGCList: {
    type: Boolean
  },
  chargesPaid: {
    type: Boolean
  },
  supportingDocument: {
    type: String // Assuming this is a file path or URL
  }
});

module.exports = mongoose.model('PublishedArticles', publishedArticlesSchema);