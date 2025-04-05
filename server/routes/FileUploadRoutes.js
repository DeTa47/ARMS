const express = require('express');
const router = express.Router();
const { uploadFile, deleteFile, getFileMetada, downloadFile } = require('../controllers/FileUploadController');
const { upload, checkFileMiddleware } = require('../middleware/checkFile');

router.post('/upload', upload.single('file'), checkFileMiddleware, uploadFile);
router.delete('/upload', deleteFile);
router.post('/getuploadedfilemetadata', getFileMetada);

router.get('/download/:fileId', downloadFile); 

module.exports = router;
