import {
    getYear,
    getTerm,
    getWeek,
    getDate,
    getBb,
    getFestival,
    getJyz,
    getGrade,
    getCourse
} from './request.js'
export default {
    data() {
        return {
            year: "",
            years: [],
            term: "",
            termId: "",
            terms: [],
            week: "",
            weeks: [],
            grade: "",
            grades: [],
            course: "",
            courses: [],
            Jyz: "",
            Jyzs: [],
            xqs: [],
            festivals: [],
            emptyText: '正在加载中...',
            tableDate: []
        }
    },
    created() {
        getYear({
            unitId: this.$store.state.unitId,
        }).then(res => {
            if (res && res.status == 200 && res.data && res.data.length > 0) {
                this.years = res.data
                this.$nextTick(() => {
                    res.data.forEach(_y => {
                        if (_y.current) {
                            this.year = _y.year
                        }
                    })
                    getTerm({
                        unitId: this.$store.state.unitId,
                        year: this.year
                    }).then(data => {
                        if (data && data.status == 200 && data.data && data.data.length > 0) {
                            this.terms = data.data
                            this.$nextTick(() => {
                                data.data.forEach(_t => {
                                    if (_t.current) {
                                        this.termId = _t.id
                                        this.term = _t.schoolTerm
                                    }
                                })
                                getGrade({
                                    unitId: this.$store.state.unitId,
                                }).then(res => {
                                    if (res && res.status == 200 && res.data && res.data.length > 0) {
                                        this.grades = res.data
                                        this.$nextTick(() => {
                                            this.grade = this.grades[0].id
                                            getCourse({
                                                yearValue: this.year,
                                                termValue: this.term,
                                                gradeId: this.grade,
                                            }).then(data => {
                                                if (data && data.status == 200 && data.data && data.data.length > 0) {
                                                    this.courses = data.data
                                                }
                                            })
                                        })
                                    }
                                })
                                this.getDate({
                                    unitId: this.$store.state.unitId,
                                    year: this.year,
                                    term: this.termId,
                                    week: 1,
                                    solutionId: '1'
                                })
                            })
                        }
                    })
                })
            }
        })
        getJyz({
            unitId: this.$store.state.unitId,
            organizationType: this.$store.state.unitType
        }).then(res => {
            if (res && res.status == 200 && res.data && res.data.length > 0) {
                this.Jyzs = res.data
                this.$nextTick(() => {
                    this.Jyz = this.Jyzs[0].id
                })
            }
        })
    },
    methods: {
        getDate(params) {
            let arr = []
            return new Promise((resolve, reject) => {
                getDate(params).then(res => {
                    if (res && res.status == 200 && res.data && res.data.length > 0) {
                        getFestival({ unitId: this.$store.state.unitId, }).then(data => { //查询节次列表
                            if (data && data.status == 200 && data.data && data.data.length > 0) {
                                this.festivals = data.data
                                getBb('XQ').then(xq => { //查询星期
                                    if (xq && xq.status == 200 && xq.data && xq.data.length > 0) {
                                        this.xqs = xq.data
                                        let course = []
                                        resolve
                                        return data.data
                                    }
                                })
                            }
                        })
                    }
                })
            })
        },
        yearChange() {
            getTerm({
                unitId: this.$store.state.unitId,
                year: this.year
            }).then(data => {
                if (data && data.status == 200 && data.data && data.data.length > 0) {
                    this.terms = data.data
                    this.$nextTick(() => {
                        data.data.forEach(_t => {
                            if (_t.current) {
                                this.termId = _t.id
                                this.term = _t.schoolTerm
                            }
                        })
                    })
                }
            })
        },
        termChange() {
            getGrade({
                unitId: this.$store.state.unitId,
            }).then(res => {
                if (res && res.status == 200 && res.data && res.data.length > 0) {
                    this.grades = res.data
                    this.$nextTick(() => {
                        this.grade = this.grades[0].id
                        getCourse({
                            yearValue: this.year,
                            termValue: this.term,
                            gradeId: this.grade,
                        }).then(data => {
                            if (data && data.status == 200 && data.data && data.data.length > 0) {
                                this.courses = data.data
                            }
                        })
                    })
                }
            })
        },
        JyzChange() {},
        gradeChange() {
            getCourse({
                yearValue: this.year,
                termValue: this.term,
                gradeId: this.grade,
            }).then(data => {
                if (data && data.status == 200 && data.data && data.data.length > 0) {
                    this.courses = data.data
                }
            })
        },
        courseChange() {},
    },
}