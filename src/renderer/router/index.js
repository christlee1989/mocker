import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '../components/Welcome.vue'
import Setting from '../components/Setting.vue'
import Home from '../components/Home.vue'
import DefaultMain from '../components/DefaultMain.vue'
import NewProject from '../components/NewProject.vue'
import NewService from '../components/NewService.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path:'/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path:'/home',
      component: Home,
      children:[{
        path:'',
        name: 'DefaultMain',
        component: DefaultMain
      },
      {
        path:'new/:projectId',
        name: 'New',
        component: NewProject
      },
      {
        path:'new_service/:serviceId',
        name: 'NewService',
        component: NewService
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
