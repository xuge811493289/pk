<template>
	<div class="sy-pk-home-container">
		<sy-grad-4 :border="false">
			<div slot="headerRight" style="line-height: 40px;text-align: right;">
				<el-button @click.native="addSolution('add')" :plain="true" type="info">新建方案</el-button>
				<el-button @click.native="addSolution('import')" :plain="true" type="info">导入课表</el-button>
			</div>
			<div slot="bodyRight" style="padding: 0 10px 10px;">
				<div class="body-right">
					<el-table :data="solutionData" border stripe>
						<el-table-column prop="planName" show-overflow-tooltip label="方案名称" align="left" header-align="center"></el-table-column>
						<el-table-column prop="grades" show-overflow-tooltip  label="排课年级" align="left" header-align="center"></el-table-column>
						<el-table-column prop="startTerm" label="新建时间" width="130" align="center"></el-table-column>
						<el-table-column label="状态" prop="isUp" align="center" width="50">
							<template scope="scope">
								<span>{{scope.row.isUp == 0 ? '禁用' : '启用'}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="openGrades" label="启用年级" show-overflow-tooltip align="center" width="160"></el-table-column>
						<el-table-column prop="startWeek" label="启用周次" align="center"  width="70"></el-table-column>
						<el-table-column prop="endWeek" label="停用周次" align="center"  width="70"></el-table-column>
						<el-table-column prop="isUp" width="210" label="操作"  align="center">
						<template scope="scope">
							<a @click="handleUpdate(scope.$index, scope.row)" href="javascript:void(0);">编辑</a>
							<a @click="handleToPk(scope.$index, scope.row)" href="javascript:void(0);">排课</a>
							<a @click="handleEnable(scope.$index, scope.row)" href="javascript:void(0);" v-if="scope.row.isUp == 0">开启课表</a>
							<a @click="handleDisable(scope.$index, scope.row)" href="javascript:void(0);" v-else-if="scope.row.isUp == 1">停用课表</a>
							<a @click="handleCopy(scope.$index, scope.row)"  href="javascript:void(0);">复制方案</a>
							<a @click="handleDelete(scope.$index, scope.row)" href="javascript:void(0);">删除</a>
						</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</sy-grad-4>

		<!-- 新建方案 -->
		<sy-dialog title="新建方案" :visible.sync="addDialogVisible" height="510px" width="500px"> 
			<div slot="body" style="padding:10px;overflow-y: auto;">
				<el-form :rules="rules" :model="add" ref="add" label-width="85px" label-position="right">
					<el-form-item label="方案名称：" prop="name">
						<el-input v-model="add.name" placeholder="请输入50个以内字符" :maxlength="50"></el-input>
					</el-form-item>
					<el-form-item label="排课年级：" prop="checked">
						<el-checkbox-group v-model="add.checked">
							<el-checkbox style="margin: 0;width: 110px;" v-for="item in add.grade" :label="item.id" :key="item.id">{{item.gradeName}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-collapse v-model="activeNames">
						<el-collapse-item name="1">
							<template slot="title">
								<span>上课时间</span>
								<el-button @click="jumpBase" style="float: right;font-size: 18px;margin-top: 4px;margin-right: 10px;" type="text" title="设置" icon="setting"></el-button>
							</template>
							<el-table :data="add.tableData" style="width:100%;">
								<el-table-column align="center" prop="sort" width="60" label="序号"></el-table-column>
									<el-table-column align="center" prop="name" label="名称"></el-table-column>
									<el-table-column align="center" prop="begin" label="开始时间"></el-table-column>
									<el-table-column align="center" prop="end" label="结束时间"></el-table-column>
							</el-table>
						</el-collapse-item>
					</el-collapse>
				</el-form>
		  	</div>
			<div slot="footer">
				<el-button type="" @click="addDialogVisible = false" size="small">取 消</el-button>
				<el-button type="primary" :loading="toAddSolutionLoading" @click.native="toAddSolution" size="small">确 定</el-button>
			</div>
		</sy-dialog>

		<!-- 编辑(修改) -->
		<sy-dialog title="编辑方案" :visible.sync="editDialogVisible" height="510px" width="500px"> 
			<div slot="body" style="padding:10px;">
				<el-form :rules="rules" :model="editForm" ref="editForm" label-width="85px" label-position="right">
					<el-form-item label="方案名称：" prop="name">
						<el-input v-model="editForm.name" placeholder="请输入50个以内字符" :maxlength="50"></el-input>
					</el-form-item>
					<el-form-item label="排课年级：" prop="checked">
						<el-checkbox-group v-model="editForm.checked"  @change="EditCheckbox">
							<el-checkbox style="margin: 0;width: 110px;" v-for="item in editForm.grade" :label="item.id" :key="item.id">{{item.gradeName}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-collapse v-model="activeNames">
						<el-collapse-item name="1">
							<template slot="title">
								<span>上课时间</span>
								<el-button @click="jumpBase" style="float: right;font-size: 18px;margin-top: 4px;margin-right: 10px;" type="text" title="设置" icon="setting"></el-button>
							</template>
							<el-table :data="add.tableData" style="width:100%;">
								<el-table-column align="center" prop="sort" width="60" label="序号"></el-table-column>
									<el-table-column align="center" prop="name" label="名称"></el-table-column>
									<el-table-column align="center" prop="begin" label="开始时间"></el-table-column>
									<el-table-column align="center" prop="end" label="结束时间"></el-table-column>
							</el-table>
						</el-collapse-item>
					</el-collapse>
				</el-form>
			</div>
			<div slot="footer">
				<el-button type="" @click="editDialogVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click.native="toEditSolution" size="small">确 定</el-button>
			</div>
		</sy-dialog>

		<!-- 启用课表 -->
		<sy-dialog title="启用课表" :visible.sync="enablementDialog" height="auto" width="350px"> 
			<div slot="body" style="padding:10px 10px 0 10px;">
				<el-form label-width="85px" label-position="right">
					<el-form-item label="启用年级:" prop="why">
						<el-checkbox-group v-model="add.checked">
							<el-checkbox v-for="item in grade" :label="item.id" :key="item.id">{{item.gradeName}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="启用周次：" prop="why">
						<el-input-number v-model="startWeek" :min="1" size="small" :step="1"></el-input-number>
					</el-form-item>
					<el-form-item label="停用周次：" prop="why">
						<el-input-number v-model="endWeek" :min="1" size="small" :step="1"></el-input-number>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer">
				<el-button type="" @click="enablementDialog = false" size="small">取 消</el-button>
				<el-button type="primary" @click.native="EnableSolution" size="small">确 定</el-button>
			</div>
		</sy-dialog>

		<!-- 导入课表 -->
		<sy-dialog title="导入课表" :visible.sync="importVisible" :close-on-click-modal="false" position="middle" height="430px" width="500px" slide="fade"> 
			<div slot="body" style="padding:10px 10px 0 10px;">
				<el-form :rules="rules" label-width="85px" label-position="right" ref="import" :model="importForm">
					<el-form-item label="数据类型：">
						<el-select v-model="importForm.type" placeholder="请选择" style="width: 100%;">
							<el-option label="总课表" value="1"></el-option>
							<el-option label="走课表" value="2"></el-option>
						</el-select>
					</el-form-item>
					<div v-if="importForm.type == '1'">
						<el-form-item label="方案名称：" prop="name">
							<el-input v-model="importForm.name" required placeholder="请输入50个以内字符" :maxlength="50" style="width: 100%;"></el-input>
						</el-form-item>
						<el-form-item label="排课年级：" prop="checked">
							<el-checkbox-group v-model="importForm.checked"  @change="EditCheckbox">
								<el-checkbox style="margin: 0;width: 110px;" v-for="item in editForm.grade" :label="item.id" :key="item.id">{{item.gradeName}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-collapse v-model="activeNames">
							<el-collapse-item name="1">
								<template slot="title">
									<span>上课时间</span>
									<el-button @click="jumpBase" style="float: right;font-size: 18px;margin-top: 4px;margin-right: 10px;" type="text" title="设置" icon="setting"></el-button>
								</template>
								<el-table :data="add.tableData" style="width:100%;">
									<el-table-column align="center" prop="sort" width="60" label="序号"></el-table-column>
										<el-table-column align="center" prop="name" label="名称"></el-table-column>
										<el-table-column align="center" prop="begin" label="开始时间"></el-table-column>
										<el-table-column align="center" prop="end" label="结束时间"></el-table-column>
								</el-table>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div v-else>
						<el-form-item label="选择方案：">
							<el-select v-model="importForm.id" placeholder="请选择" style="width: 100%;">
								<el-option v-for="tab in solutionData" :key="tab.id" :label="tab.planName" :value="tab.id"></el-option>
							</el-select>
						</el-form-item>
					</div>
				</el-form>
			</div>
			<div slot="footer">
				<el-button type="" @click="importVisible = false" size="small">取 消</el-button>
				<el-button type="primary" :loading="toimportLoading" @click="toImportPage('import')" size="small">确 定</el-button>
			</div>
		</sy-dialog>
	</div>
</template>
<script>
	import {
		getGradeList,
		getGradeListByPlan,
		showTableTime,
		saveSolution,
		selectSolutionByUnitId,
		deleteSolutionById,
		disableSolution,
		enableSolution,
		updatePlan,
		importNewPkMethods,
		getCurrentYearTerm,
		checkeName,
		copySolution
		} from './request';
	export default {
    	data(){
		let validateName = (rule, value, callback)=>{
			if (!value) {
				callback(new Error('方案名称不能为空！'));
			} else {
				if (this.oldPlanName == value) {
					callback();
				}else{
					checkeName({
						name: value,
						unitId: this.$store.state.unitId
					}).then((res)=>{
						if(res){
							callback(new Error('方案名称已经存在！'));
						}else{
							callback();
						}
					}).catch(err=>{
						callback(new Error('网络错误！'));
					})
				}
			}
		}
    	return {
			activeNames: ['1'],
			importVisible: false,
			toAddSolutionLoading: false,
			importForm: {
				type: '1',
				name: '',
				checked: [],
				id: ''
			},
  			addDialogVisible:false,
  			enablementDialog:false,
  			editDialogVisible:false,
			activeIndex: '/csdesk/home',
			value: '',
			name: '选课系统',
			// 查询排课信息
			solutionData: [],
				grades:[],
			// 新建方案信息 /base/classTime
			add:{
				name:'',
				checked:[],
				grade:[],
				tableData:[],
				state:'启用课表',
				status:'停用'
			},
			editForm:{
				checked:[],
				grade:[],
				planName:'',
				default:[],
			},
			rules: {
				name: [
					{ required: true, validator: validateName, trigger: 'blur' }
				],
				region: [
					{ required: true, message: '请选择活动区域', trigger: 'change' }
				],
				date1: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				],
				date2: [
					{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				],
				checked: [
					{ type: 'array', required: true, message: '请至少选择一个年级！', trigger: 'change' }
				],
				resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				],
				desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				]
			},
			unitId:'',
			solutionId:'',
			startUsing:'',
			// 计数器
			grade:[],
			startWeek:'',
			endWeek:'',
			currentDate: {
				year: '',
				term: ''
			},
			oldPlanName: '',
			toimportLoading: false
		}
    },
    created(){
    	this._init();
    },
   	methods:{
		// 初始化拿UnitId
		_init() {
			let userMsg = this.$getSess('user');
			if (userMsg && userMsg.data ) {
				if (userMsg.data.unitId) {
					this.unitId = userMsg.data.unitId;
				}
			}
			// 获取方案
			this.selectSolutionByUnitIds();
			// 获取时间
			showTableTime(this.unitId).then((results) =>{
				this.add.tableData = results.data;
			})
			// 获取年级
			getGradeList({unitId:this.unitId}).then((grade)=>{
				this.add.grade = grade.data;
				this.editForm.grade = grade.data;
			})
			this.getYearTerm();// 查询学年学期
		},
		// 获取学年学期
		getYearTerm(){
			getCurrentYearTerm(this.$store.state.unitId).then((res)=>{
				this.currentDate.year = res.year || '';
				this.currentDate.term = res.schoolTerm || '';
			}).catch(err=>{

			})
		},
   		// 获取方案
   		selectSolutionByUnitIds(){
   			// 获取方案
	    	selectSolutionByUnitId(this.unitId).then((results)=>{
	    		if(results && results.code=='ok'){
	    			let solutionData = [];
		    		results.data.forEach(function(item,index){
		    			let grades = [];
		    			let gradeIds = []; 			
		    			if(item.pkGradeAllVMS == null){
		    			}else{
		    				item.pkGradeAllVMS.forEach(function(item,index){
			    				grades.push(item.gradeName);
			    				gradeIds.push(item.gradeId);
			    			})
		    			}
						grades = grades.toString();
						let openGrades = [];
						if(item.openPkGradeVMS){
							item.openPkGradeVMS.forEach((_d,d)=>{
								openGrades.push(_d.gradeName)
							})
						}
		    			solutionData.push({
		    				id:item.id,
		    				planName:item.planName,
		    				startTerm:item.startTerm,
		    				isUp:item.isUp,
		    				startWeek:item.startWeek,
		    				endWeek:item.endWeek,
		    				grades:grades,
		    				gradeIds:gradeIds,
							openGrades: openGrades.join('、'),
							planNo: item.planNo
		    			})
		    		})
					this.solutionData = solutionData;
					this.importForm.id = this.solutionData.length > 0 ? this.solutionData[0].id : '';
		    	}
	    	})
   		},
		// 点击新建方案
		addSolution(t){
			let max = this.$_.result(this.$_.maxBy(this.solutionData, o=>{return o.planNo}),'planNo');
			if(t == 'add'){
				this.oldPlanName = '';
				this.addDialogVisible = true;
				// 重置表单(方案名称,选中年级)
				this.$refs.add.resetFields();
				this.add.name = `${this.currentDate.year}学年${this.currentDate.term == 1 ? '第一学期' : '第二学期'}排课方案${parseInt(max || 0)+1}`
			}else{ // 导入
				this.importVisible = true; 
				this.$refs.import.resetFields();
				this.importForm.name = `${this.currentDate.year}学年${this.currentDate.term == 1 ? '第一学期' : '第二学期'}排课方案${parseInt(max || 0)+1}`
			}
		},
		// 确定新建方案
		toAddSolution(){
			this.$refs.add.validate((valid) => {
				if (valid) {
					let gradeIds = this.add.checked;
					let solutionName = this.add.name;
					this.toAddSolutionLoading = true;
					this.postApi(gradeIds,solutionName,'');
				} else {
					return false;
				}
			});
		},
		// 提交保存 apo
		postApi(gradeIds,solutionName,id){
			saveSolution(gradeIds,solutionName).then((results)=>{
				if(results && results.code =='ok'){
					this.$notify({
						title: '成功',
						message: '保存成功！',
						type: 'success'
					});
					if(id == 'import'){
						this.$router.push({ path: '/pk/pre/import',query: {id: results.data.id} })
					}else{
						this.addDialogVisible = false;
						this.selectSolutionByUnitIds()
					}
				}
				this.toAddSolutionLoading = false;
			}).catch((results) => {
				this.$notify({
					type: '异常',
					message: results.message
				});
				this.toAddSolutionLoading = false;
			});
		},
      	// 编辑
	    handleUpdate(index,row){
			this.editDialogVisible = true;
			this.editForm.name = row.planName;
			this.oldPlanName = row.planName;
			this.solutionId = row.id;
			this.editForm.checked = row.gradeIds;
	    },
	    EditCheckbox(val){
	    	this.editForm.checked = val;
	    },
	    toEditSolution(){
	    	let params = {
	    		gradeIds:this.editForm.checked,
	    		solutionId:this.solutionId,
	    		solutionName:this.editForm.name
	    	}
	    	updatePlan(params).then((data)=>{
	    		if(data && data.code=='ok'){
	    			this.$notify({
              title: '成功',
              message: '修改成功！',
              type: 'success'
          	});
          	this.editDialogVisible = false;
          	this.selectSolutionByUnitIds();          	
	    		}else{
	    			this.$notify({
	    				title:'失败',
	    				message:'修改失败！',
	    				type:'error'
	    			})
	    		}
	    	})
	    },
		// 排课
		handleToPk(index,row){
			this.$router.push({path: '/pk/pre/manager/previewSchedule',query: { id: row.id, year: this.currentDate.year, term: this.currentDate.term}});
			window.sessionStorage.setItem("solutionId",row.id);
			window.sessionStorage.setItem("solutionName",row.planName);
		},
		// 停用课表
		handleDisable(index,row){
			disableSolution(row.id).then((data)=>{
				if(data.code =='ok'){
					this.$notify({
			title: '成功',
			message: '停用成功！',
			type: 'success'
			});
			this.selectSolutionByUnitIds();
				}    			
			})
		},
		// 启用课表
		handleEnable(index,row){
			// 启用代码
			this.enablementDialog = true;
			this.solutionId = row.id;
			this.add.checked = [];
			this.startWeek = row.startWeek;
			this.endWeek = row.endWeek;
			let vm = this;
			vm.grade = [];
			// 获取当前行的年级展示
			row.gradeIds.forEach((item)=>{
				vm.add.grade.forEach((i)=>{
					if(item == i.id){
						vm.grade.push(i);
					}
				})
			})			
		},
			// 确认启用排课
		EnableSolution(){
			let params = {
				gradeIds:this.add.checked,
				solutionId:this.solutionId,
				startWeek:this.startWeek,
				endWeek:this.endWeek
			}
			enableSolution(params).then((data)=>{
				if(data && data.data && data.data.state && data.data.state == "success"){
					this.$notify({
						title: '开启成功',
						message: '开启成功！',
						type: 'success'
					});
                    this.selectSolutionByUnitIds();
                    this.enablementDialog = false;
				} else {
                    this.$notify({
                        title: '开启失败',
                        message: '此方案与其它已开启方案冲突，请调整时间/年级后重新开启！',
                        type: 'warning'
                    });
				}
			})
     	},
     	// 复制方案
     	handleCopy(index,row){
     		copySolution({solutionId:row.id}).then((results)=>{
     			if(results && results.code=='ok'){
     				this.selectSolutionByUnitIds(); 
     			}
     		})
     	},
	    // 删除课表
	    handleDelete(index,row){
	      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(()=>{
	      	deleteSolutionById(row.id).then((results)=>{
		        if (results && results.code === 'ok') {
              this.$notify({
                  title: '成功',
                  message: '删除成功！',
                  type: 'success'
              });
           		this.selectSolutionByUnitIds()
          	}
	      	})
		    })
	    },
		
		// 基础设置上课时间
		jumpBase(){
			window.open('/base/classTime');
		},
		// 跳转导入页面
		toImportPage(formName){
			if(this.importForm.type == '2'){
				this.$setSess('sou-plan-name', this.$_.find(this.solutionData, {id: this.importForm.id}).planName);
				this.$router.push({ path: '/pk/pre/import',query: {id: this.importForm.id, type: this.importForm.type} })
				return
			}
			this.toimportLoading = true;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					importNewPkMethods({
						gradeIds: this.importForm.checked.join(','),
						unitId: this.$store.state.unitId,
						solutionName: this.importForm.name
					}).then((res)=>{
						this.toimportLoading = false;
						this.$setSess('sou-plan-name', this.importForm.name);
						this.$router.push({ path: '/pk/pre/import',query: {id: res,type: this.importForm.type} })
					}).catch(err=>{
						this.toimportLoading = false;
					})
				} else {
					this.toimportLoading = false;
					return false;
				}
			});
		} 
   	}
}
</script>
<style scoped>
	.sy-pk-home-container{
		top:0px;
    	bottom:50px;
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}
	.body-right{
	  	height:100%;
	  	position: absolute;
	    right:0;
	    left:0;
	  	top:0px;
	  	width:100%;
	    overflow: scroll;
	    padding: 0 20px;
	  }
	.cs-scheme-header{
		padding: 15px;
		overflow: hidden;
	}
	.right{
		float: right;
	}
	.cs-scheme-content{
		margin: 5px 15px;
	}
	.cs-scheme-courseTime{
		overflow: hidden;
	}
	.cs-scheme-courseTime ul{
		margin: 0;
		padding: 0;
		float: left;
		border: 1px solid #ccc;
		width: 205px;
		margin:0 5px;
		list-style: none;
	}
	.cs-scheme-courseTime ul>li.cs-title{
		border-bottom: 1px solid #ccc;
	}
	.el-checkbox-group.newLine > label{
		display: block;
		margin-left: 20px;
	}
	.textRight{
		text-align: right;
		padding: 5px 5px 20px 0;
	}
	a{
    	text-decoration: none;
	}
</style>
