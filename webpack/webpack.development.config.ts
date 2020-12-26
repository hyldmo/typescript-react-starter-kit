import webpack from 'webpack'
import baseConfig from './webpack.config'

((baseConfig.module.rules[1] as webpack.RuleSetRule).use as webpack.RuleSetUseItem[]).unshift('style-loader')

const config: webpack.Configuration = {
	...baseConfig,
	mode: 'development',
	devtool: 'eval-cheap-source-map',

	resolve: {
		...baseConfig.resolve,
		alias: {
			...baseConfig.resolve.alias,
			'react-dom': '@hot-loader/react-dom'
		}
	},

	output: {
		publicPath: '/',
		filename: '[name]-[hash].js'
	},

	devServer: {
		historyApiFallback: true,
		port: 1337,
		overlay: true,
		stats: baseConfig.stats as any
	}
}

module.exports = config
