var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true, //just run once by default
        frameworks: ['mocha', 'chai'], //use the mocha test framework
        files: [
            './lib/**/*.spec.js' //just load this file
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // add webpack as preprocessor
            "./lib/**/*.spec.js": ["webpack"]
        },
        reporters: ['dots'], //report results in this format
        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                loaders: [
                    {test: /\.js$/, loader: 'babel-loader'}
                ]
            }
        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },
        plugins: [
            require("karma-chai"),
            require("karma-phantomjs-launcher"),
            require("karma-mocha"),
            require("karma-mocha-reporter"),
            require("karma-webpack"),
            require("express")
        ],

        // test results reporter to use
        // possible values: "dots", "progress"
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["mocha"],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO
    });
};
