<template>
  <div id="Nav"
       v-cloak>
    <el-row :gutter="0"
            class="nav_user">
      <el-col :span="3"
              style="width: 11.2%;">
        <div class="header-logo"
             align="left"
             @click="enter_home">
          <img class="e-image"
               :src="logoSrc">
        </div>
      </el-col>
      <el-col :span="12">
        <el-menu :default-active="$route.meta.rootAuth"
                 class="el-menu-demo"
                 mode="horizontal">
          <router-link class="item"
                       :to="item.children[0].path"
                       v-for="(item,index) in addRouters"
                       :key="item.meta.auth">
            <el-menu-item :index="String(item.meta.auth)">
              <i class="e-nav-icon"
                 :class="item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
      <el-col :span="9"
              style="width:38.3%;">
        <div class="header-basic"
             align="right">
          <el-badge class="item"
                    :value="news_count"
                    :max="99"
                    v-show="true">
            <img :src="messageSrc"
                 class="va-image"
                 @click.once="messageClick();">
          </el-badge>
          <el-dropdown class="avatar-container right-menu-item"
                       trigger="click">
            <div class="avatar-wrapper">
              <img class="user-avatar"
                   style="display: none;"
                   :src="avatarSrc">
              <label class="avatar-name">{{token}}</label>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown"
                              class="nav-dropdown-menu">
              <a target='_blank'
                 @click="modifyPassword()">
                <el-dropdown-item>
                  修改个人信息
                </el-dropdown-item>
              </a>
              <el-dropdown-item divided>
                <span @click="logout"
                      style="display:block;">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>

    <!-- 修改密码弹窗 -->
    <el-dialog class="pop_box_password"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="pass_state">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">修改个人信息</span>
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
                    show-password></el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">旧密码
              <span class="it_m">*</span>
            </span>
          </p>
          <el-input class="select_box"
                    placeholder="请再次输入密码"
                    v-model="user_edit.old_password"
                    show-password></el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">
              邮箱
              <span class="it_m">*</span>
            </span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入邮箱"
                    v-model="user_edit.email_addr"
                    clearable></el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">
              手机号
              <span class="it_m">*</span>
            </span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入手机号"
                    v-model="user_edit.mobile"
                    clearable></el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">部门</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入部门"
                    v-model="user_edit.department"
                    clearable></el-input>
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
import { mapState, mapGetters } from 'vuex';

