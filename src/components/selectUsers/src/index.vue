<template>
    <sy-dialog :title="title" footHeight="40px" height="522px" width="800px" position="middle" :visible.sync="visible" @close="closeDialog" :class="'selectUsers selectUsers' + uid" slide="fade">
        <div slot="body">
            <div class="ib fr tools">
                <span class="ib" v-show="userTypes.length > 1">类型：</span>
                <el-select v-model="selectUserType" placeholder="请选择用户类型" style="width: 80px;" v-show="userTypes.length > 1">
                    <el-option v-for="item in userTypes" :key="item" :value="item" :label="item == 1 ? '学生' : item == 2 ? '教师' : item == 3 ? '家长' : ''"></el-option>
                </el-select>
                <el-input placeholder="请输入关键字" icon="search" @keyup.enter.native="search" :on-icon-click="search" class="search" v-model.trim="keyWord"></el-input>
            </div>
            <el-tabs v-model="tabsSelect">
                <el-tab-pane v-for="t in tabs" :key="t.type" :label="t.name" :name="t.type">
                    <div v-if="t.type == 'all'" :class="'selectUsersPanel ' + t.type">
                        <div class="u-top mb15">
                            <div class="u-header">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll">待选用户</el-checkbox>
                            </div>
                            <el-checkbox-group v-model="selectUserIds" class="u-users">
                                <el-checkbox v-for="u in userJson" :label="u.id" @change="handleCheckedUser" :key="u.id" :title="u.realName">{{u.realName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="u-top">
                            <div class="u-header">已选用户
                                <!-- <span v-if="selectUserIds && selectUserIds.length > 0">({{selectUserIds.length}})</span> -->
                                <div class="trash">
                                    <el-tooltip content="清除已选用户" placement="left">
                                        <i class="fa fa-trash-o" @click="trash"></i>
                                    </el-tooltip>
                                </div>
                            </div>
                            <el-checkbox-group v-model="selectUserIds" class="u-users">
                                <el-checkbox v-for="u in checkedUserJson" @change="checkedUser" :label="u.id" :key="u.id" :title="u.realName">{{u.realName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div v-else-if="t.type == 'gradeclass' || t.type == 'department' || t.type == 'subject'" :class="'selectUsersPanel ' + t.type">
                        <el-row>
                            <el-col :span="6" class="left-col">
                                <el-tree :ref="t.type" :data="treeDatas" :props="treeProps" accordion highlight-current node-key="id" :current-node-key="currentTreeId" @current-change="gradeClassTreeChange"></el-tree>
                                <div class="w5 hfull line"></div>
                            </el-col>
                            <el-col :span="18" class="right-col">
                                <div class="u-top mb15">
                                    <div class="u-header">
                                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll">待选用户</el-checkbox>
                                    </div>
                                    <el-checkbox-group v-model="selectUserIds" class="u-users">
                                        <el-checkbox v-for="u in userJson" :label="u.id" @change="handleCheckedUser" :key="u.id">{{u.realName}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div class="u-top">
                                    <div class="u-header">已选用户
                                        <!-- <span v-if="selectUserIds && selectUserIds.length > 0">({{selectUserIds.length}})</span> -->
                                        <div class="trash">
                                            <el-tooltip content="清除已选用户" placement="left">
                                                <i class="fa fa-trash-o" @click="trash"></i>
                                            </el-tooltip>
                                        </div>
                                    </div>
                                    <el-checkbox-group v-model="selectUserIds" class="u-users">
                                        <el-checkbox v-for="u in checkedUserJson" @change="checkedUser" :label="u.id" :key="u.id">{{u.realName}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-else :class="'selectUsersPanel ' + t.type">{{t.name}}</div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelHandle">取 消</el-button>
            <el-button type="primary" @click="okHandle">确 定</el-button>
        </div>
    </sy-dialog>
</template>

<script>
import _ from 'lodash';
import utils from '../utils.js';
import methods from '../methods.js';
import defaults from './options.js';

export default {
    mounted() {
    	this.fetchSelectUserIds();
        this.createUnits();
        this.createGroupTypes();
    },
    destroyed() {
        this.$el.parentNode.removeChild(this.$el);
    },
    watch: {
        visible(val) {
            if (val) this.uid++;
        },
        unitId(val, oldval) {
            if (!val || val.length == 0) {
                return false;
            }
            this.createGroupTypes();
            this.createUserGroups();
        },
        groupType(val, oldval) {
            if (!val || val.length == 0 || val == oldval) {
                return false;
            }
        },
        selectUserType(val, oldval) {
            this.userJson = [];
            if (!val || val.length == 0 || val == oldval) {
                return false;
            }
            this.createGroupTypes();
            this.createUserGroups();
        },
        tabsSelect(val, oldval) {
            this.userJson = [];
            this.checkAll = false;
            this.isIndeterminate = false;
            if (this.selectUserType == 2) {
                if (val == 'gradeclass' || val == 'department' || val == 'all' || val == 'subject') {
                    this.treeDatas = [];
                    this.createUserGroups();
                }
            }

        }
    },
    computed: {
        newGroupId() {
            let _ref = this.$refs[this.tabsSelect],
                _tree = (this.$isArry(_ref) ? _ref[0] : _ref),
                ids = [];
            // 班主任
            if (this.groupType == 'headTeacher' || this.groupType == 'lessonTeacher') {
                if (this.groupId == this.groupType) {
                    // 班主任
                    _.forEach(_.filter(this.treeDatasBack, {
                        parentId: this.groupId
                    }), (g) => {
                        _.forEach(_.filter(this.treeDatasBack, {
                            parentId: g.id
                        }), (c) => {
                            ids.push(c.id.replace(this.groupType + '_class_', ''));
                        });
                    });
                } else if (this.groupId.indexOf(this.groupType + '_grade_') != -1) {
                    // 年级
                    _.forEach(_.filter(this.treeDatasBack, {
                        parentId: this.groupId
                    }), (c) => {
                        ids.push(c.id.replace(this.groupType + '_class_', ''));
                    });
                } else if (this.groupId.indexOf(this.groupType + '_class_') != -1) {
                    // 班级
                    ids.push(this.groupId.replace(this.groupType + '_class_', ''));
                }
            }
            if (ids.length > 0) {
                this.groupId = ids.join(',');
            }
        }
    },
    methods: methods
};
</script>