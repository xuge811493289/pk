const _import = require('@/router/' + process.env.NODE_ENV)

const DeskTop =  _import('page/desktop/Index');

let routes = [{
        path: '/desktop',
        name: 'desktop',
    component: DeskTop,
    },
    { path: '/', redirect: '/desktop' } // 重定向
];

export default routes