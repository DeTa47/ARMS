const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: [{
        name: String,
        routes: [{
            tableName: String,
            route: String,
        }]
    }]
});

const GroupDetails = mongoose.model('GroupDetails', groupSchema);

module.exports = GroupDetails;