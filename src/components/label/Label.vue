<template>
  <div class="label">
    <div class="container">
<!--      tabs切换-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
<!--        未读-->
        <el-tab-pane :label="'未读消息'+(unread.length)" name="first">
          <div class="content">
<!--            无数据-->
            <div v-if="unread.length===0">暂无数据</div>
<!--            有数据-->
            <div v-else v-for="(item,index) in unread" :key="index" class="content-item "
                 :class="{'li': num == index}" @mouseenter="mouseinner(index)" @mouseleave="mouseout">
              <div class="flex ">
                <div>
                  <span v-if="item.type===1" class="system">[系统通知]</span>
                  {{item.text}}
                </div>
                <div>{{item.time}}
                  <el-button @click="clickItem(1,item)">标为已读</el-button>
                </div>
              </div>
              <div class="content-top">
                <el-divider></el-divider>
              </div>
            </div>
            <div class="btn flex">
            <el-button  v-if="unread.length!==0" type="primary" @click="clickAll(1)">全部标为已读</el-button>
            </div>
          </div>

        </el-tab-pane>
<!--        已读-->
        <el-tab-pane :label="'已读消息'+(read.length)" name="second">
          <div class="content">
            <div v-if="read.length===0">暂无数据</div>
            <div v-else v-for="(item,index) in read" :key="index" class="content-item "
                 :class="{'li': num == index}" @mouseenter="mouseinner(index)" @mouseleave="mouseout">
              <div class="flex ">
                <div>
                  <span v-if="item.type===1" class="system">[系统通知]</span>
                  {{item.text}}
                </div>
                <div>{{item.time}}
                  <el-button @click="clickItem(1,item)">标为已读</el-button>
                </div>
              </div>
              <div class="content-top">
                <el-divider></el-divider>
              </div>
            </div>
            <div class="btn flex">
              <el-button  v-if="read.length!==0" type="warning" @click="clickAll(2)">全部删除</el-button>
            </div>
          </div>
        </el-tab-pane>
<!--        回收站-->
        <el-tab-pane :label="'回收站'+(recovery.length)" name="third">
          <div class="content">
            <div v-if="recovery.length===0">暂无数据</div>
            <div v-else v-for="(item,index) in recovery" :key="index" class="content-item "
                 :class="{'li': num == index}" @mouseenter="mouseinner(index)" @mouseleave="mouseout">
              <div class="flex ">
                <div>
                  <span v-if="item.type===1" class="system">[系统通知]</span>
                  {{item.text}}
                </div>
                <div>{{item.time}}
                  <el-button @click="clickItem(1,item)">标为已读</el-button>
                </div>
              </div>
              <div class="content-top">
                <el-divider></el-divider>
              </div>
            </div>
            <div class="btn flex">
              <el-button  v-if="recovery.length!==0" type="info" @click="clickAll(3)">还原消息</el-button>
            </div>

          </div>
        </el-tab-pane>
      </el-tabs>
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
                activeName: 'second',
                num: -1,
                labelData: [
                    {
                        tate: 1,
                        type: 1,
                        text: '今晚八点研发三开会',
                        time: '2019-08-19 20:00:00'

                    },
                    {
                        tate: 1,
                        type: 0,
                        text: '明日双十一,记得抢购',
                        time: '2019-11-10 20:00:00'

                    },
                    {
                        tate: 1,
                        type: 0,
                        text: '每日彩票',
                        time: '2019-11-10 20:00:00'

                    },
                    {
                        tate: 2,
                        type: 1,
                        text: '明天可能突发地震',
                        time: '2019-11-10 20:00:00'

                    },
                    {
                        tate: 3,
                        type: 0,
                        text: '明天会下雨',
                        time: '2019-11-10 20:00:00'

                    },
                ],
                unread1: [],


            }
        },
        methods: {
            // tabs切换的监听
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            // 鼠标移入添加类名
            mouseinner(index) {
                this.num = index
            },
            // 鼠标移出
            mouseout() {
                this.num = -1
            },
            // 全部选中
            clickAll(index) {
                if (index === 1) {
                    this.labelData.map(item => {
                        item.tate = 2
                    })
                } else if (index === 2) {
                    this.labelData.map(item => {
                        item.tate = 3
                    })
                } else if (index === 3) {
                    this.labelData.map(item => {
                        item.tate = 2
                    })
                }
            },
            // 单个选中
            clickItem(index, item) {
                if (index === 1) {
                    item.tate = 2
                } else if (index === 2) {
                    item.tate = 3
                } else if (index === 3) {
                    item.tate = 2
                }
            }

        },
        mounted() {


        },
        created() {

        },
        filters: {},
        computed: {
            // 取出未读
            unread() {
                return this.labelData.filter(item => {
                    return item.tate === 1
                })
            },
            // 取出已读
            read() {
                return this.labelData.filter(item => {
                    return item.tate === 2
                })
            },
            // 取出回收站
            recovery() {
                return this.labelData.filter(item => {
                    return item.tate === 3
                })
            },
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
  .li {
    background: #f8fafe !important;
  }

  .label {
    width: 100vm;
    height: 100%;
    justify-content: flex-start;

    .container {
      width: 90%;
      margin: 0 auto;
      padding: 20px;

      .content {
        margin: 20px auto;
        background: white;
        border-radius: 5px;
        padding: 10px 5px;

        .content-item {
          margin: 10px 0 40px 0;
          font-size: 17px;
          padding-left: 20px;
          height: 40px;
          line-height: 40px;
          border-radius: 5px;

          .content-top {
            width: 100%;

          }

          .system {
            font-weight: 600;
            font-size: 18px;
          }
        }
        .btn{
          justify-content: flex-end;
          padding-right:40px
        }
      }
    }
  }
</style>
