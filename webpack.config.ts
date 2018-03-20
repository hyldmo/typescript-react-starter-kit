const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const packageJSON = require('./package.json')

const port = process.env.PORT || 1337

module.exports = {
	entry: './src/index.tsx',

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]-[hash].js'
	},

	devServer: { port },

	resolve: {
		extensions: packageJSON.jest.moduleFileExtensions.map(ext => `.${ext}`)
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loaders: ['ts-loader']
			},
			{
				test: /\.scss$/,
				use: ['css-loader', 'sass-loader'].map(loader => ({
					loader,
					options: { sourceMap: true }
				}))
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: packageJSON.name
				.split('-')
				.map((name) => name.charAt(0).toUpperCase() + name.slice(1))
				.join(' '),
			version: packageJSON.version,
			template: 'static/index.ejs'
		}),
		new webpack.DefinePlugin({
			'process.env.PACKAGE_NAME': JSON.stringify(packageJSON.name),
			'process.env.PACKAGE_VERSION': JSON.stringify(packageJSON.version)
		}),
		new webpack.optimize.OccurrenceOrderPlugin()
	],

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: path.resolve(__dirname, 'node_modules'),
					name: 'vendor',
					enforce: true
				}
			}
		}
	},

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
