import { createRouter, createWebHistory } from 'vue-router'
import CirclesMenu from '../components/CirclesMenu.vue'
import LettersMenu from '../components/LettersMenu.vue'
import WritersMenu from '../components/WritersMenu.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        { path: '/', name:"Home", component: CirclesMenu },
        { path: '/circles',name:"Circles", component: CirclesMenu },
        { path: '/letters', name:"Letters",component: LettersMenu },
        { path: '/writers', name:"Writers", component: WritersMenu },
    ]
})
export default router