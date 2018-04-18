<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerLeft">单位</div>
            <div slot="bodyLeft">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56" style="background:#fff;">
                        <el-input
                            placeholder="请输入关键字"
                            icon="search"
                            v-model.trim="inputValue"
                            @keyup.enter.native="handleIconClick"
                            size="small"
                            :on-icon-click="handleIconClick">
                        </el-input>
                    </div>
                    <div slot="bodyRight">
                        <el-tree 
                            :data="data" 
                            :props="defaultProps"
                            node-key="id" 
                            ref="tree"
                            style="border:0;"
                            :empty-text="emptyTreeText"
                            class="full-parent"
                            :filter-node-method="filterNode"
                            :highlight-current="true"
                            :current-node-key="currentNodeKey"
                            :default-expanded-keys="defaultExpandedkeys"
                            :default-checked-keys="[5]"
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </sy-grad-4>
            </div>
            <div slot="bodyRight">
                <sy-grad-4>
                    <div slot="headerRight" class="padding-top-5">
                        <span>学年：</span>
                        <el-select v-model="form.year" placeholder="请选择学年" size="small" @change="changeYear">
                            <el-option v-for="item in yearList" :key="item.id" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <span style="padding-left:10px;">学期：</span>
                        <el-select v-model="form.term" placeholder="请选择学期" size="small" @change="changeTerm">
                            <el-option v-for="item in termList" :key="item.id" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-button @click="importTeachers" size="small" style="float:right;" v-if="codeList['btn_base_classteaching_import']">导入</el-button>
                    </div>
                    <div slot="bodyRight">
                        <el-table
                            :data="tableData"
                            border
                            height="100%"
                            :empty-text="emptyText"
                            @cell-click="handlerCellClick"
                            tooltip-effect="dark"
                            class="full-content">
                            <el-table-column
                                v-for="item in columnX"
                                :key="item.prop"
                                :min-width="item.width"
                                :fixed="item.fixed"
                                :prop="item.prop"
                                :label="item.label">
                                <template scope="scope">
                                    <div class="teacher-but" v-if="scope.row[item.prop + '_' + scope.row.courseId] && codeList['btn_base_classteaching_edit']" type="text"><i class="fa fa-user-plus"></i></div> 
                                    <span v-show="item.prop !== 'courseName' && scope.row[item.prop + '_' + scope.row.courseId] && scope.row[item.prop + '_' + scope.row.courseId+'_user'].length>0">
                                        <sy-tag 
                                            :closable="codeList['btn_base_classteaching_del']"
                                            hover-close
                                            style="margin:5px 0;background:transparent;color:#333"
                                            v-for="tag in scope.row[item.prop + '_' + scope.row.courseId+'_user']"
                                            @close="removeTeacher(item.prop,scope.row.courseId,tag)"
                                            :key="tag.userId">
                                            {{tag.userName}}
                                        </sy-tag>
                                    </span>
                                    <div v-show="item.prop !== 'courseName' && scope.row[item.prop + '_' + scope.row.courseId] && scope.row[item.prop + '_' + scope.row.courseId+'_user'].length === 0 && codeList['btn_base_classteaching_edit']" style="height:36px;marginRight:36px;">
                                        <el-select filterable v-if="scope.row[item.prop + '_' + scope.row.courseId+ '_show']" size="mini" style="marginTop:8px;" v-model="selectUserTeacher" placeholder="请选择">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <span v-show="item.prop === 'courseName'">{{scope.row[item.prop]}}</span> 
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
    </div>
</template>

<script>
import xzbrj from './xzbrj.js';
export default {
    mixins: [xzbrj]
}
</script>

<style scoped>
    .role-content{
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 20px;
    }
    .role-content-top{
        position: absolute;
        height: 45px;
        top: 0;
        width: 100%;
        line-height: 45px;
    }
    .role-content-body{
        position: absolute;
        top: 45px;
        width: 100%;
        bottom: 0;
    }
    .full-content{
        position: absolute;
        top: 5px;
        bottom: 5px;
        left: 10px;
        right: 10px;
        width: auto;
    }
    .teacher-box{
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
        line-height: 20px;
    }
    .teacher-text{
        display: block;
        margin-right: 32px;
        line-height: 36px;
        min-height: 36px;
    }
    .teacher-but{
        float: right;
        padding: 6px;
    }
    .teacher-but>i{
        display: inline-block;
        cursor: pointer;
        color: rgb(73, 193, 219);
    }
</style>
