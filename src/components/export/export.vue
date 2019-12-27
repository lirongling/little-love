<template>
  <div class="excel">
    <!--    顶部搜索框-->
    <div class="top">
      <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="inputText">
      </el-input>
    </div>
    <!--    table表格-->
    <div class="contior bottom____">
      <el-table
          :data="tableData0"
          border
          style="">
        <el-table-column
            prop="NAME"
            label="名称"
            width="280"
        >
        </el-table-column>
        <el-table-column
            prop="GOODS_SERIAL_NUMBER"
            label="商品编号"
            width="280">
        </el-table-column>
        <el-table-column
            prop="ORI_PRICE"
            label="原价"
            width="280">
        </el-table-column>
        <el-table-column
            prop="PRESENT_PRICE"
            label="现价"
            width="280"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            width="280">
          <!--          scope插槽-->
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="primary" @click.native.prevent="revise(scope.$index, scope.row)">修改
            </el-button>
            <!--            通过modal弹出修改信息-->
            <Modal
                v-model="modal"
                title="修改信息"
                @on-ok="ok"
                width="400"
                :mask-closable="true"
                @on-cancel="cancel">
              <span class="revser-name">名称:</span>
              <br>
              <el-input
                  placeholder="请输入新的名称"
                  v-model="revise0.name"
                  clearable></el-input>
              <br>
              <br>
              <span class="revser-name">价格:</span>
              <br>
              <el-input
                  type="number"
                  placeholder="请输入新的当前价格"
                  v-model="revise0.price"
                  clearable></el-input>
            </Modal>
            <!--            通过dialog弹出修改信息-->
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form :model="revise0" :rules="rules" ref="revise0" class="demo-ruleForm">
                <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="revise0.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="现价" :label-width="formLabelWidth" prop="price">
                  <el-input v-model="revise0.price" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
              </div>
            </el-dialog>
            <el-button class="del" icon="el-icon-delete" type="warning" @click.native.prevent="del(scope)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="bottom ">
      <!--    分页-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
      </el-pagination>
      <!--导出Excel-->
      <div class="export flex">
        <download-excel
            :fields="json_fields"
            :data="tableData0"
            :before-finish="finishDownload"
            name="订单详情.xls"
            title="订单详情"
            type="xls">
          <el-button type="primary">导出xls</el-button>
        </download-excel>
        <download-excel
            :fields="json_fields"
            :data="tableData0"
            title="订单详情"
            :before-finish="finishDownload"
            name="订单详情.csv"
            type="csv">
          <el-button type="success">导出csv</el-button>
        </download-excel>
      </div>
    </div>
  </div>

</template>

<script>
    import Dialog from '../export/Dialog'
    import JsonExcel from 'vue-json-excel'

    export default {
        name: "",
        components: {
            Dialog,
            'download-excel': JsonExcel
        },
        props: {},
        data() {

            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新的名称'));
                } else {
                    callback();
                }
            };
            var validatePrice = (rule, value, callback) => {
                let a = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/
                if (value === '') {
                    callback(new Error('请输入新的价格'));
                }
                else if (!a.test(value)) {
                    callback(new Error('价格只能是数字'));
                }
                else {
                    // if (this.revise0.name !== '') {
                    //     this.$refs.ruleForm.validateField('checkPass');
                    // }
                    callback();
                }
            };
            return {
                json_fields: {
                    '名称': 'NAME',
                    '商品编号': 'GOODS_SERIAL_NUMBER',
                    '原价': 'ORI_PRICE',
                    '现价': 'PRESENT_PRICE',
                },
                formLabelWidth: '120px',
                tableData: [],
                tableData1: [],
                inputText: '',
                currentPage: 1,
                pageSize: 10,
                modal: false,
                row: {},
                revise0: {
                    name: '',
                    price: '',
                },
                rules: {
                    name: [
                        {validator: validateName, trigger: 'blur'},
                    ],
                    price: [
                        {validator: validatePrice, trigger: 'blur'},
                    ]
                },
                json_meta: [
                    [
                        {
                            " key ": " charset ",
                            " value ": "GB18030"
                        }
                    ]
                ],
                dialogFormVisible: false,
                reviseFlage: false,

            }
        },
        methods: {
            // 导出Excel
            finishDownload() {
                let self = this
                self.$message({
                    message: '恭喜，数据导出成功',
                    type: 'success'
                })
            },
            // 确认修改
            ok() {
                if (this.revise0.name.length === 0 || this.revise0.price.length === 0) {
                    this.$Message.info('请输入完整');
                } else {
                    this.dialogFormVisible = false;
                    this.reviseFlage = true;
                    let a = this.tableData.indexOf(this.row)
                    let b = this.tableData1.indexOf(this.row)
                    this.row.NAME = this.revise0.name
                    this.row.PRESENT_PRICE = this.revise0.price
                    this.tableData.splice(a, 1, this.row)
                    this.tableData1.splice(b, 1, this.row)
                    this.$Message.info('修改上传成功');
                }

            },
            // 取消修改
            cancel() {
                this.dialogFormVisible = false;
                this.$Message.info('您已取消操作');
            },
            // 获取表格数据
            getData() {
                // 获取table数据
                this.$axios
                    .req("tableData")
                    .then(res => {
                        if (res.code === 0) {
                            this.tableData1 = res.data
                            this.tableData = res.data
                        }


                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 切换当前页显示的数量触发的事件
            handleSizeChange(val) {
                this.pageSize = val
            },
            // 切换当前页数触发的事件
            handleCurrentChange(val) {
                this.currentPage = val
            },
            // 修改
            revise(index, row) {
                console.log(index, row)
                this.row = row;
                this.revise0.name = row.NAME
                this.revise0.price = row.PRESENT_PRICE
                this.dialogFormVisible = true


            },
            // 删除
            del(index) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(index, 1);
                    this.tableData1.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
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
            // 动态计算当页显示的数据
            tableData0() {
                return this.tableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage)
            }
        },
        watch: {
            // 监听输入框的变化
            inputText(val) {
                // 页数重置为1
                this.currentPage = 1;
                this.tableData = this.tableData1;
                this.tableData = this.tableData.filter(item => {
                    return JSON.stringify(item.NAME + item.GOODS_SERIAL_NUMBER + item.ORI_PRICE + item.PRESENT_PRICE).includes(val)
                })
            }
        },
        directives: {}
    }
</script>

<style scoped lang="scss">
  .excel {
    width: 100vm;
    height: auto;
    justify-content: flex-start;
    background: #F0F2F5;
    padding-bottom: 50px;


    .top {
      margin: 40px 30px;
      width: 300px;
      height: 30px;
    }

    .contior {
      width: 90%;
      margin: 0 auto;
    }

    .bottom {
      margin: 35px 0px 0 100px;
    }


  }

  .revser-name {
    margin-top: 10px !important;
  }

  .del {
    margin-left: 10px;
  }

  .export {
    width: 30%;
    margin: 0 auto;
    padding-top: 40px;
  }
</style>
