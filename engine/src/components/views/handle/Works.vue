<template>
  <div class="handle-works">
    <div class="handle-works-top common-invest">
      <div class="invest">
        <sup class="h_count hc1">{{number.created}}</sup>
        <sup class="h_count hc2">{{number.distributed}}</sup>
        <sup class="h_count hc3"
             v-show="number.role == 'admin'">{{number.all}}</sup>
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">

          <!--我创建的-->
          <el-tab-pane label="我创建的"
                       name="first">
            <vm-handle-works :owned="owned"
                             v-if="childUpdate1"
                             @updateNum="updateTopNum"></vm-handle-works>
          </el-tab-pane>

          <!--分配给我的-->
          <el-tab-pane label="分配给我的"
                       name="second">
            <vm-handle-works :owned="owned"
                             v-if="childUpdate2"
                             @updateNum="updateTopNum"></vm-handle-works>
          </el-tab-pane>

          <!--所有工单-->
          <el-tab-pane label="所有工单"
                       name="third"
                       v-if="number.role == 'admin'">
            <vm-handle-works :owned="owned"
                             v-if="childUpdate3"
                             @updateNum="updateTopNum"></vm-handle-works>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import VmHandleWorks from './vm-handle/vm-handle-works'
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "handle-works",
  data () {
    return {
      number: {
        created: 0,
        distributed: 0,
        all: 0,
        role: 'admin'
      },
      activeName: 'first',
      owned: 'created',
      childUpdate1: true,
      childUpdate2: false,
      childUpdate3: false
    };
  },
  components: {
    VmHandleWorks
  },
  created () {
    this.check_passwd();
    this.init_tabs_info();
    this.get_top_num();
  },
  mounted () {
    eventBus.$on('num', () => {
      this.get_top_num()
    })
  },
  destroyed () {
    let route = this.$route;
    if (route.path != '/detail/works') {
      window.sessionStorage.removeItem('activeName');
    }
  },
  methods: {
    // 测试密码过期
    check_passwd () {
      this.$axios.get('/yiiapi/site/check-passwd-reset')
        .then((resp) => {
          let {
            status,
            msg,
            data
          } = resp.data;
          if(status != 0){
            for(let key in msg){
              if(key == 600){
                this.$message(
                  {
                    message: msg[key],
                    type: 'warning',
                  }
                );
              }
              if(key == 602){
                this.$message(
                  {
                    message: msg[key],
                    type: 'warning',
                  }
                );
                eventBus.$emit('reset');
              }
            }
          }
        })
    },
    //tabs初始化
    init_tabs_info () {

      let locate = window.sessionStorage;
      let activeName = locate.getItem('activeName');
      if (activeName) {
        this.activeName = activeName;
        if (activeName == 'first') {
          this.owned = 'created';
          this.childUpdate1 = true;
          this.childUpdate2 = false;
          this.childUpdate3 = false;
        } else if (activeName == 'second') {
          this.owned = 'distributed';
          this.childUpdate1 = false;
          this.childUpdate2 = true;
          this.childUpdate3 = false;
        } else if (activeName == 'third') {
          this.owned = 'all';
          this.childUpdate1 = false;
          this.childUpdate2 = false;
          this.childUpdate3 = true;
        }
      } else {
        this.activeName = 'first';
        this.owned = 'created';
      }
    },
    //顶部数字列表
    get_top_num () {
      this.$axios.get('/yiiapi/workorder/top')
        .then(resp => {
          let { status, msg, data } = resp.data;
          if (status == 0) {
            if (data) {
              if (data.created == null) {
                this.number.created = 0;
              } else {
                this.number.created = data.created;
              }
              if (data.distributed == null) {
                this.number.distributed = 0;
              } else {
                this.number.distributed = data.distributed;
              }
              if (data.all == null) {
                this.number.all = 0;
              } else {
                this.number.all = data.all;
              }
              this.number.role = data.role;
            }
          }
        })
    },

    updateTopNum () {
      this.get_top_num();
    },
    /*****************************/
    handleClick (tab, event) {
      let name = tab.name;
      let locate = window.sessionStorage;
      if (name == "first") {
        this.owned = 'created';
        this.childUpdate1 = true;
        this.childUpdate2 = false;
        this.childUpdate3 = false;
        locate.setItem('activeName', 'first');
      } else if (name == "second") {
        this.owned = 'distributed';
        this.childUpdate1 = false;
        this.childUpdate2 = true;
        this.childUpdate3 = false;
        locate.setItem('activeName', 'second');
      } else if (name == "third") {
        this.owned = 'all';
        this.childUpdate1 = false;
        this.childUpdate2 = false;
        this.childUpdate3 = true;
        locate.setItem('activeName', 'third');
      }
      this.get_top_num();
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/css/less/common-tabs-pattern.less';
.handle-works {
  margin-bottom: 0;
  .invest {
    position: relative;
    min-height: 850px;
    .h_count {
      position: absolute;
      color: #fff;
      line-height: 18px;
      background: #ff5f5c;
      border-radius: 100%;
      top: 16px;
      z-index: 999;
      height: 18px;
      min-width: 18px;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2),
        -1px -1px 5px rgba(0, 0, 0, 0.2);
      &.hc1 {
        left: 176px;
      }
      &.hc2 {
        left: 341px;
      }
      &.hc3 {
        left: 505px;
      }
    }
  }
}
</style>

