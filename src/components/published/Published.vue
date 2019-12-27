<template>
  <div class="published ">
    <div class="published-top published___">
<!--      table表格-->
      <el-table
          :data="published0"
          border
          style="width: 100%">
        <el-table-column
            type="index"
            label="#"
            width="50">
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            width="290">
        </el-table-column>
        <el-table-column
            prop="author"
            label="作者"
            width="100">
        </el-table-column>

          <el-table-column
              prop="category"
              label="类目"
              width="120"
          >
<!--插槽-->
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.category === 'Vue'">{{scope.row.category}}</el-tag>
              <el-tag type="info" v-if="scope.row.category === 'React'" >{{scope.row.category}}</el-tag>
              <el-tag type="warning" v-if="scope.row.category === 'Node.js'" >{{scope.row.category}}</el-tag>
              <el-tag type="danger" v-if="scope.row.category === '性能优化'" >{{scope.row.category}}</el-tag>
              <el-tag type="success" v-if="scope.row.category === 'JavaScript'" >{{scope.row.category}}</el-tag>
              <el-tag type="info" v-if="scope.row.category === '小程序'" >{{scope.row.category}}</el-tag>
              <el-tag v-if="scope.row.category === '其他'" >{{scope.row.category}}</el-tag>
            </template>
          </el-table-column>


        <el-table-column
            prop="source"
            label="来源"
            width="150">
        </el-table-column>
        <el-table-column
            prop="star"
            label="重要性"
            width="180">
          <template slot-scope="scope">
            <el-rate
                v-model="scope.row.star*1"
                disabled
                text-color="#ff9900"
            >
            </el-rate>
          </template>

        </el-table-column>
        <el-table-column
            prop="date"
            label="发布时间"
            width="260">
        </el-table-column>
        <el-table-column
            prop="name"
            label="操作"
        >
<!--          插槽-->
          <template slot-scope="scope">
            <div class="flex">
              <el-button type="primary" @click="edit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
              <el-button type="info" @click="see(scope.$index, scope.row)">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom ">
<!--      分页-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="published.length">
      </el-pagination>
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
                published: [],
                currentPage: 1,
                pageSize: 10,
                delId: -1,
            }
        },
        methods: {
            // 通过接口删除数据
            getDelete() {
                this.$axios
                    .req("article/delete", this.delId)
                    .then(res => {
                        if (res.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 获取所有文章
            getData() {
                this.$axios
                    .req("article/allArticle")
                    .then(res => {
                        if (res.code === 200) {
                            this.published = res.data
                            this.published.map(item=>{
                                item.date=this.$dayjs(item.date).format('YYYY年MM月DD日hh时mm分ss秒')
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 修改每页多少条数据触发的事件
            handleSizeChange(val) {
                this.pageSize = val
            },
            // 修改每页数触发的事件
            handleCurrentChange(val) {
                this.currentPage = val
            },
            // 转化为Number类型
            getScore(score) {
                return Number(score)
            },
            // 带参跳转到修改界面
            edit(index, sore) {
                this.delId = sore._id
                this.$router.push({name: 'edit', query:{_id: this.delId}})
            },
            // 删除
            del(index, sore) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delId = sore._id
                    this.getDelete()
                    this.published.splice(index, 1);

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 跳转到详情页面
            see(index, sore) {
                this.delId = sore._id
                this.$router.push({name: 'look', query: {id: this.delId}})
            },

        },
        mounted() {
            this.getData()

        },
        created() {

        },
        filters: {},
        computed: {
            // 动态计算当前页展示的数据
            published0() {
                return this.published.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage)
            }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
  .published {
    width: 100vm;
    height: auto;
    background: #F0F2F5;
    justify-content: flex-start;

    .published-top {
      width: 90%;
      margin: 0 auto;
      padding-top: 30px;

    }
  }

  .bottom {
    margin: 35px 0px 0 100px;
    padding-bottom: 40px;
  }
  .li{
    background: coral;
  }
</style>
