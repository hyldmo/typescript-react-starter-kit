const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const webpack = require('webpack')

const packageJSON = require('./package.json')

const port = process.env.PORT || 1337

module.exports = {
	entry: './src/index.tsx',

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name][hash].js'
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
					sourceMap: true
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
		]
	},

	plugins: [
		new CheckerPlugin(),
		new HtmlWebpackPlugin({
			title: packageJSON.name
				.split('-')
				.map(name => name.charAt(0).toUpperCase() + name.slice(1))
				.join(' '),
			version: packageJSON.version,
			template: 'static/index.ejs'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.PACKAGE_NAME': JSON.stringify(packageJSON.name),
			'process.env.PACKAGE_VERSION': JSON.stringify(packageJSON.version)
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			parallel: true
		})
	],

	stats: {
		assets: true,
		children: false,
		chunks: false,
		hash: false,
		modules: false,
		publicPath: true,
		timings: false,
		version: false,
		warnings: true
	}
}
