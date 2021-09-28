var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

/* Empty JS object to act as endpoint for all routes */
let geonamesAPIEndpoint, weatherAPIEndpoint, pixybayAPIEndpoint

// API keys
apiKeys = {
    GEONAMES_USERNAME: process.env.GEONAMES_USERNAME,
    WEAHTERBIT_KEY: process.env.WEAHTERBIT_KEY,
    PIXYBAY_KEY: process.env.PIXYBAY_KEY
}

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('dist'));

// app.use(express.static(__dirname + '/public'));
console.log("HERE:" + __dirname);

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', function () {
    console.log(`Running on localhost: ${PORT}`);
})

app.get('/getApiKey', function (req, res) {
    res.send(apiKeys);
})

app.post('/postCordinates', function (req, res) {
    geonamesAPIEndpoint = req.body;
    console.log(geonamesAPIEndpoint)
    res.end(JSON.stringify({ status: 200, message: "success", geonamesAPIEndpoint: geonamesAPIEndpoint })
    )
})

app.get('/getCordinates', function (req, res) {
    res.send(geonamesAPIEndpoint);
})

app.post('/postweather', function (req, res) {
    weatherAPIEndpoint = req.body;
    console.log(weatherAPIEndpoint)
    res.end(JSON.stringify({ status: 200, message: "success", geonamesAPIEndpoint: geonamesAPIEndpoint })
    )
})

app.get('/getImgURL', function (req, res) {
    res.send(pixybayAPIEndpoint);
})

app.post('/postImgURL', function (req, res) {
    pixybayAPIEndpoint = req.body;
    console.log(pixybayAPIEndpoint)
    res.end(JSON.stringify({ status: 200, message: "success", geonamesAPIEndpoint: geonamesAPIEndpoint })
    )
})