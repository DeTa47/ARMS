const mongoose = require('mongoose');

const articlesJournalsEditedVolumesSchema = new mongoose.Schema({
  srNo: {
    type: Number
  },
  journalName: {
    type: String
  },
  issn: {
    type: String
  },
  eIssn: {
    type: String
  },
  volumeNo: {
    type: String
  },
  publishersName: {
    type: String
  },
  type: {
    type: String
  },
  level: {
    type: String
  },
  peerReviewed: {
    type: Boolean
  },
  hIndex: {
    type: Number
  },
  impactFactor: {
    type: Number
  },
  doi: {
    type: String
  },
  inScopus: {
    type: Boolean
  },
  inUGCCARE: {
    type: Boolean
  },
  inCLARIVATE: {
    type: Boolean
  },
  inOldUGCList: {
    type: Boolean
  },
  approxPrice: {
    type: Number
  },
  currency: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }
});

module.exports = mongoose.model('ArticlesJournalsEditedVolumes', articlesJournalsEditedVolumesSchema);