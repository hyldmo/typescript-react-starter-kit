import fs from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import packageJSON from './package.json'
import { BASE_URL } from './src/consts'
import tsConfig from './tsconfig.json'

const srcDirs = () => {
	const aliases: any = {}
	const baseUrl = path.join(__dirname, tsConfig.compilerOptions.baseUrl)
	fs.readdirSync(baseUrl)
		.forEach(uri => {
			uri = uri.split('.')[0]
			aliases[uri] = path.join(baseUrl, uri)
		})
	return aliases
}

const config: webpack.Configuration = {
	entry: './src/index.tsx',

	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: BASE_URL,
		filename: '[name]-[hash].js'
	},

	resolve: {
		alias: srcDirs(),
		extensions: packageJSON.jest.moduleFileExtensions.map(ext => `.${ext}`)
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'typings-for-css-modules-loader',
						options: {
							modules: true,
							namedExport: true,
							sourceMap: true
						}
					},
					...['postcss-loader', 'sass-loader'].map(loader => ({
						loader,
						options: { sourceMap: true }
					}))
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

export default config
