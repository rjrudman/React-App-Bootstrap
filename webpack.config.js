var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var getEntryPoints = require('./scripts/webpack-tools/getEntryPoints.js'); 

module.exports = {  
    entry: getEntryPoints({
        styles: './scripts/styles.entry.js',
        vendor: ['react', 'react-dom']
    }),
    output: {
        filename: './dist/[name].js'
    },
    node: {
        fs: "empty"
    },
    devtool: "source-map",
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./dist/main.css', {
            allChunks: true
        }),
        new CommonsChunkPlugin('vendor', './dist/commons.chunk.js')
    ]
}