import { createRouter, createWebHistory } from 'vue-router'
import TheUsersPage from './pages/users/TheUsersPage.vue'

const routes = [
    {
      path: '/',
      redirect: '/cards'
    },
    {
      path: '/cards',
      name: 'Cards',
      component: TheUsersPage
    },
    {
      path: '/list',
      name: 'List',
      component: TheUsersPage
    }
]
  
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router