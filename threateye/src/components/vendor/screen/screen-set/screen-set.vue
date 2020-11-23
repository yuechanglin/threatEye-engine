<template>
  <el-container class="screen-set" v-cloak>
    <el-aside class="set-aside">
      <div class="set-aside-top">
        <el-link @click="back_router()">
          <i class="el-icon-arrow-left el-icon--right"></i>
          <span class="back">返回大屏</span>
        </el-link>
      </div>
      <el-menu :default-active="defaultIndex"
               class="set-aside-menu">
        <el-submenu index="-1">
          <template slot="title">
            <i class="e-aside-screen-set"></i>
            <span slot="title">大屏设置</span>
          </template>
        </el-submenu>
        <div class="aside-item">
          <el-menu-item index="0" @click="change_router('0')">基本内容设置</el-menu-item>
        </div>
        <div class="aside-item" >
          <i class="tog" :class="{'active':defaultIndex == '1','rotate':!rotate1Active}" @click="rotateClick();"></i>
          <el-menu-item index="1" @click="change_router('1')" lazy>两侧内容设置</el-menu-item>
          <vuedraggable class="menu-list" v-model="setAsideLists" v-show="defaultIndex == '1' && rotate1Active">
            <transition-group>
              <div class="item" v-for="(item,$index) in setAsideLists" :key="item.aside_id">
                <span class="title" :title="item.name">{{item.name}}</span>
                <button class="bt" :class="{'active':item.flag}" @click="asideAddClick(item.aside_id);">
                  <span v-show="!item.flag">添加</span>
                  <span v-show="item.flag">已添加</span>
                </button>
              </div>
            </transition-group>
          </vuedraggable>
        </div>
        <div class="aside-item">
          <i class="tog" :class="{'active':defaultIndex == '2','rotate':!rotate2Active}" @click="rotateClick();"></i>
          <el-menu-item index="2" @click="change_router('2')" lazy>顶部指标设置</el-menu-item>
          <vuedraggable class="menu-list" v-model="setTopLists" v-show="defaultIndex == '2' && rotate2Active">
            <transition-group>
              <div class="item" v-for="(item,$index) in setTopLists" :key="item.top_id">
                <span class="title" :title="item.name">{{item.name}}</span>
                <button class="bt" :class="{'active':item.flag}" @click="topAddClick(item.top_id);">
                  <span v-show="!item.flag">添加</span>
                  <span v-show="item.flag">已添加</span>
                </button>
              </div>
            </transition-group>
          </vuedraggable>
          <!--<ul class="menu-list" v-show="defaultIndex == 2">
            <li class="item" v-for="(item,$index) in topLists">
              <span class="title">{{item.name}}</span>
              <button class="bt" :class="{'active':!item.flag}">已添加</button>
            </li>
          </ul>-->
        </div>
      </el-menu>
    </el-aside>

    <el-container class="set-container">
      <el-main class="set-main">
        <transition name="slider">
          <keep-alive exclude="home-screen">
            <router-view :key="key"/>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
    <el-footer class="set-footer">©虎特信息科技（上海）有限公司 版权所有</el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import vuedraggable from 'vuedraggable';
  import {mapGetters} from 'vuex'

  export default {
    name: "screen-set",
    data() {
      return {
        rotate1Active:true,
        rotate2Active:true,
        defaultIndex: "0",
        setAsideLists: [],
        setTopLists:[]
      }
    },
    computed: {
      ...mapGetters(['asideLists','topLists']),
      key () {
        return this.$route.path + Math.random();
      }
    },
    created() {
      let num = this.$route.query.num;
      this.defaultIndex = num;
      //拷贝
      let asideLists = this.asideLists;
      this.setAsideLists = asideLists;

      //顶部数据拷贝
      let topLists = this.topLists;
      this.setTopLists = topLists;
    },
    watch: {
      asideLists: {
        handler:function(newVal,oldVal){
          this.setAsideLists = newVal;
        },
        //深度监听
        deep:true
      },
      topLists: {
        handler:function(newVal,oldVal){
          //console.log(newVal)
          this.setTopLists = newVal;
        },
        //深度监听
        deep:true
      },
    },
    updated() {
      let defaultIndex = this.defaultIndex;
      if(defaultIndex == 1){
        //更新大屏两侧数据
        this.$store.commit('SET_ASIDE_LISTS', this.setAsideLists);
      }else if(defaultIndex == 2){
        //更新大屏顶部数据
        this.$store.commit('SET_TOP_LISTS', this.setTopLists);
      }
    },
    components: {vuedraggable},
    methods: {
      //返回大屏
      back_router() {
        this.$router.push({path: '/screen'});
      },
      //侧边栏tabs切换
      change_router(index) {
        if (index == '0') {
          this.$router.push({path: '/screen/set/base', query: {num: index}});
        } else if (index == '1') {
          this.$router.push({path: '/screen/set_screen', query: {num: index}});
        } else if (index == '2') {
          this.$router.push({path: '/screen/set_screen', query: {num: index}});
        }
      },
      rotateClick(){
        let defaultIndex = this.defaultIndex;
        if(defaultIndex == 1){
          this.rotate1Active = !this.rotate1Active;
        }else if(defaultIndex == 2){
          this.rotate2Active = !this.rotate2Active;
        }
      },
      //两侧内容点击添加
      asideAddClick(id) {
        let attr = this.setAsideLists
          .filter(item => {return item.flag == true});
        if (attr.length < 6) {
          this.$store.commit('SET_ASIDE_LISTS_ID', {id,id,flag:true});
        } else {
          this.$message.warning('两侧内容最多只能添加6条.');
        }
      },
      //顶部内容添加点击
      topAddClick(id) {
        let attr = this.setTopLists
          .filter(item => {return item.flag == true});
        if (attr.length < 4) {
          this.$store.commit('SET_TOP_LISTS_ID', {id,id,flag:true});
        } else {
          this.$message.warning('顶部内容最多只能添加4条.');
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .screen-set {
    /deep/
    .set-aside {
      width: 250px !important;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      .set-aside-top {
        width: 100%;
        /*height: 56px!important;*/
        line-height: 56px!important;
        text-align: left;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        font-weight: bold;
        padding: 0 10px;
        /deep/
        .el-link {
          &.el-link--default {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
            &:hover {
              color: #999999;
              border-width: 0;
            }
            &:after {
              border-width: 0;
            }
          }
          .back {
            margin-left: 0;
          }
        }
      }

      .set-aside-menu {
        position: inherit;
        border-width: 0;
        .el-submenu {
          .el-submenu__title {
            padding: 0 16px !important;
            text-align: left;
            overflow: hidden;
            .e-aside-screen-set {
              width: 18px;
              height: 18px;
              display: inline-block;
              background-repeat: no-repeat;
              vertical-align: middle;
              background-size: 16px;
              background-image: url("../../../../assets/images/layout/aside/default/big.png");
            }
            .el-icon-arrow-down {
              display: none;
            }
          }
        }
        .aside-item{
          position: relative;
          .tog{
            position: absolute;
            width: 12px;
            height: 12px;
            top: 20px;
            right: 20px;
            padding: 8px;
            background-image: url("../../../../assets/images/screen/aside-right.png");
            background-repeat: no-repeat;
            background-size: 12px;
            background-position: 2px 3px;
            z-index: 1000;
            cursor: pointer;
            &.active {
              background-image: url("../../../../assets/images/screen/aside-down.png");
            }
            &.rotate{
              transform: rotate(-90deg);
            }
          }
          .el-menu-item {
            height: 56px;
            font-size: 14px;
            color: #333;
            display: block;
            text-align: left;
            padding: 0 16px 0 44px;
            cursor: pointer;
            width: 250px;
            position: relative;

            &.is-active {
              color: #fff;
              background-color: #0070ff;
              -webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
              transition: 0s height, 0s padding-top, 0s padding-bottom;

              &:after {
                content: "";
                display: block;
                width: 0px;
                height: 0px;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-left: 8px solid #0070FF;
                position: absolute;
                top: 20px;
                right: -8px;
                z-index: 999;
              }
            }
          }
        }
        .menu-list {
          padding: 0 16px;
          .item {
            margin: 6px 0;
            width: 218px;
            height: 44px;
            border: 1px solid #ECECEC;
            padding: 10px 8px;
            cursor: move;
            .title {
              float: left;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #333333;
              width: 120px;
              cursor: pointer;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .bt {
              float: right;
              width: 64px;
              height: 24px;
              line-height: 24px;
              outline: none;
              border-width: 0;
              background: #5389E0;
              color: #fff;
              border-radius: 2px;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              text-align: center;
              cursor: pointer;

              &.active {
                background: #ECECEC;
                color: #BBBBBB;
                cursor: not-allowed;
              }
            }
          }
        }
      }
    }
    /deep/
    .set-container {
      margin-left: 250px;
      width: calc(100vw - 250px);
      height: calc(100vh - 64px);
    }
    /deep/
    .set-main{
      padding: 0!important;
      background: #f4f4f4;
    }
    /deep/
    .set-footer {
      background-color: #ececec;
      height: 64px !important;
      line-height: 64px !important;
      font-family: PingFangSC-Regular;
      color: #999;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      font-size: 16px;
      z-index: 999;
    }
  }
  .slider-enter {
    opacity: 0;
    transform: translateX(100px);
  }
  .slider-enter-active {
    transition: all 0.3s ease;
  }
</style>
