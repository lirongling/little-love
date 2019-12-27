<template>
  <div class="look">
    <div class="container">
      <div class="container-center">
        <div class=" see-top container-top flex">
<!--          顶部按钮-->
          <el-button type="success" @click="return1">返回</el-button>
        </div>
<!--        文章详情-->
        <div class="see-container">
          <div class="title">{{ruleForm.title}}</div>
          <div class="abstract">摘要:<span class="abstract-text">{{ruleForm.abstract}}</span></div>
          <div class="author">发表者:<span class="author-text">{{ruleForm.author}}</span></div>
<!--          mavon查看器-->
          <mavon-editor
              :value="ruleForm.text"
              :subfield="false"
              :defaultOpen="'preview'"
              :toolbarsFlag="false"
              :editable="false"
              :scrollStyle="true"
              :ishljs="true"
          ></mavon-editor>
        </div>
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
                },
            }
        },
        methods: {
            // 根据ID获取文章详情
            getArticle() {
                this.$axios
                    .req("/article/article", {_id:this.$route.query.id})
                    .then(res => {
                        if (res.code === 200) {
                            this.ruleForm = res.data;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 返回按钮
            return1() {
                this.$router.history.go(-1)
            },
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

  .look {
    width: 100vm;
    height: 100%;
    justify-content: flex-start;
  }
  .container {
    padding-top: 20px;
    width: 95%;
    margin: 0 auto;}

  .container-center {

  }
  .see-top {
    padding: 30px;
  }

  .see-container {
    width: 90%;
    margin: 0 auto;
    height: 100px;
    text-align: center;

    .title {
      margin-top: -50px;
      font-size: 30px;
      font-weight: 700;
    }

    .abstract {
      margin-top: 30px;
      font-size: 22px;
      font-weight: 500;
      color: #454749;
      .abstract-text{
        margin-left: 10px;
        color: #636669;
      }

    }

    .author {
      margin: 20px 0 50px 0;
      font-size: 15px;
      font-weight: 300;
      color: #686b6e;
      .author-text{
        margin-left: 13px;
        color: #82868a;
      }
    }
  }
</style>
