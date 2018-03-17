const CONFIG = require('./webpack.config.ts')
const webpack = require('webpack')

CONFIG.module.rules[1].use.unshift('style-loader')

module.exports = Object.assign(CONFIG, {
	mode: 'development',
	devtool: 'cheap-eval-source-map',

	devServer: {
		historyApiFallback: true,
		port: CONFIG.devServer.port,
		hot: true,
		overlay: true,
		stats: CONFIG.stats
	},

	plugins: [
		...CONFIG.plugins,
		new webpack.HotModuleReplacementPlugin()
	]
})
