const mongoose = require('mongoose');

const participationInCommitteesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  committeeName: {
    type: String
  },
  level: {
    type: String
  },
  participatedAs: {
    type: String
  },
  year: {
    type: Number
  },
  supportingDocument: {
    type: String // Assuming this is a file path or URL
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }
});

module.exports = mongoose.model('ParticipationInCommittees', participationInCommitteesSchema);