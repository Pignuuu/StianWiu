import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import drag from "v-drag"

createApp(App).use(drag).use(store).use(router).mount('#app')
