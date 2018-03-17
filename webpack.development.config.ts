import * as webpack from 'webpack'
import { CONFIG, PORT } from './webpack.config'

(CONFIG.module.rules[1] as any).use.unshift('style-loader')

const config: webpack.Configuration  = {
	...CONFIG,
	mode: 'development',
	devtool: 'cheap-eval-source-map',

	devServer: {
		historyApiFallback: true,
		port: PORT,
		hot: true,
		overlay: true,
		stats: CONFIG.stats
	},

	plugins: [
		...CONFIG.plugins,
		new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = config
