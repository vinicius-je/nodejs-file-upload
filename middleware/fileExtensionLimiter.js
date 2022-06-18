const path = require('path');

const fileExtensionLimiter = (allowedExtensions) => {
    return (req, res, next) => {
        const files = req.files;
        const fileExtensions = [];
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name));
        });

        const allowed = fileExtensions.every(ext => allowedExtensions.includes(ext));

        if(!allowed){
            const message = `Upload failed. Only ${allowedExtensions.toString()} files allowed.`.replace(",", ". ");
            return res.status(422).json({ status: "error", message});
        }

        next();
    }
}

module.exports = fileExtensionLimiter;