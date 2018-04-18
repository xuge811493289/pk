<template>
	<div id="site1">
		<div class="sy-row" style="margin:20px 0;">
            <div class="sy-col sy-19">
            	<div class="sy-left">
            		
            	</div>
				<div class="sy-right">
					<el-button type="primary"  @click="importSite">导入</el-button>
					<el-button type="primary">返回</el-button>
					<el-button type="primary"  @click="addSiteVal">新增</el-button>
				</div>
            </div>
       </div>
        <el-table ref="multipleTable" :data="siteData2" border tooltip-effect="dark" height="100%" style="width: 100%;"@selection-change="handleSelectionChange">
             <el-table-column type="selection" width="55"></el-table-column>
             <el-table-column label="序号" prop="id" width="80"></el-table-column>
            <el-table-column v-for="item in appColumn2" 
                :key="item.prop"
                :width="item.width"
                :label="item.label">
                <template scope="scope">
                   <span v-if="item.prop !== 'sex' && item.prop !== 'status'">{{scope.row[item.prop]}}</span>
                   <span v-if="item.prop === 'sex'">{{scope.row[item.prop] === 0 ? '男' : '女'}}</span>
                   <span v-if="item.prop === 'status'">{{scope.row[item.prop] === 0 ? '禁用' : '启用'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
                <template scope="scope">
                    <el-button
                    size="small"
                    type="text"
                    @click="handleSitesEdit(scope.$index, scope.row)">编辑</el-button>
                     <el-button
                    size="small"
                    type="text"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="sy-row" style="margin:20px 0;">
            <div class="sy-col sy-19">
            	<div class="sy-left">
            		<el-button type="info" style="float:left" @click="DeleteTableSel" :disabled="this.sels.length===0">删除</el-button>
            	</div>
				<div class="sy-right">
					 <el-pagination style="float:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="40">
					 </el-pagination>	
				</div>
            </div>
       </div>
         <!--新增场地2-->
        <sy-dialog
        	title="新增场地"
        	:visible.sync="dialogSitedFormVisible"
        	:close-on-click-modal="false"
            position="middle"
            height="40%"
            width="40%"
            slide="fade"
        	size="small">
        	 <div slot="body">
        	<el-form label-width="100px" style="margin-top:20px;margin-right:20px" :model="addSiteForm">
                <el-row>
                    <el-col :span="12">
               			<el-form-item label="场地名称">
                            <el-input v-model="addSiteForm.siteName"></el-input>
                        </el-form-item>
                        <el-form-item label="场地地址">
                            <el-input v-model="addSiteForm.siteAddr"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                           <el-form-item label="场地说明">
                                <el-input v-model="addSiteForm.siteDesc"></el-input>
                           </el-form-item>
                           <el-form-item label="容纳人数">
                            <el-input v-model="addSiteForm.gallery"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form> 
           </div>
        	<span slot="footer" class="dialog-footer">
                <el-button @click="dialogSitedFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogSitesFormVisible = false">确 定</el-button>
            </span>
        </sy-dialog>
        <!--编辑场地设置-->
        <sy-dialog
            title="编辑"
            :visible.sync="editorSitesDialog"
            :close-on-click-modal="false"
            position="middle"
            height="40%"
            width="40%"
            slide="fade"
            size="small"> 
            <div slot="body">
            <el-form label-position="right" style="margin:20px 20px 0 0" label-width="100px" :model="editSitesForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="场地名称">
                            <el-input v-model="editSitesForm.siteName"></el-input>
                        </el-form-item>
                        <el-form-item label="场地地址">
                            <el-input v-model="editSitesForm.siteAddr"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    	 <el-form-item label="场地描述">
                            <el-input v-model="editSitesForm.siteDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="容纳人数">
                            <el-input v-model="editSitesForm.gallery"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
           </el-form>
          </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editorSitesDialog = false">取 消</el-button>
                <el-button type="primary" @click="editorSitesDialog = false">确 定</el-button>
            </span>
        </sy-dialog>
	</div>
</template>

<script>
	import config from './config.js';
import pager from '../../../config.js';
export default {
    data () {
        return {
            dialogSitedFormVisible:false,
            editorSitesDialog:false,
            form: {
                text: ''
            },
            ruleForm:{
            	stuSection:''
            },
            addSiteForm:{
            	siteName:''
            },
            editSitesForm:{
            	siteName:''
            },
            sels: [],
            currentPage: 1,
            siteData2:[],
            pageSizes: pager.pageSizes,
            pageSize: pager.pageSize,
            appColumn2: config.siteList2,
            isvisible: false,            
            rules: {
            	 stuSection : [{ 
            	required: true,
            	message: '请选择活动资源', 
            	trigger: 'change' 
            	}]
            },
            obj:{
                color: '#f00'
            },
             defaultProps: {
                children: 'children',
                label: 'label'
            },
            multipleSelection: [],
        }
    },
    beforeCreate(){

    },
    created(){
        this.$parent.$emit('currentPage','/base/site');
        let arr = [];
        for(let i = 0; i<2 ; i++){
            this.siteData2.push(
                {
                    id: i*1 + 1,
                  	siteName:'教室201',
                  	siteAddr:'德育楼二楼',
                  	siteDesc:'居中展示',
                  	gallery:'30人'
                }
            )
        }
        this.allData = arr;
	    this.tableData = arr.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
    methods:{
        handleNodeClick(data) {
            console.log(data);
        },
        merge(target) {
            for (let i = 1, j = arguments.length; i < j; i++) {
                let source = arguments[i] || {};
                for (let prop in source) {
                if (source.hasOwnProperty(prop)) {
                    let value = source[prop];
                    if (value !== undefined) {
                    target[prop] = value;
                    }
               	 }
                }
            }
        },
        addSiteVal(){
        	this.dialogSitedFormVisible=true;
        },
       handleSizeChange(val) {
        this.tableData = this.allData.slice((this.currentPage-1)*val,this.currentPage*val);
        this.pageSize = val;
	      },
	    handleCurrentChange(val) {
	        this.tableData = this.allData.slice((val-1)*this.pageSize,val*this.pageSize);
	        this.currentPage = val;
	      },
         handleSitesEdit(index,row){
            this.editorSitesDialog = true;
            for( let attr in row ) {
	          this.editSitesForm[attr] = row[attr];
	        }
            
        },
        importSite(){
        	this.$router.push('/base/importSite');
        },
        handleDelete(index,row){
    	 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData = _.remove(this.tableData,(n)=>{
                   return n.id !== row.id ? true : false
                });
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });	
        },
         handleSelectionChange(sels) {
	        this.sels = sels;
	      },
       DeleteTableSel(val){
    	var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
		    type: 'warning'
			}).then(() => {
				let para = { ids: ids };
				batchRemoveUser(para).then((res) => {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				});
			}).catch(() => {
				
			});		
        }
		
    }
}
</script>

