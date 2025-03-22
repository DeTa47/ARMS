const express = require('express');
const router = express.Router();
const academicProgramController = require('../controllers/AcademicProgramController');


router.post('/refresher-orientation-courses', academicProgramController.createRefresherOrientationCourse);
router.post('/getrefresher-orientation-courses', academicProgramController.getRefresherOrientationCoursesByUserId);
router.patch('/refresher-orientation-courses', academicProgramController.updateRefresherOrientationCourse);
router.delete('/refresher-orientation-courses', academicProgramController.deleteRefresherOrientationCourse);


router.post('/participation-in-committees', academicProgramController.createParticipationInCommittee);
router.post('/getparticipation-in-committees', academicProgramController.getParticipationInCommitteesByUserId);
router.patch('/participation-in-committees', academicProgramController.updateParticipationInCommittee);
router.delete('/participation-in-committees', academicProgramController.deleteParticipationInCommittee);


router.post('/participation-in-academic-bodies', academicProgramController.createParticipationInAcademicBody);
router.post('/getparticipation-in-academic-bodies', academicProgramController.getParticipationInAcademicBodiesByUserId);
router.patch('/participation-in-academic-bodies', academicProgramController.updateParticipationInAcademicBody);
router.delete('/participation-in-academic-bodies', academicProgramController.deleteParticipationInAcademicBody);


router.post('/contributions-in-organising', academicProgramController.createContributionInOrganising);
router.post('/getcontributions-in-organising', academicProgramController.getContributionsInOrganisingByUserId);
router.patch('/contributions-in-organising', academicProgramController.updateContributionInOrganising);
router.delete('/contributions-in-organising', academicProgramController.deleteContributionInOrganising);

module.exports = router;