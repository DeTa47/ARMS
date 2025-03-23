const mongoose = require('mongoose');

const PostDoctoralResearchExperienceSchema = new mongoose.Schema({
    
    instituteOrIndustry: { type: String }, 
    startDate: { type: Date },
    endDate: { type: Date }, 
    sponsoredBy: { type: String },
    universityRankings: { type: String }, 
    supportingDocument: { type: String } 
});

module.exports = mongoose.model('PostDoctoralResearchExperience', PostDoctoralResearchExperienceSchema);
