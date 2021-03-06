<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="88px"
    >
      <el-form-item label="">
        <el-select
          v-model="queryParams.company"
          clearable
          :placeholder="unitplaceholder"
          :disabled="company == '100' ? false : true"
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
      <el-form-item label="" prop="projectType">
        <el-select
          v-model="queryParams.projectType"
          placeholder="选择项目类别"
          clearable
          size="small"
          @change="handleQuery"
        >
          <el-option
            v-for="item in projectTypeOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="riskLevel">
        <el-select
          v-model="queryParams.riskLevel"
          placeholder="选择风险级别"
          clearable
          size="small"
          @change="handleQuery"
        >
          <el-option
            v-for="item in riskLevelOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="" prop="processBeginDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.beginDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始日期"
        >
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="" prop="projectRate">
        <el-select
          v-model="queryParams.projectRate"
          placeholder="选择施工状态"
          clearable
          size="small"
          @change="handleQuery"
        >
          <el-option
            v-for="item in projectRateOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictLabel"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="搜索项目名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >筛选</el-button
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
          v-hasPermi="['system:project:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:project:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:project:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="projectList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="结束时间" align="center" prop="id" /> -->
      <!-- <el-table-column label="项目编码" align="center" prop="projectCode" /> -->
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="分管单位" align="center" prop="companyName" />
      <el-table-column label="承担部门" align="center" prop="projectDept" />
      <el-table-column
        label="项目类别"
        align="center"
        prop="projectTypeLabel"
      />
      <!-- <el-table-column label="项目概况" align="center" prop="projectDesc" /> -->
      <!-- <el-table-column label="项目规模" align="center" prop="projectScale" /> -->

      <el-table-column label="项目经理" align="center" prop="prinName">
        <!-- string.split('/')[0] -->
        <template slot-scope="scope">
          <span>{{ scope.row.prinName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目地点" align="center" prop="projectAddr" />
      <el-table-column
        label="开始日期"
        align="center"
        prop="beginDateStr"
      >
      </el-table-column>
      <el-table-column label="结束日期" align="center" prop="endDateStr">
      </el-table-column>
      <el-table-column label="项目人数" align="center" prop="peopleNum" />
      <el-table-column label="第三方人数" align="center" prop="thirdNum" />
      <el-table-column label="施工状态" align="center" prop="projectRate" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:project:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:project:remove']"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
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
        <el-form-item label="添加图片：" prop="avatar">
          <el-upload
            ref="upload"
            :limit="1"
            accept=".jpg, .png"
            :action="upload.url"
            :file-list="upload.fileList"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <!-- <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
          </el-upload>
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
          <treeselect
            v-model="form.projectDept"
            :options="deptOptions"
            :show-count="true"
            placeholder="选择项目承担部门"
            style="width: 195px"
          />
        </el-form-item>
        <el-form-item label="项目规模：" prop="projectScale">
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
            :province="province.value"
            :city="city.value"
            :area="area.value"
            @province="onChangeProvince1"
            @city="onChangeCity"
            @area="onChangeArea"
          ></v-distpicker>
        </el-form-item>
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
              :value="item.dictLabel"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" prop="beginDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 100%"
            v-model="form.beginDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 100%"
            v-model="form.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目经理：" prop="prinName">
          <el-input v-model="form.prinName" placeholder="请输入项目经理" />
        </el-form-item>
        <el-form-item label="项目经理电话" prop="prinTel">
          <el-input v-model="form.prinTel" placeholder="请输入项目经理电话" />
        </el-form-item>

        <el-form-item label="项目副经理：" prop="sencondPM">
          <el-input v-model="form.sencondPM" placeholder="请输入项目副经理" />
        </el-form-item>
        <el-form-item label="项目副经理电话" prop="sencondPMTel">
          <el-input
            v-model="form.sencondPMTel"
            placeholder="请输入项目副经理电话"
          />
        </el-form-item>

        <el-form-item label="安全负责人：" prop="safeName">
          <el-input v-model="form.safeName" placeholder="请输入安全负责人" />
        </el-form-item>
        <el-form-item label="安全负责人电话" prop="safeTel">
          <el-input v-model="form.safeTel" placeholder="请输入安全负责人电话" />
        </el-form-item>

        <el-form-item label="技术负责人：" prop="technologyPrinName">
          <el-input
            v-model="form.technologyPrinName"
            placeholder="请输入技术负责人"
          />
        </el-form-item>
        <el-form-item label="技术负责人电话" prop="technologyPrinTel">
          <el-input
            v-model="form.technologyPrinTel"
            placeholder="请输入技术负责人电话"
          />
        </el-form-item>
        <el-form-item label="项目人数：" prop="peopleNum">
          <el-input v-model="form.peopleNum" placeholder="请输入总人数" />
        </el-form-item>
        <el-form-item label="职工人数：" prop="staffNum">
          <el-input v-model="form.staffNum" placeholder="请输入职工人数" />
        </el-form-item>
        <el-form-item label="第三方人数：" prop="thirdNum">
          <el-input v-model="form.thirdNum" placeholder="请输入第三方人数" />
        </el-form-item>
        <el-form-item label="项目监控：">
          <div v-if="camerasBoxShow || this.form.cameraData">
            <el-table
              :data="this.form.cameraData"
              border
              style="width: 100%; margin-bottom: 10px"
              size="mini"
            >
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="title" label="设备名称"> </el-table-column>
              <el-table-column
                prop="cameraIndexCode"
                label="设备编号"
                width="235"
              >
              </el-table-column>
              <el-table-column label="操作" width="50">
                <template slot-scope="scope">
                  <!-- <el-button
                    size="mini"
                    type="text"
                    @click="editCamerasHandle(scope.row)"
                    >修改</el-button
                  > -->
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
        <el-form-item label="项目简介：" prop="projectDesc">
          <el-input
            type="textarea"
            :rows="6"
            v-model="form.projectDesc"
            placeholder="请输入项目简介"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="submitForm"
          >确定{{ title }}</el-button
        >
        <!-- <el-button @click="cancel">取 消</el-button> -->
      </div>
    </el-dialog>

    <!-- 查看-->
    <el-dialog
      title="查看项目详情"
      :visible.sync="viewOpen"
      width="700px"
      append-to-body
    >
      <el-form
        disabled
        ref="form"
        :model="form"
        :rules="rules"
        label-width="130px"
      >
        <el-form-item label="项目名称：" prop="projectName">
          <el-input
            v-model="form.projectName"
            placeholder="请输入项目名称"
            disabled
          />
        </el-form-item>
        <el-form-item label="项目简称：" prop="shortName">
          <el-input
            v-model="form.shortName"
            placeholder="请输入项目简称"
            disabled
          />
        </el-form-item>
        <el-form-item label="添加图片：" prop="avatar">
          <el-upload
            ref="upload"
            :limit="1"
            :on-exceed="handleExceed"
            accept=".jpg, .png"
            :action="upload.url"
            :file-list="upload.fileList"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            list-type="picture"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <!-- <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
          </el-upload>
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
          <treeselect
            v-model="form.projectDept"
            :options="deptOptions"
            :show-count="true"
            placeholder="选择项目承担部门"
            style="width: 195px"
          />
        </el-form-item>
        <el-form-item label="项目规模：" prop="projectScale">
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
            :province="province.value"
            :city="city.value"
            :area="area.value"
            @province="onChangeProvince1"
            @city="onChangeCity"
            @area="onChangeArea"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址：" prop="projectAddr">
          <el-input
            disabled
            v-model="form.projectAddr"
            placeholder="请输入详细地址"
            @change="onChangeAddress"
          />
        </el-form-item>
        <el-form-item label="经度：" prop="longitude">
          <el-input
            disabled
            v-model="form.longitude"
            placeholder="请输入经度"
          />
        </el-form-item>
        <el-form-item disabled label="纬度：" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="施工状态：" prop="projectRate">
          <el-select v-model="form.projectRate" placeholder="请选择施工状态">
            <el-option
              v-for="item in projectRateOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictLabel"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" prop="beginDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 100%"
            v-model="form.beginDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 100%"
            v-model="form.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="项目经理：" prop="prinName">
          <el-input v-model="form.prinName" placeholder="请输入项目经理" />
        </el-form-item>
        <el-form-item label="项目经理电话" prop="prinTel">
          <el-input v-model="form.prinTel" placeholder="请输入项目经理电话" />
        </el-form-item>

        <el-form-item label="项目副经理：" prop="sencondPM">
          <el-input v-model="form.sencondPM" placeholder="请输入项目经理" />
        </el-form-item>
        <el-form-item label="项目副经理电话" prop="sencondPMTel">
          <el-input
            v-model="form.sencondPMTel"
            placeholder="请输入项目经理电话"
          />
        </el-form-item>

        <el-form-item label="安全负责人：" prop="safeName">
          <el-input v-model="form.safeName" placeholder="请输入安全负责人" />
        </el-form-item>
        <el-form-item label="安全负责人电话" prop="safeTel">
          <el-input v-model="form.safeTel" placeholder="请输入安全负责人电话" />
        </el-form-item>

        <el-form-item label="技术负责人：" prop="technologyPrinName">
          <el-input
            v-model="form.technologyPrinName"
            placeholder="请输入技术负责人"
          />
        </el-form-item>
        <el-form-item label="技术负责人电话" prop="technologyPrinTel">
          <el-input
            v-model="form.technologyPrinTel"
            placeholder="请输入技术负责人电话"
          />
        </el-form-item>
        <el-form-item label="项目人数：" prop="peopleNum">
          <el-input v-model="form.peopleNum" placeholder="请输入总人数" />
        </el-form-item>
        <el-form-item label="职工人数：" prop="staffNum">
          <el-input v-model="form.staffNum" placeholder="请输入职工人数" />
        </el-form-item>
        <el-form-item label="第三方人数：" prop="thirdNum">
          <el-input v-model="form.thirdNum" placeholder="请输入第三方人数" />
        </el-form-item>
        <el-form-item label="项目监控：">
          <div v-if="camerasBoxShow || this.form.cameraData">
            <el-table
              :data="this.form.cameraData"
              border
              style="width: 100%; margin-bottom: 10px"
              size="mini"
            >
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="title" label="设备名称"> </el-table-column>
              <el-table-column
                prop="cameraIndexCode"
                label="设备编号"
                width="235"
              >
              </el-table-column>
              <el-table-column label="操作" width="50">
                <template slot-scope="scope">
                  <!-- <el-button
                    size="mini"
                    type="text"
                    @click="editCamerasHandle(scope.row)"
                    >修改</el-button
                  > -->
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
        </el-form-item>
        <el-form-item label="钻机总数：" prop="rigNum">
          <el-input v-model="form.rigNum" placeholder="请输入钻机总数" />
        </el-form-item>
        <el-form-item label="自有钻机：" prop="rigSelf">
          <el-input v-model="form.rigSelf" placeholder="请输入自有钻机数" />
        </el-form-item>
        <el-form-item label="项目简介" prop="projectDesc">
          <el-input
            type="textarea"
            :rows="6"
            v-model="form.projectDesc"
            placeholder="请输入项目简介"
          />
        </el-form-item>
      </el-form>
    </el-dialog>

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
      <div style="text-align: center">
        <!-- <el-button @click="camerasDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="camerasAddaHandle">绑定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImg, uploadAvatar, deleteImg } from "@/api/system/user";
import { getToken } from "@/utils/auth";
import { mapState } from "vuex";
// 引入省市区联动组件
import VDistpicker from "v-distpicker";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { listUser } from "@/api/system/user";
import { getunitData } from "@/api/system/notice";
import {
  listProject,
  getProject,
  delProject,
  addProject,
  updateProject,
  exportProject,
  // 项目类别
  getProjectType,
  // 项目规模
  // getProjectScale
  getProjectDet,
} from "@/api/system/project";

export default {
  name: "Project",
  components: {
    VDistpicker,
    Treeselect,
  },
  data() {
     const validateLongitude = (rule, value, callback) => {
      //经度,整数部分为0-180小数部分为0到15位
      var longreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,15})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,15}|180)$/
      if (!longreg.test(value)) {
        callback(new Error('请输入经度整数部分为0-180,小数部分为0到15位!'))
      }
      callback()
    }
    const validateLatitude = (rule, value, callback) => {
      //纬度,整数部分为0-90小数部分为0到15位
      var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,15}|90\.0{0,15}|[0-8]?\d{1}|90)$/
      if (!latreg.test(value)) {
        callback(new Error('请输入纬度整数部分为0-90,小数部分为0到15位!'))
      }
      callback()
    }
    return {
      // 分管单位
      unitOptions: [],
      unitplaceholder: "选择分管单位",
      // 项目类别的下拉列表数据
      // projectTypeOpction: {},
      projectTypeOptions: [],
      // 项目规模的下拉列表数据
      projectScaleOptions: [],
      // 风险级别的下拉列表数据
      riskLevelOptions: [],
      // 项目进度
      projectRateOptions: [],
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 部门树选项
      deptOptions: undefined,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      projectList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查看项目弹出层
      viewOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
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
        company: "",
        processBeginDate: null,
      },
      // 表单参数
      form: {
        cameraData: [],
      },
      // 表单校验
      // rules: {},
      rules: {
        projectName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" },
        ],
        // shortName: [
        //   { required: true, message: "项目简称不能为空", trigger: "blur" }
        // ],
        company: [
          { required: true, message: "项目所属单位不能为空", trigger: "blur" },
        ],
        // projectType: [
        //   { required: true, message: "项目类别不能为空", trigger: "blur" }
        // ],
        // projectDept: [
        //   { required: true, message: "项目承担部门不能为空", trigger: "blur" }
        // ],
        // projectScale: [
        //   { required: true, message: "项目规模不能为空", trigger: "blur" }
        // ],
        riskLevel: [
          { required: true, message: "项目风险等级不能为空", trigger: "blur" },
        ],
        // province: [
        //   { required: true, message: "项目地址不能为空", trigger: "blur" }
        // ],
        // projectAddr: [
        //   { required: true, message: "项目详细地址不能为空", trigger: "blur" }
        // ],
        longitude: [
          { required: true, trigger: "blur" },
          { validator: validateLongitude, trigger: 'blur' },
          { validator: validateLongitude, trigger: 'change' }
        ],
        latitude: [
          { required: true, trigger: "blur" },
          { validator: validateLatitude, trigger: 'blur' },
          { validator: validateLatitude, trigger: 'change' }
        ],
        // projectRate: [
        //   { required: true, message: "项目施工状态不能为空", trigger: "blur" }
        // ],
        // processBeginDateStr: [
        //   { required: true, message: "项目开始时间不能为空", trigger: "blur" }
        // ],
        // processEndDateStr: [
        //   { required: true, message: "项目结束时间不能为空", trigger: "blur" }
        // ],
        // prinName: [
        //   { required: true, message: "项目经理不能为空", trigger: "blur" }
        // ],
        // sencondPM: [
        //   { required: true, message: "项目副经理不能为空", trigger: "blur" }
        // ],
        // safeName: [
        //   { required: true, message: "安全负责人不能为空", trigger: "blur" }
        // ],
        // technologyPrinName: [
        //   { required: true, message: "技术负责人不能为空", trigger: "blur" }
        // ],

        // peopleNum: [
        //   { required: true, message: "项目人数不能为空", trigger: "blur" }
        // ],
        // staffNum: [
        //   { required: true, message: "职工人数不能为空", trigger: "blur" }
        // ],
        // thirdNum: [
        //   { required: true, message: "第三方人数不能为空", trigger: "blur" }
        // ],
        // thirdNum: [
        //   { required: true, message: "项目监控不能为空", trigger: "blur" }
        // ],
        // rigNum: [
        //   { required: true, message: "钻机总数不能为空", trigger: "blur" }
        // ],
        // rigSelf: [
        //   { required: true, message: "自有钻机不能为空", trigger: "blur" }
        // ]
      },
      userList: [], // 用户列表
      // 添加摄像头显示标识
      camerasDialogVisible: false,
      camerasform: {
        title: "",
        cameraIndexCode: "",
      },
      camerasBoxShow: false,
      // tableData: [],

      province: {
        value: "",
      },
      city: {
        value: "",
      },
      area: {
        value: "",
      },
      // fileList: [],
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // headers: { "Content-Type": "application/json;charset=UTF-8" },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/file/upload",
        // 上传的文件列表
        fileList: [],
      },
    };
  },
  created() {
    this.getunit();
    this.getList();
    this.getProjectTypes();
    this.getProjectScale();
    this.getRiskLevel();
    this.getProjectRate();
    this.getTreeselect(); // 查询部门下拉树
    if (this.company != "100") {
      this.queryParams.company = this.company;
    }
    console.log("this.queryParams.company", this.queryParams.company);
  },
  computed: {
    ...mapState({
      company: (state) => state.user.company,
    }),
  },
  methods: {
    // 获取分管单位
    async getunit() {
      const res = await getunitData({ parentId: 100 });
      console.log("分管单位列表", res);
      // if (this.company !== 100) {
      // 如果等于100 标识为admin
      if (this.company == "100") {
        this.unitplaceholder = "选择分管单位";
      }
      this.unitOptions = res.data.map((item) => {
        return {
          deptId: item.deptId + "",
          deptName: item.deptName,
        };
      });

      console.log("this.unitOptions", this.unitOptions);
      // } else {
      // }
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listProject(this.queryParams).then((response) => {
        // console.log('项目列表-----》',response);
        this.projectList=response.rows.map(item=>{
          return{
            id:item.id,
            projectName:item.projectName,
            companyName:item.companyName,
            projectDept:item.projectDept,
            prinName:item.prinName,
            projectAddr:item.projectProv+item.projectCity+item.projectCounty+item.projectAddr,
            processEndDateStr:item.processEndDateStr,
            peopleNum:item.peopleNum,
            thirdNum:item.thirdNum,
            peopleNum:item.peopleNum,
            projectRate:item.projectRate,
            projectTypeLabel:item.projectTypeLabel,
            beginDateStr:item.beginDateStr,
            endDateStr:item.endDateStr
          }
        })
        console.log('项目列表-----》',this.projectList);
        this.total = response.total;
        this.loading = false;
      });
      
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
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        avatar: null,
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
        company: null,
        cameraData: [],
      };
      this.province.value = "";
      this.city.value = "";
      this.area.value = "";
      // this.fileList = [];
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getTreeselect();
      // this.getUserList();
      this.getunit();
      if (this.company != 100) {
        this.form.company = this.company;
      }
      this.upload.fileList = [];
      this.open = true;
      this.title = "新增项目";
    },
    /** 修改按钮操作 */
    async handleUpdate(row) {
      console.log("修改操作-----", row);
      this.reset();
      this.getTreeselect();
      const id = row.id || this.ids;
      const res = await getProjectDet(id);
      // console.log("当前想详情xiug ----", res);
      this.province.value = res.data.projectProv;
      this.city.value = res.data.projectCity;
      this.area.value = res.data.projectCounty;
      this.form = res.data;
      this.form.processBeginDate = res.data.processBeginDateStr;
      this.form.processEndDate = res.data.processEndDateStr;
      if (res.data.avatar) {
        this.upload.fileList = [
          { name: "", url: 'http://218.56.58.154:8085' + res.data.avatar },
        ];
        console.log("修改操作-----嗡嗡嗡", this.upload.fileList);
      } else {
        this.upload.fileList = [];
      }

      this.open = true;
      this.title = "修改项目";
    },
    // 查看按钮
    async handleView(row) {
      // console.log("修改操作-----", row);
      this.reset();
      this.getTreeselect();
      const id = row.id || this.ids;
      const res = await getProjectDet(id);
      // console.log("当前想详情xiug ----", res);
      this.province.value = res.data.projectProv;
      this.city.value = res.data.projectCity;
      this.area.value = res.data.projectCounty;
      this.form = res.data;
      this.form.processBeginDate = res.data.processBeginDateStr;
      this.form.processEndDate = res.data.processEndDateStr;
      if (res.data.avatar) {
        this.upload.fileList = [
          { name: "", url: 'http://218.56.58.154:8085' + res.data.avatar },
        ];
      } else {
        this.upload.fileList = [];
      }
      this.viewOpen = true;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateProject(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProject(this.form).then((response) => {
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
      console.log("row", row);
      const ids = row.id || this.ids;
      this.$confirm(
        "是否确认删除项目为【" + row.projectName + "】的数据项?",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delProject(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有项目数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportProject(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
    onChangeProvince1: function (a) {
      this.form.projectProv = a.value;
    },
    // 市
    onChangeCity: function (a) {
      this.form.projectCity = a.value;
    },
    // 区
    onChangeArea: function (a) {
      this.form.projectCounty = a.value;
    },
    // 详细地址
    onChangeAddress(a) {
      this.form.projectAddr = a;
      console.log("地址改变了4：", this.form.projectAddr);
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then((response) => {
        this.deptOptions = response.data;
      });
    },
    /** 查询用户列表 */
    getUserList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          let arr = [];
          response.rows.map((item) => {
            arr.push({
              id: item.nickName + "-" + item.phonenumber,
              label: item.nickName + "-" + item.phonenumber,
              phonenumber: item.phonenumber,
            });
          });
          this.userList = [...new Set(arr)]; // 去重
          console.log("项目中的用户列表---》", this.userList);
          this.loading = false;
        }
      );
    },
    // 所属单位改变后
    companyChange(val) {
      this.queryParams.deptId = val;
      // 获取用户列表
      this.getUserList();
    },
    // 添加摄像头设备事件
    camerasAddaHandle() {
      console.log("创建摄像头成功", this.camerasform);
      this.camerasDialogVisible = false;
      this.form.cameraData.push(this.camerasform);
      console.log("当前titlecameraData", this.form.cameraData);
      this.camerasBoxShow = true;
      this.camerasform = {
        title: null,
        cameraIndexCode: null,
        id: null,
      };
      this.resetForm("camerasform");
    },
    // 修改
    editCamerasHandle(row) {},
    // 删除
    deleteCamerasHandle(row) {
      let delindex = this.form.cameraData.findIndex(
        (item) => item.id == row.id
      );
      console.log("当前选中的数据index", delindex);
      this.form.cameraData.splice(delindex, 1);
      if (this.form.cameraData.length === 0) {
        this.camerasBoxShow = false;
      }
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      console.log("文件上传成功");
      this.upload.isUploading = false;

      if (response.code == 200) {
        this.form.avatar = response.data;
      } else {
        this.upload.fileList = [];
      }
      this.msgSuccess(response.msg);
    },
    // 文件移除时的钩子
    handleRemove(file, fileList) {
      console.log("走移除了", file);
      let filePath = "";
      if (file.response) {
        // console.log(1);
        filePath = file.response.data;
      } else {
         filePath = file.url
      }
      console.log("移除时file", filePath);
      deleteImg({ filePath: filePath }).then((response) => {
        console.log("删除图片成功", response);
      });
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .distpicker-address-wrapper select {
  width: 31.5%;
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
</style>
