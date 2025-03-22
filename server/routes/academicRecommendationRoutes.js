const express = require('express');
const router = express.Router();

const academicRecommendationController = require('../controllers/AcademicRecommendationController');


// TechnicalReports Routes
router.post('/technical-report', academicRecommendationController.createTechnicalReport);
router.post('/gettechnical-report', academicRecommendationController.getTechnicalReportsByUserId);
router.patch('/technical-report', academicRecommendationController.updateTechnicalReport);
router.delete('/technical-report', academicRecommendationController.deleteTechnicalReport);

// Magazines Routes
router.post('/magazine', academicRecommendationController.createMagazine);
router.post('/getmagazine', academicRecommendationController.getMagazinesByUserId);
router.patch('/magazine', academicRecommendationController.updateMagazine);
router.delete('/magazine', academicRecommendationController.deleteMagazine);

// ArticlesJournalsEditedVolumes Routes
router.post('/article-journal-edited-volume', academicRecommendationController.createArticleJournalEditedVolume);
router.post('/getarticle-journal-edited-volume', academicRecommendationController.getArticlesJournalsEditedVolumesByUserId);
router.patch('/article-journal-edited-volume', academicRecommendationController.updateArticleJournalEditedVolume);
router.delete('/article-journal-edited-volume', academicRecommendationController.deleteArticleJournalEditedVolume);

// Books Routes
router.post('/book', academicRecommendationController.createBook);
router.post('/getbook', academicRecommendationController.getBooksByUserId);
router.patch('/book', academicRecommendationController.updateBook);
router.delete('/book', academicRecommendationController.deleteBook);

module.exports = router;