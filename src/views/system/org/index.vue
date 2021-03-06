<template>
  <div class="app-container">
    <el-form
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      style="height: 100px"
    >
      <!-- <el-form-item label="所属院，局" prop="company">
        <el-input
          v-model="queryParams.company"
          placeholder="请输入所属院，局"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item> -->
    </el-form>

    <el-row :gutter="10" class="mb8" v-if="companyO == 100">
      <div
        class="auto size_30 m_top"
        style="display: flex; justify-content: center; align-items: center"
      >
        <span>局安委会</span>
      </div>
      <div class="display auto size_10 m_top">
        <span style="width: 12%" class="dis_center">安委会主任</span>
        <el-input :placeholder="JuShow.awhzr" disabled></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="centerDialogVisibleJzr = true"
          :disabled="isjshow"
        ></el-button>
      </div>
      <div class="display auto m_top size_10">
        <span class="dis_center" style="width: 12%">常务副主任</span>
        <el-input :placeholder="JuShow.cwfzr" disabled></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="centerDialogVisibleJcwfzr = true"
          :disabled="isjshow"
        ></el-button>
      </div>
      <div class="display auto m_top size_10">
        <span class="dis_center" style="width: 12%">副主任</span>
        <el-input :placeholder="JuShow.fzr" disabled></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="centerDialogVisibleJfzr = true"
          :disabled="isjshow"
        ></el-button>
      </div>
      <div class="display auto m_top size_10">
        <span class="dis_center" style="width: 12%">安委会成员</span>
        <el-input :placeholder="JuShow.awhcy" disabled></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="centerDialogVisibleJawhcy = true"
          :disabled="isjshow"
        ></el-button>
      </div>
      <div class="display auto m_top size_10">
        <span class="dis_center" style="width: 12%">安委会办公室主任</span>
        <el-input :placeholder="JuShow.awhbgszr" disabled></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="centerDialogVisibleJawhbgszr = true"
          :disabled="isjshow"
        ></el-button>
      </div>
      <div class="display auto m_top size_10" style="justify-content: center">
        <el-button type="primary" @click="postJdata" :disabled="isjshow"
          >确定</el-button
        >
        <el-button type="primary" @click="changJushow">编辑</el-button>
      </div>
    </el-row>
    <el-row :gutter="10" class="mb8" v-else>
      <div
        class="auto size_30 m_top"
        style="display: flex; justify-content: center; align-items: center"
      >
        <span>院安委会</span>
      </div>
      <div class="display auto size_10 m_top dis_between">
        <span style="width: 10%; display: flex; justify-content: flex-end"
          >主任</span
        >
        <el-input
          :placeholder="YuanShow.zr"
          disabled
          style="width: 80%"
        ></el-input>

        <el-button
          type="primary"
          icon="el-icon-edit"
          style="10%"
          @click="centerDialogVisibleYzr = true"
          :disabled="isShow"
          >选择</el-button
        >
      </div>
      <div class="display auto size_10 m_top dis_between">
        <span style="width: 10%; display: flex; justify-content: flex-end"
          >副主任</span
        >
        <el-input
          :placeholder="YuanShow.fzr"
          disabled
          style="width: 80%"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          style="10%"
          @click="centerDialogVisibleYfzr = true"
          :disabled="isShow"
          >选择</el-button
        >
      </div>
      <div class="display auto size_10 m_top dis_between">
        <span style="width: 10%; display: flex; justify-content: flex-end"
          >安委会成员</span
        >
        <el-input
          :placeholder="YuanShow.awhcy"
          disabled
          style="width: 80%"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          style="10%"
          @click="centerDialogVisible = true"
          :disabled="isShow"
          >选择</el-button
        >
      </div>

      <div class="display auto m_top size_10" style="justify-content: center">
        <el-button type="primary" @click="postData" :disabled="isShow"
          >确定</el-button
        >
        <el-button type="primary" @click="editor">编辑</el-button>
      </div>
    </el-row>
    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:org:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:org:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:org:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:org:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <!-- <el-table v-loading="loading" :data="orgList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="手机号" align="center" prop="telphone" />
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="用户姓名" align="center" prop="userName" />
      <el-table-column label="所属院，局" align="center" prop="company" />
      <el-table-column label="职位" align="center" prop="postType" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:org:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:org:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    添加或修改安委会对话框
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号" prop="telphone">
          <el-input v-model="form.telphone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户姓名" />
        </el-form-item>
        <el-form-item label="所属院，局" prop="company">
          <el-input v-model="form.company" placeholder="请输入所属院，局" />
        </el-form-item>
        <el-form-item label="职位" prop="postType">
          <el-select v-model="form.postType" placeholder="请选择职位">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog> -->

    <!-- 局 -->

    <!-- 局安委会主任 -->
    <el-dialog
      title="用户选择"
      :visible.sync="centerDialogVisibleJzr"
      width="70%"
      center
    >
      <div style="width: 100%; display: flex" class="">
        <div
          style="
            width: 50%;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
          class=""
        >
          <div
            class="search"
            style="display: flex; width: 100%; justify-content: space-around"
          >
            <div style="display: flex; align-items: center" class="">
              <span style="width: 20%" @input="changeInput">账号:</span>
              <el-input
                v-model="userListPost.userName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div style="display: flex; align-items: center">
              <span style="width: 30%">姓名：</span>
              <el-input
                v-model="userListPost.nickName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>

            <el-button
              type="primaryz"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="rest"
              >重置</el-button
            >
          </div>
          <div class="body">
            <el-table
              :row-key="handleReserve"
              @select-all="selectAll"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 30px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" reserve-selection>
              </el-table-column>
              <!-- <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column> -->

              <el-table-column prop="nickName" label="姓名" width="120">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="账号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum"
            >
            </el-pagination>
          </div>
        </div>
        <div style="width: 50%; height: 600px" class="">
          <div
            style="
              width: 70%;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
            "
          >
            <div
              class="header"
              style="
                height: 50px;
                font-size: 20px;
                color: #262626;
                display: flex;
                align-items: center;
              "
            >
              已选用户
            </div>
            <div
              class="head"
              style="
                display: flex;
                height: 50px;
                align-items: center;
                background: #d7d6db;
              "
            >
              <div
                class="head_left"
                style="
                  width: 80%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-right: 1px solid #fafafa;
                "
              >
                姓名
              </div>
              <div
                class="head_right"
                style="
                  width: 20%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                操作
              </div>
            </div>
            <div class="bodyT">
              <div
                v-if="list == ''"
                style="width: 100%; flex: 1; color: #bfbfbf"
                class="dis_center"
              >
                暂无数据
              </div>

              <div
                style="
                  width: 100%;
                  height: 50px;
                  display: flex;
                  background: #fafafa;
                "
                v-for="(item, index) of list"
                :key="index"
                v-else
              >
                <div
                  style="
                    width: 80%;
                    height: 100%;
                    font-size: 20px;
                    color: black;
                  "
                  class="dis_center"
                >
                  {{ item.nickName }}
                </div>
                <div style="width: 20%; height: 100%" class="dis_center">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteItem(item)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleJzr = false">取 消</el-button>
        <el-button type="primary" @click="postJzr">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 局常务副主任 -->
    <el-dialog
      title="用户选择"
      :visible.sync="centerDialogVisibleJcwfzr"
      width="70%"
      center
    >
      <div style="width: 100%; display: flex" class="">
        <div
          style="
            width: 50%;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
          class=""
        >
          <div
            class="search"
            style="display: flex; width: 100%; justify-content: space-around"
          >
            <div style="display: flex; align-items: center" class="">
              <span style="width: 20%" @input="changeInput">账号:</span>
              <el-input
                v-model="userListPost.userName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div style="display: flex; align-items: center">
              <span style="width: 30%">姓名：</span>
              <el-input
                v-model="userListPost.nickName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>

            <el-button
              type="primaryz"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="rest"
              >重置</el-button
            >
          </div>
          <div class="body">
            <el-table
              :row-key="handleReserve"
              @select-all="selectAll"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 30px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" reserve-selection>
              </el-table-column>
              <!-- <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column> -->

              <el-table-column prop="nickName" label="姓名" width="120">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="账号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum"
            >
            </el-pagination>
          </div>
        </div>
        <div style="width: 50%; height: 600px" class="">
          <div
            style="
              width: 70%;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
            "
          >
            <div
              class="header"
              style="
                height: 50px;
                font-size: 20px;
                color: #262626;
                display: flex;
                align-items: center;
              "
            >
              已选用户
            </div>
            <div
              class="head"
              style="
                display: flex;
                height: 50px;
                align-items: center;
                background: #d7d6db;
              "
            >
              <div
                class="head_left"
                style="
                  width: 80%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-right: 1px solid #fafafa;
                "
              >
                姓名
              </div>
              <div
                class="head_right"
                style="
                  width: 20%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                操作
              </div>
            </div>
            <div class="bodyT">
              <div
                v-if="list == ''"
                style="width: 100%; flex: 1; color: #bfbfbf"
                class="dis_center"
              >
                暂无数据
              </div>

              <div
                style="
                  width: 100%;
                  height: 50px;
                  display: flex;
                  background: #fafafa;
                "
                v-for="(item, index) of list"
                :key="index"
                v-else
              >
                <div
                  style="
                    width: 80%;
                    height: 100%;
                    font-size: 20px;
                    color: black;
                  "
                  class="dis_center"
                >
                  {{ item.nickName }}
                </div>
                <div style="width: 20%; height: 100%" class="dis_center">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteItem(item)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleJcwfzr = false">取 消</el-button>
        <el-button type="primary" @click="postJcwfzr">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 局副主任 -->
    <el-dialog
      title="用户选择"
      :visible.sync="centerDialogVisibleJfzr"
      width="70%"
      center
    >
      <div style="width: 100%; display: flex" class="">
        <div
          style="
            width: 50%;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
          class=""
        >
          <div
            class="search"
            style="display: flex; width: 100%; justify-content: space-around"
          >
            <div style="display: flex; align-items: center" class="">
              <span style="width: 20%" @input="changeInput">账号:</span>
              <el-input
                v-model="userListPost.userName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div style="display: flex; align-items: center">
              <span style="width: 30%">姓名：</span>
              <el-input
                v-model="userListPost.nickName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>

            <el-button
              type="primaryz"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="rest"
              >重置</el-button
            >
          </div>
          <div class="body">
            <el-table
              :row-key="handleReserve"
              @select-all="selectAll"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 30px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" reserve-selection>
              </el-table-column>
              <!-- <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column> -->

              <el-table-column prop="nickName" label="姓名" width="120">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="账号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum"
            >
            </el-pagination>
          </div>
        </div>
        <div style="width: 50%; height: 600px" class="">
          <div
            style="
              width: 70%;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
            "
          >
            <div
              class="header"
              style="
                height: 50px;
                font-size: 20px;
                color: #262626;
                display: flex;
                align-items: center;
              "
            >
              已选用户
            </div>
            <div
              class="head"
              style="
                display: flex;
                height: 50px;
                align-items: center;
                background: #d7d6db;
              "
            >
              <div
                class="head_left"
                style="
                  width: 80%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-right: 1px solid #fafafa;
                "
              >
                姓名
              </div>
              <div
                class="head_right"
                style="
                  width: 20%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                操作
              </div>
            </div>
            <div class="bodyT">
              <div
                v-if="list == ''"
                style="width: 100%; flex: 1; color: #bfbfbf"
                class="dis_center"
              >
                暂无数据
              </div>

              <div
                style="
                  width: 100%;
                  height: 50px;
                  display: flex;
                  background: #fafafa;
                "
                v-for="(item, index) of list"
                :key="index"
                v-else
              >
                <div
                  style="
                    width: 80%;
                    height: 100%;
                    font-size: 20px;
                    color: black;
                  "
                  class="dis_center"
                >
                  {{ item.nickName }}
                </div>
                <div style="width: 20%; height: 100%" class="dis_center">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteItem(item)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleJfzr = false">取 消</el-button>
        <el-button type="primary" @click="postJfzr">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 局安委会成员 -->
    <el-dialog
      title="用户选择"
      :visible.sync="centerDialogVisibleJawhcy"
      width="70%"
      center
    >
      <div style="width: 100%; display: flex" class="">
        <div
          style="
            width: 50%;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
          class=""
        >
          <div
            class="search"
            style="display: flex; width: 100%; justify-content: space-around"
          >
            <div style="display: flex; align-items: center" class="">
              <span style="width: 20%" @input="changeInput">账号:</span>
              <el-input
                v-model="userListPost.userName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div style="display: flex; align-items: center">
              <span style="width: 30%">姓名：</span>
              <el-input
                v-model="userListPost.nickName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>

            <el-button
              type="primaryz"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="rest"
              >重置</el-button
            >
          </div>
          <div class="body">
            <el-table
              :row-key="handleReserve"
              @select-all="selectAll"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 30px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" reserve-selection>
              </el-table-column>
              <!-- <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column> -->

              <el-table-column prop="nickName" label="姓名" width="120">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="账号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum"
            >
            </el-pagination>
          </div>
        </div>
        <div style="width: 50%; height: 600px" class="">
          <div
            style="
              width: 70%;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
            "
          >
            <div
              class="header"
              style="
                height: 50px;
                font-size: 20px;
                color: #262626;
                display: flex;
                align-items: center;
              "
            >
              已选用户
            </div>
            <div
              class="head"
              style="
                display: flex;
                height: 50px;
                align-items: center;
                background: #d7d6db;
              "
            >
              <div
                class="head_left"
                style="
                  width: 80%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-right: 1px solid #fafafa;
                "
              >
                姓名
              </div>
              <div
                class="head_right"
                style="
                  width: 20%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                操作
              </div>
            </div>
            <div class="bodyT">
              <div
                v-if="list == ''"
                style="width: 100%; flex: 1; color: #bfbfbf"
                class="dis_center"
              >
                暂无数据
              </div>

              <div
                style="
                  width: 100%;
                  height: 50px;
                  display: flex;
                  background: #fafafa;
                "
                v-for="(item, index) of list"
                :key="index"
                v-else
              >
                <div
                  style="
                    width: 80%;
                    height: 100%;
                    font-size: 20px;
                    color: black;
                  "
                  class="dis_center"
                >
                  {{ item.nickName }}
                </div>
                <div style="width: 20%; height: 100%" class="dis_center">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteItem(item)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleJawhcy = false">取 消</el-button>
        <el-button type="primary" @click="postJawhcy">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 局安委会办公室主任 -->
    <el-dialog
      title="用户选择"
      :visible.sync="centerDialogVisibleJawhbgszr"
      width="70%"
      center
    >
      <div style="width: 100%; display: flex" class="">
        <div
          style="
            width: 50%;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
          class=""
        >
          <div
            class="search"
            style="display: flex; width: 100%; justify-content: space-around"
          >
            <div style="display: flex; align-items: center" class="">
              <span style="width: 20%" @input="changeInput">账号:</span>
              <el-input
                v-model="userListPost.userName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div style="display: flex; align-items: center">
              <span style="width: 30%">姓名：</span>
              <el-input
                v-model="userListPost.nickName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>

            <el-button
              type="primaryz"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="rest"
              >重置</el-button
            >
          </div>
          <div class="body">
            <el-table
              :row-key="handleReserve"
              @select-all="selectAll"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 30px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" reserve-selection>
              </el-table-column>
              <!-- <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column> -->

              <el-table-column prop="nickName" label="姓名" width="120">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="账号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum"
            >
            </el-pagination>
          </div>
        </div>
        <div style="width: 50%; height: 600px" class="">
          <div
            style="
              width: 70%;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
            "
          >
            <div
              class="header"
              style="
                height: 50px;
                font-size: 20px;
                color: #262626;
                display: flex;
                align-items: center;
              "
            >
              已选用户
            </div>
            <div
              class="head"
              style="
                display: flex;
                height: 50px;
                align-items: center;
                background: #d7d6db;
              "
            >
              <div
                class="head_left"
                style="
                  width: 80%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-right: 1px solid #fafafa;
                "
              >
                姓名
              </div>
              <div
                class="head_right"
                style="
                  width: 20%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                操作
              </div>
            </div>
            <div class="bodyT">
              <div
                v-if="list == ''"
                style="width: 100%; flex: 1; color: #bfbfbf"
                class="dis_center"
              >
                暂无数据
              </div>

              <div
                style="
                  width: 100%;
                  height: 50px;
                  display: flex;
                  background: #fafafa;
                "
                v-for="(item, index) of list"
                :key="index"
                v-else
              >
                <div
                  style="
                    width: 80%;
                    height: 100%;
                    font-size: 20px;
                    color: black;
                  "
                  class="dis_center"
                >
                  {{ item.nickName }}
                </div>
                <div style="width: 20%; height: 100%" class="dis_center">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteItem(item)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleJawhbgszr = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="postJawhbgszr">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 院 -->
    <!-- 选择安委会成员 -->
    <el-dialog
      title="用户选择"
      :visible.sync="centerDialogVisible"
      width="70%"
      center
    >
      <div style="width: 100%; display: flex" class="">
        <div
          style="
            width: 50%;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
          class=""
        >
          <div
            class="search"
            style="display: flex; width: 100%; justify-content: space-around"
          >
            <div style="display: flex; align-items: center" class="">
              <span style="width: 20%" @input="changeInput">账号:</span>
              <el-input
                v-model="userListPost.userName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div style="display: flex; align-items: center">
              <span style="width: 30%">姓名：</span>
              <el-input
                v-model="userListPost.nickName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>

            <el-button
              type="primaryz"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="rest"
              >重置</el-button
            >
          </div>
          <div class="body">
            <el-table
              :row-key="handleReserve"
              @select-all="selectAll"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 30px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" reserve-selection>
              </el-table-column>
              <!-- <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column> -->

              <el-table-column prop="nickName" label="姓名" width="120">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="账号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum"
            >
            </el-pagination>
          </div>
        </div>
        <div style="width: 50%; height: 600px" class="">
          <div
            style="
              width: 70%;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
            "
          >
            <div
              class="header"
              style="
                height: 50px;
                font-size: 20px;
                color: #262626;
                display: flex;
                align-items: center;
              "
            >
              已选用户
            </div>
            <div
              class="head"
              style="
                display: flex;
                height: 50px;
                align-items: center;
                background: #d7d6db;
              "
            >
              <div
                class="head_left"
                style="
                  width: 80%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-right: 1px solid #fafafa;
                "
              >
                姓名
              </div>
              <div
                class="head_right"
                style="
                  width: 20%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                操作
              </div>
            </div>
            <div class="bodyT">
              <div
                v-if="list == ''"
                style="width: 100%; flex: 1; color: #bfbfbf"
                class="dis_center"
              >
                暂无数据
              </div>

              <div
                style="
                  width: 100%;
                  height: 50px;
                  display: flex;
                  background: #fafafa;
                "
                v-for="(item, index) of list"
                :key="index"
                v-else
              >
                <div
                  style="
                    width: 80%;
                    height: 100%;
                    font-size: 20px;
                    color: black;
                  "
                  class="dis_center"
                >
                  {{ item.nickName }}
                </div>
                <div style="width: 20%; height: 100%" class="dis_center">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteItem(item)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postAwhcy">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选择安委会副主任 -->
    <el-dialog
      title="选择副主任"
      :visible.sync="centerDialogVisibleYfzr"
      width="70%"
      center
    >
      <div style="width: 100%; display: flex" class="">
        <div
          style="
            width: 50%;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
          class=""
        >
          <div
            class="search"
            style="display: flex; width: 100%; justify-content: space-around"
          >
            <div style="display: flex; align-items: center" class="">
              <span style="width: 20%" @input="changeInput">账号:</span>
              <el-input
                v-model="userListPost.userName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div style="display: flex; align-items: center">
              <span style="width: 30%">姓名：</span>
              <el-input
                v-model="userListPost.nickName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>

            <el-button
              type="primaryz"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="rest"
              >重置</el-button
            >
          </div>
          <div class="body">
            <el-table
              :row-key="handleReserve"
              @select-all="selectAll"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 30px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" reserve-selection>
              </el-table-column>
              <!-- <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column> -->

              <el-table-column prop="nickName" label="姓名" width="120">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="账号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum"
            >
            </el-pagination>
          </div>
        </div>
        <div style="width: 50%; height: 600px" class="">
          <div
            style="
              width: 70%;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
            "
          >
            <div
              class="header"
              style="
                height: 50px;
                font-size: 20px;
                color: #262626;
                display: flex;
                align-items: center;
              "
            >
              已选用户
            </div>
            <div
              class="head"
              style="
                display: flex;
                height: 50px;
                align-items: center;
                background: #d7d6db;
              "
            >
              <div
                class="head_left"
                style="
                  width: 80%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-right: 1px solid #fafafa;
                "
              >
                姓名
              </div>
              <div
                class="head_right"
                style="
                  width: 20%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                操作
              </div>
            </div>
            <div class="bodyT">
              <div
                v-if="list == ''"
                style="width: 100%; flex: 1; color: #bfbfbf"
                class="dis_center"
              >
                暂无数据
              </div>

              <div
                style="
                  width: 100%;
                  height: 50px;
                  display: flex;
                  background: #fafafa;
                "
                v-for="(item, index) of list"
                :key="index"
                v-else
              >
                <div
                  style="
                    width: 80%;
                    height: 100%;
                    font-size: 20px;
                    color: black;
                  "
                  class="dis_center"
                >
                  {{ item.nickName }}
                </div>
                <div style="width: 20%; height: 100%" class="dis_center">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteItem(item)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postAwhfzr">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 选择主任 -->
    <el-dialog
      title="选择主任"
      :visible.sync="centerDialogVisibleYzr"
      width="70%"
      center
    >
      <div style="width: 100%; display: flex" class="">
        <div
          style="
            width: 50%;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
          class=""
        >
          <div
            class="search"
            style="display: flex; width: 100%; justify-content: space-around"
          >
            <div style="display: flex; align-items: center" class="">
              <span style="width: 20%" @input="changeInput">账号:</span>
              <el-input
                v-model="userListPost.userName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div style="display: flex; align-items: center">
              <span style="width: 30%">姓名：</span>
              <el-input
                v-model="userListPost.nickName"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>

            <el-button
              type="primaryz"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="rest"
              >重置</el-button
            >
          </div>
          <div class="body">
            <el-table
              :row-key="handleReserve"
              @select-all="selectAll"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 30px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" reserve-selection>
              </el-table-column>
              <!-- <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column> -->

              <el-table-column prop="nickName" label="姓名" width="120">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="账号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum"
            >
            </el-pagination>
          </div>
        </div>
        <div style="width: 50%; height: 600px" class="">
          <div
            style="
              width: 70%;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
            "
          >
            <div
              class="header"
              style="
                height: 50px;
                font-size: 20px;
                color: #262626;
                display: flex;
                align-items: center;
              "
            >
              已选用户
            </div>
            <div
              class="head"
              style="
                display: flex;
                height: 50px;
                align-items: center;
                background: #d7d6db;
              "
            >
              <div
                class="head_left"
                style="
                  width: 80%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-right: 1px solid #fafafa;
                "
              >
                姓名
              </div>
              <div
                class="head_right"
                style="
                  width: 20%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                操作
              </div>
            </div>
            <div class="bodyT">
              <div
                v-if="list == ''"
                style="width: 100%; flex: 1; color: #bfbfbf"
                class="dis_center"
              >
                暂无数据
              </div>

              <div
                style="
                  width: 100%;
                  height: 50px;
                  display: flex;
                  background: #fafafa;
                "
                v-for="(item, index) of list"
                :key="index"
                v-else
              >
                <div
                  style="
                    width: 80%;
                    height: 100%;
                    font-size: 20px;
                    color: black;
                  "
                  class="dis_center"
                >
                  {{ item.nickName }}
                </div>
                <div style="width: 20%; height: 100%" class="dis_center">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteItem(item)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postAwhzr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  listOrg,
  getOrg,
  delOrg,
  addOrg,
  updateOrg,
  exportOrg,
  UserList,
  adOrg,
} from "@/api/system/org";

