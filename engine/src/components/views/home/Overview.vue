<template>
  <div id="home_overview" v-loading.fullscreen.lock="loading"
       v-cloak>
    <div class="container">
      <el-row class="container_top">
        <i class="i_tips"></i>
        <span class="title">系统状态监控</span>
      </el-row>
      <!-- 第一排 -->
      <el-row class="container_item">
        <el-col :span="24">
          <div class="top_item">
            <span class="title">CPU</span>
            <div class="content">
              <home-top  v-if="loading_top" :options="equipment"></home-top>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 第二排 -->
      <el-row class="container_item">
        <el-col :span="24">
          <div class="top_item">
            <span class="title">Memery</span>
            <div class="content">
              <home-mid  v-if="loading_mid" :options="equipment"></home-mid>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 第三排 -->
      <el-row class="container_item">
        <el-col :span="24">
          <div class="top_item">
            <span class="title">Disk</span>
            <div class="content">
              <home-bom  v-if="loading_bom" :options="equipment"></home-bom>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import homeTop from "./vm-home/home-top";
import homeMid from "./vm-home/home-mid";
import homeBom from "./vm-home/home-bom";

import { eventBus } from '@/components/common/eventBus.js';

import {isSynthetical} from "../../../assets/js/validate";
export default {
  name: "system_control_move",
  data () {
    return {
      loading: false,
      loading_top:false,
      loading_mid:false,
      loading_bom:false,
      equipment: {
        cpu: [],
        mem: [],
        disk: [],
        statistics_time: []
      }
    };
  },
  components: {
    homeTop,
    homeMid,
    homeBom
  },
  created () {
    this.check_passwd();
    this.get_data();
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
          if (status == '602') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
            eventBus.$emit('reset')
          }
          if (status == '600') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
          }
        })
    },
    //获取数据
    get_data(){
      this.loading = true;
      this.$axios.get('/yiiapi/alert/dev-state', {
        params: {
          ip: '127.0.0.1'
        }
      }).then(response => {
          this.loading = false;
          let {status, data} = response.data;
          // console.log(data);
          data.forEach(element => {
            this.equipment.cpu.unshift(element.cpu);
            this.equipment.mem.unshift(element.mem);
            this.equipment.disk.unshift(element.disk);
            this.equipment.statistics_time.unshift(element.statistics_time);
          });

          if(this.equipment.cpu.length > 0){
            this.loading_top = true;
          }
          if(this.equipment.mem.length > 0){
            this.loading_mid = true;
          }
          if(this.equipment.disk.length > 0){
            this.loading_bom = true;
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    cpu () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("cpu"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "18%",
          left: '5%',
          right: "3%",
          bottom: "20%",
          containLabel: true
        },
        legend: {
          bottom: 5,
          left: 'center',
          orient: 'horizontal',
          textStyle: {
            fontSize: 12
          },
          selected: {
            // 选中'系列1'
            'CPU': true,
            '内存': true,
            '硬盘': true,
          },
          data: ['CPU', '内存', '硬盘']
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(2,136,209,0.3)",
          borderWidth: 2,
          backgroundColor: "#fff",
          textStyle: {
            color: "#ccc",
            align:'left'
          },
          axisPointer: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        xAxis: {
          boundaryGap: false,
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#F4F4F4"],
              width: 1,
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666"
            }
          },
          axisTick: {
            show: false
          },
          data: this.equipment_detail.statistics_time,
        },
        yAxis: [{
          name: '单位(%)',
          nameTextStyle: {
            color: '#666'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F4F4F4",
              width: 1,
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {

            textStyle: {
              color: "#666666"
            }
          },
          axisTick: {
            show: false
          }
        }],
        color: ["rgba(2,136,209,0.9)", "rgba(205,220,57,0.9)", "rgba(76,175,80,0.9)"],
        visualMap: [{
          show: false,
          type: 'piecewise',
          seriesIndex: 0,
          pieces: [{
            gt: 85,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 85,
            color: "rgba(2,136,209,0.9)"
          }]
        }, {
          show: false,
          type: 'piecewise',
          seriesIndex: 1,
          pieces: [{
            gt: 85,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 85,
            color: "rgba(205,220,57,0.9)"
          }]
        }, {
          show: false,
          type: 'piecewise',
          seriesIndex: 2,
          pieces: [{
            gt: 80,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 80,
            color: "rgba(76,175,80,0.9)"
          }]
        }],
        series: [
          {
            name: "CPU",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.cpu,
            lineStyle: {
              color: "rgba(2,136,209,0.9)"
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
                    color: "rgba(2,136,209,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(2,136,209,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            name: "内存",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.mem,
            lineStyle: {
              color: "rgba(205,220,57,0.9)"
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
                    color: "rgba(205,220,57,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(205,220,57,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            name: "硬盘",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.disk,
            lineStyle: {
              color: "rgba(76,175,80,0.9)"
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
                    color: "rgba(76,175,80,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(76,175,80,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          },
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    flow () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("flow_echarts"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "18%",
          left: '5%',
          right: "3%",
          bottom: "20%",
          containLabel: true
        },
        legend: {
          bottom: 5,
          left: 'center',
          orient: 'horizontal',
          textStyle: {
            fontSize: 12
          },
          selected: {
            // 选中'系列1'
            '流量': true,
          },
          data: ['流量']
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(187,120,247,0.3)",
          borderWidth: 2,
          backgroundColor: "#fff",
          textStyle: {
            color: "#ccc"
          },
          axisPointer: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        color: ["rgba(187,120,247,0.9)"],
        xAxis: {
          boundaryGap: false,
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#F4F4F4"],
              width: 1,
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666"
            }
          },
          axisTick: {
            show: false
          },
          data: this.equipment_detail.statistics_time
        },
        yAxis: [{
          name: '单位(Mbps)',
          nameTextStyle: {
            color: '#666'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F4F4F4",
              width: 1,
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666"
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [
          {
            name: "流量",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.flow,
            lineStyle: {
              color: "rgba(187,120,247,0.9)"
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
                    color: "rgba(187,120,247,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(187,120,247,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },

};
</script>

<style scoped lang="less">
#home_overview {
  padding: 24px;
  .container {
    text-align: left;
    .container_top{
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 4px;
      padding: 12px 24px;
      .i_tips{
        display: inline-block;
        height: 16px;
        width: 5px;
        vertical-align: baseline;
        background-color: #0070FF;
        margin-top: 4px;
      }
      .title{
        font-family: PingFangMedium;
        font-size: 18px;
        color: #333333;
      }
    }
    .container_item {
      .color1 {
        background: #f57c00;
      }
      .color2 {
        background: #0288d1;
      }
      .color3 {
        background: #47cad9;
      }
      .color4 {
        background: #dc5f5f;
      }
      .color5 {
        background: #cddc39;
      }
      .color6 {
        background: #4caf50;
      }
      .color7 {
        background: #47cad9;
      }
      .color8 {
        background: #e0c840;
      }
      margin-bottom: 10px;
      .top_item {
        background: #ffffff;
        height: 300px;
        border-radius: 4px;
        padding: 12px 24px;
        .title {
          height: 32px;
          line-height: 32px;
          font-family: PingFangMedium;
          font-size: 16px;
          color: #666666;
        }
        .content{
          height: 240px;
        }
      }
    }
  }
}
</style>
