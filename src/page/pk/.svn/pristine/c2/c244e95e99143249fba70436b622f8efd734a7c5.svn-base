<template>
    <sy-grad-4 v-loading="loading" element-loading-text="正在导入...">
        <div slot="bodyRight">
            <div class="sy-up" style="text-align: right;">
                <el-button @click="back" style="margin-right: 10px;">{{$t('button.back')}}</el-button>
                <a :href="download">
                    <el-button class="button">{{$t('button.downloadImportTemplate')}}</el-button>
                </a>
            </div>
            <div class="sy-import sy-down">
                <div class="sy-import-title">导入文件：</div>
                <el-upload ref="upload" :data="data" :action="importUrl" :before-upload="handleBeforeUpload" :on-change="onChange" :on-success="onSuccess" :multiple="false" :show-file-list="false" :auto-upload="false" style="padding-left: 2em;font-size: 14px;">
                    <div slot="trigger" class="sy-import-file-name el-input__inner">
                        <div class="sy-import-file-name-div" :title="$t('input.selectFilePlaceholder')">{{uploadValue}}</div>
                        <span class="fa fa-folder-o"></span>
                    </div>
                    <el-button class="sy-import-button" size="small" @click="submitUpload">{{$t('button.import')}}</el-button>
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
                    <div class="sy-import-info-node">
                        <span class="fa"></span>Excel导入格式如下</div>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="a1" label="序号"></el-table-column>
                        <el-table-column prop="a2" label="年度名称"></el-table-column>
                        <el-table-column prop="a3" label="学期名称"></el-table-column>
                        <el-table-column prop="a4" label="年级名称"></el-table-column>
                        <el-table-column prop="a5" label="班级名称"></el-table-column>
                        <el-table-column prop="a6" label="班级简称"></el-table-column>
                        <el-table-column prop="a7" label="班主任"></el-table-column>
                        <el-table-column prop="a8" label="副班主任"></el-table-column>
                        <el-table-column prop="a9" label="班长"></el-table-column>
                        <el-table-column prop="a10" label="副班长"></el-table-column>
                        <el-table-column prop="a11" label="荣誉称号"></el-table-column>
                        <el-table-column prop="a12" label="班级地点"></el-table-column>
                    </el-table>
                    <div class="sy-import-info-node">
                        <span class="fa"></span>年度名称、学期名称、年级名称、班级名称为必填项，其中年度名称、学期名称、年级名称必须和系统内的名称一致，注意不是简称。</div>
                </div>
            </div>
        </div>

    </sy-grad-4>
</template>
<script>
import config from './config.js';
export default {
    name: 'improtMsg',
    data() {
        return {
            loading: false,
            fail: {
                color: 'red'
            },
            success: {
                color: 'green'
            },
            data: {
                unitId: ''
            },
            importUrl: config.import,
            download: config.download,
            msg: 'Welcome to Your Vue.js App',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            checkList: ['账号', '姓名', '性别'],
            fileList: [],
            tableData: [],
            importMsg: [],
            uploadValue: ''
        }
    },
    created() {
        this.$parent.$emit('currentPage', '/base/grade');
        this.tableData.push({
            a1: '1',
            a2: '2015-2016',
            a3: '第一学期',
            a4: '高中二年级',
            a5: '高中二年级一班',
            a6: '高二一班',
            a7: '赵六',
            a8: '王五',
            a9: '李四',
            a10: '张三',
            a11: '荣誉称号1',
            a12: '南教学楼101室'
        });
        this.tableData.push({
            a1: '2',
            a2: '2015-2016',
            a3: '第一学期',
            a4: '高中二年级',
            a5: '高中二年级二班',
            a6: '高二二班',
            a7: '赵六',
            a8: '王五',
            a9: '李四',
            a10: '张三',
            a11: '荣誉称号2',
            a12: '南教学楼102室'
        });
        this.tableData.push({
            a1: '3',
            a2: '2015-2016',
            a3: '第一学期',
            a4: '高中二年级',
            a5: '高中二年级三班',
            a6: '高二三班',
            a7: '赵六',
            a8: '王五',
            a9: '李四',
            a10: '张三',
            a11: '荣誉称号3',
            a12: '南教学楼103室'
        });
    },
    methods: {
        back() {
            this.$router.push({
                path:'/pk/pre/manager/baseData/classes',
                params: this.$route.params
            });
        },
        submitUpload() {
            if (!this.uploadValue) {
                this.$notify({
                    title: '提示',
                    message: '请选择文件后导入！',
                    type: 'warning'
                });
                return false;
            }
            this.data.unitId = this.$route.params.unitId;
            this.$refs.upload.submit();
        },
        // 上传之前回调函数
        handleBeforeUpload(file) {
            this.importMsg = [];
            this.loading = true;
        },
        // 上传文件改变函数
        onChange(file, fileList) {
            this.uploadValue = file.name;
        },
        // 上传成功
        onSuccess(response, file, fileList) {
            if (response.status == 200) {
                if (response.data && response.data.fail && response.data.fail.length > 0) {
                    let fail = response.data.fail;
                    for (let i = 0; i < fail.length; i++) {
                        this.importMsg.push({
                            msg: fail[i],
                            success: false,
                            type: 'fail'
                        });
                    }
                }
                if (response.data && response.data.success && response.data.success.length > 0) {
                    let success = response.data.success;
                    for (let i = 0; i < success.length; i++) {
                        this.importMsg.push({
                            msg: success[i],
                            success: true,
                            type: 'success'
                        });
                    }
                }
                if (!response.data.fail || response.data.fail.length == 0) {
                    this.$notify({
                        title: '成功',
                        message: '导入成功！',
                        type: 'success'
                    });
                } else if (!response.data.success || response.data.success.length == 0) {
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
            } else if (response.status >= 10000 && response.message) {
                this.$notify({
                    title: '提示',
                    message: response.message,
                    type: 'warning'
                });
            } else if (response.status === 500) {
                this.$notify({
                    title: '失败',
                    message: response.message,
                    type: 'error'
                });
            }
            this.loading = false;
        }
    }
}
</script>