// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// 引入element-UI
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/theme/index.css'
Vue.use(ElementUI);
import '@/assets/js/common'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
// 引入axios
import axios from './https/axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api/' // api 即上面 vue.config.js 中配置的地址
import uploader from 'vue-simple-uploader'

import "echarts/extension/bmap/bmap.js";
import '../node_modules/echarts/map/js/world.js'

Vue.use(uploader)

// 引入http
import {
  post,
  fetch,
  patch,
  put,
  deletes
} from './https/api'

//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$deletes = deletes;

//全局自定义指令
import directives from '@/components/directive/index'
Vue.use(directives);

//全局自定义组件
import gl_component from '@/components/encapse/index'
Vue.use(gl_component);

import '@/components/filters/index'

import './assets/css/index.css'

Vue.prototype.validSe = function (value, number = 255) {
  value = value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
  if (value.length >= number) {
    this.$message({
      type: "warning",
      message: `输入内容不能超过${number}个字符`
    });
  }
  return value;
}


Vue.config.productionTip = false;
const whiteList = ['/login', '/'];


//全局路由钩子
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') {
      next({
        path: '/'
      });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息

        store.dispatch('GetAuth').then(resp => { // 拉取info

          const roles = resp;

          if (roles == null) {
            store.dispatch('LogOut');
          } else {
            store.dispatch('GenerateRoutes', {
              roles
            })
              .then(() => { // 生成可访问的路由表

                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表

                next({
                  ...to,
                  replace: true
                }) // hack方法 确保addRoutes已完成 ,
                // set the replace: true so the navigation will not leave a history record

              })
          }
        }).catch(err => {

          NProgress.done();

          console.log(err);

        });

      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: {
    App
  },
  template: '<App/>'
})
