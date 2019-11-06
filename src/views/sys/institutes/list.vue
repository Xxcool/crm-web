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
        <el-form-item label="上线合同签订日期">
          <el-date-picker v-model="filter.params.signBeginTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          type="date" placeholder="开始时间" style="width: 60%">
          </el-date-picker>
          -
          <el-date-picker v-model="filter.params.signEndTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          type="date" placeholder="结束时间" style="width: 60%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最近跟进日期">
          <el-date-picker v-model="filter.params.modifiedBeginTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          type="date" placeholder="开始时间" style="width: 60%">
          </el-date-picker>
          -
          <el-date-picker v-model="filter.params.modifiedEndTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          type="date" placeholder="结束时间" style="width: 60%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单位类型">
          <el-select v-model="filter.params.type">
            <el-option v-for="item in typeList" :key="item.id" :value="item.id" :label="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否入驻商城">
          <el-select v-model="filter.params.enter">
            <el-option label="请选择" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否上线">
          <el-select v-model="filter.params.onLine">
            <el-option label="已上线" value="1"></el-option>
            <el-option label="未上线" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.params.name" placeholder="请输入客户名称" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadData">搜索</el-button>
        </el-form-item>
        <br>
        <el-button v-has="'sys:institutes:list:_batch_allot'" @click="handleUpdateStatusByIds()"  type="primary">批量分配</el-button>
        <el-button v-has="'sys:institutes:list:_export'" @click="exportInstitutes"  type="primary">导出客户信息</el-button>
        <el-button v-has="'sys:institutes:list:_add'" @click="handleCreate()"  type="primary">新增院所</el-button>
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
            <el-button slot="reference" class="nowrap" v-has="'sys:institutes:list'" type="text" @click="viewDetail(scope)">{{scope.row.name}}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="单位类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type===1">科研院所</span>
          <span v-else-if="scope.row.type===2">高校</span>
          <span v-else-if="scope.row.type===3">医疗机构</span>
          <span v-else-if="scope.row.type===4">研发型企业</span>
          <span v-else-if="scope.row.type===5">其他</span>
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
        label="客户标签">
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
            <el-button v-has="'sys:institutes:list'" type="text" @click="viewDetail(scope)">{{scope.row.contactNumber}}</el-button>
          </template>
      </el-table-column>
      <el-table-column
        prop="person"
        label="客户负责">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.person}}</p>
            <div slot="reference" class="nowrap" v-has="'sys:institutes:list'" type="text" >{{scope.row.person}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="onLine"
        label="是否上线">
        <template slot-scope="scope">
          <span v-if="scope.row.onLine===0" class="status-2">未上线</span>
          <span v-else-if="scope.row.onLine===1" class="status-1">已上线</span>
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
        prop="contractSignTime"
        width="140"
        label="上线合同签订日期">
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
              <div slot="reference" class="nowrap" v-has="'sys:institutes:list'" type="text" >{{scope.row.description}}</div>
            </el-popover>
          </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button v-has="'sys:institutes:list:_allot'" type="primary" @click="handleUpdateStatus(scope)">分配</el-button>
          <el-button v-has="'sys:institutes:list:_track'" type="primary" @click="handleCreateLog(scope)">跟踪</el-button>
          <el-button v-has="'sys:institutes:list:_relevance'" type="primary" @click="handleRelevance(scope)">关联</el-button>
          <el-button v-has="'sys:institutes:list:_release'" type="primary" @click="handleFreed(scope)">释放</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > filter.count" :total="total" :page.sync="filter.page"
                :pageSize.sync="filter.count" @pagination="loadData"/>


    <el-dialog title="新增院所" width="40%" :visible.sync="dialogCreateFormVisible">
      <el-form ref="institutesForm" label-width="80px" :model="institutes" :rules="rules">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="institutes.name"></el-input>
        </el-form-item>
        <el-form-item label="院所类型">
          <el-select v-model="institutes.type">
            <el-option v-for="item in typeList" :key="item.id" :value="item.id" :label="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配送区" prop="stationId">
          <el-select
            v-model="institutes.stationId"
            filterable
            remote
            clearable
            placeholder="请选择"
            :remote-method="stationMethod"
            :loading="stationLoading">
            <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院所描述">
          <el-input type="textarea" v-model="institutes.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="客户分配" width="40%" :visible.sync="dialogAllotFormVisible">
    <el-form  label-width="80px" :model="institutes" :rules="rules">
      <el-form-item label="组织机构">
        <el-tree
          ref="orgTree"
          :data="orgList"
          show-checkbox
          node-key="code"
          :default-checked-keys="institutes.tagCodes"
          :props="props">
        </el-tree>
      </el-form-item>
      <el-form-item label="分配人员">
        <el-checkbox-group v-model="institutes.userIds">
          <el-checkbox v-for="item in userList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="分配备注">
        <el-input type="textarea" v-model="institutes.allotRemark"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogAllotFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="AllotData()">确 定</el-button>
    </div>
  </el-dialog>

    <el-dialog title="客户分配" width="40%" :visible.sync="dialogAllotsFormVisible">
      <el-form  label-width="80px" :model="institutes" :rules="rules">
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
          <el-checkbox-group v-model="institutes.userIds">
            <el-checkbox v-for="item in userList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="分配备注">
          <el-input type="textarea" v-model="institutes.allotRemark"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAllotsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AllotsData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="客户行为跟踪" width="40%" :visible.sync="dialogLogFormVisible" @close='closeDialog'>
      <el-form ref="logForm" label-width="80px" :model="log" :rules="logFormRules">
        <el-form-item label="跟踪行为" prop="trackDoings">
          <el-select v-model="log.trackDoings" clearable>
            <el-option v-for="item in allTagList" :key="item.name" :value="item.name" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否上线">
          <el-radio-group v-model="onLine" @change="checkLine()">
            <el-radio :value="1" :label="1">是</el-radio>
            <el-radio :value="0" :label="0">否</el-radio>
          </el-radio-group>
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
          <el-upload class="upload-demo" v-if="dialogLogFormVisible" ref="upload" action="/api/common/upload/1"
                     :on-success="uploadAttachment" :multiple=false>
            <el-button slot="trigger" size="small" type="primary" @click="clearUploadedImage">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="上线合同"  v-if="showContract">
          <el-upload class="upload-demo" v-if="dialogLogFormVisible" ref="upload" action="/api/common/upload/1" :on-success="uploadContractAttachment" :multiple=false>
            <el-button slot="trigger" size="small" type="primary" @click="clearUploadedAttachment">点击上传</el-button>
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

    <el-dialog title="系统院所关联" width="40%" :visible.sync="dialogRelevanceFormVisible">
      <el-form ref="relevanceInstitutesForm" label-width="80px" :model="relevance" :rules="rules" :inline="true">
        <el-form-item label="院所名称">
          <el-input v-model="relevance.params.name" placeholder="输入院所名称搜索" style="max-width: 180px;width: 180px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadInstitutesData">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="institutesData"
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
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="单位类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type===1">科研院所</span>
            <span v-else-if="scope.row.type===2">高校</span>
            <span v-else-if="scope.row.type===3">医疗机构</span>
            <span v-else-if="scope.row.type===4">研发型企业</span>
            <span v-else-if="scope.row.type===5">其他</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.id===institutes.institutesId">
              <el-button type="primary" @click="cancelRelevance(scope)">取消关联</el-button>
            </div>
            <div v-else-if="scope.row.id!==institutes.institutesId">
              <el-button type="primary" @click="relevances(scope)">关联</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="relevanceTotal > relevance.count" :total="relevanceTotal" :page.sync="relevance.page"
                  :pageSize.sync="relevance.count" @pagination="loadInstitutesData"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRelevanceFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRelevance()">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="客户释放" width="40%" :visible.sync="dialogFreedFormVisible">
      <el-form  label-width="100px" :model="institutes" >
        <el-form-item label="释放后所属组织">
          <span>{{institutes.userOrgName}}</span>
        </el-form-item>
        <el-form-item label="释放后所属人">
          <span>{{institutes.userName}}</span>
        </el-form-item>
        <el-form-item label="释放原因">
          <el-input type="textarea" v-model="institutes.freedRemark"></el-input>
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
  import api from "../../../api/sys/institutes"
  import org from "../../../api/sys/org"
  import tag from "../../../api/sys/tag"
  import station from "../../../api/sys/station"
  import user from "../../../api/sys/user"
  import selectTree from '../../../components/selectTree/index.vue'
  import store from '../../../store/index'
  import logApi from "../../../api/sys/log"
  import contact from "../../../api/sys/contact"

  export default {
    name: "list",
    components: {selectTree},
    data() {
      return {
        tableData: [],
        institutesData:[],
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
            signBeginTime:null,
            signEndTime:null,
            modifiedBeginTime:null,
            modifiedEndTime:null,
            type:null,
            onLine:null,
            enter:null,
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
            name:null
          }
        },
        relevanceTotal:0,
        loading: true,
        typeList:[],
        institutes:{
          id:null,
          institutesId:null,
          onLine:null,
          name:null,
          userName:null,
          userOrgName:null,
          type:null,
          stationId:null,
          remark:null,
          allotRemark:null,
          freedRemark:null,
          ids:null,
          orgCodes:[],
          userIds:[]
        },
        onLine:0,
        log:{
          clientInstitutesId:null,
          clientInstitutesName:null,
          entryPerson:null,
          trackDoings:null,
          contactPerson:null,
          img:null,
          attachment:null,
          contractAttachment:null,
          remark:null,
          description:null
        },
        logFormRules: {
          trackDoings: [{required: true, message: '不能为空', trigger: 'change'}],
        },
        stationList: [],
        dialogCreateFormVisible:false,
        dialogAllotFormVisible:false,
        dialogAllotsFormVisible:false,
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
        showContract:false,
        props:{
          label:"name"
        },
        imgList:[],
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
        this.typeList = api.typeList();
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
        this.institutes={
          id:null,
            name:null,
            type:null,
            stationId:null,
            remark:null,
            allotRemark:null,
            ids:[],
            orgCodes:[],
            userIds:[]
        };
        this.dialogCreateFormVisible = true;
      },
      createData() {
        this.$refs.institutesForm.validate(valid => {
          if (valid) {
            api.add(this.institutes).then(() => {
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
        this.institutes.remark=this.institutes.allotRemark;
        this.institutes.orgCodes=this.$refs.orgTree.getCheckedKeys();
        api.updateStatusById(this.institutes).then(()=>{
          this.$message.success("分配成功");
          this.loadData();
        }).catch(()=>{

        })
      },
      AllotsData(){
        this.dialogAllotsFormVisible=false;
        this.institutes.remark=this.institutes.allotRemark;
        this.institutes.orgCodes=this.$refs.orgTree.getCheckedKeys();
        this.institutes.ids=this.getSelectIds();
        api.updateStatusByIds(this.institutes).then(()=>{
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
        this.institutes.id=val.row.id;
        this.institutes.tagCodes = val.row.orgCodes
        this.dialogAllotFormVisible=true;
      },
      handleUpdateStatusByIds(){
        if(this.multipleSelection.length===0){
          this.dialogAllotsFormVisible=false;
          this.$message.warning("请选择要分配的院所")
        }else {
          this.dialogAllotsFormVisible=true;
        }
      },

      loadInstitutesData(){
        api.institutesList(this.relevance).then(res=>{
          this.institutesData=res.data.results;
          this.relevanceTotal=res.data.count;
        }).catch(()=>{

        });
      },
      handleRelevance(val){
        this.institutes=val.row;
        this.loadInstitutesData();
        this.dialogRelevanceFormVisible=true;
      },
      relevances(val){
        this.institutes.institutesId=val.row.id;
        api.relevance(this.institutes).then(()=>{
          this.$message.success("关联成功");
          this.loadInstitutesData();
        }).catch(()=>{
        })
      },

      saveRelevance(){
        this.dialogRelevanceFormVisible=false;
        this.loadData();
      },

      cancelRelevance(){
        this.institutes.institutesId=0;
        api.relevance(this.institutes).then(()=>{
          this.$message.success("取消关联成功");
          this.loadInstitutesData();
        }).catch(()=>{
        })
      },
      handleFreed(val){
        this.institutes=val.row;
        console.log(this.institutes);
        this.dialogFreedFormVisible=true;
      },

      freedData(){
        this.institutes.remark=this.institutes.freedRemark;
        api.updateStatus(this.institutes).then(()=>{
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
        this.institutes=val.row;
        tag.getOrgTagTreeByInstitutesId(val.row.id).then(res=>{
          this.allTagList=res.data;
        });
        contact.selectAll(val.row.id).then(res=>{
          this.contactList=res.data;
        });
        this.log = {
          clientInstitutesId: null,
          clientInstitutesName: null,
          entryPerson: null,
          trackDoings: null,
          contactPerson: null,
          img: null,
          attachment: null,
          contractAttachment: null,
          remark: null,
          description: null
        };
        this.dialogLogFormVisible=true;
      },

      checkLine(){
        if(this.onLine===0){
          this.log.contractAttachment=null;
          this.showContract=false;
        }else{
          this.showContract=true;
        }
      },

      commitLogData(){
        this.$refs.logForm.validate(valid => {
          if (valid) {
            this.institutes.onLine=this.onLine;
            this.institutes.description=this.log.description;
            this.log.clientInstitutesId=this.institutes.id;
            this.log.clientInstitutesName=this.institutes.name;
            api.updateByOnLine(this.institutes).then(()=>{
              logApi.add(this.log).then(()=>{
                this.$message.success("添加成功");
                this.log={
                  clientInstitutesId:null,
                  clientInstitutesName:null,
                  entryPerson:null,
                  trackDoings:null,
                  contactPerson:null,
                  img:null,
                  attachment:null,
                  contractAttachment:null,
                  remark:null,
                  description:null
                };
                this.dialogLogFormVisible=false;
                this.loadData();
              })
            }).catch(()=>{

            })
          }
        })
      },

      exportInstitutes(){
        if(this.multipleSelection.length==0){
          this.$message.warning("请选择导出的客户信息")
        }else{
          let ids=this.getSelectIds();
          contact.download({url:'/api/client/institutes/export-institutes',data:ids,fileName:'导出客户.xls'});
        }

      },

      viewDetail(val) {
        this.$router.push({path: '/institutes/detail', query: {id: val.row.id}})
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

      uploadContractAttachment(res, file) {
        if (res.status === 0) {
          this.log.contractAttachment = res.data;
        } else {
          this.$message({
            message: "上传文件失败",
            type: "error",
            duration: 5 * 1000
          })
        }
      },
      clearUploadedAttachment () {
        this.$refs.upload.clearFiles();
        this.log.contractAttachment = null;
      },

      uploadAttachment(res) {
        if (res.status === 0) {
          this.log.attachment = res.data;
        } else {
          this.$message({
            message: "上传文件失败",
            type: "error",
            duration: 5 * 1000
          })
        }
      },
      clearUploadedImage () {
        this.$refs.upload.clearFiles();
        this.log.attachment = null;
      },
      closeDialog(){
        this.$refs.logForm.resetFields();
        this.dialogLogFormVisible=false;
      }
    }
  }
</script>

