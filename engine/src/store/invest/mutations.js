
import * as types from './mutation-types';

const mutations = {
  [types.SET_DNS_TABLE](state, args) {
    state.dnsData= args;
  }
};

export default mutations;
