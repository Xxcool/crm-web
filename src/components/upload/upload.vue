<template>
  <div class="file">
    <el-upload
      :ref="fileRef" :action="action" :headers="headers" :data="data" :multiple="multiple" :name="name" :show-file-list="showFileList"
      :before-upload="beforeUpload" :before-remove="beforeRemove" :on-remove="onRemove" :on-change="onChange"
      :on-success="onSuccess" :on-error="onError" :file-list="fileList" :auto-upload="autoUpload" :list-type="listType"
      :disabled="disabled" :limit="limit" :on-exceed="onExceed" :accept="accept" :on-preview="onPreview" :http-request="uploadImg">
      <el-button :loading="loading" type="primary">点击上传</el-button>
      <span slot="tip" v-if="tipText!==''" :class="tipStyle" v-text="tipText"></span>
    </el-upload>
  </div>
</template>

<script>
  function noop() {
  }

  import api from "../../api/app"

  export default {
    name: "upload",
    props: {
      fileRef: {
        type: String,
        default: "fileRef"
      },
      type: {
        type: String,
        required: true,
        validator(value) {
          const arr = ["img", "pdf", "video", "word", "exl", "ppt", "zip"]
          return arr.indexOf(value) > -1
        }
      },
      tipText: {
        type: String,
        default: ""
      },
      tipStyle: {
        type: String,
        default: "tip-text"
      },
      action: {
        type: String,
        default: ""
      },
      headers: {
        type: Object,
        default() {
          return {};
        }
      },
      data: {
        type: Object,
        default() {
          return {};
        }
      },
      accept: {
        type: String,
        default: ""
      },
      multiple: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: 'file'
      },
      showFileList: {
        type: Boolean,
        default: true
      },
      beforeUpload: {
        type: Function,
        default: noop
      },
      beforeRemove: {
        type: Function,
        default: noop
      },
      onRemove: {
        type: Function,
        default: noop
      },
      onChange: {
        type: Function,
        default: noop
      },
      onSuccess: {
        type: Function,
        default: noop
      },
      onError: {
        type: Function,
        default: noop
      },
      fileList: {
        type: Array,
        default() {
          return [];
        }
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      listType: {
        type: String,
        default: 'text' // text,picture,picture-card
      },
      disabled: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 0
      },
      onExceed: {
        type: Function,
        default: noop
      },
      onPreview: {
        type: Function,
        default: noop
      },
      onDelete: {
        type: Function,
        default: noop
      }
    },
    data(){
      return{
        loading:false
      }
    },
    methods: {
       uploadImg(file){
         this.loading = true
         api.fileUpload(file,this.type).then(() => {
           this.loading = false
         }).catch(() => {
           this.loading = false
         })
       }

      // 手动上传
      // submitUpload() {
      //   this.$refs[this.fileRef].submit();
      // },
      // 组件内调用 upload submitUpload upload 需指定ref 设置autoUpload:false
      // submitUpload() {
      //   this.$refs.ref_upload.submitUpload();
      // }
    }
  }
</script>

<style lang="scss" scoped>

  .file {
    .tip-text {
      color: #FF6030;
      padding: 0 8px;
    }
    .mb16 {
      margin-bottom: 16px;
    }
    .file-list {
      color: #6687ED;
      .file-other {
        height: 32px;
        line-height: 32px;
        padding: 0 16px;
        background-color: #F7F9FC;
        border-radius: 4px;
      }
      .file-image {
        img {
          max-width: 50px;
          max-height: 50px;
          border-radius: 8px;
          margin-top: -9px;
          margin-right: 8px;
        }
        .name {
          max-width: calc(100% - 110px);
          min-width: 100px;
        }
      }
      .delete {
        margin-left: 16px;
        color: #606266;
      }
      a {
        .iconfont {
          margin-right: 8px;
        }
      }
      li {
        margin-bottom: 16px;
        margin-right: 8px;
      }
      li:last-child {
        margin-right: 0;
      }
    }
  }
</style>
