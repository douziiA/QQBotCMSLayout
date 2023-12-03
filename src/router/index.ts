import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/page/Home.vue";
import Log from "@/page/Log.vue";
import Plugin from "@/page/Plugin.vue";


export default createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: '/',
            component: Home,
            name: "home",
            meta:{
                title: "机器人列表",
                icon: "HomeFilled"
            }
        },
        {
            path: '/plugin',
            component: Plugin,
            name: "plugin",
            meta:{
                title: "插件",
                icon: "Coin"
            }
        },
        {
            path: '/log/:qq',
            component: Log,
            name: "log",
            meta:{
                hidden: true,
                title: "日志",
                icon: "InfoFilled"
            }
        }
    ]
})
