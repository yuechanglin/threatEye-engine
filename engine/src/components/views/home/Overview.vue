<template>
  <div class="home_overview" v-loading.fullscreen.lock="loading"
       v-cloak>
    <div class="container">

      <!-- 第一排 -->
      <el-row class="container_top  container_item"
              :gutter="10">
        <el-col :span="6">
          <div class="top_item"
               @click="sys_state">
            <div class="title">
              <p>
                <span class="title_left">系统状态监控</span>
              </p>
            </div>
            <div class="legend">
              <span class="legend_icon color8"></span>
              <span class="legend_title">预警:{{top_left.warning_count}}</span>
              <span class="legend_icon color3"></span>
              <span class="legend_title">健康:{{top_left.healthy_count}}</span>
              <span class="legend_icon color4"></span>
              <span class="legend_title">离线:{{top_left.offline_count}}</span>
            </div>
            <div class="top_left_content">
              <top-left :top_left="top_left"
                        v-if="top_left_show"></top-left>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">流量文件监控</span>
                <span class="title_right">
                  <span class="title_right_icon color6"></span>
                  <span>流量(M/s)</span>
                  <span class="title_right_icon color2"></span>
                  <span>文件(个/s)</span>
                </span>
              </p>
            </div>
            <div class="top_mid_content">
              <div class="content_top">
                <top-mid-flow :top_mid="top_mid"
                              v-if="top_mid_show"></top-mid-flow>
              </div>
              <div class="content_bom">
                <top-mid-file :top_mid="top_mid"
                              v-if="top_mid_show"></top-mid-file>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">协议统计</span>
              </p>
            </div>
            <div class="legend">
              <p class="legend_title">单位(P/s)</p>
            </div>
            <div class="top_right_content">
              <top-right :top_right="top_right"
                         v-if="top_right_show"></top-right>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 第二排 -->
      <el-row class="container_bom  container_item"
              :gutter="10">
        <el-col :span="9">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">告警</span>
                <span class="title_right">
                  <span class="title_right_icon color3"></span>
                  <span>低危</span>
                  <span class="title_right_icon color5"></span>
                  <span>中危</span>
                  <span class="title_right_icon color4"></span>
                  <span>高危</span>
                </span>
              </p>
            </div>
            <div class="bom_left_content">
              <div class="content_top">
                <mid-left :mid_left="mid_left"
                          v-if="mid_left_show"></mid-left>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">未处理告警</span>
                <span class="title_right">
                  <span class="title_right_icon color3"></span>
                  <span>低危</span>
                  <span class="title_right_icon color5"></span>
                  <span>中危</span>
                  <span class="title_right_icon color4"></span>
                  <span>高危</span>
                </span>
              </p>
            </div>
            <div class="bom_mid_content">
              <mid-mid :mid_mid="mid_mid"
                       v-if="mid_mid_show"></mid-mid>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">威胁类型</span>
              </p>
            </div>
            <div class="bom_right_content">
              <mid-right :mid_right="mid_right"
                         v-if="mid_right_show"></mid-right>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 第三排 -->
      <el-row class="container_bom  container_item"
              :gutter="10">
        <el-col :span="6">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">Top5威胁</span>
              </p>
            </div>
            <div class="bom_left_content">
              <div class="content_top">
                <bom-left :bom_left="bom_left"
                          v-if="bom_left_show"></bom-left>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">Top5风险资产</span>
              </p>
            </div>
            <div class="bom_mid_content">
              <bom-mid :bom_mid="bom_mid" v-if="bom_mid_show"></bom-mid>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">最新警告</span>
              </p>
            </div>
            <div class="bom_right_content">
              <bom-right :bom_right="bom_right"
                         v-if="bom_right_show"></bom-right>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="">
      <!-- <sys-monitor></sys-monitor> -->
    </div>
    <el-dialog class="sys_box"
               width="840"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="el_dialog">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_sys_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">拓扑图</span>
      </div>
      <div id="graph">
      </div>
    </el-dialog>
    <el-dialog class="sys_detail"
               width="840"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="equipment_detail.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_detail"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">
          <span>{{equipment_detail.title.name}}</span>
          <span>{{equipment_detail.title.ip}}</span>
          <span>{{equipment_detail.title.type}}</span>
          <span>的健康情况</span>
        </span>
      </div>
      <div class="sys_detail_content">
        <div class="detail_item">
          <div id='cpu'></div>
        </div>
        <div class="detail_item">
          <div id='flow_echarts'></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import topLeft from "./vm-home/top-left";
import topMidFlow from "./vm-home/top-mid-flow";
import topMidFile from "./vm-home/top-mid-file";
import topRight from "./vm-home/top-right";

import midLeft from "./vm-home/mid-left";
import midMid from "./vm-home/mid-mid";
import midRight from "./vm-home/mid-right";

import bomLeft from "./vm-home/bom-left";
import bomMid from "./vm-home/bom-mid";
import bomRight from "./vm-home/bom-right";

import { eventBus } from '@/components/common/eventBus.js';

