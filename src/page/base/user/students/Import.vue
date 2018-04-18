<template>
    <sy-grad-4 :border="false" v-loading="loading" element-loading-text="正在导入...">
        <div slot="bodyRight">
            <div class="sy-up right">
                <el-button type="" @click="download">下载批量导入模板</el-button>
                <el-button type="" @click="back">返回</el-button>
            </div>
            <div class="sy-import sy-down">
                <div class="sy-import-title" style="margin-top: 15px;" >导入参数配置：</div>
                <div class="sy-import-parms">
                    <el-checkbox v-model="data.gaccount">账号自动生成</el-checkbox>
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <span>账号前缀：</span>
                    <el-input v-model.trim="data.accountPrefix" placeholder="" size="mini" style="width:50px;"></el-input>
                    <el-tooltip class="item" popper-class="password-msg" effect="light" content="选择账号随机生成，对应每个用户的账号和密码" placement="right">
                        <i class="el-icon-warning" style="color: #fb9a53;"></i>
                    </el-tooltip>
                </div>

                <div class="sy-import-title">导入文件：</div>
                <el-upload ref="upload" :data="data" :action="base.base + importStudents.base" :before-upload="handleBeforeUpload" :on-change="onChange" :on-success="onSuccess" :multiple="false" :show-file-list="false" :auto-upload="false" style="padding-left: 2em;font-size: 14px;">
                    <div slot="trigger" class="sy-import-file-name el-input__inner">
                        <div class="sy-import-file-name-div">{{uploadValue}}</div>
                        <span class="fa fa-folder-o"></span>
                    </div>
                    <el-button class="sy-import-button" size="small" @click="submitUpload">导入</el-button>
                </el-upload>

                <div class="sy-import-title" style="margin-top: 15px;" v-if="importMsg && importMsg.length > 0">导入日志：</div>
                <div class="sy-import-msg" v-if="importMsg && importMsg.length > 0">
                    <div v-for="(o, index) in importMsg" :key="index" class="sy-import-msg-div">
                        <span :class="'fa ' + o.type"></span>
                        <span v-if="!o.success" style="color:#ff4949">{{o.msg}}</span>
                        <span v-else style="color:#13CE66">{{o.msg}}</span>
                    </div>
                </div>

                <div class="sy-import-title" style="margin-top: 15px;">导入提示：</div>
                <div class="sy-import-info">
                    <div class="sy-import-info-node"><span class="fa"></span>Excel导入格式如下</div>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="a1"
                            label="帐号">
                        </el-table-column>
                        <el-table-column
                            prop="a2"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="a3"
                            width="80"
                            label="性别">
                        </el-table-column>
                        <el-table-column
                            prop="a4"
                            width="80"
                            label="学生类型">
                        </el-table-column>
                        <el-table-column
                            prop="a5"
                            width="80"
                            label="学号">
                        </el-table-column>
                        <el-table-column
                            prop="a6"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="a7"
                            label="身份证">
                        </el-table-column>
                        <el-table-column
                            prop="a8"
                            label="密码">
                        </el-table-column>
                        <el-table-column
                            prop="a10"
                            label="家长姓名">
                        </el-table-column>
                        <el-table-column
                            prop="a11"
                            width="80"
                            label="家长账号">
                        </el-table-column>
                        <el-table-column
                            prop="a12"
                            label="家长密码">
                        </el-table-column>
                        <el-table-column
                            prop="a13"
                            label="家长联系电话">
                        </el-table-column>
                        <el-table-column
                            prop="a15"
                            label="年级名称">
                        </el-table-column>
                        <el-table-column
                            prop="a16"
                            label="班级名称">
                        </el-table-column>
                        <el-table-column
                            prop="a17"
                            label="考勤号">
                        </el-table-column>
                    </el-table>

                    <div class="sy-import-info-node">
                        <span class="fa"></span> 学生姓名、性别、学号、学生类型必须填写，帐号、身份证号码至少填写一项；勾上账号自动生成后账号不用填写,生成的账号规则为“账号前缀+s+年度+001自增”，例如：s2016001;<br>
                        <span class="fa"></span> 如果没有填写密码并且密码不是自动生成那么密码和账号一致；<br>
                        <span class="fa"></span> 重复的学生账号将会被覆盖，若修改家长账号则旧账号会被删除;<br>
                        <span class="fa"></span> 家长帐号，学生学号不能重复.<br>
                    </div>
                </div>
            </div>
        </div>
    </sy-grad-4> 
