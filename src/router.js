import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/queue',
    name: 'Queue',
    component: () => import('@/views/Queue'),
    props: true
  }, {
    path: '/match',
    name: 'Match',
    component: () => import('@/views/Match')
  }]
})
