<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入部门名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="部门状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:dept:add']"
          >新增</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="deptList"
      row-key="deptId"
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="deptName"
        label="部门名称"
        width="260"
      ></el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="statusFormat"
        width="100"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dept:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:dept:add']"
            >新增</el-button
          >
          <el-button
            v-if="scope.row.parentId != 0"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dept:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24" v-if="form.parentId !== 0">
            <el-form-item label="上级部门" prop="parentId">
              <treeselect
                v-model="form.parentId"
                :options="deptOptions"
                :normalizer="normalizer"
                placeholder="选择上级部门"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="form.deptName" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门简称">
              <el-input v-model="form.shortName" placeholder="请输入部门简称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="leader">
              <!-- <el-input
                v-model="form.leader"
                placeholder="请输入负责人"
                maxlength="20"
              /> -->
              <el-select v-model="userName" placeholder="请选择" @change="getDefaultvalue">
                <el-option
                  v-for="item in list"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="form.phone"
                placeholder="请输入联系电话"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="部门地址">
              <!-- <el-row type="flex"> -->
              <v-distpicker
                province="省"
                city="市"
                area="区"
                @province="onChangeProvince1"
                @city="onChangeCity"
                @area="onChangeArea"
              ></v-distpicker>
              <el-input
                v-model="form.addr"
                placeholder="详细地址"
                style="margin-top: 10px; width: 100%"
                @change="onChangeAddress"
              ></el-input>
              <!-- </el-row> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                  >{{ dict.dictLabel }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入省市区联动组件
import VDistpicker from "v-distpicker";

import {
  listDept,
  getDept,
  delDept,
  addDept,
  updateDept,
  listDeptExcludeChild,
  listUserByPost,
} from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Dept",
  components: { Treeselect, VDistpicker },
  data() {
    return {
      userName:'',
      list: [],
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        deptName: undefined,
        status: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: "上级部门不能为空", trigger: "blur" },
        ],
        deptName: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
        ],
        orderNum: [
          { required: true, message: "显示排序不能为空", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    listUserByPost({ postName: "yuan_leader" }).then((res) => {
      console.log(res);
      this.list = res.data;
    });
    this.getList();
    this.getDicts("sys_normal_disable").then((response) => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    getDefaultvalue(val){
           console.log('val==========>',val)
           this.form.leader = val;
    },
    /** 查询部门列表 */
    getList() {
      this.loading = true;
      listDept(this.queryParams).then((response) => {
        this.deptList = this.handleTree(response.data, "deptId");
        console.log("this.deptList=========>",this.deptList)
        this.loading = false;
      });
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children,
      };
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        shortName: undefined,
        provCode: undefined,
        provName: undefined,
        cityCode: undefined,
        cityName: undefined,
        countyCode: undefined,
        countyName: undefined,
        addr: undefined,
        status: "0",
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      if (row != undefined) {
        this.form.parentId = row.deptId;
      }
      this.open = true;
      this.title = "添加部门";
      listDept().then((response) => {
        this.deptOptions = this.handleTree(response.data, "deptId");
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getDept(row.deptId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改部门";
      });
      listDeptExcludeChild(row.deptId).then((response) => {
        console.log("response.data===>",response.data)
        this.deptOptions = this.handleTree(response.data, "deptId");
        console.log("deptOptions=====>",this.deptOptions)
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      console.log("当前表单数据", this.form);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.deptId != undefined) {
            updateDept(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDept(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm(
        '是否确认删除名称为"' + row.deptName + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delDept(row.deptId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    // 地址改变的事件
    // 省
    onChangeProvince1: function (a) {
      console.log("地址改变了1：", a);
      this.form.provCode = a.code;
      this.form.provName = a.value;
    },
    // 市
    onChangeCity: function (a) {
      console.log("地址改变了2：", a);
      this.form.cityCode = a.code;
      this.form.cityName = a.value;
    },
    // 区
    onChangeArea: function (a) {
      console.log("地址改变了3：", a);
      this.form.countyCode = a.code;
      this.form.countyName = a.value;
    },
    // 详细地址
    onChangeAddress(a) {
      this.form.addr = a;
      console.log("地址改变了4：", a);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .distpicker-address-wrapper select {
  width: 32%;
  padding: 0.01rem;
  height: 36px;
  font-size: 12px;
  line-height: 0px;
  border-radius: 3px;
  // background-color: red;
  border: 1px solid #dcdfe6;
}
::v-deep .distpicker-address-wrapper {
  margin-right: -12px;
}
</style>
