<!--排课时间-->
<template>
  <div class="sy-pk-step-container sy-theme-tableBorder">
    <sy-grad-4 :border="false">
      <div slot="bodyRight" id="pkTime">
        <div class="options">
          <el-button  @click='toAddTag'>+</el-button>
          <draggable v-on:dblclick.native='doubleClickToEdit' class="list-group labels" element="ul" v-model="arr" :options="dragOptions" >
            <li v-for="item in label.label" :data-labelId='item.id' :data-id='item.id' :key="item.id" :style='btnType(5)'  @click='checkLabel(item.id)'
            >{{item.labelName}}</li>
          </draggable>
        </div>
        <div class="settingContent">
          <!-- 左侧班级设置开始 -->
          <div class="contentLeft">
            <ul class="filter">
              <li>
                <el-select v-model="optionsValue" placeholder="请选择" @change="toSelectOption">
                  <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code"></el-option>
                </el-select>
              </li>
              <li><el-input placeholder="请输入关键字" icon="search" v-model="keywords"></el-input></li> 
              <li><el-button @click='toAddTeacherGroup' v-if="optionsValue=='teacher'">新增教师组</el-button></li>
            </ul>
            <div class="dyContent">
              <!-- 班级 -->
              <el-tree style="margin:10px;" 
                :data="clazzOption" 
                node-key="id" 
                ref="clazzRef"
                highlight-current
                :props="defaultProps"  
                v-show="optionsValue=='clazz'" 
                @current-change='checkClazz'
                :filter-node-method="filterNode"
                ></el-tree>
              <!-- 教师 -->
              <el-tree style="margin:10px;" 
                :data="teacherOption" 
                highlight-current
                ref="teacherRef"
                node-key="id" 
                :props="defaultProps"  
                @current-change='checkTeacher'
                v-show="optionsValue=='teacher'"
                :filter-node-method="filterNode"
                ></el-tree>
              <!-- 课程 -->
              <el-tree style="margin:10px;" 
                ref="courseRef"
                :data="courseOption" 
                node-key="id" 
                :props="defaultProps" 
                highlight-current
                @current-change='checkCourse' 
                v-show="optionsValue=='course'"
                :filter-node-method="filterNode"
                ></el-tree>
              <!-- 场地 -->
              <el-tree style="margin:10px;"
                ref="placeRef" 
                :data="placeOption" 
                node-key="id" 
                highlight-current
                :props="defaultProps"  
                @current-change='checkPlace' 
                v-show="optionsValue=='place'"
                :filter-node-method="filterNode"
                ></el-tree>
            </div>
          </div>
          <!-- 左侧班级设置结束 -->
          <!-- 右侧课程设置开始 -->
          <div class="contentRight">
            <div>
              <span>类型：</span>
              <draggable 
                class="list-group types" 
                element="ul" 
                v-model="arr" 
                :options="dragOptions" > 
                <li v-for="item in TimeType" :style='btnType(item.code)' 
                  :data-code='item.code'
                  :key='item.code' v-on:click='checkType($event,item.code)'> {{item.value}}</li>
              </draggable>

              <el-button type='success' :plain="true" @click='saveDetail'>确定</el-button>
            </div>
            <div class="weeks">
              <table class="weeksTbl">
                <!-- 表头 -->
                <thead>
                  <tr>
                    <th>节次/星期</th>
                    <th style="width:11%">星期一</th>
                    <th style="width:11%">星期二</th>
                    <th style="width:11%">星期三</th>
                    <th style="width:11%">星期四</th>
                    <th style="width:11%">星期五</th>
                    <th style="width:11%">星期六</th>
                    <th style="width:11%">星期日</th>
                  </tr>
                </thead>
                <!-- 表体 -->
                <!-- 
                <tbody>
                  <tr v-for='festival in festivals'>
                    <td>{{festival.name}}</td>
                    <td v-for='w in festival.weekRModels' 
                      :style='getPKStatusClass(w.pkStatus)'
                      @click.left='checkDay(w.festivalId,w.weekId)'
                      @click.right='unCheckDay(w.festivalId,w.weekId)'>
                      {{w.pkStatus?w.pkStatus.labelName:''}}
                    </td>
                  </tr>
                </tbody> 
                -->
                  <tbody>
                    <draggable 
                      v-for='festival in festivals'
                      :key='festival'
                      element="tr" 
                      v-model="arr" 
                      :move="onMove"
                      :options="dragOptions" > 
                      <td class="festivalTd">{{festival.name}}</td>
                      <td v-for='w in festival.weekRModels' 
                        :key='w.id'
                        :data-festivalId='w.festivalId'
                        :data-weekId='w.weekId'
                        :style='getPKStatusClass(w.pkStatus)'
                        @click.left='checkDay(w.festivalId,w.weekId)'>
                        {{w.pkStatus?w.pkStatus.labelName:''}} 
                        <i class="fa fa-ban" v-show='w.pkStatus=="disable"'> </i>
                      </td>
                    </draggable>
                  </tbody>
              </table>
            </div>
          </div>
          <!-- 右侧课程设置结束 -->
        </div>
      </div>
    </sy-grad-4>
    <!-- 添加标签 -->
    <sy-dialog title="添加标签" :visible.sync="dialogAddTagVisible" :close-on-click-modal="false" position="middle" height="auto" width="30%" slide="fade">
      <div slot="body" style="height: auto">
        <el-form label-width="120px" style="height:auto; margin:10px 10px 0 0">
          <el-row>
            <el-col :span="15">
              <el-form-item label="标签名称：" prop="name">
                <el-input  v-model="label.tagName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="addTagNameContinue">保存并继续</el-button>
        <el-button type="primary" @click="addTagName">保存</el-button>
        <el-button @click="dialogAddTagVisible = false">取消</el-button>
      </span>
    </sy-dialog>
    <!-- 修改标签 -->
    <sy-dialog title="修改标签" :visible.sync="dialogEditTagVisible" :close-on-click-modal="false" position="middle" height="auto" width="30%" slide="fade">
      <div slot="body" style="height: auto">
        <el-form label-width="120px" style="height:auto; margin:10px 10px 0 0">
          <el-row>
            <el-col :span="15">
              <el-form-item label="标签名称：" prop="name">
                <el-input v-model="label.eidtTagName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer text-center">
        <el-button @click="toDeleteTagName">删除</el-button>
        <el-button @click="toEditTagName">更新</el-button>
        <el-button @click="dialogEditTagVisible = false">取消</el-button>
      </span>
    </sy-dialog>
    <!-- 新增教师组 -->
    <sy-dialog title="新增教师组" :visible.sync="dialogAddTeacherGroupFormVisible" :close-on-click-modal="false" position="middle" height="auto" width="35%" slide="fade">
      <div slot="body">
        <div class="teacherGroup">
          <div class="teacherGroup-body">
            <el-form style="margin-top:10px;border-bottom:2px solid RGB(51,153,204);">
              <el-form-item>
                <span>组    名：</span>
                <el-input v-model="clazzGroupName" class="selectBtn-in-dialog" style="width:200px;" placeholder='请输入'></el-input>
              </el-form-item> 
            </el-form>
          </div>
          
          <div class="sy-search">
            <el-input style="width:300px;margin:10px;" v-model='keyWordToSearchTeacher' placeholder="请选择关键字" icon="search"></el-input>
          </div>
          <div class="sy-teacher-tree">
            <el-tree
              show-checkbox
              :data="teacherOption" 
              highlight-current
              ref="teacherGroupRef"
              node-key="id" 
              :props="defaultProps"
              v-show="optionsValue=='teacher'"
              :filter-node-method="filterNode"
              >
            </el-tree>
          </div>  
                
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddTeacherGroupFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacherGroup">确 定</el-button>
      </span>
    </sy-dialog>
  </div>