export default {
  name: "Org",
  components: {},
  data() {
    return {
      centerDialogVisibleJawhbgszr: false,
      centerDialogVisibleJawhcy: false,
      centerDialogVisibleJfzr: false,
      centerDialogVisibleJcwfzr: false,
      centerDialogVisibleJzr: false,

      isjshow: "",
      isShow: "",
      array: [],
      currentPage4: 1,
      userListPost: {
        deptId: this.$store.state.user.company,
        pageNum: 1,
        pageSize: 10,
        nickName: "",
        userName: "",
      },
      totalNum: "",

      JuShow: "",
      YuanShow: "",
      list: "",
      tableData: [],
      multipleSelection: [],
      centerDialogVisible: false,
      centerDialogVisibleYfzr: false,
      centerDialogVisibleYzr: false,
      companyO: "",
      // 遮罩层
      loading: true,
      // 选中数组
      // ids: [],
      // 非单个禁用
      // single: true,
      // 非多个禁用
      // multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      // total: 0,
      // 安委会表格数据
      // orgList: [],
      // 弹出层标题
      // title: "",
      // 是否显示弹出层
      // open: false,
      // 查询参数
      // queryParams: {
      //   pageNum: 1,
      //   pageSize: 10,
      //   company: null,
      // },
      juData: {
        awhbgszr: [],
        awhcy: [],
        awhzr: [],
        cwfzr: [],
        fzr: [],
      },

      //提交院
      yuanData: {
        awhcy: [],
        fzr: [],
        zr: [],
      },
      // 表单参数
      // form: {},
      // 表单校验
      // rules: {},
    };
  },
  created() {
    this.getVal();
    if (this.$store.state.user.company == 100) {
      listOrg({ company: this.$store.state.user.company }).then((res) => {
        this.JuShow = res.data;
        // this.juData.awhcy = res.data.awhcy;
        // this.juData.fzr = res.data.fzr;
        // this.juData.cwfzr = res.data.cwfzr;
        // this.juData.awhzr = res.data.awhzr;
        // this.juData.awhbgszr = res.data.awhbgszr;

        var arrtwo = Object.keys(res.data);
        // alert(arrone.length !== 0);//true

        if (arrtwo.length == 0) {
          this.isjshow = false;
        } else if (arrtwo.length !== 0) {
          this.isjshow = true;
        }
      });
    } else {
      listOrg({ company: this.$store.state.user.company }).then((res) => {
        this.YuanShow = res.data;
        console.log("res.data=========>", res.data);
        var arrone = Object.keys(res.data);
        // alert(arrone.length !== 0);//true
        console.log();
        if (arrone.length == 0) {
          this.isShow = false;
        } else if (arrone.length !== 0) {
          this.isShow = true;
        }
      });
    }

    console.log(this.$store.state.user.company, "company");
    this.companyO = this.$store.state.user.company;
    // this.getList();
  },
  methods: {
    changJushow() {
      this.isjshow = false;
      this.JuShow.awhbgszr = "";
      this.JuShow.awhcy = "";
      this.JuShow.awhzr = "";
      this.JuShow.cwfzr = "";
      this.JuShow.fzr = "";
    },
    // 添加局安委会的成员
    postJdata() {
      adOrg(this.juData).then((res) => {
            if (res.code == 200) {
          this.$message({
            message: res.msg,
            center: true,
            type: "success",
          });
        }else{
           this.$message({
            message: res.msg,
            center: true,
            type: "error",
          });
        }
      });
    },
    // 局安委会办公室主任
    postJawhbgszr() {
      this.juData.awhbgszr = this.list.map((item) => {
        return {
          userId: item.userId,
          userName: item.nickName,
          telphone: item.phonenumber,
          postType: "awhbgszr",
        };
      });
      this.array = this.list.map((item) => {
        return item.nickName;
      });
      this.JuShow.awhbgszr = this.array.join(",");
      console.log(this.array);
      this.centerDialogVisibleJawhbgszr = false;
      this.list = "";
    },
    postJawhcy() {
      this.juData.awhcy = this.list.map((item) => {
        return {
          userId: item.userId,
          userName: item.nickName,
          telphone: item.phonenumber,
          postType: "awhcy",
        };
      });
      this.array = this.list.map((item) => {
        return item.nickName;
      });
      this.JuShow.awhcy = this.array.join(",");
      console.log(this.array);
      this.centerDialogVisibleJawhcy = false;
      this.list = "";
    },
    postJfzr() {
      this.juData.fzr = this.list.map((item) => {
        return {
          userId: item.userId,
          userName: item.nickName,
          telphone: item.phonenumber,
          postType: "fzr",
        };
      });
      this.array = this.list.map((item) => {
        return item.nickName;
      });
      this.JuShow.fzr = this.array.join(",");
      console.log(this.array);
      this.centerDialogVisibleJfzr = false;
      this.list = "";
    },
    postJcwfzr() {
      this.juData.cwfzr = this.list.map((item) => {
        return {
          userId: item.userId,
          userName: item.nickName,
          telphone: item.phonenumber,
          postType: "cwfzr",
        };
      });
      this.array = this.list.map((item) => {
        return item.nickName;
      });
      this.JuShow.cwfzr = this.array.join(",");
      console.log(this.array);
      this.centerDialogVisibleJcwfzr = false;
      this.list = "";
    },
    postJzr() {
      this.juData.awhzr = this.list.map((item) => {
        return {
          userId: item.userId,
          userName: item.nickName,
          telphone: item.phonenumber,
          postType: "awhzr",
        };
      });
      this.array = this.list.map((item) => {
        return item.nickName;
      });
      this.JuShow.awhzr = this.array.join(",");
      console.log(this.array);
      this.centerDialogVisibleJzr = false;
      this.list = "";
    },

    editor() {
      this.isShow = false;
      this.YuanShow.zr = "";
      this.YuanShow.fzr = "";
      this.YuanShow.awhcy = "";
    },
    //弹框确定 将选中的名字 传到input  并且将item传到awhcy

    // 安委会住任
    postAwhzr() {
      console.log("======>this.list", this.list);
      this.yuanData.zr = this.list.map((item) => {
        console.log(item.userName);
        // return _.pick(item,['userName','userId','phonenumber'])

        //  let {admin,avatar,company,companyName,contactMan,contactTel,createBy,createTime,delFlag,dept,deptId,deptName,email,labelType,loginDate,loginIp,params,phone,postIds,postName,qq,queryType,...obj} = item
        //   return obj
        return {
          userId: item.userId,
          userName: item.nickName,
          telphone: item.phonenumber,
          postType: "zr",
        };
      });

      console.log("this.yuanData.zr========>", this.yuanData.zr);
      console.log(this.yuanData.awhcy);
      this.array = this.list.map((item) => {
        return item.nickName;
      });
      this.YuanShow.zr = this.array.join(",");
      console.log(this.array);
      this.centerDialogVisibleYzr = false;
      this.list = "";
    },
    // 安委会副主任
    postAwhfzr() {
      this.yuanData.fzr = this.list.map((one) => {
        // return _.pick(item,['userName','userId','phonenumber'])

        //  let {admin,avatar,company,companyName,contactMan,contactTel,createBy,createTime,delFlag,dept,deptId,deptName,email,labelType,loginDate,loginIp,params,phone,postIds,postName,qq,queryType,...obj} = item
        //   return obj
        return {
          userId: one.userId,
          userName: one.nickName,
          telphone: one.phonenumber,
          postType: "fzr",
        };
      });

      console.log(this.yuanData.awhcy);
      this.array = this.list.map((item) => {
        return item.nickName;
      });
      this.YuanShow.fzr = this.array.join(",");
      console.log(this.array);
      this.centerDialogVisibleYfzr = false;
      this.list = "";
    },

    // 安委会成员
    postAwhcy() {
      this.yuanData.awhcy = this.list.map((two) => {
        return {
          userId: two.userId,
          userName: two.nickName,
          telphone: two.phonenumber,
          postType: "awhcy",
        };
      });

      this.array = this.list.map((item) => {
        return item.nickName;
      });
      this.YuanShow.awhcy = this.array.join(",");
      console.log(this.array);
      this.centerDialogVisible = false;
      this.list = "";
    },
    handleReserve(row) {
      return row.userName;
    },
    //全选
    selectAll(selection) {
      console.log("selection=========>", selection);
      this.$nextTick(() => {
        this.list = selection;
      });
    },
    //删除选中的用户  解决右边删除左边的小问题；
    deleteItem(val) {
      console.log(val);
      // this.$nextTick(()=>{
      //    this.list.splice(val,1)
      // })
      const arr = this.tableData.filter((sub) => {
        return sub.userName === val.userName;
      });
      const row = arr.length ? arr[0] : item;
      this.$refs.multipleTable &&
        this.$refs.multipleTable.toggleRowSelection(row, false);
      // var _this = this
      // this.tableData.forEach(item=>{
      //   if(item.userName == _this.list[val].userName){
      //      this.$refs.multipleTable.toggleRowSelection(row, false);
      //   }
      // })
    },
    // 弹框重置
    rest() {
      (this.userListPost.nickName = ""),
        (this.userListPost.userName = ""),
        this.$nextTick(() => {
          this.list = "";
        });
      this.getVal();
    },
    changeInput() {
      this.getVal();
    },
    search() {
      console.log("111111111");
      this.getVal();
    },
    handleSizeChange(val) {
      console.log("val========>", val);
    },
    handleCurrentChange(val) {
      console.log("val========>", val);
      this.userListPost.pageNum = val;
      this.currentPage4 = parseInt(val);
      this.getVal();
    },
    //获取要选中的user
    getVal() {
      UserList(this.userListPost).then((res) => {
        this.tableData = res.rows;
        this.totalNum = res.total;
      });
    },
    postData() {
      adOrg(this.yuanData).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            center: true,
            type: "success",
          });
        }else{
           this.$message({
            message: res.msg,
            center: true,
            type: "error",
          });
        }
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.$nextTick(() => {
        this.list = selection;
      });

      // this.ids = selection.map((item) => item.id);
      // this.single = selection.length !== 1;
      // this.multiple = !selection.length;
    },
    /** 查询安委会列表 */
    // getList() {
    //   this.loading = true;
    //   listOrg(this.queryParams).then((response) => {
    //     this.orgList = response.rows;
    //     this.total = response.total;
    //     this.loading = false;
    //   });
    // },
    // 取消按钮
    // cancel() {
    //   this.open = false;
    //   this.reset();
    // },
    // 表单重置
    // reset() {
    //   this.form = {
    //     id: null,
    //     telphone: null,
    //     userId: null,
    //     userName: null,
    //     company: null,
    //     postType: null,
    //     createBy: null,
    //     createTime: null,
    //     updateBy: null,
    //     updateTime: null,
    //     delFlag: null,
    //   };
    //   this.resetForm("form");
    // },
    /** 搜索按钮操作 */
    // handleQuery() {
    //   this.queryParams.pageNum = 1;
    //   this.getList();
    // },
    /** 重置按钮操作 */
    // resetQuery() {
    //   this.resetForm("queryForm");
    //   this.handleQuery();
    // },

    /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加安委会";
    // },
    /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset();
    //   const id = row.id || this.ids;
    //   getOrg(id).then((response) => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改安委会";
    //   });
    // },
    /** 提交按钮 */
    // submitForm() {
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       if (this.form.id != null) {
    //         updateOrg(this.form).then((response) => {
    //           this.msgSuccess("修改成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       } else {
    //         addOrg(this.form).then((response) => {
    //           this.msgSuccess("新增成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       }
    //     }
    //   });
    // },
    /** 删除按钮操作 */
    // handleDelete(row) {
    //   const ids = row.id || this.ids;
    //   this.$confirm('是否确认删除安委会编号为"' + ids + '"的数据项?', "警告", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(function () {
    //       return delOrg(ids);
    //     })
    //     .then(() => {
    //       this.getList();
    //       this.msgSuccess("删除成功");
    //     });
    // },
    /** 导出按钮操作 */
    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.$confirm("是否确认导出所有安委会数据项?", "警告", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(function () {
    //       return exportOrg(queryParams);
    //     })
    //     .then((response) => {
    //       this.download(response.msg);
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  flex: 1;
}
</style>