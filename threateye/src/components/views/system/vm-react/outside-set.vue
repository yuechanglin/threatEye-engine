
<template>
  <div id="outside_set">
    <div class="set_top">
      <p>
        <span>是否启用:</span>
        <el-switch v-model="outside_set.switch"
                   @change="set_switch">
        </el-switch>
      </p>
      <p class="top_tips">本功能实现和第三方设备如防火墙的联动，第三方设备通过URL地址获取恶意IP列表以及恶意域名列表做告警提示或者拦截。</p>
      <div class="malice_list">
        <div class="list_left">
          <p class="item_title">恶意IP列表</p>
          <p class="item_content">
            <span>{{hostip}}/MaliciousIP?uname=账号&passwd=密码</span>
          </p>
        </div>
        <div class="list_right">
          <p class="item_title">恶意域名列表</p>
          <p class="item_content">
            <span>{{hostip}}/MaliciousURL?uname=账号&passwd=密码</span>
          </p>
        </div>
      </div>
    </div>
    <el-button class="btn_i"
               @click="add_box">创建账号</el-button>
    <div class="outside_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                border
                :data="user_list.data"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="alert_detail">
        <el-table-column prop="uname"
                         align="center"
                         label="用户名"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="passwd"
                         align="center"
                         label="密码"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label='操作'
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='edit_box(scope.row)'>编辑</el-button>
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='del_box(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="user_list.pageNow"
                     :page-sizes="[10,20,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="user_list.count">
      </el-pagination>
    </div>
    <!-- 创建账号 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="outside_pop.add.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">创建用户</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">用户名</span>
            <span class="red_necessary">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入用户名"
                    v-model="outside_pop.add.user"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">密码</span>
            <span class="red_necessary">*</span>
          </p>
          <el-input class="select_box"
                    :type="passw_add"
                    placeholder="请输入密码"
                    v-model="outside_pop.add.pswd"
                    clearable>
            <i slot="suffix"
               :class="icon"
               @click="showPass_add"></i>
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_add_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="add_user">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑账号 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="outside_pop.edit.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑用户</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">密码</span>
            <span class="red_necessary">*</span>
          </p>
          <el-input class="select_box"
                    :type="passw_edit"
                    placeholder="请输入密码"
                    v-model="outside_pop.edit.pswd">
            <i slot="suffix"
               :class="icon"
               @click="showPass_edit"></i>
          </el-input>
        </div>

      </div>
      <div class="btn_box">
        <el-button @click="closed_edit_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="edit_user">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "outside_set",
  data () {
    return {
      outside_set: {
        switch: false
      },
      outside_list: {
        ip: [],
        url: [],
      },
      outside_pop: {
        add: {
          show: false,
          user: '',
          pswd: '',
        },
        edit: {
          show: false,
          id: '',
          user: '',
          pswd: '',
        }
      },
      user_data: {
        page: 1,
        rows: 10
      },
      user_list: {},
      hostip: '',
      icon: "el-input__icon el-icon-view",
      //用于改变Input类型
      passw_edit: "password",
      passw_add: "password",
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.check_passwd()
    this.get_switch()
    this.get_ip()
    this.get_user_list()
    this.get_list('1')
    this.get_list('2')
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
    // 获取列表
    get_list (type) {
      this.$axios.get('/yiiapi/linkage/list', {
        params: {
          type: type,
          page: 1,
          rows: 9999
        }
      })
        .then(response => {
          console.log(response);
          if (type == '1') {
            this.outside_list.ip = response.data.data.data
          }
          if (type == '2') {
            this.outside_list.url = response.data.data.data
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 获取开关状态
    get_switch () {
      this.$axios.get('/yiiapi/externalaccess/get-status')
        .then(response => {
          console.log(response);
          if (response.data.data.status == '0') {
            this.outside_set.switch = false
          } else {
            this.outside_set.switch = true
            console.log(12121);
          }
        })
        .catch(error => {
          console.log(error);
        })

    },
    // 设置开关
    set_switch () {
      var switch_status = 0
      if (this.outside_set.switch) {
        switch_status = 1
      } else {
        switch_status = 0
      }
      console.log(switch_status);
      this.$axios.put('/yiiapi/externalaccess/change-status', {
        status: switch_status
      })
        .then(response => {
          console.log(response.data);
          if (response.data.status == 0) {
            if (switch_status == 0) {
              this.$message(
                {
                  message: '关闭成功',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: '开启成功',
                  type: 'success',
                }
              );
            }

          }
          this.get_switch()
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 获取当前IP
    get_ip () {
      this.$axios.get('/yiiapi/linkage/get-hostip')
        .then(response => {
          console.log(response.data);
          this.hostip = response.data.data.url

        })
        .catch(error => {
          console.log(error);
        })

    },
    // 获取用户列表
    get_user_list () {
      this.$axios.get('/yiiapi/externalaccess/list', {
        params: {
          page: this.user_data.page,
          rows: this.user_data.rows
        }
      })
        .then(response => {
          console.log(response);
          this.user_list = response.data.data
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 添加外部访问用户
    add_box () {
      this.passw_add = "password";
      this.outside_pop.add.show = true
      this.outside_pop.add.user = ''
      this.outside_pop.add.pswd = ''
    },
    add_user () {
      if (this.outside_pop.add.user == '') {
        this.$message(
          {
            message: '请输入用户名',
            type: 'warning',
          }
        );
        return false
      }
      if (this.outside_pop.add.pswd == '') {
        this.$message(
          {
            message: '请输入密码',
            type: 'warning',
          }
        );
        return false
      }
      this.$axios.post('/yiiapi/externalaccess/add', {
        uname: this.outside_pop.add.user,
        passwd: this.outside_pop.add.pswd,
      })
        .then(response => {
          console.log(response);
          if (response.data.status == 1) {
            this.$message(
              {
                message: response.data.msg,
                type: 'error',
              }
            );
          } else if (response.data.status == 0) {
            this.get_user_list()
            this.outside_pop.add.show = false
            this.$message(
              {
                message: '添加账号成功',
                type: 'success',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })

    },
    // 编辑
    edit_box (item) {
      console.log(item);
      this.passw_edit = "password";
      this.outside_pop.edit.show = true
      var item_str = JSON.stringify(item)
      var item_obj = JSON.parse(item_str)
      this.outside_pop.edit.id = item_obj.id
      this.outside_pop.edit.user = item_obj.uname
      this.outside_pop.edit.pswd = item_obj.passwd
    },
    edit_user () {
      if (this.outside_pop.edit.pswd == '') {
        this.$message(
          {
            message: '请输入密码',
            type: 'warning',
          }
        );
        return false
      }
      this.$axios.post('/yiiapi/externalaccess/edit', {
        "uname": this.outside_pop.edit.user,
        "passwd": this.outside_pop.edit.pswd
      })
        .then(response => {
          console.log(response.data);
          if (response.data.status == 1) {
            this.$message(
              {
                message: response.data.msg,
                type: 'error',
              }
            );
          } else if (response.data.status == 0) {
            this.get_user_list()
            this.outside_pop.edit.show = false
            this.$message(
              {
                message: '修改密码成功',
                type: 'success',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })

    },
    //密码的隐藏和显示
    showPass_edit () {
      //点击图标是密码隐藏或显示
      if (this.passw_edit == "text") {
        this.passw_edit = "password";
        //更换图标
      } else {
        this.passw_edit = "text";
      };
    },
    //密码的隐藏和显示
    showPass_add () {
      //点击图标是密码隐藏或显示
      if (this.passw_add == "text") {
        this.passw_add = "password";
      } else {
        this.passw_add = "text";
      };
    },
    // 删除
    del_box (item) {
      console.log(this.item);
      this.$confirm('此操作删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/yiiapi/externalaccess/del', {
          data: {
            id: item.id
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.status == 0) {
              this.get_user_list();
              this.$message(
                {
                  message: '删除成功！',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: '删除失败！',
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
    },



    handleSelectionChange () { },
    alert_detail () { },

    // 分页
    handleSizeChange (val) {
      this.user_data.rows = val;
      this.user_data.page = 1
      this.get_user_list();
    },
    handleCurrentChange (val) {
      this.user_data.page = val
      this.get_user_list();
    },
    closed_add_box () {
      this.outside_pop.add.show = false
    },

    closed_edit_box () {
      this.outside_pop.edit.show = false

    },
  }
};
</script>

<style scoped lang="less">
#outside_set {
  text-align: left;
  .set_top {
    margin-top: 12px;
    border-bottom: 1px solid #ececec;
    .top_tips {
      margin: 17px 0 24px 0;
      font-size: 14px;
      color: #999999;
    }
    .malice_list {
      display: flex;
      margin-bottom: 36px;
      .item_title {
        font-family: PingFangMedium;
        font-size: 16px;
        color: #333333;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #ececec;
        padding: 0 24px;
      }
      .item_content {
        padding: 0 24px;
      }
      .item_list {
        padding: 0 24px;
      }
      .list_left {
        // width: 320px;
        margin-right: 36px;
        background: #f8f8f8;
        word-break: break-all;
        white-space: pre-wrap;
        word-wrap: break-word;
        padding-bottom: 16px;
      }
      .list_right {
        // width: 720px;
        padding-bottom: 16px;
        background: #f8f8f8;
        word-break: break-all;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
  .outside_table {
    padding-right: 24px;
  }
  .btn_i {
    width: 136px;
    height: 42px;
    padding: 0;
    background: #0070ff;
    color: #fff;
    margin: 24px 0;
  }
  .btn_edit {
    padding: 0;
    background: #5389e0;
    border-radius: 2px;
    width: 72px;
    height: 30px;
  }
  .pagination_box {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#outside_set {
  .add_box {
    .el-dialog {
      width: 440px;
      .content_item {
        margin-top: 24px;
      }
      .btn_box {
        margin-top: 24px;
      }
    }
  }
  .el-switch__core {
    width: 40px !important;
  }
}
</style>
