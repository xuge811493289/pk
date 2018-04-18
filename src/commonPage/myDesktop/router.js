const Index = () => import('./Index.vue');

let routes = [{
        path: '/desktop',
        name: 'desktop',
        component: Index,
    },
    { path: '/', redirect: '/desktop' } // 重定向
];

export default routes