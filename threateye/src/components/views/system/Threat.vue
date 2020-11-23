<template>
  <div id="system_control_threat"
       class="container">
    <div class="content_box">
      <div class="network_tab">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick"
                 class="reset_tab">
          <el-tab-pane label="邮件通知"
                       class="tabs-item"
                       name="first">
            <mail-notic></mail-notic>
          </el-tab-pane>
          <el-tab-pane label="短信通知"
                       class="tabs-item"
                       name="second">
            <short-message></short-message>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import mailNotic from "@/components/views/system/vm-threat/mail-notic";
import shortMessage from "@/components/views/system/vm-threat/short-message";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  components: {
    mailNotic,
    shortMessage,
  },
  name: "system_control_electric",
  data () {
    return {
      activeName: "first"
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
      console.log(tab.label);
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

