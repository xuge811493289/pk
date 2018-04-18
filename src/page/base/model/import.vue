<template>
    <sy-grad-4 :border="false" v-loading="loading" element-loading-text="正在导入...">
        <div slot="bodyRight">
            <div class="sy-up" style="text-align: right;">
                <el-button v-back style="margin-right: 10px;">返回</el-button>
            </div>
            <div class="sy-import sy-down">
                <div class="sy-import-title" style="margin-top: 15px;" >导入参数配置：</div>
                <div class="sy-import-parms">
                    
                </div>

                <div class="sy-import-title" style="margin-top: 15px;" >导入模板下载：</div>
                <div class="sy-import-parms">
                    <div class="sy-import-parms-body">
                        <div class="sy-import-parms-body-header">
                            <span style="line-height: 36px;">请选择要导入的字段</span>
                        </div>
                        <div class="sy-import-parms-body-body"> 
                            <el-checkbox-group v-model="checkList">
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
                        <div class="sy-import-parms-body-footer right">
                            <el-button type="primary" size="small" @click="download">下载</el-button>
                        </div>
                    </div>  
                </div>

                <div class="sy-import-title">导入文件：</div>
                <el-upload ref="upload" :data="data" :action="base.base + importTeachers.base" :before-upload="handleBeforeUpload" :on-change="onChange" :on-success="onSuccess" :multiple="false" :show-file-list="false" :auto-upload="false" style="padding-left: 2em;font-size: 14px;">
                    <div slot="trigger" class="sy-import-file-name el-input__inner">
                        <div class="sy-import-file-name-div">{{uploadValue}}</div>
                        <span class="fa fa-folder-o"></span>
                    </div>
                    <el-button class="sy-import-button" size="small" @click="submitUpload">导入</el-button>
                </el-upload>

                <div class="sy-import-title" style="margin-top: 15px;" v-if="importMsg && importMsg.length > 0">导入日志：</div>
                <div class="sy-import-msg" v-if="importMsg && importMsg.length > 0">
                    <div v-for="(o, index) in importMsg" :key="index" class="sy-import-msg-div"><span :class="'fa ' + o.type"></span>{{o.msg}}</div>
                </div>

                <div class="sy-import-title" style="margin-top: 15px;">导入提示：</div>
                <div class="sy-import-info">
                    <div class="sy-import-info-node"><span class="fa"></span>Excel导入格式如下</div>
                    <el-table> </el-table>

                    <div class="sy-import-info-node">
                        <span class="fa"></span> 帐号、姓名、性别都必须填写；勾上账号自动生成后账号不用填写,生成的账号规则为“账号前缀+t+年度+001自增”，例如：t2016001<br>
                    </div>
                </div>
            </div>
        </div>
    </sy-grad-4>
</template>