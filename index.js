const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');

// middlewares
const verifyFilePayload = require('./middleware/verifyFilePayload');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');
const fileExtensionLimiter = require('./middleware/fileExtensionLimiter');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.post('/upload', 
    fileUpload({ createParentPath: true }),
    verifyFilePayload,
    fileExtensionLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files;

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name);
            files[key].mv(filepath, (err) => {
                if(err) return res.status(500).json({ status: 'error', message: err });

            })
        })
        return res.json({ status: 'success', message: Object.keys[files].toString() });
        console.log(files);
    }
)

app.listen(3000, () => {
    console.log('Server Running on PORT: 3000');
})
