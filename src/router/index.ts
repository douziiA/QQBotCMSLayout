import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/page/Home.vue";
import Log from "@/page/Log.vue";


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
            path: '/log',
            component: Log,
            name: "日志",
            meta:{
                icon: "InfoFilled"
            }
        }
    ]
})