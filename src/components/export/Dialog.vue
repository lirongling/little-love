<template>
  <div>
<!--    form表单-->
    <el-form :model="row">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="row.NAME" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="现价111" :label-width="formLabelWidth">
        <el-input type="number" v-model="row.PRESENT_PRICE" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>

  </div>

</template>

<script>
    export default {
        name: "",
        components: {},
        props: {
            row: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                from: {
                    name: '',
                    price: '',
                },
                from1: {},
                dialogFormVisible1: false,
                formLabelWidth: '120px',
            }
        },
        methods: {
            // 取消按钮
            cancel() {
                this.row = this.from1
                this.$emit('update:dialogFormVisible', this.dialogFormVisible1);
                this.$message({
                    showClose: true,
                    message: '已取消操作'
                });
            }
        },
        mounted() {
            this.from1 = this.row
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

</style>
