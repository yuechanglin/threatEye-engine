<template>
    <div class="vm-screen-main6">
      <div class="attention" v-if="dataInfo.length">
        <div class="item">
          <div class="name">{{dataInfo[0].name | alarm}}</div>
          <div id="attent1"></div>
          <div class="num">{{dataInfo[0].value.alert_count}}</div>
        </div>
        <div class="item">
          <div class="name">{{dataInfo[1].name | alarm}}</div>
          <div id="attent2"></div>
          <div class="num">{{dataInfo[1].value.alert_count}}</div>
        </div>
        <div class="item">
          <div class="name">{{dataInfo[2].name | alarm}}</div>
          <div id="attent3"></div>
          <div class="num">{{dataInfo[2].value.alert_count}}</div>
        </div>
      </div>
      <div class="attention-table" v-if="dataInfo.length">
        <el-table :data="tableData" class="screen-table">
          <el-table-column prop="type" align="center" label="告警类型"></el-table-column>
          <el-table-column prop="data0" align="center" :label="dataInfo[0].name | alarm" show-overflow-tooltip></el-table-column>
          <el-table-column prop="data1" align="center" :label="dataInfo[1].name | alarm" show-overflow-tooltip></el-table-column>
          <el-table-column prop="data2" align="center" :label="dataInfo[2].name | alarm" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main6",
      data(){
          return{
            timers: null,
            dataInfo:[],
            tableData: [{
              type: '影响资产数',
              data0: '',
              data1: '',
              data2: ''
            }]
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
      methods:{
        //获取数据
        getData(){
          this.$axios
            .get('/yiiapi/demonstration/attention-alarm')

            .then((resp) => {

              let {status, data} = resp.data;

              this.dataInfo = [];

              //console.log(data)
              if(status == 0){
                Object.keys(data).forEach((key) => {
                  this.dataInfo.push({name:key,value:data[key]});
                });

                //console.log(this.dataInfo);
                this.$nextTick(function() {
                  this.drawGraph();
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        drawGraph(){
          let dataInfo = this.dataInfo;

          let alert0 = dataInfo[0].value.alert_distribution;
          let alert1 = dataInfo[1].value.alert_distribution;
          let alert2 = dataInfo[2].value.alert_distribution;

          this.tableData[0].data0 = dataInfo[0].value.effect_assets;
          this.tableData[0].data1 = dataInfo[1].value.effect_assets;
          this.tableData[0].data2 = dataInfo[2].value.effect_assets;

          let alert0Data = []; let alert1Data = []; let alert2Data = [];

          Object.values(alert0).forEach((key) => {
            alert0Data.push(key);
          });
          Object.values(alert1).forEach((key) => {
            alert1Data.push(key);
          });
          Object.values(alert2).forEach((key) => {
            alert2Data.push(key);
          });

          let attent1 = this.$echarts.init(document.getElementById('attent1'));
          attent1.showLoading({ text: '正在加载数据...' });
          attent1.clear();
          let option1 = {
            backgroundColor:'rgba(0,122,255,0.1)',
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: false,
              type: 'category',
              boundaryGap: false
            },
            yAxis: {
              show:false
            },
            series: [{
              data: alert0Data,
              type: 'line',
              smooth: true,
              itemStyle:{
                opacity :0
              },
              lineStyle:{
                color:'#007AFF',
                width: 1
              },
              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0,122,255,0.5)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0,122,255,0.2)" // 100% 处的颜色
                    },
                  ],
                  global: false
                }
              }
            }]
          };
          attent1.setOption(option1);

          attent1.hideLoading();
          window.addEventListener("resize", () => {
            attent1.resize();
          });

          let attent2 = this.$echarts.init(document.getElementById('attent2'));
          attent2.showLoading({ text: '正在加载数据...' });
          attent2.clear();
          let option2 = {
            backgroundColor:'rgba(255,0,201,0.1)',
            legend: {
              show:false
            },

            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: false,
              type: 'category',
              boundaryGap: false
            },
            yAxis: {
              show:false
            },
            series: [{
              data: alert1Data,
              type: 'line',
              smooth: true,
              itemStyle:{
                opacity: 0
              },
              lineStyle:{
                color:'#FF00C9',
                width: 1
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(255,0,201,0.5)'
                  }, {
                    offset: 1, color: 'rgba(255,0,201,0.2)'
                  }],
                  global: false // 缺省为 false
                }
              }
            }]
          };
          attent2.setOption(option2);
          attent2.hideLoading();
          window.addEventListener("resize", () => {
            attent2.resize();
          });

          let attent3 = this.$echarts.init(document.getElementById('attent3'));
          attent3.showLoading({ text: '正在加载数据...' });
          attent3.clear();
          let option3 = {
            backgroundColor:'rgba(243,171,21,0.1)',
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: false,
              type: 'category',
              boundaryGap: false
            },
            yAxis: {
              show:false
            },
            series: [{
              data: alert2Data,
              type: 'line',
              smooth: true,
              itemStyle: {
                opacity: 0
              },
              lineStyle:{
                color:'#F3AB15',
                width: 1
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(243,171,21,0.5)'
                  }, {
                    offset: 1, color: 'rgba(243,171,21,0.2)'
                  }],
                  global: false // 缺省为 false
                }
              }
            }]
          };
          attent3.setOption(option3);
          attent3.hideLoading();
          window.addEventListener("resize", () => {
            attent3.resize();
          });
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main6{
  padding: 0 16px 16px;
  .attention{
    .item{
      display: flex;
      width: 100%;
      height: 50px;
      line-height: 50px;
      margin-bottom: 9px;
      .name{
        flex: 1;
        color: #fff;
        padding-right: 10px;
        text-align: right;
        font-size: 14px;
      }
      #attent1{
        width: 300px;
      }
      #attent2{
        width: 300px;
      }
      #attent3{
        width: 300px;
      }
      .num{
        width: 64px;
        color: #fff;
        text-align: left;
        padding-left: 10px;
      }
    }
  }
  /deep/
  .screen-table{
    background-color: transparent!important;
    &:before{
      height: 0;
    }
    .el-table__header{
      th{
        /*background: rgba(0,215,233,0.24);*/
        border-width: 0;
        padding: 0;
        height: 28px;
        line-height: 28px;
        background: #034061;
        .cell{
          color: #fff;
        }
      }
    }
    .el-table__body-wrapper{
      overflow-x: hidden;
      .el-table__body{
        td{
          border-width: 0;
          padding: 0;
          height: 32px;
          line-height: 32px;
          background: #00134A;
          .cell{
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
