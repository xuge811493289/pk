<template>
    <sy-grad-4 :border="false" v-loading="loading" element-loading-text="正在导入...">
        <div slot="bodyRight">
            <div class="sy-up">
                <el-row>
                    <el-col :span="16">
                        <span>学年：{{data.yearValue}}</span> &nbsp; <span> 学期：{{data.termValue == 1 ? '第一学期' : '第二学期'}}</span>
                    </el-col>
                    <el-col :span="8" class="right">
                        <el-button type="" @click="download">下载批量导入模板</el-button>
                        <el-button type="primary" @click="back">返回</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="sy-import sy-down">

                <div class="sy-import-title">导入文件：</div>
                <el-upload ref="upload" :data="data" :action="base.base + administrationTeachUpload.base" :before-upload="handleBeforeUpload" :on-change="onChange" :on-success="onSuccess" :multiple="false" :show-file-list="false" :auto-upload="false" style="padding-left: 2em;font-size: 14px;">
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
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="a1" label="年级"></el-table-column>
                        <el-table-column prop="a2" label="班级"></el-table-column>
                        <el-table-column prop="a3" label="语文"></el-table-column>
                        <el-table-column prop="a4" label="数学"></el-table-column>
                        <el-table-column prop="a5" label="外语"></el-table-column>
                    </el-table>
                    <div class="sy-import-info-node">
                        <span class="fa"></span> 1.选择您要安排任教的年级<br>
                        <span class="fa"></span> 2.下载任课教师安排模板<br>
                        <span class="fa"></span> 3.填写任课教师名称<br>
                        <span class="fa"></span> 4.选择文件并导入<br>
                    </div>
                </div>
            </div>
        </div>
    </sy-grad-4>
</template>

<script>
import {administrationTeachDownload,
        administrationTeachUpload} from './request.js';
import config from './config.js';
import _ from 'lodash';
export default {
    components: {

    },
    name: 'improtMsg',
    data () {
        return {
            administrationTeachUpload: administrationTeachUpload,
            base: {
                base: window.ShiYue.base
            },
            yearList: [],
            termList: [],
            fileList: [],
            tableData: [
                {
                    a1: '小学一年级',
                    a2: '小学一年级(1)班',
                    a3: '张三',
                    a4: '李四',
                    a5: '王五'
                }
            ],
            uploadValue: '',
            currentUnitId: this.$route.query.unitId,
            currentGradeId: this.$route.query.gradeId,
            loading: false,
            importMsg: [],
            data: {
                gradeId: this.$route.query.gradeId,
                yearValue: this.$route.query.yearId,
                termValue: this.$route.query.termId,
                unitId: this.$route.query.unitId
            }
        }
    },
    beforeCreate(){

    },
    created(){
        this.$parent.$emit('currentPage','/base/executiveTeacher');
    },
    watch:{

    },
    computed: {

    },
    methods: {
        back(){
            let obj = {
                currentNodeKey: this.$route.params.currentNodeKey, 
                params: this.$route.params.parmas
            };
            this.$router.push({ name: 'executiveTeacher', params: obj });
        },
        // 下载
        download(){
            this.$downloade(administrationTeachDownload.base,'POST',{
                gradeId: this.currentGradeId,
                unitId: this.currentUnitId,
                yearValue: this.data.yearValue,
                termValue: this.data.termValue
            })
        },
        // 导入之前
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
        // 导入成功
        onSuccess(response, file, fileList){
            // console.log(response);
            if(response.code !== 'ok'){
                this.$notify({
                    title: '失败',
                    message: response.message,
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
            setTimeout(()=>{this.uploadValue = ''},100)
            let arr = [];
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
            // console.log(arr);
            this.importMsg = arr;
            this.loading = false;
        },
        // 手动导入
        submitUpload() {
            if(!this.uploadValue){
                this.$notify({
                    title: '提示',
                    message: '选择文件后导入！',
                    type: 'warning'
                });
                return;
            }
            this.$refs.upload.submit();
        },
        // 选额文件
        onChange(file, fileList){
            this.uploadValue = file.name;
        }       
    },
    mounted(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
