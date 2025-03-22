const express = require('express');
const router = express.Router();
const awardsController = require('../controllers/AwardsAndPerformanceController');

// AwardsFellowshipRecognition Routes
router.post('/awards-fellowship-recognitions', awardsController.createAwardsFellowshipRecognition);
router.post('/getawards-fellowship-recognitions', awardsController.getAwardsFellowshipRecognitionsByUserId);
router.patch('/awards-fellowship-recognitions', awardsController.updateAwardsFellowshipRecognition);
router.delete('/awards-fellowship-recognitions', awardsController.deleteAwardsFellowshipRecognition);

// Extension Routes
router.post('/extensions', awardsController.createExtension);
router.post('/getextensions', awardsController.getExtensionsByUserId);
router.patch('/extensions', awardsController.updateExtension);
router.delete('/extensions', awardsController.deleteExtension);

// PerformanceByIndividualGroup Routes
router.post('/performances-by-individual-group', awardsController.createPerformanceByIndividualGroup);
router.post('/getperformances-by-individual-group', awardsController.getPerformancesByIndividualGroupByUserId);
router.patch('/performances-by-individual-group', awardsController.updatePerformanceByIndividualGroup);
router.delete('/performances-by-individual-group', awardsController.deletePerformanceByIndividualGroup);

module.exports = router;
