import { createRouter, createWebHistory } from 'vue-router'
import Assignments from '../views/Assignments.vue'
import Employees from '../views/Employees.vue'


const routes = [
  { path: '/', component: Assignments },
  {path: '/employees', component: Employees}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
