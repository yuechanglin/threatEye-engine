<template>
  <div id="threatForm"></div>
</template>

<script type="text/ecmascript-6">
  require('../../../../../static/js/echarts-auto-tooltip');
  export default {
    name: 'threatForm',
    props:{
      form_data:{
        type:Array,
        default:[]
      }
    },
    data(){
      return{
        legend_attr:[],
        data_attr: []
      }
    },
    created(){
      let legendAttr = [];
      let that = this;
      this.form_data.filter(function (v,k) {
        legendAttr.push(v.category);
        that.data_attr.push({value:v.count, name:v.category});
      });
      this.legend_attr = legendAttr;
    },
    mounted(){
      this.drawGraph();
    },
    methods:{
      drawGraph(){

        let legendAttr = this.legend_attr;
        let dataAttr = this.data_attr;

       // let index = 0;

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('threatForm'))
        // 绘制图表

        myChart.showLoading({ text: '正在加载数据...' });
        myChart.clear();

        let option = {
          grid: {
            top: '0%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          color:['#0288D1','#CDDC39','#4CAF50','#00BCD4','#F57C00'],
          legend: {
            orient: 'vertical',
            x: 'left',
            top: 30,
            left: -4,
            selectedMode:false,
            data: legendAttr
          },
          series: [
            {
              name:'威胁类型',
              type:'pie',
              center: ['70%', '50%'],
              radius: ['45%', '60%'],
              avoidLabelOverlap: false,
              hoverOffset: 1,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
              },
              emphasis: {
                label:{
                  show: true,
                  formatter: ['{d|{d}%}','{b|{b}}'].join('\n'),
                  rich: {
                    d: {
                      fontSize: 16,
                      lineHeight: 30
                    },
                    b: {
                      color: '#999'
                    },
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: dataAttr
            }
          ]
        };
        myChart.setOption(option);

        myChart.hideLoading();

        tools.loopShowTooltip(myChart, option, {loopSeries: true});

       /* myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});//设置默认选中高亮部分
        myChart.on('mouseover',function(e){
          if(e.dataIndex != index){
            myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
          }
        });
        myChart.on('mouseout',function(e){
          index = e.dataIndex;
          myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
        });*/

        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }
    }
  }
</script>

<style scoped lang="less">
  #threatForm{
    height: 100%;
  }
</style>
