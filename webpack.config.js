'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const packageJSON = require('./package.json');

const port = process.env.PORT || 1337;

module.exports = {
    entry: './src/index.tsx',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    devServer: { port },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.pcss', '.css']
    },

    module: {
        rules: [
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    sourceMap: true,
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    config: {
                        path: './postcss.config.js'
                    }
                }
            }
        ],
    },

    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            title: packageJSON.name,
            template: 'static/index.ejs',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ 
            sourceMap: true,
            parallel: true
        })
    ]
};