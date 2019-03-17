import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'abstract',
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
    path: '/gameFound',
    name: 'GameFound',
    component: () => import('@/views/game/GameFound'),
    props: true
  }, {
    path: '/nextRound',
    name: 'NextRound',
    component: () => import('@/views/game/NextRound'),
    props: true
  }, {
    path: '/roundAction',
    name: 'RoundAction',
    component: () => import('@/views/game/RoundAction'),
    props: true
  }]
})
