import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/deviceManagement',
      name: 'deviceManagement',
      component: () => import('./views/deviceManagement.vue'),
      redirect:'/deviceManagement/safe',
      children:[
          {
              path:'safe',
              component:()=>import('./components/deviceManage/safe.vue')
          },{
              path:"alar",
              component:()=>import('./components/deviceManage/alar.vue')
          },{
              path:'dict',
              component:()=>import('./components/deviceManage/dict.vue')
          },{
              path:'equinf',
              component:()=>import('./components/deviceManage/equinf.vue')
          },{
              path:"equout",
              component:()=>import('./components/deviceManage/equout.vue')
          },{
              path:"para",
              component:()=>import('./components/deviceManage/para.vue')
          },{
              path:'prot',
              component:()=>import('./components/deviceManage/prot.vue')
          }
      ]
    }
  ]
})
