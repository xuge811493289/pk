<template>
    <div class="sy-app-container">
        <sy-grad-4>
            <div slot="headerRight" class="sy-codition-container">
                <el-tabs v-if="stageList.length > 0" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for="item in stageList" :key="'stage_'+item.id" :label="item.name" :name="item.id+''"></el-tab-pane>
                </el-tabs>
                <div v-else class="sy-zcml-null"> 暂无年级 </div>
            </div>
            <div slot="bodyRight" style="width:100%;height:100%;padding: 0;">
                <sy-grad-4 :border="false">
                    <div slot="bodyLeft" style="width:100%;height:100%;padding:10px 5px 10px 10px;">
                        <div class="sy-zyfl-box">
                            <div class="sy-zyfl-box-title sy-theme-extraLightGray">
                                <b>学科</b>
                            </div>
                            <div class="sy-zyfl-box-body sy-theme-tableBorder">
                                <div v-for="o in courseList" :key="o.id"
                                    class="sy-base-jcml sy-theme-tableBorder"
                                    @click="checkRcMsg(o)"
                                    :class="{active: activeCoure == o.courseValue,'sy-theme-text': activeCoure == o.courseValue}">
                                    {{o.name}}
                                </div>
                                <!-- <el-button @click="getNode">获得节点</el-button> -->
                                <!-- <label class="sy-myrc-menu" v-for="o in courseList" :key="o.id" >
                                    <input
                                        class="sy-myrc-menu-input"
                                        :value="o.courseValue"
                                        v-model="activeCoure"
                                        type="radio"
                                        @click="checkRcMsg(o)"
                                        name="menu">
                                    <span class="sy-myrc-menu-radio__label">
                                        <span>{{o.name}}</span>
                                    </span>
                                </label> -->
                                <div v-if="courseList.length === 0" class="sy-zcml-null" style="text-align:center;"> 暂无科目 </div>
                            </div>
                        </div>
                    </div>
                    <div slot="bodyRight" style="width:100%;height:100%;padding:10px 10px 10px 5px;">
                        <div class="sy-zyfl-box">
                            <div class="sy-zyfl-box-title sy-theme-extraLightGray">
                                <b>已选教材版本</b>
                            </div>
                            <div class="sy-zyfl-box-body">
                                <ul v-if="treeData.length > 0" id="jcmlTree" class="ztree"></ul>
                                <div v-else class="sy-zcml-null"> 暂无目录 </div>
                            </div>
                        </div>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
        <sy-dialog title="新增"
            :visible.sync="addVisible"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="450px"
            slide="fade">
            <div slot="body" style="padding:10px;">
                <el-form :model="form" ref="form" :rules="rules" label-position="right" label-width="90px">
                    <el-form-item label="目录名称：" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="序号：" prop="sort">
                        <el-input v-model.number="form.sort"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="add('form')">确 定</el-button>
            </div>
        </sy-dialog>
        <sy-dialog
            title="编辑"
            :visible.sync="editVisible"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="450px"
            slide="fade">
            <div slot="body">
                <el-form :model="editForm" ref="editForm" :rules="rules" label-position="right" label-width="90px">
                    <el-form-item label="目录名称：" prop="name">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="序号：" prop="sort">
                        <el-input v-model.number="editForm.sort"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit('editForm')">确 定</el-button>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
import jcml from './index.js';
export default {
    mixins: [jcml]
}
</script>

<style scoped>
.sy-base-jcml{
    line-height: 40px;
    padding: 0 10px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
}
.sy-base-jcml.active{
    color: green;
}
.sy-zyfl-box {
    position: relative;
    height: 100%;
    width: 100%;
    border: 1px solid #F1F1F0;
}

.sy-zyfl-box .sy-zyfl-box-title {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    background-color: #EEEEEE;
    padding: 0 10px;
}

.sy-zyfl-box .sy-zyfl-box-body {
    box-sizing: border-box;
    background-color: #fff;
    top: 40px;
    bottom: 0;
    width: 100%;
    padding: 0;
    position: absolute;
    overflow-y: auto;
}
.sy-myrc-menu{
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    color: #fff;
    box-sizing: border-box;
    margin: 0 0 0 0;
    border-bottom: 1px solid #F5F4F5;
    color: #6E6E6E;
}
.sy-myrc-menu:first{
    border-top: 1px solid #C5CCC4;
}
.sy-myrc-menu-radio__label{
    display: inline-block;
    width: 100%;
    height: 40px;
    padding: 0 16px;
    cursor: pointer;
    box-sizing: border-box;
}
.sy-myrc-menu-radio__label>span{
    padding: 0 10px;
}
.sy-myrc-menu-radio__label>b{
    float: right;
    font-weight: normal;
}
.sy-myrc-menu-input:checked + span.sy-myrc-menu-radio__label{
    color: #49C1D9;
}
.sy-myrc-menu-input {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0
}
.sy-zcml-null{
    line-height: 42px;
    color: #ccc;
    padding: 0 30px;
}
</style>


