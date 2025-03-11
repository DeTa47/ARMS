const mongoose = require('mongoose');

const academicResearchNatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  programme: {
    type: String
  },
  place: {
    type: String
  },
  talkDate: {
    type: Date
  },
  titleOfEventTalk: {
    type: String
  },
  participatedAs: {
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

module.exports = mongoose.model('AcademicResearchNature', academicResearchNatureSchema);