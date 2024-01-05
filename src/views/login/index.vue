<template>
  <div class="login-container">
    <!-- 登录 -->
    <el-form v-show="isLogin" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">

      <div class="title-container">
        <h3 class="title">Vue Admin Template</h3>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="userName" v-model.trim="loginForm.userName" placeholder="Username" name="userName" type="text"
          tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model.trim="loginForm.password" :type="passwordType"
          placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="success" style="width:100%;margin-bottom:30px;"
        @click="handleLogin">登录</el-button>

      <div class="tips">
        <div>
          root：userName：root，password：root
        </div>
        <div>
          admin：userName：admin，password：admin
        </div>
        <div>
          editor：userName：editor，password：editor
        </div>
        <span style="float: right;"><el-link type="primary" @click="handleChange">注册</el-link></span>
      </div>

    </el-form>


    <!-- 注册 -->
    <el-form v-show="!isLogin" ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form"
      auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Vue Admin Template</h3>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="userName" v-model.trim="registerForm.userName" placeholder="Username" name="userName" type="text"
          tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model.trim="registerForm.password" :type="passwordType"
          placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click="handleLogin">注册</el-button>

      <div class="tips">
        <!-- <span style="margin-right:20px;">userName: admin</span>
        <span> password: any</span> -->
        <span style="float: right;"><el-link type="primary" @click="handleChange">登录</el-link></span>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    /* 校验用户名是否已存在 */
    const validateRegister = (rule, value, callback) => {
      if (!this.isLogin && value.length > 0) {
        this.$store.dispatch('user/userNameCheck', { userName: value }).then(res => {
          callback();
        }).catch(err => {
          callback(new Error(err.msg));
        })
      }
    };
    return {
      isLogin: true,
      loading: false,
      loginForm: {
        userName: 'admin',
        password: 'admin'
      },
      registerForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [
          // { required: true, trigger: 'blur', validator: validateUsername }
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: "长度在2到10个字符之间", trigger: "blur" },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '用户名请使用：中文、英文、数字、_，至少一种组成', trigger: 'blur' },
        ],
        password: [
          // { required: true, trigger: 'blur', validator: validatePassword }
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 18, message: "长度在4到18个字符之间", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9_]*$/, message: '密码请使用：字母、数字、_，至少一种组成', trigger: 'blur' },
        ]
      },
      registerRules: {
        userName: [
          // { required: true, trigger: 'blur', validator: validateUsername }
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: "长度在2到10个字符之间", trigger: "blur" },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '用户名请使用：中文、英文、数字、_，至少一种组成', trigger: 'blur' },
          { validator: validateRegister, trigger: 'blur' }
        ],
        password: [
          // { required: true, trigger: 'blur', validator: validatePassword }
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 18, message: "长度在4到18个字符之间", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9_]*$/, message: '密码请使用：字母、数字、_，至少一种组成', trigger: 'blur' },
        ]
      },
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleChange() {
      this.isLogin = !this.isLogin
      this.$refs[this.isLogin ? 'loginForm' : 'registerForm'].resetFields()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      if (this.isLogin) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then((res) => {
              if (res.code === 200) {
                this.$router.push({ path: this.redirect || '/' })
                this.$message({
                  type: 'success',
                  message: '登录成功'
                })
              }
              if (res.code === 0) {
                this.$message({
                  type: 'error',
                  message: res.msg
                })
              }
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/register', this.registerForm).then((res) => {
              if (res.code === 200) {
                this.$router.push(({ path: '/' }))
                this.$message({
                  type: 'success',
                  message: res.msg
                })
              }
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