<style>
	<style scoped>
    .sy-top{
        position: absolute;
        top: 0;
        height: 45px;
        width: 100%;
        line-height: 45px;
        box-sizing: border-box;
        padding: 0 15px;
    }
    .sy-body{
        position: absolute;
        top: 45px;
        width: 100%;
        bottom: 45px;
        box-sizing: border-box;
        padding: 15px;
    }
    .sy-bottom{
        position: absolute;
        height: 45px;
        width: 100%;
        bottom: 0;
        line-height: 45px;
        box-sizing: border-box;
        padding: 0 15px;
    }
    .sy-row{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .sy-col{
        float: left;
        vertical-align: top;
        box-sizing: border-box;
    }
    .sy-1{
        width: 5%;
    }
    .sy-2{
        width: 10%;
    }
    .sy-3{
        width: 15%;
    }
    .sy-4{
        width: 20%;
    }
    .sy-5{
        width: 25%;
    }
    .sy-6{
        width: 30%;
    }
    .sy-7{
        width: 35%;
    }
    .sy-8{
        width: 40%;
    }
    .sy-9{
        width: 45%;
    }
    .sy-10{
        width: 50%;
    }
    .sy-11{
        width: 55%;
    }
    .sy-12{
        width: 60%;
    }
    .sy-13{
        width: 65%;
    }
    .sy-14{
        width: 70%;
    }
    .sy-15{
        width: 75%;
    }
    .sy-16{
        width: 80%;
    }
    .sy-17{
        width: 85%;
    }
    .sy-18{
        width: 90%;
    }
    .sy-19{
        width: 95%;
    }
    .sy-20{
        width: 100%;
    }
    .border{
        border: 1px solid #ccc;
    }
    .full-parent{
        position: relative;
        height: 100%;
    }
    .sy-left{
        float:left;
    }
    .sy-right{
        float: right;
    }
    
    .teacher-content,.teacher{
        position: relative;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 30px 20px;
    }
    .teacher-content{
        padding: 0;
    }
    .teacher-content-top{
        position: absolute;
        height: 30px;
        top: 0;
        width: 100%;
        line-height: 30px;
    }
    .teacher-content-bottom{
        position: absolute;
        top: 30px;
        bottom: 0;
        width: 100%;
    }
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        width: 100px;
        height: 100px;
    }
    .avatar-uploader:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    .register-form{
        text-align: center;
    }
    .open-hide{
        position: absolute;
        top: 40%;
        left: 0;
        cursor: pointer;
        z-index: 500;
    }
</style>