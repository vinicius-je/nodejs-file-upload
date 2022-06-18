const MB = 5;
const FILE_SIZE_LIMIT = MB  * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
    const files = req.files;
    const filesOverLimit = [];
    // Select files over the limit size
    Object.keys(files).forEach(key => {
        if(files[key].size > FILE_SIZE_LIMIT)
            filesOverLimit.push(files[key].name);
    });

    if(filesOverLimit.length){
        const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

        const setence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MD.`.replace(",", ", ");

        const message = filesOverLimit.length < 3 ? setence.replace(",", " and") : setence.replace(/,(?=[^,]*$)/, " and");

        return res.status(413).json({ status: 'error', message});
    }

    next();
}

module.exports = fileSizeLimiter;