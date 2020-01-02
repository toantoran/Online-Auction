const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./public/img/subcate`;
        const exist = fs.existsSync(dir);
        if (!exist) {
            fs.mkdirSync(dir);
            return cb(null, dir);
        }
        return cb(null, dir);
    },
    filename: function (req, file, cb) {
        const cateID = req.params.cateID;
        const subcateID = req.body.subCateIDAdd? req.body.subCateIDAdd : req.params.subcateID;
        cb(null, `${cateID}-${subcateID}` + '.jpg');
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