<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <el-button type="primary">按钮</el-button>
  </div>
</template>

<script>



export default {
  name: 'home',
  components: {

  },
  methods: {
    getData () {
      this.$axios.req('/api/movie/top250').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    let time1 = '2019-12-08T06:23:17.931Z'
    // format是格式化是时间
    let time2 = this.$dayjs(time1).format('YYYY-MM-DD hh:mm:ss')
    // valueOf是转换成时间戳
    let time3 = this.$dayjs(time1).valueOf()
    console.log(time2)
    console.log(time3)
    this.getData()
  }
}
</script>
