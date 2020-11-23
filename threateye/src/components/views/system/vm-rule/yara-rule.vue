<template>
  <div id="yara_rule"
       v-loading.fullscreen.lock="loading">
    <p>
      <img src=""
           alt="">
      <span>文件大小：{{rule_data.file_size | filterType}}</span>
    </p>
    <p class="updata_time">上次更新时间：
      <span>{{rule_data.update_time}}</span>
    </p>
    <div class="btn_box">
      <el-button class="btn_i"
                 @click="download">下载</el-button>
      <el-upload class="upload-demo"
                 style="display: inline-block;"
                 action="/yiiapi/yararule/upload"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :before-remove="beforeRemove"
                 :show-file-list='false'
                 :before-upload="onBeforeUpload"
                 :on-change="onChange"
                 multiple
                 :auto-upload='true'
                 :on-success='onsuccess'
                 :on-error='onerror'
                 :on-exceed="handleExceed"
                 :file-list="fileList">
        <el-button class="btn_i"
                   v-cloak
                   type="primary">
          <span> {{rule_data.name}}</span>
        </el-button>
      </el-upload>
      <el-button class="btn_o"
                 @click="del_yara">删除</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "yara_rule",
  data () {
    return {
      rule_data: {
        file_size: '',
        update_time: '',
        name: '上传',
      },
      rule: {
        upload_pop: false
      },
      fileList: [],
      loading: false,
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route (to, from) {
      console.log(to.path);
    }
  },
  created () {
    this.get_data()

  },
  mounted () {
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
      this.loading = true
      this.$axios.get('/yiiapi/yararule/get')
        .then(response => {
          console.log(response.data);
          if (response.data.status == 0) {
            this.rule_data.file_size = response.data.data.file_size
            this.rule_data.update_time = response.data.data.update_time
            this.rule_data.name = '替换'
          } else if (response.data.status == 1) {
            this.rule_data.file_size = response.data.msg.file_size
            this.rule_data.update_time = response.data.msg.update_time
            this.rule_data.name = '上传'
          }
          setTimeout(() => {
            this.loading = false
          }, 500);
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 下载
    download () {
      console.log(this.rule_data);
      if (this.rule_data.file_size == '') {
        this.$message(
          {
            message: '并未发现任何yara规则文件，请先上传规则库文件！',
            type: 'warning',
          }
        );
        return false
      }
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          console.log(response.data);
          if (response.data.status == 0) {
            var tt = new Date().getTime();
            var url = '/yiiapi/yararule/download';
            var form = $("<form>"); //定义一个form表单
            form.attr("style", "display:none");
            form.attr("target", "");
            form.attr("method", "get"); //请求类型
            form.attr("action", url); //请求地址
            $("body").append(form); //将表单放置在web中
            var input1 = $("<input>");
            input1.attr("type", "hidden");
            form.append(input1);
            form.submit(); //表单提交
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleExceed () { },
    handlePreview () { },
    handleRemove () { },
    beforeRemove () { },
    onBeforeUpload () {

    },
    onChange (params) {
      console.log(params);
      console.log(1111);
      if (params.status == 'fail') {
        this.$message(
          {
            message: '上传失败',
            type: 'error',
          }
        );
      }
    },
    onsuccess (params) {
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          if (params.status == 1) {
            this.$message(
              {
                message: params.msg,
                type: 'error',
              }
            );
          } else if (params.status == 0) {
            this.get_data();
            this.$message(
              {
                message: '上传成功',
                type: 'success',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })

    },
    onerror (params) {
      console.log(params);
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          if (params.status == 'fail') {
            this.$message(
              {
                message: '上传失败',
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 删除
    del_yara () {
      this.$confirm('此操作删除此文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/yiiapi/yararule/del')
          .then(response => {
            console.log(response.data.data);
            if (response.data.data.status == 0) {
              this.get_data();
              this.$message(
                {
                  message: '删除成功',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: '删除失败',
                  type: 'error',
                }
              );
            }
          })
          .catch(error => {
            console.log(error);
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  },
  filters: {
    filterType: function (val) {
      if (val == '') return;
      if (val == undefined) return;
      if (val == 0) return '0B';
      var k = 1024;
      var size = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(val) / Math.log(k));
      return (val / Math.pow(k, i)).toPrecision(3) + ' ' + size[i]
    }
  }
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
}
#yara_rule {
  text-align: left;
  .updata_time {
    margin-top: 14px;
  }
  .btn_box {
    margin-top: 48px;
    .btn_i {
      padding: 0;
      width: 136px;
      height: 42px;
      background: #0070ff;
      color: #fff;
    }
    .btn_o {
      padding: 0;
      width: 136px;
      height: 42px;
      background: #fff;
      border: 1px solid #0070ff;
      color: #0070ff;
    }
  }
}
</style>
<style lang='less'>
</style>
