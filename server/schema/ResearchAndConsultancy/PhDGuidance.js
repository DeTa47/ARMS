const mongoose = require('mongoose');

const phdGuidanceSchema = new mongoose.Schema({
  regNo: {
    type: String,
    required: true
  },
  nameOfStudent: {
    type: String,
    required: true
  },
  dateOfRegistration: {
    type: Date
  },
  topic: {
    type: String
  },
  status: {
    type: String
  },
  yearOfCompletion: {
    type: Number
  },
  supportingDocument: {
    type: Buffer
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }
});

module.exports = mongoose.model('PhDGuidance', phdGuidanceSchema);