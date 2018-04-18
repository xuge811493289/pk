import {
    getYear,
    getTerm,
    getWeeks,
    getBb,
    getFestival,
    getPlaceTypes,
    getPlaceByTypeId,
    getPlaceTable,
} from './request'
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
            treeData:[],
            defaultExpandedKeys:[],
            currentNode:{},
            xqs: [],
            festivals: [],
            rightValue: ['班级' , '教师'],
            nameValue: true,
            typeValue: true,
            emptyText: '正在加载中...',
            emptyTextTable: '正在加载中...',
            tableData: [],
            tdData: [], //拿到的课表的原始数据
            row: [], //表头数据
            curTime: new Date(), //时间戳，用于阻止旧数据的展示
            codeList: {
                'btn_pk_place_table_see':false,
                'btn_pk_place_table_download': false,
                'btn_pk_place_table_print': false,
            }
        }
    },
    created() {
        getRcCodeList('category_pk_place_table', this.codeList).then(() => {
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
                    tableTitleName: _d.palceName,
                    tableTitleAddress: _d.palceAddress,
                    courseSheets: courseSheets
                })
                console.log("tableData:",_d,_d.placeName,_d.placeAddress)
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
            getPlaceTypes(this.$store.state.unitId).then(res=>{
                let arr = [];
                this.defaultExpandedKeys = [];
                res.forEach((_a,a)=>{
                    arr.push({
                        id: _a.id,
                        label: _a.name,
                        type: 'placeType',
                        clicked: false,
                        children: [{}]
                    })
                })
                this.treeData = arr;
                if(this.treeData.length>0) {
                    this.defaultExpandedKeys = [this.treeData[0].id];
                    this.handleNodeClick(this.treeData[0]);
                }
            })
        },
        handleNodeClick(data){
            this.currentNode = data;
            if(data.type=='placeType' && !data.clicked) {
                data.clicked = true;
                getPlaceByTypeId(data.id).then(res => {
                    let arr = [];
                    let ids = [];
                    res.forEach(v => {
                        arr.push({
                            id:v.id,
                            label:v.name,
                            address:v.address,
                            type:'place'
                        })
                        ids.push(v.id)
                    })
                    data.children = arr;
                    data.ids = ids;
                    if(ids.length < 1) {
                        this.tableData = [];
                        this.emptyTextTable = '暂无数据';
                        return;
                    }
                    this.getTableDate(getPlaceTable,{
                        roomIds:ids.join(','),
                        unitId:this.$store.state.unitId,
                        year:this.year,
                        term:this.term,
                        week:this.weekTh,
                    })
                })
            } else {
                if(data.type == 'placeType' && data.ids.length < 1) {
                    this.tableData = [];
                    this.emptyTextTable = '暂无数据';
                    return;
                }
                this.getTableDate(getPlaceTable,{
                    roomIds:data.type == 'placeType' ? data.ids.join(',') : data.id,
                    unitId:this.$store.state.unitId,
                    year:this.year,
                    term:this.term,
                    week:this.weekTh,
                })
            }
        },
        renderContent(h, { node, data, store }) {
            return (
                <span>
                    <span>
                    <i
                        style={{
                            display: data.type == 'placeType' ? "" : "none",
                            fontSize: "16px",
                            position: "relative",
                            top: "2px"
                        }}
                        class={{
                            fa: true,
                                "fa-folder-o": !node.expanded,
                                "fa-folder-open-o": node.expanded
                        }}
                        aria-hidden="true"
                    />
                    <i  style={{
                        display: data.type != 'placeType' ? "" : "none",
                        fontSize: "16px",
                        position: "relative",
                        top: "2px"
                        }}
                        class="fa fa-file-text-o"
                        aria-hidden="true"
                    />
                        <span> {node.label}</span>
                    </span>
                </span>
            );
        },
        handleIconClick() {
            this.getTableDate(getPlaceTable,{
                unitId:this.$store.state.unitId,
                year:this.year,
                term:this.term,
                week:this.weekTh,
                keyWord: this.keyWord || undefined
            })
        },
        //  打印
        print() {
            this.$print('#myTable');
        },
    },
}