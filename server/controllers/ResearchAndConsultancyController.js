const AcademicResearchVisit = require('../schema/ResearchAndConsultancy/AcademicResearchVisit');
const Collaborations = require('../schema/ResearchAndConsultancy/Collaborations');
const ConsultancyDetails = require('../schema/ResearchAndConsultancy/ConsultancyDetails.js');
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
    const data = req.body.data;
    delete data._id;
    const newVisit = new AcademicResearchVisit(data);
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
    if (visits.length === 0) {
      const schemaKeys = Object.keys(AcademicResearchVisit.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = visits.map(visit => {
      visit = visit.toObject();
      delete visit.user;
      delete visit.__v;
      return visit;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an academic research visit
exports.updateAcademicResearchVisit = async (req, res) => {
  try {
    const updatedVisit = await AcademicResearchVisit.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an academic research visit
exports.deleteAcademicResearchVisit = async (req, res) => {
  try {
    await AcademicResearchVisit.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.createCollaboration = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newCollaboration = new Collaborations(data);
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
    if (collaborations.length === 0) {
      const schemaKeys = Object.keys(Collaborations.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = collaborations.map(collaboration => {
      collaboration = collaboration.toObject();
      delete collaboration.user;
      delete collaboration.__v;
      return collaboration;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a collaboration
exports.updateCollaboration = async (req, res) => {
  try {
    const updatedCollaboration = await Collaborations.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedCollaboration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a collaboration
exports.deleteCollaboration = async (req, res) => {
  try {
    await Collaborations.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

// AcademicResearchVisit Controllers
exports.createAcademicResearchVisit = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newVisit = new AcademicResearchVisit(data);
    const savedVisit = await newVisit.save();
    res.status(201).json(savedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAcademicResearchVisitsByUserId = async (req, res) => {
  try {
    const visits = await AcademicResearchVisit.find({ user: req.body.userId });
    if (visits.length === 0) {
      const schemaKeys = Object.keys(AcademicResearchVisit.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = visits.map(visit => {
      visit = visit.toObject();
      delete visit.user;
      delete visit.__v;
      return visit;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAcademicResearchVisit = async (req, res) => {
  try {
    const updatedVisit = await AcademicResearchVisit.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAcademicResearchVisit = async (req, res) => {
  try {
    await AcademicResearchVisit.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Collaborations Controllers
exports.createCollaboration = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newCollaboration = new Collaborations(data);
    const savedCollaboration = await newCollaboration.save();
    res.status(201).json(savedCollaboration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCollaborationsByUserId = async (req, res) => {
  try {
    const collaborations = await Collaborations.find({ user: req.body.userId });
    if (collaborations.length === 0) {
      const schemaKeys = Object.keys(Collaborations.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = collaborations.map(collaboration => {
      collaboration = collaboration.toObject();
      delete collaboration.user;
      delete collaboration.__v;
      return collaboration;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCollaboration = async (req, res) => {
  try {
    const updatedCollaboration = await Collaborations.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedCollaboration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCollaboration = async (req, res) => {
  try {
    await Collaborations.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ConsultancyDetails Controllers
exports.createConsultancyDetail = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newDetail = new ConsultancyDetails(req.body.data);
    const savedDetail = await newDetail.save();
    
    res.status(201).json(savedDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getConsultancyDetailsByUserId = async (req, res) => {
  try {
    
    const details = await ConsultancyDetails.find({ user: req.body.userId });
    
    if (details.length === 0) {
      const schemaKeys = Object.keys(ConsultancyDetails.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }

    const responseData = details.map(detail => {
      detail = detail.toObject();
      delete detail.user;
      delete detail.__v;
      return detail;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateConsultancyDetail = async (req, res) => {
  try {
    
    const updatedDetail = await ConsultancyDetails.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    
    res.status(200).json(updatedDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteConsultancyDetail = async (req, res) => {
  try {
    
    await ConsultancyDetails.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Copyrights Controllers
exports.createCopyright = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newCopyright = new Copyrights(data);
    const savedCopyright = await newCopyright.save();
    res.status(201).json(savedCopyright);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCopyrightsByUserId = async (req, res) => {
  try {
    const copyrights = await Copyrights.find({ user: req.body.userId });
    if (copyrights.length === 0) {
      const schemaKeys = Object.keys(Copyrights.schema.paths); 
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {}); 
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = copyrights.map(copyright => {
      copyright = copyright.toObject();
      delete copyright.user;
      delete copyright.__v;
      return copyright;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCopyright = async (req, res) => {
  try {
    const updatedCopyright = await Copyrights.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedCopyright);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCopyright = async (req, res) => {
  try {
    await Copyrights.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// EContent Controllers
exports.createEContent = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newEContent = new EContent(data);
    const savedEContent = await newEContent.save();
    res.status(201).json(savedEContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEContentsByUserId = async (req, res) => {
  try {
    const eContents = await EContent.find({ user: req.body.userId });
    if (eContents.length === 0) {
      const schemaKeys = Object.keys(EContent.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = eContents.map(eContent => {
      eContent = eContent.toObject();
      delete eContent.user;
      delete eContent.__v;
      return eContent;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEContent = async (req, res) => {
  try {
    const updatedEContent = await EContent.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedEContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEContent = async (req, res) => {
  try {
    await EContent.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// FinancialSupport Controllers
exports.createFinancialSupport = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newSupport = new FinancialSupport(data);
    const savedSupport = await newSupport.save();
    res.status(201).json(savedSupport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFinancialSupportsByUserId = async (req, res) => {
  try {
    const supports = await FinancialSupport.find({ user: req.body.userId });
    if (supports.length === 0) {
      const schemaKeys = Object.keys(FinancialSupport.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = supports.map(support => {
      support = support.toObject();
      delete support.user;
      delete support.__v;
      return support;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFinancialSupport = async (req, res) => {
  try {
    const updatedSupport = await FinancialSupport.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedSupport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFinancialSupport = async (req, res) => {
  try {
    await FinancialSupport.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// JRFSRFDetails Controllers
exports.createJRFSRFDetail = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newDetail = new JRFSRFDetails(data);
    const savedDetail = await newDetail.save();
    res.status(201).json(savedDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getJRFSRFDetailsByUserId = async (req, res) => {
  try {
    const details = await JRFSRFDetails.find({ user: req.body.userId });
    if (details.length === 0) {
      const schemaKeys = Object.keys(JRFSRFDetails.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = details.map(detail => {
      detail = detail.toObject();
      delete detail.user;
      delete detail.__v;
      return detail;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateJRFSRFDetail = async (req, res) => {
  try {
    const updatedDetail = await JRFSRFDetails.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteJRFSRFDetail = async (req, res) => {
  try {
    await JRFSRFDetails.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PhDGuidance Controllers
exports.createPhDGuidance = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newGuidance = new PhDGuidance(data);
    const savedGuidance = await newGuidance.save();
    res.status(201).json(savedGuidance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPhDGuidancesByUserId = async (req, res) => {
  try {
    const guidances = await PhDGuidance.find({ user: req.body.userId });
    if (guidances.length === 0) {
      const schemaKeys = Object.keys(PhDGuidance.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = guidances.map(guidance => {
      guidance = guidance.toObject();
      delete guidance.user;
      delete guidance.__v;
      return guidance;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePhDGuidance = async (req, res) => {
  try {
    const updatedGuidance = await PhDGuidance.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedGuidance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePhDGuidance = async (req, res) => {
  try {
    await PhDGuidance.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PolicyDocument Controllers
exports.createPolicyDocument = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newDocument = new PolicyDocument(data);
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPolicyDocumentsByUserId = async (req, res) => {
  try {
    const documents = await PolicyDocument.find({ user: req.body.userId });
    if (documents.length === 0) {
      const schemaKeys = Object.keys(PolicyDocument.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = documents.map(document => {
      document = document.toObject();
      delete document.user;
      delete document.__v;
      return document;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePolicyDocument = async (req, res) => {
  try {
    const updatedDocument = await PolicyDocument.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePolicyDocument = async (req, res) => {
  try {
    await PolicyDocument.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ResearchProject Controllers
exports.createResearchProject = async (req, res) => {
  try {
    const data = req.body.data;
    if (!data._id) {
      delete data._id; // Ensure _id is not sent as an empty string
    }
    if (!data.supportingDocument) {
      delete data.supportingDocument; // Remove the field if no file is uploaded
    }
    if (!data.Sr_No) {
      delete data.Sr_No; // Remove Sr_No if not provided to avoid duplicate key errors
    }
    const newProject = new ResearchProject(data);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getResearchProjectsByUserId = async (req, res) => {
  try {
    const projects = await ResearchProject.find({ user: req.body.userId });
    if (projects.length === 0) {
      const schemaKeys = Object.keys(ResearchProject.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      delete emptyObject.user;
      delete emptyObject.__v;
      return res.status(200).json([emptyObject]);
    }
    const responseData = projects.map(project => {
      project = project.toObject();
      delete project.user;
      delete project.__v;
      return project;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateResearchProject = async (req, res) => {
  try {
    const { id, data } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    if (!data.supportingDocument) {
      delete data.supportingDocument; // Remove the field if no file is uploaded
    }
    const updatedProject = await ResearchProject.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteResearchProject = async (req, res) => {
  try {
    await ResearchProject.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.createConsultancy = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newConsultancy = new Consultancy(data);
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
      
      const schemaKeys = Object.keys(Consultancy.schema.paths);
      const emptyObject = schemaKeys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});

      return res.status(200).json([emptyObject]); 
    }

    const responseData = consultancies.map(consultancy => {
      consultancy = consultancy.toObject();
      delete consultancy.user;
      delete consultancy.__v;
      return consultancy;
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateConsultancy = async (req, res) => {
  try {
    const updatedConsultancy = await Consultancy.findByIdAndUpdate(req.body.id, req.body.data, { new: true });

    res.status(200).json(updatedConsultancy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteConsultancy = async (req, res) => {
  try {
    await Consultancy.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
