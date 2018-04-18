<template>
    <div class="sy-app-container">
        <sy-grad-4>
            <div slot="headerRight" style="padding: 4px 0 0 0;">
                <el-select v-model="parmasList.yearValue" placeholder="请选择学年" style="width: 120px;" @change="handleChangeYear">
                    <el-option
                        v-for="item in yearsOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="parmasList.termValue" placeholder="请选择学期" style="width: 120px;margin: 0 10px;" @change="handleChangeTerm">
                    <el-option
                        v-for="item in termOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="parmasList.typeValue" placeholder="请选择类型" style="width: 120px;" @change="handleChangeType">
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="parmasList.keywords" placeholder="请输入关键字搜索" style="width: 120px;margin: 0 10px;"></el-input>
                <el-button @click="getList">搜索</el-button>
                <el-button style="float: right;" @click="$router.push({path:'/pk/kb/add', query: {year: parmasList.yearValue, term: parmasList.termValue}})">调课申请</el-button>
            </div>
            <div slot="bodyRight" style="width:100%;height:100%;padding: 10px;" v-loading="pageloading"
                element-loading-text="拼命加载中...">
                <el-table ref="multipleTable" :data="tableData" height="100%" border tooltip-effect="dark" style="width: 100%;height: 100%;" @selection-change="handleSelectionChange">
                    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                    <!-- <el-table-column label="日期" width="120">
                        <template scope="scope">{{ scope.row.date }}</template>
                    </el-table-column> -->
                    <el-table-column prop="applyTime" label="申请时间" show-overflow-tooltip align="center" width="120">
                        <template scope="scope">{{ scope.row.applyTime | moment('MM-DD HH:mm') }}</template>
                    </el-table-column>
                    <el-table-column prop="adjustType" label="调课类型" show-overflow-tooltip align="center" width="">
                        <template scope="scope">{{ scope.row.adjustType == 1 ? '调课' : '代课' }}</template>
                    </el-table-column>
                    <el-table-column prop="applyReason" label="申请原因" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="className" label="班级" show-overflow-tooltip align="center" width="120">
                        <template scope="scope">{{ scope.row.classShortName || scope.row.className }}</template>
                    </el-table-column>
                    <el-table-column prop="applyTeacherName" label="申请老师" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="applyCourseName" label="课程" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="applyDay" label="日期" show-overflow-tooltip align="center" width="">
                        <template scope="scope">{{ scope.row.applyDay | moment('MM-DD') }}</template>
                    </el-table-column>
                    <el-table-column prop="applyWeekName" label="星期" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="applyFestivalName" label="节次" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="adjustableTeacherName" label="被调老师" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="adjustableCourseName" label="被调课程" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="adjustableDay" label="被调日期" show-overflow-tooltip align="center" width="">
                        <template scope="scope">
                            <span v-if="scope.row.adjustableDay">{{ scope.row.adjustableDay | moment('MM-DD') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="adjustableWeekName" label="被调星期" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="adjustableFestivalName" label="被调节次" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="remarks" label="备注" show-overflow-tooltip align="center" width=""></el-table-column>
                    <el-table-column prop="state" fixed="right" label="状态" show-overflow-tooltip align="center" width="">
                        <template scope="scope">
                            <el-tag type="warning" v-if="scope.row.state == 0">待审批</el-tag>
                            <el-tag type="success" v-if="scope.row.state == 1">已通过</el-tag>
                            <el-tag type="danger" v-if="scope.row.state == 2">未通过</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" align="center" width="120">
                        <template scope="scope">
                            <el-button type="text" @click="handleEditer(scope.row, 'edt')">修改</el-button>
                            <el-button v-if="scope.row.state != 1"  type="text" @click="handleEditer(scope.row, 'pass')">同意</el-button>
                            <el-button v-if="scope.row.state != 1" type="text" @click="handleEditer(scope.row, 'back')">拒绝</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" fixed="right" label="打印" show-overflow-tooltip align="center" width="">
                        <template scope="scope">
                            <el-button type="text" v-if="scope.row.state == 1" @click="handlePrint(scope.row)">打印</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </sy-grad-4>
        <sy-dialog title="调课到" :visible.sync="dialogVisible" height="296px" width="300px">
            <div slot="body" class="sy-pk-tkdk" style="padding: 10px;" v-loading="dialogloading"
                element-loading-text="拼命加载中...">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="被调教师：">
                        <el-select v-model="form.teacherId1" clearable placeholder="请选择教师" style="width: 100%;" @change="handleCourseChange">
                            <el-option
                                v-for="item in teacherOptions1"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="调课学科：">
                        <el-select v-model="form.course1" placeholder="请选择学科" style="width: 100%;" @change="handleCourseChanges">
                            <el-option
                                v-for="item in courseOptions1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="调课日期：">
                        <el-date-picker
                            v-model="form.date1"
                            type="date"
                            :clearable="false"
                            :editable="false"
                            placeholder="选择日期"
                            style="width: 100%;"
                            :picker-options="pickerOptions1">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="调课星期：">
                        <el-select v-model="form.weekId1" placeholder="请选择星期" style="width: 100%;">
                            <el-option
                                v-for="item in weekOptions1"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="调课节次：">
                        <el-select v-model="form.festivalId1" placeholder="请选择节次" style="width: 100%;">
                            <el-option
                                v-for="item in festivalOptions1"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="right">
                <el-button type="primary" :loading="savebtnLoading" @click="handleSaveTk">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </sy-dialog>
        <sy-dialog title="代课设置" :visible.sync="dialogVisible1" height="172px" width="300px">
            <div slot="body" class="sy-pk-tkdk" style="padding: 20px 10px;" v-loading="dialogloading"
                element-loading-text="拼命加载中...">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="代课教师：">
                        <el-select v-model="form.teacherName1" clearable placeholder="请选择教师" style="width: 100%;">
                            <el-option
                                v-for="item in teacherOptions1"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="right">
                <el-button type="primary" :loading="savebtnLoading" @click="handleSaveTk">确定</el-button>
                <el-button @click="dialogVisible1 = false">取消</el-button>
            </div>
        </sy-dialog>
    </div>
</template>
<script>
    import { getYearList,getUserRoleById, updateAdjustInfo, getTermList, selectAdjustinfoList, updateStates, getBb, getFestival, selectTeacherCourse, selectAdjustVeryNiceIndex, selectCoursesheetvm, getCourseByClassId} from "../../request.js";
    export default {
        data() {
            return {
                savebtnLoading: false,
                dialogloading: false,
                dialogVisible: false,
                dialogVisible1: false,
                form: {
                    id: '',
                    course1: '',
                    teacherName1: '',
                    teacherId1: '',
                    date1: '',
                    weekId1: '',
                    festivalId1: '',
                    weekId: '',
                    classId: ''
                },
                oldteacherOptions: [],
                oldcourseOptions: [],
                courseOptions1: [],
                weekOptions: [],
                weekOptions1: [],
                festivalOptions: [],
                festivalOptions1: [],
                data: [], // 总课表
                canData: [], // 可调位置
                pickerOptions1: {},
                parmasList: {
                    yearValue: '',
                    termValue: '',
                    typeValue: this.$route.query.typeValue || '',
                    keywords: this.$route.query.keywords || ''
                },
                pageloading: false,
                yearsOptions: [],
                termOptions: [],
                typeOptions: [
                    {value: '', label: '全部'},
                    {value: '0', label: '待审批'},
                    {value: '1', label: '已通过'},
                    {value: '2', label: '未通过'}
                ],
                tableData: [],
                multipleSelection: [],
                isAdminXXSYS: false,
                intNum: 0,
                currentEditObj: {}
            }
        },
        watch: {
        },
        created() {
            this.$parent.$emit('currentPage', '/pk/kb/change');
            this.init();
        },
        methods: {
            init(){
                getUserRoleById(this.$store.state.userId).then((data)=>{
                    this.isAdminXXSYS = this.$_.find(data, {code: 'XX_SYS_'}) ? true : false;
                    this.getYearList();
                })
            },
            // 学年列表
            getYearList(){
                return new Promise((resolve,reject)=>{
                    getYearList({unitId: this.$store.state.unitId}).then((data)=>{
                        console.log(data);
                        let arr = [];
                        if(data.data){
                            data.data.forEach((_s,s) => {
                                arr.push({
                                    label: _s.year,
                                    value: _s.year
                                })
                                if(_s.current){
                                    this.parmasList.yearValue = this.$route.query.year || _s.year;
                                }
                            });
                        }
                        this.yearsOptions = arr;
                        resolve(data)
                    }).catch(err=>{
                        reject(err)
                    })
                })
            },
            // 学期列表
            getTermList(){
                return new Promise((resolve,reject)=>{
                    getTermList({unitId: this.$store.state.unitId,year: this.parmasList.yearValue}).then((data)=>{
                        let arr = [];
                        if(data.data){
                            data.data.forEach((_s,s) => {
                                arr.push({
                                    label: _s.name,
                                    value: _s.schoolTerm
                                })
                                if(_s.current == 1){
                                    this.parmasList.termValue = this.$route.query.term || _s.schoolTerm;
                                }
                            });
                        }
                        this.termOptions = arr;
                        resolve(data)
                    }).catch(err=>{
                        reject(err)
                    })
                })
            },
            handleChangeYear(val){
                if(val){
                    this.getTermList().then((data)=>{
                        this.getList();
                    });
                }else{
                    this.parmasList.termValue = '';
                    this.termOptions = [];
                }
            },
            handleChangeTerm(val){
                if(val){
                    this.getList();
                }
            },
            handleChangeType(val){
                this.getList();
            },
            getList(){
                this.pageloading = true;
                this.tableData = [];
                selectAdjustinfoList(this.$store.state.unitId, this.parmasList.yearValue, this.parmasList.termValue, this.parmasList.typeValue, this.parmasList.keywords ).then((data)=>{
                    this.pageloading = false;
                    this.tableData = data || [];
                }).catch(err=>{
                    this.pageloading = false;
                    this.tableData = [];
                })
            },
            handlePrint(row){
                this.$router.push({path: '/pk/kb/print', query: {
                    id: row.id, 
                    type: row.adjustType,
                    year: this.parmasList.yearValue, 
                    term: this.parmasList.termValue,
                    typeValue: this.parmasList.typeValue,
                    keywords: this.parmasList.keywords
                }})
            },
            handleEditer(row, t){
                if(t == 'pass'){ // 同意
                    this.$confirm('是否继续同意该调代课申请?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() => {
                        this.updateState(row.id, 1);
                    }).catch(() => {
                            
                    });
                }else if (t == 'back') { // 拒绝
                    this.$confirm('是否继续拒绝该调代课申请?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.updateState(row.id, 2);
                    }).catch(() => {
                            
                    });
                }else{ // 编辑
                    this.currentEditObj = this.$_.cloneDeep(row)
                    if (row.adjustType == 1) {
                        this.dialogVisible = true;
                    }else{
                        this.dialogVisible1 = true;
                    }
                    this.getData(row.solutionId, row.classId, row);
                }
            },
            updateState(id, state){
                updateStates(id, state).then(res=>{
                    this.$notify({
                        title: '成功',
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.getList();
                })
            },
            // 查询星期 节次 教师 总课表
            getData(solutionId, classId, row){
                this.dialogloading = true;
                this.form.id = row.id;
                this.form.classId = classId;
                let weeks = new Promise((resolve, reject) => {
                    getBb('XQ').then(res=>{
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                }) 
                let festival = new Promise((resolve, reject) => {
                    getFestival({unitId:this.$store.state.unitId}).then(res=>{
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                })
                let teachers = new Promise((resolve, reject) => {
                    selectTeacherCourse({
                        classId: classId,
                        soltionId: solutionId
                    }).then(res=>{
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                })
                let pkList = new Promise((resolve, reject) => {
                    selectCoursesheetvm(solutionId).then(res=>{
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                })
                let course = new Promise((resolve, reject) => {
                    getCourseByClassId({
                        unitId: this.$store.state.unitId,
                        yearValue: row.year,
                        termValue: row.term,
                        classId: classId
                    }).then(res=>{
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                })
                Promise.all([weeks, festival, teachers, course, pkList]).then((data)=>{
                    console.log(data);
                    // 总课表
                    this.data = this.$_.cloneDeep(data[4]);
                    let current = this.$_.find(this.data, o=>{
                        return o.classId == row.classId && o.weekId == row.applyWeekId && o.festivalId == row.applyFestivalId && o.courseId == row.applyCourseId
                    });
                
                    // 星期
                    let arr = [];
                    data[0].data.forEach((_d,d)=>{
                        if(_d.value != '6' && _d.value != '7'){
                            arr.push({
                                id: _d.id,
                                name: _d.name
                            })
                        }
                    })
                    this.weekOptions = this.$_.cloneDeep(arr);
                    this.weekOptions1 = this.$_.cloneDeep(arr);
                    // 节次
                    let fes = [];
                    data[1].data.forEach((_d,d)=>{
                        fes.push({
                            id: _d.id, 
                            name: _d.name
                        })
                    })
                    this.festivalOptions = this.$_.cloneDeep(fes);
                    this.festivalOptions1 = this.$_.cloneDeep(fes);
                    // 科目列表
                    let courseList = [];
                    data[3].forEach((_s,s)=>{
                        courseList.push({
                            value: _s.id,
                            label: _s.name
                        })
                    })
                    this.oldcourseOptions = this.$_.cloneDeep(courseList);
                    // 教师
                    let tea = [];
                    let currentTeachers = [];
                    data[2].forEach((_s,s)=>{
                        tea.push({
                            id: _s.teacherId,
                            name: _s.teacherName,
                            children: _s.pkCourseVMS || []
                        })
                        if(_s.teacherId == row.adjustableTeacherId){
                            _s.pkCourseVMS.forEach((_c,c)=>{
                                currentTeachers.push({
                                    value: _c.courseId,
                                    label: _c.courseShortName || _c.courseName
                                })
                            })
                        }
                    })
                    if(row.adjustableTeacherId){
                        this.courseOptions1 = this.$_.cloneDeep(currentTeachers);
                    }else{
                        this.courseOptions1 = this.$_.cloneDeep(courseList);
                    }
                    this.oldteacherOptions = this.$_.cloneDeep(tea);
                    // this.teacherOptions1 = this.$_.filter(arr, o=>{return o.id != this.form.teacherId});
                    this.teacherOptions1 = this.$_.cloneDeep(this.oldteacherOptions);
                    this.form.teacherName1 = row.adjustableTeacherName || '';
                    this.form.teacherId1 = row.adjustableTeacherId || '';
                    setTimeout(() => {
                        this.form.weekId1 = row.adjustableWeekId || '';
                        this.form.festivalId1 = row.adjustableFestivalId || '';
                        this.form.course1 = row.adjustableCourseId || '';
                        this.form.date1 = row.adjustableDay || '';
                    }, 42);
                    // 查询可调位置
                    this.getCanTKW({
                        solutionId: solutionId,
                        classId: classId,
                        courseSheetIds: [current.id],
                        courseSheetVMS: this.data
                    }).then((res)=>{
                        this.canData = res.codeXYVMS;
                        this.dialogloading = false;
                    }).catch(err=>{

                    })
                }).catch((err)=>{
                    this.dialogloading = false;
                })
            },
            // 查询可调课位
            getCanTKW(arr){
                return new Promise((resolve, reject) => {
                    selectAdjustVeryNiceIndex(arr).then(res=>{
                        resolve(res);
                    }).catch(err=>{
                        reject([])
                    })
                })
            },	
            // 被调老师学科改变
            handleCourseChange(val){
                let obj = this.$_.find(this.oldteacherOptions, {id: val});
                this.form.course1 = '';
                this.form.weekId1 = '';
                this.form.festivalId1 = '';
                this.form.date1 = '';
                if(obj){
                    let arr = [];
                    obj.children.forEach((_s,s)=>{
                        arr.push({
                            value: _s.courseId,
                            label: _s.courseName
                        })
                    })
                    this.courseOptions1 = arr;
                }else{
                    this.courseOptions1 = this.$_.cloneDeep(this.oldcourseOptions);
                }
                // this.canNiceKW
                // 申请 星期
                this.weekOptions1 = val ? this.$_.filter(this.weekOptions, o=>{
                    return this.$_.find(this.data, a=>{return a.weekId == o.id && a.teacherId == val && a.classId == this.form.classId})
                }) : this.$_.cloneDeep(this.weekOptions);
                // 申请 节次
                this.festivalOptions1 = val ? this.$_.filter(this.festivalOptions, o=>{
                    return this.$_.find(this.data, a=>{return a.festivalId == o.id && a.teacherId == val && a.classId == this.form.classId})
                }) : this.$_.cloneDeep(this.festivalOptions);
            },
            // 保存调课
            handleSaveTk(){
                if ((new Date().getTime() - this.intNum) < 500) { //解决双击发两条请求的问题，只要点击相隔小于500毫秒就不发请求
                    this.intNum = 0;
                    console.error('二货点那么快要死啊！')
                    return false;
                }else{
                    this.intNum = new Date().getTime();
                }
                let canObj = null;
                if(this.currentEditObj.adjustType == 1){
                    canObj = this.$_.find(this.canData, o=>{
                        return o.weekId == this.form.weekId1 && o.festivalId == this.form.festivalId1
                    })
                }else{
                    canObj = true;
                }
                if(canObj){
                    this.savebtnLoading = true;
                    updateAdjustInfo({
                        id: this.form.id,
                        adjustableTeacherId: this.form.teacherId1 ||undefined,
                        adjustableCourseId: this.form.course1 ||undefined,
                        adjustableDay: this.form.date1 ? this.$moment(this.form.date1).format('X') : undefined,
                        adjustableWeekId: this.form.weekId1 ||undefined,
                        adjustableFestivalId: this.form.festivalId1 ||undefined
                    }).then((res)=>{
                        this.$notify({
                        title: '成功',
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.getList();
                        this.dialogVisible = false;
                        this.dialogVisible1 = false;
                        this.savebtnLoading = false;
                    }).catch((err)=>{
                        this.savebtnLoading = false;
                    })
                }else{
                    this.$notify({
                        message: '不能调课，会产生冲突！',
                        type: 'error'
                    });
                }
            }
        }
    }
</script>
<style scope>
    .el-table .el-table__fixed-right{
        box-shadow:0 0 0 #d3d4d6;
    } 
</style>