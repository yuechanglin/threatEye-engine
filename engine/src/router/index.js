import Vue from 'vue'
import Router from 'vue-router'

const Layout = resolve => require(['@/components/vendor/Dashboard'], resolve);
const LayoutNot = resolve => require(['@/components/vendor/DashboardNot'], resolve);
Vue.use(Router);

/**
 *
 * permission
 * nav:[1,2,3,4,5,6];
 * aside:[]
 *Among them, the first page does not need permission
 *
 * */

//所有权限通用路由表，如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [{
  path: '/login',
  name: 'login',
  component: () => import('@/components/vendor/login/Login')
},
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/main_content',
    children: [{
      path: '/main_content',
      name: 'main_content',
      component: () => import('@/components/layout/Main')
    }]
  },
  {
    path: '/LayoutNot',
    name: 'LayoutNot',
    meta: {
      title: '通知',
      icon: 'el-icon-help'
    },
    component: LayoutNot,
    children: [{
      path: '/message',
      name: 'message',
      meta: {
        title: '通知',
        auth: '',
        icon: 'el-icon-help',
        parentAuth: ''
      },
      component: () => import('@/components/vendor/Message')
    },]
  },
  {
    path: '/600',
    component: () => import('@/components/vendor/600')
  },
  {
    path: '/401',
    component: () => import('@/components/vendor/401')
  },
  {
    path: '*',
    component: () => import('@/components/vendor/404')
  }
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

//异步挂载的路由，动态需要根据权限加载的路由表
export const asyncRouterMap = [
  /*首页*/
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      icon: 'e-nav-home',
      auth: '1'
    },
    params: {
      name: 'home'
    },
    component: Layout,
    children: [{
      path: '/home/overview',
      name: 'overview',
      meta: {
        title: '总览',
        auth: '2',
        icon: 'e-aside-overview',
        parentAuth: '1',
        rootAuth: '1',
        deep: 1
      },
      component: () => import('@/components/views/home/Overview')
     }]
  },
  /*设置*/
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '设置',
      icon: 'e-nav-system',
      auth: '132'
    },
    component: Layout,
    children: [
      {
        path: '/system/account',
        name: 'account',
        meta: {
          title: '用户管理',
          auth: '144',
          icon: 'e-aside-works',
          parentAuth: '132',
          rootAuth: '132',
          deep: 1
        },
        component: () => import('@/components/views/setting/Account')
      },
      {
        path: '/system/electric',
        name: 'electric',
        meta: {
          title: '网络设置',
          auth: '157',
          icon: 'e-aside-network',
          parentAuth: '132',
          rootAuth: '132',
          deep: 1
        },
        component: () => import('@/components/views/setting/Electric')
      },
      {
        path: '/system/option',
        name: 'option',
        meta: {
          title: '系统设置',
          auth: '162',
          icon: 'e-aside-terminal',
          parentAuth: '132',
          rootAuth: '132',
          deep: 1
        },
        component: () => import('@/components/views/setting/Option')
      },
      {
        path: '/system/record',
        name: 'record',
        meta: {
          title: '审计日志',
          auth: '191',
          icon: 'e-aside-data',
          parentAuth: '132',
          rootAuth: '132',
          deep: 1
        },
        component: () => import('@/components/views/setting/Record')
      },
      {
        path: '/system/licence',
        name: 'licence',
        meta: {
          title: '许可管理',
          auth: '207',
          icon: 'e-aside-ioc',
          parentAuth: '132',
          rootAuth: '132',
          deep: 1
        },
        component: () => import('@/components/views/setting/Licence')
      }
    ]
  }
]
