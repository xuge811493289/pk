<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerRight" class="line-height-56">
                <span>学年：</span>
                <el-select v-model="form.year" placeholder="请选择学年" size="small" @change="changeYear">
                    <el-option v-for="item in yearList" :key="item.id" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <span style="padding-left:10px;">学期：</span>
                <el-select v-model="form.term" placeholder="请选择学期" size="small" @change="changeTerm">
                    <el-option label="第一学期" value="1"></el-option>
                    <el-option label="第二学期" value="2"></el-option>
                </el-select>
            </div>
        </sy-grad-4>
        <div class="content">
            <sy-grad-4>
                <div slot="headerLeft">单位</div>
                <div slot="headerRight" class="line-height-56">{{currentUnit}} 课程</div>
                <div slot="bodyLeft">
                    <sy-grad-4 :border="false">
                        <div slot="headerRight" class="line-height-56" style="background:#fff;">
                            <el-input
                                placeholder="请输入关键字"
                                icon="search"
                                v-model.trim="filterText"
                                @keyup.enter.native="handleIconClick"
                                size="small"
                                :on-icon-click="handleIconClick">
                            </el-input>
                        </div>
                        <div slot="bodyRight">
                            <el-tree :data="data" :props="defaultProps" :empty-text="emptyTreeText"
                                node-key="id" style="border:0;" ref="tree"
                                class="full-parent"
                                :highlight-current="true"
                                :filter-node-method="filterNode"
                                @node-expand="handleNodeClick"
                                :default-expanded-keys="defaultExpandedkeys"
                                :default-checked-keys="[]"
                                :current-node-key="currentNodeKey"
                                @node-click="handleNodeClick">
                            </el-tree>
                        </div>
                    </sy-grad-4>
                </div>
                <div slot="bodyRight" style="width:100%;height:100%;padding: 0;">
                    <sy-grad-4 :border="false">
                        <div slot="headerRight" class="line-height-56 right" v-if="codeList['btn_base_classcourse_batch'] || codeList['btn_base_classcourse_add']">
                            <el-button size="small" @click="openDialogAddMore" v-if="codeList['btn_base_classcourse_batch']">批量</el-button>
                            <el-button size="small" @click="openDialogAddOne" v-if="codeList['btn_base_classcourse_add']">新增</el-button>
                        </div>
                        <div slot="bodyRight" style="width:100%;height:100%;padding: 0 10px;">
                            <el-table
                                ref="multipleTable"
                                :data="gradeTableData"
                                :empty-text="emptyText"
                                border
                                height="100%"
                                v-if="isGrade"
                                tooltip-effect="dark"
                                style="width:100%;height:100%;"
                                @selection-change="handleSelectionChangeGrade">
                                <el-table-column
                                    type="selection"
                                    width="55">
                                </el-table-column>
                                <el-table-column
                                    v-for="(item,index) in gradeColums"
                                    :key="item.prop"
                                    :prop="item.prop"
                                    :label="item.label">
                                    <template scope="scope">
                                        <span v-if="item.prop !== 'weekHour' && item.prop !== 'sumHour'">{{scope.row[item.prop]}}</span>
                                        <span v-if="(item.prop === 'weekHour' || item.prop === 'sumHour') && !scope.row.isEdit">{{scope.row[item.prop]}}</span>
                                        <el-input
                                            size="mini"
                                            v-if="item.prop === 'weekHour' && scope.row.isEdit"
                                            placeholder=""
                                            @blur="hanleBuleCheckNumber(scope.row ,'weekHour',scope.row.weekHour)"
                                            v-model="scope.row.weekHour">
                                        </el-input>
                                        <el-input
                                            size="mini"
                                            v-if="item.prop === 'sumHour' && scope.row.isEdit"
                                            @blur="hanleBuleCheckNumber(scope.row ,'sumHour',scope.row.sumHour)"
                                            placeholder=""
                                            v-model="scope.row.sumHour">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table
                                ref="multipleTable"
                                :data="classTableData"
                                :empty-text="emptyText"
                                border
                                height="100%"
                                v-if="!isGrade"
                                tooltip-effect="dark"
                                style="width:100%;height:100%;"
                                @selection-change="handleSelectionChangeClass">
                                <el-table-column
                                    type="selection"
                                    width="55">
                                </el-table-column>
                                <el-table-column
                                    v-for="(item,index) in classColums"
                                    :key="item.prop"
                                    :prop="item.prop"
                                    :label="item.label">
                                    <template scope="scope">
                                        <span v-if="item.prop !== 'weekHour'">{{scope.row[item.prop]}}</span>
                                        <span v-if="item.prop === 'weekHour' && !scope.row.isEdit">{{scope.row[item.prop]}}</span>
                                        <el-input
                                            size="mini"
                                            v-if="item.prop === 'weekHour' && scope.row.isEdit"
                                            placeholder=""
                                            @blur="hanleBuleCheckNumber(scope.row ,'weekHour',scope.row.weekHour)"
                                            v-model="scope.row.weekHour">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div slot="footer">
                            <el-button v-if="codeList['btn_base_classcourse_update']" :loading="editBtn" :disabled="multipleSelectionClass.length === 0 && multipleSelectionGrade.length === 0" size="small" @click="handlerEdit(status)">{{editText}}</el-button>
                            <el-button v-if="codeList['btn_base_classcourse_delete']" :loading="deleteBtn" :disabled="multipleSelectionClass.length === 0 && multipleSelectionGrade.length === 0" type="danger" size="small" @click="handlerEdit('remove')">删除</el-button>
                        </div>
                    </sy-grad-4>
                </div>
            </sy-grad-4>
        </div>
        <!-- 单个新增 -->
        <sy-dialog 
            height="500px"
            width="400px"
            position="middle"
            :close-on-click-modal="false"
            title="新增课程"
            slide="fade"
            :visible.sync="dialogAddOne">
            <div slot="body" style="padding:0 0 0 15px;">
                <sy-tree 
                    :data="classData" 
                    :props="defaultProps"
                    show-checkbox
                    node-key="id" 
                    style="border:0;margin:0;"
                    class="full-parent"
                    :empty-text="emptyauthText"
                    ref="tree2"
                    check-strictly
                    :highlight-current="true">
                </sy-tree>
            </div>
            <div slot="footer">
                <el-button @click="dialogAddOne = false">取 消</el-button>
                <el-button type="primary" @click="saveNewClass" ref="httpBtn" :loading="httpBtn">确 定</el-button>
            </div>
        </sy-dialog>
        <!-- 批量新增 -->
        <sy-dialog 
            height="400px"
            width="500px"
            :close-on-click-modal="false"
            position="middle"
            title="批量增加年级班级课程"
            slide="fade"
            :visible.sync="dialogAddMore">
            <div slot="body" style="padding: 15px;">
                <el-row>
                    <el-col :span="12">
                        <div class="">
                            <div slot="headerRight">选择年级班级</div>
                            <div slot="bodyRight">
                                <sy-ztree 
                                    style="background:#fff;"
                                    :treeData="gradeData"
                                    :chkboxType="chkboxType"
                                    :defaultChecked="defaultChecked"
                                    @checked-node="checkedNode"
                                    showCheckBox>
                                </sy-ztree>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="">
                            <div slot="headerRight">选择学科</div>
                            <div slot="bodyRight">
                                <sy-tree 
                                    :data="classData" 
                                    :props="defaultProps"
                                    node-key="id" 
                                    show-checkbox
                                    ref="tree4"
                                    check-strictly
                                    style="border:0;">
                                </sy-tree>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
             <div slot="footer">
                <el-button @click="dialogAddMore = false">取 消</el-button>
                <el-button type="primary" @click="submitNewList" :loading="plsaveBtn">确 定</el-button>
            </div> 
        </sy-dialog>
    </div>
</template>

<script>
import xzbkc from './xzbkc.js';
export default {
    mixins: [xzbkc]
}
</script>

<style scoped>
    div{
        box-sizing: border-box;
    }
    .header{
        height: 56px;
        border-bottom: 1px solid #ddd;
        line-height: 56px;
        padding: 0 10px;
    }
    .content{
        position: absolute;
        top: 40px;
        width: 100%;
        bottom: 0;
    }
</style>
