import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/page/Home.vue";
import LoginPage from "@/page/LoginPage.vue";


export default createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: '/',
            component: Home,
            name: "首页",
            meta:{
                icon: "HomeFilled"
            }
        },
        {
            path: '/login',
            component: LoginPage,
            name: "登录"
        }
    ]
})