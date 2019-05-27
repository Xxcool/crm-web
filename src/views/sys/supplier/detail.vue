<template>
  <div>
    <el-tabs type="border-card" >
      <el-tab-pane label="客户信息" >
        <div>
          <el-row>
            <el-col :span="12">
              <el-form  v-model="supplier" v-if="showsupplier">
                <el-form-item label="客户标签">
                  <span v-for="item in supplier.tagNames" :key="item" :value="item" style="padding-right: 10px">{{item}}</span>
                </el-form-item>
                <el-form-item label="客户类型">
                  <span >商家客户</span>
                </el-form-item>
                <el-form-item label="商家名称">
                  <span >{{supplier.name}}</span>
                </el-form-item>
                <el-form-item label="商家描述">
                  <span >{{supplier.remark}}</span>
                </el-form-item>
                <el-form-item label="配送区">
                  <span v-for="item in supplier.stationNames" :key="item" class="padding-rigth">{{item}}</span>
                </el-form-item>
                <el-form-item>
                  <el-button @click="handlesupplierStatus"  type="primary">编辑</el-button>
                </el-form-item>
              </el-form>
              <el-form  v-model="supplier" v-if="showsupplierUpd">
                <el-form-item label="客户标签">
                  <span v-for="item in supplier.tagNames"  :key="item" :value="item" style="padding-right: 10px" >{{item}}</span>
                </el-form-item>
                <el-form-item label="客户类型">
                  <span >商家客户</span>
                </el-form-item>
                <el-form-item label="客户名称">
                  <el-input  v-model="supplier.name"></el-input>
                </el-form-item>
                <el-form-item label="商家描述">
                  <el-input type="textarea" v-model="supplier.description" style="width: 80%"></el-input>
                </el-form-item>

                <el-form-item label="配送区" >
                  <el-checkbox-group v-model="supplier.stationIds">
                    <el-checkbox v-for="item in stationList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                  <el-button @click="handleCommitsupplier"  type="primary">保存</el-button>
                  <el-button @click="handlesupplierUpdStatus" >取消</el-button>
                </el-form-item>
              </el-form>

            </el-col>
            <el-col :span="12">
              <el-form ref="tagForm"  label-position="left" label-width="100px"
                       style="width: 400px; margin-left:100px;">
                <el-form-item label="客户标签">
                  <el-tree
                    ref="tagTree"
                    :data="tagList"
                    show-checkbox
                    node-key="code"
                    :default-checked-keys="supplier.tagCodes"
                    :props="props">
                  </el-tree>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="联系人">
        <div class="tools">
          <el-form :inline=true v-model="contacts.params">
            <el-form-item label="性别">
              <el-select v-model="contacts.params.sex" clearable placeholder="请选择">
                <el-option label="男" :value="0"></el-option>
                <el-option label="女" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入联系人名称" v-model="contacts.params.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loadContactData">搜索</el-button>
            </el-form-item>
            <br>
            <el-button @click="toOssContact"  type="primary">同步oss系统联系人</el-button>
            <el-button  @click="exportContact" type="primary">导出联系人信息</el-button>
            <el-button @click="handleCreate()"  type="primary">新增联系人</el-button>
            <el-button @click="goBack(true)">返回</el-button>
          </el-form>
        </div>
        <el-table
          :data="concatTableData"
          border
          v-loading="loading"
          element-loading-text="拼命加载中..."
          @selection-change="selectChange"
          style="width: 100%">
          <el-table-column prop="id" type="selection" width="40"> </el-table-column>
          <el-table-column prop="id" label="ID"  width="80"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.sex===0">男</span>
              <span v-else-if="scope.row.sex===1">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机" ></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button v-has="'supplier:supplier:edit'" type="primary" @click="handelContactView(scope)">查看</el-button>
              <el-button v-has="'supplier:supplier:edit'" type="primary" @click="handelContactUpdate(scope)">编辑</el-button>
              <el-button v-has="'supplier:supplier:edit'" type="danger" @click="handleContactDel(scope.row)" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="contactTotal > contacts.count" :total="contactTotal" :page.sync="contacts.page" :pageSize.sync="contacts.count" @pagination="loadContactData"/>
      </el-tab-pane>
      <el-tab-pane label="跟踪信息">
        <div class="tools">
          <el-form :inline=true v-model="log">
            <el-form-item label="客户联系人">
              <el-select v-model="log.contactPerson" clearable>
                <el-option v-for="item in contactList" :key="item.name" :value="item.name" :label="item.name">{{item.name}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入行为关键字" v-model="log.trackDoings"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="selectLogBysupplier">搜索</el-button>
            </el-form-item>
            <br>
            <el-form-item>
              <el-button v-has="'supplier:supplier:edit'" type="primary" @click="handleCreateLog()">添加跟踪信息</el-button>
              <el-button @click="goBack(true)">返回</el-button>
            </el-form-item>
          </el-form>
          <div>
            <el-timeline>
              <el-timeline-item  v-for="(item,index) in logData" :key="index">
                <el-card>
                  <div class="info-title"><span class="padding-rigth">{{item.created}}</span><span class="padding-rigth">录入人：{{item.entryPerson}}</span><span class="padding-rigth">跟踪行为：{{item.trackDoings}}</span><span class="padding-rigth">客户联系人：{{item.contactPerson}}</span></div>
                  <div class="info-title"><span class="padding-rigth">{{item.description}}</span></div>
                  <div class="info-title">
                    <a class="padding-rigth" v-if="item.img" :value="item.img" :href="item.img">附件图片</a>
                    <a class="padding-rigth" v-if="item.attachment" :value="item.attachment" :href="item.attachment">附件文件</a>
                  </div>
                </el-card>

              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关联信息">
        <el-form v-if="supplier.supplierId===0">
          <el-form-item label="关联信息">
            <span style="color: red">暂未关联商家，无关联信息</span>
          </el-form-item>
        </el-form>

        <el-form v-if="supplier.supplierId!==0">
          <el-form-item label="关联商家">
            <span>{{supplier.supplierName}}</span>
          </el-form-item>
          <el-form-item label="关联信息">
            <el-button type="text">基本信息</el-button>
            <el-button type="text">合同信息</el-button>
            <el-button type="text">评价信息</el-button>
            <el-button type="text">财务数据</el-button>
            <el-button type="text">客服反馈</el-button>
            <el-button type="text">定期业绩统计</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="contactTitle[titleType]" width="40%" :visible.sync="dialogContactFormVisible">
      <el-form ref="contactForm" label-width="80px" :model="contactData" :rules="rules" :disabled="contactDisabled">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="contactData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="contactData.sex"  clearable>
            <el-option :value="0" label="男"></el-option>
            <el-option :value="1" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="称呼">
          <el-input v-model="contactData.appellation"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="contactData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="contactData.email"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="contactData.qq"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="contactData.weChat"></el-input>
        </el-form-item>
        <el-form-item label="座机">
          <el-input v-model="contactData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="contactData.birthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          type="date"  style="width: 60%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="contactData.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="showContact">
        <el-button @click="dialogContactFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createContactData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="客户行为跟踪" width="40%" :visible.sync="dialogLogFormVisible">
      <el-form ref="logForm" label-width="80px" :model="log">
        <el-form-item label="跟踪行为">
          <el-select v-model="log.adTrackDoings" clearable>
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

  </div>
</template>

<script>
  import api from "../../../api/sys/supplier"
  import contact from "../../../api/sys/supplierContact"
  import station from "../../../api/sys/station"
  import tag from "../../../api/sys/tag"
  import store from '../../../store/index'
  import logApi from "../../../api/sys/supplierLog"
  export default {
    name: "supplier_detail",
    data() {
      return {
        loading:true,
        clientSupplierId:null,
        supplier: {
          id:null,
          supplierId:null,
          supplierName:null,
          name:null,
          stationIds:[],
          stationNames:[],
          tagNames:null,
          description:null,
          tagCodes:[],
        },
        typeList:[],
        tagList:[],
        props:{
          label:"name"
        },
        concatTableData:[],
        multipleSelection:[],
        stationList:[],
        contacts:{
          count: 10, // 页大小
          page: 1, // 当前页
          sort: '',
          order: '',
          params:{
            clientSupplierId:0,
            sex:null,
            name:null
          }
        },
        log:{
          img:null,
          attachment:null,
          contractAttachment:null,
          adTrackDoings:null,
          clientSupplierId:null,
          contactPerson:null,
          trackDoings:null
        },
        logData:[],
        contactTotal:0,
        contactList:[],
        allTagList:[],
        contactData:{
          id:null,
          clientSupplierId:null,
          name:null,
          sex:null,
          appellation:null,
          birthday:null,
          mobile:null,
          qq:null,
          weChat:null,
          phoneNumber:null,
          remark:null,
          email:null
        },
        rules:{
          name:[{required:true,message:'不能为空',trigger:'change'}],
          sex:[{required:true,message:'不能为空',trigger:'change'}]
        },
        contactTitle:{
          create:'新增联系人',
          view:'查看联系人',
          update:'修改联系人'
        },
        titleType:'create',
        showContact:false,
        contactDisabled:true,
        showsupplier:true,
        showsupplierUpd:false,
        stationLoading:true,
        dialogContactFormVisible:false,
        dialogLogFormVisible:false
      }
    },
    created() {
      if (this.$route.query.id) {
        this.loadContactData();
      }

    },
    methods: {
      loadContactData(){
          this.loading=true;
        api.findById(this.$route.query.id).then(res => {
          this.supplier = res.data;
        }).catch(()=>{
        });
        this.clientSupplierId=this.$route.query.id;
        this.contacts.params.clientSupplierId=this.clientSupplierId;
        this.stationMethod();
        contact.list(this.contacts).then(res=>{
          this.concatTableData=res.data.results;
          this.loading=false;
        }).catch(()=>{
          this.loading=false;
        });
        this.handleTag();
        this.selectContactAll();
        this.selectLogBysupplier();
      },
      handleCreate(){
        this.beforeContact();
        this.titleType='create';
        this.showContact=true;
        this.contactDisabled=false;
        this.dialogContactFormVisible=true;

      },
      createContactData(){
        this.contactData.clientSupplierId=this.clientSupplierId;
        contact.add(this.contactData).then(()=>{
          this.$message.success("添加成功");
          this.loadContactData();
          this.dialogContactFormVisible=false;
        }).catch(()=>{
        })
      },
      handleContactDel(row){
        this.$confirm('是否删除联系人【' + row.name + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          contact.del(row.id).then(()=>{
            this.$message.success("删除成功");
            this.loadContactData();
          }).catch(()=>{
          })
        });
      },
      handelContactView(scope){
        this.beforeContact();
        this.contactData=scope.row;
        this.titleType='view';
        this.showContact=false;
        this.contactDisabled=true;
        this.dialogContactFormVisible=true;

      },
      handelContactUpdate(scope){
        this.beforeContact();
        this.contactDisabled=false;
        this.contactData=scope.row;
        this.titleType='update';
        this.showContact=true;
        this.dialogContactFormVisible=true;
      },
      beforeContact(){
        this.contactData={
          id:null,
          clientSupplierId:null,
          name:null,
          sex:null,
          appellation:null,
          birthday:null,
          mobile:null,
          qq:null,
          weChat:null,
          phoneNumber:null,
          remark:null,
          email:null
        };
      },
      handlesupplierStatus(){
        this.showsupplier=false;
        this.showsupplierUpd=true;
      },
      handlesupplierUpdStatus(){
        this.showsupplier=true;
        this.showsupplierUpd=false;
      },
      handleCommitsupplier(){
        this.supplier.tagCodes=this.$refs.tagTree.getCheckedKeys();
        api.update(this.supplier).then(()=>{
          this.$message.success("保存成功");
          this.loadContactData();
          this.handlesupplierUpdStatus();
        }).catch(()=>{
        })
      },
      selectChange(val) {
        this.multipleSelection = val
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
      handleTag() {
        tag.tree().then(res => {
          this.tagList = res.data;
        });
      },
      selectContactAll(){
        contact.selectAll(this.clientSupplierId).then(res=>{
          this.contactList=res.data;
        })
      },
      selectLogBysupplier(){
        this.log.clientSupplierId=this.clientSupplierId;
        logApi.selectBysupplier(this.log).then(res=>{
          this.logData=res.data;
        }).catch(()=>{
        })
      },

      commitLogData(){
        this.log.trackDoings = this.log.adTrackDoings;
        this.log.clientSupplierId=this.supplier.id;
        this.log.clientsupplierName=this.supplier.name;
        logApi.add(this.log).then(()=>{
          this.$message.success("添加成功");
          this.log={};
          this.dialogLogFormVisible=false;
          this.loadContactData();
        })
      },
      handleCreateLog(){
        tag.allList().then(res=>{
          this.allTagList=res.data;
        });
        this.selectContactAll();
        this.dialogLogFormVisible=true;
      },
      goBack(state){
        this.$store.dispatch("delView", this.$route).then(() => {
          this.$router.push({name: "supplier_list",params:{noKeep:state}})
        })
      },
      toOssContact(){
        if(this.supplier.supplierId===0){
          this.$message.warning("请先关联oss商家");
        }else{
          this.beforeContact();
          contact.ossMemberList(this.supplier.supplierId).then(res=>{
            this.contactData.clientSupplierId=this.clientSupplierId;
            this.contactData.name=res.data.contactMan;
            this.contactData.mobile=res.data.mobile;
            this.contactData.appellation=res.data.contactMan;
            contact.add(this.contactData).then(()=>{
              this.$message.success("同步成功");
              this.loadContactData();
            }).catch(()=>{
            })
          }).catch(()=>{
          })

        }
      },

      exportContact(){
        if(this.multipleSelection.length==0){
          this.$message.warning("请选择导出的客户信息")
        }else{
          let ids=this.getCheckedIds();
          contact.download({url:'/api/client/supplier/contact/export-contact',data:ids,fileName:'导出联系人.xls'});
        }
      },

      getCheckedIds(){
        return this.multipleSelection.map(value => {
          return value.id
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

      handleUploadContractSuccess(res, file) {
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
          this.log.contractAttachment = res.data;
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
      }
    }
  }
</script>

