const mongoose = require('mongoose');

const participationInAcademicBodiesSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true
  },
  academicBody: {
    type: String
  },
  place: {
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

module.exports = mongoose.model('ParticipationInAcademicBodies', participationInAcademicBodiesSchema);