<template>
  <div id="ddos" v-cloak>
    <div id="screenMap"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Ddos",
    data() {
      return {
        timers: null,
        myEcharts:null,
        loading:true,
        mapData:[{dest_ip:'202.106.40.115',dest_label:"[]",dest_location:[116.29845, 39.95933],
          dest_type:'remote',id:173,src_ip:'192.168.1.195',src_label:"['11234分支']",
          src_location:[116.29845, 39.95933],src_type:'local'}]
      }
    },
    created(){
     // console.log('555')
      this.myEcharts = null;
      this.getData();
    },
    mounted() {
      this.timers = setInterval(() => {
       this.getData();
      }, 10000 * 3);
    },
    destroyed(){
      clearInterval(this.timers);
      this.$echarts.dispose(document.getElementById("screenMap"));
    },
    methods: {
      //获取数据
      getData(){
        this.loading = false;
        this.$axios
          .get('/yiiapi/demonstration/external-distribution')

          .then((resp) => {
            this.loading = true;

            let {status, data} = resp.data;

            if(status == 0){

              this.mapData = data;
              setTimeout(() => {
                this.$nextTick(() => {
                  this.drawGraph();
                });
              },500);

            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      drawGraph() {

        let series = []; //在地图上显示的数据

        let symbol1 = ['image://static/image/f0.png', 'image://static/image/f1.png'];

        let symbol2 = ['image://static/image/f1.png', 'image://static/image/f0.png'];

        var symbolSize1 = [12,12],symbolSize2 = [12,12];

        let mapData = this.mapData;

        mapData.forEach(item => {

          if((!!item.src_location) && (!!item.dest_location)){
            let symbol = [];
            let symbolSize = [];

            if(item.src_type == 'local'){
              symbol = symbol1;
              symbolSize = symbolSize1;
            }else {
              symbol = symbol2;
              symbolSize = symbolSize2;
            }

            series.push({
              type: "lines",
              coordinateSystem: "geo",
              zlevel: 1,
              // 线数据集。  从哪个城市to哪个城市
              data: [{
                name: item.src_ip,
                toname: item.dest_ip,
                //coords: [item.src_location, [item.dest_location[1],item.dest_location[0]]]
                coords: [item.src_location, item.dest_location]
              }],
              //线上面的动态特效
              effect: {
                show: true,
                period: 5, //特效动画的时间，单位为 s。
                trailLength: .21,
                color: "#00D7E9", //射线颜色
                symbol:'triangle',
                symbolSize: 4
              },
              symbol: symbol,
              symbolSize: symbolSize,
            /* lineStyle: {
                normal: {
                  width: "",
                  curveness: 0.3
                }
              },*/
              lineStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#58B3CC'
                  }, {
                    offset: 1,
                    color: "#00D7E9",
                  }], false),
                  width: 1,
                  opacity: 0.03,
                  curveness: 0.1
                }
              },
              label:{
                show: false,
                color:'#ccc',
                position:'end',
                fontSize: 10
              },
              animation:false,
              animationThreshold: 0
            });
          }
        });


        series.push({
          type: "effectScatter",
          mapType: "china",
          name: "北京",
          coordinateSystem: "geo",
          zlevel: 1,
          data: [{name: "", value: [116.3972,39.9075]}],
          symbol:'image://static/image/f2.png',
          symbolSize: 8,
          /*itemStyle:{
            color: 'red'
          },
          rippleEffect: {
            period: 1, //动画的周期，秒数。
            scale: .5, //动画中波纹的最大缩放比例
            brushType: "stroke" //波纹的绘制方式，可选 'stroke' 和 'fill'。
          }*/
        });

        this.myEcharts = this.$echarts.init(document.getElementById("screenMap"));

        this.myEcharts.showLoading({ text: '正在加载数据...' });

        this.myEcharts.clear();

        let options = {
          //设置标题文本
          title: {
            text: "",
            subtext: "", //副标题
            left: "center", //组件离左侧的距离
            top: "4%", //标题距离顶部的距离
            textStyle: {
              //文本样式
              color: "#fff"
            }
          },
          geo: {
            map: 'world',
            roam: false,
            zoom: 1.2,
            itemStyle:{
              areaColor: 'rgba(9,102,232,0.12)',
              borderColor: '#0966e8'
            },
            emphasis:{
              label:{
                show: false,
              },
              itemStyle:{
                areaColor:'rgba(0,215,233,.12)'
              }
            },
            silent: false
          },
          tooltip: {
            show: false, //是否显示提示框组件，包括提示框浮层和 axisPointer。
            trigger: "item", //触发类型。
            formatter: "{b}", //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
            padding: [5, 10],
            transitionDuration: 0.2
          },
          regions:[{
            selected:false
          }],
          series: series
        };

        this.myEcharts.setOption(options);

        this.myEcharts.hideLoading();

        window.addEventListener("resize", () => {
          //this.myEcharts.resize();
          //this.myEcharts = null;
          //this.getData();
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  #ddos{
    width: 765px;
    height: 472px;
    #screenMap {
      width: 765px;
      height: 472px;
    }
  }

</style>