</template>
<script>
  import {
    toGetLabelName,labelTimeExist,addLabelNotExist,toGetPktimeSelect,getGradeListBysolutionId,getClassListByGradeId,getTeacherTree,getCourseTree,getPlaceType,getPlace,toGetPktimeType,toEditLabel,toDeleteLabel,selectFestivlaByUnit,saveTeacherGroup
    } from './request.js'
    import dyTbl from './dyTblMethods.js';
    import draggable from 'vuedraggable';
  export default{
    components: {draggable},
    data(){
      return {
        dialogAddTeacherGroupFormVisible:false,
        dialogAddTagVisible:false,
        dialogEditTagVisible:false,
        solutionId:'',
        clazzGroupName:'',
        label:{
          tagName:'',
          label:[],
          eidtTagName:''
        },
        options: [],
        optionsValue:'clazz',
        clazzOption:[],
        teacherOption:[],
        courseOption:[],
        placeOption:[],
        keywords:'',
        defaultProps: {
          id:'id',
          label: 'label',
          children: 'children'          
        },
        TimeType:[],
        tagId:'',
        //排课事件设置的模型对象
        pkStatus:{
          solutionId:'',
          type:'',
          weekId:'',
          festivalId:'',
          labelId:'',
          //班级年级排课
          gradeId:'',
          classId:'',
          //教师排课
          courseId:'',
          timeGroupId:'',
          teacherId:'',
          //科目排课
          courseId:'',
          //场地排课
          placeTypeId:'',
          placeId:''
        } ,
        colors :['#FF4949','#FF4949','#F7BA2A','#20A0FF','#13CE66'],
        festivals:[] ,//节次信息
        //拖拽功能
        editable:true , //默认允许拖拽
        arr:[],
        keyword:'',
        keyWordToSearchTeacher:''
      }
    },
    watch: {
      keywords(val) {
        if(this.optionsValue =='clazz'){
          this.$refs.clazzRef.filter(val);
        }else if(this.optionsValue =='teacher'){
          this.$refs.teacherRef.filter(val);
        }else if(this.optionsValue =='course'){
          this.$refs.courseRef.filter(val);
        }else if(this.optionsValue =='place'){
          this.$refs.placeRef.filter(val);
        }
      },
      keyWordToSearchTeacher(val){
        this.$refs.teacherGroupRef.filter(val);
      }
    },
    computed:{
      dragOptions () {
        return  {
          animation: 10,
          group: {pull:'clone'}, //随意
          disabled: !this.editable, //默认可以使用拖拽功能
          ghostClass: 'ghost'  //移动位置的样式
        };
      }
    },
    created(){
      this._init();
      this.solutionId = window.sessionStorage.getItem("solutionId");
      this.pkStatus.solutionId = this.solutionId;
      this.toSelectOption();
      // 获取排课时间规则标签
      this.fun();
      //加载节次数据
      var vm = this;
      selectFestivlaByUnit({unitId:this.unitId}).then((result)=>{
        this.festivals = result.data;
        this.festivals.forEach(function(item){
          var diff = 7 - item.weekRModels.length;
          if(diff > 0){
            for(var i=0;i<diff;i++){
              item.weekRModels.push({});
            }
          }
        });
      })
    },
    mounted(){
      //为weeks 下的动态表格绑定拖拽事件
      this._initWeeksTbl();
    },
    methods:{
      //树形结构过滤节点 
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      _initWeeksTbl(){
        var vm = this;
        var weeksTbl = document.getElementsByClassName('weeksTbl')[0];
        //解决在火狐浏览器中使用拖拽功能的时候弹出新的选项卡问题
        var container = document.getElementsByClassName('sy-pk-step-container')[0];
        var listGroup = document.getElementsByClassName('types')[0];
        var labels = document.getElementsByClassName('labels')[0];

        container.ondrop = function(event){
          var flag = event.dataTransfer.getData("flag");
          if(flag && flag == 'del'){
            //删除
            vm.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
              confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
            }).then(() => {
              //确认删除
              vm.delDetail();
            }).catch(() => {
              vm.$message({type: 'info', message: '已取消删除'});
            });
          }
          //阻止浏览器默认弹出选项卡的行为
          event.stopPropagation();
          event.preventDefault();
        }
        labels.ondragstart = function(event){
          var labelId = event.target.getAttribute('data-labelId');
          event.dataTransfer.setData("labelId",labelId);
        };
        //使得的weeksTbl可以进行拖拽，在拖拽的时候执行如下操作
        listGroup.ondragstart = function(event){
          var typeCode = event.target.getAttribute('data-code');
          event.dataTransfer.setData("typeCode",typeCode);
        };
        weeksTbl.ondragstart = function(event){
          if(event.target.nodeName == 'TD'){
            var weekId = event.target.getAttribute('data-weekId');
            var festivalId = event.target.getAttribute('data-festivalid');
            if(weekId && festivalId){
              vm.pkStatus.weekId = weekId;
              vm.pkStatus.festivalId = festivalId;
            }
            event.dataTransfer.setData("flag","del");
          }
        };
        //处理添加标签功能
        weeksTbl.ondrop = function(event){
          var flag = event.dataTransfer.getData("flag");
          //删除
          if(flag && flag == 'del'){
            return false;
          } else {
            var typeCode = event.dataTransfer.getData("typeCode");
            var labelId = event.dataTransfer.getData('labelId');
            var weekId = event.target.getAttribute('data-weekId');
            var festivalId = event.target.getAttribute('data-festivalid');
            
            vm.pkStatus.weekId = weekId;
            vm.pkStatus.festivalId = festivalId;
            vm.pkStatus.type = typeCode;
            vm.pkStatus.labelId = labelId;
            vm.saveDetail();
          }
        };
      },
      //多态表格相关所有的API
      ...dyTbl,
      //初始化
      _init() {
        let userMsg = this.$getSess('user');
        if (userMsg && userMsg.data ) {
          if (userMsg.data.unitId) {
              this.unitId = userMsg.data.unitId;
          }
        }
      },
      fun(){
        let params = {
          solutionId:this.solutionId
        }
        // 获取标签
        toGetLabelName(params).then((results)=>{
          this.label.label = results.data;
        })
        // 获取下拉
        toGetPktimeSelect().then((results)=>{
          this.options = results.data
        })
        // 获取右侧类型
        toGetPktimeType().then((results)=>{
          if(results && results.code =='ok'){
            this.TimeType = results.data
          }
        })
      },
      // 点击+号
      toAddTag(){
        this.dialogAddTagVisible = true;
      },
      // 点击保存
      addTagName(){
        // 查看标签是否存在，如果不存在就增加，如果存在了就取消增加
        let param = {
          solutionId:this.solutionId,
          labelName:this.label.tagName
        }
        labelTimeExist(param).then((result)=>{
          if(result && result.code =='ok'){
            if(result.data == true){
              addLabelNotExist(param).then((results)=>{
                if(results && results.code =='ok'){
                  this.$notify({title: '成功', message: '添加成功!', type: 'success'});
                  this.dialogAddTagVisible = false;
                  this.label.tagName = '';
                  this.fun();
                }
              })
            }else if(result.data ==false){
              this.$notify({title: '警告', message: '该标签已经存在，请重新输入标签名', type: 'exist'});
            }
          }
        })
      },
      // 点击保存并继续
      addTagNameContinue(){
        let param = {
          solutionId:this.solutionId,
          labelName:this.label.tagName
        }
        labelTimeExist(param).then((result)=>{
          if(result && result.code =='ok'){
            if(result.data == true){
              addLabelNotExist(param).then((results)=>{
                if(results && results.code =='ok'){
                  this.$notify({title: '成功', message: '添加成功!', type: 'success'});
                  this.label.tagName = ''
                  this.fun();
                }
              })
            }else if(result.data ==false){
              this.$notify({
                title: '警告',
                message: '该标签已经存在，请重新输入标签名',
                type: 'exist'
              });
            }
          }
        })
      },
      // 双击标签修改
      doubleClickToEdit(event){
        //显示模态框
        this.dialogEditTagVisible = true;
        //设置标签名
        this.label.eidtTagName = $(event.target).text();
        //标签标签ID，有可能点击的buttn,也有可能点击的是button中的span元素
        if(event.target.tagName === 'LI'){
          this.tagId = $(event.target).attr('data-id'); 
        } else {
          this.tagId = $(event.target).parent('li').attr('data-id');
        }
      },
      // 修改(点击更新)
      toEditTagName(){
        let params = {
          labelId:this.tagId,
          labelName:this.label.eidtTagName
        }
        toEditLabel(params).then((result)=>{
          if(result && result.code =='ok'){
            this.$notify({title: '成功', message: '修改成功!', type: 'success'});
            this.fun();
            this.dialogEditTagVisible = false;
          }else{
            this.$notify({title:'失败', message:result.fieldErrors.message, type:'error'})
          }
        })
      },
      // 删除标签名称
      toDeleteTagName(){
        let params = {
          labelId:this.tagId
        }
        toDeleteLabel(params).then((result)=>{
          if(result && result.code =='ok'){
            this.$notify({title: '成功', message: '删除成功!', type: 'success'});
            this.fun();
            this.dialogEditTagVisible = false;
          }else{
            this.$notify({title:'失败', message:result.fieldErrors.message, type:'error'})
          }
        })
      },
      // 选择下拉菜单,根据下拉菜单内容变化
      toSelectOption(){
        if(this.optionsValue =='clazz'){
          // 获取班级数据
          getGradeListBysolutionId({solutionId:this.solutionId}).then((result)=>{
            if(result && result.code=='ok'){
              let arr = [];
              result.data.forEach((item,index)=>{
                let objGrade = {};
                objGrade.id = item.gradeId;
                objGrade.label = item.gradeName;
                objGrade.children = [];
                getClassListByGradeId({gradeId:item.gradeId}).then((res)=>{
                  res.data.forEach((items)=>{
                    let objClass = {};
                    objClass.id = items.id;
                    objClass.label = items.name;
                    objClass.gradeId = item.gradeId;
                    objGrade.children.push(objClass)
                  })
                });
                arr.push(objGrade);
              });
              this.clazzOption = arr;
              }
            });
        }else if(this.optionsValue =='teacher'){
          let params = {
            solutionId:this.solutionId
          }
          // 获取教师数据
          getTeacherTree(params).then((results)=>{
            if(results && results.code=='ok'){
              let arr = [];
              results.data.forEach((item,index)=>{
                let children = [];
                item.teacherVMS.forEach((itemx,indexx)=>{
                  children.push({
                    id:itemx.teacherId,
                    label:itemx.teacherName,
                    courseId:item.courseId,
                    timeGroupId:item.timeGroupId
                  })
                })
                if(item.timeGroupId == null){
                  arr.push({
                    id:item.courseId,
                    label:item.courseName,
                    courseId:item.courseId,
                    children:children
                  })
                }
                if(item.courseId == null){
                  arr.push({
                    id:item.timeGroupId,
                    label:item.timeGroupName,
                    courseId:item.courseId,
                    children:children
                  })
                }
                
              })
              this.teacherOption = arr;
            }
          })
        }else if(this.optionsValue =='course'){
          getCourseTree({solutionId:this.solutionId}).then((results)=>{
            if(results && results.code =='ok'){
              let arr = [];
              // 遍历最外层数据
              results.data.forEach((course)=>{
                let gradeChildren=[];
                course.timeCourseGradeTreeVMS.forEach((grade)=>{
                  let c = [];
                  grade.timeCourseGradeClassTreeVMS.forEach((clazz)=>{
                    c.push({
                      gradeClassCourseId:clazz.id,
                      courseId:clazz.courseId,
                      label:clazz.name
                    })
                  })
                  gradeChildren.push({
                    label:grade.name,
                    courseId:grade.courseId,
                    children:c
                  })
                })
                arr.push({
                  courseId:course.courseId,
                  label:course.courseName,
                  children:gradeChildren
                })
              })
              this.courseOption = arr;
            }
          })
        }else if(this.optionsValue =='place'){
          let arr = [];
          getPlaceType(this.unitId).then((results)=>{
            results.data.forEach((item,index)=>{
              let params = {
                unitId:this.unitId,
                placeTypeId:item.id
              }
              getPlace(params).then((place)=>{
                let pl = [];
                place.data.list.forEach((p)=>{
                  pl.push({
                    id:p.id,
                    placeTypeId:item.id,
                    label:p.name
                  })
                })
                arr.push({
                  placeTypeId:item.id,
                  label:item.name,
                  children:pl
                })
              })
            })            
          })
          this.placeOption = arr;
        }
      },
      toAddTeacherGroup(){
        this.dialogAddTeacherGroupFormVisible = true;
      },
      // 新增教师组
      addTeacherGroup(){
        let checkedT = this.$refs.teacherGroupRef.getCheckedNodes();
        let teacherIds = [];
        checkedT.forEach((i)=>{
          if(!i.children){
            teacherIds.push(i.id);
          }
        })
        let params = {
          solutionId:this.solutionId,
          teacherIds:teacherIds,
          timeGroupName:this.clazzGroupName
        }
        let vm = this;
        saveTeacherGroup(params).then((data)=>{
          if(data && data.code=='ok' && data.data =='success'){
            this.$notify({title: '成功', message: '添加教师组成功!', type: 'success'});
            this.toSelectOption();
            this.dialogAddTeacherGroupFormVisible = false;
          }
        })
      }
    }
  }
