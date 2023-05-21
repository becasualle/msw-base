import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {worker} from './mocks/browser.js'

if (process.env.NODE_ENV === 'development'){
  worker.start()
}

console.log(worker);

createApp(App).mount('#app')
