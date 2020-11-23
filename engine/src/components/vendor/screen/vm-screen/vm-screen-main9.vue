<template>
  <div class="vm-screen-main9">
    <el-table :data="tableData" class="screen-table">
     <!-- <el-table-column label="告警时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <marquee direction="left" hspace="0" vspace="0"
                   behavior="scroll" scrollamount="1" align="left"
                   scrolldelay="0" loop="-1" width="100%">
            {{ scope.row.alert_time | time }}
          </marquee>
        </template>
      </el-table-column>
      <el-table-column label="告警类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <marquee direction="left"
                   behavior="scroll" scrollamount="1"
                   scrolldelay="0" loop="-1" width="100%">
            {{ scope.row.category }}
          </marquee>
        </template>
      </el-table-column>
      <el-table-column label="威胁指标" show-overflow-tooltip>
        <template slot-scope="scope">
          <marquee direction="left"
                   behavior="scroll" scrollamount="1"
                   scrolldelay="0" loop="-1" width="100%">
            {{ scope.row.indicator }}
          </marquee>
        </template>
      </el-table-column>
      <el-table-column label="风险资产" show-overflow-tooltip>
        <template slot-scope="scope">
          <marquee direction="left"
                   behavior="scroll" scrollamount="1"
                   scrolldelay="0" loop="-1" width="100%">
            {{ scope.row.asset_ip }}
          </marquee>
        </template>
      </el-table-column>
      <el-table-column label="攻击阶段" show-overflow-tooltip>
        <template slot-scope="scope">
          <marquee direction="left" hspace="0"
                   behavior="scroll" scrollamount="1"
                   scrolldelay="0" loop="-1" width="100%">
            {{ scope.row.attack_stage }}
          </marquee>
        </template>
      </el-table-column>-->
      <el-table-column label="告警时间" show-overflow-tooltip>
        <template slot-scope="scope">
            {{ scope.row.alert_time | time }}
        </template>
      </el-table-column>
      <el-table-column prop="category" label="告警类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip></el-table-column>
      <el-table-column prop="asset_ip" label="风险资产" show-overflow-tooltip></el-table-column>
      <el-table-column label="攻击阶段" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.attack_stage | stage }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "vm-screen-main9",
    data() {
      return {
        timers:null,
        tableData: []
      }
    },
    created() {
      this.getData();
    },
    mounted() {
      this.timers = setInterval(()=>{
        this.getData();
      },10000 * 30);
    },
    destroyed(){
      clearInterval(this.timers);
    },
    methods: {
      //获取数据
      getData() {
        this.$axios
          .get('/yiiapi/demonstration/threat-range')

          .then((resp) => {

            let {status, data} = resp.data;

            if (status == 0) {
              this.tableData = data;
            }

          })
          .catch((error) => {

            console.log(error);

          });
      },
    }
  }
</script>

<style scoped lang="less">
  .vm-screen-main9 {
    padding: 0 16px 16px;

    /deep/
    .screen-table {
      background-color: transparent !important;

      &:before {
        height: 0;
      }

      .el-table__body-wrapper{
        overflow-x: inherit;
      }

      .el-table__header {
        th {
          /*background: rgba(0,215,233,0.24);*/
          border-width: 0;
          padding: 0;
          height: 36px;
          line-height: 36px;
          background: #034061;

          .cell {
            color: #fff;
          }
        }
      }

      .el-table__body {
        td {
          border-width: 0;
          padding: 0;
          height: 40px;
          line-height: 40px;
          background: #00134A;

          .cell {
            color: #fff;
          }
        }
      }
    }
  }
</style>
