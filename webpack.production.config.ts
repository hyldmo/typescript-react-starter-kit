import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as webpack from 'webpack'
import baseConfig from './webpack.config'

(baseConfig.module.rules[1] as any).use.unshift(MiniCssExtractPlugin.loader)

const config: webpack.Configuration = {
	...baseConfig,
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		...baseConfig.plugins
	]
}

module.exports = config
