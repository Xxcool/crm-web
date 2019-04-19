<template>
  <div class="tags-view-container">
    <scroll-panel ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.path"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{tag.title}}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </scroll-panel>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
  import scrollPanel from "../../../components/scrollPanel"

  export default {
    name: "tagbar",
    components: { scrollPanel},
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {}
      }
    },
    computed: {
      visitedViews() {
        return this.$store.getters.visitedViews
      }
    },
    watch: {
      $route() {
        this.addViewTags()
        this.moveToCurrentTag()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener("click", this.closeMenu)
        } else {
          document.body.removeEventListener("click", this.closeMenu)
        }
      }
    },
    mounted() {
      this.addViewTags()
    },
    methods: {
      isActive(route) {
        return route.path === this.$route.path
      },
      addViewTags() {
        const {name} = this.$route
        if (name && name !== "redirect") {
          this.$store.dispatch("addView", this.$route)
        }
        return false
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag)
              if (tag.to.fullPath !== this.$route.fullPath) {
                this.$store.dispatch("updateVisitedView", this.$route)
              }
              break
            }
          }
        })
      },
      refreshSelectedTag(view) {
        this.$store.dispatch("delCachedView", view).then(() => {
          const {fullPath} = view
          this.$nextTick(() => {
            this.$router.replace({
              path: "/redirect" + fullPath
            })
          })
        })
      },
      closeSelectedTag(view) {
        this.$store.dispatch("delView", view).then(({visitedViews}) => {
          if (this.isActive(view)) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView)
            } else {
              this.$router.push("/")
            }
          }
        })
      },
      closeOthersTags() {
        this.$router.push(this.selectedTag)
        this.$store.dispatch("delOthersViews", this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      },
      closeAllTags() {
        this.$store.dispatch("delAllViews")
        this.$router.push("/")
      },
      openMenu(tag, e) {
        const menuMinWidth = 105
        const offsetLeft = this.$el.getBoundingClientRect().left
        const offsetWidth = this.$el.offsetWidth
        const maxLeft = offsetWidth - menuMinWidth
        const left = e.clientX - offsetLeft + 2

        if (left > maxLeft) {
          this.left = maxLeft
        } else {
          this.left = left
        }
        this.top = e.clientY + 2
        this.visible = true
        this.selectedTag = tag
      },
      closeMenu() {
        this.visible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags-view-container {
    height: 42px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    border-top: 1px solid #d8dce5;
    overflow: hidden;
    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 36px;
        line-height: 36px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 12px;
        font-size: 14px;
        margin-left: 5px;
        margin-top: 5px;
        user-select: none;
        &:first-of-type {
          margin-left: 5px;
        }
        &:last-of-type {
          margin-right: 5px;
        }
        &.active {
          background-color: #545c64;
          color: #fff;
          border-color: #545c64;
          &::before {
            content: "";
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>
