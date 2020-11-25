<template>
  <div id="memery"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "memery",
  props: {
    options: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.graph();
  },
  methods: {
    graph () {

      if(!!!this.options){
        return false;
      }

      let statistics_time = this.options.statistics_time;

      let xAxis = this.options.mem;

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("memery"));

      myChart.showLoading({ text: '正在加载数据...' });
      myChart.clear();
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "20%",
          left: '2.5%',
          right: "1%",
          bottom: 24
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(205,220,57,0.3)",
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
          name: '单位(%)',
          nameTextStyle: {
            color: '#666'
          },
          min:0,
          max:100,
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
        visualMap: [{
          show: false,
          type: 'piecewise',
          pieces: [{
            gt: 85,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 85,
            color: "rgba(205,220,57,0.9)"
          }]
        }],
        series: [
          {
            name: "内存",
            type: "line",
            symbol: "none",
            data: xAxis,
            smooth: true,
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
                    color: "rgba(205,220,57,0)" // 100% 处的颜色
                  }
                ]
              }
            }
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
#memery {
  height: 100%;
}
</style>
