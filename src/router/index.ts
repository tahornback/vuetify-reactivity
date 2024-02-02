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
    component: () => import('../views/SelfContainedView.vue')
  },
  {
    path: '/primitive-props',
    name: 'Primitive Props',
    component: () => import('../views/PrimitivePropsView.vue')
  },
  {
    path: '/shallow-object-prop',
    name: 'Shallow Object Prop',
    children: [
      {
        path: '/shallow-object-prop/useModel',
        name: 'Shallow Object Prop with useModel',
        component: () => import('../views/shallowObject/ShallowObjectPropViewWithUseModel.vue')
      },
      {
        path: '/shallow-object-prop/watch',
        name: 'Shallow Object Prop with watch',
        component: () => import('../views/shallowObject/ShallowObjectPropViewWithWatch.vue')
      },
      {
        path: '/shallow-object-prop/custom',
        name: 'Shallow Object Prop with custom',
        component: () => import('../views/shallowObject/ShallowObjectPropViewWithCustom.vue')
      },
      {
        path: '/shallow-object-prop/custom-composable',
        name: 'Shallow Object Prop with custom composable',
        component: () => import('../views/shallowObject/ShallowObjectPropViewWithCustomComposable.vue')
      }
    ]
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