</script>
<style scoped>
  .app-container-box {
    top:185px;
    bottom:50px;
    overflow-y: scroll;
  }
  #pkTime {
    padding: 0 14px;
  }
  #pkTime .options {
    height: 46px;
    line-height: 46px;
  }
  #pkTime .settingContent > div {
    position: absolute;
    top: 50px;
    bottom: 10px;
    padding: 10px;
  }
  #pkTime .settingContent .contentLeft{
    width: 35%;
     border:1px solid #ededed;
  }
  #pkTime .settingContent .contentRight{
    top: 10px;
    left: 38%;
    width: 60%;
  }
  #pkTime .contentLeft .filter:after{
    content: "";
    display: block;
    clear: both;
  }
  #pkTime .contentLeft .filter > li{
    float: left;
    margin-right: 10px;
  }
  #pkTime .contentLeft .filter > li:nth-child(1){
    width: 6em;
  }
  #pkTime .contentLeft .filter > li:nth-child(2){
    width: 12em;
  }
  #pkTime .contentRight .weeks > table{
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  #pkTime .contentRight .weeks th,#pkTime .contentRight .weeks td{
    border: 1px solid #ededed;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }
  #pkTime .contentRight .weeks th{
    height: 34px;
    line-height: 34px;
    background-color: #ededed;
  }
  .text-center {
    text-align: center;
    width: 100%;
    display: block;
  }
  .weeks td{
    cursor: move;
    color: #FFF;
  }
  .weeks td.festivalTd{
    color: #333;
  }
  .ghost {
    opacity: .2;
    background: #C8EBFB;
  }
  .list-group {
    display: inline-block;
  }
  .list-group li {
    background: rgb(255, 73, 73);
    border-color: #ff6d6d;
    color: #fff;
    padding: 7px 9px;
    font-size: 12px;
    border-radius: 4px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: move;
    box-sizing: border-box;
    margin: 0 5px;
  }
  .addteacher{
    border:2px solid red;
    overflow: scroll;
    height:200px;
    margin:10px 20px;
  }
  .teacherGroup{
    height:500px;
    overflow-y: scroll;
  }
  .teacherGroup-body{
    text-align:center;
  }
  .sy-search{
    text-align: center;
  }
  .sy-teacher-tree{
    margin:10px;
  }
</style>





