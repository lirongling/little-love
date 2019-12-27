<template>
  <div>
    <div class="contior">
      <div class="img">
        <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" >
      </div>
<!--      进度条百分百-->
      <div class="sore">
        <div class="sore-item" v-for="(item,index) in progress" :key="index">
          <div>{{item.name}}</div>

          <el-progress v-if="item.progress===1" :percentage="Number(item.progress*100)" status="success"></el-progress>
          <el-progress v-else :percentage="Number(item.progress*100)"></el-progress>
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
                progress: []
            }
        },
        methods: {
            getData() {
                // 获取进度条数据
                this.$axios
                    .req("/progress ")
                    .then(res => {
                        if (res.code === 0) {
                            this.progress = res.data
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        },
        mounted() {
            this.getData()
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
  .contior {
    width: 100%;
    .img{
      width: 90%;
      margin: 15px auto;

    }
    .img>img{
      width: 100%;
    }
    .sore-item{
      width: 90%;
      margin: 20px auto;
    }

  }
</style>
