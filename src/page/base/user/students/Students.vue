<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerLeft" v-if="isHiddenTree">
                <span>组织架构</span>
            </div>
            <div slot="headerRight" class="line-height-56">
                <span>{{currentText}} 学生列表</span>
            </div>
            <div slot="bodyLeft" style="padding: 0;" v-if="isHiddenTree">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56" style="background:#fff;">
                        <el-input
                            placeholder="请输入关键字"
                            icon="search"
                            v-model.trim="inputValue"
                            size="small"
                            @keyup.enter.native="handleIconClick"
                            :on-icon-click="handleIconClick">
                        </el-input>
                    </div>
                    <div slot="bodyRight" style="padding: 0;">
                        <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            :empty-text="emptyTreeText"
                            node-key="id"
                            ref="tree"
                            style="border:0;"
                            @node-expand="handleNodeClick"
                            :filter-node-method="filterNode"
                            class="full-parent"
                            :current-node-key="currentNodeKey"
                            :highlight-current="true"
                            :default-expanded-keys="defaultKeys"
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </sy-grad-4>
            </div>
            <div slot="bodyRight" style="padding: 0;">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56">
                        <div class="sy-row">
                            <div class="sy-col sy-10">
                                <span style="fontSize:12px ;font-weight: normal;">关键字：</span>
                                <el-input
                                    style="width:256px;"
                                    size="small"
                                    icon="search"
                                    v-model.trim="listParmars.keyword"
                                    @keyup.enter.native="handleKeyIconClick"
                                    :on-icon-click="handleKeyIconClick"
                                    placeholder="账号、姓名、手机、邮箱、身份证号"></el-input>
                            </div>
                            <div class="sy-col sy-10 right" v-show="isNotSchool">
                                <el-button type="" size="small" @click="handleRegisterDialog" v-if="codeList['btn_base_student_register']">注册</el-button>
                                <el-button type="" size="small" @click="goStudentCodeImport('import')" v-if="codeList['btn_base_student_import']">导入</el-button>
                                <el-button type="" size="small" @click="openStudentTypeDilog" v-if="codeList['btn_base_student_tpye']">类型</el-button>
                                <el-button type="" size="small" @click="goStudentCodeImport('number')" v-if="codeList['btn_base_student_studentId']">学号</el-button>
                                <!-- <el-button type="" size="small" @click="sortingDialog = true">排序</el-button> -->
                                <el-button type="" size="small" @click="openDownLoad" v-if="codeList['btn_base_student_download']">下载</el-button>
                            </div>
                        </div>
                    </div>
                    <div slot="bodyRight" style="height:100%;width:100%;padding:0px 10px;">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            border
                            stripe
                            :empty-text="emptyText"
                            tooltip-effect="dark"
                            height="100%"
                            style="height:100%;width:100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column v-for="item in appColumn"
                                :key="item.prop"
                                :width="item.width"
                                :align="item.align"
                                :label="item.label">
                                <template scope="scope">
                                    <el-button type="text" @click="handleTeacherOpen(scope.row)" v-if="item.prop === 'status' && codeList['btn_base_student_lock']">
                                        <i v-if="scope.row.status == 1" class="fa fa-toggle-on" aria-hidden="true" title="点击设置离校"></i>
                                        <i v-else class="fa fa-toggle-off" aria-hidden="true" title="点击设置在校"></i>
                                    </el-button>
                                    <span v-if="item.prop !== 'gender' && item.prop !== 'status'">{{scope.row[item.prop]}}</span>
                                    <span v-if="item.prop === 'gender'">{{scope.row[item.prop] === 1 ? '男' : scope.row[item.prop] === 2 ? '女' : ''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="150" align="center">
                                <template scope="scope">
                                    <el-button
                                    size="small"
                                    type="text"
                                    v-if="codeList['btn_base_student_update']"
                                    @click="handleEdit(scope.$index, scope.row)"><i class="fa fa-pencil-square-o" title="编辑"></i></el-button>
                                    <el-button
                                    size="small"
                                    type="text"
                                    v-if="codeList['btn_base_student_showPermission']"
                                    @click="handleAuthority(scope.$index, scope.row)"><i class="fa fa-eye" aria-hidden="true" title="查看权限"></i></el-button>
                                    <el-button
                                    size="small"
                                    type="text"
                                    v-if="codeList['btn_base_student_dellock']"
                                    @click="handleClearMsg(scope.$index, scope.row)"><i class="fa fa-eraser" aria-hidden="true" title="清除登录错误信息"></i></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div slot="footer" class="left">
                        <el-button type="danger" v-if="codeList['btn_base_student_logout']" :loading="deleteBtn" v-show="isNotSchool" :disabled="multipleSelection.length === 0" size="small" @click="handleDelegateTeacher">注销</el-button>
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="listParmars.start"
                            :page-size="listParmars.size"
                            class="pagination-mf"
                            layout="total, prev, pager, next"
                            :total="totals">
                        </el-pagination>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
        <!-- 新增 -->
        <sy-dialog
            title="注册"
            :visible.sync="registerDialog"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="580px"
            slide="fade">
            <div slot="body" style="overflow:auto;padding:10px 10px 20px 0;">
                <el-form label-position="right" label-width="100px" :rules="registerFormRules" ref="registerForm" :model="registerForm">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="账号：" prop="loginName">
                                <el-input v-model.trim="registerForm.loginName" @blur="handleParentName"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名：" prop="realName">
                                <el-input v-model.trim="registerForm.realName"></el-input>
                            </el-form-item>
                            <el-form-item label="密码："  prop="loginPasswd">
                                <el-input v-model.trim="registerForm.loginPasswd" type=""  @blur="handleParentPasswd"></el-input>
                            </el-form-item>
                            <el-form-item label="性别：" prop="gender">
                                <el-select v-model="registerForm.gender" placeholder="请选择" style="width:100%;">
                                    <el-option
                                        v-for="item in genderOptions"
                                        :key="item.value + 'gneder'"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" style="height:200px;">
                            <el-upload
                                class="avatar-uploader"
                                :action="imgUrl"
                                name="fileUpload"
                                :show-file-list="false"
                                :data="uploaddata"
                                v-loading="imgloading"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <div class="avatar-content">
                                    <img :src="showImgUrl" class="avatar-img">
                                </div>
                                <p>上传照片【规格】</p>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="学生类型：" prop="studentType">
                                <el-select v-model="registerForm.studentType" placeholder="请选择" style="width:100%;">
                                    <el-option
                                        v-for="item in studentTypeOptions"
                                        :key="item.value + 'department1'"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号码：" prop="loginMobile">
                                <el-input v-model.trim="registerForm.loginMobile"></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱：" prop="loginEmail">
                                <el-input v-model.trim="registerForm.loginEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="年级：">
                                <el-select v-model="registerForm.gradeId" placeholder="选择年级" style="width:100%;" @change="handleChangeGrade">
                                    <el-option
                                        v-for="item in gradeOptions"
                                        :key="item.value + 'department1'"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="考勤号：" prop="pin">
                                <el-input v-model.trim="registerForm.pin" type=""></el-input>
                            </el-form-item>
                            <el-form-item label="原学籍副号：" prop="yxjfh">
                                <el-input v-model.trim="registerForm.yxjfh"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="入学学号：" prop="number">
                                <el-input v-model.trim="registerForm.number"></el-input>
                            </el-form-item>
                            <el-form-item label="班内学号：" prop="bnxh">
                                <el-input v-model.trim="registerForm.bnxh"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号：" prop="identificationNumber">
                                <el-input v-model.trim="registerForm.identificationNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="班级：">
                                <el-select v-model="registerForm.classId" placeholder="选择班级" style="width:100%;">
                                    <el-option
                                        v-for="item in classOptions"
                                        :key="item.value + 'department1'"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="全国(学籍)号：" prop="nationNumber">
                                <el-input v-model="registerForm.nationNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="学籍副号：" prop="xjfh">
                                <el-input v-model.trim="registerForm.xjfh"></el-input>
                            </el-form-item>


                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="家庭住址：" prop="address">
                                <el-input v-model.trim="registerForm.address" type="textarea" resize="none" :rows="2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24" class="center">
                            <h4>家长信息</h4>
                        </el-col>
                        <el-col :span="12">
                            <div class="register-form">
                                <el-form-item label="家长账号：" prop="parentAccount">
                                    <el-input v-model.trim="registerForm.parentAccount"></el-input>
                                </el-form-item>
                                <el-form-item label="家长密码：" prop="parentLoginPasswd">
                                    <el-input v-model.trim="registerForm.parentLoginPasswd" type=""></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="家长姓名：" prop="parentName">
                                <el-input v-model.trim="registerForm.parentName" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="家长电话：" prop="parentPhone">
                                <el-input v-model.trim="registerForm.parentPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" style="padding: 0 15px 0 0;">
                <el-button type="" @click="registerDialog = false">取 消</el-button>
                <el-button type="primary" :loading="addNewBtn" @click="submitRegisterForm('registerForm')">确 定</el-button>
            </div>
        </sy-dialog>
        <!-- 排序 -->
        <el-dialog
            title="排序"
            :visible.sync="sortingDialog"
            size="tiny">
            <el-table
                :data="sortingData"
                border
                stripe
                :height="sortingData.length>10 ? '400' : ''"
                style="width: 100%">
                <el-table-column
                    prop="account"
                    label="账号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="部门">
                </el-table-column>
                <el-table-column label="序号">
                    <template scope="scope">
                        <el-input
                            size="mini"
                            placeholder="请输入序号"
                            v-model="scope.row.sort">
                        </el-input>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sortingDialog = false">保存</el-button>
            </span>
        </el-dialog>
        <!-- 用户下载 -->
        <sy-dialog
            title="用户下载"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="500px"
            slide="fade"
            :visible.sync="downLoadDialog">
            <div slot="body" style="padding:10px;">
                <el-form ref="downLoadForm" :model="downLoadForm" label-width="130px" label-position="right">
                    <el-form-item label="选择要下载的年级：">
                        <el-select v-model="downLoadForm.gradeId" clearable placeholder="" style="width:100%;" @change="handleChangeGrade">
                            <el-option
                                v-for="item in gradeOptions"
                                :key="item.value + 'department1'"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择要下载的班级：">
                        <el-select v-model="downLoadForm.classId" clearable placeholder="" style="width:100%;">
                            <el-option
                                v-for="item in classOptions"
                                :key="item.value + 'department1'"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择要导出的字段：">
                        <div class="border">
                            <el-checkbox-group v-model="downLoadForm.downloadOptions">
                                <el-checkbox
                                    v-for="item in downloadDatas"
                                    :label="item.value"
                                    :checked="item.isSelected"
                                    :disabled="item.isSelected"
                                    :key="item.label"
                                    style="marginLeft:5px;">
                                    {{item.label}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button type="" @click="downLoadDialog = false" size="small">取 消</el-button>
                <el-button type="primary" @click="downLoad">导 出</el-button>
            </div>
        </sy-dialog>
        <!-- 用户权限 -->
        <sy-dialog
            title="用户权限"
            :close-on-click-modal="false"
            position="middle"
            height="50%"
            width="400px"
            slide="fade"
            :visible.sync="authorityDialog">
            <div slot="body" style="padding:10px;">
                <el-tree :data="authData" :empty-text="emptyauthText" style="border:0;" :props="defaultProps"></el-tree>
            </div>
        </sy-dialog>
        <!-- 学生类型 -->
        <sy-dialog
            title="学生类型"
            :visible.sync="studentTypeDialog"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="400px"
            slide="fade">
            <div slot="body" style="padding:10px 10px 25px 10px;">
                <div class="right" style="padding:10px 0;">
                    <el-button type="" size="small" @click="openAddStudentTypeDialog">新增</el-button>
                </div>
                <el-table
                    :data="studentTypeData"
                    border
                    stripe
                    :empty-text="emptyText"
                    style="width: 100%">
                    <el-table-column
                        prop="sort"
                        width="70"
                        align="center"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="学生类型">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        align="center"
                        label="操作">
                        <template scope="scope">
                            <el-button @click="handleEditorStudentType(scope.row)" type="text" size="mini"><i class="fa fa-pencil-square-o" title="编辑"></i></el-button>
                            <el-button type="text" size="mini" @click="handleDelateStudentType(scope.row)"><i class="fa fa-times" aria-hidden="true" title="删除" style="color:#FF4949"></i></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </sy-dialog>
        <!-- 编辑 -->
        <sy-dialog
            title="编辑学生类型"
            position="middle"
            height="auto"
            width="300px"
            slide="fade"
            :visible.sync="editorStudentTypeDialog">
            <div slot="body" style="padding: 10px;">
                <el-form label-position="right" label-width="80px" :model="editorStudentTypeForm" :rules="addStudentTypeFormRules" ref="editorStudentTypeForm">
                    <el-form-item label="序号" prop="sort">
                        <el-input v-model.number="editorStudentTypeForm.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="学生类型" prop="name">
                        <el-input v-model="editorStudentTypeForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button type="" @click="editorStudentTypeDialog = false" size="small">取 消</el-button>
                <el-button type="primary" :loading="editBtn1" @click="handlerEditorStudentType('editorStudentTypeForm')" size="small">确定</el-button>
            </div>
        </sy-dialog>
        <!-- 新增 -->
        <sy-dialog
            title="新增学生类型"
            :visible.sync="addStudentTypeDialog"
            position="middle"
            height="auto"
            width="300px"
            slide="fade"
            :close-on-click-modal="false">
            <div slot="body" style="padding: 10px;">
                <el-form label-position="right" label-width="80px" :rules="addStudentTypeFormRules" ref="addStudentTypeForm" :model="addStudentTypeForm">
                    <el-form-item label="序号" prop="sort">
                        <el-input v-model.number="addStudentTypeForm.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="学生类型" prop="name">
                        <el-input v-model="addStudentTypeForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button type="" @click="addStudentTypeDialog = false" size="small">取 消</el-button>
                <el-button type="primary" :loading="addNewBtn1" @click="handlerAddStudentType('addStudentTypeForm')" size="small">确 定</el-button>
            </div>
        </sy-dialog>
        <!-- 编辑 -->
        <sy-dialog
            title="编辑学生信息"
            :visible.sync="editorDialog"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="580px"
            slide="fade">
            <div
                slot="body"
                v-loading="loading1"
                element-loading-text="拼命加载个人信息中..."
                style="overflow:auto;padding:10px 10px 20px 0;">
                <el-form label-position="right" label-width="100px" :rules="registerFormRules" ref="editForm" :model="editForm">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="账号：" prop="loginName">
                                <el-input v-model.trim="editForm.loginName" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="姓名：" prop="realName">
                                <el-input v-model.trim="editForm.realName"></el-input>
                            </el-form-item>
                            <el-form-item label="密码："  prop="loginPasswd">
                                <el-input v-model.trim="editForm.loginPasswd" :type="ispassword" @focus="passwordOnFocus"></el-input>
                            </el-form-item>
                            <el-form-item label="性别：" prop="gender">
                                <el-select v-model="editForm.gender" placeholder="请选择" style="width:100%;">
                                    <el-option
                                        v-for="item in genderOptions"
                                        :key="item.value + 'gneder'"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" style="height:200px;">
                            <el-upload
                                class="avatar-uploader"
                                :action="imgUrl"
                                name="fileUpload"
                                :data="uploaddata"
                                :show-file-list="false"
                                v-loading="imgloading"
                                :on-success="handleAvatarSuccess1"
                                :before-upload="beforeAvatarUpload">
                                <div class="avatar-content">
                                    <img :src="editForm.img" class="avatar-img">
                                </div>
                                <p>上传照片【规格】</p>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="学生类型：" prop="studentType">
                                <el-select v-model="editForm.studentType" placeholder="请选择" style="width:100%;">
                                    <el-option
                                        v-for="item in studentTypeOptions"
                                        :key="item.value + 'department1'"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号码：" prop="loginMobile">
                                <el-input v-model.trim="editForm.loginMobile"></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱：" prop="loginEmail">
                                <el-input v-model.trim="editForm.loginEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="年级：">
                                <el-select v-model="editForm.gradeId" placeholder="选择年级" style="width:100%;" @change="handleChangeGrade">
                                    <el-option
                                        v-for="item in gradeOptions"
                                        :key="item.value + 'department1'"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="考勤号：" prop="pin">
                                <el-input v-model.trim="editForm.pin" ></el-input>
                            </el-form-item>
                            <el-form-item label="原学籍副号：" prop="yxjfh">
                                <el-input v-model.trim="editForm.yxjfh"></el-input>
                            </el-form-item>


                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="入学学号：" prop="number">
                                <el-input v-model.trim="editForm.number"></el-input>
                            </el-form-item>
                            <el-form-item label="班内学号：" prop="bnxh">
                                <el-input v-model.trim="editForm.bnxh"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号：" prop="identificationNumber">
                                <el-input v-model.trim="editForm.identificationNumber" ></el-input>
                            </el-form-item>
                            <el-form-item label="班级：">
                                <el-select v-model="editForm.classId" placeholder="选择班级" style="width:100%;">
                                    <el-option
                                        v-for="item in classOptions"
                                        :key="item.value + 'department1'"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="全国(学籍)号：" prop="nationNumber">
                                <el-input v-model="editForm.nationNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="学籍副号：" prop="xjfh">
                                <el-input v-model.trim="editForm.xjfh"></el-input>
                            </el-form-item>


                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="家庭住址：" prop="address">
                                <el-input v-model="editForm.address" type="textarea" resize="none" :rows="2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24" class="center">
                            <h4>家长信息</h4>
                        </el-col>
                        <el-col :span="12">
                            <div class="register-form">
                                <el-form-item label="家长账号：" prop="parentAccount">
                                    <el-input v-model.trim="editForm.parentAccount"></el-input>
                                </el-form-item>
                                <el-form-item label="家长密码：" prop="parentLoginPasswd">
                                    <el-input v-model.trim="editForm.parentLoginPasswd" :type="parentpassword" @focus="passwordParentOnFocus"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="家长姓名：" prop="parentName">
                                <el-input v-model.trim="editForm.parentName" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="家长电话：" prop="parentPhone">
                                <el-input v-model.trim="editForm.parentPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" style="padding: 0 15px 0 0;">
                <el-button type="" @click="editorDialog = false">取 消</el-button>
                <el-button type="primary" :loading="editBtn"  @click="submitEditeForm('editForm')">确 定</el-button>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
import student from './student.js';
import data from '../data.js';
export default {
    mixins: [student,data]
}
</script>

<style scoped>
    @import "./student.css";
</style>
