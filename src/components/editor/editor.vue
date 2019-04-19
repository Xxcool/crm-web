<template>
  <div>
    <kind-editor :id="id" :content="value" @on-content-change="onContentChange"
                 uploadJson="/api/common/editor-upload"
                 :allowImageUpload="true"
                 :formatUploadUrl="false"
                 :allowPreviewEmoticons="false"
                 :resizeType="1"
                 :allowImageRemote="false"
                 :items="items"
                 :height="height"
                 :width="width"
                 :min-width="minWidth"
                 :min-height="minHeight"
    ></kind-editor>
  </div>
</template>

<script>
  import kindEditor from 'kindeditor-vuejs/src/KindEditor'

  export default {
    name: "editor",
    components: {
      kindEditor
    },
    data() {
      return {}
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        required: true
      },
      width: {
        type: String
      },
      height: {
        type: String,
        default: "300px"
      },
      minWidth: {
        type: Number,
        default: 666
      },
      minHeight: {
        type: Number,
        default: 100
      },
      items: {
        type: Array,
        default: function () {
          return ['fontsize',
            'forecolor', 'bold', 'italic', 'underline',
            'strikethrough', 'removeformat', '|',
            'justifyleft', 'justifycenter',
            'justifyright', 'insertorderedlist',
            'insertunorderedlist', 'lineheight', '|',
            'formatblock', 'table',
            'hr', 'pagebreak', '|', 'image']
        }
      }
    },
    methods: {
      onContentChange: function (val) {
        this.$emit('input', val);
      }
    }
  }
</script>

<style scoped>

</style>