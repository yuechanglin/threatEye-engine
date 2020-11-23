import axios from "axios";

const actions = {
  /*LoginByUsername({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {

        //loginByUsername(username, userInfo.password).then(response => {
        axios('/static/data/user.json',userInfo).then(response => {
          // const data = response.data
          //Cookies.set('Token', response.token) //登录成功后将token存储在cookie之中
          setToken(response.token);
          commit('SET_TOKEN', response.token);
          resolve()
        }).catch(error => {
          reject(error)
        });
      });
    },*/
  //获取DNS的table数据
  async getDnsData({commit,dispatch},context){
    let data = await axios('/static/data/invest/dns.json',{params:context});
    commit('set_dns_table', data);
    return true;
  },
}

export default actions;
