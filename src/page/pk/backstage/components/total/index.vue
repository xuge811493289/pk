<template>
    <div class="app-container-box sy-pk-teacker">
        <sy-grad-4 :border='false'>
            <div slot="headerRight" class="line-height-56">
                <div class="sy-row">
                    <div class="sy-col sy-17">
                        <el-select v-model="yearValue" placeholder="请选择学年" style="width:130px;margin-right:10px"
                                   @change="yearChange">
                            <el-option
                                    v-for="item in yearOptions"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="termValue" placeholder="请选择学期" style="width:130px;margin-right:10px"
                                   @change="termChange">
                            <el-option v-for="item in termOptions"
                                       :key="item.schoolTerm"
                                       :label="item.name"
                                       :value="item.schoolTerm">
                            </el-option>
                        </el-select>
                        <el-select v-model="weekValue" placeholder="请选择周次" style="width:130px;margin-right:10px"
                                   @change="weekChange">
                            <el-option
                                    v-for="item in weekOptions"
                                    :key="item.week"
                                    :label="item.weekMessage"
                                    :value="item.week">
                            </el-option>
                        </el-select>
                        <el-select v-model="gradeValue" placeholder="请选择年级" style="width:130px;margin-right:10px" @change="gradeChange">
                            <el-option
                                    v-for="item in gradeOptions"
                                    :key="item.gradeId"
                                    :label="item.gradeName"
                                    :value="item.gradeId">
                            </el-option>
                        </el-select>
                        <el-input v-show="!type" style="width:130px;" v-model="keyValue"
                            placeholder="请输入老师"
                            icon="search"
                            :maxlength="50"
                            :on-icon-click="handleIconClick"></el-input>
                    </div>
                    <div class="sy-col sy-3">
                        <el-button class="sy-rf" v-download="{table:true}" v-if="type?codeList.btn_pk_kb_clazztotal_download:codeList.btn_pk_kb_teachertotal_download">下载</el-button>
                        <el-button class="sy-rf" @click="handlePrint" v-if="type?codeList.btn_pk_kb_clazztotal_print:codeList.btn_pk_kb_teachertotal_print">打印</el-button>
                    </div>
                </div>
            </div>
            <div slot="bodyRight" style="padding:10px;">
                <div class="sy-pk-grad sy-theme-tableBorder">
                    <div class="sy-pk-title sy-theme-lightGray-background">
                        <span class="sy-lf">课表</span>
                        <div class="sy-rf">
                            <el-checkbox-group v-model="rightValue" style="display:inline-block;">
                                <el-checkbox :label="type?'教师':'班级'"></el-checkbox>
                                <el-checkbox label="场地"></el-checkbox>
                            </el-checkbox-group>
                            <el-switch
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

                    <div style="position:absolute; top:40px; bottom: -5px; left: 0; right: -6px;">

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
                                                    <span v-show="type">班级</span><span v-show="type"
                                                                                       style="color:blue">(教室)</span>
                                                    <span v-show="!type">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教师</span>
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
                                                        <span v-show="type">班级</span><span v-show="type"
                                                                                           style="color:blue">(教室)</span>
                                                        <span v-show="!type">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教师</span>
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
                                                    <div v-if="type">
                                                        <div>{{item.classShortName ? item.classShortName : item.className}}</div>
                                                        <div v-if="item.roomName!=null" style="color:blue">{{"(" + item.roomName + ")"}}</div>
                                                    </div>
                                                    <div v-else>
                                                        <div>{{item.teacherName}}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!--右-->
                            <div style="position: absolute;left: 0;top: 0;bottom: 0;right: 0;z-index: 1;">
                                <!--右上-->
                                <div style="position: absolute;left: 117px; top: 0;z-index: 11; overflow: hidden;background-color: #fff;" ref="right_div1" :style="{right:scrollW+'px'}" id="right_div1">
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
                                    :data-download-options="JSON.stringify({title:type?'班级总课表':'教师总课表',fileName:type?'班级总课表':'教师总课表'})">
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
                                                        <span v-show="type">班级</span><span v-show="type"
                                                                                           style="color:blue">(教室)</span>
                                                        <span v-show="!type">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教师</span>
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
                                                <div v-if="type">
                                                    <div>{{item.classShortName ? item.classShortName : item.className}}</div>
                                                    <div v-if="item.roomName!=null" style="color:blue">{{"(" + item.roomName + ")"}}</div>
                                                </div>
                                                <div v-else>
                                                    <div>{{item.teacherName}}</div>
                                                </div>
                                            </td>
                                            <td v-for="_item in item.courseSheets" :key="_item.courseName"
                                                style="border-right: 1px solid #dfe6ec;padding:5px 0; padding:5px; width:90px;height:77px; box-sizing: border-box">
                                                <div style="width: 78px">
                                                    <div :title="nameValue ? _item.courseName : _item.courseShortName">
                                                        <span v-if="nameValue">{{_item.courseName}}</span>
                                                        <span v-else>{{_item.courseShortName}}</span>
                                                    </div>
                                                    <div v-if="rightValue.indexOf(type?'教师':'班级') != -1" :title="_item.teacherNames">{{_item.teacherNames}}</div>
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
                                                <span v-show="type" style="display: inline; height:0;"><span>&nbsp;&nbsp;&nbsp;&nbsp;班级</span><span
                                                        style="color:blue">(教室)</span></span>
                                                <span v-show="!type">教师</span>
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
                        <div style="position: absolute;left: 0;top: 0;bottom: 0;right: 0;z-index: 1;">
                            <!--右上-->
                            <div style="position: absolute;left: 117px; top: 0; z-index: 1; overflow: hidden;background-color: #fff;" :style="{right:scrollW+'px'}" ref="right_div1" id="right_div1_">
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
                                            <span v-if="type">{{item.classShortName ? item.classShortName : item.className}}</span>
                                            <div v-if="type && item.roomName!=null" style="color:blue">{{"(" + item.roomName + ")"}}</div>
                                            <span v-if="!type">{{item.teacherName}}</span>
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
                                        :data-download-options="JSON.stringify({title:type?'班级总课表':'教师总课表',fileName:type?'班级总课表':'教师总课表'})">
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
                                                <span v-show="type" style="display: inline; height:0;"><span>&nbsp;&nbsp;&nbsp;&nbsp;班级</span>
                                                    <span style="color:blue">(教室)</span></span>
                                                <span v-show="!type">教师</span>
                                            </div>
                                        </th>
                                        <th v-for="item in tableData" :key="item.classShortName" style="white-space: nowrap;
                                                        overflow: hidden;
                                                        width:90px;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                            <span v-if="type" style="display:inline-block; width:89px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.classShortName ? item.classShortName : item.className}}</span>
                                            <div v-if="type && item.roomName!=null" style="color:blue;width:89px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{"(" + item.roomName + ")"}}</div>
                                            <span v-if="!type" style="display:inline-block; width:89px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.teacherName}}</span>
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
                                                <div :title="_item.courseSheets[idx].teacherNames" v-if="rightValue.indexOf(type?'教师':'班级') != -1">
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
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
    import index from "./index.js";
    export default {
        name: "notice",
        props: {
            type: {  //true为班级，false为教师
                type: Boolean
            }
        },
        mixins: [index]
    };
</script>

<style scoped>
    table td div {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        line-height: 22px;
    }
</style>