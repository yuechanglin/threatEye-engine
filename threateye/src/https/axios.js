/**
 * 封装 axios
 * created by yuechanglin 20200225
 * */



import axios from 'axios';

import Vue from 'vue'

axios.defaults.baseURL = '';
import Router from '@/router/index'

import {
  Message
} from 'element-ui';

import {
  removeToken
} from '@/store/layout/cookie';

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);
//响应拦截器即异常处理
axios.interceptors.response.use(response => {
 // console.log(response)
  //status内层
  switch (response.data.status) {
    case 602:
      console.log(response.data.msg)
      //   Message.warning(response.data.msg + ',请修改个人信息');
      //Message.warning('请修改个人信息');
      //删除token
      //removeToken();
      //location.reload();
      //Vue.$router.push({path:'/login'});
      //return false;
      break;
    case 600:
      Router.push({
        path: '/600'
      });
      break;
    case 404:
      Router.push({
        path: '/404'
      });
      break;
    case 401:
      Router.push({
        path: '/404'
      });
      break;
    default:
    // Router.push({path:'/404'})
    //console.log(`请求状态${response.status}`)
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求')
        break;
      case 401:
        console.log('未授权，请重新登录')
        break;
      case 403:
        console.log('拒绝访问111')
        let locate = window.sessionStorage;
        locate.setItem('overtime', 'true');
        removeToken();
        location.reload();
        Vue.$router.push({
          path: '/login'
        });
        return false;
        // Router.push({
        //   path: '/login'
        // });
        break;
      case 404:
        console.log('请求错误,未找到该资源')
        break;
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    console.log('连接到服务器失败')
  }
  return Promise.resolve(err.response)
})

export default axios;
