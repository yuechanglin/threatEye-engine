<template>
  <div id="status"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "status",
  props: {
    top_left: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      data: {
        dev_info: [],
        healthy_count: 0,
        warning_count: 0,
        offline_count: 0
      }
    }
  },
  created () {
    let data = this.top_left
    this.data = data;
  },
  mounted () {
    this.graph();
  },
  methods: {
    graph () {

      let warning_count = this.data.warning_count;
      let healthy_count = this.data.healthy_count;
      let offline_count = this.data.offline_count;
      let dev_info = this.data.dev_info;

     // console.log(dev_info)

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("status"));

      myChart.showLoading({ text: '正在加载数据...' });
      myChart.clear();
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        series: [
          {
            name: "系统状态监控",
            type: "pie",
            legendHoverLink: false,
            radius: ["0%", "65%"],
            hoverAnimation: "false",
            hoverOffset: 0,
            selectedOffset: 0,
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{b}: {c}"
              }
            },
            labelLine: {
              show: true,
              length: 24,
              length2: 10
            },
            itemStyle: {
              // color: ["#0288D1", "#CDDC39", "#4CAF50"]
              color: function (params) {
                return params.data.color;
              }
            },
            data: [
              { value: warning_count, name: "预警", color: "rgba(224,200,64,1)" },
              { value: healthy_count, name: "健康", color: "rgba(71,202,217,1)" },
              { value: offline_count, name: "离线", color: "rgba(220,95,95,1)" }
            ]
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["65%", "80%"],
            legendHoverLink: false,
            hoverAnimation: "false",
            hoverOffset: 0,
            selectedOffset: 0,
            label: {
              normal: {
                show: false,
                position: "outside",
                formatter: "{b}: {c}"
              }
            },
            itemStyle: {
              color: function (params) {
                return params.data.color;
              }
            },
            data: [
              { value: warning_count, name: "预警", color: "rgba(224,200,64,.5)" },
              { value: healthy_count, name: "健康", color: "rgba(71,202,217,.5)" },
              { value: offline_count, name: "离线", color: "rgba(220,95,95,.5)" }
            ]
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
#status {
  height: 100%;
}
</style>
