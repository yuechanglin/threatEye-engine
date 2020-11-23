<template>
  <div id="system_control_resume"
       v-loading.fullscreen.lock="loading"
       class="container">
    <div class="content_box">
      <p class="title">恢复出厂设置</p>
      <el-button class="btn_i"
                 @click="restore">恢复出厂设置</el-button>
      <p class="title marin_top">重启平台</p>
      <el-button class="btn_i"
                 @click="reboot">立即重启</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "system_control_resume",
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.test()
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
    // 测试600专用
    test () {
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'seting/restore',
        }
      })
        .then(response => {

        })
        .catch(error => {
          console.log(error);
        })
    },
    restore () {
      this.$confirm('此操作将恢复出场设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$axios.put('/yiiapi/seting/restore')
          .then(response => {
            this.loading = false
            let { status, data } = response.data;
            if (status == 0) {
              this.$message(
                {
                  message: '执行恢复出场设置成功',
                  type: 'success',
                }
              );
              location.reload();
              this.$router.push('/login');
            }
          })
          .catch(error => {
            console.log(error);
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    reboot () {
      this.$confirm('此操作将重启平台, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$axios.put('/yiiapi/seting/reboot')
          .then(response => {
            this.loading = false
            let { status, data } = response.data;
            if (status == 0) {
              this.$message(
                {
                  message: '执行重启平台成功',
                  type: 'success',
                }
              );
              location.reload();
              this.$router.push('/login');
            }
          })
          .catch(error => {
            console.log(error);
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
  }
}
</script>

<style scoped lang='less'>
@import '../../../assets/css/less/system/setting/common_box.less';
#system_control_resume {
  .content_box {
    .title {
      font-family: PingFangMedium;
      font-size: 16px;
      color: #333333;
      margin-bottom: 24px;
    }
    .marin_top {
      margin-top: 64px;
    }
    .btn_i {
      width: 148px;
      height: 42px;
      background: #0070ff;
      color: #fff;
    }
  }
}
</style>
