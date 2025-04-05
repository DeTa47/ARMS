const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const File = require('../schema/FileSchema');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
         
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['application/pdf', 'image/jpeg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only .pdf and .jpg files are allowed!'));
        }
    },
});

const checkFileMiddleware = async (req, res, next) => {
    try {
        if (req.file) {
            const { filename, originalname, mimetype, size, path: filePath } = req.file;
            

            // Save file metadata to MongoDB
            const file = new File({
                fileName: `${Date.now()}-${originalname}`,
                originalName:originalname,
                contentType: mimetype,
                size,
                path: filePath,
            });

            await file.save();


            req.fileId= file._id;
        } else {
            console.warn('No file found in the request');
        }
        next();
    } catch (error) {
        console.error('Error in checkFileMiddleware:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = { checkFileMiddleware, upload, File, router };
