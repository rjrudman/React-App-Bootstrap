var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var DefinePlugin = require("webpack/lib/DefinePlugin");

var defaultConfig = require('./webpack.config.js');

defaultConfig.plugins.push(
    new UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
defaultConfig.plugins.push(new DefinePlugin({
    'process.env':{
        'NODE_ENV': JSON.stringify('production')
    }
}));

module.exports = defaultConfig;