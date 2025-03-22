const express = require('express');
const router = express.Router();
const oeisController = require('../controllers/oeisController');

router.post('/online-engagement-information', oeisController.createOnlineEngagementInformation);
router.post('/getonline-engagement-information', oeisController.getOnlineEngagementInformationByUserId);
router.patch('/online-engagement-information', oeisController.updateOnlineEngagementInformation);
router.delete('/online-engagement-information', oeisController.deleteOnlineEngagementInformation);

module.exports = router;