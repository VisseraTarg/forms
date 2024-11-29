import './assets/main.css'

import { createApp } from 'vue'
import App from './FinalForm.vue'

import { createPinia } from 'pinia'

import { createRouter, createWebHistory } from 'vue-router'
import Step1 from '@/components/Step1.vue'
import Step2 from '@/components/Step2.vue'
import Step3 from '@/components/Step3.vue'

const routes = [
    {
        name: 'pageZero',
        path: '/',
        redirect: '/page_1',
    },
    {
        name: 'Страница 1',
        path: '/page_1',
        component: Step1,
    },
    {
        name: 'Страница 2',
        path: '/page_2',
        component: Step2,
    },
    {
        name: 'Страница 3',
        path: '/page_3',
        component: Step3,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
export { routes }

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')