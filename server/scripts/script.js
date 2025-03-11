require('dotenv').config({path: '../.env'});
const GroupDetails = require('../schema/Groups');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI).then(() => {
    console.log('Connected to MongoDB');
    insertData();
    console.log('Data inserted');
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
}).catch((err) => {
    console.error(err);
});

const insertData = async() => {
    const group = new GroupDetails({
        groupName: [{
            name: "Research and Consultancy",
            routes: ["/research-projects", "/consultancy-projects", "/tab-data"]
        }]
    });

    await group.save();
}

