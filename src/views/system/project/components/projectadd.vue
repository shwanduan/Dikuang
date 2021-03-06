<template>
  <div class="projectadd">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <!-- <el-form-item label="项目编码" prop="projectCode">
          <el-input v-model="form.projectCode" placeholder="请输入项目编码" />
        </el-form-item> -->
          <el-form-item label="项目名称：" prop="projectName">
            <el-input v-model="form.projectName" placeholder="请输入项目名称" />
          </el-form-item>
          <el-form-item label="项目简称：" prop="shortName">
            <el-input v-model="form.shortName" placeholder="请输入项目简称" />
          </el-form-item>
          <el-form-item label="项目所属单位：" prop="company">
            <el-select
              v-model="form.company"
              :placeholder="unitplaceholder"
              :disabled="company == '100' ? false : true"
              @change="companyChange"
            >
              <el-option
                v-for="item in unitOptions"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目类别：" prop="projectType">
            <el-select v-model="form.projectType" placeholder="选择项目类别">
              <el-option
                v-for="item in projectTypeOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目承担部门：" prop="projectDept">
            <!-- <el-input v-model="form.projectDept" placeholder="请输入承担部门" /> -->
            <treeselect
              v-model="form.projectDept"
              :options="deptOptions"
              :show-count="true"
              placeholder="选择项目承担部门"
              @select="treenChange"
              style="width:195px;"
            />
          </el-form-item>
          <el-form-item label="项目规模：" prop="projectScale">
            <!-- <el-input v-model="form.projectScale" placeholder="请输入项目规模" /> -->
            <el-select v-model="form.projectScale" placeholder="选择项目规模">
              <el-option
                v-for="item in projectScaleOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目风险等级：" prop="riskLevel">
            <el-select v-model="form.riskLevel" placeholder="选择项目风险等级">
              <el-option
                v-for="item in riskLevelOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目地址：">
            <v-distpicker
              province="省"
              city="市"
              area="区"
              @province="onChangeProvince1"
              @city="onChangeCity"
              @area="onChangeArea"
            ></v-distpicker>
          </el-form-item>
          <!-- <el-form-item label="区县" prop="projectCounty">
          <el-input v-model="form.projectCounty" placeholder="请输入区县" />
        </el-form-item> -->
          <el-form-item label="详细地址：" prop="projectAddr">
            <el-input
              v-model="form.projectAddr"
              placeholder="请输入详细地址"
              @change="onChangeAddress"
            />
          </el-form-item>
          <el-form-item label="经度：" prop="longitude">
            <el-input v-model="form.longitude" placeholder="请输入经度" />
          </el-form-item>
          <el-form-item label="纬度：" prop="latitude">
            <el-input v-model="form.latitude" placeholder="请输入纬度" />
          </el-form-item>
          <el-form-item label="施工状态：" prop="projectRate">
            <el-select v-model="form.projectRate" placeholder="请选择施工状态">
              <el-option
                v-for="item in projectRateOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间：" prop="processBeginDate">
            <el-date-picker
              clearable
              size="small"
              style="width: 100%"
              v-model="form.processBeginDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择开始时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：" prop="processEndDate">
            <el-date-picker
              clearable
              size="small"
              style="width: 100%"
              v-model="form.processEndDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择结束时间"
            >
            </el-date-picker>
          </el-form-item>

          <!-- <el-form-item label="项目负责人" prop="prinName">
          <el-select
            v-model="form.prinName"
            placeholder="请选择项目负责人"
            style="width:100%"
            @change="prinNameSelect"
          >
            <el-option
              v-for="(item, userListIndex) in userList"
              :key="userListIndex"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
          <!-- <el-form-item label="项目负责人电话" prop="prinTel">
          <el-input v-model="form.prinTel" placeholder="请输入项目负责人电话" />
        </el-form-item> -->

          <!-- <el-form-item label="省" prop="projectProv">
          <el-input v-model="form.projectProv" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="市" prop="projectCity">
          <el-input v-model="form.projectCity" placeholder="请输入市" />
        </el-form-item> -->

          <el-form-item label="项目经理：" prop="prinName">
            <el-select
              filterable
              v-model="form.prinName"
              placeholder="请选择项目经理"
              @visible-change="prinNameSelect"
            >
              <el-option
                v-for="(item, userListIndex) in userList"
                :key="userListIndex"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <!-- <el-input v-model="form.safeName" placeholder="请输入安全负责人" /> -->
            <!-- <span>张三&nbsp;<span>156 6882 9111</span></span>&nbsp;<el-button type="text">修改</el-button> -->
          </el-form-item>
          <el-form-item label="项目副经理：" prop="sencondPM">
            <el-select
              filterable
              v-model="form.sencondPM"
              placeholder="请选择项目副经理"
              @visible-change="prinNameSelect"
            >
              <el-option
                v-for="(item, userListIndex) in userList"
                :key="userListIndex"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <!-- <span>张三&nbsp;<span>156 6882 9111</span></span>&nbsp;<el-button type="text">修改</el-button> -->
            <!-- <el-input v-model="form.safeName" placeholder="请输入安全负责人" /> -->
          </el-form-item>
          <el-form-item label="安全负责人：" prop="safeName">
            <el-select
              filterable
              v-model="form.safeName"
              placeholder="请选择安全负责人"
              @visible-change="prinNameSelect"
            >
              <el-option
                v-for="(item, userListIndex) in userList"
                :key="userListIndex"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <!-- <span>张三&nbsp;<span>156 6882 9111</span></span>&nbsp;<el-button type="text">修改</el-button> -->
            <!-- <el-input v-model="form.safeName" placeholder="请输入安全负责人" /> -->
          </el-form-item>
          <el-form-item label="技术负责人：" prop="technologyPrinName">
            <el-select
              filterable
              v-model="form.technologyPrinName"
              placeholder="请选择技术负责人"
              @visible-change="prinNameSelect"
            >
              <el-option
                v-for="(item, userListIndex) in userList"
                :key="userListIndex"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <!-- <el-button type="text">选择人员</el-button> -->
            <!-- <el-input v-model="form.safeName" placeholder="请输入安全负责人" /> -->
          </el-form-item>
          <el-form-item label="项目人数：" prop="peopleNum">
            <!-- <span>31</span> -->
            <el-input v-model="form.peopleNum" placeholder="请输入总人数" />
          </el-form-item>
          <el-form-item label="职工人数：" prop="staffNum">
            <!-- <span>6</span> <el-button type="text">修改</el-button> -->
            <el-input v-model="form.staffNum" placeholder="请输入职工人数" />
          </el-form-item>
          <el-form-item label="第三方人数：" prop="thirdNum">
            <!-- <el-button type="text">选择人员</el-button> -->
            <el-input v-model="form.thirdNum" placeholder="请输入第三方人数" />
          </el-form-item>
          <el-form-item label="项目监控：">
            <div v-if="camerasBoxShow">
            <el-table :data="tableData" border style="width: 100%;margin-bottom:10px;" size="mini">
              <el-table-column type="index" label="序号">
              </el-table-column>
              <el-table-column prop="title" label="设备名称">
              </el-table-column>
              <el-table-column prop="cameraIndexCode" label="设备编号">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="editCamerasHandle(scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    @click="deleteCamerasHandle(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            </div>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="camerasDialogVisible = true"
              >绑定摄像头</el-button
            >

            <!-- <el-input v-model="form.thirdNum" placeholder="请输入第三方人数" /> -->
          </el-form-item>
          <el-form-item label="钻机总数：" prop="rigNum">
            <el-input v-model="form.rigNum" placeholder="请输入钻机总数" />
          </el-form-item>
          <el-form-item label="自有钻机：" prop="rigSelf">
            <el-input v-model="form.rigSelf" placeholder="请输入自有钻机数" />
          </el-form-item>

          <!-- <el-form-item
          label="应急装备"
          prop="
emergency"
        >
          <el-input v-model="form.emergency" placeholder="请输入应急装备" />
        </el-form-item> -->

          <!-- <el-form-item label="高程" prop="elevation">
          <el-input v-model="form.elevation" placeholder="请输入高程" />
        </el-form-item> -->
        </el-form>
        <div class="dfooter">
          <el-button type="primary" @click="submitForm">完成创建</el-button>
          <!-- <el-button @click="cancel">取 消</el-button> -->
        </div>
      </el-col>
    </el-row>
    <!--  新增摄像头弹框 -->
    <el-dialog :visible.sync="camerasDialogVisible" width="30%">
      <el-form ref="camerasform" :model="camerasform" label-width="80px">
        <el-form-item label="设备名称">
          <el-input v-model="camerasform.title"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="camerasform.cameraIndexCode"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <!-- <el-button @click="camerasDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="camerasAddaHandle"
          >绑定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入省市区联动组件
import VDistpicker from "v-distpicker";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getProjectType ,addProject} from "@/api/system/project";
import { listUser } from "@/api/system/user";
import { getunitData } from "@/api/system/notice";
export default {
  name: "",
  components: {
    VDistpicker,
    Treeselect
  },
  props: {},
  data() {
    return {
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        projectName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        shortName: [
          { required: true, message: "项目简称不能为空", trigger: "blur" }
        ],
        company: [
          { required: true, message: "项目所属单位不能为空", trigger: "blur" }
        ],
        projectType: [
          { required: true, message: "项目类别不能为空", trigger: "blur" }
        ],
        projectDept: [
          { required: true, message: "项目承担部门不能为空", trigger: "blur" }
        ],
        projectScale: [
          { required: true, message: "项目规模不能为空", trigger: "blur" }
        ],
        riskLevel: [
          { required: true, message: "项目风险等级不能为空", trigger: "blur" }
        ],
        province: [
          { required: true, message: "项目地址不能为空", trigger: "blur" }
        ],
        projectAddr: [
          { required: true, message: "项目详细地址不能为空", trigger: "blur" }
        ],
        longitude: [
          { required: true, message: "项目经度不能为空", trigger: "blur" }
        ],
        latitude: [
          { required: true, message: "项目纬度不能为空", trigger: "blur" }
        ],
        projectRate: [
          { required: true, message: "项目施工状态不能为空", trigger: "blur" }
        ],
        processBeginDate: [
          { required: true, message: "项目开始时间不能为空", trigger: "blur" }
        ],
        processEndDate: [
          { required: true, message: "项目结束时间不能为空", trigger: "blur" }
        ],
        prinName: [
          { required: true, message: "项目经理不能为空", trigger: "blur" }
        ],
        sencondPM: [
          { required: true, message: "项目副经理不能为空", trigger: "blur" }
        ],
        safeName: [
          { required: true, message: "安全负责人不能为空", trigger: "blur" }
        ],
        technologyPrinName: [
          { required: true, message: "技术负责人不能为空", trigger: "blur" }
        ],

        peopleNum: [
          { required: true, message: "项目人数不能为空", trigger: "blur" }
        ],
        staffNum: [
          { required: true, message: "职工人数不能为空", trigger: "blur" }
        ],
        thirdNum: [
          { required: true, message: "第三方人数不能为空", trigger: "blur" }
        ],
        thirdNum: [
          { required: true, message: "项目监控不能为空", trigger: "blur" }
        ],
        rigNum: [
          { required: true, message: "钻机总数不能为空", trigger: "blur" }
        ],
        rigSelf: [
          { required: true, message: "自有钻机不能为空", trigger: "blur" }
        ]
      },
      // 项目类别的下拉列表数据
      projectTypeOptions: [],
      // 项目规模的下拉列表数据
      projectScaleOptions: [],
      // 风险级别的下拉列表数据
      riskLevelOptions: [],
      // 项目进度
      projectRateOptions: [],
      userList: [], // 用户列表
      // 部门树选项
      deptOptions: [],
      unitplaceholder: "选择项目所属单位",
      // 分管单位
      unitOptions: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: ""
      },
      // 添加摄像头显示标识
      camerasDialogVisible: false,
      camerasform: {
        title: "",
        cameraIndexCode: '',
      },
      camerasBoxShow:false,
      tableData: []
    };
  },
  computed: {
    ...mapState({
      company: state => state.user.company
    })
  },
  created() {
    this.getProjectTypes();
    this.getProjectScale();
    this.getRiskLevel();
    this.getProjectRate();
    this.getTreeselect(); // 查询部门下拉树
    this.getunit();
    // this.getUserList()
  },
  mounted() {},
  methods: {
    // 获取分管单位
    async getunit() {
      const res = await getunitData({ parentId: 100 });
      console.log("分管单位列表", res);
      // if (this.company !== 100) {
      // 如果等于100 标识为admin
      if (this.company == "100") {
        this.unitplaceholder = "选择项目所属单位";
      }
      this.unitOptions = res.data.map(item => {
        return {
          deptId: item.deptId + "",
          deptName: item.deptName
        };
      });
      console.log("this.unitOptions", this.unitOptions);

    },
    // 获取项目类别列表
    async getProjectTypes() {
      const res = await getProjectType({ dictType: "project_type" });
      if (res.code === 200) {
        this.projectTypeOptions = res.rows;
      }
    },
    // 获取项目规模列表
    async getProjectScale() {
      const res = await getProjectType({ dictType: "project_scale" });
      // console.log('项目规模列表，',res);
      if (res.code === 200) {
        this.projectScaleOptions = res.rows;
      }
    },
    // 获取风险级别列表
    async getRiskLevel() {
      const res = await getProjectType({ dictType: "risk" });
      // console.log('风险级别列表，',res);
      if (res.code === 200) {
        this.riskLevelOptions = res.rows;
      }
    },
    // 获取项目进度列表
    async getProjectRate() {
      const res = await getProjectType({ dictType: "project_progress" });
      // console.log('项目进度列表，',res);
      if (res.code === 200) {
        this.projectRateOptions = res.rows;
      }
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 所属单位改变后
    companyChange(val) {
      this.queryParams.deptId = val;
      // if(!this.queryParams.deptId){
      //   alert('请选择项目所属单位')
      //   return;
      // }
      // 获取用户列表
      this.getUserList();
    },
    /** 查询用户列表 */
    getUserList() {
      // this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          let arr = [];
          response.rows.map(item => {
            arr.push({
              id: item.nickName + "-" + item.phonenumber,
              label: item.nickName + "-" + item.phonenumber,
              phonenumber: item.phonenumber
            });
          });
          this.userList = [...new Set(arr)]; // 去重
          console.log("项目中的用户列表---》add", this.userList);
          // this.loading = false;
        }
      );
    },
    // 项目负责人变化时
    prinNameSelect(val) {
      // console.log('zouuol');
      // if(!this.queryParams.deptId){
      //   alert('请选择项目所属单位')
      //   return;
      // }
      // console.log("项目负责人改变", val);
      // const call = this.userList.find(item => val == item.id);
      // this.form.prinTel = call.phonenumber;
    },
    onChangeProvince1: function(a) {
      console.log("地址改变了1：", a.value);
      // this.form.provCode = a.code
      this.form.projectProv = a.value;
    },
    onChangeCity: function(a) {
      console.log("地址改变了2：", a.value);
      // this.form.cityCode = a.code
      this.form.projectCity = a.value;
    },
    // 区
    onChangeArea: function(a) {
      console.log("地址改变了3：", a.value);
      // this.form.countyCode = a.code
      this.form.projectCounty = a.value;
    },
    // 详细地址
    onChangeAddress(a) {
      this.form.projectAddr =
        this.form.projectProv +
        this.form.projectCity +
        this.form.projectCounty +
        a;
      console.log("地址改变了4：", this.form.projectAddr);
    },
    treenChange(val) {
      // console.log('叔改变事件',val);
    },
    /** 提交按钮 */
    submitForm() {
      console.log('点击完成创建',this.form);
      this.$refs["form"].validate(valid => {
        if (valid) {
            addProject(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.$router.go(-1)
            });
            
        }
      });
      
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      // console.log('走充值了吗？');
      this.form = {
        id: null,
        projectCode: null,
        projectName: null,
        projectType: null,
        projectDesc: null,
        projectScale: null,
        projectDept: null,
        prinName: null,
        prinTel: null,
        safeName: null,
        riskLevel: null,
        longitude: null,

        latitude: null,

        elevation: null,
        projectProv: null,
        projectCity: null,
        projectCounty: null,
        projectAddr: null,
        projectRate: null,
        peopleNum: null,
        staffNum: null,
        thirdNum: null,
        rigNum: null,
        rigSelf: null,

        emergency: null,
        beginDate: null,
        endDate: null,
        company: null
      };
      this.resetForm("form");
    },
    // 添加摄像头设备事件
    camerasAddaHandle(){
      console.log('创建摄像头成功',this.camerasform);
      this.camerasDialogVisible = false
      this.tableData.push(this.camerasform)
      // this.tableData.map(item=>{
      //   this.form.title = item.title
      //   this.form.cameraIndexCode = item.cameraIndexCode
      // })
      this.form.cameraData = this.tableData
      console.log('当前titlecameraData',this.form.cameraData);
      this.camerasBoxShow = true
      this.camerasform={
        title: null,
        cameraIndexCode: null,
      }
      this.resetForm("camerasform");
    },
    // 修改
    editCamerasHandle(row){
      // console.log('row-----',row);
      // console.log('this.tableData',this.tableData);
      // let current= this.tableData.find(item=>{
      //   return item.cameraIndexCode = row.cameraIndexCode
      // })
      // console.log('当前选中的数据',current);
      // this.camerasform=current
      // this.camerasDialogVisible = true
    },
    // 删除
    deleteCamerasHandle(row){
      console.log('');
    }
  },
  watch: {
    $route(to,from){
      // console.log('to------',to,from);
      // console.log('this.$route.query.parentId: ',this.$route.query.parentId);
      this.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.projectadd {
  padding: 20px 20px;
}
::v-deep .distpicker-address-wrapper select {
  width: 31.9%;
  padding: 0.01rem;
  height: 36px;
  font-size: 12px;
  line-height: 0px;
  border-radius: 3px;
  border: 1px solid #dcdfe6;
}
::v-deep .distpicker-address-wrapper {
  margin-right: -12px;
}
.dfooter {
  text-align: center;
}
</style>
