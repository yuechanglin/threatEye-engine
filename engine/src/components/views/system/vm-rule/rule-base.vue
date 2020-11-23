<template>
  <div id="rule_base"
       v-loading.fullscreen.lock="loading">
    <p class="title">实时更新</p>
    <p class="item_box"
       v-for="item in rule"
       v-if="item.update_type=='1'">
      <span class="item_name">{{item.key}}</span>
      <span class="item_time">上次更新时间：
        <span>{{item.time}}</span>
      </span>
      <span class="item_status">{{item.status_cn}}</span>
    </p>
    <el-button type="primary"
               class="update"
               @click="update_online">更新</el-button>
    <p class="title">离线更新</p>
    <p class="item_box"
       v-for="item in rule"
       v-if="item.update_type=='2'">
      <span class="item_name">{{item.key}}</span>
      <span class="item_time">上次更新时间：
        <span>{{item.time}}</span>
      </span>
      <span class="item_status">{{item.status_cn}}</span>
    </p>
    <el-button type="primary"
               class="update"
               @click="open_box">上传更新文件</el-button>
    <el-dialog class="import_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="rule_data.upload_pop">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_upload_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">上传更新文件</span>
      </div>
      <div class="content">
        <uploader :options="options"
                  :autoStart='false'
                  :fileStatusText='fileStatusText'
                  @file-added="onFileAdded"
                  @upload-start="onFilestart"
                  @file-success="onFileSuccess"
                  @file-progress="onFileProgress"
                  @file-error="onFileError"
                  class="uploader-example">
          <uploader-unsupport></uploader-unsupport>
          <img class="upload_img"
               src="@/assets/images/setting/upload_s.png"
               alt="">
          <uploader-drop>
            <uploader-btn class="select_btn"
                          :directory="false"
                          :attrs="attrs"
                          :single='true'>点击上传</uploader-btn>
            <span>请上传文件名为sdk.tgz、ids.tgz、df.tgz的文件</span>
          </uploader-drop>
          <uploader-list></uploader-list>
        </uploader>
      </div>
      <div class="btn_box">
        <el-button @click="closed_upload_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   :disabled="upload_btn"
                   :class="upload_btn?'disabled_color':''"
                   @click="upload_ok">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "rule_base",
  data () {
    return {
      loading: false,
      options: {
        target: '/yiiapi/rulebase/upload-package',
        chunkSize: '10048000',   //分块大小
        singleFile: true,
        testChunks: false,     //是否开启服务器分片校验
        parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
          return parsedTimeRemaining
            .replace(/\syears?/, '年')
            .replace(/\days?/, '天')
            .replace(/\shours?/, '小时')
            .replace(/\sminutes?/, '分钟')
            .replace(/\sseconds?/, '秒')
        },
      },
      attrs: {
        accept: 'application/gzip'//接受文件类型
      },
      fileStatusText: {
        success: '成功',
        error: '上传失败，请重新上传',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待'
      },
      rule: {},
      rule_data: {
        upload_pop: false,
      },
      autoStart: false,
      timer: null,
      file_content: '',
      upload_btn: true,
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  activated () { },
  deactivated () { },
  mounted () {
    this.get_data();
    this.check_passwd();
    this.timer = setInterval(() => {
      this.get_data();
    }, 2000)
  },
  beforeDestroy () {
    console.log('2222');
    clearInterval(this.timer); //关闭
  },
  destroyed () {
    console.log('33333');
  },
  beforeRouteLeave (to, from, next) {
    console.log('2132131');

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
    // 定时更新
    update_status () {
      this.$axios.get('/yiiapi/rulebase/get-update-status')
        .then(response => {
          if (response.data.status == 0) {
            this.rule = response.data.data
            this.rule.forEach(item => {
              switch (item.status) {
                case '1':
                  item.status_cn = '更新中'
                  break;
                case '2':
                  item.status_cn = '成功'
                  break;
                case '3':
                  item.status_cn = '失败'
                  break;
                default:
                  break;
              }
            });
          } else if (response.data.status == 1) {

          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    get_data () {
      this.$axios.get('/yiiapi/rulebase/get-update-status')
        .then(response => {
          if (response.data.status == 0) {
            this.rule = response.data.data
            this.rule.forEach(item => {
              switch (item.status) {
                case '1':
                  item.status_cn = '更新中'
                  break;
                case '2':
                  item.status_cn = '成功'
                  break;
                case '3':
                  item.status_cn = '失败'
                  break;
                default:
                  break;
              }
            });
          } else if (response.data.status == 1) {

          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    open_box () {
      this.upload_btn = true;
      this.rule_data.upload_pop = true;
    },
    closed_upload_box () {
      this.upload_btn = true;
      this.rule_data.upload_pop = false;
      if (this.file_content != '') {
        this.file_content.cancel()
        this.file_content == ''
      }
    },
    uploadSuccess () {
      console.log("1111");
      this.monitor_state.import_loading = false;
    },
    // 在线更新
    update_online () {
      this.$axios.post('/yiiapi/rulebase/realtime-update')
        .then(response => {
          let { status, data } = response.data;
          if (status == 0) {
            this.$message({
              type: 'success',
              message: '开始更新！'
            });
            setTimeout(() => {
              this.get_data()
            }, 100);
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 离线更新
    // 上传
    onFileAdded (file) {
      this.upload_btn = false
      console.log(this.file_content);
      console.log(file);
      file.pause()
      if (file.name == 'sdk.tgz' || file.name == 'ids.tgz' || file.name == 'df.tgz') {
        this.file_content = file
      } else {
        this.$message({
          message: '请上传文件名为sdk.tgz、ids.tgz、df.tgz的文件',
          type: 'warning'
        });
        file.ignored = true
        setTimeout(() => {
          file.cancel()
        }, 10)
      }
    },
    onFilestart (file) {
      console.log('213123');
    },
    onFileSuccess (rootFile, file, response, chunk) {
      console.log(rootFile);
      console.log(response, );
      console.log(chunk);
      this.upload_btn = true;
      if (JSON.parse(response).status == 0) {
        console.log(file);
        this.$axios.post('/yiiapi/rulebase/upload-success', {
          "file_name": file.name
        })
          .then(response => {
            let { status, data } = response.data;
            if (status == 0) {
              this.get_data();
              this.$message(
                {
                  message: '上传成功！',
                  type: 'success',
                }
              );
              file.cancel()
              this.rule_data.upload_pop = false;
            }
          })
          .catch(error => {
            console.log(error);
          })

      } else {
        this.$message(
          {
            message: JSON.parse(response).msg,
            type: 'success',
          }
        );
        file.cancel()
        this.rule_data.upload_pop = false;
      }
      console.log(chunk);
    },
    onFileProgress (rootFile, file, chunk) {
      console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
      console.log(chunk);

    },
    onFileError () {
      this.upload_btn = true;
      this.file_content.cancel();
      this.$message(
        {
          message: '上传失败，请重新上传',
          type: 'error',
        }
      );
    },
    upload_ok () {
      console.log(this.file_content);
      setTimeout(() => {
        this.file_content.resume();
      }, 100)
    }
  }
};
</script>

<style scoped lang="less">
#rule_base {
  text-align: left;

  .title {
    font-size: 16px;
    font-family: PingFangMedium;
    color: #333333;
    margin-bottom: 24px;
  }
  .item_box {
    margin-bottom: 16px;
    font-size: 14px;
    color: #333333;
    .item_name {
      display: inline-block;
      width: 90px;
    }
    .item_time {
      display: inline-block;
      width: 296px;
    }
  }
  .update {
    width: 136px;
    height: 42px;
    margin: 36px 0px 48px 0;
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#rule_base {
  .uploader-file-name {
    width: 20% !important;
  }
  .uploader-file-size {
    width: 25% !important;
  }
  .uploader-file-meta {
    width: 0% !important;
  }
  .uploader-file-status {
    width: 50% !important;
  }
  .disabled_color {
    background: #ccc !important ;
  }
  .el-dialog {
    width: 600px;
    /deep/ .uploader-example {
      width: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      text-align: center;
      .uploader-drop {
        border: 0;
        background: none;
      }
      .uploader-list {
        overflow: auto;
        .uploader-file {
          height: 30px;
          line-height: 30px;
          border: 0;
          .uploader-file-icon {
            display: none;
          }
          .uploader-file-actions {
            display: none;
          }
        }
      }
    }

    .select_btn {
      border: 0;
    }
    .uploader-btn {
      display: block;
      border: 0;
      background: none;
      color: #0070ff;
      cursor: pointer;
    }
    .uploader-btn:hover {
      background: none;
      color: #0070ff;
      cursor: pointer;
    }
    .upload_img {
      width: 72px;
      height: 72px;
      margin-top: 35px;
    }
  }
}
</style>
