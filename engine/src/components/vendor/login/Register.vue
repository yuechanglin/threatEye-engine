<template>
  <div id="UserRegister">

    <el-form class="login-form"
             status-icon
             :rules="registerRules"
             ref="registerForm"
             :model="registerForm"
             label-width="0">
      <!--用户名-->
      <el-form-item prop="username">
        <label class="view-label">账户名称</label>
        <el-input class="view-input"
                  @keyup.enter.native="handleLogin"
                  v-model="registerForm.username"
                  auto-complete="off"
                  placeholder="请输入用户名">
          <i slot="prefix"
             class="icon-yonghu"></i>
          <div slot="prefix"
               class="d-split"></div>
        </el-input>
      </el-form-item>
      <!--密码-->
      <el-form-item prop="password">
        <label class="view-label">用户密码</label>
        <el-input class="view-input"
                  @keyup.enter.native="handleLogin"
                  :type="passwordType"
                  v-model="registerForm.password"
                  auto-complete="off"
                  placeholder="请输入密码">
          <i class="el-icon-view el-input__icon"
             slot="suffix"
             @click="showPassword"></i>
          <i slot="prefix"
             class="icon-mima"></i>
          <div slot="prefix"
               class="d-split"></div>
        </el-input>
      </el-form-item>

      <!--确认密码-->
      <el-form-item prop="repassword">
        <label class="view-label">密码确认</label>
        <el-input class="view-input"
                  @keyup.enter.native="handleLogin"
                  :type="passwordType"
                  v-model="registerForm.repassword"
                  auto-complete="off"
                  placeholder="请确认密码">
          <i class="el-icon-view el-input__icon"
             slot="suffix"
             @click="showPassword"></i>
          <i slot="prefix"
             class="icon-mima"></i>
          <div slot="prefix"
               class="d-split"></div>
        </el-input>
      </el-form-item>

      <!--登录按钮-->
      <el-form-item>
        <el-button type="primary"
                   @click.native.prevent="handleLogin"
                   class="login-submit">注册管理员</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { isvalidUsername, isvalidPassword } from '@/assets/js/validate'
export default {
  name: 'UserRegister',
  data () {
    const validatePassword = (rule, value, callback) => {
      /*if (!isvalidPassword(value)) {
        callback(new Error('密码不正确，请重新输入'))
      } else {
        callback()
      }*/
      var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])');
      if(!reg.test(value)){
        callback(new Error('密码包含大写、小写、数字和特殊字符其中三项'))
      }else {
        callback();
      }
    }
    const validateRePassword = (rule, value, callback) => {
      console.log(this.registerForm.password)
      if (value != this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback();
      }
    }
    return {
      registerForm: {
        username: '',  //admin
        password: '', //Hoohoolab*123
        repassword:'',
        // password: '!@#QWEasd123'
      },
      registerRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          /*{ min: 2, max: 16, message: '用户名长度为2~16个字符', trigger: 'blur' },*/
          /*{ required: true, trigger: 'blur', validator: validateUsername }*/
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 8, max: 30, message: '密码长度为8-30位', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        repassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          /*{ min: 6, message: '密码长度最少为6位', trigger: 'blur' },*/
          { required: true, trigger: 'blur', validator: validateRePassword }
        ]
      },
      passwordType: 'password'
    }
  },

  methods: {
    showPassword () {
      this.passwordType === '' ?
        (this.passwordType = 'password') :
        (this.passwordType = '');
    },
    handleLogin () {

      console.log('注册')
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.registerForm)
          .then((resp) => {
            //返回成功跳转
            if (resp[0]) {
              this.$message.success('注册管理员成功，欢迎首次登录！');
              this.$router.push({path:'/system/licence'});//登录成功之后重定向到首页
              //失败
            } else {
              this.$message.error(resp[1]);
            }
          }).catch(err => {
            this.$message.error(err); //登录失败提示错误
          });
      }
      })
    }
  }
}
</script>
<style scoped lang="less">
#UserRegister {
  /deep/
  .el-form {
    .el-form-item {
      margin-top: 20px;
      margin-bottom: 0;
      .el-form-item__content {
        line-height: 1;
        .view-label {
          font-family: PingFang;
          font-size: 14px;
          color: #bbbbbb;
          line-height: 30px;
        }
        .view-input {
          position: relative;
          .el-input__inner {
            border: 1px solid #bbbbbb;
            background-color: transparent;
            color: #bbbbbb;
            height: 48px;
            padding-left: 45px;
          }
          .d-split {
            position: absolute;
            top: 14px;
            left: 30px;
            height: 20px;
            width: 2px;
            background: #bbb;
          }
          .el-input__prefix {
            i {
              display: block;
              height: 48px;
              width: 25px;
              text-align: center;
              -webkit-transition: all 0.3s;
              transition: all 0.3s;
              /*line-height: 40px;*/
              background-position: 4px 15px;
              background-repeat: no-repeat;
              background-size: 16px;
            }
            i.icon-yonghu {
              background-image: url('../../../assets/images/login/username.png');
            }
            i.icon-mima {
              background-image: url('../../../assets/images/login/password.png');
            }
          }
        }
        .login-submit {
          background: #0070ff;
          width: 100%;
          border-color: #0070ff;
          margin: 20px 0 30px;
          height: 48px;
        }
      }
    }
  }
}
</style>
