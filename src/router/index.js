import Vue from 'vue'
import VueRouter from 'vue-router'
import Reports from '../views/Reports.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/report/:id?',
    name: 'Report',
    component: () => import('../views/Report.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
