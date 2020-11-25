<template>
  <div id="system_control_electric"
       class="container">
    <div class="content_box">
      <div class="network_tab">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick"
                 class="reset_tab">
          <el-tab-pane label="网卡配置"
                       class="tabs-item"
                       name="first">
            <network-card v-if="tab_show.first"></network-card>
          </el-tab-pane>
          <el-tab-pane label="代理服务器"
                       class="tabs-item"
                       name="second">
            <proxy-server v-if="tab_show.second"></proxy-server>
          </el-tab-pane>
          <el-tab-pane label="路由设置"
                       class="tabs-item"
                       name="third">
            <router-set v-if="tab_show.third"></router-set>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import networkCard from "@/components/views/setting/vm-electric/network-card";
import proxyServer from "@/components/views/setting/vm-electric/proxy-server";
import routerSet from "@/components/views/setting/vm-electric/router-set";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  components: {
    networkCard,
    proxyServer,
    routerSet
  },
  name: "system_control_electric",
  data () {
    return {
      activeName: "first",
      tab_show: {
        first: true,
        second: false,
        third: false,
      }
    };
  },
  mounted () {
    this.check_passwd()
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
    handleClick (tab, event) {
      console.log(tab);
      switch (tab.name) {
        case "first":
          this.tab_show.first = true;
          this.tab_show.second = false;
          this.tab_show.third = false;
          break;
        case "second":
          this.tab_show.first = false;
          this.tab_show.second = true;
          this.tab_show.third = false;
          break;
        case "third":
          this.tab_show.first = false;
          this.tab_show.second = false;
          this.tab_show.third = true;
          break;
        default:
          break;
      }

    }

  }
};
</script>
<style lang='less'>
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>
<style scoped lang='less'>
@import '../../../assets/css/less/system/setting/common_box.less';
</style>


