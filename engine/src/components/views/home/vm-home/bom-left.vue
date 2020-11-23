<template>
  <el-col class="vm-move-threat">
    <el-table class="common-table"
              ref="multipleTable"
              align="center"
              tooltip-effect="dark"
              border
              @row-click="detail_click"
              @header-click="header_click"
              :row-style="{cursor:'pointer'}"
              @mousedown.native="mousedown"
              @mouseup.native="mouseup"
              :data="tableData">
      <el-table-column prop="index"
                       label="排名"
                       width="60"
                       align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="indicator"
                       label="威胁指标"
                       align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="category"
                       label="告警类型"
                       align="center"
                       show-overflow-tooltip></el-table-column>
    </el-table>
  </el-col>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'bom-left',
  data () {
    return {
      detail_click_val: {},
      oldPositon: {
        x: '',
        y: ''
      },
      newPositon: {
        x: '',
        y: ''
      }
    }
  },
  props: {
    bom_left: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tableData () {
      let tableData = this.bom_left;
      // console.log(this.bom_left);
      let that = this;
      tableData.map(function (v, k) {
        that.$set(v, 'index', k + 1);
      });
      return tableData;
    }
  },
  methods: {
    //进入详情页面
    detail_click (val) {
      this.detail_click_val = val
    },
    header_click (val) {
      this.detail_click_val = {}
    },
    mousedown (event) {
      this.oldPositon = {
        x: '',
        y: ''
      }
      this.newPositon = {
        x: '',
        y: ''
      }
      this.oldPositon.x = event.clientX;
      this.oldPositon.y = event.clientY;
    },
    mouseup (event) {
      this.newPositon.x = event.clientX;
      this.newPositon.y = event.clientY;
      if (this.oldPositon.x == this.newPositon.x) {
        setTimeout(() => {
          if (this.detail_click_val.id) {
            console.log('点击详情');
            this.$router.push({ path: "/detail/network", query: { detail: this.detail_click_val.id, type: 'alert' } });
          } else {
            console.log('点击头部');
          }
        }, 10);
      } else {
        console.log('复制');
      }
    },
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/css/less/common-table-pattern.less';
</style>
