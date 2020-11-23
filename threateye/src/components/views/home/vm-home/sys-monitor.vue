<template>
  <div>
    <el-dialog class="sys_box"
               width="840"
               :close-on-click-modal="false"
                 :modal-append-to-body="false"
               :visible.sync="$store.getters.sysMonitor">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_sys_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">拓扑图</span>
      </div>
      <div id="graph">
        <button @click="show_detail">detail</button>
        <!-- <div class="list list1">
          <el-tooltip class="item"
                      effect="dark"
                      :content="tips1"
                      placement="right">
            <el-button>
              <img src="@/assets/images/home/common/img1.png"
                   class="l_img"
                   alt="">
            </el-button>
          </el-tooltip>
        </div>
        <div class="list list2">
          <el-tooltip class="item"
                      effect="dark"
                      :content="tips2"
                      placement="left">
            <el-button>
              <img src="@/assets/images/home/common/img2.png"
                   class="l_img"
                   alt="">
            </el-button>
          </el-tooltip>
        </div>
        <div class="list list3">
          <el-tooltip class="item"
                      effect="dark"
                      :content="tips3"
                      placement="right">
            <el-button>
              <img src="@/assets/images/home/common/img3.png"
                   class="l_img"
                   alt="">
            </el-button>
          </el-tooltip>
        </div> -->
      </div>
    </el-dialog>
    <el-dialog class="sys_detail"
               width="840"
               :close-on-click-modal="false"
                 :modal-append-to-body="false"
               :visible.sync="state_detail">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_detail"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">系统状态监控</span>
      </div>
      <div class="sys_detail_content">
        <div class="detail_item">
          <p>CPU</p>
          <div id='cpu'></div>
        </div>
        <div class="detail_item">
          <p>Memery</p>
          <div id='memery'></div>
        </div>
        <div class="detail_item">
          <p>Disk</p>
          <div id='disk'></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "safe",
  data () {
    return {
      state_detail: false,
      tips1: '引擎',
      tips2: '沙箱',
      tips3: '探针',
      equipment: {
        probe: [],
        engine: [],
        sandbox: []
      },
      //---   
      base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAYKADAAQAAAABAAAAYAAAAACpM19OAAAPo0lEQVR4Ae1dDXRUxRWe+3aXEORHpICEbKLWgx7/qhSVpiG7SZCWqmil0B8qVvGnVq2eeo5atYpabbH4X49CDz1YC3IKbW2ptaSQ/QlKUapVi1ZrtfkDDQgcSYRk973pN5ss7s/M27/33u728M7J2Tf33rkzc+/MnTt35k0YK+OnM9x0VnvQ90pXuLG5XJuhlWvFuwL+87gRDTLOzzB0Y0N7yH9VObalLBXQFfRdbDD+LOesUgidM+5ihvEkRsMSzjmVkyLKqrJCsO0h35XE+RMQvrzzEK2t4bSQGoMHy0ERZaWAzqDvCvT2ZRC+eb2Jtng4zalqDO4udSWYN6SEat8ealhInK3MKPyhOhPRuzTM5ffWtXaXUDPSqlIWCugINcxhBv0uZuvTmqAGELF3hnPNN6Ex+IGaqriYkldAd6ipTufRjfEJN2dxEXtzmHaEf1LD87tyzutABvlE5kDB2RTR1dY8BcJfbyZ8YvSRKS/OTooYfRu7tjaPM6UrErJkFfDR32aP1vXoHyD8o1SygZ1fQxUTvKSxJ1U0Ag4ep+kHIi17ts0cY0ZXDFxJKoDzxVrvgb7VkNyJKqHAdi7z+hoXeOvWHqjxha/WNLZYRRuDcza1tzfyjOBtSucwsiTngI6g724sqH6klAXRo7X+0PWpeHhKNzOD/TQVnpzWltQ2Bm9JhhUvVXIK6Az4/ZyMTTAb0p6KCj/l9YcuhfnhMrF1hhruNAzz0YC836rxh56R5XcaJm2k05WIlycmSgh/lVL4RM96/RMXqYQv+Hh94bsY0fI4T/kvX7Ej3DRVjnMWWlIKMD6JrIDwq6QiIHrVPXL0AkQadCk+AYhQxDVQ0l8TQEmvKKMyYkTX9QT8I5MQRUiUjAJgv+fDplwgkwEWVLs8bs+FVdPWfyLDp8IQB4qO4jQfI+G/qbhDac6OPUh8yaF0kV5KYg5obzt3LIv2vgWHcWKqHCB8Q2M0s9ofCqTiMqU72xrPNnS9DeFSj4wWvDl4N+fDW8YvH1hJjADSe5fKhC8ahLjbA/kKyDsjsJW4dqtKMDBFpDO+4oPXZh2horEbXnQFdAT80yDmS2UNRQ99vWb8hNtluGxhXr//QQzzrUp6mKKBvf33KPE2I4quAHg92ERJDy8L88AYXU4nrx0oRAZEiw3N7boKk3JUxQdBvmt2BvzHqPB2wouqgI5w45cg5iZpAzn7JXz1l6W4HIHVMwKvMeIPK7NxNmyA+N1KvI2IoiqAG4Z81UrsY4/riB9a2e5K15F3Y1TtUfHEgFuARdypKrxd8KIpoCPUNAuxntNlDcPE+ZjV4ePx9X/cD5P2gKw8AYMZ1LCd7PgoKJoCONfTYjlCELDVvdoI10Pi3eqn0j3mMbNRADXMcXouKIoCRJwfQ362VMDEV1afvck8xi/NmBkYGwXEHlRRilEQIX6lCm8HvCgKMIzIdTLPRzSQyP20HQ2N8xxuaCsyeESL+PZ5w+L0dv86rgARj4fw58saBvPwjreh9SUZziqY2B+Gf/sXJT/OJnTs6pGGRJR5CkC4C8ibV9bOcLgerucEeWb6tRyeDBW7ZX0HDtyBNUQjtiSnAPsvRKc3eo4c/uOjP9fSl0ydntI0bSVCFOelYwYhWLhdiLe1KryV8CKMAH2uqgHDqCKjAnaGm0/qO9j3BmfGjVDkVGzcjMTfNOwB3NK/9+Dr2E84XsU/Dq8e95n1ZpMxFmazOZ/nitPb+eu4AjD5flXaIGKvHO1reV+KGwLygN89YESehgmrkdJxdpxBxlOZth3F6hqL71YpDwHkbGxX2+56Jd5ChKMKaG+beRyE55XVH6ZEHa8ZytBF/HzR62X5D8E4q4OZm3korXjBRBxUoGJguMkZeZjlzxbnqAKYHvm8smLEtylxQwhMngjcZfNEz8xIZbCQKQ0ndV1NM+aGdFYBJgIk8mRUAJar47JqHqeMdF5/YDtGwW4VP8wD/4cK4PJGYUI8UK3rb6qEEYdDYNvj76a/xP9pigcSvGANmdrlFe7o5nPk26OZmOeAd3YEEDtJVjfEYN4U24gyXCKMKt2rIbjeRFjaO7G9CLxl5ULC3WxPy58A0KIDtQlJW16dVQBjUtMAz0hpChJbLUIU6LWXYcKWbsxDOVAiXTIYeEvMKX+H4jvkmCEop8mmeAuQjilgx7bzR8CDkS/xifZm2xYcyFqraa5ZsCGvJuaB8F92aZof+PWJcLN3TTNMFcCJ226C3GYVtBJn7N+vPOOJcrJWgKhTta9V+PBTd7zQVGsMGJNIG9Y92dfSKXC5PBgByIMxpXiAGalAWQZ2TAFcM8bi2KDq2adCmMGrvtgqbLipHTfL79HcHw3oESUJ5mnpaQplhjwQjpkg0jz9yvoRzxi/UeYtAIEJw7QDYoTYHo5wTAGw/soYPze0UQXIMe+sLsZNFQAvydzjyrvkTzM6poDJZ83YC39faoRIM8Z8WiXn3vQMJsYglpdpzKUFjilAHA9hXOHtcBqdS6WtotW4uQkig3qsKkvFxzEFDFVA+rEcwslFGQFRnVeqBCPgGJn/McNbgXNWAcTk53yIbPe3ZcKCjT9eBhew2GLPM/FdFd4quKMKwGJps6ziWAmfmCmGL8tXMEwzTlDyIL5dfP6kxFuEcFQBLoO9IKs3omKVnS+Gj5XhbIVxUn6DhiEQtrXsIeaOKmCSP/A2hrbUHeURXRqos1MIWOkqFQDz9LydZcd5O6oAFmyswF0m++OFJ/6iwacmpu1+73xxXiVMX42qHKzA3lfhrIQ7qoAuhi8YOT9G3gDuk8Ntguq7T4PpU7Y/ajDcyGL/1TfKCljd7PaAvx7HSL5vwrfeyQNRuOSpyaQuIkTn6wz5v2tGYwXOEQXwbVd6GBmm18ygN47o6tlVZ0WjsuLBeXMmOmxLLsHNXNWZ6ArBO6KAzt63r0OXyjjJotfNLKQx2ebdtXkOYk9Un5Ges1EG8Xsz0hVAYLsCxAd46Em3Z1NHbIDMzYauUJqD+r7zsQ9QkR0f/m07vxuwXQEs2nc9ev/YrBqLuyG6Qw1nZEVbABHm1nnZZhcTNU7d/SRb+lzpbFWA2IaEq3dtWqWIAmmwIYBuaAtUOCvggyOSfVnKi+gtrNZl+9PniiOR0jwFAm1VgN778eUwP8kb8UTrKqhikWpjHabhG7aey4z2XQJXeLhMbsTpfkRsH5Hh8GX9NTJ4oTBbFYD48w2JFRSnFlwu922DZ0D5ukRc/B0Km9wV/vCCeNryX+JXyXiiQ3R7R01Zhdn55whDpC0WUa+L7fie2DYF4MqZM2H7k+I78HJ+Xz1j0ztCAG6X+36ZIAQMdvd6Fa4QeFeoqQnMpeEHbBY9QtOWR8Y2BvfhfVVaOfCIBvYMnJMGLxBgmwJQr7RT0Bo+P4rXt6qh9RW8b4qnE3+hgAb436cnwqx417ku//ISX2WOGD5iWbwMjdOv4u+Jv/DSzk1MW/FumwLQ25MUIIJw1Q0TNyRWmjT1KDCYYemlSoMjkivWGbRs3PTnP47XDVcjbMEowJGV1Ic3pUIKTduigNhHEilDHVGVralXzdT4WltwwOof0kYQm9e+ufFkKS4fIOe3SbMRi2jDXJKJl9JGJwKGx4ggnpRPnkBbFGBoRtoZflReKmjApXOB8L9Z1FicZ7uSsomrLzEipRM77t1arbjc9aUkJkjE6hT58PhUeCFpWxQAd+6U1EpB0PtSYSLt9U34DbyO92U4rCHmiitnZLhcYFGuL5XRw8xw7nH9TIZjmvaeDI62jZTB84W5881omo/4eBFOTHwwgaWdC/3ghVkTukI9X0ejDLh5ieSxd/Q4YrrxMMLCdXBh0wnScqQDcKP6PIj5C+mYwSJYVF+OG1u2YL0bxiesrfiKMnYWCB3moKxAnKuxVGaWMjvUSE445ZBcfSz/D7l/uH6+EQ25diDSPwfCNa0D8NNxqcdC8H7qEP8sX4Tf3r+nX97DwSNmUhiDeTLqcGLpxgNkDGCyDmExtprhxlhZMS631iOD5wszbXy+TCH6tKOGGO1fGbwfQr9Xx1eNufDG+HhgR8D/XK63ocNvvwtirs26LJzexkiEr48/cdQ9uQ+JoxKRqghvz5pfFoS2zAHw93enlo3edhT+48UG9OichC/4QCjjosQfT+Vplh4M6iWvxM3oU3GykQlXeqvV/5fAlhEA8/JqaoMKTUMg8zsCDfvRM7MyAbrB5kBxlh6uxVyVsxnM1G5bFFBpaOGDsBuxSVRRA3gg0BO1oFG/NTy0ZXSEdyMAU42LlW5Fxm/KssEiLBKGu6AHH3Zg2N8GLmKyPQVlzUXP9mdWFrVXj5oCBQQLKj41M6UCrEq3Bxr+BF5pS3cI/hPcVfiE2+N+tKp+Y0dqeWJfuHNXz98hmDRXNpU217QIBsKZmorLXd9IzNu9ufEEPaLfBRs/X9lpNO07tb6g5SPANgVgwm2AzQ/FG4pehu+6+JMVlZ57Jk7f9GEcLvtFHGg6tgLboARrR6jGbqn1hZfIyhSwznDzaajz4yg3ebsSN/Hi0ydpFFXFK1u4bQoQFYAPvhwm4wr0+jB3u75XWx/Ynm3FsA14ERYHazADe7LNY0aH3r/S6wtelmk9AeET3F7xj4KW4n0k6Nd4R56wUERKzfjni7NVAWJHTN+//6Jqf2BVpobLGiA8mSinx00WUrJsSbDYapfR0hpf8OZc6iCuVdD0SDMuCv9FEkOLE7YqwIq6ih7ZGWy8BIvl+zAaJuXEExMukesGBP3COeVzkLjkFRCXhdim7A71NMB1+hrmkgsxWVbFccm/1I7JtMVFrjVDX1Mmo0ssVTYKSJWbODDFXfRZ3GoyhgwN18+w3VRR8Z63bsOeVNrD6cMSOCyBwxKwSQLCd9+xeWaNTextZ1u2cwD+r+RshA8WYzI+S0gJLubLWOUuxir3z7ZLzcICyk4BsYVSyP8I1gbXyeSgEd0E3125ByDLU0xY2SkAPf8OhPnuMhOay+U6r7oh8JwZTangbNkPsKtxO8Ozx8PsZDyuouv61XbVwWq+1ga7rK5dCr+IfqAZ/n7GYyEIP5yakrVkk2U1AjDJZunt4L9LlslTNhUV8kTvTzs0q5Dzuwp4yYHLSgEYAZuzlGBblnRFJysrBcR2sojtzCQ1KGptJppSwZeVAgaFRuvMhAe/OpS65WhGX2xc2SkAB2mxpUj9SsFp7vuUuBJElJ0CYgdpiS2TyRLuZ0vsxLUMWaKwslOAkONoTndC2DuSZUr9gF2bDCv9VFkqYOgzoisSxUsavwe2/9+JsHJ4L0sFCMGKqCcioA+J99jE29Bk27e8ogy7nrIKRaQKwcvppg5i1fim6wexSwFTCcog/T/CoEFRXI2W3gAAAABJRU5ErkJggg==',
      graph_echart_array: [],
      graph_echart_array_item: [],
      probe_array: [],
      engine_array: [],
      links_array: [],
      sysState_data: {},
      only_one: false,
      only_to: false,
    };
  },
  created () {
    console.log(document.getElementById("graph"));
    this.$nextTick(function () {
      this.get_data()
      console.log(document.getElementById("graph"));
    })
  },
  mounted () {
    console.log(document.getElementById("graph"));
  },
  methods: {
    get_data () {
      this.$axios.get('/yiiapi/alert/system-state')
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          this.sysState_data = data
          data.dev_info.forEach(element => {
            //       { name: '引擎', type: "2" },
            // { name: '沙箱', type: "4" },
            // { name: '探针', type: "1" },
            switch (element.type) {
              case '1':
                this.equipment.probe.push(element)
                break;
              case '2':
                this.equipment.engine.push(element)
                break;
              case '4':
                this.equipment.sandbox.push(element)
                break;
              default:
                break;
            }
          });
          console.log(document.getElementById("graph"));
          setTimeout(() => {
            this.graph_echart()
            console.log(document.getElementById("graph"));
          }, 10000);
        })
        .catch(error => {
          console.log(error);
        })
    },

    // 拓扑图
    graph_echart () {
      this.graph_echart_array = [];
      this.graph_echart_array_item = {};
      // 探针数组
      this.probe_array = [];
      // 引擎数组
      this.engine_array = [];
      // 引擎和探针的关系
      this.links_array = [];
      this.sysState_data.dev_info.forEach(item => {
        if (item.status == 'offline') {
          item.status = '离线'
        } else if (item.status == 'online') {
          item.status = '在线'
        }
        // 判断类型
        if (item.dev_type == '1') {
          this.only_one = true;
          this.probe_array.push(item);
        }
        if (item.dev_type == '2') {
          this.only_to = true;
          this.engine_array.push(item);
        }
        if (item.dev_type == '3') {
          this.only_one = false;
          this.graph_echart_array_item = {
            name: '节点0',
            names: '引擎/探针',
            dev_ip: item.dev_ip,
            status: item.status,
            x: 350,
            y: 200,
            symbol: this.base64,
            //节点上面的文字	
            label: {
              normal: {
                position: "bottom",
                show: true,
                textStyle: {
                  fontSize: 12,
                  color: '#666',
                  align: 'center',
                },
                formatter: '引擎/探针'
              }
            }
          }
          this.graph_echart_array.push(this.graph_echart_array_item);
        }
      });
      if (this.only_one) {
        // 多个探针 模版
        this.probe_array.forEach(item => {
          this.data_item1 = {
            name: '节点1',
            x: 300,
            y: 100,
            symbol: this.base64,
            names: '探针',
            dev_ip: item.dev_ip,
            status: item.status,
            //节点上面的文字	
            label: {
              normal: {
                position: "bottom",
                show: true,
                textStyle: {
                  fontSize: 12,
                  color: '#666',
                  align: 'center',
                },
                formatter: '探针'
              }
            }
          };
          this.links_item = {
            source: '节点0',
            target: '节点1',
            dev_ip: item.dev_ip,
            status: item.status,
            names: '探针'
          };
          switch (index) {
            case 0:
              this.data_item1.name = '节点1';
              this.links_item.target = '节点1';
              this.data_item1.x = 100;
              this.data_item1.y = 200;
              this.graph_echart_array.push(this.data_item1);
              this.links_array.push(this.links_item);
              break;
            case 1:
              this.data_item1.name = '节点2';
              this.links_item.target = '节点2';
              this.data_item1.x = 100;
              this.data_item1.y = 100;
              this.graph_echart_array.push(this.data_item1);
              this.links_array.push(this.links_item);
              break;
            case 2:
              this.data_item1.name = '节点3';
              this.links_item.target = '节点3';
              this.data_item1.x = 100;
              this.data_item1.y = 300;
              this.graph_echart_array.push(this.data_item1);
              this.links_array.push(this.links_item);
              break;
            case 3:
              this.data_item1.name = '节点4';
              this.links_item.target = '节点4';
              this.data_item1.x = 600;
              this.data_item1.y = 200;
              this.graph_echart_array.push(this.data_item1);
              this.links_array.push(this.links_item);
              break;
            case 4:
              this.data_item1.name = '节点5';
              this.links_item.target = '节点5';
              this.data_item1.x = 600;
              this.data_item1.y = 100;
              this.graph_echart_array.push(this.data_item1);
              this.links_array.push(this.links_item);
              break;
            case 5:
              this.data_item1.name = '节点6';
              this.links_item.target = '节点6';
              this.data_item1.x = 600;
              this.data_item1.y = 300;
              this.graph_echart_array.push(this.data_item1);
              this.links_array.push(this.links_item);
              break;
            case 6:
              this.data_item1.name = '节点7';
              this.links_item.target = '节点7';
              this.data_item1.x = 300;
              this.data_item1.y = 100;
              this.graph_echart_array.push(this.data_item1);
              this.links_array.push(this.links_item);
              break;
            case 7:
              this.links_item.target = '节点8';
              this.data_item1.name = '节点8';
              this.data_item1.x = 300;
              this.data_item1.y = 300;
              this.graph_echart_array.push(this.data_item1);
              this.links_array.push(this.links_item);
              break;
            default:
              break;
          };
        });
      }
      if (this.only_to) {
        // 2 一台引擎模版
        this.data_item0 = {
          name: "节点0",
          x: 350,
          y: 200,
          symbol: this.base64,
          names: "引擎",
          dev_ip: this.engine_array[0]
            .dev_ip,
          status: this.engine_array[0]
            .status,
          //节点上面的文字
          label: {
            normal: {
              position: "bottom",
              show: true,
              textStyle: {
                fontSize: 12,
                color: "#666",
                align: "center",
              },
              formatter: "引擎",
            },
          },
        };
        // 一台引擎
        if (
          this.engine_array
            .length == 1
        ) {
          this.graph_echart_array.push(
            this.data_item0
          );
        }
      }
      setTimeout(() => {
        var myChart = this.$echarts.init(document.getElementById("graph"));
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: function (params, trigger) {
              return '设备：' + params.data.names + '</br>' + 'IP地址：' + params.data.dev_ip + '</br>' + '状态：' + params.data.status
            }
          },
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'quinticInOut',
          series: [{
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
              normal: {
                show: false
              }
            },
            focusNodeAdjacenc: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            edgeSymbol: ['arrow', 'arrow'],
            edgeSymbolSize: [7, 7],
            edgeLabel: {
              normal: {
                show: false
              },
              emphasis: {
                textStyle: {
                  fontSize: 30 //边节点显示的字体大小
                }
              }
            },
            data: this.graph_echart_array,
            links: this.links_array,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          }]
        };
        myChart.clear(); //只是清理画布，而不会删除 生成的元素节点
        myChart.setOption(option);
        //添加点击事件
        myChart.off("click"); //防止累计触发
        myChart.on('click', function (params) {
          console.log(params);
          // 弹窗打印数据的名称
          // this.iot_detail_title = params;
          // if (params.dataType == "node") {
          //   this.iotcontent = true;
          //   setTimeout(function () {
          //     this.iot_detail_top(this.iot_detail_title); //iot具体cpu/内存/硬盘/流量
          //   }, 600);
          // }
        })
      }, 1000);

    },

    closed_sys_box () {
      this.$store.commit("CHANGE_SYS", false);
    },
    show_detail () {
      this.state_detail = true;
      setTimeout(() => {
        this.cpu();
        this.memery();
        this.disk();
      }, 10);
    },
    closed_detail () {
      this.state_detail = false;
    },
    graph () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("graph"));
      // 绘制图表
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function (params, trigger) {
            return (
              "设备：" +
              params.data.names +
              "</br>" +
              "IP地址：" +
              params.data.dev_ip +
              "</br>" +
              "状态：" +
              params.data.status
            );
          }
        },
        animationDurationUpdate: 1000,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 50,
            roam: true,
            label: {
              normal: {
                show: false
              }
            },
            focusNodeAdjacenc: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            edgeSymbol: ["arrow", "arrow"],
            edgeSymbolSize: [7, 7],
            edgeLabel: {
              normal: {
                show: false
              },
              emphasis: {
                textStyle: {
                  fontSize: 30 //边节点显示的字体大小
                }
              }
            },
            data: [
              {
                name: "节点0",
                x: 350,
                y: 200,
                symbol: this.base64,
                names: "引擎",
                dev_ip: "192.168.1.1",
                status: "0",
                //节点上面的文字
                label: {
                  normal: {
                    position: "bottom",
                    show: true,
                    textStyle: {
                      fontSize: 12,
                      color: "#666",
                      align: "center"
                    },
                    formatter: "引擎"
                  }
                }
              }
            ],
            links: this.links_array,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          }
        ]
      };
      myChart.clear(); //只是清理画布，而不会删除 生成的元素节点
      myChart.setOption(option);
      //添加点击事件
      myChart.off("click"); //防止累计触发
      myChart.on("click", function (params) {
        // 弹窗打印数据的名称
        this.iot_detail_title = params;
        if (params.dataType == "node") {
          this.iotcontent = true;
          setTimeout(function () {
            this.iot_detail_top(this.iot_detail_title); //iot具体cpu/内存/硬盘/流量
          }, 600);
        }
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    cpu () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("cpu"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "10%",
          left: 0,
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(2,136,209,0.3)",
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
        color: ["#0288D1"],
        xAxis: {
          boundaryGap: false,
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
          data: [
            "08:00",
            "08:10",
            "08:20",
            "08:30",
            "08:40",
            "08:50",
            "09:00",
            "09:10",
            "09:20",
            "09:30",
            "09:40",
            "09:50",
            "10:00"
          ]
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
            name: "cpu",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: [32, 14, 16, 30, 35, 20, 18, 32, 14, 16, 30, 35, 20, 18],
            lineStyle: {
              color: "#0288D1"
            },
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
                    color: "rgba(2,136,209,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(2,136,209,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    memery () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("memery"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "10%",
          left: 0,
          right: "5%",
          bottom: "5%",
          containLabel: true
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
        color: ["#CDDC39"],
        xAxis: {
          boundaryGap: false,
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
          data: [
            "08:00",
            "08:10",
            "08:20",
            "08:30",
            "08:40",
            "08:50",
            "09:00",
            "09:10",
            "09:20",
            "09:30",
            "09:40",
            "09:50",
            "10:00"
          ]
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
            name: "memery",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: [32, 14, 16, 30, 35, 20, 18, 32, 14, 16, 30, 35, 20, 18],
            lineStyle: {
              color: "#CDDC39"
            },
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
                    color: "rgba(205,220,57,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    disk () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("disk"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "10%",
          left: 0,
          right: "5%",
          bottom: "5%",
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
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        color: ["#4CAF50"],
        xAxis: {
          boundaryGap: false,
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
          data: [
            "08:00",
            "08:10",
            "08:20",
            "08:30",
            "08:40",
            "08:50",
            "09:00",
            "09:10",
            "09:20",
            "09:30",
            "09:40",
            "09:50",
            "10:00"
          ]
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
            name: "disk",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: [32, 14, 16, 30, 35, 20, 18, 32, 14, 16, 30, 35, 20, 18],
            lineStyle: {
              color: "#4CAF50"
            },
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
                    color: "rgba(76,175,80,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(76,175,80,0.1)" // 100% 处的颜色
                  }
                ]
              }
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

<style lang="less">
.el-tooltip__popper {
  z-index: 9999 !important;
}
.sys_box {
  z-index: 3000 !important;

  .el-dialog {
    width: 842px;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      width: 842px;
      height: 462px;
      padding: 30px;

      .closed_img {
        position: absolute;
        top: -18px;
        right: -18px;
        cursor: pointer;
        width: 46px;
        height: 46px;
      }
      .title {
        height: 24px;
        line-height: 24px;
        text-align: left;
        font-size: 0;

        .mask {
          width: 4px;
          height: 16px;
          display: inline-block;
          background: #0070ff;
          vertical-align: baseline;
        }

        .title_name {
          font-size: 16px;
          color: #333333;
          margin-left: 6px;
          display: inline-block;
          vertical-align: super;
          font-family: PingFangMedium;
        }
      }
      #graph {
        width: 100%;
        height: calc(100% - 24px);
        border: 1px solid red;
        position: relative;
        .list {
          width: 72px;
          height: 72px;
          position: absolute;
          /deep/ .el-button {
            padding: 0;
            border-width: 0;
            &:hover {
              background-color: #fff;
            }
            .l_img {
              width: 72px;
              height: 72px;
            }
          }
          &.list1 {
            top: 70px;
            left: 354px;
          }
          &.list2 {
            bottom: 90px;
            left: 260px;
          }
          &.list3 {
            bottom: 90px;
            right: 260px;
          }
        }
      }
    }
  }
}

.sys_detail {
  z-index: 99999 !important;
  .el-dialog {
    width: 840px;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      width: 840px;
      padding: 30px;

      .closed_img {
        position: absolute;
        top: -24px;
        right: -24px;
        cursor: pointer;
      }

      .title {
        height: 24px;
        line-height: 24px;
        text-align: left;

        .title_name {
          font-size: 20px;
          color: #333333;
          line-height: 24px;
        }

        .mask {
          width: 24px;
          height: 0px;
          border-top: 0px;
          border-right: 2px solid transparent;
          border-bottom: 5px solid #0070ff;
          border-left: 2px solid transparent;
          transform: rotate3d(0, 0, 1, 90deg);
          display: inline-block;
          margin-right: -5px;
          margin-bottom: 4px;
          margin-left: -10px;
        }
      }

      .sys_detail_content {
        text-align: left;

        .detail_item {
          margin-top: 24px;

          p {
            font-size: 14px;
            color: #999999;
          }

          #cpu,
          #memery,
          #disk {
            height: 150px;
          }
        }
      }
    }
  }
}
</style>
