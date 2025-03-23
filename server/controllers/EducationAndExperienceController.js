const PostDoctoralResearchExperience = require('../schema/EducationAndExperienceDetails/postDoctoralResearchExperience');
const Experience = require('../schema/EducationAndExperienceDetails/Experience');
const Education = require('../schema/EducationAndExperienceDetails/Education');


exports.createPostDoctoralResearchExperience = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newRecord = new PostDoctoralResearchExperience(data);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPostDoctoralResearchExperienceByUserId = async (req, res) => {
  try {
    const records = await PostDoctoralResearchExperience.find({ user: req.body.userId });
    if (records.length === 0) {
      const schemaKeys = Object.keys(PostDoctoralResearchExperience.schema.paths);
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

exports.updatePostDoctoralResearchExperience = async (req, res) => {
  try {
    const updatedRecord = await PostDoctoralResearchExperience.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePostDoctoralResearchExperience = async (req, res) => {
  try {
    await PostDoctoralResearchExperience.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createExperience = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newRecord = new Experience(data);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getExperienceByUserId = async (req, res) => {
  try {
    const records = await Experience.find({ user: req.body.userId });
    if (records.length === 0) {
      const schemaKeys = Object.keys(Experience.schema.paths);
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

exports.updateExperience = async (req, res) => {
  try {
    const updatedRecord = await Experience.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.createEducation = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newRecord = new Education(data);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEducationByUserId = async (req, res) => {
  try {
    const records = await Education.find({ user: req.body.userId });
    if (records.length === 0) {
      const schemaKeys = Object.keys(Education.schema.paths);
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

exports.updateEducation = async (req, res) => {
  try {
    const updatedRecord = await Education.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
