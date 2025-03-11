const mongoose = require('mongoose');

const papersPresentedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  },
  authors: {
    type: String,
    required: true
  },
  presentationLevel: {
    type: String
  },
  theme: {
    type: String
  },
  modeOfParticipation: {
    type: String
  },
  titleOfPaper: {
    type: String
  },
  organizingBody: {
    type: String
  },
  place: {
    type: String
  },
  dateOfPresentation: {
    type: Date
  },
  supportingDocument: {
    type: String // Assuming this is a file path or URL
  }
});

module.exports = mongoose.model('PapersPresented', papersPresentedSchema);