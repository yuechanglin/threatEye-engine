<template>
  <div id="proxy-server">
    <div class="left">
      <div class="left_item">
        <span>代理启停:</span>
        <el-switch v-model="proxy.proxy_switch">
        </el-switch>
      </div>
      <div class="left_item">
        <p>代理类型</p>
        <el-select class="select_box"
                   v-model="proxy.type"
                   placeholder="请选择代理类型">
          <el-option v-for="item in proxy.type_list"
                     :key="item.name"
                     :label="item.name"
                     :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="left_item">
        <p>代理地址</p>
        <el-input class="select_box"
                  placeholder="请输入代理地址"
                  v-model="proxy.ip"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>端口</p>
        <el-input class="select_box"
                  placeholder="请输入端口"
                  v-model="proxy.port"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <el-button type="primary"
                   class="save_btn"
                   @click="set_proxy">保存</el-button>
      </div>
    </div>
    <div class="mid">
      <div class="mid_item">
        <span>密码验证:</span>
        <el-switch v-model="proxy.verify_passwd"></el-switch>
      </div>
      <div class="mid_item">
        <p>用户名</p>
        <el-input class="select_box"
                  placeholder="请输入用户名"
                  v-model="proxy.user"
                  clearable>
        </el-input>
      </div>
      <div class="mid_item">
        <p>用户密码</p>
        <el-input class="select_box"
                  placeholder="请输入用户密码"
                  v-model="proxy.password"
                  show-password>
        </el-input>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "proxy-server",
  data () {
    return {
      proxy: {
        proxy_switch: false,
        verify_passwd: false,
        type: "",
        ip: "",
        port: "",
        user: "",
        password: "",
        type_list: [
          {
            name: "http"
          },
          {
            name: "https"
          }
        ]
      }
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
    get_data () {
      this.$axios.get('/yiiapi/seting/get-proxy-server')
        .then(response => {
          let { status, data } = response.data;
          console.log(data.data[0].PROXYCONF);
          this.proxy.type = data.data[0].PROXYCONF.type
          this.proxy.ip = data.data[0].PROXYCONF.ip
          this.proxy.port = data.data[0].PROXYCONF.port
          this.proxy.user = data.data[0].PROXYCONF.user
          this.proxy.password = data.data[0].PROXYCONF.password
          if (data.data[0].PROXYCONF.verify_passwd == 'yes') {
            this.proxy.verify_passwd = true
          } else {
            this.proxy.verify_passwd = false
          }
          if (data.data[0].PROXYCONF.proxy_switch == 'yes') {
            this.proxy.proxy_switch = true
          } else {
            this.proxy.proxy_switch = false
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    set_proxy () {
      var proxy_switch = ''
      var verify_passwd = ''
      if (this.proxy.proxy_switch) {
        proxy_switch = 'yes'
      } else {
        proxy_switch = 'no'
      }
      if (this.proxy.verify_passwd) {
        verify_passwd = 'yes'
      } else {
        verify_passwd = 'no'
      }
      this.$axios.put('/yiiapi/seting/set-proxy-server', {
        proxy_switch: proxy_switch,
        type: this.proxy.type,
        ip: this.proxy.ip,
        port: this.proxy.port,
        verify_passwd: verify_passwd,
        user: this.proxy.user,
        password: this.proxy.password
      })
        .then(response => {
          let { status, data } = response.data;
          if (status == 0) {
            this.get_data();
            this.$message(
              {
                message: '修改代理成功',
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
          console.log(data.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
};
</script>

<style scoped lang="less">
#proxy-server {
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
#proxy-server {
  .el-input__inner {
    background: #f8f8f8;
    border: 0;
  }
  .el-switch__core {
    width: 40px !important;
  }
}
</style>
