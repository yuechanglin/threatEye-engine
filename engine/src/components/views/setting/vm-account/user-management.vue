<template>
  <div id="user_management"
       v-loading.fullscreen.lock="loading">
    <div class="user_title">
      <el-button type="primary"
                 class="btn_i"
                 @click="add_box">新增</el-button>
      <el-button type="primary"
                 class="btn_o"
                 @click="del_user">删除</el-button>
      <!-- <el-button type="primary"
                 class="btn_o"
                 @click="edit_pswd">修改密码</el-button> -->
    </div>
    <div class="user_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                border
                :data="user_list.data"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="alert_detail">
        <el-table-column type="selection"
                         align="center"
                         width="50">
        </el-table-column>
        <el-table-column label="序号"
                         align="center"
                         width="50"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{(user_data.page-1)*(user_data.rows) + scope.row.index_cn}}
          </template>
        </el-table-column>
        <el-table-column prop="username"
                         align="center"
                         label="用户名"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="department"
                         align="center"
                         label="部门"
                         width="120"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="email_addr"
                         align="center"
                         label="邮箱"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="role"
                         align="center"
                         label="角色"
                         width="120"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="creatorname"
                         align="center"
                         width="120"
                         label="创建人"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间"
                         width="180"
                         show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.updated_at*1000 |formatDate }}</template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="100">
          <template slot-scope="scope">
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='edit_box(scope.row)'>编辑</el-button>
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
    <!-- 新增 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="user_state.add">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加用户</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">用户名</span>
            <span class="red">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入用户名"
                    v-model="user_add.username"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">密码</span>
            <span class="red">*</span>
          </p>
          <el-input class="select_box"
                    :placeholder="user_data.placeholder"
                    v-model="user_add.password"
                    show-password>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">确认密码</span>
            <span class="red">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请确认密码"
                    v-model="user_add.Re_password"
                    show-password>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">邮箱</span>
            <span class="red">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入邮箱"
                    v-model="user_add.email_addr"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">手机号</span>
            <span class="red">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入手机号"
                    v-model="user_add.mobile"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">部门</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入部门"
                    v-model="user_add.department"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色</span>
            <span class="red">*</span>
          </p>
          <el-select class="select_box"
                     v-model="user_add.role"
                     placeholder="请选择角色">
            <el-option v-for="item in user_add.role_list"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_add_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="add_user">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="user_state.edit">
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
          </p>
          <el-input class="select_box"
                    :placeholder="user_data.placeholder"
                    v-model="user_edit.password"
                    show-password>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">确认密码</span>
          </p>
          <el-input class="select_box"
                    placeholder="请再次输入密码"
                    v-model="user_edit.Re_password"
                    show-password>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">邮箱</span>
            <span class="red">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入邮箱"
                    v-model="user_edit.email_addr"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">手机号</span>
            <span class="red">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入手机号"
                    v-model="user_edit.mobile"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">部门</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入部门"
                    v-model="user_edit.department"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色</span>
            <span class="red">*</span>
          </p>
          <el-select class="select_box"
                     v-model="user_edit.role"
                     placeholder="请选择角色">
            <el-option v-for="item in user_edit.role_list"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
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
import moment from 'moment'
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "user_management",
  data () {
    return {
      loading: false,
      user_list: {},
      user_data: {
        page: 1,
        rows: 10,
        placeholder: '',
        password: {}
      },
      user_state: {
        add: false,
        edit: false
      },
      user_add: {
        username: "",
        password: "",
        Re_password: "",
        department: "",
        mobile: "",
        email_addr: "",
        role: "",
        allow_ip: '',
        role_list: []
      },
      user_edit: {
        password: "",
        Re_password: "",
        department: "",
        mobile: "",
        email_addr: "",
        role: "",
        id: "",
        allow_ip: '',
        role_list: []
      },
      token_data: '',
      select_list: []
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
    this.role_list();
    this.get_menu()
    this.getPwdLength()
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
        })
    },
    // 修改密码
    edit_pswd () {
      this.$axios.get('/yiiapi/site/get-self-password-reset-token')
        .then(response => {
          let { status, data } = response.data;
          console.log(status);
          console.log(data.data.token);
          let token = data.data.token

          // site/reset-self-password
          this.$axios.post('/yiiapi/site/reset-self-password?token=' + token, {
            ResetPasswordForm: {
              password: "Hoohoolab*1234",
              mobile: "151111211111",
              mail_addr: "12312312@qq.com",
              department: '123'
            },
            old_password: "Hoohoolab*123"
          })
            .then(response => {
              let { status, data } = response.data;
              console.log(status);
              console.log(data);



            })
            .catch(error => {
              console.log(error);
            })





        })
        .catch(error => {
          console.log(error);
        })
    },
    get_menu () {
      this.$axios.get('/yiiapi/site/menu')
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 获取用户列表
    get_data () {
      this.loading = true
      this.$axios.get('/yiiapi/user/page', {
        params: {
          page: this.user_data.page,
          rows: this.user_data.rows,
        }
      })
        .then(response => {
          this.loading = false
          console.log(response);
          this.user_list = response.data.data
          this.user_list.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 获取角色列表
    role_list () {
      this.$axios.get('/yiiapi/user/role-list', {
        params: {
          page: 1,
          rows: 999,
        }
      })
        .then(response => {
          console.log(response);
          this.user_add.role_list = response.data.data.data
          this.user_edit.role_list = response.data.data.data
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 获取密码长度
    getPwdLength () {
      this.$axios.get('/yiiapi/site/get-passwd-length')
        .then(response => {
          console.log(response);
          this.user_data.password = response.data.data
          this.user_data.placeholder = '请输入包含大写、小写、数字和特殊字符其中三项,' + response.data.data.min_passwd_len + '-' + response.data.data.max_passwd_len + '位密码'
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 正则验证密码
    regex (password) {
      var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])');
      return reg.test(password)
    },
    // 添加用户
    add_user () {
      if (this.user_add.username == '') {
        this.$message(
          {
            message: '请输入用户名',
            type: 'warning',
          }
        );
        return false
      }
      if (this.user_add.password == '') {
        this.$message(
          {
            message: '请输入密码',
            type: 'warning',
          }
        );
        return false
      }
      if (this.user_add.password != this.user_add.Re_password) {
        this.$message(
          {
            message: '两次输入密码不一致',
            type: 'warning',
          }
        );
        return false
      }
      if (!this.regex(this.user_add.password)) {
        this.$message(
          {
            message: '密码必须同时包含大写、小写、数字和特殊字符其中三项',
            type: 'warning',
          }
        );
        return false
      }

      if (this.user_add.email_addr == '') {
        this.$message(
          {
            message: '请输入邮箱',
            type: 'warning',
          }
        );
        return false
      }
      var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!email_reg.test(this.user_add.email_addr)) {
        this.$message(
          {
            message: '邮箱格式错误',
            type: 'warning',
          }
        );
        return false
      }
      if (this.user_add.mobile == '') {
        this.$message(
          {
            message: '请输入手机号',
            type: 'warning',
          }
        );
        return false
      }
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.user_add.mobile)) {
        this.$message(
          {
            message: '手机号格式错误',
            type: 'warning',
          }
        );
        return false
      }
      if (this.user_add.role == '') {
        this.$message(
          {
            message: '请选择角色',
            type: 'warning',
          }
        );
        return false
      }
      this.$axios.post('/yiiapi/user/user-add', {
        username: this.user_add.username,
        password: this.user_add.password,
        role: this.user_add.role,
        department: this.user_add.department,
        allow_ip: this.user_add.allow_ip,
        mobile: this.user_add.mobile,
        email_addr: this.user_add.email_addr,
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
            this.get_data();
            this.user_state.add = false;
            this.$message(
              {
                message: '添加用户成功',
                type: 'success',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    add_box () {
      this.user_state.add = true;
      this.user_add.username = '';
      this.user_add.password = '';
      this.user_add.Re_password = '';
      this.user_add.department = '';
      this.user_add.mobile = '';
      this.user_add.email_addr = '';
      this.user_add.role = '';
      this.user_add.allow_ip = '';
      this.getPwdLength()
      this.role_list()
    },
    // 编辑用户
    edit_box (item) {
      this.getPwdLength()
      this.role_list()
      this.user_state.edit = true;
      console.log(item);
      var item_edit = JSON.stringify(item)
      this.user_edit.department = JSON.parse(item_edit).department
      this.user_edit.mobile = JSON.parse(item_edit).mobile
      this.user_edit.email_addr = JSON.parse(item_edit).email_addr
      this.user_edit.role = JSON.parse(item_edit).role
      this.user_edit.allow_ip = JSON.parse(item_edit).allow_ip
      this.user_edit.id = JSON.parse(item_edit).id
    },
    edit_user () {
      console.log(this.user_edit);
      if (this.user_edit.password != this.user_edit.Re_password) {
        this.$message(
          {
            message: '两次输入密码不一致',
            type: 'warning',
          }
        );
        return false
      }
      if (!this.regex(this.user_edit.password) && this.user_edit.password != '') {
        this.$message(
          {
            message: '密码必须同时包含大写、小写、数字和特殊字符其中三项',
            type: 'warning',
          }
        );
        return false
      }
      if (this.user_edit.email_addr == '') {
        this.$message(
          {
            message: '请输入邮箱',
            type: 'warning',
          }
        );
        return false
      }
      var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!email_reg.test(this.user_edit.email_addr)) {
        this.$message(
          {
            message: '邮箱格式错误',
            type: 'warning',
          }
        );
        return false
      }
      if (this.user_edit.mobile == '') {
        this.$message(
          {
            message: '请输入手机号',
            type: 'warning',
          }
        );
        return false
      }
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.user_edit.mobile)) {
        this.$message(
          {
            message: '手机号格式错误',
            type: 'warning',
          }
        );
        return false
      }
      if (this.user_edit.role == '') {
        this.$message(
          {
            message: '请选择角色',
            type: 'warning',
          }
        );
        return false
      }
      this.$axios.get('/yiiapi/user/get-password-reset-token', {
        params: {
          id: this.user_edit.id
        }
      })
        .then(response => {
          console.log(response.data);
          this.token_data = response.data.data
          localStorage.setItem("token", response.data.data.token);
          this.$axios.put('/yiiapi/user/reset-password?token=' + localStorage.getItem("token"), {
            ResetPasswordForm: {
              password: this.user_edit.password,
              allow_ip: this.user_edit.allow_ip,
              role: this.user_edit.role,
              email_addr: this.user_edit.email_addr,
              mobile: this.user_edit.mobile,
              department: this.user_edit.department,
            }
          })
            .then(response => {
              this.user_state.edit = false;
              if (response.data.status == 0) {
                this.get_data();
                this.$message({
                  message: '修改用户成功',
                  type: 'success'
                });
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
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 删除用户
    del_user () {
      console.log(this.select_list);
      if (this.select_list.length == 0) {
        this.$message(
          {
            message: '请选择需要删除的用户！',
            type: 'warning',
          }
        );
        return false
      }
      this.$confirm('此操作删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id_list = []
        this.select_list.forEach(element => {
          id_list.push(element.id)
        });
        this.$axios.delete('/yiiapi/user/user-del', {
          data: {
            id: id_list
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.status == 0) {
              this.get_data();
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
            this.$refs.multipleTable.clearSelection()
          })
          .catch(error => {
            console.log(error);
          })
      }).catch(() => {
        this.select_list = []
        this.$refs.multipleTable.clearSelection()
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 分页
    handleSizeChange (val) {
      this.user_data.rows = val;
      this.user_data.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.user_data.page = val
      this.get_data();
    },
    // 全选择
    handleSelectionChange (val) {
      this.select_list = val
    },
    alert_detail () { },
    closed_add_box () {
      this.user_state.add = false;
    },
    closed_edit_box () {
      this.user_state.edit = false;
    }
  },
  filters: {
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
};
</script>

<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#user_management {
  .el-dialog {
    width: 550px;
    .el-dialog__body {
      width: 550px;
      .content {
        padding: 24px 0;
        height: 600px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
          border-radius: 6px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 6px;
          background: #a8a8a8;
        }
        &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          border-radius: 6px;
          background: #f4f4f4;
        }
        .content_item {
          margin-bottom: 24px;
          .title {
            font-size: 12px;
            color: #999999;
          }
          .select_box {
            width: 100%;
            height: 38px;
            margin-top: 6px;
            .el-input__inner {
              background: #f8f8f8;
              border: 0;
            }
          }
        }
      }
    }
  }
}
</style>
<style scoped lang="less">
#user_management {
  padding-right: 24px;
  .red {
    color: #ff5f5c;
  }
  .user_title {
    margin-bottom: 24px;
    .btn_i {
      background: #0070ff;
      color: #fff;
      width: 148px;
      height: 42px;
    }

    .btn_o {
      background: #fff;
      border-color: #0070ff;
      color: #0070ff;
      width: 148px;
      height: 42px;
    }
  }
  .user_table {
    .btn_edit {
      padding: 0;
      background: #5389e0;
      border-radius: 2px;
      width: 72px;
      height: 30px;
    }
  }
  .pagination_box {
    margin-top: 24px;
    text-align: center;
  }
}
</style>

