const mongoose = require('mongoose');

const technicalReportsSchema = new mongoose.Schema({
  srNo: {
    type: Number
  },
  title: {
    type: String
  },
  subject: {
    type: String
  },
  publishersName: {
    type: String
  },
  publicationDate: {
    type: Date
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

module.exports = mongoose.model('TechnicalReports', technicalReportsSchema);