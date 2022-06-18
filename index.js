const express = require('express');
const app = express();
const path = require('path');
const dileUpload = require('path');

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(3000, () => {
    console.log('Server Running on PORT: 3000');
})
