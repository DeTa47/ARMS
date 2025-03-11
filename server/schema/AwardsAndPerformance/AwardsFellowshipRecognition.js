const mongoose = require('mongoose');

const awardsFellowshipRecognitionSchema = new mongoose.Schema({
  nameOfAwardFellowship: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  nameOfAwardingAgency: {
    type: String
  },
  addressOfAwardingAgency: {
    type: String
  },
  dateOfAward: {
    type: Date
  },
  level: {
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

module.exports = mongoose.model('AwardsFellowshipRecognition', awardsFellowshipRecognitionSchema);