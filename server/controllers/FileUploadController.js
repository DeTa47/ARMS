const fs = require('fs');
const File = require('../middleware/checkFile').File;
const FileSchema = require('../schema/FileSchema');

const uploadFile = (req, res) => {

   
    if (req.fileId || req[Object.keys(req.body)[0]]) {

        res.status(200).send({ 
            message: 'File uploaded successfully', 
            fileId: req.fileId || req[Object.keys(req.body)[0]] 
        });



    } else {
        res.status(400).send({ message: 'No file uploaded or invalid key' });
    }
};

const downloadFile = async (req, res) => {
    const { fileId } = req.params;
    try {
        const file = await FileSchema.findById(fileId);
        if (!file) {
            return res.status(404).send({ message: 'File not found' });
        }
        res.download(file.path, file.originalname);
    } catch (error) {
        console.error('Error in file download:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getFileMetada = async (req, res) => {
    try {
        const file = await FileSchema.findById(req.body.fileId);
        if (!file) {
            return res.status(404).send('File not found');
        }
        res.json(file);
    } catch (error) {
        console.error('Error fetching file metadata:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteFile = async (req, res) => {
    console.log('Delete file request received:', req.body);
    const { fileId } = req.body;

    if (!fileId) {
        return res.status(400).send({ message: 'File ID is required' });
    }

    try {
        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).send({ message: 'File not found' });
        }

        // Delete the file from the disk
        fs.unlink(file.path, async (err) => {
            if (err) {
                console.error('Error deleting file from disk:', err);
                return res.status(500).send({ message: 'Error deleting file from disk' });
            }

            // Delete the file document from the database
            await File.findByIdAndDelete(fileId);
            res.status(200).send({ message: 'File deleted successfully' });
        });
    } catch (error) {
        console.error('Error in DELETE /upload:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = { uploadFile, deleteFile, getFileMetada, downloadFile };