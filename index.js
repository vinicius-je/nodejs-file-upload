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
        console.log(files);
    }
)

app.listen(3000, () => {
    console.log('Server Running on PORT: 3000');
})
