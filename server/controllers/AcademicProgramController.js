const RefresherOrientationCourse = require('../schema/AcademicPrograms/RefresherOrientationCourse');
const ParticipationInCommittees = require('../schema/AcademicPrograms/ParticipationInCommittees');
const ParticipationInAcademicBodies = require('../schema/AcademicPrograms/ParticipationInAcademicBodies');
const ContributionInOrganising = require('../schema/AcademicPrograms/ContributionInOrganising');

// RefresherOrientationCourse Controllers
exports.createRefresherOrientationCourse = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newCourse = new RefresherOrientationCourse(data);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRefresherOrientationCoursesByUserId = async (req, res) => {
  try {
    const courses = await RefresherOrientationCourse.find({ user: req.body.userId });
    if (courses.length === 0) {
      const schemaKeys = Object.keys(RefresherOrientationCourse.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = courses.map(course => {
      course = course.toObject();
      delete course.user;
      delete course.__v;
      return course;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRefresherOrientationCourse = async (req, res) => {
  try {
    const updatedCourse = await RefresherOrientationCourse.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRefresherOrientationCourse = async (req, res) => {
  try {
    await RefresherOrientationCourse.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ParticipationInCommittees Controllers
exports.createParticipationInCommittee = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newCommittee = new ParticipationInCommittees(data);
    const savedCommittee = await newCommittee.save();
    res.status(201).json(savedCommittee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getParticipationInCommitteesByUserId = async (req, res) => {
  try {
    const committees = await ParticipationInCommittees.find({ user: req.body.userId });
    if (committees.length === 0) {
      const schemaKeys = Object.keys(ParticipationInCommittees.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = committees.map(committee => {
      committee = committee.toObject();
      delete committee.user;
      delete committee.__v;
      return committee;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateParticipationInCommittee = async (req, res) => {
  try {
    const updatedCommittee = await ParticipationInCommittees.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedCommittee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteParticipationInCommittee = async (req, res) => {
  try {
    await ParticipationInCommittees.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ParticipationInAcademicBodies Controllers
exports.createParticipationInAcademicBody = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newBody = new ParticipationInAcademicBodies(data);
    const savedBody = await newBody.save();
    res.status(201).json(savedBody);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getParticipationInAcademicBodiesByUserId = async (req, res) => {
  try {
    const bodies = await ParticipationInAcademicBodies.find({ user: req.body.userId });
    if (bodies.length === 0) {
      const schemaKeys = Object.keys(ParticipationInAcademicBodies.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = bodies.map(body => {
      body = body.toObject();
      delete body.user;
      delete body.__v;
      return body;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateParticipationInAcademicBody = async (req, res) => {
  try {
    const updatedBody = await ParticipationInAcademicBodies.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedBody);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteParticipationInAcademicBody = async (req, res) => {
  try {
    await ParticipationInAcademicBodies.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ContributionInOrganising Controllers
exports.createContributionInOrganising = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newContribution = new ContributionInOrganising(data);
    const savedContribution = await newContribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getContributionsInOrganisingByUserId = async (req, res) => {
  try {
    const contributions = await ContributionInOrganising.find({ user: req.body.userId });
    if (contributions.length === 0) {
      const schemaKeys = Object.keys(ContributionInOrganising.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = contributions.map(contribution => {
      contribution = contribution.toObject();
      delete contribution.user;
      delete contribution.__v;
      return contribution;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateContributionInOrganising = async (req, res) => {
  try {
    const updatedContribution = await ContributionInOrganising.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedContribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContributionInOrganising = async (req, res) => {
  try {
    await ContributionInOrganising.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
