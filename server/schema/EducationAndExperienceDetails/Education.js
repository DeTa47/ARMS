const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    degreeType: { type: String },
    subject: { type: String },
    universityName: { type: String },
    state: { type: String },
    yearOfPassing: { type: Number },
    universityRankings: { type: String },
    supportingDocuments: { type: Buffer }
});

module.exports = mongoose.model('Education', EducationSchema);
