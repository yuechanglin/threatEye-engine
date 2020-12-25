<template>
  <div id="network-card"
       v-loading.fullscreen.lock="network_loading">
    <div class="left">
      <div class="left_item">
        <p>网络设备</p>
        <el-select class="select_box"
                   v-model="network_model.name"
                   @change='change_name'
                   placeholder="请选择网络设备">
          <el-option v-for="item in network"
                     :key="item.NAME"
                     :label="item.NAME"
                     :value="item.NAME">
          </el-option>
        </el-select>
      </div>
      <div class="left_item">
        <p>角色</p>
        <el-select class="select_box"
                   @change='change_role'
                   v-model="network_model.role_name"
                   placeholder="请选择角色"
                   clearable>
          <el-option v-for="item in network_model.role"
                     :key="item.name"
                     :label="item.name"
                     :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="left_item">
        <p>获取IP方式</p>
        <el-select class="select_box"
                   v-model="network_model.obtain"
                   @change='change_obtain'
                   :disabled="network_model.role_name =='镜像口'"
                   placeholder="请选择告警类型">
          <el-option v-for="item in network_model.obtain_list"
                     :key="item.name"
                     :label="item.name"
                     :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="left_item"
           v-if="network_model.input_show">
        <p>IP地址</p>
        <el-input class="select_box"
                  placeholder="请输入IP地址"
                  v-model="network_model.IPADDR"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <span>是否启用:</span>
        <el-switch v-model="network_model.switch">
        </el-switch>
      </div>
      <div class="left_item">
        <el-button type="primary"
                   class="save_btn"
                   @click="set_network">保存</el-button>
      </div>
    </div>
    <div class="mid">
      <div class="mid_item"
           v-if="network_model.input_show">
        <p>子网掩码</p>
        <el-input class="select_box"
                  placeholder="请输入子网掩码"
                  v-model="network_model.MASK"
                  clearable>
        </el-input>
      </div>
      <div class="mid_item"
           v-if="network_model.input_show">
        <p>默认网关</p>
        <el-input class="select_box"
                  placeholder="请输入默认网关"
                  v-model="network_model.GATEWAY"
                  clearable>
        </el-input>
      </div>
      <div class="mid_item"
           v-if="network_model.input_show">
        <p>首选DNS服务器</p>
        <el-input class="select_box"
                  placeholder="请输入首选DNS服务器"
                  v-model="network_model.DNS1"
                  clearable>
        </el-input>
      </div>
      <div class="mid_item"
           v-if="network_model.input_show">
        <p>备用DNS服务器</p>
        <el-input class="select_box"
                  placeholder="请输入备用DNS服务器"
                  v-model="network_model.DNS2"
                  clearable>
        </el-input>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "network-card",
  data () {
    return {
      key: "",
      network: [],
      network_model: {
        name: "",
        role_name: "",
        switch: true,
        role: [
          { name: "管理口" },
          { name: "通讯口" },
          { name: "镜像口" },
          { name: "沙箱口" }
        ],
        obtain: "",
        obtain_list: [{ name: "手动获取" }, { name: "自动获取" }],
        input_show: true,
        IPADDR: "",
        GATEWAY: "",
        MASK: "",
        DNS1: "",
        DNS2: ""
      },
      network_loading: false
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.get_data()
    this.check_passwd()
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
          if (status == '602') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
            eventBus.$emit('reset')
          }
          if (status == '600') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
          }
        })
    },
    change_role (item) {
      console.log(item);
      if (item == '镜像口') {
        this.network_model.obtain = '自动获取'
        this.network_model.input_show = false
      }
    },
    change_name (value) {
      this.network_model.name = value;
      this.network.forEach(item => {
        if (item.NAME == value) {
          switch (item.PORT) {
            case 0:
              this.network_model.role_name = "";
              break;
            case 1:
              this.network_model.role_name = "管理口";
              break;
            case 2:
              this.network_model.role_name = "通讯口";
              break;
            case 3:
              this.network_model.role_name = "镜像口";
              break;
            case 4:
              this.network_model.role_name = "沙箱口";
              break;
            default:
              this.network_model.role_name = "";
              break;
          }
          switch (item.BOOTPROTO) {
            case "static":
              this.network_model.obtain = "手动获取";
              this.network_model.input_show = true;
              break;
            case "none":
              this.network_model.obtain = "自动获取";
              this.network_model.input_show = false;
              break;
            case "dhcp":
              this.network_model.obtain = "自动获取";
              this.network_model.input_show = false;
              break;
            default:
              this.network_model.obtain = "自动获取";
              this.network_model.input_show = false;
              break;
          }
          switch (item.ONBOOT) {
            case "no":
              this.network_model.switch = false;
              break;
            case "yes":
              this.network_model.switch = true;
              break;
            default:
              this.network_model.switch = true;
              break;
          }
          this.network_model.IPADDR = item.IPADDR;
          this.network_model.GATEWAY = item.GATEWAY;
          this.network_model.MASK = item.MASK;
          this.network_model.DNS1 = item.DNS1;
          this.network_model.DNS2 = item.DNS2;
        }
      });
    },
    change_obtain (value) {
      switch (value) {
        case "自动获取":
          this.network_model.input_show = false;
          break;
        case "手动获取":
          this.network_model.input_show = true;
          break;
        case "":
          this.network_model.input_show = false;
          break;
        default:
          this.network_model.input_show = false;
          break;
      }
    },
    // 获取网卡配置
    get_data () {
      this.network_loading = true
      this.$axios.get('/yiiapi/seting/get-network')
        .then(response => {
          this.network_loading = false
          this.network = response.data.data.data;
          this.change_name(this.network[0].NAME)
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 设置网络
    set_network () {
      var BOOTPROTO = ''
      var ONBOOT = ''
      var PORT = ""
      switch (this.network_model.obtain) {
        case '手动获取':
          BOOTPROTO = 'static'
          break;
        case '自动获取':
          BOOTPROTO = 'dhcp'
          break;
        default:
          BOOTPROTO = 'none'
          break;
      }
      if (this.network_model.switch) {
        ONBOOT = 'yes'
      } else {
        ONBOOT = 'no'
      }
      switch (this.network_model.role_name) {
        case '':
          PORT = 0;
          break;
        case '管理口':
          PORT = 1;
          break;
        case '通讯口':
          PORT = 2;
          break;
        case '镜像口':
          PORT = 3;
          break;
        case '沙箱口':
          PORT = 4;
          break;
        default:
          break;
      }
      this.network_loading = true
      this.$axios.put('/yiiapi/seting/set-network', {
        NAME: this.network_model.name,
        ONBOOT: ONBOOT,
        BOOTPROTO: BOOTPROTO,
        IPADDR: this.network_model.IPADDR,
        MASK: this.network_model.MASK,
        GATEWAY: this.network_model.GATEWAY,
        DNS1: this.network_model.DNS1,
        DNS2: this.network_model.DNS2,
        PORT: PORT,
      })
        .then(response => {
          this.network_loading = false
          if (response.data.status == 0) {
            this.get_data()
            this.$message(
              {
                message: '修改配置成功',
                type: 'success',
              }
            );
          } else {
            this.$message(
              {
                message: response.data.msg,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
};
</script>

<style scoped lang="less">
#network-card {
  display: flex;
  text-align: left;
  .left {
    flex: 1;
    margin-right: 100px;
    .left_item {
      margin-bottom: 24px;
      p {
        font-size: 12px;
        color: #999999;
      }
      .select_box {
        width: 100%;
        height: 38px;
        margin-top: 6px;
        input {
          background: #f8f8f8 !important;
        }
      }
      .save_btn {
        width: 136px;
        height: 42px;
      }
    }
  }
  .mid {
    flex: 1;
    .mid_item {
      margin-bottom: 24px;
      p {
        font-size: 12px;
        color: #999999;
      }
      .select_box {
        width: 100%;
        height: 38px;
        margin-top: 6px;
        input {
          background: #f8f8f8 !important;
        }
      }
    }
  }
  .right {
    width: 500px;
  }
}
</style>
<style lang='less'>
#network-card {
  .el-input__inner {
    background: #f8f8f8;
    border: 0;
  }
  .el-switch__core {
    width: 40px !important;
  }
}
</style>
