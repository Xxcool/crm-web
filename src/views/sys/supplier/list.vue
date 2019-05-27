<template>
  <div>
    <div class="tools">
      <el-form ref="searchForm" :inline="true" :model="filter">
        <el-form-item label="组织机构">
          <select-tree  :options="selOrgTree" @selected="findTagTree()" v-model="orgCode"
                        :props="{
                            parent: 'parentCode',
                            value: 'code',
                            label: 'name',
                            children: 'children',
                          }"
          />
        </el-form-item>
        <br>
        <el-form-item label="客户标签">
          <el-checkbox-group v-model="filter.params.tagCodes">
            <el-checkbox v-for="item in tagList" :key="item.code" :label="item.code">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <br>
        <el-form-item label="最新合同签订日期">
          <el-date-picker v-model="filter.params.contractBeginStartTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          type="date" placeholder="开始时间" style="width: 60%">
          </el-date-picker>
          -
          <el-date-picker v-model="filter.params.contractBeginOverTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          type="date" placeholder="结束时间" style="width: 60%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最新合同结束日期">
          <el-date-picker v-model="filter.params.contractEndStartTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          type="date" placeholder="开始时间" style="width: 60%">
          </el-date-picker>
          -
          <el-date-picker v-model="filter.params.contractEndOverTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          type="date" placeholder="结束时间" style="width: 60%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否入驻商城">
          <el-select v-model="filter.params.enter">
            <el-option label="请选择" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.params.name" placeholder="请输入客户名称" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadData">搜索</el-button>
        </el-form-item>
        <br>
        <div class="upload-btn-inline">
          <el-button  @click="downloadTemplate()">下载客户导入模板</el-button>
        </div>
        <el-upload
          class="upload-btn-inline"
          action="/api/client/supplier/importSupplier"
          multiple
          :file-list="fileList"
          :show-file-list="false"
          :on-success="handleUploadSuccess">
          <el-button  type="primary">批量导入</el-button>
        </el-upload>
        <el-button @click="exportSupplier"  type="primary">导出客户信息</el-button>
        <el-button @click="handleCreate()"  type="primary">新增商家</el-button>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      v-loading="loading"
      element-loading-text="拼命加载中..."
      @selection-change="selectChange"
      style="width: 100%">
      <el-table-column
        prop="id"
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        fixed="left"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="客户名称">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.name}}</p>
            <el-button slot="reference" class="nowrap" v-has="'supplier:supplier:view'" type="text" @click="viewDetail(scope)">{{scope.row.name}}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="分配状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status===0" class="status-2">未分配</span>
          <span v-else-if="scope.row.status===1" class="status-1">已分配</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tagName"
        label="阶段">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.tagName}}</p>
            <div slot="reference" class="nowrap"  type="text" >{{scope.row.tagName}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="contactNumber"
        label="联系人数">
        <template slot-scope="scope">
          <el-button v-has="'supplier:supplier:view'" type="text" @click="viewDetail(scope)">{{scope.row.contactNumber}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="person"
        label="客户负责">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.person}}</p>
            <div slot="reference" class="nowrap" v-has="'supplier:supplier:view'" type="text" >{{scope.row.person}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="enter"
        label="是否入驻商城">
        <template slot-scope="scope">
          <span v-if="scope.row.enter===0" class="status-2">否</span>
          <span v-else-if="scope.row.enter===1" class="status-1">是</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="contractBeginTime"
        width="140"
        label="最新合同签订日期">
      </el-table-column>
      <el-table-column
        prop="contractEndTime"
        width="140"
        label="最新合同结束日期">
      </el-table-column>
      <el-table-column
        prop="modified"
        width="140"
        label="最近跟进日期">
      </el-table-column>
      <el-table-column
        prop="description"
        label="最近拜访明细">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.description}}</p>
            <div slot="reference" class="nowrap" v-has="'supplier:supplier:view'" type="text" >{{scope.row.description}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button v-has="'supplier:supplier:edit'" type="primary" @click="handleUpdateStatus(scope)">分配</el-button>
          <el-button v-has="'supplier:supplier:edit'" type="primary" @click="handleCreateLog(scope)">跟踪</el-button>
          <el-button v-has="'supplier:supplier:edit'" type="primary" @click="handleRelevance(scope)">关联</el-button>
          <el-button v-has="'supplier:supplier:edit'" type="primary" @click="handleFreed(scope)">释放</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > filter.count" :total="total" :page.sync="filter.page"
                :pageSize.sync="filter.count" @pagination="loadData"/>


    <el-dialog title="新增商家" width="40%" :visible.sync="dialogCreateFormVisible">
      <el-form ref="supplierForm" label-width="80px" :model="supplier" :rules="rules">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="supplier.name"></el-input>
        </el-form-item>
        <el-form-item label="配送区">
          <el-checkbox-group v-model="supplier.stationIds">
            <el-checkbox v-for="item in stationList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商家描述">
          <el-input type="textarea" v-model="supplier.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="客户分配" width="40%" :visible.sync="dialogAllotFormVisible">
      <el-form  label-width="80px" :model="supplier" :rules="rules">
        <el-form-item label="组织机构">
          <el-tree
            ref="orgTree"
            :data="orgList"
            show-checkbox
            node-key="code"
            :props="props">
          </el-tree>
        </el-form-item>
        <el-form-item label="分配人员">
          <el-checkbox-group v-model="supplier.userIds">
            <el-checkbox v-for="item in userList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="分配备注">
          <el-input type="textarea" v-model="supplier.allotRemark"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAllotFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AllotData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="客户行为跟踪" width="40%" :visible.sync="dialogLogFormVisible">
      <el-form ref="logForm" label-width="80px" :model="log">
        <el-form-item label="跟踪行为">
          <el-select v-model="log.trackDoings" clearable>
            <el-option v-for="item in allTagList" :key="item.name" :value="item.name" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结果描述">
          <el-input type="textarea" v-model="log.description"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input  v-model="log.remark"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
            action="/api/common/upload/0"
            accept="image/*"
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleUploadImgSuccess"
            with-credentials >
            <img v-if="log.img" :src="log.img" class="avatar" title="点击替换图标">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="附件文件">
          <el-upload
            action="/api/common/upload/1"
            accept="file/*"
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleUploadAttachmentSuccess"
            with-credentials >
            <img v-if="log.attachment" :src="log.attachment" class="avatar" title="点击重新上传">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系人选择">
          <el-select v-model="log.contactPerson" clearable>
            <el-option v-for="item in contactList" :key="item.name" :value="item.name" :label="item.name">{{item.name}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitLogData" >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="系统商家关联" width="40%" :visible.sync="dialogRelevanceFormVisible">
      <el-form ref="relevancesupplierForm" label-width="80px" :model="relevance" :rules="rules" :inline="true">
        <el-form-item label="商家名称">
          <el-input v-model="relevance.params.companyName" placeholder="输入商家名称搜索" style="max-width: 180px;width: 180px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadSupplierData">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="supplierData"
        border
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中..."
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="名称">
        </el-table-column>
        <el-table-column
          label="操作"
          width="140"
          fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.id===supplier.supplierId">
              <el-button type="primary" @click="cancelRelevance(scope)">取消关联</el-button>
            </div>
            <div v-else-if="scope.row.id!==supplier.supplierId">
              <el-button type="primary" @click="relevances(scope)">关联</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="relevanceTotal > relevance.count" :total="relevanceTotal" :page.sync="relevance.page"
                  :pageSize.sync="relevance.count" @pagination="loadSupplierData"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRelevanceFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRelevance()">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="客户释放" width="40%" :visible.sync="dialogFreedFormVisible">
      <el-form  label-width="100px" :model="supplier" >
        <el-form-item label="释放后所属组织">
          <span>{{supplier.userOrgName}}</span>
        </el-form-item>
        <el-form-item label="释放后所属人">
          <span>{{supplier.userName}}</span>
        </el-form-item>
        <el-form-item label="释放原因">
          <el-input type="textarea" v-model="supplier.freedRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFreedFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="freedData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from "../../../api/sys/supplier"
  import org from "../../../api/sys/org"
  import tag from "../../../api/sys/tag"
  import station from "../../../api/sys/station"
  import user from "../../../api/sys/user"
  import selectTree from '../../../components/selectTree/index.vue'
  import store from '../../../store/index'
  import logApi from "../../../api/sys/supplierLog"
  import contact from "../../../api/sys/supplierContact"
  import {downloadFile} from "../../../utils"

  export default {
    name: "list",
    components: {selectTree},
    data() {
      return {
        fileList:[],
        tableData: [],
        supplierData:[],
        rules:{
          name:[{required:true,message:'不能为空',trigger:'change'}],
          stationId: [{required: true, message: '请选择配送区', trigger: 'change'}]
        },
        filter: {
          count: 10, // 页大小
          page: 1, // 当前页
          sort: '',
          order: '',
          params: {
            // 自定义参数
            contractBeginStartTime:null,
            contractBeginOverTime:null,
            contractEndStartTime:null,
            contractEndOverTime:null,
            tagCodes:[],
          }
        },
        total: 0,
        relevance: {
          count: 10, // 页大小
          page: 1, // 当前页
          sort: '',
          order: '',
          params: {
            companyName:null
          }
        },
        relevanceTotal:0,
        loading: true,
        supplier:{
          id:null,
          supplierId:null,
          onLine:null,
          name:null,
          userName:null,
          userOrgName:null,
          type:null,
          stationIds:[],
          remark:null,
          allotRemark:null,
          freedRemark:null,
          ids:null,
          orgCodes:[],
          userIds:[]
        },
        onLine:1,
        log:{
          clientsupplierId:null,
          clientsupplierName:null,
          entryPerson:null,
          trackDoings:null,
          contactPerson:null,
          img:null,
          attachment:null,
          remark:null,
          description:null
        },
        stationList: [],
        dialogCreateFormVisible:false,
        dialogAllotFormVisible:false,
        dialogRelevanceFormVisible:false,
        dialogFreedFormVisible:false,
        stationLoading:false,
        dialogLogFormVisible:false,
        multipleSelection: [],
        orgList:[],
        userList:[],
        selOrgTree:[],
        tagList:[],
        allTagList:[],
        contactList:[],
        orgCode:null,
        props:{
          label:"name"
        },
      };
    },
    created() {
      this.loadData();
      this.getOrgSelectTree();
    },
    methods: {
      loadData() {
        api.list(this.filter).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
        this.getOrgTree();
        this.getAllUser();
      },
      getOrgSelectTree(){
        org.tree().then(res =>{
          this.selOrgTree=res.data;
        }).catch(()=>{
        })
      },
      stationMethod(query) {
        query = query || ''
        this.stationLoading = true;
        station.allList(query).then(res => {
          this.stationLoading = false;
          if (res.data) {
            this.stationList = res.data;
          } else {
            this.stationList = []
          }
        }).catch(() => {
          this.stationLoading = false;
        })
      },
      handleCreate() {
        this.stationMethod();
        this.supplier={
          id:null,
          name:null,
          type:null,
          stationIds:[],
          remark:null,
          allotRemark:null,
          ids:[],
          orgCodes:[],
          userIds:[]
        };
        this.dialogCreateFormVisible = true;
      },
      createData() {
        this.$refs.supplierForm.validate(valid => {
          if (valid) {
            api.add(this.supplier).then(() => {
              this.dialogCreateFormVisible = false;
              this.$message.success("添加成功");
              this.loadData();
            }).catch(() => {

            })
          }
        })
      },
      AllotData(){
        this.dialogAllotFormVisible=false;
        this.supplier.remark=this.supplier.allotRemark;
        this.supplier.orgCodes=this.$refs.orgTree.getCheckedKeys();
        api.updateStatusById(this.supplier).then(()=>{
          this.$message.success("分配成功");
          this.loadData();
        }).catch(()=>{

        })
      },
      getOrgTree(){
        org.tree().then(res=>{
          this.orgList=res.data;
        }).catch(()=>{
        });
      },
      getAllUser(){
        user.selectAll().then(res=>{
          this.userList=res.data;
        }).catch(()=>{
        })
      } ,
      handleUpdateStatus(val){
        this.supplier={
          id:null,
          name:null,
          type:null,
          stationIds:[],
          remark:null,
          allotRemark:null,
          ids:[],
          orgCodes:[],
          userIds:[]
        };
        this.supplier.id=val.row.id;
        this.dialogAllotFormVisible=true;
      },

      loadSupplierData(){
        api.supplierList(this.relevance).then(res=>{
          this.supplierData=res.data.results;
          this.relevanceTotal=res.data.count;
        }).catch(()=>{
        });
      },
      handleRelevance(val){
        this.supplier=val.row;
        this.loadSupplierData();
        this.dialogRelevanceFormVisible=true;
      },
      relevances(val){
        this.supplier.supplierId=val.row.id;
        api.relevance(this.supplier).then(()=>{
          this.$message.success("关联成功");
          this.loadData();
        }).catch(()=>{
        })
      },

      saveRelevance(){
        this.dialogRelevanceFormVisible=false;
        this.loadData();
      },

      cancelRelevance(){
        this.supplier.supplierId=0;
        api.relevance(this.supplier).then(()=>{
          this.$message.success("取消关联成功");
          this.loadData();
        }).catch(()=>{
        })
      },
      handleFreed(val){
        this.supplier=val.row;
        console.log(this.supplier);
        this.dialogFreedFormVisible=true;
      },

      freedData(){
        this.supplier.remark=this.supplier.freedRemark;
        api.updateStatus(this.supplier).then(()=>{
          this.dialogFreedFormVisible=false;
          this.$message.success("释放成功");
          this.loadData();
        }).catch(()=>{

        })
      },

      selectChange(val) {
        this.multipleSelection = val
      },

      getSelectIds() {
        return this.multipleSelection.map(function (value) {
          return value.id
        });
      },

      findTagTree(){
        this.filter.params.tagCodes=[];
        tag.findOrgTag(this.orgCode).then(res=>{
          this.tagList=res.data;
        })
      },

      handleCreateLog(val){
        this.supplier=val.row;
        tag.allList().then(res=>{
          this.allTagList=res.data;
        });
        contact.selectAll(val.row.id).then(res=>{
          this.contactList=res.data;
        });
        this.dialogLogFormVisible=true;
      },

      commitLogData(){
        this.supplier.description=this.log.description;
        this.log.clientsupplierId=this.supplier.id;
        this.log.clientsupplierName=this.supplier.name;
        api.updateInfo(this.supplier).then(()=>{
          logApi.add(this.log).then(()=>{
            this.$message.success("添加成功");
            this.log={};
            this.dialogLogFormVisible=false;
            this.loadData();
          })
        }).catch(()=>{

        })
      },

      viewDetail(val) {
        this.$router.push({path: '/supplier/detail', query: {id: val.row.id}})
      },

      exportSupplier(){
        if(this.multipleSelection.length==0){
          this.$message.warning("请选择导出的客户信息")
        }else{
          let ids=this.getSelectIds();
          contact.download({url:'/api/client/supplier/export-supplier',data:ids,fileName:'导出客户.xls'});
        }
      },

      downloadTemplate() {
        api.batchExcelTemplate().then((res) => {
          downloadFile(res.data, "商家客户导入模板");
        })
      },

      handleUploadImgSuccess(res, file) {
        if (res.status === 1001) {
          this.$message({
            message: "登录过期，请重新登录",
            type: "error",
            duration: 5 * 1000
          })
          setTimeout(() => {
            store.dispatch("logOut")
          }, 5 * 1000)
        } else if (res.status === 0) {
          this.log.img = res.data;
          console.log(file)
        } else {
          this.$message({
            message: "上传文件失败",
            type: "error",
            duration: 5 * 1000
          })
        }
      },

      handleUploadAttachmentSuccess(res, file) {
        if (res.status === 1001) {
          this.$message({
            message: "登录过期，请重新登录",
            type: "error",
            duration: 5 * 1000
          })
          setTimeout(() => {
            store.dispatch("logOut")
          }, 5 * 1000)
        } else if (res.status === 0) {
          this.log.attachment = res.data;
          console.log(file)
        } else {
          this.$message({
            message: "上传文件失败",
            type: "error",
            duration: 5 * 1000
          })
        }
      },

      handleUploadSuccess(res) {
        if (res.status === 1001) {
          this.$message({
            message: "登录过期，请重新登录",
            type: "error",
            duration: 5 * 1000
          })
          setTimeout(() => {
            store.dispatch("logOut")
          }, 5 * 1000)
        } else if (res.status === 0) {
          this.$message.success("成功")
          this.loadData();
        } else {
          this.$message({
            message: "上传文件失败",
            type: "error",
            duration: 5 * 1000
          })
        }
      },
    }
  }
</script>

