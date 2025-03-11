const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: [{
        name: String,
        routes: Array
    }]
});

const GroupDetails = mongoose.model('GroupDetails', groupSchema);

module.exports = GroupDetails;

    
