<template>
  <div class="home-screen"
       :class="{'active':!close}"
       v-cloak>
    <div class="home-top">
      <div class="home_l">
        <label class="e_label"></label>
      </div>
      <div class="home_c">{{baseInfo.ScreenName}}</div>
      <div class="home_r">
        <el-button type="primary"
                   class="e_btn e_btn_quit"
                   icon="el-icon-switch-button"
                   @click="quitScreen();">退出</el-button>
        <el-button type="primary"
                   class="e_btn e_btn_set"
                   icon="el-icon-setting"
                   @click="setScreen();">设置</el-button>
        <el-button type="primary"
                   class="e_btn e_btn_full"
                   icon="el-icon-full-screen"
                   @click="fullScreen();">全屏</el-button>
        <!--<button type="primary" class="e_btn e_btn_set" @click="setScreen();">
          <i class="h_img h_setting"></i><span class="t_title">设置</span></button>
        <button type="primary" class="e_btn e_btn_full" @click="fullScreen();">
          <i class="h_img h_all"></i><span class="t_title">全屏</span></button>-->
      </div>
    </div>
    <div class="home-content">
      <div class="screen-1">
        <div class="list-item"
             :class="{'active':!close}"
             v-if="totalLists.length>0">
          <vm-screen-all :data="totalLists[0]"
                         :close="close"></vm-screen-all>
        </div>
        <div class="list-item"
             :class="{'active':!close}"
             v-if="totalLists.length>2">
          <vm-screen-all :data="totalLists[2]"
                         :close="close"></vm-screen-all>
        </div>
        <div class="list-item"
             :class="{'active':!close}"
             v-if="totalLists.length>4">
          <vm-screen-all :data="totalLists[4]"
                         :close="close"></vm-screen-all>
        </div>
      </div>
      <div class="screen-2">
        <div class="list-item list-item-top"
             :class="{'active':!close}">
          <vm-screen-middle0 :topData="totalTopLists"
                             :close="topClose"
                             v-if="totalTopLists.length>0">
          </vm-screen-middle0>
        </div>
        <div class="list-item list-item-middle"
             :class="{'active':!close}">
          <header class="title">{{name}}
            <i class="t_img"></i>
          </header>
          <vm-screen-middle1 v-on:childByValue="childByValue"></vm-screen-middle1>
        </div>
        <div class="list-item list-item-bottom"
             :class="{'active':!close}">
          <header class="title title-flow">
            <span class="t1">协议统计
              <span class="t11">单位(P/s)</span>
            </span>
            <span class="t2">实时威胁检测</span>
            <span class="t3">实时告警</span>
          </header>
          <vm-screen-middle2></vm-screen-middle2>
        </div>
      </div>
      <div class="screen-3">
        <div class="list-item"
             :class="{'active':!close}"
             v-if="totalLists.length>1">
          <vm-screen-all :data="totalLists[1]"
                         :close="close"></vm-screen-all>
        </div>
        <div class="list-item"
             :class="{'active':!close}"
             v-if="totalLists.length>3">
          <vm-screen-all :data="totalLists[3]"
                         :close="close"></vm-screen-all>
        </div>
        <div class="list-item"
             :class="{'active':!close}"
             v-if="totalLists.length>5">
          <vm-screen-all :data="totalLists[5]"
                         :close="close"></vm-screen-all>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import draggable from 'vuedraggable';

import screenfull from 'screenfull';

