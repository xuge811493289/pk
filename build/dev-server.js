require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var fs = require('fs-extra')
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf')
var os = require('os')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
app.use('/common', express.static('./common'))
var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

var network = os.networkInterfaces(),
    ip = 'localhost',
    uri = ('http://' + ip + ':' + port);

first: for (var i in network) {
    var wlans = network[i];
    for (var j = 0; j < wlans.length; j++) {
        var w = wlans[j];
        if (!w || !w.family || !w.address || w.family.toLocaleLowerCase() != 'ipv4' || w.address == '127.0.0.1') {
            continue;
        }
        ip = w.address;
        break first;
    }
}

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log("\n> --------------------------------------------------------------------\n> \t" +
        "EcloudApplication '" + process.env['npm_package_name'] + "' is running! Access URLs:\n> \t" +
        "Node.js: \t" + process.version + "\n> \t" +
        "Local: \t\t" + uri + "\n> \t" +
        "External: \t" + uri.replace('localhost', ip) + "\n> \t" +
        "Profile(s): \t" + process.env.NODE_ENV + "\n> \t" +
        "Module(s): \t[" + (function() {
            var _ = [];
            fs.readdirSync(path.join(__dirname, '../src/page/')).forEach((el, i) => {
            	if (el != '.svn' && fs.existsSync(path.join(__dirname, ('../src/page/' + el + '/router.js')))) {
                    _.push(el);
                }
            });
            return _;
        }()).join(', ') + "]\n> \t" +
        "WorkSpace: \t" + path.join(__dirname, '../src') + "\n" +
        "> --------------------------------------------------------------------");
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}