import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

import Modal from './components/modal/index.vue'

import App from './App.vue'

createApp(App)
    .use(ElementPlus) 
    .use(VueAxios, axios)
    .component('Modal', Modal)   
    .mount('#app')
