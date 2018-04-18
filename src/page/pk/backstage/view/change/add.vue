<template>
    <div class="sy-app-container sy-pk-tkdk">
        <sy-grad-4>
            <div slot="headerRight" style="line-height:40px;" >
                <i class="fa fa-calendar-plus-o" aria-hidden="true"></i> <b>申请调课代课</b>
                <el-button style="float: right;margin-top: 5px;" @click="$router.push({path:'/pk/kb/change', query: $route.query})">返回</el-button>
            </div>
            <div slot="bodyLeft" style="padding: 5px;">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="基本信息" name="1">
                            <el-form-item label="调课类型：">
                                <el-select v-model="form.type" placeholder="请选择类型" style="width: 100%;">
                                    <el-option label="调课" value="1"></el-option>
                                    <el-option label="代课" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="调课班级：" >
                                <el-cascader
                                    expand-trigger="hover"
                                    :options="gradeClazzTreeData"
                                    v-model="form.selectedOptions"
                                    placeholder="请选择班级"
                                    @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="申请原因：">
                                <el-autocomplete
                                    class="inline-input"
                                    v-model="form.reson"
                                    :maxlength="15"
                                    :fetch-suggestions="querySearch"
                                    placeholder="请输入内容"
                                    @select="handleSelect"
                                >
                                </el-autocomplete>
                                <!-- <el-select v-model="form.reson" placeholder="请选择原因" style="width: 100%;">
                                    <el-option label="因事请假" value="因事请假"></el-option>
                                    <el-option label="因病请假" value="因病请假"></el-option>
                                    <el-option label="参加培训" value="参加培训"></el-option>
                                    <el-option label="因公出差" value="因公出差"></el-option>
                                </el-select> -->
                            </el-form-item>
                        </el-collapse-item>
                        <el-collapse-item title="申请信息" name="2">
                            <el-form-item label="申请教师：">
                                <el-input v-if="!isAdminXXSYS" v-model="form.teacherName" readonly placeholder="" style="width: 100%;"></el-input>
                                <el-select v-else v-model="form.teacherId" placeholder="请选择教师" style="width: 100%;" @change="handleCourseChangeTeacher">
                                    <el-option
                                        v-for="item in teacherOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="调课学科：">
                                <el-select v-model="form.course" placeholder="请选择学科" style="width: 100%;"  @change="handleCourseChangeCourse">
                                    <el-option
                                        v-for="item in courseOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="调课日期：">
                                <el-date-picker
                                    v-model="form.date"
                                    type="date"
                                    :clearable="false"
                                    :editable="false"
                                    placeholder="选择日期"
                                    style="width: 100%;"
                                    @change="handlePutTime"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="调课星期：">
                                <el-select v-model="form.weekId" placeholder="请选择星期" style="width: 100%;" @change="handleCourseChangeWeek">
                                    <el-option
                                        v-for="item in weekOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="调课节次：">
                                <el-select v-model="form.festivalId" placeholder="请选择节次" style="width: 100%;"  @change="handleCourseChangeFestival">
                                    <el-option
                                        v-for="item in festivalOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-collapse-item>
                        <el-collapse-item title="被调信息" name="3">
                            <el-form-item label="是否协商：">
                                <el-radio class="radio" v-model="form.radio" label="1">是</el-radio>
                                <el-radio class="radio" v-model="form.radio" label="2">否</el-radio>
                            </el-form-item>
                            <el-form-item v-if="form.radio == '1' && form.type == '1'" label="被调教师：">
                                <el-select v-model="form.teacherId1" clearable placeholder="请选择教师" style="width: 100%;" @change="handleCourseChange">
                                    <el-option
                                        v-for="item in teacherOptions1"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="form.radio == '1' && form.type == '2'" label="代课教师：">
                                <el-select v-model="form.teacherId1" clearable placeholder="请选择教师" style="width: 100%;">
                                    <el-option
                                        v-for="item in teacherOptions1"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="form.radio == '1' && form.type == '1'" label="调课学科：">
                                <el-select v-model="form.course1" placeholder="请选择学科" style="width: 100%;" @change="handleCourseChanges">
                                    <el-option
                                        v-for="item in courseOptions1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="form.radio == '1' && form.type == '1'" label="调课日期：">
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
                            <el-form-item v-if="form.radio == '1' && form.type == '1'" label="调课星期：">
                                <el-select v-model="form.weekId1" placeholder="请选择星期" style="width: 100%;" @change="handleCourseChanges">
                                    <el-option
                                        v-for="item in weekOptions1"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="form.radio == '1' && form.type == '1'" label="调课节次：">
                                <el-select v-model="form.festivalId1" placeholder="请选择节次" style="width: 100%;" @change="handleCourseChanges">
                                    <el-option
                                        v-for="item in festivalOptions1"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="form.radio == '1'" label="备注：">
                                <el-input v-model="form.meno" placeholder="请输入备注" style="width: 100%;"></el-input>
                            </el-form-item>
                            <el-form-item v-if="form.radio == '2' && form.type == '1'" label="希望调到：">
                                <el-input v-model="form.meno" type="textarea" placeholder="" style="width: 100%;"></el-input>
                            </el-form-item>
                            <el-form-item v-if="form.radio == '2' && form.type == '2'" label="备注：">
                                <el-input v-model="form.meno" type="textarea" placeholder="" style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
                </el-form>
                <div class="center" style="padding: 10px 0 20px;">
                    <el-button type="primary" style="width: 100%;" :loading="saveLoading" @click="save">确定</el-button>
                    <!-- <el-button  @click="$router.push({path:'/pk/kb/change', query: $route.query})">取消</el-button> -->
                </div>
            </div>
            <div slot="bodyRight" style="width:100%;height:100%;padding: 5px;overflow: auto;">
                <el-row :gutter="5">
                    <el-col :span="12" v-loading="kbLoading">
                        <table class="sy-base-table-border">
                            <thead>
                                <tr>
                                    <th style="width: 35px;"></th>
                                    <th v-for="item in columesList" :key="item.id">{{item.name}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="clazz_row" v-for="(item,index) in tableData" :key="index">
                                    <td style="line-height: 16px;background-color: #fff" class="sy-theme-extraLightGray">{{item.number}}</td>
                                    <td v-for="key in columesList" :key="key.id" 
                                        class="cp"
                                        style="line-height: 16px;"
                                        @click.stop="handleClick(item, key, null)"
                                        :style="{
                                            'background': item[key.id + '_status'] == 2 ? '#13CE66' : item[key.id + '_status'] == 3 ? '#F7BA2A' : item[key.id + '_status'] == 4 ? '#72349d' :item[key.id + '_status'] == 5 ? '#FFF773' :'#fff',
                                            'color': item[key.id + '_status'] == 4 ? '#fff' : '#333'
                                        }">
                                        <div v-for="week in item[key.id]" :key="week.id" @click.stop="handleClick(item, key, week)"
                                            v-on:mouseenter="mounseOver(item, key, week, 'in')" v-on:mouseleave="mounseLeave(item, key, week, 'out')"
                                            :style="{
                                                'background': week.status == 1 ? '#FFF773' : 'transparent',
                                                'line-height': '16px'
                                            }">
                                            <div class="pk-selected left">
                                                <div>
                                                    <span>{{week.name}}</span><br>
                                                    <span>({{$_.map(week.datas, o=>{return o.gradeName+o.className}).join('、')}})</span>
                                                </div>
                                                <!-- <div>{{week.roomName}}</div> -->
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <table class="sy-base-table-border">
                                <thead>
                                    <tr>
                                        <th style="width: 35px;"></th>
                                        <th v-for="item in columesList" :key="item.id" :title="item.name">{{item.name}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="clazz_row" v-for="(item,index) in moveTeacherList" :key="index">
                                        <td style="line-height: 16px;background-color: #fff" class="sy-theme-extraLightGray">{{item.number}}</td>
                                        <td v-for="key in columesList" :key="key.id" 
                                            :style="{'line-height': '16px'}"
                                            style="cursor: default;"
                                            class="sy-pk-o"
                                        >
                                            <div v-for="week in item[key.id]" :key="week.id">
                                                <div v-if="optimizeTypoeId == '1'">
                                                    <div class="sy-pk-o" style="text-align: left;">
                                                        <span>{{week.name}}</span>
                                                        <span v-if="week.singleDoubleType != 0">《{{week.singleDoubleType==1? '单周':'双周'}}》</span><br>
                                                    </div>
                                                    <div class="sy-pk-o" style="text-align: left;" :title="week.gradeName+week.className">{{week.gradeName+week.className}}</div>
                                                </div>
                                                <div v-else>
                                                    <span>{{week.name}}</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="margin-top: 5px;">
                            <h3 style="margin: 0px;line-height: 30px;">{{teacherName2}}老师课表<span style="color: #FF4949"> ( 被调课老师课表 ) </span></h3>
                            <table class="sy-base-table-border">
                                <thead>
                                    <tr>
                                        <th style="width: 35px;"></th>
                                        <th v-for="item in columesList" :key="item.id" :title="item.name">{{item.name}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="clazz_row" v-for="(item,index) in dragTeacherList" :key="index">
                                        <td style="line-height: 16px;background-color: #fff" class="sy-theme-extraLightGray">{{item.number}}</td>
                                        <td v-for="key in columesList" :key="key.id" 
                                            :style="{'line-height': '16px'}"
                                            style="cursor: default;"
                                        >
                                            <div v-for="week in item[key.id]" :key="week.id">
                                                <div class="sy-pk-o" style="text-align: left;">
                                                    <span>{{week.name}}</span>
                                                    <span v-if="week.singleDoubleType != 0">《{{week.singleDoubleType==1? '单周':'双周'}}》</span><br>
                                                </div>
                                                <div class="sy-pk-o" style="text-align: left;" :title="week.gradeName+week.className">{{week.gradeName+week.className}}</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
import { getBb, getFestival, getGradeClazzList, getCourseByClassId, getAdjustinfoSheet, selectAdjustVeryNiceIndex, selectTeacherCourse, getUserRoleById, saveAdjustInfo } from "../../request.js";
export default {
    data(){
        return {
            kbLoading: false,
            teacherName2: '',
            activeNames: ['1','2','3'],
            activeGradeName: '',
            form: {
                type: '1',
                reson: '',
                selectedOptions: [],
                teacherName: '',
                teacherId: '',
                unitId: '',
                course: '',
                date: new Date(),
                weekId: '',
                festivalId: '',
                weekId: '',
                radio: '1',
                course1: '',
                teacherName1: '',
                teacherId1: '',
                date1: '',
                weekId1: '',
                festivalId1: '',
                weekId: '',
                meno: ''
            },
            courseOptions: [],
            courseOptions1: [],
            oldweekOptions: [],
            oldfestivalOptions: [],
            weekOptions: [],
            festivalOptions: [],
            weekOptions1: [],
            festivalOptions1: [],
            pickerOptions: {},
            pickerOptions1: {},
            oldTableData: [],
            tableData: [],
            moveTeacherList: [],
            dragTeacherList: [],
            courseMap: {},
            gradeClazzTreeData: [],
            stepData: [],
            columesList: [],
            id: '',
            oldteacherOptions: [],
            teacherOptions: [],
            oldcourseOptions: [],
            isAdminXXSYS: false,
            canNiceKW: null,
            saveLoading: false,
            soDate: {
                start: '',
                end: ''
            },
            restaurants: []
        }
    },
    watch: {
        'form.reson': function (newVal,oldVal) {
            if(newVal){
               this.form.reson = this.$_.trim(newVal).length > 15 ? this.$_.trim(newVal).slice(0,14) : this.$_.trim(newVal)
            }
        },
        'form.radio': function (newVal,oldVal) {
            if(this.form.radio == '2'){
                this.columesList.forEach((_s,s)=>{
                    this.tableData.forEach((_d,d)=>{
                        _d[_s.id+'_status'] = this.oldTableData.length>0 ? this.oldTableData[d][_s.id+'_status'] : _d[_s.id+'_status'];
                    })
                })
                this.canNiceKW = null;
                this.form.course1 = '';
                this.form.teacherId1 = '';
                this.form.festivalId1 = '';
                this.form.teacherId1 = '';
                this.form.weekId1 = '';
                this.form.meno = '';
                this.form.date1 = '';
            }
        }
    },
    created(){
        this.$parent.$emit('currentPage', '/pk/kb/change');
        this.init();
    },
    methods: {
        init(){
            this.form.unitId = this.$store.state.unitId;
            getUserRoleById(this.$store.state.userId).then((data)=>{
                this.isAdminXXSYS = this.$_.find(data, {code: 'XX_SYS_'}) ? true : false;
                this.getBbList();
                this.getGradeClazz();
            })
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        querySearch(queryString, cb) {
            var restaurants = [
                { "value": "因事请假" },
                { "value": "因病请假" },
                { "value": "参加培训" },
                { "value": "因公出差" }
            ];
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        handleSelect(item) {
            console.log(item);
        },
        // 查询星期
		getBbList(){
			this.tableData = [];
			getBb('XQ').then(res=>{
				let arr = [];
				res.data.forEach((_d,d)=>{
					if(_d.value != '6' && _d.value != '7'){
						arr.push({
							id: _d.id,
							name: _d.name
						})
					}
                })
                this.oldweekOptions = this.$_.cloneDeep(arr);
                this.weekOptions = this.$_.cloneDeep(arr);
                this.weekOptions1 = this.$_.cloneDeep(arr);
            
				this.columesList = arr;
				getFestival({unitId:this.$store.state.unitId}).then(data=>{
					let _arr = [],allArr = [],fss = [];
					data.data.forEach((_d,d)=>{
						let obj = {
							id: _d.id,
							begin: _d.begin,
							end: _d.end,
							number: _d.name,
							sort: _d.sort
						};
						this.columesList.forEach((_s,s)=>{
							obj[_s.id] = [];
							obj[_s.id+'_selected'] = false;// 单击选中
							obj[_s.id+'_'+_d.id+'_info'] = false;
                        })
                        fss.push({
                            id: _d.id, 
                            name: _d.name
                        })
						_arr.push(obj)
                    })
                    this.oldfestivalOptions = this.$_.cloneDeep(fss);
                    this.festivalOptions1 = this.$_.cloneDeep(fss);
                    this.festivalOptions = this.$_.cloneDeep(fss);
					this.tableData = _arr;
					// 调课老师课表
					this.moveTeacherList =  this.$_.cloneDeep(_arr);
					// 被调课老师课表
					this.dragTeacherList = this.$_.cloneDeep(_arr);
				})
			}).catch(err=>{
				
			})
        },
        // 查询年级班级   
        getGradeClazz(){
            return new Promise((resolve, reject) => {
                getGradeClazzList({
                    unitId: this.form.unitId,
                    year: this.$route.query.year,
                    term: this.$route.query.term
                }).then((data)=>{
                    let arr = [];
                    data.forEach((_s,s)=>{
                        if(_s.type == 'grade'){
                            let obj = {
                                value: _s.id,
                                label: _s.name,
                                children: []
                            } 
                            let childs = this.$_.filter(data, o=>{return o.domPid == _s.domId});
                            childs.forEach((_c,c)=>{
                                obj.children.push({
                                    value: _c.id,
                                    label: _c.name,
                                    gradeName: _s.name
                                })
                            })
                            arr.push(obj)
                        }
                    })
                    this.gradeClazzTreeData = arr;
                    for (let i = 0; i < arr.length; i++) {
                        const element = arr[i];
                        if(element.children.length>0){
                            this.form.selectedOptions = [element.value, element.children[0].value];
                            this.getKB();
                            this.getCourseList();
                            return
                        }
                    }
                    resolve(data)
                }).catch((err)=>{
                    reject(err)
                })
            })
        },
        handleChange(value) {
            this.getKB();
            this.getCourseList();
        },
        getCourseList(){
            getCourseByClassId({
                unitId: this.form.unitId,
                yearValue: this.$route.query.year,
                termValue: this.$route.query.term,
                classId: this.form.selectedOptions[1]
            }).then((res)=>{
                let arr = [];
                res.forEach((_s,s)=>{
                    arr.push({
                        value: _s.id,
                        label: _s.name
                    })
                })
                this.oldcourseOptions = this.$_.cloneDeep(arr);
                this.courseOptions = this.$_.cloneDeep(arr);
                this.courseOptions1 = this.$_.cloneDeep(arr);
            })
        },
        handlePutTime(val){
            let star = this.form.date;
            let emdTime = new Date(this.$moment(this.soDate.end).format());
            this.pickerOptions1 = {
                disabledDate(time) {
                    return time.getTime() < star.getTime() || time.getTime() > emdTime.getTime();
                }
            }
            console.log(val);
            if(new Date(this.$moment(val).format()).getTime() < new Date(this.$moment(this.soDate.start).format()) || 
                new Date(this.$moment(val).format()).getTime() > new Date(this.$moment(this.soDate.end).format())
            ){
                this.getKB();
            }else{
                this.selectTeacherCourseList();
                this.checkCTcolor();
            }
        },
        getKB(){
            getAdjustinfoSheet({
                unitId: this.form.unitId,
                year: this.$route.query.year,
                term: this.$route.query.term,
                date: this.$moment(this.form.date).format('YYYY-MM-DD'),
                gradeId: this.form.selectedOptions[0]
            }).then(res=>{
                console.log(res);
                this.id = res.solutionId;
                this.soDate.start = this.$moment(res.beginTime).format();
                this.soDate.end = this.$moment(res.endTime).format();
                let emdTime = new Date(this.$moment(res.endTime).format());
                this.pickerOptions = {
                    disabledDate(time) {
                        return time.getTime() < (Date.now() - 8.64e7);
                    }
                }
                this.pickerOptions1 = {
                    disabledDate(time) {
                        return time.getTime() < (Date.now() - 8.64e7) || time.getTime() > emdTime.getTime();
                    }
                }
                this.stepData = this.$_.cloneDeep(res.courseSheetVMS);
                this.selectTeacherCourseList();
                this.checkCTcolor();
            }).catch((err)=>{
                this.columesList.forEach((_s,s)=>{
                    this.tableData.forEach((_d,d)=>{
                        _d[_s.id] = [];
                    })
                })
            })
        },
        selectTeacherCourseList(){
            selectTeacherCourse({
                classId: this.form.selectedOptions[1],
                soltionId: this.id
            }).then(res=>{
                let arr = [];
                res.forEach((_s,s)=>{
                    arr.push({
                        id: _s.teacherId,
                        name: _s.teacherName,
                        children: _s.pkCourseVMS || []
                    })
                })
                this.oldteacherOptions = this.$_.cloneDeep(arr);
                if(this.isAdminXXSYS){
                    this.teacherOptions = this.$_.cloneDeep(arr);
                    let courseList = [];
                    if(arr.length>0){
                        this.form.teacherName = arr[0].name;
                        this.form.teacherId = arr[0].id;
                    }else{
                        this.courseOptions = [];
                    }
                }else{
                    this.form.teacherName = this.$store.state.realName;
                    this.form.teacherId = this.$store.state.userId;
                    this.teacherOptions = [];
                    this.courseOptions = this.$_.cloneDeep(this.oldcourseOptions);
                }
                this.teacherOptions1 = this.$_.filter(arr, o=>{return o.id != this.form.teacherId});
            }).catch(err=>{

            })
        },
        // 申请老师改变
        handleCourseChangeTeacher(val){
            console.log('sssssss',val);
            this.form.course = '';
            this.form.weekId = '';
            this.form.festivalId = '';
            // 被调 老师列表刷新
            this.teacherOptions1 = this.$_.filter(this.oldteacherOptions, o=>{return o.id != this.form.teacherId});
            // 申请 学科 刷新
            let obj = this.$_.find(this.teacherOptions, {id: val});
            if(obj){
                let arr = [];
                obj.children.forEach((_s,s)=>{
                    arr.push({
                        value: _s.courseId,
                        label: _s.courseName
                    })
                })
                this.courseOptions = arr;
            }else{
                this.courseOptions = this.$_.cloneDeep(this.oldcourseOptions);
            }
            // 申请 星期
            this.weekOptions = val ? this.$_.filter(this.oldweekOptions, o=>{
                return this.$_.find(this.stepData, a=>{return a.weekId == o.id && a.teacherId == val && a.classId == this.form.selectedOptions[1]})
            }) : this.$_.cloneDeep(this.oldweekOptions);
            // 申请 节次
            this.festivalOptions = val ? this.$_.filter(this.oldfestivalOptions, o=>{
                return this.$_.find(this.stepData, a=>{return a.festivalId == o.id && a.teacherId == val && a.classId == this.form.selectedOptions[1]})
            }) : this.$_.cloneDeep(this.oldfestivalOptions);
            this.computedTeacherKW();
        },
        // 申请学科改变
        handleCourseChangeCourse(val){
            // 申请 星期
            this.weekOptions = val ? this.$_.filter(this.oldweekOptions, o=>{
                return this.$_.find(this.stepData, a=>{return a.courseId == val && a.weekId == o.id && a.teacherId == this.form.teacherId && a.classId == this.form.selectedOptions[1]})
            }) : this.$_.cloneDeep(this.oldweekOptions);
            // 申请 节次
            this.festivalOptions = val ? this.$_.filter(this.oldfestivalOptions, o=>{
                return this.$_.find(this.stepData, a=>{return a.courseId == val && a.festivalId == o.id && a.teacherId == this.form.teacherId && a.classId == this.form.selectedOptions[1]})
            }) : this.$_.cloneDeep(this.oldfestivalOptions);
            this.computedTeacherKW();
        }, 
        // 申请星期改变
        handleCourseChangeWeek(val){
            // 申请 节次
            this.festivalOptions = val ? this.$_.filter(this.oldfestivalOptions, o=>{
                return this.$_.find(this.stepData, a=>{return a.weekId == val && a.festivalId == o.id && a.teacherId == this.form.teacherId && a.classId == this.form.selectedOptions[1]})
            }) : this.$_.cloneDeep(this.oldfestivalOptions);
            // 如果当前有选中的节次 查看节次是否在选中的星期下
            this.form.festivalId = this.$_.find(this.festivalOptions, {id: this.form.festivalId}) ? this.form.festivalId : '';
            this.computedTeacherKW();
        },
        // 申请节次改变
        handleCourseChangeFestival(val){
            this.computedTeacherKW();
        },
        // 计算申请老师的课位
        computedTeacherKW(){
            if(this.form.teacherId && this.form.course && this.form.weekId && this.form.festivalId){
                let row = this.$_.find(this.tableData, {id: this.form.festivalId});
                let key = this.$_.find(this.columesList,{id: this.form.weekId});
                let week = this.$_.find(row[this.form.weekId],{id: this.form.course});
                this.handleClick( row, key, week);
            }else{
                this.canNiceKW = null;
                this.columesList.forEach((_s,s)=>{
                    this.tableData.forEach((_d,d)=>{
                        _d[_s.id+'_status'] = 0;
                        _d[_s.id].forEach((_a,a)=>{
                            _a.status = 0;
                        })
                    })
                })
            }
        },
        // 被调老师学科改变
        handleCourseChange(val){
            let obj = this.$_.find(this.teacherOptions1, {id: val});
            this.form.course1 = '';
            this.form.weekId1 = '';
            this.form.festivalId1 = '';
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
            this.weekOptions1 = val ? this.$_.filter(this.oldweekOptions, o=>{
                return this.$_.find(this.stepData, a=>{return a.weekId == o.id && a.teacherId == val && a.classId == this.form.selectedOptions[1]})
            }) : this.$_.cloneDeep(this.oldweekOptions);
            // 申请 节次
            this.festivalOptions1 = val ? this.$_.filter(this.oldfestivalOptions, o=>{
                return this.$_.find(this.stepData, a=>{return a.festivalId == o.id && a.teacherId == val && a.classId == this.form.selectedOptions[1]})
            }) : this.$_.cloneDeep(this.oldfestivalOptions);
            this.computedChangeTeacherKW();
        },
        handleCourseChanges(val){
            this.computedChangeTeacherKW();
        },
        // 计算被调老师的课位
        computedChangeTeacherKW(){
            if(this.form.weekId1 && this.form.festivalId1){
                let row = this.$_.find(this.tableData, {id: this.form.festivalId1});
                let key = this.$_.find(this.columesList,{id: this.form.weekId1});
                let course = this.$_.find(row[this.form.weekId1],{id: this.form.course1}) || null;
                let week = this.form.course1 ? course : (row[this.form.weekId1].length>0 ? row[this.form.weekId1][0] : null);
                let data = null;
                if(week){
                    data = week.datas.length>0 ? week.datas[0] : null;
                }
                if(row[this.form.weekId1+'_status'] == 2){
                    this.columesList.forEach((_s,s)=>{
                        this.tableData.forEach((_d,d)=>{
                            if(_d.id == this.form.festivalId1 && _s.id == this.form.weekId1){
                                _d[_s.id+'_status'] = 4;
                            }else{
                                _d[_s.id+'_status'] = _d[_s.id+'_status'] == 4 ? this.oldTableData[d][_s.id+'_status'] : _d[_s.id+'_status'];
                            }
                        })
                    })
                    this.mounseMakeData(row, key, week, 'in')
                }else if(row[this.form.weekId1+'_status'] == 0){
                    this.$notify({
                        message: '不能调整到该位置，会增加冲突！',
                        type: 'warning'
                    });
                }
            }else{
                this.columesList.forEach((_s,s)=>{
                    this.tableData.forEach((_d,d)=>{
                        _d[_s.id+'_status'] = this.oldTableData[d][_s.id+'_status'];
                    })
                })
                this.canNiceKW = null;
            }
        },
        checkCTcolor(res){
			let keyid = this.optimizeTypoeId == 1 ? 'classId' : this.optimizeTypoeId == 2 ? 'teacherId' : this.optimizeTypoeId == 3 ? 'roomId' : '';
			this.columesList.forEach((_s,s)=>{
				this.tableData.forEach((_d,d)=>{
					let arr = this.$_.filter(this.stepData, o=>{
						return o.classId == this.form.selectedOptions[1] && o.weekId == _s.id && o.festivalId == _d.id
					})
					let uniqCourse = this.$_.uniqBy(arr, 'courseId');
					let _course = [];
					uniqCourse.forEach((_f,d)=>{
						let datas = [];
						if(this.optimizeTypoeId == 1){
							datas = this.$_.filter(arr, o=>{return o.courseId == _f.courseId  && o.teacherId})
						}else{
							datas = this.$_.uniqBy(this.$_.filter(arr, o=>{return o.courseId == _f.courseId  && o.classId}), 'id') 
						}
						_course.push({
							courseSheetId: _f.id,
							id: _f.courseId,
							name: _f.courseName, // 简称
							courseShortName: _f.courseShortName, // 全称
							roomAddr: _f.roomAddr, // 场地
							roomName: _f.roomName,
							roomId: _f.roomId,
							status: 0,
							hover: false,
							className: _f.className,
							classId: _f.classId,
							gradeId: _f.gradeId,
							gradeName: _f.gradeName,
							data: arr,
							singleDoubleType: _f.singleDoubleType,
							datas : datas
						})
					})

					let conflictData = this.$_.filter(res, o=>{
						return o.weekId == _s.id && o.festivalId == _d.id && o[keyid] == this.currentMsg.id
					})
					_d[`${_s.id}_status`] = '0';
					_d[`${_s.id}_conflictData`] = conflictData;
					_d[`${_s.id}_infoData`] = {};
					_d[`${_s.id}_info`] = '';
					_d[`${_s.id}_hover`] = false;
					_d[_s.id] = _course;
				})
				
			})
		},
        // 点击课程
		handleClick(row, key, week) {
            let data = null;
            if(week){
                data = week.datas.length>0 ? week.datas[0] : null;
            }
			row[key.id+'_'+row.id+'_info'] = true;
			let isSlecteChage = false,isSlecteChageId='';
			let weekId = '';
			let festivalId = '';
			this.columesList.forEach((_s,s)=>{
				this.tableData.forEach((_d,d)=>{
					_d[_s.id].forEach((_f,f)=>{
						if(_f.status == 1){
							festivalId = _d.id;
							weekId = _s.id;
							isSlecteChageId = _f.id;
							isSlecteChage = true;
						}
					})
				})
            })
			if(isSlecteChage && (festivalId != row.id || weekId != key.id)){
                if(this.form.radio == '1'){
                    if(row[key.id+'_status'] == 2){
                        this.form.teacherName1 = data ? data.teacherName : '';
                        this.form.teacherId1 = data ? data.teacherId : '';
                        setTimeout(() => {
                            this.form.weekId1 = data ? data.weekId : key.id;
                            this.form.festivalId1 = data ? data.festivalId : row.id;
                            this.form.course1 = data ? data.courseId : '';
                            this.computedChangeTeacherKW();
                        }, 50);
                    }else if(row[key.id+'_status'] == 0){
                        this.$notify({
                            message: '不能调整到该位置，会增加冲突！',
                            type: 'warning'
                        });
                    }
                }
			}else{
                // -----第一次选中判断是否有科目
				if(row[key.id].length == 0){
					return
				}
                if(this.isAdminXXSYS){
                    this.form.teacherName = data ? data.teacherName : '';
                    this.form.teacherId = data ? data.teacherId : '';
                    setTimeout(() => {
                        this.form.weekId = data ? data.weekId : '';
                        this.form.festivalId = data ? data.festivalId : '';
                        this.form.course = data ? data.courseId : '';
                    }, 50);
                }else{
                    if(!this.$_.find(week.datas, {teacherId: this.form.teacherId})){
                        this.$notify({
                            message: '您不代'+week.name+'，请重新选择！',
                            type: 'warning'
                        });
                        return
                    }
                }
				
				let isselect = false;
				row[key.id].forEach((_a,a)=>{
					if(_a.id == week.id){
						if(_a.status != 1){
							_a.status = 1;
							isselect = true;
						}
					}
                })
				if(!isselect){
					return
				}
                if(!this.canNiceKW){
                    this.kbLoading = true;
                    this.getCanTKW({
                        solutionId: this.id,
                        classId: this.form.selectedOptions[1],
                        courseSheetIds: [week.courseSheetId],
                        courseSheetVMS: this.stepData
                    }).then(res=>{
                        this.canNiceKW = this.$_.cloneDeep(res);
                        this.computPosition(row, key, week,data);
                        this.kbLoading = false;
                    }).catch(err=>{
                        this.kbLoading = false;
                    })
                }else{
                    this.computPosition(row, key, week,data);
                }
			}
        },
        // 计算可调位置
        computPosition(row, key, week, data){
            this.tableData.forEach((_a,a)=>{
                this.columesList.forEach((_s,s)=>{
                    _a[_s.id].forEach((_d,d)=>{
                        if(_d.id != week.id){
                            _d.status = 0;
                        }
                    })
                })
            })
            this.columesList.forEach((_s,s)=>{
                this.tableData.forEach((_d,d)=>{
                    _d[`${_s.id}_status`] = this.$_.find(this.canNiceKW.codeXYVMS, o=>{return o.festivalId == _d.id && o.weekId == _s.id}) ? 2 : _d[`${_s.id}_status`];
                    _d[`${_s.id}_infoData`] = this.$_.find(this.canNiceKW.conflictCodeXYVMS, o=>{return o.festivalId == _d.id && o.weekId == _s.id});
                })
                this.moveTeacherList.forEach((_d,d)=>{
                    let arr = this.$_.filter(this.stepData, o=>{
                        return o.weekId == _s.id && o.festivalId == _d.id && o.teacherId == data.teacherId
                    })
                    let uniqCourse = this.$_.uniqBy(arr, 'classId');
                    let _course = [];
                    uniqCourse.forEach((_f,d)=>{
                        _course.push({
                            courseSheetId: _f.id,
                            id: _f.courseId,
                            name: _f.courseName, // 简称
                            courseShortName: _f.courseShortName, // 全称
                            roomAddr: _f.roomAddr, // 场地
                            roomId: _f.roomId,
                            roomName: _f.roomName,
                            status: 0,
                            hover: false,
                            className: _f.className,
                            classId: _f.classId,
                            gradeId: _f.gradeId,
                            gradeName: _f.gradeName,
                            data: arr,
                            singleDoubleType: _f.singleDoubleType,
                            datas : this.$_.filter(arr, o=>{return o.courseId == _f.courseId  && o.teacherId})
                        })
                    })
                    _d[_s.id] = _course;
                })
            })
            this.oldTableData = this.$_.cloneDeep(this.tableData);
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
        // 鼠标进入
		mounseOver(row, key, week, t) {
			this.mounseMakeData(row, key, week, t,row, key, week, t)
		},
		// 鼠标移出
		mounseLeave(row, key, week, t) {
			this.mounseMakeData(row, key, week, t)
        },
        // 鼠标移入移出
		mounseMakeData(row, key, week, t){
			let isSlecteChage = false,isSlecteChageId='';
			let weekId = '';
			let festivalId = '';
			this.columesList.forEach((_s,s)=>{
				this.tableData.forEach((_d,d)=>{
					_d[_s.id].forEach((_f,f)=>{
						if(_f.status == 1){
							festivalId = _d.id;
							weekId = _s.id;
							isSlecteChageId = _f.id;
							isSlecteChage = true;
						}
					})
				})
            })
			if(row[key.id].length == 0){
                this.columesList.forEach((_s,s)=>{
                    this.dragTeacherList.forEach((_d,d)=>{
                        _d[_s.id] = [];
                    })
                })
				return
			}
            let data = week.datas.length>0 ? week.datas[0] : null;
			if(!data){return}
            this.teacherName2 = t == 'in' ? (data.teacherName || '') : '';
			this.columesList.forEach((_s,s)=>{
				this.dragTeacherList.forEach((_d,d)=>{
					let arr = this.$_.filter(this.stepData, o=>{
						return o.teacherId == data.teacherId && o.weekId == _s.id && o.festivalId == _d.id
					})
					let uniqCourse = this.$_.uniqBy(arr, 'courseId');
					let _course = [];
					uniqCourse.forEach((_d,d)=>{
						_course.push({
							id: _d.courseId,
							name: _d.courseName,
							className: _d.className,
							gradeName: _d.gradeName,
							singleDoubleType: _d.singleDoubleType,
							datas: this.$_.filter(arr, o=>{return o.teacherId == _d.teacherId})
						})
					})
					_d[_s.id] = t == 'in' ? _course : [];
				})
            })
        },
        save(){
            if(this.form.radio == '2'){
                this.form.course1 = '';
                this.form.festivalId1 = '';
                this.form.teacherId1 = '';
                this.form.weekId1 = '';
                this.form.meno = '';
                this.form.date1 = '';
            }
            let obj = {
                "solutionId": this.id,
                "term": this.$route.query.term,
                "unitId": this.form.unitId,
                "year": this.$route.query.year,

                "adjustType": this.form.type, // 调课类型
                "classId": this.form.selectedOptions[1], // 班级id
                "applyReason": this.form.reson, // 申请原因

                "adjustableCourseId": this.form.course1 || undefined, 
                "adjustableDay": this.form.date1 ? this.$moment(this.form.date1).format('X') : undefined,
                "adjustableFestivalId": this.form.festivalId1 || undefined, 
                "adjustableTeacherId": this.form.teacherId1 || undefined, 
                "adjustableWeekId": this.form.weekId1 || undefined, 
                "remarks": this.form.meno || undefined,  // 被调备注

                "applyCourseId": this.form.course, //调课学科
                "applyDay": this.form.date.getTime(), // 调课日期 
                "applyFestivalId": this.form.festivalId, // 调课节次
                "applyTeacherId": this.form.teacherId,  //申请教师
                "applyWeekId": this.form.weekId // 调课星期
            }
            this.saveLoading = true;
            saveAdjustInfo(obj).then((res)=>{
                console.log();
                this.$notify({
                    title: '成功',
                    message: '申请成功!',
                    type: 'success'
                });
                this.saveLoading = false;
            }).catch(err=>{
                this.saveLoading = false;
            })
        }
    }
}
</script>

<style scoped>
.sy-pk-input__inner{
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid rgb(191, 198, 217);
    box-sizing: border-box;
    color: rgb(31, 39, 61);
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0px 10px;
    cursor: pointer;
}
tr.clazz_row > td div.pk-selected:hover,
tr.clazz_row2 > td:hover {
  background: rgba(0, 0, 0, .2)!important;
}
</style>

