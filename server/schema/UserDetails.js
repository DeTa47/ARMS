const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    OrgName: {type: String},
    OrgAddress: {type: String},
    OrgCity: {type: String},
});

const IndividualSchema = new mongoose.Schema({
    IndName: {type: String},
    IndAddress: {type: String},
    IndCity: {type: String},
});

const AdminSchema = new mongoose.Schema({
    AdminName: {type: String},
    AdminEmail: {type: String},
    AdminPassword: {type: String}
})

const UserDetailsSchema = new mongoose.Schema({
    CustomerType: String,
    Organization: {
        type: OrganizationSchema,
        required: false
    },
    Individual: {
        type: IndividualSchema,
        required: false
    },

    Admin: {
        type: AdminSchema,
        required: false,        
    },

    EmailVerification: Boolean,
    
    MobileNumberVerification: Boolean,

    RegisteredOn: {type: Date,
        default: Date.now,
    },

    Status: String,

    RemarkForRejection: String,

    ProcessedOn: Date
});

module.exports = mongoose.model('UserDetails', UserDetailsSchema);