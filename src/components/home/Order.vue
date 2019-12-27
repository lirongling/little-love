<template>
  <div>
   <div class="contior">
<!--     表头信息-->
     <div class="top flex">
        <div class="top-name">Order_No</div>
        <div class="top-price">Price</div>
        <div class="top-status">Status</div>
     </div>
<!--     循环出数组的每一项-->
     <div :class="{'li': num == index}" class="top flex" v-for="(item,index) in orderData.order" :key="index" @mouseenter="mouseinner(index)" @mouseleave="mouseout">
       <div class="top-name">{{item.num}}</div>
       <div class="top-price ">{{item.price | topData}}</div>
<!--       tag标签-->
       <div class="top-status">
         <el-tag v-if="item.status===1" type="success" plain>success</el-tag>
         <el-tag v-if="item.status===0" type="warning" plain>pending</el-tag>
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
                orderData:{
                    orderTitle:[],
                    order:[],
                },
                num:-1,

            }
        },
        methods: {
            getData() {
                // 获取表格信息
                this.$axios
                    .req("/orderData ")
                    .then(res => {
                      if (res.code===0) {
                          // 取出对象的key
                          this.orderData.orderTitle=Object.keys(res.data[0])
                          this.orderData.order=res.data;
                      }

                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 鼠标移入变色
            mouseinner(index){
                this.num=index
            },
            // 鼠标移除还原
            mouseout(){
                this.num=-1
            }
        },
        mounted() {
            this.getData()
        },
        created() {

        },
        filters: {
            // 获取到的数据转加上$
            topData(value) {
                return '$'+value
            }
        },
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
  .li{
    background: #a9bcc5 !important;
  }
.contior{
  width: 100%;
  padding: 10px;
  background: white;
  border-radius: 5px;
  .top{
    margin: 10px auto;
    width: 100%;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border-bottom: #bfc5cb solid 1px;
    color: #777b7f;
    border-radius: 5px;
    .top-name{
      width: 40%;

    }
    .top-price{
      width: 25%;
    }
    .top-status{
      width: 25%;
    }
  }
}
</style>
