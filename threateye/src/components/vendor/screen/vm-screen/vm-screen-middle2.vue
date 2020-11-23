<template>
    <div class="vm-screen-middle2">
      <div class="block-all">
        <div class="block">
          <div id="flow"></div>
          <div class="box">
            <div class="line"></div>
          </div>
          <div class="relation" id="relation"></div>
        </div>
        <div class="arrow"></div>
        <div class="real">
          <div id="info_relation"></div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-middle2",
      data(){
          return{
            flow: {
              legendData:[],
              xAxisData:[],
              yAxisData:[],
              series:[],
              legendColor:[]
            },
            realData:[],
            timers:null
          }
      },
      created() {
        this.getData();
        this.getReal();
      },
      mounted() {
        this.timers = setInterval(()=>{
          this.getData();
          this.getReal();
        },10000 * 30);
      },
      destroyed(){
        clearInterval(this.timers);
      },
      methods:{
        //获取数据
        getData() {
          this.$axios
            .get('/yiiapi/demonstration/flow-statistics')
            .then((resp) => {

              this.flow = {
                legendData:[],
                xAxisData:[],
                yAxisData:[],
                series:[],
                legendColor:[]
              };
              this.realData = [];

              let {status, data} = resp.data;

              if(status == 0){

                this.flow.legendData = Object.keys(data);
                this.flow.legendData = this.flow.legendData.map(item => {return item.toUpperCase();});

                //console.log(this.flow.legendData)

                Object.values(data).forEach((val,key) => {

                  if(key == 0){
                    this.flow.xAxisData = val.map(item => {
                      return item.statistics_time;
                    });
                  }

                  let flow = val.map(item => {
                    return item.flow;
                  });

                  flow = flow.reverse();

                  this.flow.xAxisData = this.flow.xAxisData.reverse();

                  let legendName = this.flow.legendData[key];

                  legendName = legendName.toUpperCase();

                  if(legendName == 'http' || legendName == 'HTTP'){
                    var colors = '#007AFF';
                  }else if(legendName == 'https' || legendName == 'HTTPS'){
                    var colors = '#7C00FF';
                  }else if(legendName == 'ssh' || legendName == 'SSH'){
                    var colors = '#CC9D3B';
                  }else if(legendName == 'dns' || legendName == 'DNS'){
                    var colors = '#00C800';
                  }else if(legendName == 'ftp' || legendName == 'FTP'){
                    var colors = '#FF00C9';
                  }

                  this.flow.legendColor.push(colors);

                  this.flow.series.push({
                    data: flow,
                    type: 'line',
                    smooth:true,
                    symbol:'none',
                    name: legendName,
                    itemStyle:{
                      normal:{
                        textStyle:{
                          color: 'red',
                          opacity: .5,
                        },
                        lineStyle: {
                          width: 2,
                          opacity: .5,
                          color: colors
                        },
                        areaStyle: {
                          opacity: .2,
                          color: colors
                        }
                      }
                    }
                  });
                });
                this.$nextTick(() => {
                  this.drawGraph();
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        drawGraph() {
          let myChart = this.$echarts.init(document.getElementById('flow'));
          myChart.showLoading({ text: '正在加载数据...' });
          myChart.clear();
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            color: this.flow.legendColor,
            legend: {
              bottom: -5,
              left: 5,
              orient: "horizontal",
              itemWidth:12,
              itemHeight: 8,
              textStyle: {
                color: '#fff',
                fontSize: 10
              },
              /*inactiveColor:'#ccc',*/
              data: this.flow.legendData
            },
            grid: {
              top:'5%',
              left: '0',
              right: '3%',
              bottom: '10%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                color:'#ffffff'
              },
              axisLine:{
                lineStyle:{
                  color:'#00D7E9'
                }
              },
              axisTick:{
                show:false
              },
              splitLine:{
                lineStyle:{
                  color:'rgba(255,255,255,.12)'
                }
              },
              data: this.flow.xAxisData
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                color: '#ffffff'
              },
              axisLine:{
                lineStyle:{
                  color:'#00D7E9'
                }
              },
              axisTick:{
                show: false
              },
              splitLine:{
                lineStyle:{
                  color:'rgba(255,255,255,.12)'
                }
              }
            },
            series: this.flow.series
          };

          myChart.setOption(option);

          myChart.hideLoading();

          window.addEventListener("resize", () => {
            myChart.resize();
          });
        },
        getReal() {
          this.$axios
            .get('/yiiapi/demonstration/realtime-alert')
            .then((resp) => {

              let {status, data} = resp.data;
              //console.log(data)
              if(status == 0){
                //console.log(data)
                this.realData = data;
                this.$nextTick(() => {
                  this.drawReal();
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        drawReal() {
          let datalist = [];
          let linklist = [];

          let relelist = [];

          let realData = this.realData;

          //console.log(realData)

          if(realData.length > 0){
            realData.forEach(item => {
              var obj = {}, linkobj = {};
              obj.name = item.src_ip;

              obj.symbolSize = 10;
              datalist.push(item.src_ip,item.dest_ip);
              linkobj.source = item.src_ip;
              linkobj.target = item.dest_ip;
              linkobj.value = item.category;
              linkobj.lineStyle = {color:'#00D7E9',width: 2, curveness: 0.4};

              linklist.push(linkobj);

              relelist.push(item.category);
            });
          }
          //去重
          datalist = datalist.filter((x, index,self)=>self.indexOf(x)===index);
          relelist = relelist.filter((x, index,self)=>self.indexOf(x)===index);

          let newAttr = [];
          datalist.forEach((item,index) => {
            let col = '';
            if(index == 0){
              col = '#D44361';
            }else if(index == 1){
              col = '#D0A13F';
            }else if(index == 2){
              col = '#60C160';
            }else if(index == 3){
              col = '#FF00C9';
            }
            newAttr.push({name:item,label:{color:'#fff'},itemStyle:{color:col}});
          });

          //实时威胁检测
          let releAttr = [];

          //console.log(relelist)
          relelist.forEach((item,index) => {
            let col = '';
            if(index == 0){
              col = '#D44361';
            }else if(index == 1){
              col = '#D0A13F';
            }else if(index == 2){
              col = '#60C160';
            }else if(index == 3){
              col = '#FF00C9';
            }
            releAttr.push({
              name:item,
              itemStyle:{color:col}
            });
          });

          datalist = newAttr;

          var mychart = this.$echarts.init(document.getElementById("info_relation"));

          var option = {
            tooltip:{
              show: true,
              formatter:function (params) {
                return params.data.name;
              }
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [
              {
                type: "graph",
                layout: "force",
                //focusNodeAdjacency: true,
                force: {
                  repulsion: 300,
                  gravity: 0.15,
                  edgeLength: 100
                },
                symbolSize: 10,
                roam: true,
                label: {
                  normal: {
                    show: true, //显示
                    fontSize: 8,
                    position: "right" //相对于节点标签的位置，默认在节点中间
                  }
                },
                edgeSymbol: ["circle","arrow"], //边两端的标记类型
                //edgeSymbolSize: [4, 8],//边两端的标记大小
                edgeSymbolSize: [2, 6],
                edgeLabel: {
                  normal: {
                    show: false,
                    textStyle: {
                      fontSize: 8,
                      color: "#fff"
                    },
                    formatter: "{c}"
                  }
                },
                data: datalist,
                links: linklist,
                itemStyle: {
                  normal: {
                    borderColor: "#DBA500",
                    borderWidth: 0,
                    shadowBlur: 10,
                    /*color: "#DBA500"*/
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0.31,
                    width: 1,
                    color: "#fff",
                    curveness: 0.7
                  }
                }
              }
            ]
          };
          mychart.setOption(option, true);

          var relation = this.$echarts.init(document.getElementById("relation"));

          var option1 = {
            tooltip: {
              show:  false
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [
              {
                type: "graph",
                layout: "force",
                //focusNodeAdjacency: true,
                force: {
                  repulsion: 100,
                  edgeLength: 50
                },
                symbolSize: 4,
                roam: true,
                label: {
                  normal: {
                    show: false
                  }
                },
                edgeLabel: {
                  normal: {
                    show: false,
                    textStyle: {
                      fontSize: 8,
                      color: "#fff"
                    },
                    formatter: "{c}"
                  }
                },
                data: releAttr,
                itemStyle: {
                  normal: {
                    borderColor: "#DBA500",
                    borderWidth: 0,
                    shadowBlur: 10,
                    /*color: "#DBA500"*/
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0.31,
                    width: 1,
                    color: "#fff",
                    curveness: 0.7
                  }
                }
              }
            ]
          };
          relation.setOption(option1, true);
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-middle2{
  padding: 0 16px 16px;
  .block-all{
    display: flex;
    .block{
      position: relative;
      height: 245px;
      width: 450px;
      #flow{
        height: 245px;
        width: 450px;
      }
      .box{
        position: absolute;
        top: 5%;
        bottom: 20%;
        width: 100px;
        height: 77%;
        right: 3%;
        background-image: url("../../../../assets/images/screen/content-flow.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 4px;
          border-left-width: 0;
          border-right-width: 0;
          border-top-width: 0;
          box-shadow: 0 -1px 5px 0 rgba(0,215,233,0.72),
          0 1px 5px 0 rgba(0,215,233,0.72);
          animation: moveHover 5s ease-in-out 0.2s;
          animation-iteration-count: infinite;
          opacity: 0.6;
          border-bottom: 3px solid #00D7E9;
          background-image: linear-gradient(180deg, rgba(0,215,233,0.06) 0%, rgba(0,122,255,0.48) 100%);
        }
      }
      .relation{
        position: absolute;
        top: 5%;
        bottom: 20%;
        width: 100px;
        height: 45%;
        right: 3%;
      }
    };
    .arrow{
      width: 40px;
      height: 210px;
      background-image: url("../../../../assets/images/screen/content-arrow.png");
      background-repeat: no-repeat;
      background-size: 40px 210px;
    }
    .real{
      flex: 1;
      height: 245px;
      #info_relation{
        width: 100%;
        height: 220px;
      }
    }
  }
}

@keyframes moveHover {
  0% {
    height: 4px;
   /* background: rgba(0,215,233,0.06);*/
  }
  50% {
    height: 100%;
   /* background: rgba(0,122,255,0.48);*/
  }
  100% {
    height: 4px;
   /* background: rgba(0,215,233,0.06);*/
  }
}
</style>
