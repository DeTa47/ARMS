const mongoose = require('mongoose');

const onlineEngagementInformationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  },
  faculty: {
    type: String
  },
  department: {
    type: String
  },
  format: {
    type: String
  },
  programme: {
    type: String
  },
  subject: {
    type: String
  },
  teacherName: {
    type: String
  },
  email: {
    type: String
  },
  mobileNumber: {
    type: String
  },
  nameOfResearchGroup: {
    type: String
  },
  nameOfExternalExpert: {
    type: String
  },
  numberOfParticipants: {
    type: Number
  },
  nameOfParticipants: {
    type: String
  },
  briefDescription: {
    type: String
  },
  certificateIssued: {
    type: Boolean
  },
  activityName: {
    type: String
  },
  platformUsed: {
    type: String
  },
  date: {
    type: Date
  },
  attachment1: {
    type: String
  },
  attachment2: {
    type: String
  },
  document: {
    type: String
  }
});

module.exports = mongoose.model('OnlineEngagementInformation', onlineEngagementInformationSchema);