const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    key: String,
    fileName: String,
    originalName: String,
    contentType: String,
    size: Number,
    path: String,
});

module.exports = mongoose.model('File',fileSchema);