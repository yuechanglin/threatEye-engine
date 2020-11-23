<template>
  <el-col class="vm-move-threat vm-move-threat-middle">
    <el-table class="common-table"
              align="center"
              border
              ref="multipleTable"
              @row-click="detail_click"
              @header-click="header_click"
              :row-style="{cursor:'pointer'}"
              @mousedown.native="mousedown"
              @mouseup.native="mouseup"
              :data="tableData">
      <el-table-column prop="pid"
                       label="排名"
                       width="60"
                       align="center"></el-table-column>
      <el-table-column prop="asset_ip"
                       align="center"
                       label="风险资产"
                       show-overflow-tooltip></el-table-column>
      <el-table-column label="风险指数"
                       align="center">
        <template slot-scope="scope">
          <el-progress :show-text="false"
                       :percentage="scope.row.indicator"></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'bom-mid',
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
    bom_mid: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tableData () {
      let tableData = this.bom_mid;
      /*tableData = [
        {asset_ip:'192.168.1.193',indicator:21},
        {asset_ip:'192.168.1.192',indicator:50},
      ]*/
      let that = this;
      tableData.map(function (v, k) {
        that.$set(v, 'pid', k + 1);
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
            this.$router.push({
              path: '/detail/assets', name: 'detail_assets',
              query: { id: this.detail_click_val.id, asset_ip: this.detail_click_val.asset_ip, status: this.detail_click_val.status, type: 'home' }
            });
          } else {
            console.log('点击头部');
          }
        }, 10);
      } else {
        console.log('复制');
      }
    }

  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/css/less/common-table-pattern.less';
</style>