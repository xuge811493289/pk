const fs = require('fs-extra');
var path = require('path');
const themePre = "export default "
const chartset = '@charset "UTF-8";'

var myPath = path.join(__dirname, '../src/css/theme.css'),
    outPath = path.join(__dirname, '../src/theme/theme.js'),
    style = fs.readFileSync(myPath, 'utf8').replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, '');
fs.writeFileSync(outPath, themePre + "`" + style + "`");
console.log('> theme-success           ', outPath);

var elementPath = path.join(__dirname, '../src/css/element-ui.css'),
    outElenentPath = path.join(__dirname, '../src/theme/element.js'),
    style = fs.readFileSync(elementPath, 'utf8').replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, '');
fs.writeFileSync(outElenentPath, themePre + "`" + chartset + style + "`");
console.log('> element-ui-success      ', elementPath);

var baseStyle = path.join(__dirname, '../src/css/base.css'),
    resetStyle = path.join(__dirname, '../src/css/base.css'),
    outElenentPath = path.join(__dirname, '../src/theme/base.js'),
    style = fs.readFileSync(baseStyle, 'utf8').replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, '') +
    fs.readFileSync(resetStyle, 'utf8').replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, '');
fs.writeFileSync(outElenentPath, themePre + "`" + chartset + style + "`");
console.log("> base+reset-success      ", baseStyle);