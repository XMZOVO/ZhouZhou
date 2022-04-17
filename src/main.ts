import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'
import { Router } from './router';

createApp(App).use(createPinia()).use(Router).mount('#app')
