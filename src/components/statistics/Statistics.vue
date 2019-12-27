<template>
  <div class="statistics0">
    <div class="statistics">
      <div class="top flex">
<!--        顶部文章统计-->
        <div class="top-item release flex">
          <div>
            <div>今日发布</div>
            <div>{{newArticle.length}}</div>
          </div>
          <div class=" el-icon-s-promotion ico">
          </div>
        </div>
        <div class="top-item original flex">
          <div>
            <div>原创文章</div>
            <div>{{getOriginal.length}}</div>
          </div>
          <div class=" el-icon-chat-line-square ico">
          </div>
        </div>
        <div class="top-item news flex">
          <div>
            <div>新留言</div>
            <div>1</div>
          </div>
          <div class=" el-icon-bell ico">
          </div>
        </div>
        <div class="top-item message flex">
          <div>
            <div>新消息</div>
            <div>1</div>
          </div>
          <div class=" el-icon-s-promotion ico">
          </div>
        </div>
      </div>
      <div class="pie flex">
<!--        文章类型饼状图-->
        <div class="content-item flex">
          <ve-pie :judge-width="true" width="100%" :data="ringChat" :settings="ringSettings"></ve-pie>
        </div>
        <!--        文章来源饼状图-->
        <div class="content-item flex">
          <ve-pie :judge-width="true" width="100%" :data="sourceChat" :settings="ringSettings"></ve-pie>
        </div>
      </div>
      <!--        文章日期统计瀑布图-->
      <div class="waterfall">
        <ve-waterfall :data="dateChat"></ve-waterfall>
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
                allArticle: [],
                allArticle1: [],
                categoryArticle: [],
                categoryOnly: [],
                newArticle:[],
                ringSettings: {
                    roseType: 'radius'
                },
                ringChat: {
                    columns: ['类目', 'mount'],
                    rows: [],
                },
                sourceChat: {
                    columns: ['来源', 'mount'],
                    rows: [],
                },
                dateChat: {
                    columns: ['时间', '数量'],
                    rows: []
                }
            }
        },
        methods: {
            // 获取所有文章
            getData() {
                this.$axios
                    .req("article/allArticle")
                    .then(res => {
                        if (res.code === 200) {
                            this.allArticle = res.data
                            this.allArticle1 = res.data
                            console.log(this.allArticle1);
                            this.newArticle1()
                            this.getCategory()
                            this.getSource()
                            this.getStatis()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //获取类别
            getCategory() {
                this.allArticle.map(item => {
                    if (!JSON.stringify(this.ringChat.rows).includes(item.category)) {
                        let mount = 0
                        this.allArticle.map(item0 => {
                            if (item0.category === item.category) {
                                mount++
                            }
                        })
                        let b = {'类目': item.category, 'mount': mount}
                        this.ringChat.rows.push(b)
                    }
                })
            },
            //获取来源
            getSource() {
                this.allArticle.map(item => {
                    if (!JSON.stringify(this.sourceChat.rows).includes(item.source)) {
                        let mount = 0
                        this.allArticle.map(item0 => {
                            if (item0.source === item.source) {
                                mount++
                            }
                        })
                        let b = {'来源': item.source, 'mount': mount}
                        this.sourceChat.rows.push(b)
                    }
                })
            },
            //获取时间分类
            getStatis() {
                this.allArticle1.map(item => {
                    let a=this.$dayjs(item.date).format('YYYY年MM月DD日')
                    if (!JSON.stringify(this.dateChat.rows).includes(item.date)) {
                        let mount = 0
                        this.allArticle1.map(item0 => {
                            let b=this.$dayjs(item0.date).format('YYYY年MM月DD日')
                            if (b === a) {
                                mount++
                            }
                        })
                        let b = {'时间': a, '数量': mount}
                        this.dateChat.rows.push(b)
                    }
                })
                console.log(this.dateChat);
            },
            // 获取今日发布
            newArticle1() {
                let date = new Date();
                let date1 = this.$dayjs(date).format('YYYY-MM-DD')
                let a = this.$dayjs(date).valueOf()
                let b = this.$dayjs(date1).valueOf()
                this.newArticle = this.allArticle.filter(item => {
                    return this.$dayjs(item.date).valueOf() >= b && this.$dayjs(item.date).valueOf() <= a
                })
            },
        },
        mounted() {
            this.getData()

        },
        created() {

        },
        filters: {},
        computed: {

            // 获取原创
            getOriginal() {
                return this.allArticle.filter(item => {
                    return item.source === '原创'
                })
            },

        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
  .statistics0{
    width: 100vm;
    height: auto;
    background: #F0F2F5;
  }
  .statistics {
    width: 92%;
    height: auto;
    padding-bottom: 50px;
    margin: 0 auto;

    .top {
      padding-top: 30px;
      width: 100%;

      .top-item {
        flex: 1;
        height: 60px;
        justify-content: center;
        text-align: center;
        color: #dedede;
        font-size: 17px;

        .ico {
          font-size: 22px;
          position: relative;
          right: -30%;
        }
      }

      .release {
        background: #7CCABF;
      }

      .original {
        background: #E88A87;
      }

      .news {
        background: #8375A3;
      }

      .message {
        background: #b9caaa;
      }

    }

    .pie {
      width: 100%;
      margin-top: 50px;

      display: flex;
      align-items: center;
      justify-content: space-around;

      .pie-source, pie-category {
        width: 40%;
      }
    }


  }

  .content-item {
    width: 30%;
    height: 350px;

    border-radius: 10px;
    justify-content: center;
  }
</style>
