<template>
  <div id="system_control_react"
       class="container">
    <div class="content_box">
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               class="reset_tab">
        <el-tab-pane label="外部动态列表设置"
                     class="tabs-item"
                     name="first">
          <outside-set v-if="tab_show.first"></outside-set>
        </el-tab-pane>
        <el-tab-pane label="外部动态列表"
                     class="tabs-item"
                     name="second">
          <outside-list v-if="tab_show.second"></outside-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import outsideSet from "@/components/views/system/vm-react/outside-set";
import outsideList from "@/components/views/system/vm-react/outside-list";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  components: {
    outsideSet,
    outsideList
  },
  name: "system_control_react",
  data () {
    return {
      activeName: "first",
      tab_show: {
        first: true,
        second: false,
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
          break;
        case "second":
          this.tab_show.first = false;
          this.tab_show.second = true;
          break;
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