import VmScreenAll from './vm-screen/vm-screen-all';
import VmScreenMiddle0 from './vm-screen/vm-screen-middle0';
import VmScreenMiddle1 from './vm-screen/vm-screen-middle1';
import VmScreenMiddle2 from './vm-screen/vm-screen-middle2';
import { mapGetters } from 'vuex'
export default {
  name: "home-screen",
  props: {
    close: {
      type: Boolean,
      default: true,
    },
    topClose: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    draggable,
    VmScreenAll,
    VmScreenMiddle0,
    VmScreenMiddle1,
    VmScreenMiddle2
  },
  data () {
    return {
      isFullscreen: false,
      threatEyeName: 'ThreatEye高级威胁检测系统',
      totalLists: [],
      totalTopLists: [],
      name: '外连分布'
    }
  },

  computed: {
    ...mapGetters({
      baseInfo: 'baseInfo',
      lists: 'asideLists',
      topLists: 'topLists',
    }),
  },
  created () {
    //大屏基础信息
    this.$store.dispatch('getScreenBase');

    //大屏两侧
    this.$store.dispatch('getScreenAside')
      .then((resp) => {
        if (resp) {
          let lists = this.lists.filter(item => { return item.flag == true; });
          this.totalLists = lists;
        }
      });

    //大屏顶部
    this.$store.dispatch('getScreenTop')
      .then((resp) => {
        if (resp) {
          let topLists = this.topLists.filter(item => { return item.flag == true; });
          this.totalTopLists = topLists;
        }
      });
  },
  watch: {
    lists: {
      handler: function (newVal, oldVal) {
        let lists = newVal.filter(item => { return item.flag == true; });
        this.totalLists = lists;
      },
      //深度监听
      deep: true
    },
    topLists: {
      handler: function (newVal, oldVal) {
        let topLists = newVal.filter(item => { return item.flag == true; });
        //console.log(topLists)
        this.totalTopLists = topLists;
      },
      //深度监听
      deep: true
    },
  },
  mounted () {
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false;
      }
    }
  },
  methods: {
    //获取大屏名称
    getName () {
      this.$axios
        .get('/yiiapi/demonstration/get-screen-name')

        .then((resp) => {

          let { status, data } = resp.data;

          if (status == 0) {
            this.threatEyeName = data.ScreenName;
          }
        })
        .catch((error) => {

          console.log(error);

        });
    },
    //退出
    quitScreen () {
      this.$router.push({ path: '/home/overview' });
    },
    //设置
    setScreen () {
      this.$router.push({ path: '/screen/set/base', query: { num: '0' } });
    },
    //全屏
    fullScreen () {
      screenfull.toggle();
      this.isFullscreen = true;
    },
    //ESC键
    checkFull () {
      var isFull = document.fullscreenEnabled ||
        window.fullScreen || document.webkitIsFullScreen ||
        document.msFullscreenEnabled
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    },
    /**********************************************/
    childByValue: function (flag) {
      if (flag) {
        this.name = '分支态势';
      } else {
        this.name = '外连分布';
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-screen {
  padding: 0 36px;
  /* background-color: #001034;*/
  background-color: rgba(0, 16, 52, 0.9);
  background-image: url('../../../assets/images/screen/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: auto;
  height: 100vh;
  &.active {
    padding: 0 24px;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
  .home-top {
    height: 80px;
    display: flex;
    margin-top: 15px;
    .home_l {
      flex: 1;
      .e_label {
        /* width: 64px;
          height: 48px;
          margin-top: 6px;
          display: block;
          background-image: url("../../../assets/images/screen/head-logo.png");
          background-repeat: no-repeat;
          background-size: 64px 48px;*/

        // width: 128px;
        // height: 128px;
        // margin-top: -30px;
        // margin-left: 50px;
        // display: block;
        // background-image: url("../../../assets/images/screen/head-logo1.png");
        // background-repeat: no-repeat;
        // background-size: 128px 128px;
      }
    }
    .home_c {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #ffffff;
      line-height: 60px;
      width: 1080px;
      background-image: url('../../../assets/images/screen/head-center.png');
      background-repeat: no-repeat;
      background-size: 1080px 50px;
      background-position: 0 6px;
    }
    .home_r {
      flex: 1;
      text-align: end;
      font-size: 0;
      /deep/ .e_btn {
        width: 132px;
        height: 36px;
        background-size: 132px 36px;
        border-width: 0;
        line-height: inherit;
        color: #fff;
        padding: 0;
        outline: none;
        background-color: transparent;
        background-repeat: no-repeat;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        cursor: pointer;
        border-radius: 0;
        /*box-shadow: inset 0 0 11px 5px rgba(0,122,255,0.36);*/
        & + .el-button {
          margin-left: 0;
        }
        &.e_btn_quit {
          margin-top: 5px;
          margin-right: -8px;
          background-image: url('../../../assets/images/screen/head-quit.png');
        }
        &.e_btn_set {
          margin-top: 6px;
          margin-right: -8px;
          background-image: url('../../../assets/images/screen/head-set.png');
        }
        &.e_btn_full {
          margin-top: 5px;
          background-image: url('../../../assets/images/screen/head-full.png');
        }
        /*.h_img{
            margin-top: 3px;
            margin-right: 4px;
            width: 14px;
            height: 14px;
            background-repeat: no-repeat;
            background-size: 14px 14px;
            background-position: 0;
            display: inline-block;
            vertical-align: text-top;
            &.h_setting{
              background-image: url("../../../assets/images/screen/head-setting.png");
            }
            &.h_all{
              background-image: url("../../../assets/images/screen/head-all.png");
            }
          }
          .t_title{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
          }*/
      }
    }
  }
  .home-content {
    display: flex;
    .list-item {
      width: 506px;
      height: 310px;
      margin-bottom: 15px;
      background-image: url('../../../assets/images/screen/content-lc.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      box-shadow: inset 0 0 12px 6px rgba(0, 122, 255, 0.36);
      border-radius: 16px;
    }
    .screen-1 {
      flex: 1;
      .list-item {
        float: left;
      }
    }
    .screen-2 {
      .list-item-top {
        width: 800px;
        height: 85px;
        margin-bottom: 15px;
        background-image: url('../../../assets/images/screen/content-top.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .list-item-middle {
        width: 800px;
        height: 534px;
        margin-bottom: 15px;
        background-image: url('../../../assets/images/screen/content-mid.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .list-item-bottom {
        width: 800px;
        height: 310px;
        background-image: url('../../../assets/images/screen/content-bom.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .title {
        font-size: 18px;
        color: #00d7e9;
        text-align: left;
        padding: 18px 16px 10px 16px;
        font-family: PingFangSC-Medium;
        .t_img {
          width: 140px;
          height: 24px;
          margin-left: 6px;
          display: inline-block;
          vertical-align: bottom;
          background-image: url('../../../assets/images/screen/content-bt.png');
          background-repeat: no-repeat;
          background-size: 140px 24px;
        }
        &.title-flow {
          position: relative;
          color: #fff;
          .t11 {
            opacity: 0.6;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #ffffff;
            margin-left: 12px;
          }
          .t2 {
            position: absolute;
            left: 350px;
          }
          .t3 {
            position: absolute;
            right: 110px;
          }
        }
      }
    }
    .screen-3 {
      flex: 1;
      .list-item {
        float: right;
      }
    }
  }
}
</style>
