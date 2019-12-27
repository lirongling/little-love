<template>
  <div>
    <div class="container">
<!--      顶部全选按钮和标题-->
      <div class="top">
        <div class="top-left iconfont icon-xiajiantou" @click="checkAll" :checked="checkedAll"></div>
        <div class="top-right">Todo List</div>
      </div>
<!--      分割线-->
      <div class="split"></div>
      <div class="middle">
<!--        循环出每一项-->
        <div v-if="this.list.length!==0">
          <div  class="middle-item" v-for="(item,index) in list" :key="index" :class="{'content': contentIndex===index}" @mouseenter="mouseenter(index)" >
            <div class="middle-left" @click="isCheck(index)">
              <span></span>
              <span class="iconfont icon-dui" v-show="item.checked" id="item"></span>
              <label for="item">{{item.name}}</label>
            </div>
            <div  :class="{'bt':contentIndex===index}" class="middle-right iconfont icon-cuowu" @click="remove(item)"></div>
          </div>
        </div>
        <div v-else>暂无数据</div>
      </div>
      <div class="split"></div>
<!--      底部按钮-->
      <div class="bottom">
        <div>{{noSelec}}items left</div>
        <div @click="shaw(1)" :class="{'btcolor':btdiv===1}">All</div>
        <div @click="shaw(2)" :class="{'btcolor':btdiv===2}">Active</div>
        <div @click="shaw(3)" :class="{'btcolor':btdiv===3}">Competed</div>
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
                list: [],
                contentIndex:-1,
                checkedAll:false,
                newArr:[],
                btdiv:1,
            }
        },
        methods: {
            // 单选
            isCheck(index){
                this.list[index].checked=!this.list[index].checked
                this.checkedAll=this.list.every(item=>{
                    return item.checked
                })
                this.shaw(this.btdiv)
            },
            // 鼠标移入
            mouseenter(index){
                this.contentIndex=index
            },
            // 全选按钮
            checkAll(){
                if (this.btdiv===1) {
                    this.checkedAll=!this.checkedAll
                    this.list.map(item=>{
                        item.checked=this.checkedAll
                    })
                }
            },
            // 删除按钮
            remove(item0){
                this.list = this.list.filter((item) => {
                    return item !== item0
                })
                this.newArr = this.newArr.filter((item) => {
                    return item !== item0
                })
            },
            // 底部按钮
            shaw(a){
                this.btdiv=a;
                if (a===1){
                    this.list=this.newArr;
                } else if(a===2){
                    this.list=this.newArr.filter(item=>{
                        return !item.checked

                    })
                }else if(a===3){
                    this.list=this.newArr.filter(item=>{
                        return item.checked

                    })
                }
            },
            getData() {
                // 获取数据
                this.$axios
                    .req("/todoList ")
                    .then(res => {
                        if (res.code === 0) {
                            this.list = res.data
                            this.newArr=this.list
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        },
        mounted() {
            this.getData();

        },
        created() {

        },
        filters: {},
        computed: {
            // 过滤出未完成的项
            noSelec(){
                let arr=this.newArr.filter(item=>{
                    return !item.checked
                })
                return arr.length
            }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped >
  @import "//at.alicdn.com/t/font_1553988_m7fx6x2oq6.css";
  .content:hover{
    background: #f7f4e1;
  }
  .middle-item:hover>.bt{
    display: block!important;

  }
  .container {
    width: 350px;
    height: 500px;
    margin: 0 auto;

    border-radius: 5px;
    background: white;

  }
  .top{
    width: 90%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
  .top-left{
    font-size: 20px;
    height: 20px;
    width: 20px;
    color: black;
  }
  .split{
    width: 100%;
    height: 1px;
    background: #686868;
    margin: 12px auto;
  }
  .middle{
    height: 330px;
    overflow: auto;
  }
  .middle-item{
    width: 90%;
    height: 34px;
    align-items: center;
    margin: 5px auto;
    display: flex;
    justify-content: space-between;
  }
  .middle-left{
    width: 250px;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
  }
  .middle-left>span:nth-child(1){
    display: inline-block;
    width: 18px;
    height:18px;
    margin-right: 10px;
    border-radius: 50%;
    border: #c5c5c5 solid 1px;
  }
  .middle-left>span:nth-child(2){
    position: absolute;
    font-size: 18px;
    margin-left: 1px;
  }
  .middle-right{
    display: none;
  }
  .bottom{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;

  }
  .bottom>div{
    font-size: 12px;
    width: 63px;
    text-align: center;
    line-height: 20px;
    border-radius: 5px;
  }
  input{
    border-radius: 50%;
  }
  .btcolor{
    background: #e3e3e3;
  }

</style>
