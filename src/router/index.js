import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import todoList from "@/view/todoList"
import login from "@/view/login"
import store from '../store/index.js';
Vue.use(Router)

function bfRouter(to, from, next) {
  if (store.state.user_id) {
    next();
  } else {
    router.push({path:"/"})
  }
}


var router = new Router({
  mode: 'history',
  routes: [
    {path: '/index',name: 'todoList',component: todoList,beforeEnter: bfRouter},
    {path: '/',name: 'login',component: login},
  ]
})

export default router
