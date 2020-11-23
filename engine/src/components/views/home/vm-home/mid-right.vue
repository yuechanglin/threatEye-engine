<template>
  <div id="edr"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "edr",
  props: {
    mid_right: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      threat_type: {
        type: [],
        num: []
      }
    };
  },
  created () {
    let chartData = this.mid_right;

    chartData.forEach((item, index, array) => {
      this.threat_type.type.push(item.alert_type);
      this.threat_type.num.push(item.total_count);
    });
  },
  mounted () {
    this.graph();
  },
  methods: {
    graph () {

      let type = this.threat_type.type;
      let num = this.threat_type.num;

      let maxNum = Math.max(...num);

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("edr"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(83,137,224,0.3)",
          borderWidth: 2,
          backgroundColor: "#fff",
          textStyle: {
            color: "#ccc"
          },
          axisPointer: {
            type: 'none'
          }
        },
        legend: {
          show: false
        },
        grid: {
          top: 0,
          left: 0,
          right: '4%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          min: 0,
          /*max:maxNum,*/
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
          }
        },
        yAxis: {
          type: 'category',
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
          data: type
        },
        series: [
          {
            type: 'bar',
            stack: '总量',
            label: {
              show: false
            },
            barWidth: '40%',
            color: '#5389E0',
            data: num,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.4)'
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>
<style scoped lang="less">
#edr {
  height: 100%;
}
</style>
