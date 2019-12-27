<template>
  <div>
    {{activeName}}
<!--   form表单-->
    <div class="input___">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="请输入用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
<!--按钮-->
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
    export default {
        name: "",
        components: {},
        props: {
            activeName:{
                type:String,
                default:''
            }
        },
        data() {
            // 自定义验证规则
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
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    this.ruleForm.checkPass = '';
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                ruleForm: {
                    pass: '',
                    username: '',
                    checkPass: '',
                },
                activeName0:'login',
                message: null,
                code: null,
                // 定义验证
                rules: {
                    username: [
                        {validator: validateName, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'},
                        {min: 6, message: "密码必须大于六位", trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            };
        },

        methods: {
            // 获取注册接口(post)
            getData() {
                this.$axios
                    .req("user/register", {username: this.ruleForm.username, password: this.ruleForm.pass})
                    .then(res => {
                        this.code = res.code;
                        this.message = res.message;
                        // 注册成功
                        if (this.code === 200) {
                            this.$message({
                                type: 'success',
                                message: this.message
                            });
                            // 事件分发修改父组件的值
                            this.$emit('send', this.activeName0)
                            // 用户名已存在
                        } else if (this.code === 1) {
                            this.ruleForm = {};
                            this.$message({
                                type: 'warning ',
                                message: this.message
                            })
                        }else{
                            this.$message({
                                type: 'warning ',
                                message: '未知错误'
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否注册?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.getData();


                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消注册'
                            });
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        },
        mounted() {

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

</style>
