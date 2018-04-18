var fs = require('fs-extra')
var path = require('path')

function getFileStr(imports, routers) {
    if (!routers || routers.length == 0) {
        return 'export default []';
    }
    return imports.join('\n') + '\n\nexport default [\n\t...' + routers.join(',\n\t...') + '\n]';
}

let _p = path.join(__dirname, '../src/page/'),
    _import = [],
    _router = [];

if (fs.existsSync(_p)) {
    fs.readdirSync(_p).forEach((el, i) => {
        let _path = ('../src/page/' + el + '/router.js');
        if (el != '.svn' && fs.existsSync(path.join(__dirname, _path))) {
            _router.push(el);
            _import.push('import ' + el + ' from "' + _path.replace('/src/', '/') + '";');
        }
    });
}

fs.writeFileSync(path.join(__dirname, '../src/router/routers.js'), getFileStr(_import, _router));

console.log('> router-success          ', path.join(__dirname, '../src/router/routers.js'));