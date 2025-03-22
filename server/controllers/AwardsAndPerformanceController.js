const AwardsFellowshipRecognition = require('../schema/AwardsAndPerformance/AwardsFellowshipRecognition');
const Extension = require('../schema/AwardsAndPerformance/Extension');
const PerformanceByIndividualGroup = require('../schema/AwardsAndPerformance/PerformanceByIndividualGroup');

// AwardsFellowshipRecognition Controllers
exports.createAwardsFellowshipRecognition = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newAward = new AwardsFellowshipRecognition(data);
    const savedAward = await newAward.save();
    res.status(201).json(savedAward);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAwardsFellowshipRecognitionsByUserId = async (req, res) => {
  try {
    const awards = await AwardsFellowshipRecognition.find({ user: req.body.userId });
    if (awards.length === 0) {
      const schemaKeys = Object.keys(AwardsFellowshipRecognition.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = awards.map(award => {
      award = award.toObject();
      delete award.user;
      delete award.__v;
      return award;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAwardsFellowshipRecognition = async (req, res) => {
  try {
    const updatedAward = await AwardsFellowshipRecognition.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedAward);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAwardsFellowshipRecognition = async (req, res) => {
  try {
    await AwardsFellowshipRecognition.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Extension Controllers
exports.createExtension = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newExtension = new Extension(data);
    const savedExtension = await newExtension.save();
    res.status(201).json(savedExtension);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getExtensionsByUserId = async (req, res) => {
  try {
    const extensions = await Extension.find({ user: req.body.userId });
    if (extensions.length === 0) {
      const schemaKeys = Object.keys(Extension.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = extensions.map(extension => {
      extension = extension.toObject();
      delete extension.user;
      delete extension.__v;
      return extension;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateExtension = async (req, res) => {
  try {
    const updatedExtension = await Extension.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedExtension);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteExtension = async (req, res) => {
  try {
    await Extension.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PerformanceByIndividualGroup Controllers
exports.createPerformanceByIndividualGroup = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newPerformance = new PerformanceByIndividualGroup(data);
    const savedPerformance = await newPerformance.save();
    res.status(201).json(savedPerformance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPerformancesByIndividualGroupByUserId = async (req, res) => {
  try {
    const performances = await PerformanceByIndividualGroup.find({ user: req.body.userId });
    if (performances.length === 0) {
      const schemaKeys = Object.keys(PerformanceByIndividualGroup.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = performances.map(performance => {
      performance = performance.toObject();
      delete performance.user;
      delete performance.__v;
      return performance;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePerformanceByIndividualGroup = async (req, res) => {
  try {
    const updatedPerformance = await PerformanceByIndividualGroup.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedPerformance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePerformanceByIndividualGroup = async (req, res) => {
  try {
    await PerformanceByIndividualGroup.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
