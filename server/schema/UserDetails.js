const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    OrganizationName: {type: String},
    OrganizationAddress: {type: String},
    OrganizationCity: {type: String},
    
});

const IndividualSchema = new mongoose.Schema({
    IndividualName: {type: String},
    IndividualAddress: {type: String},
    IndividualCity: {type: String},
});

const AdminSchema = new mongoose.Schema({
    AdminName: {type: String},
})

const UserDetailsSchema = new mongoose.Schema({
    CustomerType: {
        
        type: String,
        required: true,
        enum: ["Admin","Organization","Individual"]

    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
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

    EmailVerification: {
        type:Boolean,
        default: false

    },
    
    MobileNumberVerification: {
        type:Boolean,
        default: false

    },

    RegisteredOn: {
        type: Date,
        default: Date.now,
    },

    Status: {
        
        type:String,
        default: "Pending",
        enum:["Pending","Approved","Rejected"]
    },


    refreshToken: {
        type: String
    },

    RemarkForRejection: String,

    ApprovedOn: Date
});

module.exports = mongoose.model('UserDetails', UserDetailsSchema);