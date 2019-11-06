<template>
  <div>
    <el-form :inline=true>
      <el-form-item label="日期">
        <el-date-picker
          v-model="validTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="录入人">
        <el-select v-model="filter.params.entryPersonId" clearable>
          <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商">
        <el-select v-model="filter.params.clientId" filterable remote reserve-keyword placeholder="请输入采购单位名称"
                    :remote-method="remoteMethod" clearable :loading="searchLoading">
          <el-option
            v-for="item in supplierList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">搜索</el-button>
      </el-form-item>
    </el-form>
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
        prop="trackDate"
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
        prop="addTime"
        label="添加时间">
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
        userList: [],
        supplierList: [],
        validTime: [],
        filter: {
          count: 10, // 页大小
          page: 1, // 当前页
          sort: '',
          order: '',
          params: {

          }
        },
        total: 0,
        loading: true,
        searchLoading: false
      }
    },
    created(){
      api.getUsers().then(res => {
        this.userList = res.data
      })
      api.supplierList({}).then(res => {
        this.supplierList = res.data.results
      })
      this.loadData();
    } ,
    methods:{
      loadData(){
        this.filter.params.trackStartDate = this.validTime[0]
        this.filter.params.trackEndDate = this.validTime[1]
        api.list(this.filter).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count
          this.loading = false
        }).catch(() => {
          this.loading = false
        })

      },
      remoteMethod(name) {
          api.institutesList({params:{name:name}}).then(res => {
            this.institutesList = res.data.results
            this.searchLoading = false;
          }).catch(() => {
            this.searchLoading = false
          });
      },
    }
  }
</script>

