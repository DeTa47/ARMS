const mongoose = require('mongoose');

const contributionInOrganisingSchema = new mongoose.Schema({
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
  date: {
    type: Date
  },
  year: {
    type: Number
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

module.exports = mongoose.model('ContributionInOrganising', contributionInOrganisingSchema);