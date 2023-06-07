import { createRouter, createWebHistory } from 'vue-router'
import CalcScreen from '../components/CalcScreen.vue'
import ItemScreen from '../components/ItemScreen.vue'
import HomeScreen from '../components/HomeScreen.vue'
import SpellScreen from '../components/SpellScreen.vue'

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
    {
        path: '/',
        name: 'Home',
        component: HomeScreen
    },
    {
        path: '/loot',
        name: 'Loot',
        component: CalcScreen,
        props: {
            items: [],
            tagList: []
        }
    },
    {
        path: '/items',
        name: 'Items',
        component: ItemScreen
    },
    {
        path: '/spells',
        name: 'Spells',
        component: SpellScreen
    },
    ]
})

export default router