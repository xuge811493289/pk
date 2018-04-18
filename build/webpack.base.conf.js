var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var _config = require('./sy-config')
var theme = require('./theme.js')
var router = require('./router.js')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	externals: {
		jquery: 'window.jQuery',
		axios: 'axios',
		moment: 'moment',
		lodash: '_',
		qs: 'Qs',
		echarts: 'echarts',
		sortablejs: 'Sortable',
		'js-cookie': 'Cookies',
		screenfull: 'screenfull',
		vue: 'Vue',
		vuex: 'Vuex',
		'vue-router': 'VueRouter',
		'vue-i18n': 'VueI18n',
		'element-ui': 'ELEMENT',
		'ecloud-ui': 'ECLOUD'
	},
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.css'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'src': resolve('src'),
			'static': resolve('static'),
			'api': resolve('src/api'),
			'root': resolve(''),
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('images/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	}
}