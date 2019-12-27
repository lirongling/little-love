<template>
  <div id="home">
    <!--    顶部计数器-->
    <div class="top flex">
<!--      visits-->
      <div class="top-item flex">
        <div><img src="../../assets/images/people.svg"></div>
        <div>
          <div>New Visits</div>
          <div class="top-number">
            <countTo :startVal='0' :endVal='visits ' :duration='1000'></countTo>
          </div>
        </div>
      </div>
<!--      messages-->
      <div class="top-item flex">
        <div><img src="../../assets/images/news.svg"></div>
        <div>
          <div>Message</div>
          <div class="top-number">
            <countTo :startVal='0' :endVal='messages ' :duration='1000'></countTo>
          </div>
        </div>
      </div>
<!--      purchases-->
      <div class="top-item flex">
        <div><img src="../../assets/images/money.svg"></div>
        <div>
          <div>Purchases</div>
          <div class="top-number">
            <countTo :startVal='0' :endVal='purchases ' :duration='1000'></countTo>
          </div>
        </div>
      </div>
<!--      shopping-->
      <div class="top-item flex">
        <div><img src="../../assets/images/car.svg"></div>
        <div>
          <div>Shoppings</div>
          <div class="top-number">
            <countTo :startVal='0' :endVal='shopping ' :duration='1000'></countTo>
          </div>
        </div>
      </div>
    </div>
    <!--    折线图-->
    <div class="home-chat">
      <ve-line :data="homeChat" :settings="charSettings"></ve-line>
    </div>
    <div class="content flex">
<!--      雷达图-->
      <div class="content-item flex">
        <ve-radar :judge-width="true" width="90%" :data="radarChat" ></ve-radar>
      </div>
      <!--      饼图-->
      <div class="content-item flex">
        <ve-pie :judge-width="true" width="90%" :data="ringChat" :settings="ringSettings"></ve-pie>
      </div>
<!--柱状图-->
      <div class="content-item flex">
        <ve-histogram :judge-width="true" width="90%" :data="homeChat" ></ve-histogram>
      </div>
    </div>
    <div class="bottom flex">
      <Order class="order"></Order>
      <TodoList class="todo"></TodoList>
      <Progress class="progress"></Progress>
    </div>
  </div>

</template>

<script>
    // 引入计数器插件
    import countTo from "vue-count-to";
    import Order from '../home/Order'
    import TodoList from '../home/TodoList'
    import Progress from '../home/Progress'

    export default {
        name: "",
        components: {
            countTo,
            Order,
            TodoList,
            Progress
        },
        props: {},
        data() {
            return {
                visits: null,
                shopping: null,
                purchases: null,
                messages: null,
                homeChat: {
                    columns: [],
                    rows: [],
                },
                charSettings: {
                    metrics: ['expected', 'actual'],
                    // dimension:['expected','actual']
                },
                ringChat: {
                    columns: [],
                    rows: [],
                },
                ringSettings: {
                    roseType: 'radius'
                },
                radarChat: {
                    columns: [],
                    rows: [],
                },

            }
        },
        methods: {
            getData() {
                // 获取计数器数据
                this.$axios
                    .req("/homeData")
                    .then(res => {

                        if (res.code === 0) {
                            this.messages = res.data.messages;
                            this.purchases = res.data.purchases;
                            this.shopping = res.data.shopping;
                            this.visits = res.data.visits;



                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                // 获取折线图数据
                this.$axios
                    .req("/homeChat")
                    .then(res => {
                        if (res.code === 0) {
                            for (let key in res.data[0]) {
                                this.homeChat.columns.push(key)
                            }
                            this.homeChat.rows = res.data;
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });
                // 获取饼图数据
                this.$axios
                    .req("ringChat")
                    .then(res => {
                        for (let key in res.data[0]) {
                            this.ringChat.columns.push(key)
                        }
                        this.ringChat.rows = res.data;

                    })
                    .catch(err => {
                        console.log(err);
                    });
                // 获取雷达图数据
                this.$axios
                    .req("radarChat")
                    .then(res => {
                        if (res.code === 0) {
                            for (let key in res.data[0]) {
                                this.radarChat.columns.push(key)
                            }
                            this.radarChat.rows = res.data;
                        }
                        // console.log(res);
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
        filters: {
            // 获取到的数据转换成千分制
            topData(value) {
                return Number(value).toLocaleString()
            }
        },
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
  #home {
    width: 100vm;
    height: auto;
    background: #F0F2F5;
  }

  .top {
    padding-top: 40px;
    justify-content: space-around;

    .top-item {
      width: 20%;
      height: 100px;
      box-shadow: #5a6260 0px 0px 10px;
      justify-content: space-around;
      color: #bfc5cb;
      font-size: 16px;

      .top-number {
        margin-top: 10px;
        color: #212121;
        font-size: 18px;
        text-align: center;
      }
    }
  }

  .home-chat {
    margin-top: 20px;
  }

  .content {
    margin: 20px 0;
    justify-content: space-around;

    .content-item {
      width: 25%;
      height: 350px;
      background: white;
      border-radius: 10px;
      justify-content: center;
    }
  }
  .bottom{
    width: 100%;
    padding: 60px 0;
    margin: 0 auto;
    align-items: flex-start;
    justify-content: space-around;
    .order{
      width: 40%;
      height: auto;
    }
    .todo{
      width:20% ;
      height: auto;
    }
    .progress{
      width: 20%;
      height: auto;
      border-radius: 5px;
      background: white;
    }

  }

</style>
