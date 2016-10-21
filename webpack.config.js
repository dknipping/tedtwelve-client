var ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require("path"),
    webpack = require("webpack");

var indexJs = path.resolve(__dirname, "./lib/index.js");

module.exports = {
    "index": indexJs,
    "entry": ["babel-polyfill", indexJs],
    "devtool": "inline-source-map",
    "output": {
        "path": path.resolve(__dirname, "build"),
        "filename": "js/bundle.js"
    },
    "resolve": {
        "alias": {
            "survey": "survey-react-bootstrap/dist/survey.react.bootstrap.js",
            "jquery": "jquery/dist/jquery.min.js"
        }
    },
    "module": {
        "loaders": [
            { "test": /\.jsx?$/, "loader": "babel", "exclude": /node_modules/ },
            { "test": /\.scss$/, "loader": ExtractTextPlugin.extract(["style-loader"], "css-loader!sass-loader") },
            { "test": /\.css$/, "loader": "style-loader!css-loader" },
            { "test": /\.(jpg|png|gif)$/, "loader": "file?name=[path][name].[hash].[ext]", "include": path.resolve(__dirname, "images") }
        ]
    },
    "plugins": [
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            "React": "react",
            "jQuery" : "jquery"
         })
    ]
};
