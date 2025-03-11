const AcademicResearchVisit = require('../schema/ResearchAndConsultancy/AcademicResearchVisit');
const Collaborations = require('../schema/ResearchAndConsultancy/Collaborations');
const ConsultancyDetails = require('../schema/ResearchAndConsultancy/ConsultancyDetails');
const Copyrights = require('../schema/ResearchAndConsultancy/Copyrights');
const EContent = require('../schema/ResearchAndConsultancy/EContent');
const FinancialSupport = require('../schema/ResearchAndConsultancy/FinancialSupport');
const JRFSRFDetails = require('../schema/ResearchAndConsultancy/JRFSRFDetails');
const PhDGuidance = require('../schema/ResearchAndConsultancy/PhDGuidance');
const PolicyDocument = require('../schema/ResearchAndConsultancy/PolicyDocument');
const ResearchProject = require('../schema/ResearchAndConsultancy/ResearchProject');
const Consultancy = require('../schema/ResearchAndConsultancy/Consultancy');


// Create a new academic research visit
exports.createAcademicResearchVisit = async (req, res) => {
  try {
    const newVisit = new AcademicResearchVisit(req.body);
    const savedVisit = await newVisit.save();
    res.status(201).json(savedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read academic research visits by user ID
exports.getAcademicResearchVisitsByUserId = async (req, res) => {
  try {
    const visits = await AcademicResearchVisit.find({ user: req.body.userId });
    res.status(200).json(visits);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an academic research visit
exports.updateAcademicResearchVisit = async (req, res) => {
  try {
    const updatedVisit = await AcademicResearchVisit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an academic research visit
exports.deleteAcademicResearchVisit = async (req, res) => {
  try {
    await AcademicResearchVisit.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.createCollaboration = async (req, res) => {
  try {
    const newCollaboration = new Collaborations(req.body);
    const savedCollaboration = await newCollaboration.save();
    res.status(201).json(savedCollaboration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read collaborations by user ID
exports.getCollaborationsByUserId = async (req, res) => {
  try {
    const collaborations = await Collaborations.find({ user: req.body.userId });
    res.status(200).json(collaborations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a collaboration
exports.updateCollaboration = async (req, res) => {
  try {
    const updatedCollaboration = await Collaborations.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCollaboration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a collaboration
exports.deleteCollaboration = async (req, res) => {
  try {
    await Collaborations.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

// AcademicResearchVisit Controllers
exports.createAcademicResearchVisit = async (req, res) => {
  try {
    const newVisit = new AcademicResearchVisit(req.body);
    const savedVisit = await newVisit.save();
    res.status(201).json(savedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAcademicResearchVisitsByUserId = async (req, res) => {
  try {
    const visits = await AcademicResearchVisit.find({ user: req.body.userId });
    res.status(200).json(visits);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAcademicResearchVisit = async (req, res) => {
  try {
    const updatedVisit = await AcademicResearchVisit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAcademicResearchVisit = async (req, res) => {
  try {
    await AcademicResearchVisit.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Collaborations Controllers
exports.createCollaboration = async (req, res) => {
  try {
    const newCollaboration = new Collaborations(req.body);
    const savedCollaboration = await newCollaboration.save();
    res.status(201).json(savedCollaboration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCollaborationsByUserId = async (req, res) => {
  try {
    const collaborations = await Collaborations.find({ user: req.body.userId });
    res.status(200).json(collaborations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCollaboration = async (req, res) => {
  try {
    const updatedCollaboration = await Collaborations.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCollaboration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCollaboration = async (req, res) => {
  try {
    await Collaborations.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ConsultancyDetails Controllers
exports.createConsultancyDetail = async (req, res) => {
  try {
    const newDetail = new ConsultancyDetails(req.body);
    const savedDetail = await newDetail.save();
    res.status(201).json(savedDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getConsultancyDetailsByUserId = async (req, res) => {
  try {
    const details = await ConsultancyDetails.find({ user: req.body.userId });
    res.status(200).json(details);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateConsultancyDetail = async (req, res) => {
  try {
    const updatedDetail = await ConsultancyDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteConsultancyDetail = async (req, res) => {
  try {
    await ConsultancyDetails.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Copyrights Controllers
exports.createCopyright = async (req, res) => {
  try {
    const newCopyright = new Copyrights(req.body);
    const savedCopyright = await newCopyright.save();
    res.status(201).json(savedCopyright);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCopyrightsByUserId = async (req, res) => {
  try {
    const copyrights = await Copyrights.find({ user: req.body.userId });
    res.status(200).json(copyrights);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCopyright = async (req, res) => {
  try {
    const updatedCopyright = await Copyrights.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCopyright);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCopyright = async (req, res) => {
  try {
    await Copyrights.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// EContent Controllers
exports.createEContent = async (req, res) => {
  try {
    const newEContent = new EContent(req.body);
    const savedEContent = await newEContent.save();
    res.status(201).json(savedEContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEContentsByUserId = async (req, res) => {
  try {
    const eContents = await EContent.find({ user: req.body.userId });
    res.status(200).json(eContents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEContent = async (req, res) => {
  try {
    const updatedEContent = await EContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEContent = async (req, res) => {
  try {
    await EContent.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// FinancialSupport Controllers
exports.createFinancialSupport = async (req, res) => {
  try {
    const newSupport = new FinancialSupport(req.body);
    const savedSupport = await newSupport.save();
    res.status(201).json(savedSupport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFinancialSupportsByUserId = async (req, res) => {
  try {
    const supports = await FinancialSupport.find({ user: req.body.userId });
    res.status(200).json(supports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFinancialSupport = async (req, res) => {
  try {
    const updatedSupport = await FinancialSupport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSupport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFinancialSupport = async (req, res) => {
  try {
    await FinancialSupport.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// JRFSRFDetails Controllers
exports.createJRFSRFDetail = async (req, res) => {
  try {
    const newDetail = new JRFSRFDetails(req.body);
    const savedDetail = await newDetail.save();
    res.status(201).json(savedDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getJRFSRFDetailsByUserId = async (req, res) => {
  try {
    const details = await JRFSRFDetails.find({ user: req.body.userId });
    res.status(200).json(details);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateJRFSRFDetail = async (req, res) => {
  try {
    const updatedDetail = await JRFSRFDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteJRFSRFDetail = async (req, res) => {
  try {
    await JRFSRFDetails.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PhDGuidance Controllers
exports.createPhDGuidance = async (req, res) => {
  try {
    const newGuidance = new PhDGuidance(req.body);
    const savedGuidance = await newGuidance.save();
    res.status(201).json(savedGuidance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPhDGuidancesByUserId = async (req, res) => {
  try {
    const guidances = await PhDGuidance.find({ user: req.body.userId });
    res.status(200).json(guidances);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePhDGuidance = async (req, res) => {
  try {
    const updatedGuidance = await PhDGuidance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedGuidance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePhDGuidance = async (req, res) => {
  try {
    await PhDGuidance.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PolicyDocument Controllers
exports.createPolicyDocument = async (req, res) => {
  try {
    const newDocument = new PolicyDocument(req.body);
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPolicyDocumentsByUserId = async (req, res) => {
  try {
    const documents = await PolicyDocument.find({ user: req.body.userId });
    res.status(200).json(documents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePolicyDocument = async (req, res) => {
  try {
    const updatedDocument = await PolicyDocument.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePolicyDocument = async (req, res) => {
  try {
    await PolicyDocument.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ResearchProject Controllers
exports.createResearchProject = async (req, res) => {
  try {
    const newProject = new ResearchProject(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getResearchProjectsByUserId = async (req, res) => {
  try {
    const projects = await ResearchProject.find({ user: req.body.userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateResearchProject = async (req, res) => {
  try {
    const updatedProject = await ResearchProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteResearchProject = async (req, res) => {
  try {
    await ResearchProject.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Consultancy Controllers
exports.createConsultancy = async (req, res) => {
  try {
    const newConsultancy = new Consultancy(req.body);
    const savedConsultancy = await newConsultancy.save();
    res.status(201).json(savedConsultancy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getConsultanciesByUserId = async (req, res) => {
  try {
    const consultancies = await Consultancy.find({ user: req.body.userId });

    if (consultancies.length === 0) {
      // Get schema keys from the Consultancy model
      const schemaKeys = Object.keys(Consultancy.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});

      return res.status(200).json([emptyObject]); // Return as an array
    }

    res.status(200).json(consultancies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateConsultancy = async (req, res) => {
  try {
    const updatedConsultancy = await Consultancy.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedConsultancy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteConsultancy = async (req, res) => {
  try {
    await Consultancy.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
