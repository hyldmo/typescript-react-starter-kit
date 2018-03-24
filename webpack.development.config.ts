import * as webpack from 'webpack'
import baseConfig from './webpack.config'

const config: webpack.Configuration = {
	...baseConfig,
	mode: 'development',
	devtool: 'cheap-eval-source-map',

	devServer: {
		historyApiFallback: true,
		port: process.env.PORT || 1337,
		hot: true,
		overlay: true,
		stats: baseConfig.stats
	},

	plugins: [
		...baseConfig.plugins,
		new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = config
