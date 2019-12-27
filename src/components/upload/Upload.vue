<template>
  <div>
    <div class="container">
<!--      element自带上传-->
      <el-upload
          class="upload-demo"
          drag
          action="/api/upload"
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
<!--      upload上传-->

      <div class="upload">
        <div> vue-image-crop-upload上传图片</div>
        <div class="flex upload1">
          <div class="upload-img flex" @click="toggleShow">
            <Icon type="ios-camera" size="30"></Icon>
          </div>
          <span v-for="(item) in imgDataUrl">
           <img :src="item">
          </span>
        </div>

        <myUpload
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :height="200"
            img-format="png"
            langType="zh"
            :noRotate="false"
            field="file"
            url="/api/upload"
        ></myUpload>

      </div>
    </div>
  </div>

</template>

<script>

    import myUpload from 'vue-image-crop-upload';

    export default {
        name: "",
        components: {
           myUpload
        },
        props: {},
        data() {
            return {
                imgDataUrl: [],
                show: false,
                size: 2.1
            };
        },
        components: {
            myUpload
        },
        methods: {
            // 弹框
            toggleShow() {
                this.show = !this.show;
            },
            // push图片
            cropSuccess(imgDataUrl) {
                // console.log("-------- crop success --------", imgDataUrl, field);
                this.imgDataUrl.push(imgDataUrl);
            },
            //上传成功回调
            cropUploadSuccess(jsonData) {

            },
            //上传失败回调
            cropUploadFail(status) {

            }
        },


    mounted() {

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
  .container {
    width: 90%;
    margin: 0 auto;
    padding: 60px;

    .upload {
      margin-top: 80px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  img{
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin: 30px 30px;
  }
  .upload-img{
    margin-top: 50px;
    width: 100px;
    height: 100px;
    justify-content: center;
    border-radius: 5px;
    border: #c5c5c5 1px dashed;
  }
  .upload1{
    justify-content: flex-start;
  }
</style>
