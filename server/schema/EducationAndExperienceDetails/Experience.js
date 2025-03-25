const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    employer: String, 
    currentlyEmployed: String, 
    designation: String, 
    dateOfJoining: Date, 
    dateOfRelieving: Date, 
    natureOfJob: String, 
    typeOfTeaching: String 
});

module.exports = mongoose.model('Experience', ExperienceSchema);
