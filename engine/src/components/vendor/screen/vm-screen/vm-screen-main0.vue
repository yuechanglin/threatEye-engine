<template>
    <div class="vm-screen-main0">
      <div class="main0-item">
        <div id="threat-rank"></div>
        <h3 class="name">威胁等级分布</h3>
      </div>
      <div class="main0-item">
        <div id="threat-scat"></div>
        <h3 class="name">威胁类型分布</h3>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
  require('../../../../../static/js/echarts-auto-tooltip');
    export default {
      name: "vm-screen-main0",
      data() {
          return {
            timers:null,
            degree:[],
            category:[]
          }
      },
      created() {
        this.getData();
      },
      mounted() {
        this.timers = setInterval(()=>{
          this.getData();
       // },10000);
        },10000 * 30);
      },
      destroyed(){
        clearInterval(this.timers);
      },
      methods:{
        //获取数据
        getData(){
         //clearInterval(this.timers);
          this.$axios
            .get('/yiiapi/demonstration/threat-distribution')
            .then((resp) => {

              //console.log(resp)
              this.degree = [];
              this.category = [];

              let {status, data} = resp.data;

              if(status == 0){
                let {category,degree} = data;

                this.degree = degree;
                this.category = category;

                this.$nextTick(function() {
                  this.drawRank();
                });

                this.$nextTick(function() {
                  this.drawScat();
                });

              }
          })
            .catch((error) => {
            console.log(error);
          });
        },
        drawRank() {
          let degrees = this.degree;
          //degrees = [{degree: "medium", count: "2"}]
          let colorAttr = [];
          if(degrees){
            degrees.filter(item => {
             let name = '';let value = 0;let color = '';
             if(item.degree == 'high'){
               name = '高危预警';
               value = item.count;
               color = '#D44361';
             }else if(item.degree == 'medium'){
               name = '中危预警';
               value = item.count;
               color = '#D0A13F';
             }else if(item.degree == 'low'){
               name = '低危预警';
               value = item.count;
               color = '#60C160';
             }
             colorAttr.push(color);
             Object.assign(item,{value,name,itemStyle:{color:color}});
            });
          }else {
            return false;
          }
          // 基于准备好的dom，初始化echarts实例
          this.$echarts.dispose(document.getElementById("threat-rank"));
          let myEcharts = this.$echarts.init(document.getElementById("threat-rank"));
          myEcharts.showLoading({ text: '正在加载数据...' });

          myEcharts.clear();
          // 绘制图表
          let option = {
            /*tooltip: {
              show: true
            },*/
            /*tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },*/
            grid: {
              top: "20%",
              left: "5%",
              right: "5%",
              bottom: "5%",
              containLabel: true
            },
            color: colorAttr,
            series: [{
                name: "预警",
                type: "pie",
                center: ['50%', '42%'],
                radius: ["45%", "70%"],
                avoidLabelOverlap: false,
                //hoverAnimation: false,
                legendHoverLink: false,
                hoverOffset: 3,
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
                        lineHeight: 40,
                        color: '#fff'
                      },
                      b: {
                        color: "#fff"
                      }
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: degrees
              }
            ]
          };

          myEcharts.setOption(option);
          myEcharts.hideLoading();

          tools.loopShowTooltip(myEcharts, option, {loopSeries: true});

          window.addEventListener("resize", () => {
            myEcharts.resize();
          });
        },

        drawScat() {

          let categories = this.category;

          if(categories){
            categories.filter(item => {
              let name = ''; let value = 0;
              name = item.category;
              value = item.count;
              Object.assign(item,{value,name});
            });
          } else {
            return false;
          }

          // 基于准备好的dom，初始化echarts实例

          this.$echarts.dispose(document.getElementById("threat-scat"));

          let myEcharts1 = this.$echarts.init(document.getElementById("threat-scat"));


          myEcharts1.showLoading({ text: '正在加载数据...' });

          myEcharts1.clear();

          // 绘制图表
          var option1 = {
            grid: {
              top: "20%",
              left: "5%",
              right: "5%",
              bottom: "5%",
              containLabel: true
            },
            color: ["#007AFF", "#00D7E9", "#7E25DD", "#D839B6", "#BECE2A"],
            series: [
              {
                name: "威胁类型分布",
                type: "pie",
                center: ['50%', '42%'],
                radius: ["45%", "70%"],
                avoidLabelOverlap: true,
                /*legendHoverLink: false,*/
                hoverOffset: 3,
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
                        lineHeight: 40,
                        color: '#fff'
                      },
                      b: {
                        color: "#fff"
                      }
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: categories
              }
            ]
          };

          myEcharts1.setOption(option1,true);

          myEcharts1.hideLoading();

          tools.loopShowTooltip(myEcharts1, option1, {loopSeries: true});

          /*if(categories.length > 1){

          }else {
            myEcharts1.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: 0
            });
          }*/

          window.addEventListener("resize", () => {
            myEcharts1.resize();
          });


         /* myEcharts.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: 0
          });*/

          //设置默认选中高亮部分
         /* myEcharts.on("mouseover", function(e) {
            if (e.dataIndex != index) {
              rank.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: index
              });
            }
          });
          myEcharts.on("mouseout", function(e) {
            index = e.dataIndex;
            rank.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: e.dataIndex
            });
          });*/

          //自动轮播
          /*let index = this.categoryIndex;
          this.timer1 = setInterval(function () {
            var dataLen = option1.series[0].data.length;
            // 取消之前高亮的图形
            myEcharts.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: index
            });
            index = (index + 1) % dataLen;
            // 高亮当前图形
            myEcharts.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: index
            });
            // 显示 tooltip
            myEcharts.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: index
            });
          }, 3000);*/


        },
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main0{
  padding: 0 16px 16px;
  display: flex;
  .main0-item{
    flex: 1;
    position: relative;
    .name {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #00D7E9;
      position: absolute;
      bottom: 10px;
      width: 100%;
    }
    #threat-rank{
      height: 240px;
      width: 100%;
    }
    #threat-scat{
      height: 240px;
      width: 100%;
    }
  }


}
</style>
