<template>
    <div class="app-container-box sy-pk-week">
        <sy-grad-4 :border='false'>
            <div slot="headerRight" class="line-height-56">
                <div class="sy-row">
                    <div class="sy-col sy-17">
                        <el-select v-model="year" placeholder="请选择学年" @change="yearChange">
                            <el-option
                                    v-for="item in years"
                                    :key="item.year"
                                    :label="item.year"
                                    :value="item.year">
                            </el-option>
                        </el-select>
                        <el-select v-model="term" placeholder="请选择学期" @change="termChange">
                            <el-option
                                    v-for="item in terms"
                                    :key="item.schoolTerm"
                                    :label="item.name"
                                    :value="item.schoolTerm">
                            </el-option>
                        </el-select>
                        <el-select v-model="weekTh" placeholder="请选择周次" @change="weekThChange">
                            <el-option
                                    v-for="item in weekThs"
                                    :key="item.week"
                                    :label="item.weekMessage"
                                    :value="item.week">
                            </el-option>
                        </el-select>
                        <el-input
                                placeholder="请输入场地名称"
                                icon="search"
                                v-model="keyWord"
                                :on-icon-click="handleIconClick">
                        </el-input>
                    </div>
                    <div class="sy-col sy-3" style="float:right">
                        <el-button v-if="codeList.btn_pk_place_table_download" v-download="{table:true}" class="sy-rf">下载</el-button>
                        <el-button v-if="codeList.btn_pk_place_table_print" @click="print" class="sy-rf">打印</el-button>
                    </div>
                </div>
            </div>
            <div slot="bodyLeft">
                <div class="sy-pk-grad sy-theme-tableBorder">
                    <div class="sy-pk-title sy-theme-lightGray-background">
                        <span>场地</span>
                    </div>
                    <div class="sy-pk-cont">
                        <el-tree :data="treeData" style="border:0;"
                                 :render-content="renderContent"
                                 :default-expanded-keys="defaultExpandedKeys"
                                 node-key="id"
                                 ref="tree"
                                 highlight-current
                                 :current-node-key="currentNode.id"
                                 @node-click="handleNodeClick"
                                 accordion>
                        </el-tree>
                    </div>
                </div>
            </div>
            <div slot="bodyRight" style="padding:10px;">
                <div class="sy-pk-grad sy-theme-tableBorder">
                    <div class="sy-pk-title sy-theme-lightGray-background">
                        <span class="sy-lf">课表</span>
                        <div class="sy-rf">
                            <el-checkbox-group v-model="rightValue" style="display:inline-block;">
                                <el-checkbox label="班级"></el-checkbox>
                                <el-checkbox label="教师"></el-checkbox>
                            </el-checkbox-group>
                            <el-switch
                                    style="margin:0 8px"
                                    v-model="nameValue"
                                    on-text="全称"
                                    off-text="简称"
                                    on-color="#20A0FF"
                                    off-color="#20A0FF"
                                    title="课程的显示方式">
                            </el-switch>
                            <el-switch
                                    v-model="typeValue"
                                    on-text="横向"
                                    off-text="纵向"
                                    on-color="#20A0FF"
                                    off-color="#20A0FF"
                                    @change="typeValueChange">
                            </el-switch>
                        </div>
                    </div>
                    <div class="sy-pk-cont"  id="myTable">
                        <table v-if="tableData.length>0" v-for="(item,index) in tableData" :key="item.tableTitleName" :ref="'table_'+index"
                               :data-download-options="'{title: \'' + item.tableTitleName + '场地课表'+ '\', fileName: \'场地课表\'}'"
                               style="border-collapse: collapse;
                                text-align: center;
                                width: 100%;
                                box-sizing: border-box;
                                table-layout: fixed;
                                line-height: 36px;
                                border-top: 1px solid #dfe6ec;
                                border-left: 1px solid #dfe6ec;
                                border-right: 1px solid #dfe6ec;
                                margin-top:10px;">
                            <thead style="background-color: #eef1f6;">
                            <tr>
                                <th style="white-space: nowrap;
                                                overflow: hidden;
                                                background-color: rgb(238, 239, 246);
                                                text-align: center;
                                                border-right: 1px solid #dfe6ec;
                                                border-bottom: 1px solid #dfe6ec;">
                                    <li style="list-style-type: none; height:25px">{{item.tableTitleName}}</li>
                                    <li style="list-style-type: none; color:blue; height:25px; margin-bottom: 5px">{{'('+item.tableTitleAddress+')'}}</li>
                                </th>
                                <th v-for="r in row" :key="r.rowId"  style="white-space: nowrap;
                                                overflow: hidden;
                                                background-color: rgb(238, 239, 246);
                                                text-align: center;
                                                border-right: 1px solid #dfe6ec;
                                                border-bottom: 1px solid #dfe6ec;">
                                    {{r.rowName}}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="c in item.courseSheets" :key="c.colId"
                                style="text-align: center;
                                            background-color: #fff;
                                            border-bottom: 1px solid #dfe6ec;
                                            min-height: 36px;">
                                <td style="border-right: 1px solid #dfe6ec;">
                                    {{c.colName}}
                                </td>
                                <td v-for="cc in c.cSheet" :key="cc.festivalId" style="border-right: 1px solid #dfe6ec;padding:5px 0;">
                                    <div style="line-height:20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{nameValue?cc.courseName+cc.single:cc.courseShortName+cc.single}}</div>
                                    <div v-if="rightValue.indexOf('教师') != -1 && cc.teacherNames" style="line-height:20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="cc.teacherNames">{{cc.teacherNames}}</div>
                                    <div v-if="rightValue.indexOf('班级') != -1 && cc.clazz" style="line-height:20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="cc.clazz">{{cc.clazz}}</div>
                                    <div v-if="rightValue.indexOf('场地') != -1 && cc.room" style="line-height:20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="cc.room">{{cc.room}}</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <span v-if="tableData.length==0" class="sy-empty-text">
                            {{emptyTextTable}}
                        </span>
                    </div>
                </div>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
    import index from "./index.js";
    export default {
        name: "notice",
        mixins: [index]
    };
</script>

<style scoped>

</style>