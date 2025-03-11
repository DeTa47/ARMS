const mongoose = require('mongoose');

const jrfSrfDetailsSchema = new mongoose.Schema({
  nameOfFellow: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  projectTitle: {
    type: String
  },
  duration: {
    type: Number, // Duration in months
  },
  monthlyStipend: {
    type: Number
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

module.exports = mongoose.model('JRFSRFDetails', jrfSrfDetailsSchema);