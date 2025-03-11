const mongoose = require('mongoose');

const consultancyDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  collaboratingInstitute: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // Duration in months
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  detailsOutcome: {
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

module.exports = mongoose.model('ConsultancyDetails', consultancyDetailsSchema);