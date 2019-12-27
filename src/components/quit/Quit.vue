<template>
  <div class="flex quit">
    <div class="container ">
      <div class="title flex">期待您的下次登录</div>
      <div class="bt flex">
        <el-button type="success" @click="excit">退出登录</el-button>
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
            return {}
        },
        methods: {
            // 清空localStorage和Vuex的登录信息 跳转到登录界面
            excit(){
                this.$router.push('/login')
                this.$store.state.loginMsg = null
                localStorage.removeItem("loginMsg");
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
  .quit {
    justify-content: center;
  }
  .container>div{
    justify-content: center;
  }
  .container {
    .title {
      font-size: 28px;
      font-weight: 700;
    }
    .bt{
      margin-top: 100px;
    }
  }
</style>
