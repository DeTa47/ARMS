const express = require('express');
const router = express.Router();
const researchController = require('../controllers/ResearchAndConsultancyController');


router.post('/getconsultancy-projects', researchController.getConsultanciesByUserId);
router.post('/consultancy-projects', researchController.createConsultancy);

router.post(/getresearch-projects/, researchController.getResearchProjectsByUserId);


module.exports = router;