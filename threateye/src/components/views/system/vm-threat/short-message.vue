<template>
  <div id="short_message">
    <div class="left">
      <div class="left_item">
        <p>短信平台
          <span class="red_necessary">*</span>
        </p>
        <el-input class="select_box"
                  placeholder="请输入短信平台 "
                  v-model="message.type"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>AccessKey ID
          <span class="red_necessary">*</span>
        </p>
        <el-input class="select_box"
                  placeholder="请输入AccessKey ID"
                  v-model="message.id"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>AccessKey Secret
          <span class="red_necessary">*</span>
        </p>
        <el-input class="select_box"
                  placeholder="请输入AccessKey Secret"
                  v-model="message.key"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>短信签名
        </p>
        <el-input class="select_box"
                  placeholder="请输入短信签名"
                  v-model="message.name"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>短信模板</p>
        <el-input class="select_box"
                  type="textarea"
                  :rows="10"
                  autosize
                  resize='none'
                  placeholder="请输入短信模板"
                  v-model="message.model"
                  clearable>
        </el-input>
      </div>
      <div class="left_item btn_box">
        <el-button type="primary"
                   class="save_btn">保存</el-button>
        <el-button type="primary"
                   class="test_btn">发送测试短信</el-button>
      </div>
    </div>
    <div class="mid">
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
      message: {
        type: '',
        id: '',
        key: '',
        name: '',
        model: '',

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
  }
};
</script>

<style scoped lang="less">
#short_message {
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
    .btn_box {
      margin-top: 30px;
    }
  }
  .mid {
    flex: 1;
  }
  .right {
    width: 500px;
  }
}
</style>
<style lang='less'>
#short_message {
  .el-input__inner {
    background: #f8f8f8;
    color: #606266;
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
  .select_box {
    width: 100%;
    min-height: 38px;
    margin-top: 6px;
    color: #606266;
    input {
      background: #f8f8f8 !important;
    }
  }
}
</style>
