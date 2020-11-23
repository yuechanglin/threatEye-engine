<template>
  <div id="mail_notic">
    <div class="left">
      <p class="title">邮件服务器设置</p>
      <div class="left_item">
        <p>SMTP服务器
          <span class="red_necessary">*</span>
        </p>
        <el-input class="select_box"
                  placeholder="请输入SMTP服务器"
                  v-model="mail.host"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>SMTP端口
          <span class="red_necessary">*</span>
        </p>
        <el-input class="select_box"
                  placeholder="请输入SMTP端口"
                  v-model="mail.port"
                  clearable>
        </el-input>
      </div>
      <p class="title">
        SMTP启用安全连接SSL启用
        <el-switch v-model="mail.ssl_switch">
        </el-switch>
      </p>
      <!-- <div class="left_item">
        <p>发件邮箱账号:</p>
        <el-input class="select_box"
                  placeholder="请输入发件邮箱账号"
                  v-model="mail.user"
                  clearable>
        </el-input>
      </div> -->
      <div class="left_item">
        <p>邮箱地址
          <span class="red_necessary">*</span>
        </p>
        <el-input class="select_box"
                  placeholder="请输入邮箱地址"
                  v-model="mail.username"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>邮箱密码
          <span class="red_necessary">*</span>
        </p>
        <el-input class="select_box"
                  placeholder="请输入邮箱密码"
                  v-model="mail.password"
                  show-password>
        </el-input>
      </div>
      <div class="left_item">
        <el-button type="primary"
                   class="save_btn"
                   @click="send_save">保存</el-button>
        <el-button type="primary"
                   class="test_btn"
                   @click='send_test'>发送测试邮件</el-button>
      </div>
    </div>
    <div class="mid">
      <p class="title">收件邮箱账号</p>
      <div class="mid_item">
        <p>邮箱地址
          <span class="red_necessary">*</span>
        </p>
        <div class="item_addrs"
             v-for="(item,index) in mail.alertEmail_list">
          <el-input class="select_box"
                    placeholder="请输入邮箱地址，最多可以设置5个收件邮箱账号"
                    v-model="item.name"
                    clearable>
          </el-input>
          <img src="@/assets/images/common/add.png"
               alt=""
               class="img_box"
               v-if="item.icon"
               @click="add_addr">
          <img src="@/assets/images/common/del.png"
               alt=""
               class="img_box"
               @click="del_addr(item,index)"
               v-if="!item.icon">
        </div>
      </div>
      <div class="mid_item">
        <p>发送内容</p>
        <div style="display:flex">
          <el-input class="select_box"
                    type="textarea"
                    :rows="10"
                    autosize
                    maxlength="500"
                    show-word-limit
                    resize='none'
                    placeholder="请输入发送内容"
                    v-model="mail.content"
                    clearable>
          </el-input>
          <span style="width: 16px;"></span>
        </div>
      </div>
      <p class="title">
        发生警告时给此邮箱发送通知邮件
        <el-switch v-model="mail.send">
        </el-switch>
      </p>
      <div class="mid_item">
        <p>
          威胁等级
        </p>
        <p style="margin-top: 10px;">
          <el-checkbox-group v-model="checkList"
                             @change="handleCheckedCitiesChange">
            <el-checkbox label="高危"></el-checkbox>
            <el-checkbox label="中危"></el-checkbox>
            <el-checkbox label="低危"></el-checkbox>
          </el-checkbox-group>
        </p>
      </div>

    </div>
    <div class="right"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "mail-notic",
  data () {
    return {
      checkList: ['高危'],
      mail: {
        alertEmail_list: [{
          name: "",
          icon: true
        }],
        content: "",
        ssl_switch: false,
        host: "",
        info: "",
        password: "",
        port: '',
        send: false,
        user: "",
        username: "",
      },
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.get_data();
    this.check_passwd();
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
    get_data () {
      this.$axios.get('/yiiapi/email/get')
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          this.mail.port = data.port
          this.mail.content = data.content
          this.mail.host = data.host
          this.mail.username = data.username
          this.mail.send = data.send
          if (status == 602) {
            return false
          }
          if (data.encryption == 'ssl') {
            this.mail.ssl_switch = true
          } else {
            this.mail.ssl_switch = false
          }
          if (data.alertEmail.length == 0) {
            this.mail.alertEmail_list = []
            this.mail.alertEmail_list.push(
              {
                name: '',
                icon: true,
              }
            )
          } else {
            this.mail.alertEmail_list = []
            data.alertEmail.forEach(element => {
              var obj = {
                name: element,
                icon: false,
              }
              this.mail.alertEmail_list.push(obj)
            });
            this.mail.alertEmail_list[this.mail.alertEmail_list.length - 1].icon = true
          }

        })
        .catch(error => {
          console.log(error);
        })
    },
    handleCheckedCitiesChange (value) {
      console.log(value);
      if (value.length == 0) {
        this.$message(
          {
            message: '请至少选择一种威胁等级设置告警邮件通知',
            type: 'warning',
          }
        );
      }
    },
    // 发送测试
    send_test () {
      console.log(this.checkList);
      if (this.checkList.length == 0) {
        this.$message(
          {
            message: '请至少选择一种威胁等级设置告警邮件通知',
            type: 'warning',
          }
        );
        return false
      }
      var encryption = ''
      var alertEmail = []
      this.mail.alertEmail_list.forEach(element => {
        if (element.name != '') {
          alertEmail.push(element.name)
        }
      });
      if (alertEmail.length == 0) {
        this.$message(
          {
            message: '请输入收件箱地址',
            type: 'warning',
          }
        );
        return false;
      }
      if (this.mail.password == '') {
        this.$message(
          {
            message: '请输入邮箱密码',
            type: 'warning',
          }
        );
        return false;
      }
      if (this.mail.ssl_switch) {
        encryption = 'ssl'
      } else {
        encryption = ''
      }
      var degree_list = []
      this.checkList.forEach(element => {
        switch (element) {
          case '高危':
            degree_list.push('high')
            break;
          case '中危':
            degree_list.push('midium')
            break;
          case '低危':
            degree_list.push('low')
            break;

          default:
            break;
        }
      });
      this.$axios.post('/yiiapi/email/test', {
        encryption: encryption,
        host: this.mail.host,
        port: this.mail.port,
        username: this.mail.username,
        password: this.mail.password,
        send: this.mail.send,
        content: this.mail.content,
        alertEmail: alertEmail,
        degree: degree_list
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(status);
          console.log(data);
          if (status == 0) {
            // this.get_data()
            this.$message(
              {
                message: '发送测试邮件通知成功',
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
      console.log(this.mail);
    },
    // 保存配置
    send_save () {
      if (this.checkList.length == 0) {
        this.$message(
          {
            message: '请至少选择一种威胁等级设置告警邮件通知',
            type: 'warning',
          }
        );
        return false
      }
      var encryption = ''
      var alertEmail = []
      console.log(this.mail.alertEmail_list);
      this.mail.alertEmail_list.forEach(element => {
        if (element.name != '') {
          alertEmail.push(element.name)
        }
      });
      if (alertEmail.length == 0) {
        this.$message(
          {
            message: '请输入收件箱地址',
            type: 'warning',
          }
        );
        return false;
      }
      if (this.mail.password == '') {
        this.$message(
          {
            message: '请输入邮箱密码',
            type: 'warning',
          }
        );
        return false;
      }
      if (this.mail.ssl_switch) {
        encryption = 'ssl'
      } else {
        encryption = ''
      }
      var degree_list = []
      this.checkList.forEach(element => {
        switch (element) {
          case '高危':
            degree_list.push('high')
            break;
          case '中危':
            degree_list.push('midium')
            break;
          case '低危':
            degree_list.push('low')
            break;

          default:
            break;
        }
      });
      this.$axios.post('/yiiapi/email/save', {
        encryption: encryption,
        host: this.mail.host,
        port: this.mail.port,
        username: this.mail.username,
        password: this.mail.password,
        send: this.mail.send,
        content: this.mail.content,
        alertEmail: alertEmail,
        degree: degree_list
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(status);
          console.log(data);
          if (status == 0) {
            this.get_data()
            this.$message(
              {
                message: '设置邮件通知成功',
                type: 'success',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    //  添加邮箱
    add_addr () {
      if (this.mail.alertEmail_list.length < 5) {
        this.mail.alertEmail_list.forEach(item => {
          item.icon = false;
        });
        this.mail.alertEmail_list.push({ name: '', icon: true })
      } else {
        this.$message.warning(
          {
            message: '最多可以设置5个收件邮箱账号。',
            offset: 50
          })
      }



    },
    del_addr (item, index) {
      this.mail.alertEmail_list.splice(index, 1);
    },
  }
};
</script>

<style scoped lang="less">
#mail_notic {
  display: flex;
  text-align: left;
  .left {
    flex: 1;
    margin-right: 100px;
    .title {
      margin-bottom: 24px;
      font-size: 16px;
      color: #333;
    }
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
      .test_btn {
        background: #fff;
        border-color: #0070ff;
        color: #0070ff;
      }
    }
  }
  .mid {
    flex: 1;
    .title {
      margin-bottom: 24px;
      font-size: 16px;
      color: #333;
    }
    .mid_item {
      margin-bottom: 24px;
      p {
        font-size: 12px;
        color: #999999;
      }
      .item_addrs {
        display: flex;
        margin-bottom: 12px;
        .select_box {
          flex: 1;
          height: 38px;
          margin-top: 6px;
          input {
            background: #f8f8f8 !important;
          }
        }
        .img_box {
          width: 16px;
          height: 16px;
          margin-left: 10px;
          margin-top: 14px;
          cursor: pointer;
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
#mail_notic {
  .el-input__inner {
    background: #f8f8f8;
    border: 0;
  }
  .el-switch__core {
    width: 40px !important;
  }
  .el-textarea__inner {
    margin-top: 8px;
    background: #f8f8f8;
    border: 0;
    min-height: 30px !important;
    line-height: 30px;
  }
  .el-textarea {
    min-height: 30px !important;
  }
  textarea {
    min-height: 30px !important;
  }
}
</style>
