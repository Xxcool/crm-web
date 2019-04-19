<template>
  <el-cascader
    expand-trigger="hover"
    :options="options"
    v-model="value"
    @change="handleChange">
  </el-cascader>
</template>

<script>
  import api from  '../../api/app'
  export default {
    name: "cascader",
    data(){
      return {
        options: []
      }
    },
    props: {
      value: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    created(){
      api.cascader().then(res => {
        if (res.success) {
          this.options = res.data
        }
      }).catch(() => {
      })
    },
    methods: {
      handleChange(val) {
        this.$emit('input', val);
      }
    }
  }
</script>