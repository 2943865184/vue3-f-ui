import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import MyKit from '../packages/index';

const app = createApp(App)
app.use(MyKit)
app.use(router)
app.mount('#app')
