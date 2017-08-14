'use strict';

const CONFIG = require('./webpack.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = Object.assign(CONFIG, {

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.pcss$/,
                exclude: ['node_modules'],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: CONFIG.module.rules
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        ...CONFIG.plugins
	]
});
