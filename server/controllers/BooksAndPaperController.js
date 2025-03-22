const PublishedArticles = require('../schema/BooksAndPapers/PublishedArticles');
const PapersPresented = require('../schema/BooksAndPapers/PapersPresented');
const BooksPublished = require('../schema/BooksAndPapers/BooksPublished');

// PublishedArticles Controllers
exports.createPublishedArticle = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newArticle = new PublishedArticles(data);
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPublishedArticlesByUserId = async (req, res) => {
  try {
    const articles = await PublishedArticles.find({ user: req.body.userId });
    if (articles.length === 0) {
      const schemaKeys = Object.keys(PublishedArticles.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = articles.map(article => {
      article = article.toObject();
      delete article.user;
      delete article.__v;
      return article;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePublishedArticle = async (req, res) => {
  try {
    const updatedArticle = await PublishedArticles.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePublishedArticle = async (req, res) => {
  try {
    await PublishedArticles.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PapersPresented Controllers
exports.createPaperPresented = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newPaper = new PapersPresented(data);
    const savedPaper = await newPaper.save();
    res.status(201).json(savedPaper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPapersPresentedByUserId = async (req, res) => {
  try {
    const papers = await PapersPresented.find({ user: req.body.userId });
    if (papers.length === 0) {
      const schemaKeys = Object.keys(PapersPresented.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = papers.map(paper => {
      paper = paper.toObject();
      delete paper.user;
      delete paper.__v;
      return paper;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePaperPresented = async (req, res) => {
  try {
    const updatedPaper = await PapersPresented.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedPaper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePaperPresented = async (req, res) => {
  try {
    await PapersPresented.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// BooksPublished Controllers
exports.createBookPublished = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newBook = new BooksPublished(data);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooksPublishedByUserId = async (req, res) => {
  try {
    const books = await BooksPublished.find({ user: req.body.userId });
    if (books.length === 0) {
      const schemaKeys = Object.keys(BooksPublished.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = books.map(book => {
      book = book.toObject();
      delete book.user;
      delete book.__v;
      return book;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBookPublished = async (req, res) => {
  try {
    const updatedBook = await BooksPublished.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBookPublished = async (req, res) => {
  try {
    await BooksPublished.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
