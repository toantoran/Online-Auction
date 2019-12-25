const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const id = req.body.id;
        const dir = `./public/img/product/${id}`;
        console.log(dir);
        const exist = fs.existsSync(dir);
        if (!exist) {
            console.log("1");
            fs.mkdirSync(dir);
            return cb(null, dir);
        }
        console.log("2");
        return cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const limits = {
    fileSize: 3000000
};

function fileFilter(req, file, cb) {

    const {
        mimetype
    } = file;
    if (mimetype === 'image/png' || mimetype === 'image/jpeg') {
        return cb(null, true);
    }

    cb(new Error('I don\'t have a clue!'))
}

const upload = multer({
    storage,
    limits,
    fileFilter,
})

module.exports = upload;