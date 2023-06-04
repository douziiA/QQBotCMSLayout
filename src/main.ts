import { createApp } from 'vue'

import App from './App.vue'

//第三方
import ElementPlus from 'element-plus'
import Router from '@/router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



//css
import 'element-plus/dist/index.css'




const app = createApp(App);
app.use(ElementPlus)
app.use(Router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
