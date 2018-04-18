<!--排课时间-->
<template>
  <div class="sy-pk-step-container sy-theme-tableBorder">
    <sy-grad-4 :border="false">
      <div slot="bodyRight" id="courseMutex">
        <!-- 课程互斥 -->
        <div class="options">
          <el-button @click='toAddCourseMutex'>新增</el-button>
        </div>
        <div class="tblData">
          <el-table :data="selectMutedInfo" style="width: 100%" border> 
            <el-table-column prop="gradeName" label="年级" align="center"></el-table-column>
            <el-table-column prop="courseName" label="相关课程" align="center"></el-table-column>
            <el-table-column  label="编辑" align="center">、
              <template scope='scope'>
                <el-button type="text" @click='toUpdCourseMutex(scope.$index,scope.row)'>编辑</el-button>
              </template>
            </el-table-column>
            <el-table-column  label="删除" align="center">
              <template scope="scope">
                <el-button type="text" @click='delCourseMutex(scope.$index,scope.row)'>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </sy-grad-4>
    
     <!-- 新增课堂互斥 -->
   <sy-dialog :title="title" :visible.sync="dialogAddCourseMutexVisible" :close-on-click-modal="false" position="middle" height="auto" width="30%" slide="fade">
      <div slot="body" style="height: auto;padding:2em">
        <div class="mutexHeader">
          <el-form>
            <el-form-item label="temp">
              <span slot="label">年   级：</span>
              <el-input v-model="addCourseMutex.gradeValue" class="selectBtn-in-dialog" style="width:200px;" :disabled="disabled" @focus="addCourseMutexGrade" placeholder='请选择年级'></el-input>
            </el-form-item> 
          </el-form>
        </div>
        <div class="mutexContent">
          <div class="mutexSearch">
            选择课程
          </div>
          <div class="mutexTable">
            <el-input placeholder="请输入课程搜索" icon="search" v-model="addCourseMutex.keyword" > </el-input>
            <el-table ref="multipleTable" border :data="filterCourseData" tooltip-effect="dark" style=" margin:1em auto" @selection-change="handleSelectionChange"> 
              <el-table-column type="selection" width="55" align="center"> </el-table-column>
              <el-table-column prop="courseName" label="课程" align="center"> </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="toSureAddCourseMutex">确定</el-button>
        <el-button @click="dialogAddCourseMutexVisible = false">取消</el-button>
      </span>
    </sy-dialog>
    <!-- 选择年级弹框 -->
    <sy-dialog title="选择年级" :visible.sync="dialogaddClassesVisible" :close-on-click-modal="false" position="middle" height="auto" width="600px" slide="fade">
      <div slot="body">
        <div class="sy-pk-dialog-margin">
          <el-radio-group v-model="addCourseMutex.gradeId" @change="SelectGradeRadio">
            <el-radio v-for="grade in addCourseMutex.grades" :label="grade.gradeId" :key="grade">{{grade.gradeName}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div align="center">
          <el-button @click="dialogaddClassesVisible = false">取 消</el-button>
          <el-button type="primary" @click="toSureClassIds">确 定</el-button>          
        </div>
      </span>
    </sy-dialog>
  </div>
</template>
<script>
  import {selectCourseMutedBySolution,saveMutexInfo,getRelatedGradeAndCourse,deleteCourseMuted,selectCourseMutedById,updateMutexInfo} from './request';
  export default{
    data(){
      return {
        dialogAddCourseMutexVisible:false,
        dialogaddClassesVisible:false,
        dialogEditCourseMutexVisible:false,
        selectMutedInfo:[],
        addCourseMutex:{
          grades:[],
          gradeValue:'',  
          gradeId:'',     
          keyword:'',     
          courses:[],     
          courseIds:[],   
        },
        editCourseMutex:{
          gradeValue:'',      
          keyword:'',     
          courses:[],     
          courseIds:[],
        },
        mutexId:'',
        disabled:false,
        defaultChecked:[],
      }
    },
    created(){
      this._init();
      this._getSession()
      this.selectCourseMuted();
      // 获取年级课程数据
      this.toGetGradeCourseData()
    },
    computed:{
      // 过滤课程
      filterCourseData(){
        if(!this.addCourseMutex.keyword){
          return this.addCourseMutex.courses;
        }else{
          let key = this.addCourseMutex.keyword;
          let array = [];
          array = this.addCourseMutex.courses.filter(function(item){
            if(item.courseName.indexOf(key) !== -1){
              return item;
            }
          })
          return array;
        }        
      }
    },
    methods:{
      _init() {
        let userMsg = this.$getSess('user');
        if (userMsg && userMsg.data ) {
          if (userMsg.data.unitId) {
            this.unitId = userMsg.data.unitId;
          }
        }
      },
      _getSession() {
        let solution = this.$getSess('solutionId');
        if(solution){
          this.solutionId = solution;
        }
      },
      toGetGradeCourseData(){
        getRelatedGradeAndCourse({solutionId:this.solutionId}).then((results)=>{
          if(results && results.code =='ok'){
            this.addCourseMutex.grades = results.data;
          }
        })
      },
      // 课程互斥规则查询
      selectCourseMuted(){
        // 通过方案获取互斥课程
        selectCourseMutedBySolution({solutionId:this.solutionId}).then((results)=>{
          if(results && results.code =='ok' && results.data.length != 0){
            this.selectMutedInfo = []
            results.data.forEach((item,index)=>{
              let arr = [];
              let cou = [];
              // 表格展示名称
              item.mutexCourseVMS.forEach((itemx)=>{
                arr.push(itemx.name);
                cou.push({
                  courseId:itemx.courseId,
                  courseName:itemx.name
                })
              })
              // 表格数据
              this.selectMutedInfo.push({
                id:item.id,
                gradeId:item.gradeId,
                gradeName:item.gradeName,
                courseIds:cou,
                courseName:arr +''
              })
            })
          }
        })
      },
      //点击新增按钮
      toAddCourseMutex(){
        // 清空表单年级数据
        this.addCourseMutex.gradeValue = '';
        this.addCourseMutex.gradeId = '';
        this.dialogAddCourseMutexVisible= true;
        this.disabled = false;
        this.addCourseMutex.keyword = '';
        this.title = '新增';
      },
      // 聚焦选择年级
      addCourseMutexGrade(){
        this.dialogaddClassesVisible = true;
      },
      // 年级单选
      SelectGradeRadio(value){
        // 年级id
        this.addCourseMutex.gradeId = '';
        this.addCourseMutex.gradeId = value;
        this.getCurrentCourse(value);
      },
      // 选择单个年级
      handleSelectionChange(val) {
        let arr = [];
        val.forEach((item)=>{
          arr.push(item.courseId);
        })
        this.addCourseMutex.courseIds = arr;
      },
      // 选择年级确定
      toSureClassIds(){
        this.dialogaddClassesVisible = false;
      },
      // 新增互斥课的确定
      toSureAddCourseMutex(){
        // 获取参数进行保存
        let params = {};
        params = {
          solutionId:this.solutionId,
          gradeId:this.addCourseMutex.gradeId,
          courseIds:this.addCourseMutex.courseIds
        }
        saveMutexInfo(params).then((results)=>{
          if(results && results.code =='ok'){
            this.$notify({title:'成功', type: 'success', message: '保存成功!'});
            this.selectCourseMuted();
          }          
        })
        this.dialogAddCourseMutexVisible = false;
      },
      // 获取当前年级下的课程
      getCurrentCourse(value){
        let courses = [];
        let vm = this;
        if(vm.addCourseMutex.grades.length > 0){
          vm.addCourseMutex.grades.forEach((item,index)=>{
            // 获取年级以及年级下的课程
            if(item.gradeId == value){
              vm.addCourseMutex.gradeValue = item.gradeName;
              courses = item.pkCourseVMS;
            }
          })
        }
        let cou = [];
        courses.forEach((item)=>{
          cou.push({
            courseId:item.courseId,
            courseName:item.courseName
          })
        })
        this.addCourseMutex.courses = cou;
      },
      //点击编辑
      toUpdCourseMutex(index,rows){
        this.title = '修改';
        this.disabled = true;
        this.addCourseMutex.keyword = "";
        // 设置编辑默认选中
        this.addCourseMutex.gradeId = rows.gradeId;
        this.addCourseMutex.gradeValue = rows.gradeId;
        // 根据当前年级id获取当前课程
        this.getCurrentCourse(rows.gradeId);
        this.dialogAddCourseMutexVisible = true;
        this.mutexId = rows.id;
        let vm = this;
        // 设置默认选中
        setTimeout(function(){
          rows.courseIds.forEach((row) =>{
            let i = '';
            vm.filterCourseData.forEach((cour,index)=>{
              if(row.courseId == cour.courseId){
                i = index;
              }
            })
            // 设置表格默认选中
            vm.$refs.multipleTable.toggleRowSelection(vm.filterCourseData[i],true);
          });
        },1);
      },
      //新增、修改互斥课的确定
      toSureAddCourseMutex(){
        //获取参数进行保存
        let params = {};
        params = {
          id:this.mutexId,
          solutionId:this.solutionId,
          gradeId:this.addCourseMutex.gradeId,
          courseIds:this.addCourseMutex.courseIds
        }
        //判断是否选择了两门课程
        if(this.addCourseMutex.courseIds.length <= 1){
          this.$notify({
            title:'警告',
            type:'info',
            message:'请选择至少两门课程进行互斥'
          })
        }else if(this.addCourseMutex.courseIds.length > 1){
          if(this.title == '新增'){
            saveMutexInfo(params).then((results)=>{
              if(results && results.code =='ok'){
                this.$notify({
                  title:'成功',
                  type: 'success',
                  message: '保存成功!'
                });
                this.selectCourseMuted();
                this.dialogAddCourseMutexVisible= false;
              }          
            })
          }else if(this.title == '修改'){
            updateMutexInfo(params).then((results)=>{
              if(results && results.code =='ok'){
                this.$notify({title:'成功', type: 'success', message: '修改成功!'});
                this.selectCourseMuted();
                this.dialogAddCourseMutexVisible = false;
              }
            })
          }
        }
      },
      // 删除互斥课程
      delCourseMutex(index,row){
        this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
          confirmButtonText: '确定', 
          cancelButtonText: '取消', 
          type: 'warning'
        }).then(() => {
          deleteCourseMuted({id:row.id}).then((results)=>{
            if(results && results.code =='ok'){
              this.$notify({title:'成功', type: 'success', message: '删除成功!'});
              this.selectCourseMuted();
            }else{
              this.$notify({title:'失败', type: 'error', message: results.message});
            }
          })          
        }).catch((error) => {
          this.$notify({title:'取消', type: 'info', message: '已取消删除'});
        });
      },
    }
  }
</script>
<style scoped>
  .app-container-box {
    top:185px;
    bottom:50px;
    overflow-y: scroll;
  }
  #courseMutex .options{
    text-align: right;
    line-height: 46px;
    height: 46px;
    padding: 0 14px;
  }
  #courseMutex .tblData{
    padding: 0 14px;
    position: absolute;
    top: 46px;
    bottom: 0;
    width: 100%;
  }
  #courseMutex i {
    cursor: pointer;
    margin: 0 5px;
  }
  .gradeChecks {
    height: 2em;
    border: 1px solid #ccc;
    line-height: 2em;
    margin: 0 0 1em 0;
  }
  .mutexContent{
    border:1px solid RGB(51,153,204);
  }
  .mutexSearch{
    text-align: center;
    height: 40px;
    line-height: 40px;
    color:RGB(51,153,204);
    border:1px solid RGB(51,153,204);
  }
  .mutexTable{
    border:1px solid RGB(51,153,204);
    padding:5px;
  }
  .sy-pk-dialog-margin{
    margin:20px 0 20px 20px;
  }  
</style>