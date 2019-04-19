<template>
  <el-dialog width="800px" :visible.sync="institutesDialogVisible" title="资产所选择" @close="close">
    <div class="tools">
      <el-form ref="searchForm" :inline="true" :model="institutesDialog.filter">
        <el-form-item label="配送区：">
          <el-select v-model="institutesDialog.filter.params.defaultStation" placeholder="配送区">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in institutesDialog.stationList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模糊搜索：">
          <el-input v-model="institutesDialog.filter.params.name" placeholder="输入研究所名称搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadInstitutesData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="institutesDialog.suppliers"
      border
      stripe
      height="260"
      v-loading="institutesDialog.loading"
      element-loading-text="拼命加载中..."
      @sort-change="institutesTableSortChange"
      @selection-change="institutesSelectChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        fixed="left"
        align="center"
        width="40">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        sortable
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        width="450"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="simpleName"
        width="200"
        label="简称">
      </el-table-column>
    </el-table>
    <pagination v-show="institutesDialog.total > institutesDialog.filter.count" :total="institutesDialog.total" :page.sync="institutesDialog.filter.page"
                :pageSize.sync="institutesDialog.filter.count" @pagination="loadInstitutesData"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="institutesDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="selectedSupplierConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import institutesApi from "../../api/member/institutes"

  export default {
    name: "institutesDialog",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        institutesDialog: {
          institutes: [],
          stationList: [],
          selectRows: [],
          filter: {
            count: 10, // 页大小
            page: 1, // 当前页
            sort: "",
            order: "",
            params: {
              name: null,
              defaultStation: null,
            }
          },
          total: 0,
          loading: true
        }
      }
    },
    computed: {
      institutesDialogVisible: {
        get() {
          return this.visible
        },
        set(value) {
          this.$emit('update:visible', value);
        }
      }
    },
    created() {
      this.loadInstitutesData()
    },
    methods: {
      loadInstitutesData() {
        this.institutesDialog.loading = true
        institutesApi.list(this.institutesDialog.filter).then(res => {
          this.institutesDialog.suppliers = res.data.results
          this.institutesDialog.total = res.data.count
          this.institutesDialog.loading = false
        }).catch(() => {
          this.institutesDialog.loading = false
        })
      },
      institutesTableSortChange(val) {
        if (val.prop != null) {
          if (val.order === 'descending') {
            this.institutesDialog.filter.order = 'desc'
          } else {
            this.institutesDialog.filter.order = 'asc'
          }
          this.institutesDialog.filter.sort = val.prop
        } else {
          this.institutesDialog.filter.order = ''
        }
        this.loadInstitutesData();
      },
      institutesSelectChange(rows) {
        this.institutesDialog.selectRows = rows;
      },
      selectedSupplierConfirm() {
        if (this.institutesDialog.selectRows.length > 0) {
          let institutes = this.institutesDialog.selectRows.map(row => {
            return {id: row.id, name: row.name, simpleName: row.simpleName}
          })
          this.institutesDialogVisible = false;
          this.$emit("confirm", institutes)
        } else {
          this.$message.error("请选择资产所")
        }
      },
      close() {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
</script>

<style scoped>

</style>