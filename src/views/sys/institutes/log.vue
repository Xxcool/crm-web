<template>
  <div>
    <el-form :inline=true>
      <el-form-item label="跟踪日期">
        <el-date-picker v-model="filter.params.trackStartDate" value-format="yyyy-MM-dd"
        type="date" placeholder="开始时间"></el-date-picker>
        -
        <el-date-picker v-model="filter.params.trackEndDate" value-format="yyyy-MM-dd"
        type="date" placeholder="结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="录入人">
        <el-select v-model="filter.params.entryPersonId" clearable>
          <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采购单位">
        <el-select v-model="filter.params.clientId" filterable remote reserve-keyword placeholder="请输入采购单位名称"
                    :remote-method="remoteMethod" clearable :loading="searchLoading">
          <el-option
            v-for="item in institutesList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务范围">
        <el-select v-model="filter.params.trackDoings" multiple collapse-tags placeholder="请选择" style="margin-left: 20px;">
          <el-option v-for="item in tagList" :key="item.name" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发进度">
        <el-select v-model="filter.params.businessTrackDoings" multiple collapse-tags placeholder="请选择" style="margin-left: 20px;">
          <el-option v-for="item in businessTagList" :key="item.name" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户联系人部门/职务/姓名">
        <el-cascader
            v-model="filter.params.contact"
            :options="cascaderList" :change-on-select="true"></el-cascader>
      </el-form-item>
      <el-form-item label="拜访形式">
        <el-select v-model="filter.params.visitType" clearable>
          <el-option label="电话" value="0"></el-option>
          <el-option label="微信" value="1"></el-option>
          <el-option label="面访" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">搜索</el-button>
        <el-button type="primary" @click="exportData">导出</el-button>
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
        prop="clientInstitutesName"
        label="院所名称">
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
        label="业务范围">
      </el-table-column>
      <el-table-column
        prop="businessTrackDoings"
        label="开发进度">
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
        prop="created"
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
  import api from "../../../api/sys/log"
  import {downloadFile} from "../../../utils"
  import tag from "../../../api/sys/tag"
  import contact from "../../../api/sys/contact"

  export default {
    name: "institutes_log",
    data() {
      return {
        tableData: [],
        userList: [],
        institutesList: [],
        filter: {
          count: 10, // 页大小
          page: 1, // 当前页
          sort: '',
          order: '',
          params: {
            trackDoings:[],
            businessTrackDoings:[],
            contact: []
          }
        },
        total: 0,
        loading: true,
        searchLoading: false,
        tagList: [],
        businessTagList:[],
        cascaderList:[]
      }
    },
    created(){
      api.getUsers().then(res => {
        this.userList = res.data
      })
      api.institutesList({}).then(res => {
        this.institutesList = res.data.results
      })
      this.loadData();
      this.handleTag();
    },
    methods:{
      loadData(){
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
      exportData() {
        api.exportData(this.filter.params).then(res => {
          downloadFile(res.data, "客户跟进日志")
        })
      },
      handleTag() {
        tag.tree(1).then(res => {
          this.tagList = res.data;
        });
        tag.tree(0).then(res => {
          this.businessTagList = res.data;
        });
        contact.findCascader("").then(res=>{
          this.cascaderList=res.data;
        });
      },

    }
  }
</script>
