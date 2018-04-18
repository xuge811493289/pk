var fs = require('fs-extra')
var path = require('path')

let temp = {
    templ: `
    window.ShiYue = {
        base: #sy-api-host#,
        pageSize: 30,
        notAllowUpload: ['jspx', 'jsp', 'exe']
    }`,
    temp1: `
    window.ShiYue = {
        base: '',
        pageSize: 30,
        notAllowUpload: ['jspx', 'jsp', 'exe']
    }`,
    temp2: `
    var dev = window.localStorage.getItem('currentHost') || 'http://10.0.7.100:18900';
    window.ShiYue = {
        base: dev,
        pageSize: 30,
        notAllowUpload: ['jspx', 'jsp', 'exe']
    }`,
    datas: {
        production: {
            'sy-api-host': ''
        },
        development: {
            'sy-api-host': 'dev'
        }
    }
};

let templ = temp.templ,
    datas = temp.datas[process.env.NODE_ENV || 'development'];

for (let d in datas) {
    let v = process.env['npm_config_' + d.replace(/\-/gi, '_')];
    if (v != undefined) {
        datas[d] = v;
    }
    templ = templ.replace(new RegExp('\#' + d + '\#', 'gi'), ('\'' + datas[d] + '\''));
}

let temps = process.env.NODE_ENV === 'production' ? temp.temp1 : temp.temp2

fs.writeFileSync(path.join(__dirname, '../static/js/sy-config.js'), temps);

console.log('> sy-config-success       ', path.join(__dirname, '../static/js/sy-config.js'));