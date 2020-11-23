import axios from "axios";
export default {
  state: {
    //基础信息
    baseInfo:{
      ScreenName:'',
      ExtraneousDistributionType:'',
      ExtraneousDistribution: [{name: "", cascader: []}]
    },
    //两侧数据
    asideLists:[{name:'威胁分布',alias:'threatDistribution', flag: true, aside_id: 0},
      {name: '威胁指标热力图',alias:'threatIndicators', flag: true, aside_id: 1},
      {name: '全球安全动态',alias:'threatDynamics', flag: false, aside_id: 2},
      {name: '横向态势威胁',alias:'horizontalThreatSituation', flag: false, aside_id: 3},
      {name: '分支安全',alias:'branchSafe', flag: false, aside_id: 4},
      {name: '系统状态监控',alias:'systemStatus', flag: false, aside_id: 5},
      {name: '关注告警',alias:'attentionAlarm', flag: false, aside_id: 6},
      {name: '外连国家和地区TOP5',alias:'ExternalCountryTop5', flag: false, aside_id: 7},
      {name: '风险趋势',alias:'riskTrend', flag: false, aside_id: 8},
      {name: '威胁排行',alias:'threatRange', flag: false, aside_id: 9}],
    //顶部数据
    topLists: [{name:'风险资产数',alias:'risk_asset_count', flag: false, top_id: 0,num:[0,0,0,0,0]},
      {name: '外连资产数',alias:'outreachthreat_assets_count', flag: false, top_id: 1,num:[0,0,0,0,0]},
      {name: '告警数',alias:'alert_count', flag: false, top_id: 2,num:[0,0,0,0,0]},
      {name: '未处理告警数',alias:'untreated_alert_count', flag: false, top_id: 3,num:[0,0,0,0,0]},
      {name: '风险服务器数',alias:'servers', flag: false, top_id: 4,num:[0,0,0,0,0]},
      {name: '风险终端数',alias:'workstation', flag: false, top_id: 5,num:[0,0,0,0,0]},
      {name: '风险网络设备数',alias:'network_equipment', flag: false, top_id: 6,num:[0,0,0,0,0]}]
  },
  getters: {
    baseInfo: state => state.baseInfo,
    asideLists: state => state.asideLists,
    topLists: state => state.topLists,
  },
  mutations: {
    /**
     *大屏基础设置
     * */
    SET_BASE_INFO: (state, args) => {
      state.baseInfo = args;
    },
    /**
    *大屏两侧处理
    * */
    //更新大屏两侧数据
    SET_ASIDE_LISTS: (state, args) => {
      args.forEach(item => {
        if(item.alias == 'ExternalCountryTop5'){
          item.name = '外连国家和地区TOP5';
        }
      });
      state.asideLists = args;
    },
    //通过id修改大屏两侧数据
    SET_ASIDE_LISTS_ID:(state,args) => {
      let lists = state.asideLists;
      lists.forEach(function (value, key) {
        if (value.aside_id == args.id) {
          value.flag = args.flag;
        }
      });
      state.asideLists = lists;
    },
    /**
     *大屏顶部处理
     * */
    //更新大屏顶部数据
    SET_TOP_LISTS: (state, args) => {
      state.topLists = args;
    },
    //通过id修改大屏顶部数据
    SET_TOP_LISTS_ID: (state, args) => {
      let lists = state.topLists;
      lists.forEach(function (value, key) {
        if (value.top_id == args.id) {
          value.flag = args.flag;
        }
      });
      state.topLists = lists;
    },
    SET_TOP_LISTS_NUM: (state,args) => {

      state.topLists.map(item => {

        for (let key in args) {

          if(item.alias == key){
            if(Number(args[key]) > 99999){
              args[key] = 99999;
            }
            if(args[key] == undefined || args[key] == null){
              args[key] == 0;
            }
            let count = String(args[key]).padStart(5,'0');
             /*if(!item.num){
               Object.assign(item,{num:count.toString().split('')});
             }*/
            item.num = count.toString().split('');
          }
        }
      });
    }
  },
  actions: {
    //获取大屏基础信息
    async getScreenBase({commit,dispatch},context){
      let resp = await axios('/yiiapi/demonstration/get-base-config',{params:context});
      let {status, data} = resp.data;
     // console.log(data)

      if(status == 0){
        commit('SET_BASE_INFO',data);
        return true;
      }
    },
    /**
     * 大屏两侧数据
     * */
    async getScreenAside({commit,dispatch},context){
      let resp = await axios('/yiiapi/demonstration/get-both-side',{params:context});
      let {status, data} = resp.data;
      //console.log(data)
      if(status == 0){
        commit('SET_ASIDE_LISTS',data);
        return true;
      }
    },
    async setScreenAside({commit,dispatch},context){
      let asideLists = this.state.screen.asideLists;
      let resp = await axios.put('/yiiapi/demonstration/set-both-side',{param:asideLists});
      let {status, data} = resp.data;
      if(status == 0){
        return true;
      }
    },
    /**
     * 大屏顶部数据
     * */
    async getScreenTop({commit,dispatch},context){
      let resp = await axios('/yiiapi/demonstration/get-top-config',{params:context});
      let {status, data} = resp.data;
      data.forEach(item => {
        if(!item.num){
          item.num = [0,0,0,0,0];
        }
      })
      if(status == 0){
        commit('SET_TOP_LISTS',data);
        return true;
      }
    },
    async setScreenTop({commit,dispatch},context){
      let topLists = this.state.screen.topLists;
      let resp = await axios.put('/yiiapi/demonstration/set-top-config',{param:topLists});
      let {status, data} = resp.data;
      if(status == 0){
        return true;
      }
    },
  }
}
