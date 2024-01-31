import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes = Object.freeze([
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/single-component',
    name: 'Self-Contained Component',
    component: () => import('../views/SelfContained.vue')
  },
  {
    path: '/primitive-props',
    name: 'Primitive Props',
    component: () => import('../views/PrimitivePropView.vue')
  },
  {
    path: '/shallow-object-prop',
    name: 'Shallow Object Prop with useModel',
    component: () => import('../views/ShallowObjectPropViewWithUseModel.vue')
  },
  {
    path: '/about',
    name: 'About',
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
