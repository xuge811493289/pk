<template>
    <div class="sy-app-container kb mix">
        <sy-grad-4 :border='false'>
            <div slot="headerRight" style="line-height: 40px">
                <el-select v-model="yearValue" placeholder="请选择学年" style="margin-right:10px" @change="yearChange">
                    <el-option
                            v-for="item in yearOptions"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="termValue" placeholder="请选择学期" style="margin-right:10px" @change="termChange">
                    <el-option v-for="item in termOptions"
                               :key="item.schoolTerm"
                               :label="item.name"
                               :value="item.schoolTerm">
                    </el-option>
                </el-select>
                <el-select v-model="weekValue" placeholder="请选择周次" style="width:130px;margin-right:10px" @change="weekChange">
                    <el-option
                            v-for="item in weekOptions"
                            :key="item.week"
                            :label="item.weekMessage"
                            :value="item.week">
                    </el-option>
                </el-select>
                <el-button style="float:right;margin: 5px 0 0 10px" @click="handlePrint()" v-if="codeList.btn_pk_mix_table_print">打印</el-button>
                <el-button style="float:right;margin-top: 5px" v-download="{table:true}" v-if="codeList.btn_pk_mix_table_download">下载</el-button>
            </div>
            <div slot="bodyRight">
                <sy-grad-4 :border='false'>
                    <div slot="headerLeft">
                        <div class="sy-pk-title sy-theme-lightGray-background">
                            <span>教师</span>
                        </div>
                    </div>
                    <div slot="bodyLeft" style="overflow: inherit">
                        <sy-tree v-if="showTree"
                                 :empty-text="emptyText_t"
                                 :data="treeData" style="border:0; background-color: #FBFCFC;margin:5px 10px 10px"
                                 :default-expanded-keys="defaultExpandedKeys"
                                 :default-checked-keys="defaultCheckedKeys"
                                 node-key="value"
                                 ref="tree"
                                 highlight-current
                                 :current-node-key="currentNode.value"
                                 @node-click="nodeClick"
                                 @check-change="checkChange"
                                 :show-checkbox="true">
                        </sy-tree>
                    </div>
                    <div slot="headerRight">
                        <div class="sy-pk-title sy-theme-lightGray-background">
                            <span>课表</span>
                            <div style="display: inline-block; float: right;">
                                <el-checkbox-group v-model="rightValue" style="display:inline-block;">
                                    <el-checkbox label="班级"></el-checkbox>
                                    <el-checkbox label="场地"></el-checkbox>
                                </el-checkbox-group>
                                <el-switch
                                        style="margin:0 8px"
                                        v-model="nameValue"
                                        on-text="全称"
                                        off-text="简称"
                                        on-color="#20A0FF"
                                        off-color="#20A0FF">
                                </el-switch>
                                <el-switch
                                        v-model="typeValue"
                                        on-text="横向"
                                        off-text="纵向"
                                        on-color="#20A0FF"
                                        off-color="#20A0FF">
                                </el-switch>
                            </div>
                        </div>
                    </div>
                    <div slot="bodyRight" style="padding:0 10px">
                        <div style="position: absolute; top:0; bottom: 5px; left: 10px;z-index: 3;" :style="{right: isScorllBarW ? scrollW + 'px' : 0}">

                            <div v-if="typeValue && tableData.length>0" id="print1">
                                <!--左-->
                                <div style="position: absolute;left: -2px;top: 0;z-index: 10;background-color: #fff; width:120px"
                                     :style="{bottom: isScorllBarW ? scrollW + 'px' : 0}">
                                    <!--左上-->
                                    <div style="position: absolute;left: 0;top: 0;z-index: 8;width:120px; overflow: hidden">
                                        <table border='0' cellpadding="0" cellspacing="0"
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
                                                <th rowspan="2"
                                                    style="white-space: nowrap;
                                                        width:120px;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;"
                                                    :style="{height:'73px',width: config.fixedWidth}">
                                                    <div style="border-bottom: 76px solid rgb(230, 231, 238);
                                                        border-right: 120px solid rgb(238, 239, 246);
                                                        height:77px; width:120px">
                                                <span style="display: inline; float: left; margin: 35px 0 0 5px; height:0;">
                                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教师</span>
                                                </span>
                                                        <span style="display: inline; height:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节次</span>
                                                    </div>
                                                </th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <!--左下-->
                                    <div style="position: absolute;bottom: 0;top: 10px;width:120px; overflow: hidden" ref="left_div2" id="left_div2">
                                        <table style="border-collapse: collapse;
                                                    text-align: center;
                                                    width: 100%;
                                                    box-sizing: border-box;
                                                    line-height: 36px;
                                                    table-layout: fixed;
                                                    border-top: 1px solid #dfe6ec;
                                                    border-left: 1px solid #dfe6ec;
                                                    border-right: 1px solid #dfe6ec;"
                                               id="table1"
                                               border='0'
                                               cellpadding="0"
                                               cellspacing="0">
                                            <thead style="background-color: #eef1f6;">
                                            <tr>
                                                <th rowspan="2"
                                                    style="white-space: nowrap;
                                                            width:120px;
                                                            overflow: hidden;
                                                            background-color: rgb(238, 239, 246);
                                                            text-align: center;
                                                            border-right: 1px solid #dfe6ec;"
                                                    :style="{height:'73px',width: config.fixedWidth}">
                                                    <div style="border-bottom: 76px solid rgb(230, 231, 238);
                                                            border-right: 120px solid rgb(238, 239, 246);
                                                            height:77px; width:120px;">
                                                    <span style="display: inline; float: left; margin: 35px 0 0 5px; height:0;">
                                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教师</span>
                                                    </span>
                                                        <span style="display: inline; height:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节次</span>
                                                    </div>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in tableData" :key="item.id"
                                                style="text-align: center;
                                                        background-color: #fff;
                                                        border-bottom: 1px solid #dfe6ec;
                                                        box-sizing: border-box;
                                                        height: 78px;">
                                                <td style="border-right: 1px solid #dfe6ec; padding:5px; width: 123px; height: 78px; box-sizing: border-box">
                                                    <div>{{item.teacherName}}</div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!--右-->
                                <div style="position: absolute;left: 0;top: 0;bottom: 0;right: -6px;z-index: 1;">
                                    <!--右上-->
                                    <div style="position: absolute;left: 117px; top: 0;z-index: 11; overflow: hidden;background-color: #fff;" ref="right_div1" :style="{right: isScorllBarH ? 0 : scrollW + 'px'}" id="right_div1">
                                        <table id="right_table1" border='0' cellpadding="0" cellspacing="0"
                                               style="border-collapse: collapse;
                                                    text-align: center;
                                                    box-sizing: border-box;
                                                    table-layout: fixed;
                                                    line-height: 36px;
                                                    border-top: 1px solid #dfe6ec;
                                                    border-left: 1px solid #dfe6ec;
                                                    border-right: 1px solid #dfe6ec;
                                                    margin-top:10px;">
                                            <thead style="background-color: #eef1f6;">
                                            <tr style="height:39px">
                                                <th :colspan="tableList.length/7" v-for="i in 7" :key="i" style="white-space: nowrap;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;
                                                        border-bottom: 1px solid #dfe6ec;"
                                                    :style="{width:tableList.length/7*90+'px'}">
                                                    {{weekList[i - 1].name}}
                                                </th>
                                            </tr>
                                            <tr style="height:39px">
                                                <th v-for="item in tableList" :key="item.id" style="white-space: nowrap;
                                                        padding:0 20px;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                                    {{item.name}}
                                                </th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <!--右下-->
                                    <div style="overflow: auto;position: absolute;left: -2px;top: 10px;bottom: 0;background-color: #fff;" :style="{right: isScorllBarH ? 0 : scrollW + 'px'}" ref="right_div2" id="right_div2">
                                        <table  style="border-collapse: collapse;
                                    text-align: center;
                                    box-sizing: border-box;
                                    line-height: 36px;
                                    table-layout: fixed;
                                    border-top: 1px solid #dfe6ec;
                                    border-left: 1px solid #dfe6ec;
                                    border-right: 1px solid #dfe6ec;"
                                                id="table2" border='0' cellpadding="0" cellspacing="0"
                                                ref="download1"
                                                :data-download-options="JSON.stringify({title:'教师总课表',fileName:'教师总课表'})">
                                            <thead style="background-color: #eef1f6;">
                                            <tr>
                                                <th rowspan="2" style="white-space: nowrap;
                                                            width:118px;
                                                            overflow: hidden;
                                                            background-color: rgb(238, 239, 246);
                                                            text-align: center;
                                                            border-right: 1px solid #dfe6ec;">
                                                    <div style="border-bottom: 76px solid rgb(230, 231, 238);
                                                            border-right: 118px solid rgb(238, 239, 246);
                                                            height:77px; width:118px">
                                                    <span style="display: inline; float: left; margin: 35px 0 0 5px; height:0;">
                                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教师</span>
                                                    </span>
                                                        <span style="display: inline; height:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节次</span>
                                                    </div>
                                                </th>
                                                <th :colspan="tableList.length/7" v-for="i in 7" :key="i" style="white-space: nowrap;
                                                            padding:0 10px;
                                                            overflow: hidden;
                                                            background-color: rgb(238, 239, 246);
                                                            text-align: center;
                                                            border-right: 1px solid #dfe6ec;
                                                            border-bottom: 1px solid #dfe6ec;">
                                                    {{weekList[i - 1].name}}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th v-for="item in tableList" :key="item.id" style="white-space: nowrap;
                                                            overflow: hidden;
                                                            background-color: rgb(238, 239, 246);
                                                            text-align: center;
                                                            border-right: 1px solid #dfe6ec;">
                                                    {{item.name}}
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in tableData" :key="item.id"
                                                style="text-align: center;
                                                    background-color: #fff;
                                                    border-bottom: 1px solid #dfe6ec;
                                                    height:78px;">
                                                <td style="border-right: 1px solid #dfe6ec; padding:5px; width: 123px; box-sizing: border-box">
                                                    <div>{{item.teacherName}}</div>
                                                </td>
                                                <td v-for="_item in item.courseSheets" :key="_item.courseName"
                                                    style="border-right: 1px solid #dfe6ec;padding:5px 0; padding:5px; width:90px;height:77px; box-sizing: border-box">
                                                    <div style="width: 78px">
                                                        <div :title="nameValue ? _item.courseName : _item.courseShortName">
                                                            <span v-if="nameValue">{{_item.courseName}}</span>
                                                            <span v-else>{{_item.courseShortName}}</span>
                                                        </div>
                                                        <div v-if="rightValue.indexOf('班级') != -1" :title="_item.teacherNames">{{_item.teacherNames}}</div>
                                                        <div v-if="(rightValue.indexOf('场地') != -1) && (_item.roomNames)"
                                                             style="color:blue" :title="_item.roomNames">{{"(" + _item.roomNames + ")"}}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!-- 纵向表格 -->
                            <div v-if="(!typeValue) && tableData.length>0" id="print2">

                                <!--左-->
                                <div style="position: absolute;left: -2px;top: 0;z-index: 10;background-color: #fff; width:120px"
                                     :style="{bottom: isScorllBarW ? scrollW + 'px' : 0}">
                                    <!--左上-->
                                    <div style="position: absolute;left: 0;top: 0;z-index: 8;width:120px; overflow: hidden">
                                        <table border='0' cellpadding="0" cellspacing="0"
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
                                                <th rowspan="2"
                                                    style="white-space: nowrap;
                                                    width:120px;
                                                    height: 77px;
                                                    overflow: hidden;
                                                    background-color: rgb(238, 239, 246);
                                                    text-align: center;
                                                    border-right: 1px solid #dfe6ec;"
                                                    :style="{height:'73px',width: config.fixedWidth}">
                                                    <div style="border-bottom: 76px solid rgb(230, 231, 238);
                                                    border-right: 120px solid rgb(238, 239, 246);
                                                    height:77px; width:120px">
                                                        <span style="display: inline; float: left; margin: 35px 0 0 5px; height:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节次</span>

                                                        <span>教师</span>
                                                    </div>
                                                </th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <!--左下-->
                                    <div style="position: absolute;bottom: 0;top: 87px;width:120px; overflow: hidden; z-index: 7" ref="left_div2" id="left_div2_">
                                        <table style="border-collapse: collapse;
                                                text-align: center;
                                                width: 100%;
                                                box-sizing: border-box;
                                                line-height: 36px;
                                                table-layout: fixed;
                                                border-top: 1px solid #dfe6ec;
                                                border-left: 1px solid #dfe6ec;
                                                border-right: 1px solid #dfe6ec;"
                                               id="table1_"
                                               border='0'
                                               cellpadding="0"
                                               cellspacing="0">
                                            <tbody>
                                            <tr v-for="(item,idx) in tableList" :key="item.id"
                                                style="text-align: center;
                                            background-color: #fff;
                                            border-bottom: 1px solid #dfe6ec;
                                            box-sizing: border-box;
                                            height: 78px;">
                                                <td style="border-right: 1px solid #dfe6ec; padding:5px; width: 50px; padding-left: 5px; box-sizing: border-box"
                                                    :rowspan="tableList.length/7" v-if="idx%(tableList.length/7)==0">
                                                    <div style="width: 36px;">{{weekList[idx / (tableList.length / 7)].name}}</div>
                                                </td>
                                                <td style="border-right: 1px solid #dfe6ec; padding:5px; width: 69px; height:78px; box-sizing: border-box">
                                                    {{item.name}}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!--右-->
                                <div style="position: absolute;left: 0;top: 0;bottom: 0;right: -6px;z-index: 1;">
                                    <!--右上-->
                                    <div style="position: absolute;left: 117px; top: 0; z-index: 1; overflow: hidden;background-color: #fff;" :style="{right: (isScorllBarH ? 0 : scrollW) + 6 + 'px'}" ref="right_div1" id="right_div1_">
                                        <table id="right_table1_" border='0' cellpadding="0" cellspacing="0"
                                               style="border-collapse: collapse;
                                                text-align: center;
                                                box-sizing: border-box;
                                                table-layout: fixed;
                                                line-height: 36px;
                                                border-top: 1px solid #dfe6ec;
                                                border-left: 1px solid #dfe6ec;
                                                border-right: 1px solid #dfe6ec;
                                                margin-top:10px;">
                                            <thead style="background-color: #eef1f6;">
                                            <th v-for="item in tableData" :key="item.classShortName" style="white-space: nowrap;
                                                        height: 78px;
                                                        box-sizing: border-box;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                                <div style="width: 90px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                                    <span>{{item.teacherName}}</span>
                                                </div>
                                            </th>
                                            </thead>
                                        </table>
                                    </div>
                                    <!--右下-->
                                    <div style="overflow: auto;position: absolute;left: -2px;top: -2px;bottom: 0;background-color: #fff; margin-top: 10px" :style="{right: isScorllBarH ? 0 : scrollW + 'px'}" ref="right_div2_" id="right_div2_">
                                        <table  style="border-collapse: collapse;
                                                text-align: center;
                                                box-sizing: border-box;
                                                line-height: 32px;
                                                table-layout: fixed;
                                                border-top: 1px solid #dfe6ec;
                                                border-left: 1px solid #dfe6ec;
                                                border-right: 1px solid #dfe6ec;"
                                                id="table2_" border='0' cellpadding="0" cellspacing="0" ref="download2"
                                                :data-download-options="JSON.stringify({title:'教师总课表',fileName:'教师总课表'})">
                                            <thead style="background-color: #eef1f6;">
                                            <tr>
                                                <th colspan="2" style="white-space: nowrap;
                                                        width:118px;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        padding: 0;
                                                        border-right: 1px solid #dfe6ec;">
                                                    <div style="border-bottom: 78px solid rgb(230, 231, 238);
                                                        border-right: 117px solid rgb(238, 239, 246);
                                                        height:78px; width:117px; box-sizing: border-box">
                                                        <span style="display: inline; float: left; margin: 35px 0 0 5px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节次</span>
                                                        <span>教师</span>
                                                    </div>
                                                </th>
                                                <th v-for="item in tableData" :key="item.classShortName" style="white-space: nowrap;
                                                        overflow: hidden;
                                                        width:90px;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                                    <span style="display:inline-block; width:89px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.teacherName}}</span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(item,idx) in tableList" :key="item.id"
                                                style="text-align: center;
                                                background-color: #fff;
                                                border-bottom: 1px solid #dfe6ec;">
                                                <td style="border-right: 1px solid #dfe6ec; padding:5px; width: 50px; box-sizing: border-box"
                                                    :rowspan="tableList.length/7" v-if="idx%(tableList.length/7)==0">
                                                    {{weekList[idx / (tableList.length / 7)].name}}
                                                </td>
                                                <td style="border-right: 1px solid #dfe6ec; padding:5px; width: 69px;height: 78px; box-sizing: border-box">
                                                    {{item.name}}
                                                </td>
                                                <td v-for="_item in tableData" :key="_item.courseName"
                                                    style="border-right: 1px solid #dfe6ec;padding:5px 0; padding:5px; width: 90px; box-sizing: border-box">
                                                    <!--<div>{{_item.courseSheets[idx]}}</div>-->
                                                    <div style="width: 80px;">
                                                        <div>
                                                            <span :title="_item.courseSheets[idx].courseName" v-if="nameValue">{{_item.courseSheets[idx].courseName}}</span>
                                                            <span :title="_item.courseSheets[idx].courseShortName" v-else>{{_item.courseSheets[idx].courseShortName}}</span>
                                                        </div>
                                                        <div :title="_item.courseSheets[idx].teacherNames" v-if="rightValue.indexOf('班级') != -1">
                                                            {{_item.courseSheets[idx].teacherNames}}
                                                        </div>
                                                        <div :title="_item.courseSheets[idx].roomNames" v-if="(rightValue.indexOf('场地') != -1) && (_item.courseSheets[idx].roomNames)"
                                                             style="color:blue">{{"(" + _item.courseSheets[idx].roomNames + ")"}}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <span v-if="tableData.length < 1" class="sy-empty-text">
                            {{emptyText}}
                        </span>
                        </div>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
    import config from './config.js';
    import {getRcCodeList} from '../../request.js';
    export default {
        name: "mix",

        data(){
            return {
                scrollW:6,
                unitId:this.$store.state.unitId,
                emptyText:"正在加载中...",
                emptyText_t:"正在加载中...",
                yearValue: "",
                yearOptions: [],
                termValue: "",
                termOptions: [],
                termChanging: false,
                keyValue:"",
                weekOptions:[],
                weekValue:'',
                showTree:false,
                treeData:[],
                defaultExpandedKeys:[],
                defaultCheckedKeys:[],
                hasChecked:false,
                currentNode:{},
                leftValue: [],
                leftOptions: [],
                rightValue:[],
                nameValue: true,
                typeValue: true,
                tableList:[],
                tableData:[],
                weekList:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                isScorllBarH: true,
                isScorllBarW: true,
                config: {
                    fixedWidth: '80px',
                    defaultWidth: '90px'
                },
                codeList: {
                    'btn_pk_mix_table_download': false,
                    'btn_pk_mix_table_print': false,
                }
            }
        },
        created(){
            this.$parent.$emit('currentPage', '/pk/kb/mix');
            getRcCodeList('category_pk_mix_table', this.codeList).then(() => {
                this.init()

            })
            if(navigator.userAgent.indexOf('Trident') > -1 || (navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1)) {
                this.scrollW = 18
            }
        },
        watch: {
            typeValue: function(n, o) {
                if (n) {
                    this.$nextTick(() => {
                        var right_div2 = this.$refs.right_div2;
                        if (right_div2) {
                            right_div2.onscroll = function() {
                                var right_div2_top = this.scrollTop;
                                var right_div2_left = this.scrollLeft;
                                document.getElementById("left_div2").scrollTop = right_div2_top;
                                document.getElementById("right_div1").scrollLeft = right_div2_left;
                            }
                        }
                    })

                } else {
                    this.$nextTick(() => {
                        var right_div2 = this.$refs.right_div2_;
                        if (right_div2) {
                            right_div2.onscroll = function() {
                                var right_div2_top = this.scrollTop;
                                var right_div2_left = this.scrollLeft;
                                document.getElementById("left_div2_").scrollTop = right_div2_top;
                                document.getElementById("right_div1_").scrollLeft = right_div2_left;
                            }
                        }
                    })
                }
            }
        },
        updated(){
            this.$nextTick(()=>{
                this.checkScorll();
            })
        },
        methods: {
            checkScorll() {
                let box = null
                if (this.typeValue) {
                    box = this.$refs.right_div2;
                } else {
                    box = this.$refs.right_div2;
                }
                let _box = '';
                if (box) {
                    _box = box.firstChild
                }
                if (box && _box) {
                    this.isScorllBarW = (this.tableList.length + 2) * parseFloat(this.config.defaultWidth) > box.offsetWidth ? true : false;
                    this.isScorllBarH = _box.offsetHeight > box.offsetHeight ? true : false;
                }
            },
            init(){
                this.rightValue=['班级','场地']
                config.getYears(this.unitId).then((data) => {
                    if (data && data.status == 200&&data.data.length>0) {
                        data.data.forEach(val => {
                            this.yearOptions.push({
                                value: val.year
                            })
                            if (val.current) {
                                this.yearValue = val.year
                            }
                        })
                    }
                })

                config.getBb('XQ').then(data => {
                    if (data && data.status == 200 && data.data.length > 0) {
                        this.weekList = data.data
                        config.getFestival({ unitId: this.unitId }).then((data) => {
                            if (data && data.status == 200 && data.data.length > 0) {
                                this.weekList.forEach(_w => {
                                    data.data.forEach(val => {
                                        this.tableList.push({
                                            name: val.name,
                                            id: _w.id + "_" + val.id
                                        })
                                    })
                                })
                            }
                        })
                    }
                })

            },
            yearChange(value) {
                config.getTerms(this.unitId,this.yearValue).then((data) => {
                    if (data && data.status == 200&&data.data.length>0) {
                        this.termOptions = data.data
                        let tV = "";
                        data.data.forEach(val => {
                            if (val.current) {
                                tV = val.schoolTerm
                            }
                        })
                        if (!tV) {
                            this.termValue = "1"
                        } else {
                            this.termValue = tV;
                        }
                    }
                })
            },
            termChange(value) {
                config.getWeeks({ year: this.yearValue, term: this.termValue }).then((data) => {
                    if (data && data.status == 200 && data.data.length > 0) {
                        this.weekOptions = data.data;
                        let wV = ""
                        for (let val of this.weekOptions) {
                            if (val.current == "true") {
                                wV = val.week
                                break
                            }
                        }
                        this.termChanging = false
                        if (!wV) {
                            this.weekValue = 1
                        } else {
                            this.weekValue = wV
                        }
                        setTimeout(() => {
                            this.termChanging = true
                            this.weekChange()
                        }, 0)
                    } else {
                        this.tableData = []
                        this.emptyText = "暂无数据";
                        this.treeData = [];
                        this.emptyText_t = "暂无数据";
                    }
                })
            },

            weekChange(value) {
                //周次change事件
                if (!this.termChanging) return;
                this.showTree = false;
                config.getGrades({
                    type: 'open',
                    year: this.yearValue,
                    term: this.termValue,
                    unitId: this.unitId,
                    week: this.weekValue
                }).then((data) => {
                    if (data && data.status == 200 && data.data.length > 0) {
                        data.data.forEach(v => {
                            v.type = 'grade';
                            v.clicked = false;
                            v.value = v.gradeId;
                            v.label = v.gradeName;
                            v.children = [{}];
                            v.isSshowCheckBox = false;
                        })
                        data.data[0].isFirst = true;
                        this.treeData = data.data;
                        this.defaultExpandedKeys = [data.data[0].value];
                        this.nodeClick(data.data[0])
//                        this.weekChanging = false
//                        setTimeout(() => {
//                            this.weekChanging = true
//                            this.getTable()
//                        }, 0)
//                        this.initing = true
                    } else {
                        this.treeData = [];
                        this.emptyText_t = "暂无数据";
                        this.showTree = true;
                        this.tableData = []
                        this.emptyText = "暂无数据";
                    }
                })
            },

            nodeClick(obj){
                this.currentNode = obj;
                if(obj.type == 'teacher') return;
                if(obj.type == 'grade') {
                    if(obj.clicked) return;
                    config.getCourses({
                        unitId:this.$store.state.unitId,
                        year: this.yearValue,
                        term: this.termValue,
                        week: this.weekValue,
                        gradeId: obj.value
                    }).then((data) => {
                        if(data && data.status == 200) {
                            data.data.forEach(v => {
                                v.solutionId = obj.solutionId;
                                v.gradeId = obj.value;
                                v.label = v.courseShortName || v.courseName;
                                v.value = 'course:' + v.courseId;
                                v.type = 'course';
                                v.children = [{}];
                                v.clicked = false;
                                v.isSshowCheckBox = true;
                            })
                            obj.children = data.data;
                            if(obj.isFirst) {
                                this.defaultExpandedKeys.push(data.data[0].value);
//                                this.defaultCheckedKeys = [data.data[0].value]
                                obj.isFirst = false;
                                if(obj.children.length > 0) {
                                    this.nodeClick(obj.children[0]);
                                } else {
                                    this.$nextTick(() => {
                                        this.showTree = true;
                                    })
                                }

                            } else {
                                this.defaultExpandedKeys = [];
                                this.tableData = []
                                this.emptyText = "暂无数据";
                            }
                        }
                    })
                } else if(obj.type == 'course') {
                    if(obj.clicked) return;
                    config.getTeachers({
                        solutionId: obj.solutionId,
                        unitId: this.$store.state.unitId,
                        year: this.yearValue,
                        term: this.termValue,
                        week: this.weekValue,
                        gradeId: obj.gradeId,
                        courseId: obj.value.split(':')[1],
                    }).then((data) => {
                        if(data && data.status == 200) {
                            let keys = [];
                            data.data.forEach(v => {
                                v.label = v.teacherName;
                                v.value = v.teacherId;
                                v.type = 'teacher';
                                v.isSshowCheckBox = true;
                                if(!this.showTree)  keys.push(v.value);
                            })
                            if(!this.showTree) {
                                this.defaultCheckedKeys = keys;
                                this.showTree = true;
                                this.$nextTick(() => {
                                    this.getTable();
                                })
                            }
                            obj.children = data.data;
                        }
                    })
                }
                obj.clicked = true;
            },

            checkChange() {
                if(this.hasChecked) return;
                this.hasChecked = true;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.getTable();
                        this.hasChecked = false;
                    },100)
                })
            },

            getTable(){
                this.emptyText = "正在加载中..."
                let tIds = [];
                let _n = this.$refs.tree.getCheckedNodes();
                for(let i = 0; i < _n.length; i++) {
                    if(_n[i].type == 'course') continue;
                    tIds.push(_n[i].value);
                }
                let gData = {
                    unitId:this.unitId,
                    year:this.yearValue,
                    term:this.termValue,
                    gradeId:this.gradeValue,
                    week:this.weekValue,
                    teacherIds: tIds.join(",")
                };

                config.getTable(gData).then((data) => {
                    this.tableData = []
                    this.$nextTick(() => {
                        let arr = []
                        if(data && data && data.data.length > 0) {
                            data.data.forEach((val, idx) => {
                                arr.push({
                                    teacherName: val.teacherName,
                                    className: val.className,
                                    classShortName: val.classShortName,
                                    courseSheets: [],
                                    roomName: val.roomName ? val.roomName.name : "",
                                })
                                for (let i = 0; i < this.tableList.length; i++) {
                                    let isEmpty = true;
                                    for (let j = 0; j < val.courseSheets.length; j++) {
                                        if (this.tableList[i].id == val.courseSheets[j].weekId + "_" + val.courseSheets[j].festivalId) {
                                            isEmpty = false
                                            let pNames = []
                                            if (!this.type) {
                                                val.courseSheets[j].classNames.forEach(v => {
                                                    pNames.push(v.name ? v.name : v.shortName)
                                                })
                                            }
                                            let room = []
                                            val.courseSheets[j].roomNames.forEach(v => {
                                                room.push(v.name ? v.name : v.shortName)
                                            })

                                            arr[idx].courseSheets.push({
                                                courseName: val.courseSheets[j].courseName,
                                                courseShortName: val.courseSheets[j].courseShortName,
                                                teacherNames: this.type ? val.courseSheets[j].teacherNames : pNames.join(","),
                                                roomNames: room.join(",")
                                            })
                                            break;
                                        }
                                    }
                                    if (isEmpty) {
                                        arr[idx].courseSheets.push({
                                            teacherName: "",
                                            courseName: "",
                                            courseShortName: "",
                                            teacherNames: "",
                                            roomNames: ""
                                        })
                                    }
                                }
                            })
                            this.tableData = arr;
                        } else {
                            this.emptyText = "暂无数据"
                        }
                        if (this.firstChange && !this.typeValue) {
                            this.firstChange = false;
                            this.$nextTick(() => {
                                this.typeValue = true;
                            })
                        }
                        this.$nextTick(() => {
                            if (this.typeValue) {
                                var right_div2 = this.$refs.right_div2;
                                if (right_div2) {
                                    right_div2.onscroll = function() {
                                        var right_div2_top = this.scrollTop;
                                        var right_div2_left = this.scrollLeft;
                                        document.getElementById("left_div2").scrollTop = right_div2_top;
                                        document.getElementById("right_div1").scrollLeft = right_div2_left;
                                    }
                                }

                            } else {
                                var right_div2 = this.$refs.right_div2_;
                                if (right_div2) {
                                    right_div2.onscroll = function() {
                                        var right_div2_top = this.scrollTop;
                                        var right_div2_left = this.scrollLeft;
                                        document.getElementById("left_div2_").scrollTop = right_div2_top;
                                        document.getElementById("right_div1_").scrollLeft = right_div2_left;
                                    }
                                }
                            }
                        })
                    })

                })
            },
            handlePrint(){
                //打印
                this.$print(this.typeValue?'#print1':'#print2')
            }
        }
    }
</script>
<style scoped>
    table td div {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        line-height: 22px;
    }
    table li {
        list-style-type:none;
        word-break:break-all;
        line-height: 22px;
    }
</style>