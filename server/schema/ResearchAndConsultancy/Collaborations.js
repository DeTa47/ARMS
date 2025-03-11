const mongoose = require('mongoose');

const collaborationsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  collaboratingInstitute: {
    type: String,
    required: true
  },
  collaboratorName: {
    type: String
  },
  ranking: {
    type: String
  },
  address: {
    type: String
  },
  details: {
    type: String
  },
  collaborationOutcome: {
    type: String
  },
  status: {
    type: String
  },
  startingDate: {
    type: Date
  },
  duration: {
    type: Number // Duration in months
  },
  level: {
    type: String
  },
  numberOfBeneficiaries: {
    type: Number
  },
  mouSigned: {
    type: Boolean
  },
  signingDate: {
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

module.exports = mongoose.model('Collaborations', collaborationsSchema);