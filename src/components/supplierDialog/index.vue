<template>
  <el-dialog width="800px" :visible.sync="supplierDialogVisible" title="商户选择" @close="close">
    <div class="tools">
      <el-form ref="searchForm" :inline="true" :model="supplierDialog.filter">
        <el-form-item label="配送区：">
          <el-select v-model="supplierDialog.filter.params.stationId" placeholder="配送区">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in supplierDialog.stationList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型：">
          <el-select v-model="supplierDialog.filter.params.businessType" placeholder="业务类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="普通供应商" value="0"></el-option>
            <el-option label="招标供应商" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模糊搜索：">
          <el-input v-model="supplierDialog.filter.params.search" placeholder="输入Email、公司名称搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadSupplierData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="supplierDialog.suppliers"
      border
      stripe
      height="260"
      v-loading="supplierDialog.loading"
      element-loading-text="拼命加载中..."
      @sort-change="supplierTableSortChange"
      @selection-change="supplierSelectChange"
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
        prop="stationName"
        width="200"
        label="配送区">
        <template slot-scope="scope">
          <div :title="scope.row.stationName" style="width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            {{scope.row.stationName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        width="150"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="companyName"
        width="180"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="contactMan"
        width="70"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="state"
        width="200"
        label="所在地区">
        <template slot-scope="scope">
          {{scope.row.state}} {{scope.row.city}} {{scope.row.county}}
        </template>
      </el-table-column>
      <el-table-column
        prop="haveShopInfo"
        width="70"
        label="店铺状态">
      </el-table-column>
      <el-table-column
        prop="auditStatusInfo"
        width="70"
        label="审核状态">
      </el-table-column>
      <el-table-column
        prop="statusInfo"
        width="70"
        label="启用状态">
      </el-table-column>
      <el-table-column
        prop="addTime"
        width="140"
        label="注册时间">
      </el-table-column>
    </el-table>
    <pagination v-show="supplierDialog.total > supplierDialog.filter.count" :total="supplierDialog.total" :page.sync="supplierDialog.filter.page"
                :pageSize.sync="supplierDialog.filter.count" @pagination="loadSupplierData"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="supplierDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="selectedSupplierConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import supplierApi from "../../api/supplier/supplier"

  export default {
    name: "supplierDialog",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        supplierDialog: {
          suppliers: [],
          stationList: [],
          selectRows: [],
          filter: {
            count: 10, // 页大小
            page: 1, // 当前页
            sort: "",
            order: "",
            params: {
              search: null,
              stationId: null,
              businessType: null
            }
          },
          total: 0,
          loading: true
        }
      }
    },
    computed: {
      supplierDialogVisible: {
        get() {
          return this.visible
        },
        set(value) {
          this.$emit('update:visible', value);
        }
      }
    },
    created() {
      this.loadSupplierData()
    },
    methods: {
      loadSupplierData() {
        this.supplierDialog.loading = true
        supplierApi.list(this.supplierDialog.filter).then(res => {
          this.supplierDialog.suppliers = res.data.results
          this.supplierDialog.total = res.data.count
          this.supplierDialog.loading = false
        }).catch(() => {
          this.supplierDialog.loading = false
        })
      },
      supplierTableSortChange(val) {
        console.log(val)
        if (val.prop != null) {
          if (val.order === 'descending') {
            this.supplierDialog.filter.order = 'desc'
          } else {
            this.supplierDialog.filter.order = 'asc'
          }
          this.supplierDialog.filter.sort = val.prop
        } else {
          this.supplierDialog.filter.order = ''
        }
        this.loadSupplierData();
      },
      supplierSelectChange(rows) {
        this.supplierDialog.selectRows = rows;
      },
      selectedSupplierConfirm() {
        if (this.supplierDialog.selectRows.length > 0) {
          let suppliers = this.supplierDialog.selectRows.map(row => {
            return {id: row.id, companyName: row.companyName, email: row.email}
          })
          this.supplierDialogVisible = false
          this.$emit("confirm", suppliers)
        } else {
          this.$message.error("请选择供应商")
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