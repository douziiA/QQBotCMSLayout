import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/page/Home.vue";
import Log from "@/page/Log.vue";


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
