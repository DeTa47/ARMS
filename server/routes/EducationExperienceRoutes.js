const express = require('express');
const router = express.Router();
const educationExperienceController = require('../controllers/EducationAndExperienceController');

router.post('/post-doctoral-research-experience', educationExperienceController.createPostDoctoralResearchExperience);
router.post('/getpost-doctoral-research-experience', educationExperienceController.getPostDoctoralResearchExperienceByUserId);
router.patch('/post-doctoral-research-experience', educationExperienceController.updatePostDoctoralResearchExperience);
router.delete('/post-doctoral-research-experience', educationExperienceController.deletePostDoctoralResearchExperience);

router.post('/experience', educationExperienceController.createExperience);
router.post('/getexperience', educationExperienceController.getExperienceByUserId);
router.patch('/experience', educationExperienceController.updateExperience);
router.delete('/experience', educationExperienceController.deleteExperience);

router.post('/education', educationExperienceController.createEducation);
router.post('/geteducation', educationExperienceController.getEducationByUserId);
router.patch('/education', educationExperienceController.updateEducation);
router.delete('/education', educationExperienceController.deleteEducation);

module.exports = router;
