<template>
    <div class="vm-screen-main4">
      <div id="branch"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main4",
      data(){
          return{
            myEcharts:null,
            branch:{
              branchName:[],
              branchCount:[],
              highLists:[],
              mediumLists:[],
              lowLists:[]
            },
            timers:null
          }
      },
      created(){
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
      methods: {
        //获取数据
        getData(){
          this.$axios
            .get('/yiiapi/demonstration/branch-safe')
            .then((resp) => {
              let {status, data} = resp.data;

              if(status == 0){

                data = data.reverse();

                this.branch.branchName = data.map(item => {return item.branch_name});
                this.branch.branchCount = data.map(item => {return item.count});
                this.branch.highLists = data.map(item => {return item.high});
                this.branch.mediumLists = data.map(item => {return item.medium});
                this.branch.lowLists = data.map(item => {return item.medium});

                this.$nextTick(() => {
                  this.drawGraph();
                })
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },

        drawGraph(){

          this.myEcharts = this.$echarts.init(document.getElementById('branch'))
          this.myEcharts.showLoading({ text: '正在加载数据...' });
          this.myEcharts.clear();

          let option = {
            /*tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },*/
            color: ['#D44361','#D0A13F','#60C160'],
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '-12%',
              right: '0',
              bottom: '-8%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              show: false
            },
            yAxis: [
              {
                type: 'category',
                axisLine:{
                  show: false
                },
                axisTick:{
                  show: false
                },
                axisLabel:{
                  color:'#fff',
                  fontSize:12,
                  fontFamily:'PingFangSC-Regular',
                  margin: 20
                },
                position:'left',
                data: this.branch.branchCount,
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.9)'
                }
              },
              {
                type: 'category',
                axisLine:{
                  show: false
                },
                axisTick:{
                  show: false
                },
                axisLabel:{
                  color:'#fff',
                  fontSize:12,
                  fontFamily:'PingFangSC-Regular',
                  margin: 80,
                  formatter: function (value) {
                    let valAttr = value.split('');
                    let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");

                    if(reg.test(value)){
                      return (value.length > 5 ? (value.slice(0,5)+"...") : value )
                    }else {
                      return (value.length > 8 ? (value.slice(0,8)+"...") : value )
                    }
                   /* valAttr.forEach(item => {
                      if(num < 10){
                        if (re.test(item)){
                          num += 2;
                          length += 1;
                        }else {
                          num += 1;
                          length += 1;
                        }
                      }else {
                        return false;
                      }
                    });*/
                  },
                },
                position:'left',
                data: this.branch.branchName,
                triggerEvent: true
              }
            ],
            series: [
              {
                name: '高危',
                type: 'bar',
                stack: '分支安全',
                barWidth: '50%',
                data: this.branch.highLists
              },
              {
                name: '中危',
                type: 'bar',
                stack: '分支安全',
                barWidth: '50%',
                data: this.branch.mediumLists
              },
              {
                name: '低危',
                type: 'bar',
                stack: '分支安全',
                barWidth: '50%',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(0,215,233,.12)'
                },
                data: this.branch.lowLists
              }
            ]
          };
          this.myEcharts.setOption(option);
          this.myEcharts.hideLoading();

          window.addEventListener("resize", () => {
            this.myEcharts.resize();
          });

          var id = document.getElementById("extension");
          /*if(!id) {
            var div = "<marquee id='extension' behavior='scroll' direction='left' sytle='display:block'></marquee>";
            $("html").append(div);
          }*/
          if(!id) {
            var div = "<span id='extension' sytle='display:block'></span>";
            $("html").append(div);
          }

          this.myEcharts.on('mouseover', function(params) {
            //注意这里，我是以Y轴显示内容过长为例，如果是x轴的话，需要改为xAxis
            if(params.componentType == "yAxis") {
              //设置悬浮文本的位置以及样式
              $('#extension').css({
                "position": "absolute",
                "color": "#fff",
                "background":"rgba(0,0,0,.5)",
                "font-family": "PingFangSC-Regular",
                "font-size": "12px",
                "padding": "5px",
                "display": "inline"
              }).text(params.value);
              $("html").mousemove(function(event) {
                var xx = event.pageX - 10;
                var yy = event.pageY + 15;
                $('#extension').css('top', yy).css('left', xx);
              });
            }
          });

          this.myEcharts.on('mouseout', function(params) {
            //注意这里，我是以Y轴显示内容过长为例，如果是x轴的话，需要改为xAxis
            if(params.componentType == "yAxis") {
              $('#extension').css('display', 'none');
            }
          });
        },
      }
    }
</script>
<style scoped lang="less">
.vm-screen-main4{
  padding: 0 16px 16px;
  margin-right: 10px;
  #branch{
    height: 240px;
    width: 100%;
  }
}
</style>
