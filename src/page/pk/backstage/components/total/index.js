import config from './config.js'
import {getRcCodeList} from '../../request.js';
export default {
    data() {
        return {
            scrollW:6,
            unitId: this.$store.state.unitId,
            initing: false,
            emptyText: "正在加载中...",
            yearValue: "",
            yearOptions: [],
            yearChanging: true,
            termValue: "",
            termOptions: [],
            termChanging: true,
            weekValue: "",
            weekOptions: [],
            weekChanging: true,
            gradeValue: "",
            gradeOptions: [],
            keyValue: "",
            rightValue: [],
            nameValue: true,
            typeValue: false,
            firstChange: true,
            tableList: [],
            tableData: [],
            weekList: [],
            isScorllBarH: true,
            isScorllBarW: true,
            config: {
                fixedWidth: '80px',
                defaultWidth: '90px'
            },
            codeList: {
                'btn_pk_kb_clazztotal_see': false,
                'btn_pk_kb_clazztotal_download': false,
                'btn_pk_kb_clazztotal_print': false,
                'btn_pk_kb_teachertotal_see': false,
                'btn_pk_kb_teachertotal_download': false,
                'btn_pk_kb_teachertotal_print': false
            }
        }
    },
    created() {
        if(this.type) {
            this.$parent.$emit('currentPage', '/pk/kb/clazztotal');
            getRcCodeList('category_pk_clazz_kb_total', this.codeList).then(() => {
                this.init()

            })
        } else {
            this.$parent.$emit('currentPage', '/pk/kb/teachertotal');
            getRcCodeList('category_pk_teacher_kb_total', this.codeList).then(() => {
                this.init()

            })
        }
        if(navigator.userAgent.indexOf('Trident') > -1 || (navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1)) {
            this.scrollW = 18
        }
    },
    watch: {
        typeValue: function(n, o) {
            if (n) {
                this.$nextTick(() => {
                    var right_div2 = this.$refs.right_div2;
                    if (right_div2) {
                        right_div2.onscroll = function() {
                            var right_div2_top = this.scrollTop;
                            var right_div2_left = this.scrollLeft;
                            document.getElementById("left_div2").scrollTop = right_div2_top;
                            document.getElementById("right_div1").scrollLeft = right_div2_left;
                        }
                    }
                })

            } else {
                this.$nextTick(() => {
                    var right_div2 = this.$refs.right_div2_;
                    if (right_div2) {
                        right_div2.onscroll = function() {
                            var right_div2_top = this.scrollTop;
                            var right_div2_left = this.scrollLeft;
                            document.getElementById("left_div2_").scrollTop = right_div2_top;
                            document.getElementById("right_div1_").scrollLeft = right_div2_left;
                        }
                    }
                })
            }
        }
    },
    updated: function() {
        this.$nextTick(function() {
            this.checkScorll()
        })
    },
    methods: {
        checkScorll(t) {
            let box = null
            if (this.typeValue) {
                box = this.$refs.right_div2;
            } else {
                box = this.$refs.right_div2;
            }
            let _box = '';
            if (box) {
                _box = box.firstChild
            }
            if (box && _box) {
                this.isScorllBarW = (this.tableList.length + 2) * parseFloat(this.config.defaultWidth) > box.offsetWidth ? true : false;
                this.isScorllBarH = _box.offsetHeight > box.offsetHeight ? true : false;
            }
        },
        init() {
            //初始化
            this.rightValue = [this.type ? '教师' : '班级', '场地']
            config.getYears(this.unitId).then((data) => {
                if (data && data.status == 200 && data.data.length > 0) {
                    data.data.forEach(val => {
                        this.yearOptions.push({
                            value: val.year
                        })
                        if (val.current) {
                            this.yearValue = val.year
                        }
                    })
                }
            })
            config.getBb('XQ').then(data => {
                if (data && data.status == 200 && data.data.length > 0) {
                    this.weekList = data.data
                    config.getFestival({ unitId: this.unitId }).then((data) => {
                        if (data && data.status == 200 && data.data.length > 0) {
                            this.weekList.forEach(_w => {
                                data.data.forEach(val => {
                                    this.tableList.push({
                                        name: val.name,
                                        id: _w.id + "_" + val.id
                                    })
                                })
                            })
                        }
                    })
                }
            })

        },
        yearChange(value) {
            //学年change事件
            config.getTerms(this.unitId, this.yearValue).then((data) => {
                if (data && data.status == 200 && data.data.length > 0) {
                    this.termOptions = data.data
                    let tV = ""
                    data.data.forEach(val => {
                        if (val.current) {
                            tV = val.schoolTerm
                        }
                    })
                    this.yearChanging = false
                    if (!tV) {
                        this.termValue = "1"
                    } else {
                        this.termValue = tV;
                    }
                    setTimeout(() => {
                        this.yearChanging = true
                        this.termChange()
                    }, 0)
                } else {
                    this.tableData = []
                    this.emptyText = "暂无数据";
                }
            })
        },
        termChange(value) {
            //学期change事件
            if (!this.yearChanging) return;
            config.getWeeks({ year: this.yearValue, term: this.termValue }).then((data) => {
                if (data && data.status == 200 && data.data.length > 0) {
                    this.weekOptions = data.data;
                    let wV = ""
                    for (let val of this.weekOptions) {
                        if (val.current == "true") {
                            wV = val.week
                            break
                        }
                    }
                    this.termChanging = false
                    if (!wV) {
                        this.weekValue = 1
                    } else {
                        this.weekValue = wV
                    }
                    setTimeout(() => {
                        this.termChanging = true
                        this.weekChange()
                    }, 0)
                } else {
                    this.tableData = []
                    this.emptyText = "暂无数据";
                }
            })
        },
        weekChange(value) {
            //周次change事件
            if (!this.termChanging) return;
            this.gradeOptions = []
            this.gradeValue = ""
            config.getGrades({
                type: 'open',
                year: this.yearValue,
                term: this.termValue,
                unitId: this.unitId,
                week: this.weekValue
            }).then((data) => {
                if (data && data.status == 200) {
                    this.gradeOptions = data.data
                    this.weekChanging = false
                    this.gradeValue = data.data[0].gradeId
                    setTimeout(() => {
                        this.weekChanging = true
                        this.gradeChange()
                    }, 0)
                    this.initing = true
                } else {
                    this.tableData = []
                    this.emptyText = "暂无数据";
                }
            })
        },
        gradeChange(value) {
            //年级change事件
            console.log(this.weekChanging,this.initing)
            if (!this.weekChanging) return;
            this.getTable()
        },
        getTable() {
            //表格内容获取
            if (!this.initing) return;
            if (this.unitId && this.yearValue && this.termValue && this.gradeValue && this.weekValue) {
                this.emptyText = "正在加载中...";
                let gData = {
                    flag: this.type,
                    unitId: this.unitId,
                    year: this.yearValue,
                    term: this.termValue,
                    gradeId: this.gradeValue,
                    week: this.weekValue,
                };

                if (!this.type) {
                    gData.keyWord = this.keyValue
                }
                let arr = []
                this.tableData = []
                config.getTable(gData).then((data) => {
                    if (data && data.status == 200 && data.data.length > 0) {
                        data.data.forEach((val, idx) => {
                            arr.push({
                                teacherName: val.teacherName,
                                className: val.className,
                                classShortName: val.classShortName,
                                courseSheets: [],
                                roomName: val.roomName ? val.roomName.name : "",
                            })
                            for (let i = 0; i < this.tableList.length; i++) {
                                let isEmpty = true;
                                for (let j = 0; j < val.courseSheets.length; j++) {
                                    if (this.tableList[i].id == val.courseSheets[j].weekId + "_" + val.courseSheets[j].festivalId) {
                                        isEmpty = false

                                        let names = []
                                        let pNames = []
                                        if (!this.type) {
                                            val.courseSheets[j].classNames.forEach(v => {
                                                pNames.push(v.name ? v.name : v.shortName)
                                            })
                                        }
                                        let room = []
                                        val.courseSheets[j].roomNames.forEach(v => {
                                            room.push(v.name ? v.name : v.shortName)
                                        })

                                        arr[idx].courseSheets.push({
                                            courseName: val.courseSheets[j].courseName,
                                            courseShortName: val.courseSheets[j].courseShortName,
                                            teacherNames: this.type ? val.courseSheets[j].teacherNames : pNames.join(","),
                                            roomNames: room.join(",")
                                        })
                                        break;
                                    }
                                }
                                if (isEmpty) {
                                    arr[idx].courseSheets.push({
                                        teacherName: "",
                                        courseName: "",
                                        courseShortName: "",
                                        teacherNames: "",
                                        roomNames: ""
                                    })
                                }
                            }
                        })
                        this.tableData = arr;
                    } else {
                        this.emptyText = "暂无数据";
                    }
                    if (this.firstChange && !this.typeValue) {
                        this.firstChange = false;
                        this.$nextTick(() => {
                            this.typeValue = true;
                        })
                    }
                    this.$nextTick(() => {
                        if (this.typeValue) {
                            var right_div2 = this.$refs.right_div2;
                            if (right_div2) {
                                right_div2.onscroll = function() {
                                    var right_div2_top = this.scrollTop;
                                    var right_div2_left = this.scrollLeft;
                                    document.getElementById("left_div2").scrollTop = right_div2_top;
                                    document.getElementById("right_div1").scrollLeft = right_div2_left;
                                }
                            }

                        } else {
                            var right_div2 = this.$refs.right_div2_;
                            if (right_div2) {
                                right_div2.onscroll = function() {
                                    var right_div2_top = this.scrollTop;
                                    var right_div2_left = this.scrollLeft;
                                    document.getElementById("left_div2_").scrollTop = right_div2_top;
                                    document.getElementById("right_div1_").scrollLeft = right_div2_left;
                                }
                            }
                        }
                    })
                })
            }
        },
        handlePrint() {
            //打印
            this.$print(this.typeValue ? '#print1' : '#print2', { style: 'table li{list-style-type: none;line-height: 22px;}' })
        },
        handleIconClick() {
            this.getTable()
        }
    },
}