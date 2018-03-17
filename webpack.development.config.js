'use strict';

const CONFIG = require('./webpack.config');
const webpack = require('webpack');

module.exports = Object.assign(CONFIG, {
    entry: {
        hmr: 'react-hot-loader/patch',
        app: CONFIG.entry,
    },

    output: Object.assign(CONFIG.output, {
        publicPath: `http://localhost:${CONFIG.devServer.port}/`,
    }),

    devtool: 'cheap-eval-source-map',

    devServer: {
        historyApiFallback: true,
        port: CONFIG.devServer.port,
        hotOnly: true,
        overlay: true,
        stats: CONFIG.stats
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
            },
            {

                test: /\.pcss$/,
                exclude: ['node_modules'],
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    ...CONFIG.module.rules,
                ]
            }
        ]
    },

    plugins: [
        ...CONFIG.plugins,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => module.context && module.context.includes("node_modules")
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChucks: Infinity
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
