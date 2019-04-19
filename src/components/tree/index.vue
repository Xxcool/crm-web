<template>
  <ul class="tree-list">
    <tree-item
      v-for="(item, idx) in treeData"
      :ids="ids"
      :ids-with-parent="idsWithParent"
      :model="item"
      :options="termOptions"
      :depth="0"
      :state="state"
      :key="idx"
      @handle="handle"
    />
  </ul>
</template>

<script>
  import Item from "./item.vue"

  export default {
    components: {"tree-item": Item},

    model: {
      prop: "ids",
      event: "change"
    },

    props: {
      treeData: {
        type: Array,
        default: function () {
          return []
        }
      },
      options: {
        type: Object,
        default: function () {
          return {}
        }
      },
      ids: {
        type: Array,
        default: function () {
          return []
        }
      }
    },

    data() {
      return {
        defaultOptions: {
          label: "label", // 节点名称字段
          checkbox: true, // 是否启用选择框
          checkedOpen: true, // 选中时是否展开节点
          folderBold: true, // 目录是否加粗显示
          idsWithParent: true, // v-model数据是否包含目录,如果只获取叶子节点设置为false
          depthOpen: 0, // 初始化时展开层级，根节点为
          openIcon: "arrow-right", // 展开按钮
          closeIcon: "arrow-down", // 收缩按钮
          halfCheckedIcon: "tree-minus-square", // 选择框半选中图标
          checkedIcon: "tree-check-square", // 选择框选中图标
          uncheckedIcon: "tree-square", // 选择框未选中图标
          linkage:"down",// 是否联动，向上(up)，向下(down)，全部不联动(no), 全部联动(yes) 除down其余效果还未实现
        },
        termOptions: {},
        idsWithParent: [],
        state: 0
      }
    },

    watch: {
      options: {
        handler: function (val) {
          console.log(val)
          this.initOptions()
        },
        deep: true
      }
    },

    created() {
      this.initOptions()
      this.idsWithParent = this.ids.slice(0)
    },

    methods: {
      handle(item) {
        this.$emit("handle", item)
      },
      initOptions() {
        this.termOptions = Object.assign({}, this.defaultOptions, this.options)
        this.idsWithParent = this.ids.slice(0)
      }
    }
  }
</script>

<style lang="scss">
  @import "./style";
</style>
