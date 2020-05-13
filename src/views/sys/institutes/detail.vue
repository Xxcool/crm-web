<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="客户信息">
        <div>
          <el-row>
            <el-col :span="12">
              <el-form v-model="institutes">

                <el-form-item label="客户类型">
                  <span>院所客户</span>
                </el-form-item>
                <el-form-item label="客户名称">
                  <el-input v-model="institutes.name" @blur="nameBlur"></el-input>
                </el-form-item>
                <el-form-item label="院所描述">
                  <el-input type="textarea" v-model="institutes.remark" style="width: 80%"></el-input>
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
                    <el-option v-for="item in stationList" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="别名">
                  <el-input v-model="institutes.anotherName" ></el-input>
                </el-form-item>
                <el-form-item label="分配人员">
                  <span>{{institutes.person||""}}</span>
                </el-form-item>
                <el-form-item label="所在地">
                  <el-cascader
                    expand-trigger="hover"
                    :options="options"
                    v-model="areaSelect"
                    @change="handleChange">
                  </el-cascader>
                </el-form-item>
                <el-form-item label=" 意向度">
                  <el-select v-model="institutes.intention" placeholder="请选择">
                    <el-option label="一个月内签约" :value="0"></el-option>
                    <el-option label="三个月内签约" :value="1"></el-option>
                    <el-option label="高合作意向" :value="2"></el-option>
                    <el-option label="有了解意愿" :value="3"></el-option>
                    <el-option label="拒绝/排斥合作" :value="4"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否上线">
                  <el-radio-group v-model="institutes.onLine" >
                    <el-radio :value="1" :label="1">是</el-radio>
                    <el-radio :value="0" :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="合同到期日期" v-show="institutes.onLine==1">
                  <el-date-picker
                   v-model="institutes.contractSignTime"
                   type="date"
                   format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                   placeholder="选择日期">
                 </el-date-picker>
                 至
                 <el-date-picker
                   v-model="institutes.contractEndTime"
                   type="date"
                   format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                   placeholder="选择日期">
                 </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button @click="handleCommitInstitutes" type="primary">保存</el-button>
                  <el-button @click="handleInstitutesUpdStatus">取消</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form label-position="left" label-width="100px"
                       style="width: 400px; margin-left:100px;">
                <el-form-item label="选择客户标签">
                  <div v-for="(tag, index) in tagList" :key="index">
                    <el-checkbox v-model="tag.checked" :disabled="tag.alreadyChecked">{{tag.name}}</el-checkbox>
                    <el-select v-model="tag.parentCode" placeholder="请选择开展进度" v-show="tag.checked" :disabled="tag.alreadyChecked">
                      <el-option
                        v-for="item in businessTagList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button @click="tagCommit" type="primary">保存</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="联系人">
        <div class="tools">
          <el-form :inline=true v-model="contacts.params">
            <el-button v-has="'institutes:institutes:sync'" @click="toOssContact" type="primary">同步oss系统联系人</el-button>
            <el-button v-has="'institutes:institutes:out'" @click="exportContact" type="primary">导出联系人信息</el-button>
            <el-button v-has="'institutes:institutes:add'" @click="handleCreate()" type="primary">新增联系人</el-button>
            <el-button  @click="goBack(true)">返回</el-button>
            <div style="margin-top:10px;">
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
            </el-form-item></div>
          </el-form>
        </div>
        <el-table
          :data="concatTableData"
          border
          v-loading="loading"
          element-loading-text="拼命加载中..."
          @selection-change="selectChange"
          style="width: 100%">
          <el-table-column prop="id" type="selection" width="40"></el-table-column>
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.sex===0">男</span>
              <span v-else-if="scope.row.sex===1">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机">
            <template slot-scope="scope">
              <span v-if="(scope.row.showStatus==0)&&(checkList.indexOf(scope.row.addUserId)==-1)">***********</span>
              <span v-else>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱">
            <template slot-scope="scope">
              <span v-if="(scope.row.showStatus==0)&&(checkList.indexOf(scope.row.addUserId)==-1)">***********</span>
              <span v-else>{{scope.row.email}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="addUserName" label="添加人"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="primary" @click="handelContactView(scope)">查看
              </el-button>
              <el-button v-has="'institutes:institutes:edit'" type="primary" @click="handelContactUpdate(scope)" :disabled="checkList.indexOf(scope.row.addUserId)==-1">编辑
              </el-button>
              <el-button v-has="'institutes:institutes:del'" type="danger" @click="handleContactDel(scope.row)" :disabled="checkList.indexOf(scope.row.addUserId)==-1">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="contactTotal > contacts.count" :total="contactTotal" :page.sync="contacts.page"
                    :pageSize.sync="contacts.count" @pagination="loadContactData"/>
      </el-tab-pane>
      <el-tab-pane label="跟踪信息">
        <div class="tools">
          <el-form :inline=true v-model="log">
            <el-form-item label="客户联系人">
              <el-select v-model="log.contactPerson" clearable>
                <el-option v-for="item in contactList" :key="item.name" :value="item.name" :label="item.name">
                  {{item.name}}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入行为关键字" v-model="log.trackDoings"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="selectLogByInstitutes">搜索</el-button>
            </el-form-item>
            <br>
            <el-form-item>
              <el-button v-has="'institutes:institutes:add_track'" type="primary" @click="handleCreateLog()">添加跟踪信息</el-button>
              <el-button @click="goBack(true)">返回</el-button>
            </el-form-item>
          </el-form>
          <div>
            <el-timeline>
              <el-timeline-item v-for="(item,index) in logData" :key="index">
                <el-card>
                  <div class="info-title"><span class="padding-rigth">{{item.created}}</span>
                    <span class="padding-rigth">录入人：{{item.entryPerson}}</span>
                    <span class="padding-rigth">开发范围：{{item.trackDoings}}</span>
                    <span class="padding-rigth">业务进度：{{item.businessTrackDoings}}</span>
                    <span class="padding-rigth">客户联系人：{{item.contactPerson}}</span>
                    <span class="padding-rigth" v-if="item.visitType === 0">拜访形式：电话</span>
                    <span class="padding-rigth" v-if="item.visitType === 1">拜访形式：微信</span>
                    <span class="padding-rigth" v-if="item.visitType === 2">拜访形式：面访</span>

                  </div>
                  <div class="info-title"><span class="padding-rigth">{{item.description}}</span></div>
                  <div class="info-title">
                    <a class="padding-rigth" target="_blank" v-if="item.img" :value="item.img" :href="item.img">附件图片</a>
                    <a class="padding-rigth" target="_blank" v-if="item.attachment" :value="item.attachment" :href="item.attachment">附件文件</a>
                    <a class="padding-rigth" target="_blank" v-if="item.contractAttachment" :value="item.contractAttachment" :href="item.contractAttachment">合同文件</a>
                  </div>
                </el-card>

              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关联信息">
        <el-form v-if="institutes.institutesId===0">
          <el-form-item label="关联信息">
            <span style="color: red">暂未关联院所，无关联信息</span>
          </el-form-item>
        </el-form>

        <el-form v-if="institutes.institutesId!==0">
          <el-form-item label="关联院所">
            <span>{{institutes.institutesName}}</span>
          </el-form-item>
          <el-form-item label="关联信息"></el-form-item>
          <el-form-item>
            <el-tabs>
              <el-tab-pane label="基本信息">
                <el-form label-width="110px">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="客户名称">
                        {{ins.name}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="单位类型">
                        <span v-if="ins.type == 1">
                          科研院所
                        </span>
                        <span v-if="ins.type == 2">
                          高校
                        </span>
                        <span v-if="ins.type == 3">
                          医疗机构
                        </span>
                        <span v-if="ins.type == 4">
                          研发型企业
                        </span>
                        <span v-if="ins.type == 5">
                          其他
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="会员默认配送区">
                        {{station.name}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="结算方式">
                        <span v-if="ins.settleType == 1">
                          分类
                        </span>
                        <span v-if="ins.settleType == 2">
                          汇总
                        </span>
                        <span v-if="ins.settleType == 3">
                          明细
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="验货方式">
                        <span v-if="ins.defaultCheckType == 0">
                          研究所统一
                        </span>
                        <span v-if="ins.defaultCheckType == 1">
                          不控制
                        </span>
                        <span v-if="ins.defaultCheckType == 2">
                          账户选择验货
                        </span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="代结算商家范围">
                        {{ins.settleSupplierTarget}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="采购单位状态">
                        <span v-if="ins.status == 0">
                          未启用
                        </span>
                        <span v-if="ins.status == 2">
                          测试
                        </span>
                        <span v-if="ins.status == 1">
                          正常
                        </span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="添加人">
                        {{ins.addrName}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="采购单位来源">
                        {{ins.source}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="客服部入驻方式">
                        <span v-if="ins.customerEnterType == 0">
                          测试
                        </span>
                        <span v-if="ins.customerEnterType == 1">
                          零散
                        </span>
                        <span v-if="ins.customerEnterType == 2">
                          鼓励政策
                        </span>
                        <span v-if="ins.customerEnterType == 3">
                          整体上线
                        </span>
                        <span v-if="ins.customerEnterType == 4">
                          绿色通道
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="市场部入驻方式">
                        <span v-if="ins.marketEnterType == 0">
                          测试
                        </span>
                        <span v-if="ins.marketEnterType == 1">
                          零散
                        </span>
                        <span v-if="ins.marketEnterType == 2">
                          鼓励政策
                        </span>
                        <span v-if="ins.marketEnterType == 3">
                          整体上线
                        </span>
                        <span v-if="ins.marketEnterType == 4">
                          绿色通道
                        </span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="市场部入驻日期">
                        <span v-if="ins.marketEnterYear != null">
                          {{ins.marketEnterYear}}年
                        </span>
                        <span v-if="ins.marketEnterMonth != null">
                          {{ins.marketEnterMonth}}月
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="所属大区">
                        {{ins.bigArea}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="隶属组织">
                        {{ins.org2018}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="隶属负责人">
                        {{ins.head2018}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="所属分站">
                        {{ins.station2018}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="所在地">
                        {{ins.vatRegAddr}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="是否属于广州惠通">
                        <span v-if="ins.gzht == 0">
                          不属于
                        </span>
                        <span v-if="ins.gzht == 1">
                          属于
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="添加时间">
                        {{ins.addTime}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="评级信息">
                <el-table
                  :data="tableData"
                  border
                  stripe
                  v-loading="loading"
                  element-loading-text="拼命加载中...">
                  <el-table-column prop="nickName" label="用户名"></el-table-column>
                  <el-table-column prop="taskName" label="课题组"></el-table-column>
                  <el-table-column prop="mobile" label="手机号"></el-table-column>
                  <el-table-column prop="gradeName" label="等级名称"></el-table-column>
                  <el-table-column prop="percent" label="优惠百分比"></el-table-column>
                  <el-table-column prop="coefficient" label="成长系数"></el-table-column>
                  <el-table-column prop="totalGrowth" label="会员成长总值"></el-table-column>
                  <el-table-column label="操作" width="140" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="primary" @click="contractDetail(scope)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <pagination v-show="account.total > account.count" :total="account.total" :page.sync="account.page"
                            :pageSize.sync="account.count" @pagination="accountNumberList"/>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>

        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="contactTitle[titleType]" width="40%" :visible.sync="dialogContactFormVisible">
      <el-form ref="contactForm" label-width="80px" :model="contactData" :rules="contactRules" :disabled="contactDisabled">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="contactData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="contactData.sex" clearable>
            <el-option :value="0" label="男"></el-option>
            <el-option :value="1" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门/职务" prop="departmentId">
          <el-select v-model="contactData.departmentId"  placeholder="请选择部门" @change="departmentChange">
            <el-option
              v-for="item in department"
              :key="item.id"
              :label="item.department"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="contactData.jobTitleId" placeholder="请选择职务">
            <el-option
              v-for="item in jobTitle"
              :key="item.id"
              :label="item.jobTitle"
              :value="item.id">
            </el-option>
          </el-select>
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
                          type="date" style="width: 60%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否公开">
          <template>
            <el-radio v-model="contactData.showStatus" :label="1">是</el-radio>
            <el-radio v-model="contactData.showStatus" :label="0">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="contactData.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="showContact">
        <el-button @click="dialogContactForm()">取 消</el-button>
        <el-button type="primary" @click="createContactData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="客户行为跟踪" width="40%" :visible.sync="dialogLogFormVisible" @close='closeDialog'>
      <el-form ref="logForm" label-width="80px" :model="log" :rules="logFormRules">
        <el-form-item label="业务范围" prop="trackDoings">
          <el-select v-model="log.trackDoings" clearable @change="developChange($event)">
            <el-option v-for="item in allTagList" :key="item.code" :value="item.code" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开展进度" prop="businessTrackDoings">
          <el-select v-model="log.businessTrackDoings" clearable>
            <el-option v-for="item in filterTagList" :key="item.code" :value="item.code" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结果描述" prop="description">
          <el-input type="textarea" v-model="log.description"></el-input>
        </el-form-item>
        <el-form-item label="跟踪日期" prop="trackDate">
          <el-date-picker v-model="log.trackDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期时间"></el-date-picker>
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
        <el-form-item label="联系人选择" prop="contactPerson">
          <el-cascader
              v-model="log.contactPerson"
              :options="cascaderList" :show-all-levels="false"></el-cascader>
        </el-form-item>
        <el-form-item label="拜访形式" prop="visitType">
          <el-select v-model="log.visitType" clearable>
            <el-option label="电话" :value="0"></el-option>
            <el-option label="微信" :value="1"></el-option>
            <el-option label="面访" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" 意向度">
          <el-select v-model="log.intention" placeholder="请选择">
            <el-option label="一个月内签约" :value="0"></el-option>
            <el-option label="三个月内签约" :value="1"></el-option>
            <el-option label="高合作意向" :value="2"></el-option>
            <el-option label="有了解意愿" :value="3"></el-option>
            <el-option label="拒绝/排斥合作" :value="4"></el-option>
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
  import api from "../../../api/sys/institutes"
  import app from "../../../api/app"
  import contact from "../../../api/sys/contact"
  import station from "../../../api/sys/station"
  import tag from "../../../api/sys/tag"
  import store from '../../../store/index'
  import logApi from "../../../api/sys/log"
  import {mapGetters} from "vuex"

  export default {
    name: "institutes_detail",
    data() {
      return {
        tableData:[],
        loading: true,
        clientInstitutesId: null,
        institutes: {
          id: null,
          institutesId: null,
          institutesName: null,
          name: null,
          stationId: null,
          stationName: null,
          tagNames: null,
          description: null,
          tagCodes: [],
          onLine:null,
          contractSignTime:null,
          contractEndTime:null
        },
        logFormRules: {
          trackDoings: [{required: true, message: '不能为空', trigger: 'change'}],
          businessTrackDoings: [{required: true, message: '不能为空', trigger: 'change'}],
          visitType: [{required: true, message: '请选择拜访形式', trigger: 'change'}],
          description: [{required: true, message: '请填写客户行为跟踪', trigger: 'change'}],
          trackDate: [{required: true, message: '请填写跟踪日期', trigger: 'change'}],
          contactPerson: [{required: true, message: '请选择联系人', trigger: 'change'}],
        },
        typeList: [],
        tagList: [],
        businessTagList:[],
        filterTagList:[],
        contactList:[],
        cascaderList:[],
        props: {
          label: "name"
        },
        checkList: [], //当前用户有权限操作的用户ID列表
        concatTableData: [],
        multipleSelection: [],
        stationList: [],
        contacts: {
          count: 10, // 页大小
          page: 1, // 当前页
          sort: '',
          order: '',
          params: {
            clientInstitutesId: 0,
            sex: null,
            name: null
          }
        },
        account:{
          total:0,
          count: 10, // 页大小
          page: 1, // 当前页
          sort: '',
          order: '',
          params: {

          }
        },
        log: {
          img: null,
          attachment: null,
          contractAttachment: null,
          adTrackDoings: null,
          clientInstitutesId: null,
          contactPerson: null,
          trackDoings: null
        },
        logData: [],
        contactTotal: 0,
        contactList: [],
        allTagList: [],
        businessTagList:[],
        contactData: {
          id: null,
          addUserId: null,
          clientInstitutesId: null,
          name: null,
          sex: null,
          appellation: null,
          birthday: null,
          mobile: null,
          qq: null,
          weChat: null,
          phoneNumber: null,
          remark: null,
          email: null,
          showStatus: null,
          jobTitleId:null,
          departmentId:null
        },
        contactDatas: [],
        contactRules: {
          name: [{required: true, message: '不能为空', trigger: 'change'}],
          sex: [{required: true, message: '不能为空', trigger: 'change'}],
          departmentId:[{required: true, message: '不能为空', trigger: 'change'}],
          jobTitleId:[{required: true, message: '不能为空', trigger: 'change'}]
        },
        contactTitle: {
          create: '新增联系人',
          view: '查看联系人',
          update: '修改联系人'
        },
        titleType: 'create',
        showContact: false,
        contactDisabled: true,
        showInstitutes: true,
        showInstitutesUpd: false,
        stationLoading: true,
        dialogContactFormVisible: false,
        dialogLogFormVisible: false,
        ins: {
          id:null,
        },
        station:{},
        areaSelect:[],
        options: [],
        areas: [],
        inspectionPassed:true,
        historyName:null,
        department:[],
        jobTitle:[],
        checkedtagType:[]
      }
    },
    created() {
      if (this.$route.query.id) {
        this.loadContactData();
      }
    },
    computed: {
      ...mapGetters([
        "userInfo"
      ]),
    },
    methods: {
      nameBlur(){
        if(this.institutes.name==null||this.institutes.name==""){
          this.$message.error("验证客户名称不能为空!");
          return ;
        }
        if(this.historyName==this.institutes.name){
          return;
        }
          api.sameName(this.institutes.name).then(res => {
            if(res.success){
                if(res.data){
                    this.$message.error("客户名称重复!");
                    this.inspectionPassed=false;
                    return;
                }
                else{
                  this.inspectionPassed=true;
                }
            }
            else{
              this.$message.error("验证客户名称异常!");
              this.inspectionPassed=false;
            }
          })
      },
      loadContactData() {
        this.loading = true;
        api.findById(this.$route.query.id).then(res => {
          if (res.data.institutesId) {
            api.institutesById(res.data.institutesId).then(ins => {
              this.ins = ins.data;
              if(ins.data.settleSupplierTarget && ins.data.settleSupplierTarget !=''){
                let split = this.ins.settleSupplierTarget.split(',');
                let str ="";
                split.forEach(station => {
                  if (station == '1'){
                    str += "一般纳税人 "
                  }
                  if (station == '2'){
                    str += "小规模纳税人 "
                  }
                  if (station == '3'){
                    str += "一般纳税人（非代结算) "
                  }
                });
                this.ins.settleSupplierTarget = str;
              }
              if(ins.data.defaultStation >= 0){
                station.findById(ins.data.defaultStation).then(sta => {
                  this.station = sta.data;
                }).catch()
              }
            }).catch();
          }
          this.institutes = res.data;
          this.historyName=this.institutes.name;
          this.typeList = api.typeList();
          this.account.params.institutesId = res.data.institutesId;
          this.accountNumberList();
          let areas = [];
          areas.push(res.data.state) ;//省份
          areas.push(res.data.city) ;//市
          this.loadArea(areas);
        }).catch(() => {
        });
        this.clientInstitutesId = this.$route.query.id;
        this.contacts.params.clientInstitutesId = this.clientInstitutesId ;
        this.stationMethod();
        contact.list(this.contacts).then(res => {
          this.concatTableData = res.data.results;
          this.contactTotal = res.data.count;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
        this.handleTag();
        this.selectContactAll();
        this.selectLogByInstitutes();
        this.userCheckList();
        this.findDepartment();
      },
      findDepartment(){
        contact.findDepartment().then((data)=>{
            this.department=data.data;
        }).catch(() => {})
      },
      findJobTitle(id){
        contact.findJobTitle(id).then((data)=>{
            this.jobTitle=data.data;
        }).catch(() => {})
      },
      departmentChange(){
        this.findJobTitle(this.contactData.departmentId);
      },
      handleCreate() {
        this.beforeContact();
        this.titleType = 'create';
        this.showContact = true;
        this.contactDisabled = false;
        this.dialogContactFormVisible = true;

      },
      createContactData() {
        if((this.contactData.mobile==null||this.contactData.mobile==""||typeof this.contactData.mobile=="undefined")&&
            (this.contactData.phoneNumber==null||this.contactData.phoneNumber==""||typeof this.contactData.phoneNumber=="undefined")){
          this.$message.error("手机号和座机号必须填写一个");
          return;
        }
        this.contactData.clientInstitutesId = this.clientInstitutesId;
        contact.add(this.contactData).then(() => {
          this.$message.success("添加成功");
          this.loadContactData();
          this.dialogContactFormVisible = false;
        }).catch(() => {
        })
      },
      dialogContactForm() {
        this.loadContactData();
        this.dialogContactFormVisible = false;
      },
      handleContactDel(row) {
        this.$confirm('是否删除联系人【' + row.name + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          contact.del(row.id).then(() => {
            this.$message.success("删除成功");
            this.loadContactData();
          }).catch(() => {
          })
        });
      },
      handelContactView(scope) {
        this.beforeContact();
        this.contactData = scope.row;
        if((this.contactData.showStatus==0)&&(this.checkList.indexOf(scope.row.addUserId)==-1)){
          this.contactData.email = '***********'
          this.contactData.mobile = '***********'
        }
        this.titleType = 'view';
        this.showContact = false;
        this.contactDisabled = true;
        this.dialogContactFormVisible = true;

      },
      handelContactUpdate(scope) {
        this.beforeContact();
        this.contactDisabled = false;
        this.contactData = scope.row;
        this.titleType = 'update';
        this.showContact = true;
        this.dialogContactFormVisible = true;
      },
      beforeContact() {
        this.contactData = {
          id: null,
          clientInstitutesId: null,
          name: null,
          sex: null,
          appellation: null,
          birthday: null,
          mobile: null,
          qq: null,
          weChat: null,
          phoneNumber: null,
          remark: null,
          email: null,
          showStatus: null
        };
      },
      handleInstitutesStatus() {
        this.showInstitutes = false;
        this.showInstitutesUpd = true;
      },
      handleInstitutesUpdStatus() {
        this.showInstitutes = true;
        this.showInstitutesUpd = false;
      },
      handleCommitInstitutes() {
        if(!this.inspectionPassed){
          this.$message.error("客户名称重复!");
          return;
        }
        // this.institutes.tagCodes = this.$refs.tagTree.getCheckedKeys();
        this.institutes.state = this.areas[0]; //取出省份
        this.institutes.city = this.areas[1];  //取出市
        if(this.institutes.onLine==1){
          if(this.institutes.contractSignTime==null||this.institutes.contractEndTime==null){
            this.$message.error("合同到期日期必填!");
            return;
          }
        }
        else{
          this.institutes.contractSignTime='';
          this.institutes.contractEndTime='';
        }
        api.update(this.institutes).then(() => {
          this.$message.success("保存成功");
          this.$store.dispatch("delView", this.$route).then(() => {
            this.$router.push({name: "institutes_list", params: {noKeep: true}})
          })
          /*this.loadContactData();
          this.handleInstitutesUpdStatus();*/
        }).catch(() => {
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
        api.institutesTagTree(this.$route.query.id).then(res => {
          this.tagList = res.data;
        });
        tag.tree(0).then(res => {
          this.businessTagList = res.data;
        });
      },
      tagCommit(){
        for(var i=0;i<this.tagList.length;i++){
          if(this.tagList[i].checked){
            if(this.tagList[i].parentCode==null||this.tagList[i].parentCode==""){
              this.$message.warning("勾选的业务标签开发进度必须选择");
              return;
            }
          }
        }
        let tagTreeObj={
          id:this.$route.query.id,
          tagTrees:this.tagList
        };
        api.addTagTree(tagTreeObj).then(res => {
          if(res.status==0){
            this.$message.success("客户标签添加成功");
            this.$store.dispatch("delView", this.$route).then(() => {
              this.$router.push({name: "institutes_list", params: {noKeep: true}})
            })
            return;
          }
          this.$message.warning("客户标签添加失败");
        });
      },
      selectContactAll() {
        contact.selectAll(this.clientInstitutesId).then(res => {
          this.contactList = res.data;
        })
      },
      selectLogByInstitutes() {
        this.log.clientInstitutesId = this.clientInstitutesId;
        logApi.selectByInstitutes(this.log).then(res => {
          this.logData = res.data;
        }).catch(() => {
        })
      },
      closeDialog(){
        this.$refs.logForm.resetFields();
        this.dialogLogFormVisible=false;
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
      developChange(val){
        let tagObj= this.allTagList.find(function(obj){
          if(obj.code==val){
            return obj;
          }
        });
        let businessObj= this.businessTagList.find(function(obj){
          if(obj.code==tagObj.parentCode){
            return obj;
          }
        });
        this.log.businessTrackDoings=null;
        this.filterTagList=this.businessTagList.filter(item=>item.sort>=businessObj.sort);
      },
      clearUploadedImage () {
        this.$refs.upload.clearFiles();
        this.log.attachment = null;
      },
      commitLogData() {
        this.$refs.logForm.validate(valid => {
          if (valid) {
            let thisLog=this;
            // this.institutes.onLine=this.onLine;
            this.institutes.description=this.log.description;
            this.log.clientInstitutesId=this.institutes.id;
            this.log.clientInstitutesName=this.institutes.name;
            this.institutes.intention=this.log.intention ;
            this.log.trackDoingsId=this.log.trackDoings
            this.log.businessTrackDoingsId=this.log.businessTrackDoings
            let tagObj= this.allTagList.find(function(obj){
              if(obj.code==thisLog.log.trackDoings){
                return obj;
              }
            });
            this.log.trackDoings=tagObj.name;
            let businessObj= this.businessTagList.find(function(obj){
              if(obj.code==thisLog.log.businessTrackDoings){
                return obj;
              }
            });
            this.log.businessTrackDoings=businessObj.name;
            this.log.contactPerson=this.log.contactPerson.join("/");
            api.updateByOnLine(this.institutes).then(()=>{
              logApi.add(this.log).then(()=>{
                this.$message.success("添加成功");
                this.log={
                  clientInstitutesId:null,
                  clientInstitutesName:null,
                  entryPerson:null,
                  trackDoings:null,
                  trackDoingsId:null,
                  businessTrackDoingsId:null,
                  businessTrackDoings:null,
                  contactPerson:null,
                  img:null,
                  attachment:null,
                  contractAttachment:null,
                  remark:null,
                  description:null
                };
                this.dialogLogFormVisible=false;
                this.loadContactData();
              })
            }).catch(()=>{

            })
          }
        })
      },
      handleCreateLog() {
        api.trackTag(this.$route.query.id,1).then(res=>{
          this.allTagList=res.data;
        });
        tag.tree(0).then(res => {
          this.businessTagList = res.data;
        });
        contact.findCascader(this.$route.query.id).then(res=>{
          this.cascaderList=res.data;
        });
        this.log = {
          clientInstitutesId: null,
          clientInstitutesName: null,
          entryPerson: null,
          trackDoings: null,
          businessTrackDoings:null,
          contactPerson: null,
          img: null,
          attachment: null,
          contractAttachment: null,
          remark: null,
          description: null
        };
        this.dialogLogFormVisible=true;
      },
      goBack(state) {
        this.$store.dispatch("delView", this.$route).then(() => {
          this.$router.push({name: "institutes_list", params: {noKeep: state}})
        })
      },
      toOssContact() {
        if (this.institutes.institutesId === 0) {
          this.$message.warning("请先关联oss院所");
        } else {
          contact.ossMemberList(this.institutes.institutesId).then(res => {
            let contactList = [];
            let dataList = res.data;
            for (let i = 0; i < dataList.length; i++) {
              let data = {
                clientInstitutesId: this.clientInstitutesId,
                name: dataList[i].name,
                mobile: dataList[i].mobile,
                email: dataList[i].email,
                institutesRoleList: dataList[i].roles,
              }
              contactList.push(data)
            }
            contact.addList(contactList).then(() => {
              this.$message.success("同步成功");
              this.loadContactData();
            }).catch(() => {
            })
          }).catch(() => {
          })

        }
      },

      exportContact() {
        if (this.multipleSelection.length == 0) {
          this.$message.warning("请选择导出的联系人");
        } else {
          let ids = [];
          ids = this.getCheckedIds();
          contact.download({url: '/api/client/institutes/contact/export-contact', data: ids, fileName: '导出联系人.xls'});
        }
      },

      getCheckedIds() {
        return this.multipleSelection.map(value => {
          return value.id
        })
      },
      accountNumberList(){
        api.selectGradeByIns(this.account).then(res => {
          this.tableData = res.data.results;
          this.account.total = res.data.count;
          this.loading = false;
        }).catch()
      },
      userCheckList(){
        api.checkList(this.userInfo.id).then(res => {
          this.checkList = res.data
        }).catch()
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
      },

      handleChange(val) {
        console.log(val)
        this.$emit('input', val);
        let values = [];
        for (let i = 0; i < this.options.length; i++) {
          let value = this.options[i];
          if (value.value === val[0]) {
            values.push(value.dataValue);
            if (value.children) {
              for (let j = 0; j < value.children.length; j++) {
                let child = value.children[j];
                if (child.value === val[1]) {
                  values.push(child.dataValue);
                  break;
                }
              }
            }
            break
          }
        }
        debugger
        this.areas = values;
      },

      loadArea(areas){
        app.provinces().then(res1 => {
          /*this.options = res.data*/
          this.options = [];
          let index = 0;
          for (let i = 0; i < res1.data.length; i++) {
            var data = {
              dataValue: res1.data[i].value,
              value: index++,
              label: res1.data[i].label,
              children: null
            }
            if (areas.length > 0) {
              if (data.dataValue === areas[0]) {
                this.areaSelect.push(data.value);
              }
            }
            if (res1.data[i].children || res1.data[i].children.length > 0) {
              data.children = [];
              for (let j = 0; j < res1.data[i].children.length; j++) {
                let subData = {
                  dataValue: res1.data[i].children[j].value,
                  value: index++,
                  label: res1.data[i].children[j].label,
                  children: null
                };
                data.children.push(subData)
                if (areas.length > 1) {
                  if (subData.dataValue === areas[1]) {
                    this.areaSelect.push(subData.value);
                  }
                }
              }
            }
            this.options.push(data)
          }
          console.log(this.options)
        }).catch(() => {
        });
      },
      },

      handleChange(val) {
        console.log(val)
        this.$emit('input', val);
        let values = [];
        for (let i = 0; i < this.options.length; i++) {
          let value = this.options[i];
          if (value.value === val[0]) {
            values.push(value.dataValue);
            if (value.children) {
              for (let j = 0; j < value.children.length; j++) {
                let child = value.children[j];
                if (child.value === val[1]) {
                  values.push(child.dataValue);
                  break;
                }
              }
            }
            break
          }
        }
        debugger
        this.areas = values;
      }
  }
</script>
