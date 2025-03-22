const express = require('express');
const router = express.Router();
const booksAndPaperController = require('../controllers/BooksAndPaperController');

// PublishedArticles Routes
router.post('/published-articles', booksAndPaperController.createPublishedArticle);
router.post('/getpublished-articles', booksAndPaperController.getPublishedArticlesByUserId);
router.patch('/published-articles', booksAndPaperController.updatePublishedArticle);
router.delete('/published-articles', booksAndPaperController.deletePublishedArticle);

// PapersPresented Routes
router.post('/papers-presented', booksAndPaperController.createPaperPresented);
router.post('/getpapers-presented', booksAndPaperController.getPapersPresentedByUserId);
router.patch('/papers-presented', booksAndPaperController.updatePaperPresented);
router.delete('/papers-presented', booksAndPaperController.deletePaperPresented);

// BooksPublished Routes
router.post('/books-published', booksAndPaperController.createBookPublished);
router.post('/getbooks-published', booksAndPaperController.getBooksPublishedByUserId);
router.patch('/books-published', booksAndPaperController.updateBookPublished);
router.delete('/books-published', booksAndPaperController.deleteBookPublished);

module.exports = router;
