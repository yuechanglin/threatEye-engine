<template>
  <div id="system_control_rule"
       class="container">
    <div class="content_box">
      <div class="network_tab">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick"
                 class="reset_tab">
          <el-tab-pane label="规则库更新"
                       class="tabs-item"
                       name="first">
            <rule-base v-if="tab_show.first"></rule-base>
          </el-tab-pane>
          <el-tab-pane label="YARA规则"
                       class="tabs-item"
                       name="second">
            <yara-rule v-if="tab_show.second"></yara-rule>
          </el-tab-pane>
          <el-tab-pane label="白名单设置"
                       class="tabs-item"
                       name="third">
            <white-list v-if="tab_show.third"></white-list>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import ruleBase from "@/components/views/system/vm-rule/rule-base";
import yaraRule from "@/components/views/system/vm-rule/yara-rule";
import whiteList from "@/components/views/system/vm-rule/white-list";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  components: {
    ruleBase,
    yaraRule,
    whiteList,
  },
  name: "system_control_rule",
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


