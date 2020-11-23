<template>
  <div id="report-sending">
    <div class="r_top">
      <div class="r_content_top">
        <h3 class="title">报表发送</h3>
      </div>
      <el-form class="r_content_main">
        <el-row type="flex"
                class="r_main_list">
          <el-col :span="3">
            <span class="title">状态</span>
          </el-col>
          <el-col :span="21">
            <div class="r_radio">
              <el-radio v-model="send_config.status"
                        label="1"
                        class="r_radio_item">启用</el-radio>
              <el-radio v-model="send_config.status"
                        label="0"
                        class="r_radio_item">停用</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex"
                class="r_main_list">
          <el-col :span="3">
            <span class="title">发送周期</span>
          </el-col>
          <el-col :span="21">
            <div class="r_radio">
              <el-radio v-model="send_config.cycle"
                        label="daily"
                        class="r_radio_item">每日</el-radio>
              <el-radio v-model="send_config.cycle"
                        label="weekly"
                        class="r_radio_item">每周</el-radio>
              <el-radio v-model="send_config.cycle"
                        label="monthly"
                        class="r_radio_item">每月</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex"
                class="r_main_list">
          <el-col :span="3">
            <span class="title">发送格式</span>
          </el-col>
          <el-col :span="21">
            <div class="r_radio">
              <el-radio v-model="send_config.report_type"
                        label="excel"
                        class="r_radio_item">Excel</el-radio>
              <el-radio v-model="send_config.report_type"
                        label="doc"
                        class="r_radio_item">Word</el-radio>
              <el-radio v-model="send_config.report_type"
                        label="pdf"
                        class="r_radio_item">PDF</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex"
                class="r_main_list r_special_list">
          <el-col :span="3">
            <span class="title">收件人邮箱</span>
          </el-col>
          <el-col :span="21">
            <div class="item_addrs"
                 v-for="(item,index) in send_config.receiver_list">
              <el-input class="select_box"
                        placeholder="请输收件人邮箱,最多可以设置5个收件人邮箱"
                        v-model="item.name"
                        clearable>
              </el-input>
              <img src="@/assets/images/common/add.png"
                   alt=""
                   class="img_box"
                   v-if="item.icon"
                   @click="add_email">
              <img src="@/assets/images/common/del.png"
                   alt=""
                   class="img_box"
                   @click="del_email(item,index)"
                   v-if="!item.icon">
            </div>
          </el-col>
        </el-row>
        <div class="r_btn_group">
          <el-button class="b_btn b_ok"
                     @click="edit_data">确定</el-button>
          <el-button class="b_btn b_cancel"
                     @click="get_data">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "report-sending",
  data () {
    return {
      send_config: {
        cycle: "daily",
        receiver: [],
        receiver_list: [{
          name: '',
          icon: true
        }],
        report_type: '',
        status: '',
        receiver_edit: [],
      }
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
      this.$axios.get('/yiiapi/report/get-config')
        .then(response => {
          let { status, data } = response.data;
          this.send_config.status = data.status + '';
          this.send_config.cycle = data.cycle;
          this.send_config.receiver = data.receiver;
          this.send_config.report_type = data.report_type;
          console.log(this.send_config);
          if (this.send_config.receiver.length == 0) {
            this.send_config.receiver_list = [];
            this.send_config.receiver_list.push({
              name: '',
              icon: true
            })
          } else {
            this.send_config.receiver_list = [];
            this.send_config.receiver.forEach(item => {
              this.send_config.receiver_list.push({
                name: item,
                icon: false
              })
            });
            this.send_config.receiver_list[this.send_config.receiver_list.length - 1].icon = true
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 编辑
    edit_data () {
      this.send_config.receiver_edit = []
      this.send_config.receiver_list.forEach(item => {
        if (item.name != '') {
          this.send_config.receiver_edit.push(item.name)
        }
      });
      if (this.send_config.receiver_edit.length == 0) {
        this.$message(
          {
            message: '请输入发件人邮箱',
            type: 'warning',
          }
        );
        return false
      }
      this.$axios.post('/yiiapi/report/set-config', {
        status: this.send_config.status,
        cycle: this.send_config.cycle,
        report_type: this.send_config.report_type,
        receiver: this.send_config.receiver_edit,
      })
        .then(response => {
          let { status, data, msg } = response.data;
          console.log(data);
          console.log(status);
          if (status == 'success') {
            this.get_data();
            this.$message(
              {
                message: '修改成功',
                type: 'success',
              }
            );
          } else if (status == 602) {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
          } else {
            this.$message(
              {
                message: msg,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 添加邮箱
    add_email () {
      if (this.send_config.receiver_list.length < 5) {
        this.send_config.receiver_list.forEach(item => {
          item.icon = false;
        });
        this.send_config.receiver_list.push({ ip: '', icon: true })
      } else {
        this.$message.warning(
          {
            message: '最多可以设置5个收件人邮箱',
            offset: 50
          })
      }
    },
    del_email (item, index) {
      console.log(this.send_config.receiver_list);
      this.send_config.receiver_list.splice(index, 1);
    },
  }
}
</script>
<style scoped lang="less">
@import '../../../assets/css/less/report_less/rewrite_radio.less';
#report-sending {
  padding: 24px;
  .r_top {
    background: #fff;
    min-height: 900px;
    font-family: PingFangMedium;
    .r_content_top {
      height: 80px;
      line-height: 80px;
      text-align: left;
      border-bottom: 1px solid #ececec;
      .title {
        font-size: 18px;
        color: #333333;
        padding: 0 24px;
      }
    }
    .r_content_main {
      padding: 0 24px;
      text-align: left;
      .r_main_list {
        // height: 62px;
        line-height: 60px;
        border-bottom: 1px solid #ececec;
        .title {
          font-size: 14px;
          color: #333;
        }
        .r_radio {
          .r_radio_item {
            font-size: 14px;
            color: #333;
          }
        }
        &.r_special_list {
          border-width: 0;
          height: auto;
          min-height: 120px;
          position: relative;
          .r_main_list_item {
            .report-input {
              width: 340px;
            }
          }
        }
      }
      .r_btn_group {
        text-align: left;
        // height: 42px;
        z-index: 999;
        font-size: 0;
        /deep/ .b_btn {
          width: 136px;
          // height: 42px;
          font-size: 16px;
          vertical-align: text-bottom;
          border: 1px solid #0070ff;
          &.b_ok {
            background: #0070ff;
            color: #fff;
          }
          &.b_cancel {
            background: #fff;
            color: #0070ff;
            margin-left: 24px;
          }
        }
      }
    }
  }
  .item_addrs {
    // line-height: 38px;
    .select_box {
      width: 370px;
      height: 38px;
      line-height: 38px;
    }
    /deep/ .el-input__inner {
      height: 38px;
      width: 370px;
      background: #f8f8f8;
      border: 0;
    }
    .img_box {
      width: 16px;
      height: 16px;
      margin-left: 10px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
}
</style>
