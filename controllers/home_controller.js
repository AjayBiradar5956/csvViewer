const File = require('../models/file');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

module.exports.home = function (req, res) {
    File.find({})
        .then((files) => {
            return res.render('home', {
                files: files,
                showHeader: true,
            });
        }).catch((err) => {
            console.log("trouble finding files in db", err);
        })
}

module.exports.delete = function (req, res) {
    File.findById(req.params.id)
        .then((file) => {
            File.deleteOne(file)
                .then(() => {
                    return res.redirect('/');
                })
                .catch((err) => {
                    return console.log("file deletion unsuccessful", err);
                })
        }).catch((err) => {
            console.log("file not deleted");
            return res.redirect("/");
        })
}

module.exports.upload = async function (req, res) {
    try {
        File.uploadedFile(req, res, function (err) {
            if (err) {
                return console.log(err, "multer controller");
            }
            File.create(req.file)
                .then((file) => {
                    return res.redirect('/');
                }).catch((err) => {
                    return console.log(err, "error in create a file doc in db");
                })
        })
    } catch (err) {
        if (err) {
            return console.log("error in uploading the file");
        }
    }
}

module.exports.view = function (req, res) {
    let filename = path.join('uploads/files', req.params.id);
    let results = [];
    fs.createReadStream(filename)
        .pipe(csv({ headers: true }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.render('lookup', {
                table: results,
                showHeader: false,
            });
        });
};
