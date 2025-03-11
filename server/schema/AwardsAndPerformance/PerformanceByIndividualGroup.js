const mongoose = require('mongoose');

const performanceByIndividualGroupSchema = new mongoose.Schema({
  titleOfPerformance: {
    type: String,
    required: true
  },
  place: {
    type: String
  },
  performanceDate: {
    type: Date
  },
  natureOfPerformance: {
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

module.exports = mongoose.model('PerformanceByIndividualGroup', performanceByIndividualGroupSchema);