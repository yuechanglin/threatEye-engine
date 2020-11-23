<template>
    <div id="safe"></div>
</template>

<script type="text/ecmascript-6">
  require('../../../../../static/js/echarts-auto-tooltip');
export default {
  name: "safe",
  props: {
    mid_mid: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
      untreat: {}
    }
  },
  created(){
    let chartData = this.mid_mid;
    chartData.forEach((item,index,array)=>{
      if (item.degree == 'low') {
        this.$set(this.untreat, 'low', item.total_count);
      }else if(item.degree == 'medium'){
        this.$set(this.untreat, 'medium', item.total_count);
      }else if(item.degree == 'high'){
        this.$set(this.untreat, 'high', item.total_count);
      }
    });
  },
  mounted() {
    this.graph();
  },
  methods: {
    graph() {

     // let index = 0;

      let low = this.untreat.low;
      let medium = this.untreat.medium;
      let high = this.untreat.high;

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("safe"));

      myChart.showLoading({ text: '正在加载数据...' });

      myChart.clear();

      let option = {
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        color: ["#DC5F5F", "#E0C840", "#47CAD9"],
        series: [
          {
            name: "预警",
            type: "pie",
            radius: ["45%", "80%"],
            avoidLabelOverlap: false,
            hoverAnimation: "false",
            legendHoverLink: false,
            hoverOffset: 1,
            selectedOffset: 0,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            emphasis: {
              label: {
                show: true,
                formatter: ["{d|{d}%}", "{b|{b}}"].join("\n"),
                rich: {
                  d: {
                    fontSize: 20,
                    lineHeight: 40
                  },
                  b: {
                    color: "#999"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: high, name: "高危预警", selected: true },
              { value: medium, name: "中危预警" },
              { value: low, name: "低危预警" }
            ]
          }
        ]
      };

      // 绘制图表
      myChart.setOption(option);

      myChart.hideLoading();

      /*myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 0
      });

      //设置默认选中高亮部分
      myChart.on("mouseover", function(e) {
        if (e.dataIndex != index) {
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: index
          });
        }
      });
      myChart.on("mouseout", function(e) {
        index = e.dataIndex;
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: e.dataIndex
        });
      });*/

      tools.loopShowTooltip(myChart, option, {loopSeries: true});

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
#safe {
  height: 100%;
}
</style>
