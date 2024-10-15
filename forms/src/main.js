import './assets/main.css'

import {createApp} from 'vue'
import App from './FinalForm.vue'

import { createPinia } from 'pinia'

import {createRouter, createWebHistory} from "vue-router";
import Step1 from "@/components/Step1.vue";
import Step2 from "@/components/Step2.vue";
import Step3 from "@/components/Step3.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'pageOne',
            path: '/page_1',
            component: Step1
        },
        {
            name: 'pageTwo',
            path: '/page_2',
            component: Step2
        },
        {
            name: 'pageThree',
            path: '/page_3',
            component: Step3
        }
    ]
})

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')