const express = require('express');
const app = express();
const path = require('path');
const dileUpload = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.listen(3000, () => {
    console.log('Server Running on PORT: 3000');
})
