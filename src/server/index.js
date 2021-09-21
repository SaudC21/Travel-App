var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

/* Empty JS object to act as endpoint for all routes */
articleData = {};

dotenv.config();
api_key = {
    api: process.env.API_KEY
}

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(bodyParser.json({limit:'50mb'}));
app.use(express.static('dist'));

// app.use(express.static(__dirname + '/public'));
console.log("HERE:" + __dirname);

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, '0.0.0.0', function () {
    console.log(`Running on localhost: ${PORT}`);
})

app.get('/getApiKey', function (req, res) {
    res.send(api_key);

})

app.get('/getData', function (req, res) {
    res.send(articleData);
})

app.post('/postData', function (req, res) {
    articleData = req.body;
    console.log('data posted to server');
    return articleData;
})

app.get('/data', function (req, res) {
    res.send(articleData);
})
