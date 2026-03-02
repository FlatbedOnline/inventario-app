import { createRouter, createWebHistory } from 'vue-router'
import Assignments from '../views/Assignments.vue'
import Employees from '../views/Employees.vue'
import Assets from '../views/Assets.vue'

const routes = [
  	{ path: '/', component: Assignments },
  	{path: '/employees', component: Employees},
  	{path: '/assets', component: Assets}
	

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