</template>

<script>

import config from './config.js';
import _ from 'lodash';
import {downloadStudentImportTemplateBase,importStudents} from '../request.js';
export default {
    components: {

    },
    name: 'improtMsg',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            loading: false,
            checkList: ['账号','姓名','性别'],
            fileList: [],
            tableData: config.excelTable || [],
            form: {
                text: ''
            },
            currentUnitId: '',
            importStudents: importStudents,
            base: {
                base: window.ShiYue.base
            },
            data: {
                unitId: '',
                gaccount: false,
                accountPrefix: ''
            },
            uploadValue: '',
            importMsg: []
        }
    },
    beforeCreate(){

    },
    created(){
        this.$parent.$emit('currentPage','/base/students');
        this.currentUnitId = this.$route.params.parmas.unitId;
    },
    watch:{

    },
    computed: {

    },
    methods: {
        back(){
            this.$router.push({ name: 'students', params: { currentNodeKey: this.$route.params.currentNodeKey, parmas: this.$route.params.parmas } });
        },
        // 下载
        download(){
            this.$downloade(downloadStudentImportTemplateBase,'POST',{})
        },
        // 提交上传
        submitUpload() {
            if(!this.uploadValue){
                this.$notify({
                    title: '提示',
                    message: '请选择文件后导入！',
                    type: 'warning'
                });
                return;
            }
            this.data.gaccount = this.data.gaccount ? true : false;
            this.data.unitId = this.currentUnitId;
            // console.log(this.$refs.upload);
            this.$refs.upload.submit();
        },
        // 上传文件改变函数
        onChange(file, fileList){
            this.uploadValue = file.name;
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handleBeforeUpload(file){
            this.importMsg = [];
            this.loading = true;
            const isXLS = file.type === 'application/vnd.ms-excel';
            const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const isLt10M = file.size / 1024 / 1024 < 10;

            if (!isXLS && !isXLSX) {
                this.$notify({
                    title: '提示',
                    message: '导入文件只能是 xls/xlsx 格式!',
                    type: 'error'
                });
            }
            if (!isLt10M) {
                 this.$notify({
                    title: '提示',
                    message: '导入文件大小不能超过 10MB!',
                    type: 'error'
                });
            }
            if ((isXLS || isXLSX) && isLt10M) {
                this.loading = true;
            } else {
                this.loading = false;
            }
            return (isXLS || isXLSX) && isLt10M;
        },
        handlePreview(file) {
            // console.log(file);
        },
        // 上传成功
        onSuccess(response, file, fileList){
            if(response.status !== 200){
                this.$notify({
                    title: '导入失败',
                    message: _.map(response.data,'message').join('、'),
                    type: 'error'
                });
                this.loading = false;
                setTimeout(()=>{this.uploadValue = ''},100)
                return;
            }
            // this.$notify({
            //     title: '成功',
            //     message: '操作成功！导入结果详见导入日志。',
            //     type: 'success'
            // });
            let arr = [];
            setTimeout(()=>{this.uploadValue = ''},100)
            if(response && response.data){
                if(!response.data.fail||response.data.fail.length==0){
                    this.$notify({
                        title: '成功',
                        message: '导入成功！',
                        type: 'success'
                    });
                }else if(!response.data.success||response.data.success.length==0){
                    this.$notify({
                        title: '失败',
                        message: '导入失败！',
                        type: 'error'
                    });
                } else {
                    this.$notify({
                        title: '警告',
                        message: '导入数据部分有误！',
                        type: 'warning'
                    });
                }
                response.data.fail.forEach((_res,i)=>{
                    arr.push({
                        msg: _res,
                        success: false,
                        type: 'fail'
                    })
                })
                response.data.success.forEach((_res,i)=>{
                    arr.push({
                        msg: _res,
                        success: true,
                        type: 'success'
                    })
                })
            }else{
                arr = [];
            }
            this.importMsg = arr;
            this.loading = false;
        }
    },
    mounted(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
