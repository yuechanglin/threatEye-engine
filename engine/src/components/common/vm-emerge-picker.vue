
<template>
  <el-date-picker class="vm_emerge_picker"
                  v-model="pickerOptions.time"
                  type="datetimerange"
                  format="yyyy-MM-dd HH:mm"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  @change="chooseTime"
                  clearable
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="center">
  </el-date-picker>
</template>
<script type="text/ecmascript-6">
export default {
  name: "vm-emerge-picker",
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ],
        time: []
      }
    };
  },
  props: {
    option: {
      type: Array,
      default: () => { }
    }
  },
  created () { },
  mounted () {
    //console.log(this.option);
  },
  computed: {

  },
  methods: {
    chooseTime () {
     // console.log(this.option);
      // console.log(this.pickerOptions.time);
      this.$emit("changeTime", this.pickerOptions.time);
    }
  }
};
</script>

<style lang="less">
.el-input__inner {
  background-color: #f8f8f8;
  border-width: 0;
  outline: none;
}
.vm_emerge_picker {
  width: 400px !important;
  /deep/ .el-range-input {
    /*width: auto;*/
    background-color: #f8f8f8;
  }
  /deep/ .el-range-separator {
    padding: 0 3px;
    line-height: 32px;
    width: auto;
    color: #303133;
  }
  .el-date-table td.end-date span {
    background-color: #0070ff;
  }
  .el-button.is-active,
  .el-button.is-plain:active {
    color: #0070ff;
    border-color: #0070ff;
  }
}
</style>
