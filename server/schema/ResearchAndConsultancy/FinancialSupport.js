const mongoose = require('mongoose');

const financialSupportSchema = new mongoose.Schema({
  nameOfSupport: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  supportingAgency: {
    type: String
  },
  grantReceived: {
    type: Number
  },
  detailsOfEvent: {
    type: String
  },
  purposeOfGrant: {
    type: String
  },
  date: {
    type: Date
  },
  supportingDocument: {
    type: Buffer
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }
});

module.exports = mongoose.model('FinancialSupport', financialSupportSchema);