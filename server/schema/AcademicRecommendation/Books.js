const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  srNo: {
    type: Number
  },
  title: {
    type: String
  },
  authors: {
    type: String
  },
  isbn: {
    type: String
  },
  publisherName: {
    type: String
  },
  publishingLevel: {
    type: String
  },
  bookType: {
    type: String
  },
  edition: {
    type: String
  },
  volumeNo: {
    type: String
  },
  publicationDate: {
    type: Date
  },
  eBook: {
    type: Boolean
  },
  digitalMedia: {
    type: String
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

module.exports = mongoose.model('Books', booksSchema);