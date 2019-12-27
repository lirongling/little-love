<template>
  <div>
    <div class="input___">
<!--      form表单-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="请输入用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="pass">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入验证码" prop="code">
          <div class="input1__">
            <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
            <span class="code" @click="changeCode"><span v-html="code"></span></span>
          </div>

        </el-form-item>
<!--表单按钮-->
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
    export default {
        name: "",
        components: {},
        props: {},
        data() {
            // form表单自定义验证规则
            var validateName = (rule, value, callback) => {
                let a = /^[a-zA-Z0-9_-]{4,16}$/;
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (a.test(value)) {
                    callback(new Error('不能有中文'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    // if (this.ruleForm.pass !== '') {
                    //     this.$refs.ruleForm.validateField('checkPass');
                    // }
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    // if (this.ruleForm.code !== '') {
                    //     this.$refs.ruleForm.validateField('checkPass');
                    // }
                    callback();
                }
            };

            return {
                code: '',
                message: '',
                usercode: '',
                ruleForm: {
                    password: '',
                    username: '',
                    code: '',
                },
                // form表单验证的定义
                rules: {
                    username: [
                        {validator: validateName, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'},
                        {min: 6, message: "密码必须大于六位", trigger: 'blur'}
                    ],
                    code: [
                        {validator: validateCode, trigger: 'blur'}
                    ],

                }
            };
        },


        methods: {
            // 点击切换图片验证码
            changeCode() {
                this.getCode()
            },
            // 请求验证码
            getCode() {
                this.$axios
                    .req("captcha")
                    .then(res => {
                        this.code = res;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 请求数据验证用户信息
            getUser() {
                this.$axios
                    .req("user/login", this.ruleForm)
                    .then(res => {
                        console.log(res);
                        this.usercode = res.code;
                        this.message = res.message;
                        if (this.usercode === 200) {
                            // 将返回的时间格式化
                            let logintime=this.$dayjs(res.data[0].date).format('YYYY年MM月DD日 hh:mm:ss')
                            let a = {
                                username: this.ruleForm.username,
                                password: this.ruleForm.password,
                                date:logintime
                            };
                            // 将登陆信息储存到localStorage上
                            this.$store.state.loginMsg = a
                            localStorage.setItem("loginMsg", JSON.stringify(a));
                            this.$message({
                                type: 'success',
                                message: this.message
                            });
                            this.$router.push('/')
                            // 用户名或密码错误
                        } else if (this.usercode === 500) {
                            this.ruleForm = {}
                            this.getCode();
                            this.$message({
                                type: 'error',
                                message: this.message
                            });
                        } else if (this.usercode === 1) {
                            this.getCode()
                            this.ruleForm.code = ''
                            this.$message({
                                type: 'warning',
                                message: this.message
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 提交登录信息
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getUser()

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 重置按钮
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        },
        mounted() {
            this.getCode();
        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
  .code {
    width: 150px;
    height: 50px;
    display: block;
    position: absolute;
    right: 0;
    top: -10px;
  }
</style>
