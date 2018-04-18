<template>
    <sy-grad-4 :border="false" v-loading="loading" element-loading-text="正在导入...">
        <div slot="headerRight" style="line-height: 40px;text-align: right;">
            <span style="float: left;padding-left: 30px;font-weight: 600;font-size: 14px;">{{planName}}</span>
            <el-button @click="download">导入模板下载</el-button> 
            <el-button @click="back" style="margin-right: 10px;">返回</el-button> 
        </div>
        <div slot="bodyRight">
            <div class="sy-import sy-down" style="top: 0px;left: 30px;right: 30px;width: auto;">
                <div class="sy-import-title">导入文件：</div>
                <el-upload ref="upload" :data="data" 
                    :action="action" 
                    :before-upload="handleBeforeUpload" 
                    :on-change="onChange" 
                    :on-success="onSuccess" 
                    :multiple="false" 
                    :show-file-list="false" 
                    :auto-upload="false" 
                    style="padding-left: 2em;font-size: 14px;">
                    <div slot="trigger" class="sy-import-file-name el-input__inner">
                        <div class="sy-import-file-name-div" :title="uploadValue">{{uploadValue}}</div>
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
                <div class="sy-import-info" v-if="$route.query.type == '1'">
                    <div class="sy-import-info-node"><span class="fa"></span>Excel导入格式如下</div>
                    <el-table :data="tableData" border >
                        <el-table-column prop="a1" label="年级"></el-table-column>
                        <el-table-column prop="a2" label="班级名称"></el-table-column>
                        <el-table-column prop="a3" label="星期一_第一节"></el-table-column>
                        <el-table-column prop="a4" label="星期一_第二节"></el-table-column>
                        <el-table-column prop="a5" label="星期一_第三节"></el-table-column>
                        <el-table-column prop="a6" label="星期一_第四节"></el-table-column>
                        <el-table-column prop="a7" label="星期二_第一节"></el-table-column>
                        <el-table-column prop="a8" label="星期二_第二节"></el-table-column>
                        <el-table-column prop="a9" label="星期二_第三节"></el-table-column>
                        <el-table-column prop="a10" label="星期二_第四节"></el-table-column>
                    </el-table>
                    <div class="sy-import-info-node">
                        <div>导入步骤：</div>
                        <div style="padding-left: 15px;">
                            <span>1、</span>下载导入模板；<br>
                            <span>2、</span> 将对应的数据填入对应的地址；<br>
                            <span>3、</span> 选择文件导入。<br>
                            <span class="fa"></span> 语文|张老师 说明：语文为课程名称，|后为老师，若一个课程有多个老师，老师间有逗号<br>
                        </div>
                    </div>
                </div>
                <div class="sy-import-info" v-else>
                    <div class="sy-import-info-node"><span class="fa"></span>Excel导入格式如下</div>
                    <el-table :data="tableData" border >
                        <el-table-column prop="a1" label="课位名称" width="150"></el-table-column>
                        <el-table-column prop="a2" label="上课时间"></el-table-column>
                        <el-table-column prop="a3" label="关联年级"></el-table-column>
                        <el-table-column prop="a4" label="上课选修班"></el-table-column>
                    </el-table>
                    <div class="sy-import-info-node">
                        <div>导入步骤：</div>
                        <div style="padding-left: 15px;">
                            <span>1、</span>下载导入模板；<br>
                            <span>2、</span> 将对应的数据填入对应的地址；<br>
                            <span>3、</span> 选择文件导入。<br>
                            <span class="fa"></span> 其中课位名称、上课时间、关联年级、上课选修班数据均为必填，并且格式为逗号隔开的合法值<br>
                        </div>
                    </div>
                </div>
            </div>
            <sy-dialog title="导入课表" showImg :visible.sync="dialogVisible" height="326px" width="500px" :show-close="false"> 
                <div slot="body" class="sy-pk-import-success">
                    <div class="sy-pk-success-msg">
                        <i class="fa fa-check" style="font-size: 1.5em;" aria-hidden="true"></i> 恭喜，您已导入成功！
                    </div>
                    <div class="sy-pk-success-tools">
                        <div><b>您可以进行以下操作：</b></div>
                        <ul>
                            <li @click="$router.push('/pk/pre/home')">
                                <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                <span>返回排课方案首页</span>
                            </li>
                            <li @click="$router.push('/pk/pre/manager/previewSchedule')">
                                <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                <span>查看预览课表</span>
                            </li>
                            <li @click="dialogVisible = false">
                                <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                <span>查看导入日志</span>
                            </li>
                            <li @click="dialogVisible = false">
                                <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                <span>继续导入</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </sy-dialog>
        </div>
    </sy-grad-4>
