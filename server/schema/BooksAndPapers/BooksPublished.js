const mongoose = require('mongoose');

const booksPublishedSchema = new mongoose.Schema({
  authors: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String
  },
  publisherName: {
    type: String
  },
  publishingDate: {
    type: Date
  },
  publishingPlace: {
    type: String
  },
  chargesPaid: {
    type: Boolean
  },
  edited: {
    type: Boolean
  },
  chapterCount: {
    type: Number
  },
  publishingLevel: {
    type: String
  },
  bookType: {
    type: String
  },
  authorType: {
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

module.exports = mongoose.model('BooksPublished', booksPublishedSchema);