import {
    getYear,
    getTerm,
    getWeeks,
    getTeacherSheets,
    getBb,
    getFestival,
    getTeacherJyz,
    getGrade,
    getCourse,
    getTeacherCourse,
    getClazzSheets,
    getClazz
} from '../request.js'
import { getRcCodeList } from '../../request.js';
export default {
    data() {
        return {
            year: "",
            years: [],
            term: "",
            terms: [],
            weekTh: "",
            weekThs: [],
            solutionId: "",
            grade: "",
            grades: [],
            course: "",
            courses: [],
            Jyz: "",
            Jyzs: [],
            JyzData: [],
            radio: this.$route.path == '/pk/kb/teacherweek' ? '按教研组' : '',
            list: [], //教师列表
            checkList: [], //选中的教师
            xqs: [],
            festivals: [],
            rightValue: [this.$route.path == '/pk/kb/teacherweek' ? '班级' : '教师', '场地'],
            nameValue: true,
            typeValue: true,
            emptyText: '正在加载中...',
            emptyTextTable: '正在加载中...',
            tableData: [],
            tdData: [], //拿到的课表的原始数据
            row: [], //表头数据
            curTime: new Date(), //时间戳，用于阻止旧数据的展示
            codeList: {
                'btn_pk_clazz_week_download': false,
                'btn_pk_clazz_week_print': false,
                'btn_pk_teacher_week_download': false,
                'btn_pk_teacher_week_print': false
            }
        }
    },
    created() {
        getRcCodeList('category_pk_clazz_kb_week' && 'category_pk_teacher_kb_week', this.codeList).then(() => {
            getYear({
                unitId: this.$store.state.unitId,
            }).then(res => {
                if (res && res.status == 200 && res.data && res.data.length > 0) {
                    this.years = res.data
                    this.$nextTick(() => {
                        res.data.forEach(_y => {
                            if (_y.current) {
                                this.year = _y.year
                                    // this.year = "2015-2016"
                            }
                        })
                    })
                } else {
                    this.list = []
                    this.checkList = []
                    this.emptyText = "暂无数据"
                    this.tableData = []
                    this.emptyTextTable = '暂无数据'
                    this.curTime = new Date()
                }
            })
            getFestival({ unitId: this.$store.state.unitId, }).then(data => { //查询节次列表
                if (data && data.status == 200 && data.data && data.data.length > 0) {
                    this.festivals = data.data
                    getBb('XQ').then(xq => { //查询星期
                        if (xq && xq.status == 200 && xq.data && xq.data.length > 0) {
                            this.xqs = xq.data
                        }
                    })
                }
            })
        })
    },
    methods: {
        initData(data1, data2, data3, flag) {
            if (flag) return;
            let arr = []
            data1.forEach(_d => {
                let courseSheets = [] //每个人的课表
                    /* 先循环行再循环列（表头） */
                data2.forEach(_x => {
                    let sheets = []
                    this.row = []
                    data3.forEach(_f => {
                        /* 表头数据 */
                        this.row.push({
                            rowId: _f.id,
                            rowName: _f.name
                        })
                        let hasSheet = [] //拿到有数据的单元格
                        if (_d.courseSheets.length > 0) {
                            _d.courseSheets.forEach(_c => {
                                //给总数据中增加一个标识，作为确定是星期几的第几节课
                                if (this.typeValue) { //横向显示
                                    _c.code = _c.weekId + "_" + _c.festivalId
                                } else {
                                    _c.code = _c.festivalId + "_" + _c.weekId
                                }
                                hasSheet.push(_c)
                            })
                        }
                        //然后在去在节次和星期的循环组合中查找是否有对应的code，如果有在则存入课程名称，如果没有则存入空
                        if (hasSheet.length > 0) {
                            let index = _.findIndex(hasSheet, (s) => {
                                return s.code == _f.id + "_" + _x.id
                            });
                            if (index != -1) {
                                let clazzName = []
                                if (hasSheet[index].classNames && hasSheet[index].classNames.length > 0) {
                                    hasSheet[index].classNames.forEach(_clazz => {
                                        clazzName.push(_clazz.name ? _clazz.name : _clazz.shortName ? _clazz.shortName : '')
                                    })
                                }
                                let roomName = []
                                if (hasSheet[index].roomNames && hasSheet[index].roomNames.length > 0) {
                                    hasSheet[index].roomNames.forEach(_clazz => {
                                        roomName.push(_clazz.name ? _clazz.name : _clazz.shortName ? _clazz.shortName : '')
                                    })
                                }
                                sheets.push({
                                    courseName: hasSheet[index].courseName ? hasSheet[index].courseName : hasSheet[index].courseShortName,
                                    courseShortName: hasSheet[index].courseShortName ? hasSheet[index].courseShortName : hasSheet[index].courseName,
                                    teacherNames: hasSheet[index].teacherNames ? hasSheet[index].teacherNames : undefined,
                                    clazz: clazzName.join(","),
                                    room: roomName.join(","),
                                    single: hasSheet[index].single == 1 ? '(单周)' : hasSheet[index].single == 2 ? '(双周)' : ''
                                })
                            } else {
                                sheets.push({
                                    courseName: '',
                                    courseShortName: '',
                                    teacherNames: '',
                                    clazz: '',
                                    room: '',
                                    single: ''
                                })
                            }
                        }
                    })

                    courseSheets.push({
                        colId: _x.id,
                        colName: _x.name,
                        cSheet: sheets
                    })
                });
                arr.push({
                    tableTitleName: this.$route.path != '/pk/kb/clazzweek' ? _d.teacherName : _d.className,
                    courseSheets: courseSheets
                })
            })
            this.tableData = arr
        },
        getTableDate(method, params) {
            this.tableData = []
            this.emptyTextTable = '正在加载中...'
            let _t = new Date();
            method(params).then(res => {
                if (res && res.status == 200 && res.data && res.data.length > 0) {
                    this.tdData = res.data
                    if (this.typeValue) { //横向显示
                        this.initData(this.tdData, this.festivals, this.xqs, _t < this.curTime)
                    } else { //纵向
                        this.initData(this.tdData, this.xqs, this.festivals, _t < this.curTime)
                    }
                } else {
                    this.emptyTextTable = '暂无数据'
                }
                this.curTime = _t < this.curTime ? this.curTime : _t
            })
        },
        typeValueChange() {
            if (this.typeValue) { //横向显示
                this.initData(this.tdData, this.festivals, this.xqs)
            } else { //纵向
                this.initData(this.tdData, this.xqs, this.festivals)
            }
        },
        yearChange() {
            if (this.year) {
                this.terms = []
                this.term = ""
                getTerm({
                    unitId: this.$store.state.unitId,
                    year: this.year
                }).then(data => {
                    if (data && data.status == 200 && data.data && data.data.length > 0) {
                        this.terms = data.data
                        this.$nextTick(() => {
                            data.data.forEach(_t => {
                                if (_t.current) {
                                    this.term = _t.schoolTerm
                                }
                            })
                            if (this.term == "" && this.terms.length > 0) {
                                this.term = this.terms[0].schoolTerm
                            }
                        })
                    } else {
                        this.list = []
                        this.checkList = []
                        this.emptyText = "暂无数据"
                        this.tableData = []
                        this.emptyTextTable = '暂无数据'
                        this.curTime = new Date()
                    }
                })
            }
        },
        termChange() {
            if (this.term) {
                this.weekThs = []
                this.weekTh = ''
                getWeeks({
                    year: this.year,
                    term: this.term
                }).then(weeks => {
                    if (weeks && weeks.status == 200 && weeks.data && weeks.data.length > 0) {
                        this.weekThs = weeks.data
                        this.$nextTick(() => {
                            weeks.data.forEach(_w => {
                                if (_w.current == 'true') {
                                    this.weekTh = _w.week
                                }
                            })
                            if (!this.weekTh) {
                                this.weekTh = this.weekThs[0].week
                            }
                        })
                    } else {
                        this.list = []
                        this.checkList = []
                        this.emptyText = "暂无数据"
                        this.tableData = []
                        this.emptyTextTable = '暂无数据'
                        this.curTime = new Date()
                    }
                })
            }
        },
        weekThChange() {
            if (this.weekTh) {
                if (this.radio == '按教研组') {
                    this.Jyzs = []
                    this.Jyz = ''
                    getTeacherJyz({
                        unitId: this.$store.state.unitId,
                        year: this.year,
                        term: this.term,
                        weekTh: this.weekTh
                    }).then(jyz => {
                        if (jyz && jyz.status == 200 && jyz.data && jyz.data.length > 0) {
                            this.JyzData = jyz.data
                            this.JyzData.forEach(_j => {
                                this.Jyzs.push({
                                    name: _j.teachPreparaOrgName
                                })
                            })
                            this.Jyz = this.Jyzs[0].name
                        } else {
                            this.list = []
                            this.checkList = []
                            this.emptyText = "暂无数据"
                            this.tableData = []
                            this.emptyTextTable = '暂无数据'
                            this.curTime = new Date()
                        }
                    })
                }
                if (this.radio == '按年级学科' || this.$route.path == '/pk/kb/clazzweek') {
                    if (this.weekTh) {
                        this.grades = []
                        this.grade = ""
                        getGrade({
                            unitId: this.$store.state.unitId,
                            type: 'open',
                            year: this.year,
                            term: this.term,
                            week: this.weekTh
                        }).then(res => {
                            if (res && res.status == 200 && res.data && res.data.length > 0) {
                                this.grades = res.data
                                this.$nextTick(() => {
                                    this.grade = this.grades[0].gradeId
                                })
                            } else {
                                this.list = []
                                this.checkList = []
                                this.emptyText = "暂无数据"
                                this.tableData = []
                                this.emptyTextTable = '暂无数据'
                                this.curTime = new Date()
                            }
                        })
                    }
                }
            }
        },
        JyzChange() {
            this.list = []
            this.checkList = []
            this.JyzData.forEach(_j => {
                if (_j.teachPreparaOrgName == this.Jyz) {
                    _j.teacherVMS.forEach(_t => {
                        this.list.push({
                            id: _t.teacherId,
                            name: _t.teacherName
                        })
                    })
                }
            })
            if (this.list.length == 0) {
                this.emptyText = "暂无数据"
            }
            if (this.keyWord) {
                this.checkList = []
                this.list.forEach(_l => {
                    if (_l.name.indexOf(this.keyWord) !== -1) {
                        this.checkList.push(_l.id)
                    }
                })
            } else {
                this.list.forEach(_l => {
                    this.checkList.push(_l.id)
                })
            }
            if (this.checkList.length > 0) {
                this.getTableDate(getTeacherSheets, {
                    unitId: this.$store.state.unitId,
                    year: this.year,
                    term: this.term,
                    week: this.weekTh,
                    teacherIds: this.checkList.join(","),
                    keyWord: this.keyWord
                })
            } else {
                this.tableData = []
                this.emptyTextTable = '暂无数据'
                this.curTime = new Date()
            }
        },
        listChange() {
            if (this.checkList.length > 0) {
                if (this.$route.path == '/pk/kb/clazzweek') {
                    this.getTableDate(getClazzSheets, {
                        unitId: this.$store.state.unitId,
                        year: this.year,
                        term: this.term,
                        week: this.weekTh,
                        gradeId: this.grade ? this.grade : undefined,
                        classIds: this.checkList.join(","),
                        keyWord: this.keyWord ? this.keyWord : undefined
                    })
                } else {
                    this.getTableDate(getTeacherSheets, {
                        unitId: this.$store.state.unitId,
                        year: this.year,
                        term: this.term,
                        week: this.weekTh,
                        gradeId: this.grade ? this.grade : undefined,
                        teacherIds: this.checkList.join(","),
                        keyWord: this.keyWord ? this.keyWord : undefined
                    })
                }
            } else {
                this.tableData = []
                this.emptyTextTable = '暂无数据'
                this.curTime = new Date()
            }
        },
        radioChange() {
            if (this.radio == '按教研组') {
                getWeeks({
                    year: this.year,
                    term: this.term
                }).then(weeks => {
                    if (weeks && weeks.status == 200 && weeks.data && weeks.data.length > 0) {
                        this.weekThs = weeks.data
                        this.$nextTick(() => {
                            weeks.data.forEach(_w => {
                                if (_w.current) {
                                    this.weekTh = _w.week
                                }
                            })
                            if (this.weekTh) {
                                this.weekTh = this.weekThs[0].week
                            }
                            this.Jyzs = []
                            getTeacherJyz({
                                unitId: this.$store.state.unitId,
                                year: this.year,
                                term: this.term,
                                weekTh: this.weekTh
                            }).then(jyz => {
                                if (jyz && jyz.status == 200 && jyz.data && jyz.data.length > 0) {
                                    if (jyz.data.length > 0) {
                                        this.JyzData = jyz.data
                                        this.JyzData.forEach(_j => {
                                            this.Jyzs.push({
                                                name: _j.teachPreparaOrgName
                                            })
                                        })
                                        this.Jyz = this.Jyzs[0].name
                                    }
                                } else {
                                    this.list = []
                                    this.checkList = []
                                    this.emptyText = "暂无数据"
                                    this.tableData = []
                                    this.emptyTextTable = '暂无数据'
                                    this.curTime = new Date()
                                }
                            })
                        })
                    } else {
                        this.list = []
                        this.checkList = []
                        this.emptyText = "暂无数据"
                        this.tableData = []
                        this.emptyTextTable = '暂无数据'
                        this.curTime = new Date()
                    }
                })
            } else if (this.radio == '按年级学科') {
                getGrade({
                    unitId: this.$store.state.unitId,
                    type: 'open',
                    year: this.year,
                    term: this.term,
                    week: this.weekTh
                }).then(res => {
                    if (res && res.status == 200 && res.data && res.data.length > 0) {
                        this.grades = res.data
                        this.$nextTick(() => {
                            this.grade = this.grades[0].gradeId
                        })
                    } else {
                        this.list = []
                        this.checkList = []
                        this.emptyText = "暂无数据"
                        this.tableData = []
                        this.emptyTextTable = '暂无数据'
                        this.curTime = new Date()
                    }
                })
            }
        },
        gradeChange() {
            if (this.grade) {
                if (this.$route.path == '/pk/kb/clazzweek') {
                    getClazz({
                        gradeId: this.grade,
                        year: this.year,
                        schoolTerm: this.term
                    }).then(clazz => {
                        if (clazz && clazz.status == 200 && clazz.data && clazz.data.length > 0) {
                            this.list = clazz.data
                            if (this.keyWord) {
                                this.checkList = []
                                this.list.forEach(_l => {
                                    if (_l.name.indexOf(this.keyWord) !== -1) {
                                        this.checkList.push(_l.id)
                                    }
                                })
                            } else {
                                this.list.forEach(_l => {
                                    this.checkList.push(_l.id)
                                })
                            }
                            if (this.checkList.length > 0) {
                                if (this.$route.path == '/pk/kb/clazzweek') {
                                    this.getTableDate(getClazzSheets, {
                                        unitId: this.$store.state.unitId,
                                        year: this.year,
                                        term: this.term,
                                        week: this.weekTh,
                                        gradeId: this.grade ? this.grade : undefined,
                                        classIds: this.checkList.join(","),
                                        keyWord: this.keyWord ? this.keyWord : undefined
                                    })
                                } else {
                                    this.getTableDate(getTeacherSheets, {
                                        unitId: this.$store.state.unitId,
                                        year: this.year,
                                        term: this.term,
                                        week: this.weekTh,
                                        gradeId: this.grade ? this.grade : undefined,
                                        teacherIds: this.checkList.join(","),
                                        keyWord: this.keyWord ? this.keyWord : undefined
                                    })
                                }
                            } else {
                                this.tableData = []
                                this.emptyTextTable = '暂无数据'
                                this.curTime = new Date()
                            }
                        } else {
                            this.list = []
                            this.checkList = []
                            this.emptyText = "暂无数据"
                            this.tableData = []
                            this.emptyTextTable = '暂无数据'
                            this.curTime = new Date()
                        }
                    })

                } else {
                    this.courses = []
                    this.course = ""
                    getCourse({
                        unitId: this.$store.state.unitId,
                        year: this.year,
                        term: this.term,
                        gradeId: this.grade,
                        week: this.weekTh,
                    }).then(data => {
                        if (data && data.status == 200 && data.data && data.data.length > 0) {
                            this.courses = data.data
                            this.$nextTick(() => {
                                this.course = this.courses[0].courseId
                            })
                        } else {
                            this.list = []
                            this.checkList = []
                            this.emptyText = "暂无数据"
                            this.tableData = []
                            this.emptyTextTable = '暂无数据'
                            this.curTime = new Date()
                        }
                    })
                }
            } else {
                this.courses = []
                this.course = ""
                this.list = []
                this.checkList = []
            }
        },
        courseChange() {
            if (this.course) {
                this.list = []
                this.checkList = []
                getTeacherCourse({
                    unitId: this.$store.state.unitId,
                    year: this.year,
                    term: this.term,
                    gradeId: this.grade,
                    week: this.weekTh,
                    courseId: this.course
                }).then(t => {
                    if (t && t.status == 200 && t.data && t.data.length > 0) {
                        if (this.keyWord) {
                            this.checkList = []
                            t.data.forEach(_l => {
                                if (_l.name.indexOf(this.keyWord) !== -1) {
                                    this.checkList.push(_l.id)
                                }
                            })
                        } else {
                            t.data.forEach(_t => {
                                this.checkList.push(_t.teacherId)
                                this.list.push({
                                    id: _t.teacherId,
                                    name: _t.teacherName
                                })
                            })
                        }
                        if (this.checkList.length > 0) {
                            if (this.$route.path == '/pk/kb/clazzweek') {
                                this.getTableDate(getClazzSheets, {
                                    unitId: this.$store.state.unitId,
                                    year: this.year,
                                    term: this.term,
                                    week: this.weekTh,
                                    gradeId: this.grade ? this.grade : undefined,
                                    classIds: this.checkList.join(","),
                                    keyWord: this.keyWord
                                })
                            } else {
                                this.getTableDate(getTeacherSheets, {
                                    unitId: this.$store.state.unitId,
                                    year: this.year,
                                    term: this.term,
                                    week: this.weekTh,
                                    gradeId: this.grade ? this.grade : undefined,
                                    teacherIds: this.checkList.join(","),
                                    keyWord: this.keyWord
                                })
                            }
                        }
                    } else {
                        this.emptyText = "暂无数据"
                        this.tableData = []
                        this.emptyTextTable = '暂无数据'
                        this.curTime = new Date()
                    }
                })
            }
        },
        handleIconClick() {
            if (this.keyWord && this.list.length > 0) {
                this.checkList = []
                this.list.forEach(_l => {
                    if (_l.name.indexOf(this.keyWord) !== -1) {
                        this.checkList.push(_l.id)
                    }
                })
            } else {
                this.list.forEach(_l => {
                    this.checkList.push(_l.id)
                })
            }
            if (this.checkList.length > 0) {
                this.getTableDate(getTeacherSheets, {
                    unitId: this.$store.state.unitId,
                    year: this.year,
                    term: this.term,
                    week: this.weekTh,
                    gradeId: this.grade ? this.grade : undefined,
                    teacherIds: this.checkList,
                    keyWord: this.keyWord ? this.keyWord : undefined
                })
            } else {
                this.tableData = []
                this.emptyTextTable = '暂无数据'
                this.curTime = new Date()
            }
        },
        //  打印
        print() {
            this.$print('#myTable');
        },
    },
}