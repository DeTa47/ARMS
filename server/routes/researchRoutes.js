const express = require('express');
const router = express.Router();
const researchController = require('../controllers/ResearchAndConsultancyController');

router.post('/getconsultancy-projects', researchController.getConsultanciesByUserId);
router.post('/consultancy-projects', researchController.createConsultancy);
router.patch('/consultancy-projects', researchController.updateConsultancy);
router.delete('/consultancy-projects', researchController.deleteConsultancy);

router.post('/consultancy-details', researchController.createConsultancyDetail);
router.post('/getconsultancy-details', researchController.getConsultancyDetailsByUserId);
router.patch('/consultancy-details', researchController.updateConsultancyDetail);
router.delete('/consultancy-details', researchController.deleteConsultancyDetail);

router.post(`/getresearch-projects`, researchController.getResearchProjectsByUserId);
router.post(`/research-projects`, researchController.createResearchProject);
router.patch(`/research-projects`, researchController.updateResearchProject);
router.delete(`/research-projects`, researchController.deleteResearchProject);


router.post('/getcopyrights', researchController.getCopyrightsByUserId);
router.post('/copyrights', researchController.createCopyright);
router.patch('/copyrights', researchController.updateCopyright);
router.delete('/copyrights', researchController.deleteCopyright);





module.exports = router;