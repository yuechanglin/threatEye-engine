<template>
  <div id="flow"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "flow",
  props: {
    top_mid: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.graph();
  },
  methods: {
    graph () {

      //console.log(this.top_mid)
      if(!!!this.top_mid){
        return false;
      }

      let statistics_time = this.top_mid.statistics_time;
      let flow_diff = []
      this.top_mid.flow_diff.forEach(element => {
        flow_diff.push(Math.floor(element * 100) / 100)
      });

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("flow"));

      myChart.showLoading({ text: '正在加载数据...' });
      myChart.clear();
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "8%",
          left: 36,
          right: "4%",
          bottom: 24
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(76,175,80,0.3)",
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
        color: ["#4CAF50"],
        xAxis: {
          boundaryGap: false,
          //网格样式
          splitLine: {
            show: true,
            interval: 'auto', //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
            maxInterval: 3600 * 24 * 1000,
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
          data: statistics_time
        },
        yAxis: {
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
        },
        series: [
          {
            name: "流量",
            type: "line",
            symbol: "none",
            data: flow_diff,
            smooth: true,
            lineStyle: {
              color: "#4CAF50"
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
            },

          }
        ]
      });

      myChart.hideLoading();
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
#flow {
  height: 100%;
}
</style>
