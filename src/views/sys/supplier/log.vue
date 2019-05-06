<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      v-loading="loading"
      element-loading-text="拼命加载中..."
      style="width: 100%">
      <el-table-column
        prop="id"
        label="明细ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="clientSupplierName"
        label="商家名称">
      </el-table-column>
      <el-table-column
        prop="created"
        label="跟踪日期">
      </el-table-column>
      <el-table-column
        prop="entryPerson"
        label="录入人">
      </el-table-column>
      <el-table-column
        prop="trackDoings"
        label="跟踪行为">
      </el-table-column>
      <el-table-column
        prop="contactPerson"
        label="客户联系人">
      </el-table-column>
      <el-table-column
        prop="description"
        label="结果描述">
      </el-table-column>
      <el-table-column
        prop="img"
        label="附件图片">
        <template slot-scope="scope">
          <a v-if="scope.row.img" :value="scope.row.img" :href="scope.row.img">附件图片</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="attachment"
        label="附件文件">
        <template slot-scope="scope">
          <a v-if="scope.row.attachment"  :value="scope.row.attachment" :href="scope.row.attachment">附件文件</a>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > filter.count" :total="total" :page.sync="filter.page"
                :pageSize.sync="filter.count" @pagination="loadData"/>
  </div>
</template>

<script>
  import api from "../../../api/sys/supplierLog"

  export default {
    name: "Supplier_log",
    data() {
      return {
        tableData: [],
        filter: {
          count: 10, // 页大小
          page: 1, // 当前页
          sort: '',
          order: '',
          params: {

          }
        },
        total: 0,
        loading: true
      }
    },
    created(){
      this.loadData();
    } ,
    methods:{
      loadData(){
        api.list(this.filter).then(res => {
          this.tableData = res.data.results;
          console.log(this.tableData);
          this.total = res.data.count
          this.loading = false
        }).catch(() => {
          this.loading = false
        })

      },

    }
  }
</script>

