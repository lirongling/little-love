<template>
  <div  class="publish">
    <div v-if="this.$route.query._id" class="container">
      <div class="container-top flex">
        <el-button type="success" @click="return1">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
      </div>
      <div v-if="release1" class="container-center">
<!--        修改文章的form表单-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm">
          <div class="title___">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="文章摘要" prop="abstract">
              <el-input v-model="ruleForm.abstract"></el-input>
            </el-form-item>
          </div>
          <div class="flex fxk__">
            <el-form-item label="作者" prop="author">
              <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>

            <el-form-item label="类目" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择类目">
                <el-option label="Vue" value="Vue"></el-option>
                <el-option label="React" value="React"></el-option>
                <el-option label="Node.js" value="Node.js"></el-option>
                <el-option label="性能优化" value="性能优化"></el-option>
                <el-option label="JavaScript" value="JavaScript"></el-option>
                <el-option label="小程序" value="小程序"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源" prop="source">
              <el-select v-model="ruleForm.source" placeholder="请选择活动区域">
                <el-option label="原创" value="原创"></el-option>
                <el-option label="转载" value="转载"></el-option>
                <el-option label="与他人共创" value="与他人共创"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重要性" prop="star">
              <el-select v-model.number="ruleForm.star" placeholder="请选择重要性">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
<!--            时间选择-->
            <div class="time___">
              <span class="demonstration">请选择时间</span>
              <el-date-picker
                  v-model="ruleForm.date"
                  type="datetime"
                  placeholder="发布时间"
                  align="right"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
<!--          mavon编辑器-->
          <mavon-editor v-model="ruleForm.text"/>
          <div class="container-bottom flex">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        name: "",
        components: {},
        props: {},
        data() {
            return {
                ruleForm: {
                    title: '',
                    abstract: '',
                    author: '',
                    category: '',
                    source: '',
                    star: 0,
                    date: '',
                    text: '',
                    id:null


                },
                release1: true,
                // 限制不能选择将来的时间
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now()
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                // 定义输入框的规则
                rules: {
                    title: [
                        {required: true, message: '请输入文章摘要', trigger: 'blur'},
                        // {min: 2, message: '长度在 2个字符以上', trigger: 'blur'}
                    ],
                    abstract: [
                        {required: true, message: '请输入文章摘要', trigger: 'blur'}
                    ],
                    author: [{required: true, message: '请输入作者名称', trigger: 'blur'}],

                    category: [
                        {required: true, message: '请选择类目', trigger: 'change'}
                    ],
                    source: [
                        {required: true, message: '请选择来源', trigger: 'change'}
                    ],
                    star: [
                        {required: true, message: '请选择重要性', trigger: 'change'}
                    ],
                    date: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    text: [{required: true, message: '请输入详细内容', trigger: 'blur'}]
                }
            }
        },
        methods: {

            release(flage) {
                this.release1 = flage
                console.log(this.release1);
            },
            // 返回按钮
            return1() {
                this.$router.history.go(-1)
            },
            // 提交修改
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否确认修改?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.getData()


                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改'
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 请求接口修改文章
            getData() {
                console.log(this.ruleForm);
                this.ruleForm.id=this.$route.query._id
                this.$axios
                    .req("/article/update ", this.ruleForm)
                    .then(res => {
                        if (res.success === true) {
                            this.$router.push('/published')
                            this.$message({
                                message: '恭喜你，文章修改成功',
                                type: 'success'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 根据ID获取文章详情
            getArticle() {
                console.log(this.$route.query._id);
                this.$axios
                    .req("/article/article", {_id: this.$route.query._id})
                    .then(res => {
                        if (res.code === 200) {
                            this.ruleForm = res.data;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        mounted() {
            this.getArticle()
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
  .publish {
    width: 100vm;
    height: 100%;
    justify-content: flex-start;
  }

  .container {
    padding-top: 20px;
    width: 95%;
    margin: 0 auto;

    .container-top {
      height: 60px;
      justify-content: space-between;

    }

    .container-center {
      margin-top: 20px;
    }

    .container-bottom {
      justify-content: center;
      margin-top: 50px;

    }
  }

</style>
