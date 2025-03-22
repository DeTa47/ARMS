const mongoose = require('mongoose');

const consultancyDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  collaboratingInstitute: {
    type: String,
    
  },
  address: {
    type: String
  },
  startDate: {
    type: Date,
    
  },
  duration: {
    type: String, 
    
  },
  amount: {
    type: String,
    
  },
  detailsOutcome: {
    type: String
  },
  supportingDocument: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }
});

module.exports = mongoose.model('ConsultancyDetails', consultancyDetailsSchema);