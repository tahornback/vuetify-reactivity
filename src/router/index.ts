import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes = Object.freeze([
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/single-component',
    name: 'Self-Contained Component',
    component: () => import('../views/SelfContained.vue')
  },
  {
    path: '/primitive-prop',
    name: 'Primitive Prop',
    component: () => import('../views/PrimitivePropView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
