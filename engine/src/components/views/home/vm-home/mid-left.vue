<template>
    <div id="test"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "mid-left",
  props: {
    mid_left: {
      type: Array,
      default:() => []
    }
  },
  data(){
    return{
      treat:{
        date:[],
        high:[],
        medium:[],
        low:[]
      }
    }
  },
  created(){
    let chartData = this.mid_left;
    chartData.forEach((item,index,array)=>{

      this.treat.date.push(item.statistics_time);
      this.treat.high.push(item.alert_count_details.high);
      this.treat.medium.push(item.alert_count_details.medium);
      this.treat.low.push(item.alert_count_details.low);

    });
  },
  mounted() {
    this.graph();
  },
  methods: {
    graph() {
      // 基于准备好的dom，初始化echarts实例

      let date = this.treat.date;
      let high = this.treat.high;
      let medium = this.treat.medium;
      let low = this.treat.low;

      let myChart = this.$echarts.init(document.getElementById("test"));

      myChart.showLoading({ text: '正在加载数据...' });

      myChart.clear();
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show:false,
          data: ['低危', '中危', '高危']
        },
        grid: {
          top: "5%",
          left: 0,
          right: 0,
          bottom: "2%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(71,202,217,0.3)",
          borderWidth: 2,
          backgroundColor: "#fff",
          textStyle: {
            color: "#ccc"
          },
          axisPointer: {
            type:'none'
          }
        },
        color: ["#47CAD9","#E0C840","#DC5F5F"],
        xAxis: {
          type: 'category',
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
          data: date
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
            name: '低危',
            type: 'bar',
            stack: '广告',
            barWidth:'20',
            data: low
          },
          {
            name: '中危',
            type: 'bar',
            stack: '广告',
            barWidth:'20',
            data: medium
          },
          {
            name: '高危',
            type: 'bar',
            stack: '广告',
            barWidth:'20',
            data: high
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
#test {
  height: 100%;
}
</style>
