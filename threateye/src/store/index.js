import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

import layout from './layout/index';
import invest from './invest/index';
import screen from './screen/index';

const store = new Vuex.Store({
  modules:{
    layout,
    invest,
    screen
  },
  strict: debug, //是否开启严格模式
})

export default store;
