const OnlineEngagementInformation = require('../schema/OEIS/OnlineEngagementInformation');

// Create OnlineEngagementInformation
exports.createOnlineEngagementInformation = async (req, res) => {
  try {
    const data = req.body.data;
    delete data._id;
    const newRecord = new OnlineEngagementInformation(data);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get OnlineEngagementInformation by User ID
exports.getOnlineEngagementInformationByUserId = async (req, res) => {
  try {
    const records = await OnlineEngagementInformation.find({ user: req.body.userId });
    if (records.length === 0) {
      const schemaKeys = Object.keys(OnlineEngagementInformation.schema.paths);
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

// Update OnlineEngagementInformation
exports.updateOnlineEngagementInformation = async (req, res) => {
  try {
    const updatedRecord = await OnlineEngagementInformation.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete OnlineEngagementInformation
exports.deleteOnlineEngagementInformation = async (req, res) => {
  try {
    await OnlineEngagementInformation.findByIdAndDelete(req.body.documentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
