<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-col :span="10">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span><i class="el-icon-date"></i> 今日业务</span>
              </div>
              <div class="content">
                <el-form>
                  <!-- <el-form-item label="采购单位客户即将释放" class="">
                    <span class="status-1">{{boardData.releaseNum}}家</span>
                  </el-form-item> -->
                </el-form>
              </div>
            </el-card>
          </el-col>
        <el-card class="box-card" style="margin-top: 10px">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="demo" name="1">
              <div class="padding-10">
                <el-form :inline=true>
                  <el-form-item label="搜索注册时间">
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="开始时间" style="width: 100%">
                      </el-date-picker>
                    </el-col>
                    <el-col class="ta-center" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="结束时间" style="width: 100%">
                      </el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="会员类型">
                    <el-select v-model="form.data" placeholder="请选择">
                      <el-option label="一" value="shanghai"></el-option>
                      <el-option label="二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="研究所">
                    <el-input v-model="form.data"></el-input>
                  </el-form-item>
                  <el-form-item label="研究所">
                    <el-input v-model="form.data" placeholder="输入Email、公司名称搜索" style="max-width: 180px;width: 180px"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary">搜索</el-button>
                  </el-form-item>
                </el-form>
                <div class="tools">
                  <el-button type="primary">设置类型</el-button>
                  <el-button type="primary">导出信息</el-button>
                  <el-button type="success">审核通过</el-button>
                  <el-button type="danger">审核不通过</el-button>
                </div>
              </div>
              <div>
                搜索工具栏在按钮栏上面 <br>
                搜索条件 和 操作按钮统一左对齐 <br>
              </div>
              <div>
                功能性按钮，如 设置，导出，查看，编辑等 type="primary" <br>
                积极按钮 确认，通过 type="success" <br>
                消极按钮 删除，重置 type="danger"
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import tree from '../../components/tree/index.vue'
  // import supplierDialog from '../../components/supplierDialog'
  import api from "../../api/dashboard"

  export default {
    name: "dashboard",
    // components: {tree,supplierDialog},
    data() {
      return {
        boardData:{
          releaseNum:0
        },
        activeNames: 1,
        checkedIds: [],
        treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        options: {
          label: 'label',
          depthOpen: 99
        },
        supplierDialogVisible: false,
        form: {
          data: ""
        }
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData(){
        api.releaseNum().then(res => {
          this.boardData.releaseNum=res.data;
        })
      }
    }
  }
</script>

<style>
  .padding-10 {
    padding: 10px;
  }
</style>
