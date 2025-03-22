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

router.post('/academic-research-visits', researchController.createAcademicResearchVisit);
router.post('/getacademic-research-visits', researchController.getAcademicResearchVisitsByUserId);
router.patch('/academic-research-visits', researchController.updateAcademicResearchVisit);
router.delete('/academic-research-visits', researchController.deleteAcademicResearchVisit);


router.post('/collaborations', researchController.createCollaboration);
router.post('/getcollaborations', researchController.getCollaborationsByUserId);
router.patch('/collaborations', researchController.updateCollaboration);
router.delete('/collaborations', researchController.deleteCollaboration);


router.post('/econtents', researchController.createEContent);
router.post('/getecontents', researchController.getEContentsByUserId);
router.patch('/econtents', researchController.updateEContent);
router.delete('/econtents', researchController.deleteEContent);


router.post('/financial-supports', researchController.createFinancialSupport);
router.post('/getfinancial-supports', researchController.getFinancialSupportsByUserId);
router.patch('/financial-supports', researchController.updateFinancialSupport);
router.delete('/financial-supports', researchController.deleteFinancialSupport);


router.post('/jrfsrf-details', researchController.createJRFSRFDetail);
router.post('/getjrfsrf-details', researchController.getJRFSRFDetailsByUserId);
router.patch('/jrfsrf-details', researchController.updateJRFSRFDetail);
router.delete('/jrfsrf-details', researchController.deleteJRFSRFDetail);


router.post('/phd-guidances', researchController.createPhDGuidance);
router.post('/getphd-guidances', researchController.getPhDGuidancesByUserId);
router.patch('/phd-guidances', researchController.updatePhDGuidance);
router.delete('/phd-guidances', researchController.deletePhDGuidance);


router.post('/policy-documents', researchController.createPolicyDocument);
router.post('/getpolicy-documents', researchController.getPolicyDocumentsByUserId);
router.patch('/policy-documents', researchController.updatePolicyDocument);
router.delete('/policy-documents', researchController.deletePolicyDocument);

module.exports = router;