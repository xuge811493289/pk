<template>
	<sy-grad-4 v-loading="loading" element-loading-text="正在导入...">
        <div slot="bodyRight">
            <div class="sy-up" style="text-align: right;">
            	<el-button  class="button" @click="downLoadModel">下载导入模板</el-button>
                <el-button  @click="$router.push( {name: 'site',params: { showTable: true,unitId:currentUnitId }})" style="margin-right: 10px;">返回</el-button>
            </div>
            <div class="sy-import sy-down">
                <div class="sy-import-title">导入文件：</div>
                <el-upload ref="upload" :data="data" :action="base.base + importSited.base" :before-upload="handleBeforeUpload" :on-change="onChange" :on-success="onSuccess" :multiple="false" :show-file-list="false" :auto-upload="false" style="padding-left: 2em;font-size: 14px;">
                    <div slot="trigger" class="sy-import-file-name el-input__inner">
                        <div class="sy-import-file-name-div">{{uploadValue}}</div>
                        <span class="fa fa-folder-o"></span>
                    </div>
                    <el-button class="sy-import-button" size="small" @click="submitUpload">导入</el-button>
                </el-upload>
               <div class="sy-import-title" style="margin-top: 15px;" v-if="importMsg && importMsg.length > 0">导入日志：</div>
                <div class="sy-import-msg" v-if="importMsg && importMsg.length > 0" style="height:200px;overflow-y: auto;">
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
							<el-table-column v-for="item in appColumn" :prop="item.prop" :key="item.prop" :width="item.width" :label="item.label">{{item.prop}}</el-table-column>
						</el-table>
                    <div class="sy-import-info-node">
                    	<p><span class="fa"></span>批量导入前先添加"教室类型"，否则会导致批量导入教室不成功!</p>
						<p><span class="fa"></span>"教室名称"为必填项！</p>
						<p><span class="fa"></span>"教室地址"为必填项，教室地址不能与单位内的其他教室地址相同!</p>
                    </div>
                </div>
            </div>
        </div>
   </sy-grad-4>
</template>
<script>
	import config from './config.js';
	import {importSited} from '../require.js';
	export default {
		name: 'improtMsg',
		data() {
			return {
				uploadDatas: {
					unitId: ''
				},
				
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				},
				 data: {
	                unitId: ''
	           },
	           base: {
                base: window.ShiYue.base
            	},
				uploadValue:'',
				loading:false,
				importMsg: [],
				fileList: [],
				tableData:[],
				appColumn:config.excelHead,
				importSited:importSited
			}
		},
		beforeCreate() {

		},
		created() {
			this.currentUnitId = this.$route.params.unitId;
			this.$parent.$emit('currentPage', '/base/site');
			this.tableData=[{
                    sort:'1',
					siteType:'普通教室',
		            siteName: '教室201',
		            address:'浦东校区',
		            count: '30',
		            memo: '上课'
				},{
                    sort:'2',
					siteType:'物理实验室',
		            siteName: '教室202',
		            address:'浦东校区',
		            count: '50',
		            memo: '进行物理实验'
				}];
		},
		watch: {
			
		},
		computed: {
			

		},
		methods: {
			downLoadModel(){
            this.$downloade('/api/base/placeDownload','POST',{})
        	},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			 submitUpload() {
	            console.log(this.href);
	            this.data.unitId = this.currentUnitId;
	            this.$refs.upload.submit();
	          
	        },
	        // 上传文件改变函数
	        onChange(file, fileList){
	            this.uploadValue = file.name;
	        },
	        //上传之前
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
	        onSuccess(response, file, fileList) {
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
	                        type:'fail'
	                    })
	                })
	                response.data.success.forEach((_res,i)=>{
	                    arr.push({
	                        msg: _res,
	                        success: true,
	                        type:'success'
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
<style scoped>
	.improt-msg {
		overflow: auto;
		position: relative;
		height: 100%;
		padding: 30px 20px;
		box-sizing: border-box;
	}
	.improt-msg-nav {
		padding: 5px;
	}
	.sy-import .sy-import-msg{
		height:auto;
	}
	p.info-msg {
		padding-left: 30px;
	}
	
	div.info-msg {
		margin-left: 30px;
		border: 1px solid #ccc;
	}
	
	.password-msg {
		width: 100px;
	}
	
	.sy-left {
		float: left;
	}
	
	.sy-right {
		float: right;
	}
	   .improt-msg{
        overflow: auto;
        position: relative;
        height: 100%;
        padding: 30px 20px;
        box-sizing: border-box;
    }
    .improt-msg-nav{
        text-align: right;
        padding: 5px;
    }
    p.info-msg{
        padding-left: 30px;
    }
    div.info-msg{
        margin-left: 30px;
        border: 1px solid #ccc;
    }
    .password-msg{
        width: 100px;
    }
    .upLoadText{
        display: inline-block;
        min-width: 120px;
        vertical-align: middle;
        height: 28px;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid rgb(191, 209, 217);
        box-sizing: border-box;
        color: rgb(31, 52, 61);
        font-size: inherit;
        line-height: 28px;
        outline: 0;
        padding: 0 10px;
        transition: border-color .2s  cubic-bezier(.645,.045,.355,1);
    }
</style>