</template>

<script>

import _ from 'lodash';
import { 
    downloadKbModel,
    downloadxxModel,
    importKbModel,
    importxxModel
} from './request.js';
export default {
    name: 'improtMsg',
    props:{
        unitId: {
            type: String
        },
    },
    data () {
        return {
            planName: this.$getSess('sou-plan-name') || '',
            dialogVisible: false,
            action: this.$route.query.type == '1' ? importKbModel : importxxModel,
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            sendSms: '',
            loading: false,
            smsContent: '账号:{账号}密码:{密码}访问地址:http://3.shiyuesoft.com',
            radomPasswrod: false,
            radomLoginName: false,
            prfix: '',
            checkList: [],
            fileList: [],
            downloadDatas: [],
            defaultSelected: [],
            tableData: [],
            uploadValue: '',
            currentUnitId: '',
            currentNodeKey: '',
            unitType: '',
            importTeachers: '',
            data: {solutionId: this.$route.query.id}, // 导入参数
            importMsg: [],
            isShowMessBtn: false
        }
    },
    created(){
        this.init();
    },
    methods: {
        init(){
            if(this.$route.query.type == '1'){ // 总课表
                for (let index = 0; index < 3; index++) {
                    let obj = {};
                    obj.a1 = '初中一年级';
                    obj.a2 = '1班';
                    obj.a3 = '语文|张老师';
                    obj.a4 = '数学|王老师';
                    obj.a5 = '化学|王老师，刘老师';
                    obj.a6 = '物理|王老师';
                    obj.a7 = '生物|王老师，刘老师';
                    obj.a8 = '政治|王老师';
                    obj.a9 = '英语|王老师';
                    obj.a10 = '历史|王老师，刘老师';
                    this.tableData.push(obj)
                }
            }else if(this.$route.query.type == '2'){ // 走课表
                for (let index = 1; index < 4; index++) {
                    let obj = {};
                    obj.a1 = '等级考试'+index;
                    obj.a2 = '星期二-第一节课，星期二-第二节课';
                    obj.a3 = '高一年级，高二年级';
                    obj.a4 = '选修班1，选修班2';
                    this.tableData.push(obj)
                }
            }
           
        },
        // 下载导入模板
        download(){
            if(this.$route.query.type == '1'){ // 总课表
                this.$downloade(downloadKbModel,'POST',{solutionId: this.$route.query.id})
            }else if(this.$route.query.type == '2'){ // 走课表
                this.$downloade(downloadxxModel,'POST',{})
            }
        },
        // 返回
        back(){
            this.$router.push({ path: '/pk/pre/home', params: {} });
        },
        // 开始导入
        submitUpload() {
            if(!this.uploadValue){
                this.$notify({ message: '选择文件后导入！', type: 'warning' });
                return;
            }
            this.$refs.upload.submit();
        },
        // 上传文件改变函数
        onChange(file, fileList){
            this.uploadValue = file.name;
        },
        // 上传之前回调函数
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
        // 上传成功
        onSuccess(response, file, fileList){
            if(response.status != 200){
                this.$notify({
                    message: response.message,
                    type: 'error'
                });
                this.loading = false;
                setTimeout(()=>{this.uploadValue = ''},100)
                return;
            }else{
                let arr = [];
                if(response && response.data){
                    if(!response.data.fail||response.data.fail.length==0){
                        this.$notify({
                            title: '成功',
                            message: '导入成功！',
                            type: 'success'
                        });
                        this.dialogVisible= false;
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
                    if(response.data.fail) {
                        response.data.fail.forEach((_res,i)=>{
                            arr.push({
                                msg: _res,
                                success: false,
                                type: 'fail'
                            })
                        })
                    }
                    if(response.data.success) {
                        response.data.success.forEach((_res,i)=>{
                            arr.push({
                                msg: _res,
                                success: true,
                                type: 'success'
                            })
                        })
                    }
                }else{
                    arr = [];
                }
                this.importMsg = arr;
                this.loading = false;  
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sy-pk-import-success{
    background-color: #fff;
    border: 1px solid #13CE66;
    border-radius: 3px;
    box-sizing: border-box;
}
.sy-pk-success-msg{
    text-align: center;
    font-size: 1.5em;
    line-height: 3em;
    color: #13CE66;
    font-weight: 500;
    
}
.sy-pk-success-tools{
    padding-left: 126px;
    line-height: 40px;
    color: #666;
}
.sy-pk-success-tools>ul{
    padding-left: 40px;
}
.sy-pk-success-tools ul li{
    cursor: pointer;
}
.sy-pk-success-tools ul li>i{
    color: #13CE66;
}
</style>
