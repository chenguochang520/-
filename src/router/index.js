import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const My = () => import('@/views/My')
const Question = () => import('@/views/Question')
const Video = () => import('@/views/Video')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home, name: 'home' },
      { path: 'my', component: My, name: 'my' },
      { path: 'question', component: Question },
      { path: 'video', component: Video },
      { path: 'login', component: Login, name: 'login' }
    ]
  },
  { path: '/search', component: Search, name: 'search' }
]

const router = new VueRouter({
  routes
})

export default router
