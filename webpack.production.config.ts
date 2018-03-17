const CONFIG = require('./webpack.config.ts')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

CONFIG.module.rules[1].use.unshift(MiniCssExtractPlugin.loader)

module.exports = Object.assign(CONFIG, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
	  	}),
		...CONFIG.plugins
	]
})
