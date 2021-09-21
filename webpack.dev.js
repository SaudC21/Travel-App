const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
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

            dotenv.config();

            app.use(bodyParser.urlencoded({
                limit: '50mb',
                extended: true,
                parameterLimit: 50000
            }));
            app.use(bodyParser.json({limit:'50mb'}));
            app.use(cors());


            api_key = {
               api: process.env.API_KEY
            }

            articleData = {};

            app.get('/getApiKey', function (req, res) {
                res.send(api_key);
            })
            
            app.get('/getData', function (req, res) {
                console.log('Client recieved data');
                res.send(articleData);
            })
            
            app.post('/postData', function (req, res) {
                articleData = req.body;
                console.log('Data posted to server');
            })

            app.get('/data', function (req, res) {
                res.send(articleData);
            })
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
