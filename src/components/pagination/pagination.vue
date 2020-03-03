<template>
  <div class="pagination-container">
    <el-pagination
      small
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="limit"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>

  export default {
    name: 'pagination',
    props: {
      total: {
        required: true,
        type: Number
      },
      page: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 20
      },
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50, 100, 200, 500, 1000, 2000]
        }
      },
      layout: {
        type: String,
        default: 'prev, pager, next, jumper, total, sizes'
      },
      background: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      currentPage: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        }
      },
      limit: {
        get() {
          return this.pageSize
        },
        set(val) {
          this.$emit('update:pageSize', val)
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('pagination', {page: this.currentPage, pageSize: val})
      },
      handleCurrentChange(val) {
        this.$emit('pagination', {page: val, pageSize: this.pageSize})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pagination-container {
    background: #fff;
    padding: 18px 0;
  }

  .pagination-container.hidden {
    display: none;
  }
</style>
