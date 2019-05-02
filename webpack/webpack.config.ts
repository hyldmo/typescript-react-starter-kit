import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import jestConfig from '../jest.config.js'
import packageJSON from '../package.json'
const HashAllModulesPlugin = require('hash-all-modules-plugin')
import { getFolders } from '../src/utils/webpack'
import tsConfig from '../tsconfig.json'

const context = path.resolve(__dirname, '../')

const config: webpack.Configuration = {
	entry: './src/index.tsx',
	context,

	resolve: {
		alias: getFolders(path.join(context, tsConfig.compilerOptions.baseUrl)),
		extensions: jestConfig.moduleFileExtensions.map(ext => `.${ext}`)
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.less$/,
				use: [
					...['css-loader', 'postcss-loader', 'less-loader'].map(loader => ({
						loader,
						options: { sourceMap: true }
					}))
				]
			},
			{
				test: /\.lazybundle\.js$/,
				use: [
					{
						loader: 'bundle-loader',
						options: {
							lazy: true,
							name: '[name]'
						}
					}
				]
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
		new webpack.HashedModuleIdsPlugin(),
		new HashAllModulesPlugin()
	],

	optimization: {
		runtimeChunk: 'single',
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

export default config
