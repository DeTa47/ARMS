const express = require('express');
const router = express.Router();
const TalksController = require('../controllers/TalksController');


router.post('/academic-research-nature', TalksController.createAcademicResearchNature);
router.post('/getacademic-research-nature', TalksController.getAcademicResearchNatureByUserId);
router.put('/academic-research-nature', TalksController.updateAcademicResearchNature);
router.delete('/academic-research-nature', TalksController.deleteAcademicResearchNature);

module.exports = router;
