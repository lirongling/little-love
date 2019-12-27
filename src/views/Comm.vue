<template>
  <div id="comm">
    <div class="top flex">
      <div class="top-left flex">欢迎{{this.loginMsg.username}}来到小艾后台管理系统</div>
      <div class="top-left flex">{{nowTime}}亲爱的{{loginMsg.username}}<span class="login-time">登录时间:{{loginMsg.date}}</span>
      </div>
    </div>
    <div class="main flex">
      <div class="main-left flex">
        <el-menu
            :default-active="$route.path"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <div v-for="(item,index) in menus" :key="index" class="menu-item">
              <el-menu-item :index="item.path" @click="clickActive(item.path)">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
          </div>
        </el-menu>
      </div>
      <div class="main-right">
        <router-view class="view"></router-view>
      </div>
    </div>
<ReturnTop></ReturnTop>
  </div>

</template>

<script>
    import ReturnTop from '../components/ReturnTop'
    export default {
        name: "",
        components: {
            ReturnTop
        },
        props: {},
        data() {
            return {
                loginMsg: {},
                loginTime: '',

                menus: [
                    {
                        name: '首页',
                        icon: 'el-icon-location',
                        path:'/'
                    },
                    {
                        name: '已发布',
                        icon: 'el-icon-menu',
                        path:'/published'
                    },
                    {
                        name: '统计',
                        icon: 'el-icon-menu',
                        path:'/statistics'
                    },
                    {
                        name: '发表文章',
                        icon: 'el-icon-notebook-2',
                        path:'/publish'
                    },
                    {
                        name: '标签页',
                        icon: 'el-icon-connection',
                        path:'/label'
                    },
                    {
                        name: '导出Excel',
                        icon: 'el-icon-wallet',
                        path:'/export'
                    },
                    {
                        name: '图片上传',
                        icon: 'el-icon-upload',
                        path:'/upload'
                    },
                    {
                        name: '退出系统',
                        icon: 'el-icon-delete-solid',
                        path:'/quit'
                    },

                ]


            }
        },
        methods: {
            clickActive(path){
               if (this.$route.path!==path) {
                   this.$router.push(path)
               }


            }
        },
        mounted() {
            this.loginMsg = JSON.parse(localStorage.getItem('loginMsg'))
        },
        created() {

        },
        filters: {},
        computed: {
            nowTime() {
                let time = new Date();
                let time1 = this.$dayjs(time).format(' HH')
                if (6 <= time1 && time1 < 9)
                    return "早上好"
                else if (9 <= time1 && time1 < 11)
                    return "上午好"
                else if (11 <= time1 && time1 < 2)
                    return "中午好"
                else if (2 <= time1 && time1 < 6)
                    return "下午好"
                else if (6 <= time1 && time1 < 12)
                    return "晚上好"
                else if (12 <= time1 && time1 < 6)
                    return "凌晨好"
            }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
  #comm{
    width: 100vm;
    height: 100vh;
  }
  .top {
    background: #2E5E85;
    width: 100%;
    height: 10%;
    position: fixed;
    top: 0;
    z-index: 1000;

    .top-left {
      width: 500px;
      height: 100%;
      line-height: 60px;
      text-align: center;
      font-size: 18px;
      color: white;
      justify-content: center;

      .login-time {
        margin-left: 5px;
      }
    }
  }

  .main {
    width: 100vm;
    height: 90%;

    .main-left{
      width: 7.68%;
      height: 90%;
      background: #545C64;
      position: fixed;
      top: 10%;
      .submenu{
        margin: 20px 0;
      }
    }
    .main-right{
      width: 100%;
      margin-left: 7.68%;
      margin-top: 4.5%;
      background: #F0F2F5;
      height: 90vh;
    }
  }
  .view{
    width: 100%;
    height: 100%;
  }
</style>
