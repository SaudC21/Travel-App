const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const fileLoader = require('file-loader')

module.exports = {
    entry: ['regenerator-runtime/runtime.js', './src/client/index.js'],
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    devServer: {
        port: process.env.PORT || 5000,
        setup(app) {
            const bodyParser = require('body-parser');
            const cors = require('cors');
            const dotenv = require('dotenv');

            let geonamesAPIEndpoint, weatherAPIEndpoint, pixabayAPIEndpoint

            dotenv.config();

            app.use(bodyParser.urlencoded({
                limit: '50mb',
                extended: true,
                parameterLimit: 50000
            }));
            app.use(bodyParser.json({ limit: '50mb' }));
            app.use(cors());

            let apiKeys = {
                GEONAMES_USERNAME: process.env.GEONAMES_USERNAME,
                WEAHTERBIT_KEY: process.env.WEAHTERBIT_KEY,
                PIXABAY_KEY: process.env.PIXABAY_KEY
            }

            print()

            // -------- GET/POST requestes -------- //
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

            app.get('/getWeather', function (req, res) {
                res.send(weatherAPIEndpoint);
            })

            app.post('/postImgURL', function (req, res) {
                pixabayAPIEndpoint = req.body;
                console.log(pixabayAPIEndpoint)
                res.end(JSON.stringify({ status: 200, message: "success", geonamesAPIEndpoint: geonamesAPIEndpoint })
                )
            })

            app.get('/getImgURL', function (req, res) {
                res.send(pixabayAPIEndpoint);
            })

            function print() {
                console.log(`
                    Server Side
                `)
            }
        }
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}
