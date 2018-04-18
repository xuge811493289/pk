const Login = () => import('./src/Login.vue');
const ForgetPassword = () => import('./forgetPassword/index.vue');
let routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/forgetPassword',
        name: 'forgetPassword',
        meta: {
            noLoginRequired: true
        },
        component: ForgetPassword
    }
];

export default routes