const mongoose = require('mongoose');

const UserRolesSchema = new mongoose.Schema({

    User: {type: Array},
    Individual: {type: Array},
    Organization: {type: Array},
})

module.exports = ('UserRoles', UserRolesSchema);