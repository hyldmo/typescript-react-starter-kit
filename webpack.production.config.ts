import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as webpack from 'webpack'
import { CONFIG, PORT } from './webpack.config'

(CONFIG.module.rules[1] as any).use.unshift(MiniCssExtractPlugin.loader)

const config: webpack.Configuration = {
	...CONFIG,
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
	  	}),
		...CONFIG.plugins
	]
}

module.exports = config
