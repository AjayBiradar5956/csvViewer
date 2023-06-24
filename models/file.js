const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads/files');

const fileScehma = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    }
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', FILE_PATH));
    },
    filename: function (req, file, cb) {
        const originalName = path.parse(file.originalname).name;
        cb(null, originalName + '-' + Date.now());
    }
});


fileScehma.statics.uploadedFile = multer({ storage: storage }).single('file');
fileScehma.statics.filePath = FILE_PATH;

const File = mongoose.model('file', fileScehma);
module.exports = File;