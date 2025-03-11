const mongoose = require('mongoose');

const refresherOrientationCourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  courseType: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  organizingUniversity: {
    type: String
  },
  organizingInstitute: {
    type: String
  },
  organizingDepartment: {
    type: String
  },
  centre: {
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

module.exports = mongoose.model('RefresherOrientationCourse', refresherOrientationCourseSchema);