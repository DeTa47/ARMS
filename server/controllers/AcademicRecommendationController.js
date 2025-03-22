const TechnicalReports = require('../schema/AcademicRecommendation/TechnicalReports');
const Magazines = require('../schema/AcademicRecommendation/Magazines');
const ArticlesJournalsEditedVolumes = require('../schema/AcademicRecommendation/ArticlesJournalsEditedVolumes');
const Books = require('../schema/AcademicRecommendation/Books');

// TechnicalReports Methods
exports.createTechnicalReport = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newRecord = new TechnicalReports(data);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTechnicalReportsByUserId = async (req, res) => {
  try {
    const records = await TechnicalReports.find({ user: req.body.userId });
    if (records.length === 0) {
      const schemaKeys = Object.keys(TechnicalReports.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = records.map(record => {
      record = record.toObject();
      delete record.user;
      delete record.__v;
      return record;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTechnicalReport = async (req, res) => {
  try {
    const updatedRecord = await TechnicalReports.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTechnicalReport = async (req, res) => {
  try {
    await TechnicalReports.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Magazines Methods
exports.createMagazine = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newRecord = new Magazines(data);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMagazinesByUserId = async (req, res) => {
  try {
    const records = await Magazines.find({ user: req.body.userId });
    if (records.length === 0) {
      const schemaKeys = Object.keys(Magazines.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = records.map(record => {
      record = record.toObject();
      delete record.user;
      delete record.__v;
      return record;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMagazine = async (req, res) => {
  try {
    const updatedRecord = await Magazines.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMagazine = async (req, res) => {
  try {
    await Magazines.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ArticlesJournalsEditedVolumes Methods
exports.createArticleJournalEditedVolume = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newRecord = new ArticlesJournalsEditedVolumes(data);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getArticlesJournalsEditedVolumesByUserId = async (req, res) => {
  try {
    const records = await ArticlesJournalsEditedVolumes.find({ user: req.body.userId });
    if (records.length === 0) {
      const schemaKeys = Object.keys(ArticlesJournalsEditedVolumes.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = records.map(record => {
      record = record.toObject();
      delete record.user;
      delete record.__v;
      return record;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateArticleJournalEditedVolume = async (req, res) => {
  try {
    const updatedRecord = await ArticlesJournalsEditedVolumes.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteArticleJournalEditedVolume = async (req, res) => {
  try {
    await ArticlesJournalsEditedVolumes.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Books Methods
exports.createBook = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newRecord = new Books(data);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooksByUserId = async (req, res) => {
  try {
    const records = await Books.find({ user: req.body.userId });
    if (records.length === 0) {
      const schemaKeys = Object.keys(Books.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = records.map(record => {
      record = record.toObject();
      delete record.user;
      delete record.__v;
      return record;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedRecord = await Books.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Books.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
