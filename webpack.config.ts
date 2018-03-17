import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

const packageJSON = require('./package.json')

export const PORT = process.env.PORT || 1337

export const CONFIG: webpack.Configuration = {
	entry: './src/index.tsx',

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]-[hash].js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.pcss', '.css']
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loaders: ['ts-loader']
			},
			{
				test: /\.pcss$/,
				use: ['css-loader', 'postcss-loader'].map(loader => ({
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
		})
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
