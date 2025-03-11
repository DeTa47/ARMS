const mongoose = require('mongoose');

const academicResearchVisitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  },
  instituteVisited: {
    type: String,
    required: true
  },
  durationOfVisit: {
    type: Number, // Duration in days
    required: true
  },
  role: {
    type: String
  },
  sponsoredBy: {
    type: String
  },
  remarks: {
    type: String
  },
  date: {
    type: Date
  },
  supportingDocument: {
    type: Buffer
  }
});

module.exports = mongoose.model('AcademicResearchVisit', academicResearchVisitSchema);