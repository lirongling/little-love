<template>

  <div id="login">
    {{activeName}}
    <div class="main-contior flex">
      <div class="contior">
        <div class="title">
          欢迎来到小爱后台管理系统
        </div>
        <div class="main flex">
<!--          顶部tab切换-->
          <el-tabs v-model="activeName" @tab-click="handleClick" class="main-contior">
            <el-tab-pane label="登录" name="login" class="flex logincom">
              <Login></Login>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register" class="flex logincom">
              <Register :activeName="activeName" @send="send"></Register>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
    import Login from "../login/LoginCom";
    import Register from "../login/RegisterCom";

    export default {
        name: "",
        components: {
            Login,
            Register
        },
        props: {},
        data() {
            return {
                activeName: 'login'
            }
        },
        methods: {
            // tab切换的监听
            handleClick(tab, event) {
            },
            // Register组件触发的操作
            send(data){
                console.log(data);
                this.activeName=data;
            },

        },
        mounted() {

        },
        created() {
            // if (JSON.parse(localStorage.getItem("activeName"))) {
            //     this.activeName = JSON.parse(localStorage.getItem("activeName"));
            // }

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
  .main-contior {
    width: 100vm;
    height: 100vh;
    justify-content: center;
    /*background-image: url("http://img0.imgtn.bdimg.com/it/u=1934837543,1498700443&fm=26&gp=0.jpg") ;*/
    background-size: cover;
  }

  .contior {
    width: 600px;
    height: 400px;
    box-shadow: #5a6260 0px 0px 10px;
    border-radius: 10px;

    .title {
      text-align: center;
      margin-top: 20px;
      font-size: 22px;
      font-weight: 700;
    }

    .main {
      width: 90%;
      height: 300px;
      margin: 40px auto;

      border-radius: 10px;

      .main-contior {
        width: 100%;
        height: 300px;

        .logincom {
          justify-content: center;
        }
      }
    }
  }
</style>