import { getToken, setToken, removeToken } from "@/store/layout/cookie";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: 'Nav',
  data () {
    return {
      logoSrc: "data:image/png;base64,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",
      messageSrc: require('@/assets/images/layout/nav/message.png'),
      avatarSrc: require('@/assets/images/layout/nav/avatar.png'),
      pass_state: false,
      user_data: {
        page: 1,
        rows: 10,
        placeholder: '',
        password: {}
      },
      user_edit: {
        password: "",
        Re_password: "",
        old_password: "",
        department: "",
        mobile: "",
        email_addr: "",
        role: "",
        id: "",
        allow_ip: ''
      },
      news_count: 0
    };
  },
  computed: {
    ...mapState({
      token: state => state.layout.token
    }),
    ...mapGetters([
      'addRouters'
    ])
  },
  mounted () {
    this.get_news();

    this.timer = setInterval(() => {
      this.get_news();
    }, 5000);

    eventBus.$on('reset', () => {
      this.modifyPassword()
    })
  },
  methods: {
    /*login(){
      this.$router.push('/', () => {});
    },*/
    enter_home () {
      this.$router.push({ path: '/home/overview' });
    },
    // 正则验证密码
    regex (password) {
      var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])');
      return reg.test(password)
    },
    // 获取密码长度
    getPwdLength () {
      this.$axios.get('/yiiapi/site/get-passwd-length')
        .then(response => {
          this.user_data.password = response.data.data
          this.user_data.placeholder = '请输入包含大写、小写、数字和特殊字符其中三项,' + response.data.data.min_passwd_len + '-' + response.data.data.max_passwd_len + '位密码'
          //!@#QWEasd123 Lele#easy123 Lele@19930901
          this.$axios.get('/yiiapi/site/get-self-password-reset-token')
            .then(response => {
              let { status, msg, data } = response.data;
              if (status == 0) {
                // console.log(data.data)
                localStorage.setItem("token", data.data.token);
                let datas = data.data;
                this.user_edit.department = datas.department;
                this.user_edit.mobile = datas.mobile;
                this.user_edit.email_addr = datas.email_addr;
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
        })
        .catch(error => {
          console.log(error);
        })
    },

    //修改个人信息
    modifyPassword () {
      this.getPwdLength();
      this.pass_state = true;
    },

    closed_edit_box () {
      this.pass_state = false;
      this.user_edit = {
        password: "",
        Re_password: "",
        old_password: "",
        department: "",
        mobile: "",
        email_addr: "",
        role: "",
        id: "",
        allow_ip: ''
      };
    },
    edit_user () {
      if (this.user_edit.password != this.user_edit.Re_password) {
        this.$message(
          {
            message: '两次输入密码不一致',
            type: 'error',
          }
        );
        return false
      }
      if (!this.regex(this.user_edit.password) && this.user_edit.password != '') {
        this.$message(
          {
            message: '密码必须同时包含大写、小写、数字和特殊字符其中三项',
            type: 'error',
          }
        );
        return false
      }
      if (this.user_edit.old_password == '') {
        this.$message(
          {
            message: '旧密码不能为空',
            type: 'error',
          }
        );
        return false
      }
      if (this.user_edit.mobile == '') {
        this.$message(
          {
            message: '手机号不能为空',
            type: 'error',
          }
        );
        return false
      }
      if (this.user_edit.email_addr == '') {
        this.$message(
          {
            message: '邮箱不能为空',
            type: 'error',
          }
        );
        return false
      }
      this.$axios.put('/yiiapi/site/reset-self-password?token=' + localStorage.getItem("token"), {
        ResetPasswordForm: {
          password: this.user_edit.password,
          email_addr: this.user_edit.email_addr,
          mobile: this.user_edit.mobile,
          department: this.user_edit.department,
        },
        old_password: this.user_edit.old_password
      })
        .then(response => {
          this.pass_state = false;
          localStorage.removeItem("token");
          if (response.data.status == 0) {
            this.$message({
              message: '修改用户成功',
              type: 'success'
            });
            if (this.user_edit.password != '') {
              setTimeout(() => {
                removeToken();
                this.$axios.get('/yiiapi/site/logout')
                  .then(response => {
                    if (response.data.status == 0) {
                      console.log('退出');
                      location.reload();
                      //In order to re-instantiate the vue-router object to avoid bugs
                      this.$router.push('/login');
                    }
                  }).catch(error => {
                    console.log(error);
                  })
                // location.reload();
              }, 500);
            }

          } else {
            this.$message(
              {
                message: response.data.msg,
                type: 'error',
              }
            );
          }

          this.user_edit = {
            password: "",
            Re_password: "",
            old_password: "",
            department: "",
            mobile: "",
            email_addr: "",
            role: "",
            id: "",
            allow_ip: ''
          };
        })
        .catch(error => {
          console.log(error);
        })

    },
    //退出
    logout () {
      this.$store.dispatch('LogOut')
        .then((resp) => {
          //In order to re-instantiate the vue-router object to avoid bugs
          this.$message.success('退出登录成功');
          location.reload();
        }).catch(error => {
          this.$message.error('退出登录操作失败' + error);
        })
    },
    //通知点击事件
    messageClick () {
      let route = this.$route.path;
      if (route == '/message') {
        return false;
      } else {
        this.$router.push('/message')
      }
    },
    // 获取新消息
    get_news () {
      this.$axios.get('/yiiapi/news/count')
        .then((resp) => {
          let { status, data } = resp.data;
          let datas = data;
          this.news_count = datas.count
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  beforeDestroy () {
    clearInterval(this.timer); //关闭
  },
  destroyed () {
  //  console.log('33333');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#Nav {
  .nav_user {
    .header-logo {
      .e-image {
        margin: 9px 0;
        width: 152px;
        height: 42px;
        cursor: pointer;
      }
    }
    .el-col {
      .el-menu-demo {
        background-color: #2e3f60;
        display: flex;
        border-width: 0 !important;
        > a.item {
          flex: 1;
          text-decoration: none;
          max-width: 104px;
          .el-menu-item {
            color: #fff;
            height: 60px;
            line-height: 56px;
            font-size: 16px;
            text-align: center;
            font-family: PingFang;
            -webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
            transition: 0s height, 0s padding-top, 0s padding-bottom;
            i.e-nav-icon {
              margin-right: 4px;
              width: 18px;
              height: 18px;
              display: inline-block;
              background-repeat: no-repeat;
              vertical-align: middle;
              background-size: 16px;
              margin-top: 3px;
              &.e-nav-home {
                background-image: url('../../assets/images/layout/nav/main.png');
              }
              &.e-nav-handle {
                background-image: url('../../assets/images/layout/nav/handle.png');
              }
              &.e-nav-emerge {
                background-image: url('../../assets/images/layout/nav/emerge.png');
              }
              &.e-nav-invest {
                background-image: url('../../assets/images/layout/nav/invest.png');
              }
              &.e-nav-report {
                background-image: url('../../assets/images/layout/nav/report.png');
              }
              &.e-nav-system {
                background-image: url('../../assets/images/layout/nav/system.png');
              }
            }
          }
          .el-menu-item:hover,
          .el-menu-item:focus {
            background-color: #2e3f60;
          }
          .el-menu-item.is-active {
            border-width: 0;
            color: #fff;
            background-color: #5389e0;
          }
        }
      }
    }
    .header-basic {
      height: 60px;
      /*display: flex;*/
      text-align: right;
      .el-badge {
        display: inline-block;
        flex: 1;
        margin: 22px 0;
        .va-image {
          cursor: pointer;
          width: 20px;
          height: 20px;
        }
      }
      .avatar-container {
        padding: 0 15px;
        // min-width: 120px;
        // margin: 14px 0 14px 14px;
        .avatar-wrapper {
          line-height: 32px;
          color: #fff;
          cursor: pointer;
          outline: none;
          .user-avatar {
            padding: 0 5px;
            height: 32px;
          }
          .avatar-name {
            font-size: 14px;
            cursor: pointer;
            padding: 0 3px;
            font-family: 'PingFang';
          }
        }
      }
    }
  }
  /deep/ .el-dialog {
    width: 550px;
    .el-dialog__body {
      width: 550px;
      .content {
        padding: 24px 0;
        .content_item {
          margin-bottom: 24px;
          p {
            text-align: left;
          }
          .title {
            font-size: 12px;
            color: #999999;
            .it_m {
              color: red;
            }
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
<style lang="less">
.nav-dropdown-menu {
  top: 60px !important;
  font-family: 'PingFang';
  a {
    text-decoration: none;
  }
  .popper__arrow {
    left: 80px !important;
  }
}
#Nav {
  .pop_box_password {
    .el-dialog {
      background: #ffffff;
      border-radius: 4px;
      position: fixed;
      // top: 200px;
      left: 50%;
      transform: translateX(-50%);
      .el-dialog__header {
        display: none;
      }
      .el-dialog__body {
        padding: 30px;

        .closed_img {
          width: 46px;
          height: 46px;
          position: absolute;
          top: -18px;
          right: -18px;
          cursor: pointer;
        }

        .title {
          height: 24px;
          line-height: 24px;
          text-align: left;

          .title_name {
            font-size: 20px;
            color: #333333;
            line-height: 24px;
          }

          .mask {
            width: 24px;
            height: 0px;
            border-top: 0px;
            border-right: 2px solid transparent;
            border-bottom: 5px solid #0070ff;
            border-left: 2px solid transparent;
            transform: rotate3d(0, 0, 1, 90deg);
            display: inline-block;
            margin-right: -5px;
            margin-bottom: 4px;
            margin-left: -10px;
          }
        }

        .btn_box {
          height: 42px;
          text-align: center;

          .ok_btn {
            width: 136px;
            height: 42px;
            background: #0070ff;
            color: #fff;
          }

          .cancel_btn {
            width: 136px;
            height: 42px;
            border-color: #0070ff;
            background: #fff;
            color: #0070ff;
          }
        }

        .content_item {
          .title {
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
