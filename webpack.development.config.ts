import * as webpack from 'webpack'
import baseConfig from './webpack.config'

(baseConfig.module.rules[1] as any).use.unshift('style-loader') // Used to load CSS on dev-server

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