import {isSynthetical} from "../../../assets/js/validate";
export default {
  name: "system_control_move",
  data () {
    return {
      loading: false,
      top_left: {},
      top_left_show: false,

      top_mid: {},
      top_mid_show: false,

      top_right: {},
      top_right_show: false,
      ///////////

      mid_left: [],
      mid_left_show: false,

      mid_mid: [],
      mid_mid_show: false,

      mid_right: [],
      mid_right_show: false,

      ///////////
      bom_left: [],
      bom_left_show: false,

      bom_mid: [],
      bom_mid_show: false,

      bom_right: [],
      bom_right_show: false,
      //-----
      el_dialog: false,
      state_detail: false,
      equipment: {
        probe: [],
        engine: [],
        engine_probe: [],
        sandbox: [],
        echart_array: [],
        links_array: [],
      },
      equipment_detail: {
        show: false,
        cpu: [],
        mem: [],
        disk: [],
        statistics_time: [],
        flow: [],
        title: {
          type: '',
          ip: '',
          name: '',
        }
      },
    };
  },
  created () {
    this.check_passwd();
    //第一排
    this.init_top_left();
    this.init_top_mid();
    this.init_top_right();
    //第二排
    this.init_mid_left();
    this.init_mid_mid();
    this.init_mid_right();
    //第三排
    this.init_bom_left();
    this.init_bom_mid();
    this.init_bom_right();
  },
  methods: {
    // 测试密码过期
    check_passwd () {
      this.$axios.get('/yiiapi/site/check-passwd-reset')
        .then((resp) => {
          let {
            status,
            msg,
            data
          } = resp.data;
          if(status != 0){
            for(let key in msg){
              if(key == 600){
                this.$message(
                  {
                    message: msg[key],
                    type: 'warning',
                  }
                );
              }
              if(key == 602){
                this.$message(
                  {
                    message: msg[key],
                    type: 'warning',
                  }
                );
                eventBus.$emit('reset');
              }
            }
          }
        })
    },
    //第一排（左）
    init_top_left () {
      this.$axios.get('/yiiapi/alert/system-state')
        .then((resp) => {
          // console.log(resp)
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {

            if(!isSynthetical(data)){
              return false;
            }else {
              this.top_left = data;
              this.top_left_show = true;
            }

          }
        })
    },
    //第一排（中）
    init_top_mid () {
      this.$axios.get('/yiiapi/alert/flow-file-statistics')
        .then((resp) => {
          // console.log(resp)
          this.top_mid = {};
          let {
            status,
            data
          } = resp.data;

          if (status == 0) {
            if(!isSynthetical(data)){
              return false;
            }else {
              this.top_mid = data;
              this.top_mid_show = true;
            }
          }
        })
    },
    //第一排（右）
    init_top_right () {
      this.$axios.get('/yiiapi/alert/protocol-flow-statistics')
        .then((resp) => {
          let {
            status,
            data
          } = resp.data;
          //console.log(data)
          if (status == 0) {

            if(!isSynthetical(data)){
              return false;
            }else {
              this.top_right = data;
              this.top_right_show = true;
            }

          }
        })
    },

    //第二排（左）
    init_mid_left () {
      this.$axios.get('/yiiapi/alert/get-last7-days-alarm')
        .then((resp) => {
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {

            if(!isSynthetical(data)){
              return false;
            }else {
              this.mid_left = data;
              this.mid_left_show = true;
            }
          }
        })
    },
    //第二排（中）
    init_mid_mid () {
      this.$axios.get('/yiiapi/alert/untreated-alarm-type')
        .then((resp) => {
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            if(!isSynthetical(data)){
              return false;
            }else {
              this.mid_mid = data;
              this.mid_mid_show = true;
            }
          }
        })
    },
    //第二排（右）
    init_mid_right () {
      this.$axios.get('/yiiapi/alert/threat-type')
        .then((resp) => {

          let {
            status,
            data
          } = resp.data;
          if (status == 0) {

            if(!isSynthetical(data)){
              return false;
            }else {
              this.mid_right = data;
              this.mid_right_show = true;
            }
          }
        })
    },


    //第三排（左）
    init_bom_left () {
      this.$axios.get('/yiiapi/alert/threat-top5')
        .then((resp) => {
          // /console.log(resp)
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            if(!isSynthetical(data)){
              return false;
            }else {
              this.bom_left = data;
              this.bom_left_show = true;
            }
          }
        })
    },
    //第三排（中）
    init_bom_mid () {
      this.$axios.get('/yiiapi/alert/risk-asset-top5')
        .then((resp) => {
          // console.log(resp)
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {

            if(!isSynthetical(data)){
              return false;
            }else {
              this.bom_mid = data;
              this.bom_mid_show = true;
            }
          }
        })
    },

    //第三排（右）
    init_bom_right () {
      this.$axios.get('/yiiapi/alert/list-top5')
        .then((resp) => {
          // console.log(resp)
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            if(!isSynthetical(data)){
              return false;
            }else {
              this.bom_right = data;
              this.bom_right_show = true;
            }
          }
        })
    },

    sys_state () {
      // this.$store.commit("CHANGE_SYS", true);
      this.el_dialog = true;
      this.get_data()
    },
    get_data () {
      this.equipment.probe = []
      this.equipment.engine = []
      this.equipment.engine_probe = []
      this.equipment.sandbox = []
      this.equipment.echart_array = []
      this.equipment.links_array = []
      this.$axios.get('/yiiapi/alert/system-state')
        .then(response => {
          let {
            status,
            data
          } = response.data;
          console.log(data);
          this.sysState_data = data
          data.dev_info.forEach(element => {
            //       { name: '引擎', type: "2" },
            // { name: '沙箱', type: "4" },
            // { name: '沙箱', type: "3" },
            // { name: '探针', type: "1" },
            switch (element.type) {
              case '1':
                this.equipment.probe.push(element)
                break;
              case '2':
                this.equipment.engine.push(element)
                break;
              case '3':
                this.equipment.engine_probe.push(element)
                break;
              case '4':
                this.equipment.sandbox.push(element)
                break;
              default:
                break;
            }
          });
          setTimeout(() => {
            this.graph_echart()
          }, 100);
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 拓扑图
    graph_echart () {
      // 多个探针
      if (this.equipment.engine.probe != 0) {
        this.equipment.probe.forEach((item, index) => {
          var data_item1 = {
            name: '探针' + index,
            names: '探针',
            dev_name: item.name,
            dev_ip: item.ip,
            status: item.status,
            symbolSize: 50,
            draggable: false,
            category: 0,
            symbol: 'image://data:image/jpg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAgKADAAQAAAABAAAAgAAAAAD/4gfoSUNDX1BST0ZJTEUAAQEAAAfYYXBwbAIgAABtbnRyUkdCIFhZWiAH2QACABkACwAaAAthY3NwQVBQTAAAAABhcHBsAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAAG9kc2NtAAABeAAABZxjcHJ0AAAHFAAAADh3dHB0AAAHTAAAABRyWFlaAAAHYAAAABRnWFlaAAAHdAAAABRiWFlaAAAHiAAAABRyVFJDAAAHnAAAAA5jaGFkAAAHrAAAACxiVFJDAAAHnAAAAA5nVFJDAAAHnAAAAA5kZXNjAAAAAAAAABRHZW5lcmljIFJHQiBQcm9maWxlAAAAAAAAAAAAAAAUR2VuZXJpYyBSR0IgUHJvZmlsZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbWx1YwAAAAAAAAAfAAAADHNrU0sAAAAoAAABhGRhREsAAAAuAAABrGNhRVMAAAAkAAAB2nZpVk4AAAAkAAAB/nB0QlIAAAAmAAACInVrVUEAAAAqAAACSGZyRlUAAAAoAAACcmh1SFUAAAAoAAACmnpoVFcAAAAWAAACwm5iTk8AAAAmAAAC2GNzQ1oAAAAiAAAC/mhlSUwAAAAeAAADIGl0SVQAAAAoAAADPnJvUk8AAAAkAAADZmRlREUAAAAsAAADimtvS1IAAAAWAAADtnN2U0UAAAAmAAAC2HpoQ04AAAAWAAADzGphSlAAAAAaAAAD4mVsR1IAAAAiAAAD/HB0UE8AAAAmAAAEHm5sTkwAAAAoAAAERGVzRVMAAAAmAAAEHnRoVEgAAAAkAAAEbHRyVFIAAAAiAAAEkGZpRkkAAAAoAAAEsmhySFIAAAAoAAAE2nBsUEwAAAAsAAAFAnJ1UlUAAAAiAAAFLmFyRUcAAAAmAAAFUGVuVVMAAAAmAAAFdgBWAWEAZQBvAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwARwBlAG4AZQByAGUAbAAgAFIARwBCAC0AYgBlAHMAawByAGkAdgBlAGwAcwBlAFAAZQByAGYAaQBsACAAUgBHAEIAIABnAGUAbgDoAHIAaQBjAEMepQB1ACAAaADsAG4AaAAgAFIARwBCACAAQwBoAHUAbgBnAFAAZQByAGYAaQBsACAAUgBHAEIAIABHAGUAbgDpAHIAaQBjAG8EFwQwBDMEMAQ7BEwEPQQ4BDkAIAQ/BEAEPgREBDAEOQQ7ACAAUgBHAEIAUAByAG8AZgBpAGwAIABnAOkAbgDpAHIAaQBxAHUAZQAgAFIAVgBCAMEAbAB0AGEAbADhAG4AbwBzACAAUgBHAEIAIABwAHIAbwBmAGkAbJAadSgAIABSAEcAQgAggnJfaWPPj/AARwBlAG4AZQByAGkAcwBrACAAUgBHAEIALQBwAHIAbwBmAGkAbABPAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwF5AXoBdUF5AXZBdwAIABSAEcAQgAgBdsF3AXcBdkAUAByAG8AZgBpAGwAbwAgAFIARwBCACAAZwBlAG4AZQByAGkAYwBvAFAAcgBvAGYAaQBsACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjAEEAbABsAGcAZQBtAGUAaQBuAGUAcwAgAFIARwBCAC0AUAByAG8AZgBpAGzHfLwYACAAUgBHAEIAINUEuFzTDMd8Zm6QGgAgAFIARwBCACBjz4/wZYdO9k4AgiwAIABSAEcAQgAgMNcw7TDVMKEwpDDrA5MDtQO9A7kDugPMACADwAPBA78DxgOvA7sAIABSAEcAQgBQAGUAcgBmAGkAbAAgAFIARwBCACAAZwBlAG4A6QByAGkAYwBvAEEAbABnAGUAbQBlAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGUAbA5CDhsOIw5EDh8OJQ5MACAAUgBHAEIAIA4XDjEOSA4nDkQOGwBHAGUAbgBlAGwAIABSAEcAQgAgAFAAcgBvAGYAaQBsAGkAWQBsAGUAaQBuAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGkAbABpAEcAZQBuAGUAcgBpAQ0AawBpACAAUgBHAEIAIABwAHIAbwBmAGkAbABVAG4AaQB3AGUAcgBzAGEAbABuAHkAIABwAHIAbwBmAGkAbAAg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',
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
            },
            itemStyle: {
              normal: {

              }
            }
          };
          this.equipment.echart_array.push(data_item1);
        });
      }
      // 一个引擎或者一个引擎/探针
      if (this.equipment.engine.length != 0) {
        var data_item2 = {
          name: '引擎',
          names: '引擎',
          dev_name: this.equipment.engine[0].name,
          dev_ip: this.equipment.engine[0].ip,
          status: this.equipment.engine[0].status,
          symbolSize: 50,
          draggable: false,
          category: 0,
          symbol: 'image://data:image/jpg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAgKADAAQAAAABAAAAgAAAAAD/4gfoSUNDX1BST0ZJTEUAAQEAAAfYYXBwbAIgAABtbnRyUkdCIFhZWiAH2QACABkACwAaAAthY3NwQVBQTAAAAABhcHBsAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAAG9kc2NtAAABeAAABZxjcHJ0AAAHFAAAADh3dHB0AAAHTAAAABRyWFlaAAAHYAAAABRnWFlaAAAHdAAAABRiWFlaAAAHiAAAABRyVFJDAAAHnAAAAA5jaGFkAAAHrAAAACxiVFJDAAAHnAAAAA5nVFJDAAAHnAAAAA5kZXNjAAAAAAAAABRHZW5lcmljIFJHQiBQcm9maWxlAAAAAAAAAAAAAAAUR2VuZXJpYyBSR0IgUHJvZmlsZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbWx1YwAAAAAAAAAfAAAADHNrU0sAAAAoAAABhGRhREsAAAAuAAABrGNhRVMAAAAkAAAB2nZpVk4AAAAkAAAB/nB0QlIAAAAmAAACInVrVUEAAAAqAAACSGZyRlUAAAAoAAACcmh1SFUAAAAoAAACmnpoVFcAAAAWAAACwm5iTk8AAAAmAAAC2GNzQ1oAAAAiAAAC/mhlSUwAAAAeAAADIGl0SVQAAAAoAAADPnJvUk8AAAAkAAADZmRlREUAAAAsAAADimtvS1IAAAAWAAADtnN2U0UAAAAmAAAC2HpoQ04AAAAWAAADzGphSlAAAAAaAAAD4mVsR1IAAAAiAAAD/HB0UE8AAAAmAAAEHm5sTkwAAAAoAAAERGVzRVMAAAAmAAAEHnRoVEgAAAAkAAAEbHRyVFIAAAAiAAAEkGZpRkkAAAAoAAAEsmhySFIAAAAoAAAE2nBsUEwAAAAsAAAFAnJ1UlUAAAAiAAAFLmFyRUcAAAAmAAAFUGVuVVMAAAAmAAAFdgBWAWEAZQBvAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwARwBlAG4AZQByAGUAbAAgAFIARwBCAC0AYgBlAHMAawByAGkAdgBlAGwAcwBlAFAAZQByAGYAaQBsACAAUgBHAEIAIABnAGUAbgDoAHIAaQBjAEMepQB1ACAAaADsAG4AaAAgAFIARwBCACAAQwBoAHUAbgBnAFAAZQByAGYAaQBsACAAUgBHAEIAIABHAGUAbgDpAHIAaQBjAG8EFwQwBDMEMAQ7BEwEPQQ4BDkAIAQ/BEAEPgREBDAEOQQ7ACAAUgBHAEIAUAByAG8AZgBpAGwAIABnAOkAbgDpAHIAaQBxAHUAZQAgAFIAVgBCAMEAbAB0AGEAbADhAG4AbwBzACAAUgBHAEIAIABwAHIAbwBmAGkAbJAadSgAIABSAEcAQgAggnJfaWPPj/AARwBlAG4AZQByAGkAcwBrACAAUgBHAEIALQBwAHIAbwBmAGkAbABPAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwF5AXoBdUF5AXZBdwAIABSAEcAQgAgBdsF3AXcBdkAUAByAG8AZgBpAGwAbwAgAFIARwBCACAAZwBlAG4AZQByAGkAYwBvAFAAcgBvAGYAaQBsACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjAEEAbABsAGcAZQBtAGUAaQBuAGUAcwAgAFIARwBCAC0AUAByAG8AZgBpAGzHfLwYACAAUgBHAEIAINUEuFzTDMd8Zm6QGgAgAFIARwBCACBjz4/wZYdO9k4AgiwAIABSAEcAQgAgMNcw7TDVMKEwpDDrA5MDtQO9A7kDugPMACADwAPBA78DxgOvA7sAIABSAEcAQgBQAGUAcgBmAGkAbAAgAFIARwBCACAAZwBlAG4A6QByAGkAYwBvAEEAbABnAGUAbQBlAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGUAbA5CDhsOIw5EDh8OJQ5MACAAUgBHAEIAIA4XDjEOSA4nDkQOGwBHAGUAbgBlAGwAIABSAEcAQgAgAFAAcgBvAGYAaQBsAGkAWQBsAGUAaQBuAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGkAbABpAEcAZQBuAGUAcgBpAQ0AawBpACAAUgBHAEIAIABwAHIAbwBmAGkAbABVAG4AaQB3AGUAcgBzAGEAbABuAHkAIABwAHIAbwBmAGkAbAAg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',
          label: {
            normal: {
              position: "bottom",
              show: true,
              textStyle: {
                fontSize: 12,
                color: '#666',
                align: 'center',
              },
              formatter: '引擎'
            }
          },
          itemStyle: {
            normal: {

            }
          }
        };
        this.equipment.echart_array.push(data_item2);
      } else if (this.equipment.engine_probe.length != 0) {
        var data_item3 = {
          name: '引擎/探针',
          names: '引擎/探针',
          dev_name: this.equipment.engine_probe[0].name,
          dev_ip: this.equipment.engine_probe[0].ip,
          status: this.equipment.engine_probe[0].status,
          symbolSize: 50,
          draggable: false,
          category: 0,
          symbol: 'image://data:image/jpg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAAD/4gfoSUNDX1BST0ZJTEUAAQEAAAfYYXBwbAIgAABtbnRyUkdCIFhZWiAH2QACABkACwAaAAthY3NwQVBQTAAAAABhcHBsAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAAG9kc2NtAAABeAAABZxjcHJ0AAAHFAAAADh3dHB0AAAHTAAAABRyWFlaAAAHYAAAABRnWFlaAAAHdAAAABRiWFlaAAAHiAAAABRyVFJDAAAHnAAAAA5jaGFkAAAHrAAAACxiVFJDAAAHnAAAAA5nVFJDAAAHnAAAAA5kZXNjAAAAAAAAABRHZW5lcmljIFJHQiBQcm9maWxlAAAAAAAAAAAAAAAUR2VuZXJpYyBSR0IgUHJvZmlsZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbWx1YwAAAAAAAAAfAAAADHNrU0sAAAAoAAABhGRhREsAAAAuAAABrGNhRVMAAAAkAAAB2nZpVk4AAAAkAAAB/nB0QlIAAAAmAAACInVrVUEAAAAqAAACSGZyRlUAAAAoAAACcmh1SFUAAAAoAAACmnpoVFcAAAAWAAACwm5iTk8AAAAmAAAC2GNzQ1oAAAAiAAAC/mhlSUwAAAAeAAADIGl0SVQAAAAoAAADPnJvUk8AAAAkAAADZmRlREUAAAAsAAADimtvS1IAAAAWAAADtnN2U0UAAAAmAAAC2HpoQ04AAAAWAAADzGphSlAAAAAaAAAD4mVsR1IAAAAiAAAD/HB0UE8AAAAmAAAEHm5sTkwAAAAoAAAERGVzRVMAAAAmAAAEHnRoVEgAAAAkAAAEbHRyVFIAAAAiAAAEkGZpRkkAAAAoAAAEsmhySFIAAAAoAAAE2nBsUEwAAAAsAAAFAnJ1UlUAAAAiAAAFLmFyRUcAAAAmAAAFUGVuVVMAAAAmAAAFdgBWAWEAZQBvAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwARwBlAG4AZQByAGUAbAAgAFIARwBCAC0AYgBlAHMAawByAGkAdgBlAGwAcwBlAFAAZQByAGYAaQBsACAAUgBHAEIAIABnAGUAbgDoAHIAaQBjAEMepQB1ACAAaADsAG4AaAAgAFIARwBCACAAQwBoAHUAbgBnAFAAZQByAGYAaQBsACAAUgBHAEIAIABHAGUAbgDpAHIAaQBjAG8EFwQwBDMEMAQ7BEwEPQQ4BDkAIAQ/BEAEPgREBDAEOQQ7ACAAUgBHAEIAUAByAG8AZgBpAGwAIABnAOkAbgDpAHIAaQBxAHUAZQAgAFIAVgBCAMEAbAB0AGEAbADhAG4AbwBzACAAUgBHAEIAIABwAHIAbwBmAGkAbJAadSgAIABSAEcAQgAggnJfaWPPj/AARwBlAG4AZQByAGkAcwBrACAAUgBHAEIALQBwAHIAbwBmAGkAbABPAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwF5AXoBdUF5AXZBdwAIABSAEcAQgAgBdsF3AXcBdkAUAByAG8AZgBpAGwAbwAgAFIARwBCACAAZwBlAG4AZQByAGkAYwBvAFAAcgBvAGYAaQBsACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjAEEAbABsAGcAZQBtAGUAaQBuAGUAcwAgAFIARwBCAC0AUAByAG8AZgBpAGzHfLwYACAAUgBHAEIAINUEuFzTDMd8Zm6QGgAgAFIARwBCACBjz4/wZYdO9k4AgiwAIABSAEcAQgAgMNcw7TDVMKEwpDDrA5MDtQO9A7kDugPMACADwAPBA78DxgOvA7sAIABSAEcAQgBQAGUAcgBmAGkAbAAgAFIARwBCACAAZwBlAG4A6QByAGkAYwBvAEEAbABnAGUAbQBlAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGUAbA5CDhsOIw5EDh8OJQ5MACAAUgBHAEIAIA4XDjEOSA4nDkQOGwBHAGUAbgBlAGwAIABSAEcAQgAgAFAAcgBvAGYAaQBsAGkAWQBsAGUAaQBuAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGkAbABpAEcAZQBuAGUAcgBpAQ0AawBpACAAUgBHAEIAIABwAHIAbwBmAGkAbABVAG4AaQB3AGUAcgBzAGEAbABuAHkAIABwAHIAbwBmAGkAbAAgAFIARwBCBB4EMQRJBDgEOQAgBD8EQAQ+BEQEOAQ7BEwAIABSAEcAQgZFBkQGQQAgBioGOQYxBkoGQQAgAFIARwBCACAGJwZEBjkGJwZFAEcAZQBuAGUAcgBpAGMAIABSAEcAQgAgAFAAcgBvAGYAaQBsAGV0ZXh0AAAAAENvcHlyaWdodCAyMDA3IEFwcGxlIEluYy4sIGFsbCByaWdodHMgcmVzZXJ2ZWQuAFhZWiAAAAAAAADzUgABAAAAARbPWFlaIAAAAAAAAHRNAAA97gAAA9BYWVogAAAAAAAAWnUAAKxzAAAXNFhZWiAAAAAAAAAoGgAAFZ8AALg2Y3VydgAAAAAAAAABAc0AAHNmMzIAAAAAAAEMQgAABd7///MmAAAHkgAA/ZH///ui///9owAAA9wAAMBs/8AAEQgAMAAwAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAA//aAAwDAQACEQMRAD8A/fyvMvG3jq48HazpiXEKSaZcq5lKnM4K8fKpIGBkH35HFL478aa14Onhuo9NS60yRCplL7WE5ztHfjA9OfUYrO8GeCpLyQeMfGI+2areYkjjk5SBDyo2njIHQfw/XmvzjiDP8Ri8Q8pyluNeLTlJpqMIpp3d176lskt9dUkclWq5PkhuY+q+LvFnjLSbrT9A8NTfY7yNoxPM20lWHUA7V/8AHjUeieJvGHgrR7bTNa8MzSWlou0zQtuIXJOSF3Dv6iveaKr/AFHxnt/rrzCft+Xlvy0+W1725eXa/wDev5j+ryvzc2vyPL/B3j6fxj4hv7eyhSPS7aJGQyHE5Y8cqCQRnPTpxzzXqFeTeNPAzK58V+ER9i1izzIViGFnA5YFRxuI/wC+uhzni54K8Y+I/Fdys8+kC00wRczljlpuM7QcZXr0Bx3PapyHPcVg8R/ZebXlWk24yim4yi30svcUNmpbaO7TFSqSi+Se5//Q/YTxVrWkeNPFnhnQtMulu7RZmmnCcqSmCAc/7KsPoa9Kl8e+DoJXgm1aBXjYqwJOQQcEdK848WaPpPg3xX4Z17TrVLO0M7QzlBtUF+AT/wABLH6CvSZfAng+eV5pdJgd5CWYleSTyTX5BkSzn63juT2Xt+ePNfn5eX2ceTltrb4t+tzhp+05pbX/AOAch4q+LmhaPaxnQ3TVLmUkYViEQDuxxnnsB781pfD/AOIMfjRLiCe3FreWwDMqncjIeMrnkYPUH25rO8VfCTQtZtYxoiR6XcxEnKrlHB7MMj8CPeuY0c+Gvg9cvb6xcyXupX0YZjAg2xxqeFwWByxyc+3bv59bNuJMFnMcRmtSEMGlZtWUNVpa/v8ANzf1YhzqxqXm/dPoGkAAGBwBXx74h+JXiDVNebVtJuLizs4imyASMEwp/jCnblj1/KvbNE+MHhrV7izsJI5rW5umEZ3hTGrnp82ehPAOO/OK93I/F7J8biamH5+SztFy0U7u11/k7PX1trTx1OTauf/R/bHxz4K1nxjcQ266mtrpkaFjFs3MZxna3bIwe547Dms7wb40ksJB4O8Zn7Hqdn+7jlkOEnQcKQx4zjof4vrxXrleaeNfAtx4x1nTHuJ0j0y1D+aqjExLc/K2CMHAHtyea/OOIMgxGErvNspTlXk0pRbbjOLaVnd+6o7px210aZyVaTi+eG56XXzJ8c4dKTVdPlt9ov5I388L1KDb5Zb3+8B7D2FdJq/gzxT4Q0q61Dw/4luPslpGZBBKN2FUdAclfyUVDp/w9Pj7R9P8ReINQcXs8bb3jjVSy7vk3diV5GQBkYHbn5LjnF5hnWEnkkcE4V2lP3pQceVSSbjJPfpqlpcxxMpVI+z5dT1LwfaaMnhSwi0xI2tJYFLYAIdivzl/Uk5zn6V816RaeGn+KYtTsOlC7kEYJHlkgHYvoV34A9eKoa34W8UeG9Yl8M2U1xNbzldpi3rHIJOBuAOAexz/ACr2DQvgrpunXVlf6hetdSW7CSSMIBGzDkDk5wDjr1HYZr5OvPMs9q4XB0cvUHhJx5+Zrl0aXKv7rs20r6W8r4NzqOMVD4T/2Q==',
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
          },
          itemStyle: {
            normal: {

            }
          }
        };
        this.equipment.echart_array.push(data_item3);
      }
      if (this.equipment.sandbox.length != 0) {
        // 沙箱
        this.equipment.sandbox.forEach((item, index) => {
          var data_item1 = {
            name: '沙箱' + index,
            names: '沙箱',
            dev_name: item.name,
            dev_ip: item.ip,
            status: item.status,
            symbolSize: 50,
            draggable: false,
            category: 0,
            symbol: 'image://data:image/jpg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAgKADAAQAAAABAAAAgAAAAAD/4gfoSUNDX1BST0ZJTEUAAQEAAAfYYXBwbAIgAABtbnRyUkdCIFhZWiAH2QACABkACwAaAAthY3NwQVBQTAAAAABhcHBsAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAAG9kc2NtAAABeAAABZxjcHJ0AAAHFAAAADh3dHB0AAAHTAAAABRyWFlaAAAHYAAAABRnWFlaAAAHdAAAABRiWFlaAAAHiAAAABRyVFJDAAAHnAAAAA5jaGFkAAAHrAAAACxiVFJDAAAHnAAAAA5nVFJDAAAHnAAAAA5kZXNjAAAAAAAAABRHZW5lcmljIFJHQiBQcm9maWxlAAAAAAAAAAAAAAAUR2VuZXJpYyBSR0IgUHJvZmlsZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbWx1YwAAAAAAAAAfAAAADHNrU0sAAAAoAAABhGRhREsAAAAuAAABrGNhRVMAAAAkAAAB2nZpVk4AAAAkAAAB/nB0QlIAAAAmAAACInVrVUEAAAAqAAACSGZyRlUAAAAoAAACcmh1SFUAAAAoAAACmnpoVFcAAAAWAAACwm5iTk8AAAAmAAAC2GNzQ1oAAAAiAAAC/mhlSUwAAAAeAAADIGl0SVQAAAAoAAADPnJvUk8AAAAkAAADZmRlREUAAAAsAAADimtvS1IAAAAWAAADtnN2U0UAAAAmAAAC2HpoQ04AAAAWAAADzGphSlAAAAAaAAAD4mVsR1IAAAAiAAAD/HB0UE8AAAAmAAAEHm5sTkwAAAAoAAAERGVzRVMAAAAmAAAEHnRoVEgAAAAkAAAEbHRyVFIAAAAiAAAEkGZpRkkAAAAoAAAEsmhySFIAAAAoAAAE2nBsUEwAAAAsAAAFAnJ1UlUAAAAiAAAFLmFyRUcAAAAmAAAFUGVuVVMAAAAmAAAFdgBWAWEAZQBvAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwARwBlAG4AZQByAGUAbAAgAFIARwBCAC0AYgBlAHMAawByAGkAdgBlAGwAcwBlAFAAZQByAGYAaQBsACAAUgBHAEIAIABnAGUAbgDoAHIAaQBjAEMepQB1ACAAaADsAG4AaAAgAFIARwBCACAAQwBoAHUAbgBnAFAAZQByAGYAaQBsACAAUgBHAEIAIABHAGUAbgDpAHIAaQBjAG8EFwQwBDMEMAQ7BEwEPQQ4BDkAIAQ/BEAEPgREBDAEOQQ7ACAAUgBHAEIAUAByAG8AZgBpAGwAIABnAOkAbgDpAHIAaQBxAHUAZQAgAFIAVgBCAMEAbAB0AGEAbADhAG4AbwBzACAAUgBHAEIAIABwAHIAbwBmAGkAbJAadSgAIABSAEcAQgAggnJfaWPPj/AARwBlAG4AZQByAGkAcwBrACAAUgBHAEIALQBwAHIAbwBmAGkAbABPAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwF5AXoBdUF5AXZBdwAIABSAEcAQgAgBdsF3AXcBdkAUAByAG8AZgBpAGwAbwAgAFIARwBCACAAZwBlAG4AZQByAGkAYwBvAFAAcgBvAGYAaQBsACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjAEEAbABsAGcAZQBtAGUAaQBuAGUAcwAgAFIARwBCAC0AUAByAG8AZgBpAGzHfLwYACAAUgBHAEIAINUEuFzTDMd8Zm6QGgAgAFIARwBCACBjz4/wZYdO9k4AgiwAIABSAEcAQgAgMNcw7TDVMKEwpDDrA5MDtQO9A7kDugPMACADwAPBA78DxgOvA7sAIABSAEcAQgBQAGUAcgBmAGkAbAAgAFIARwBCACAAZwBlAG4A6QByAGkAYwBvAEEAbABnAGUAbQBlAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGUAbA5CDhsOIw5EDh8OJQ5MACAAUgBHAEIAIA4XDjEOSA4nDkQOGwBHAGUAbgBlAGwAIABSAEcAQgAgAFAAcgBvAGYAaQBsAGkAWQBsAGUAaQBuAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGkAbABpAEcAZQBuAGUAcgBpAQ0AawBpACAAUgBHAEIAIABwAHIAbwBmAGkAbABVAG4AaQB3AGUAcgBzAGEAbABuAHkAIABwAHIAbwBmAGkAbAAg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',
            label: {
              normal: {
                position: "bottom",
                show: true,
                textStyle: {
                  fontSize: 12,
                  color: '#666',
                  align: 'center',
                },
                formatter: '沙箱'
              }
            },
            itemStyle: {
              normal: {
              }
            }
          };
          this.equipment.echart_array.push(data_item1);
        })
      }
      this.equipment.echart_array.forEach(element => {
        console.log(element.names);
        if (element.names == '引擎') {
          this.equipment.echart_array.forEach(item => {
            var obj = {
              source: '',
              target: '',
            }
            if (item.names == '探针' || item.names == '沙箱') {
              obj.source = item.name
              obj.target = '引擎'
              this.equipment.links_array.push(obj)
            }
          })
        } else if (element.names == '引擎/探针') {
          this.equipment.echart_array.forEach(item => {
            var obj = {
              source: '',
              target: '',
            }
            if (item.names == '探针' || item.names == '沙箱') {
              obj.source = item.name
              obj.target = '引擎/探针'
              this.equipment.links_array.push(obj)
            }
          })
        }
      });

      console.log(this.equipment.links_array);

      var myChart = this.$echarts.init(document.getElementById("graph"));
      // console.log(myChart);

      var option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params, trigger) {
           // console.log(params);
           // console.log(trigger);
            if (params.dataType == 'node') {
              return '设备：' + params.data.dev_name + '</br>' + 'IP地址：' + params.data.dev_ip + '</br>' + '状态：' + params.data.status
            } else {
              return ''
            }
          }
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        // color: ['#83e0ff', '#45f5ce', '#b158ff'],
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 300,
            edgeLength: 80
          },
          draggable: true,
          roam: true,
          label: {
            normal: {
              show: false
            }
          },
          data: this.equipment.echart_array,
          links: this.equipment.links_array,
          focusNodeAdjacenc: false, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
          lineStyle: {
            normal: {
              color: '#F2F2F2',
              opacity: 0.9,
              width: 2,
              // curveness: 0
            },
          },
        }]
      }
      myChart.setOption(option);
      //添加点击事件
      myChart.off("click"); //防止累计触发
      myChart.on('click', (params) => {
       // console.log(params.data);
        //console.log(this.state_detail);
        this.state_detail = true;
        this.iot_detail_top(params.data)
      });

    },
    iot_detail_top (params) {
      this.equipment_detail.cpu = []
      this.equipment_detail.mem = []
      this.equipment_detail.disk = []
      this.equipment_detail.statistics_time = []
      this.equipment_detail.flow = []
      this.equipment_detail.title.type = params.names
      this.equipment_detail.title.ip = params.dev_ip
      this.equipment_detail.title.name = params.dev_name
      this.loading = true;
      this.$axios.get('/yiiapi/alert/dev-state', {
        params: {
          ip: params.dev_ip
        }
      })
        .then(response => {
          this.loading = false;
          let {
            status,
            data
          } = response.data;
         // console.log(data);
          data.forEach(element => {
            this.equipment_detail.cpu.unshift(element.cpu)
            this.equipment_detail.mem.unshift(element.mem)
            this.equipment_detail.disk.unshift(element.disk)
            this.equipment_detail.statistics_time.unshift(element.statistics_time)
            this.equipment_detail.flow.unshift(element.flow)
          });
          this.equipment_detail.show = true;
          setTimeout(() => {
            this.cpu()
            this.flow()
          }, 100);

        })
        .catch(error => {
          console.log(error);
        })
    },
    closed_sys_box () {
      this.el_dialog = false;
    },
    closed_detail () {
      this.equipment_detail.show = false;
    },
    cpu () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("cpu"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "18%",
          left: '5%',
          right: "3%",
          bottom: "20%",
          containLabel: true
        },
        legend: {
          bottom: 5,
          left: 'center',
          orient: 'horizontal',
          textStyle: {
            fontSize: 12
          },
          selected: {
            // 选中'系列1'
            'CPU': true,
            '内存': true,
            '硬盘': true,
          },
          data: ['CPU', '内存', '硬盘']
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(2,136,209,0.3)",
          borderWidth: 2,
          backgroundColor: "#fff",
          textStyle: {
            color: "#ccc",
            align:'left'
          },
          axisPointer: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
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
          data: this.equipment_detail.statistics_time,
        },
        yAxis: [{
          name: '单位(%)',
          nameTextStyle: {
            color: '#666'
          },
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
        }],
        color: ["rgba(2,136,209,0.9)", "rgba(205,220,57,0.9)", "rgba(76,175,80,0.9)"],
        visualMap: [{
          show: false,
          type: 'piecewise',
          seriesIndex: 0,
          pieces: [{
            gt: 85,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 85,
            color: "rgba(2,136,209,0.9)"
          }]
        }, {
          show: false,
          type: 'piecewise',
          seriesIndex: 1,
          pieces: [{
            gt: 85,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 85,
            color: "rgba(205,220,57,0.9)"
          }]
        }, {
          show: false,
          type: 'piecewise',
          seriesIndex: 2,
          pieces: [{
            gt: 80,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 80,
            color: "rgba(76,175,80,0.9)"
          }]
        }],
        series: [
          {
            name: "CPU",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.cpu,
            lineStyle: {
              color: "rgba(2,136,209,0.9)"
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
          },
          {
            name: "内存",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.mem,
            lineStyle: {
              color: "rgba(205,220,57,0.9)"
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
          },
          {
            name: "硬盘",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.disk,
            lineStyle: {
              color: "rgba(76,175,80,0.9)"
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
          },
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    flow () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("flow_echarts"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "18%",
          left: '5%',
          right: "3%",
          bottom: "20%",
          containLabel: true
        },
        legend: {
          bottom: 5,
          left: 'center',
          orient: 'horizontal',
          textStyle: {
            fontSize: 12
          },
          selected: {
            // 选中'系列1'
            '流量': true,
          },
          data: ['流量']
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(187,120,247,0.3)",
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
        color: ["rgba(187,120,247,0.9)"],
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
          data: this.equipment_detail.statistics_time
        },
        yAxis: [{
          name: '单位(Mbps)',
          nameTextStyle: {
            color: '#666'
          },
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
        }],
        series: [
          {
            name: "流量",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.flow,
            lineStyle: {
              color: "rgba(187,120,247,0.9)"
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
                    color: "rgba(187,120,247,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(187,120,247,0.1)" // 100% 处的颜色
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
  },
  components: {
    topLeft,
    topMidFlow,
    topMidFile,
    topRight,

    midLeft,
    midMid,
    midRight,

    bomLeft,
    bomMid,
    bomRight,

    // sysMonitor
  },
};
</script>

<style scoped lang="less">
.home_overview {
  padding: 24px;
  .container {
    text-align: left;
    .container_item {
      .color1 {
        background: #f57c00;
      }
      .color2 {
        background: #0288d1;
      }
      .color3 {
        background: #47cad9;
      }
      .color4 {
        background: #dc5f5f;
      }
      .color5 {
        background: #cddc39;
      }
      .color6 {
        background: #4caf50;
      }
      .color7 {
        background: #47cad9;
      }
      .color8 {
        background: #e0c840;
      }
      margin-bottom: 10px;
      .top_item {
        background: #ffffff;
        height: 380px;
        border-radius: 4px;
        padding: 0 16px 20px 16px;
        .title {
          height: 60px;
          line-height: 60px;
          font-family: PingFangMedium;
          font-size: 18px;
          color: #333333;
          .title_left {
            float: left;
          }
          .title_right {
            float: right;
            font-size: 14px;
            color: #333333;
            .title_right_icon {
              margin-left: 12px;
              border-radius: 2px;
              height: 14px;
              width: 28px;
              vertical-align: unset;
              display: inline-block;
            }
          }
        }
        .legend {
          clear: both;
          height: 30px;
          text-align: left;
          font-size: 14px;
          .legend_icon {
            border-radius: 2px;
            height: 14px;
            width: 28px;
            vertical-align: middle;
            display: inline-block;
          }
          .legend_title {
            margin-right: 20px;
          }
        }
        // 第一个
        .top_left_content {
          height: 270px;
        }
        // 第二个
        .top_mid_content {
          height: 300px;
          .content_top {
            height: 150px;
          }
          .content_bom {
            height: 150px;
          }
        }
        // 第三个
        .top_right_content {
          height: 270px;
        }
        // 第四个
        .bom_left_content {
          height: 300px;
          .content_top {
            height: 300px;
          }
        }
        // 第五个
        .bom_mid_content {
          height: 270px;
        }
        // 第六个
        .bom_right_content {
          height: 300px;
        }
      }
    }
  }
}

.vm-move-threat {
  margin: 0;
  padding: 0 !important;
  /deep/ .common-table {
    width: 100%;
    font-family: PingFangMedium;
    /deep/ .el-table__header-wrapper {
      .el-table__header {
        thead.has-gutter {
          th {
            background: #f8f8f8;
            .cell {
              color: #333;
            }
          }
        }
      }
    }
  }
  /deep/ &.vm-move-threat-middle {
    .common-table {
      .el-table__header-wrapper {
        .el-table__header {
          th:nth-child(3) {
            /*.cell{
                          padding: 0!important;

                        }*/
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__row {
          td:nth-child(3) {
            .cell {
              position: relative;
              height: 12px;
              .el-progress {
                .el-progress-bar {
                  vertical-align: super;
                  .el-progress-bar__outer {
                    height: 12px !important;
                    border-radius: 1px;
                    .el-progress-bar__inner {
                      border-radius: 1px;
                      background-color: #5389e0;
                    }
                  }
                }
              }
              /*.sc_index{
                            background: #5389E0;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 40%;
                            height: 16px;
                          }*/
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.home_overview {
  .sys_box {
    z-index: 9000 !important;
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
          position: relative;
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
            #flow_echarts {
              height: 200px;
            }
          }
        }
      }
    }
  }
}
.el-loading-mask{
  z-index: 99999!important;
}
</style>
