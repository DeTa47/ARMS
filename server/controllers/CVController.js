const schemas = {
    'Educational Details': require('../schema/EducationAndExperienceDetails/Education'),
    'Experience': require('../schema/EducationAndExperienceDetails/Experience'),
    'Research Detail': require('../schema/ResearchAndConsultancy/ResearchProject'),
    'Ph.D. Guidance Detail': require('../schema/ResearchAndConsultancy/PhDGuidance'),
    'Books Published': require('../schema/BooksAndPapers/BooksPublished'),
    'Paper Presented': require('../schema/BooksAndPapers/PapersPresented'),
    'Published Articles/Papers': require('../schema/BooksAndPapers/PublishedArticles'),
    'Refresher Orientation Course': require('../schema/AcademicPrograms/RefresherOrientationCourse'),
    'Contribution in Organising Academic Programs': require('../schema/AcademicPrograms/ContributionInOrganising'),
    'Participation in Academic Bodies of other universities': require('../schema/AcademicPrograms/ParticipationInAcademicBodies'),
    'Participation in committees of University': require('../schema/AcademicPrograms/ParticipationInCommittees'),
    'Performance by Individual/Group': require('../schema/AwardsAndPerformance/PerformanceByIndividualGroup'),
    'Talks': require('../schema/Talks/AcademicResearchNature'),
};
const {CVGenerator} = require('../utils/CVGenerator');
const fs = require('fs');

function transformResults(results) {
    const keys = Object.keys(results);

    const requiredFields = {
        'Educational Details': ['degreeType', 'universiytName','state','yearOfPassing'], 
        'Experience': ['employer', 'currentlyEmployed','designation','dateOfJoining','dateOfRelieving','natureOfJob'], 
        'Research Detail': ['title', 'fundingAgency', 'projectNature', 'level', 'duration'], 
        'Ph.D. Guidance Detail': ['nameOfStudent','topic','dateOfRegistration','status'], 
        'Books Published': ['title', 'isbn','publisherName','bookType','level','authorType'], 
        'Paper Presented': ['titleOfPaper','organizingBody','theme','level','modeOfParticipation','dateOfPresentation'], 
        'Published Articles/Papers': ['title','journalName','volumeNo','pageNo','Month','authorType','isbn'], 
        'Refresher Orientation Course': ['name','courseType','organizingUniversity','organizingInstitute','centre','startData','endDate'], 
        'Contribution in Organising Academic Programs': ['name','programme','participatedAs','place','date'], 
        'Participation in Academic Bodies of other universities': ['academicBody','participatedAs','place','year'], 
        'Participation in committees of University': ['comitteeName','level','participatedAs','date'], 
        'Performance by Individual/Group': ['titleOfPerformance','place','natureOfPerformance','date'], 
        'Talks': ['programme','place','titleOfEventTalk','participatedAs','talkDate',]
    };

    for (const key of keys) {
        if (requiredFields[key] && results[key]) {
            results[key] = results[key].map((value) => {
                const filteredValue = {};
                value = value.toObject();
                requiredFields[key].forEach((field) => {
                   
                    if (value && value[field] !== undefined) {
                        
                        filteredValue[field] = value[field];
                    } else {
                        console.warn(`Missing field "${field}" in record for key "${key}"`);
                    }
                });
                return filteredValue;
            });
        }
    }

    return results;
}

exports.generateCV = async (req, res) => {
    try {
        const outputDir = 'c:/Users/devan/OneDrive/Documents/ARMS/server/output';
        const userId = req.body.userId;
        const data = req.body.data;
        const payload = req.body.payload;
        console.log('Received data:', payload);

        const results = {};

        // Fetch data from schemas based on keys in the data array
        for (const key of data) {
            if (schemas[key]) {
                const records = await schemas[key].find({ user: userId });
                results[key] = records;
            } else {
                console.warn(`Schema for key "${key}" not found.`);
            }
        }

        if (Object.keys(results).length === 0) {
            console.warn('No data found for the requested sections:', data);
            return res.status(404).json({ message: 'No data found for the requested sections' });
        }

        

        const transResults = transformResults(results);

        const filePath = CVGenerator(transResults, outputDir, payload);

        // Validate filePath before proceeding
        if (!filePath || typeof filePath !== 'string' || !fs.existsSync(filePath)) {
            console.error('Invalid or missing file path:', filePath);
            return res.status(500).json({ message: 'Error generating CV: File not found' });
        }

        // Log file details for debugging
        const stats = fs.statSync(filePath);
        console.log('File path:', filePath);
        console.log('File size on disk:', stats.size, 'bytes');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="cv.pdf"');

        const fileStream = fs.createReadStream(filePath);

        fileStream.on('open', () => {
            fileStream.pipe(res);
        });

        fileStream.on('error', (err) => {
            console.error('Error reading file:', err);
            res.status(500).json({ message: 'Error sending file', error: err.message });
        });

        fileStream.on('close', () => {
            console.log('File successfully sent to client.');
        });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Error generating CV', error: error.message });
    }
};