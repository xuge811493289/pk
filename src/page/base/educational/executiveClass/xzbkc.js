import _ from 'lodash';
import {
    getClassCourseTree,
    getGradeCourseList,
    updataGradeCourse,
    deleteGradeCourses,
    getUnitClassListByUnitId,
    addGradeCourse,
    updataClass,
    deleteClass,
    addClass,
    getUnitClassListByGrade,
    getClassByGradId,
    addGradeCourses,
    getGradByUnitId,
    getClassTree,
    getAllYearList,
    getClassList
} from './request.js';
import config from './config.js';
import pager from '../../config.js';
import { getRcCodeList } from '../../request.js';

export default {
    name: 'teacher',
    components: {

    },
    data() {
        return {
            chkboxType: {
                "Y": "ps",
                "N": "ps"
            },
            defaultChecked: [],
            currentChexedKeys: [],
            openOrHide: '/common/images/left.png',
            emptyText: '暂无数据',
            emptyTreeText: '正在加载中...',
            emptyauthText: '正在加载中...',
            data: [],
            gradeData: [],
            courseData: [],
            classData: [],
            isGrade: true,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            gradeTableData: [],
            classTableData: [],
            multipleSelectionGrade: [],
            multipleSelectionClass: [],
            gradeColums: config.gradeColums,
            classColums: config.classColums,
            form: {
                term: '1',
                year: ''
            },
            yearList: [],
            termList: [],
            currentUnitId: '',
            currentGradId: '',
            currentClassId: '',
            currentNode: [],
            currentCourseId: [],
            currentUnit: '',
            currentNodeKey: '',
            oldTreeData: [],
            filterText: '',
            weekHours: '',
            allHours: '',
            status: 'edit',
            editText: '修改',
            dialogAddOne: false,
            dialogAddMore: false,
            editForm: {
                yearValue: '',
                termValue: '',
                unitId: ''
            },
            selectedIds: [],
            courseIds: [],
            gradeIds: [],
            classIds: [],
            defaultExpandedkeys: [],
            isSchool: false,
            plsaveBtn: false,
            httpBtn: false,
            editBtn: false,
            deleteBtn: false,
            codeList: {
                'btn_base_classcourse_batch': false, // "批量"
                'btn_base_classcourse_add': false, // "新增"
                'btn_base_classcourse_update': false, // "修改"
                'btn_base_classcourse_delete': false, // "删除"
                'btn_base_classcourse_sync': false, // ""强制同步""
            }
        }
    },
    beforeCreate() {

    },
    watch: {
        // filterText(val) {
        //     if (val) {
        //         this.$refs.tree.filter(val);
        //     } else {
        //         this.getTree();
        //     }

        // }
    },
    created() {
        this.$parent.$emit('currentPage', '/base/executiveClass');
        // 获取权限
        getRcCodeList('category_base_classcourse', this.codeList).then(() => {
            this.getYearList();
        });
    },
    methods: {
        checkedNode(nodes) {
            console.log(nodes);
            this.currentChexedKeys = nodes.allCeckNodes;
        },
        // 过滤
        handleIconClick() {
            console.log(this.filterText);
            if (this.filterText) {
                this.$refs.tree.filter(this.filterText);
            } else {
                this.getTree();
            }

        },
        filterNode(value, data) {
            if (!value) return true;
            if (data.name) {
                return data.name.indexOf(value) !== -1;
            };
        },
        make(datas, idprop, pIdprop) {
            if (!idprop) {
                idprop = 'id';
            }
            if (!pIdprop) {
                pIdprop = 'parentId';
            }
            let nodes = [];
            let jyuarr = [];
            for (var i = 0; i < datas.length; i++) {

                let d = datas[i];
                if (d.type == 'unit') {
                    d.sort = 1;
                }
                if (d.unitType * 1 === 1) {
                    if (_.find(datas, { domPid: d.domId })) {
                        datas.push({
                            name: "本单位年级",
                            type: "bdwgrade",
                            domId: "bdwgrade_" + d.id,
                            domPid: d.domId,
                            sort: -10,
                            parentId: d.id
                        });
                        jyuarr.push(d.id);
                    }
                }
            }
            jyuarr.forEach((_j, i) => {
                datas.forEach((_obj, index) => {
                    if (_obj.type === 'grade' && _obj.domPid === 'unit_' + _j) {
                        _obj.domPid = 'bdwgrade_' + _j;
                        _obj.type = 'bdwgrade';
                    }
                })
            });
            let c = function(obj) {
                let _c = [];
                for (let i = 0; i < datas.length; i++) {
                    let _d = _.cloneDeep(datas[i]);
                    if (_d[pIdprop + ''] == obj[idprop + '']) {
                        _c.push(_d);
                        c(_d);
                    }
                }
                if (obj.type === 'grade') {
                    obj.children = [{}]
                } else {
                    // obj.children = _c.sort((a, b) => {
                    //     return a.sort > b.sort
                    // });
                    obj.children = _.sortBy(_c, function(item) {
                        return item.sort;
                    });
                }
            };
            for (let i = 0; i < datas.length; i++) {
                let _d = _.cloneDeep(datas[i]);
                if ((!_d[pIdprop + ''] && _d[pIdprop + ''] != '') || (!_.result(_.find(datas, {
                        [idprop]: _d[pIdprop + '']
                    }), idprop))) {
                    c(_d);
                    nodes.push(_d);
                }
            }
            return nodes;

        },
        // 获取组织架构树
        getTree() {
            this.emptyTreeText = '正在加载中...';
            getClassTree({ showUnitGrade: true }).then((data) => {
                if (data && data.data.length > 0) {
                    // console.log(data);
                    this.oldTreeData = _.cloneDeep(data.data);
                    this.data = this.make(data.data, 'domId', 'domPid');
                    let current = this.data[0];
                    this.currentNodeKey = current.id;
                    this.defaultExpandedkeys = [current.id];
                    this.currentUnitId = current.id;;
                    let currentObj = _.find(this.oldTreeData, { id: current.id });
                    this.currentUnit = currentObj.name;
                } else {
                    this.data = [];
                    this.emptyTreeText = '暂无数据';
                }
            })
        },
        // 获取学年
        getYearList() {
            getAllYearList().then((data) => {
                this.yearList = [];
                if (data.data && data.data.length > 0) {
                    data.data.forEach((_d, i) => {
                        this.yearList.push({
                            label: _d.year,
                            value: _d.year
                        });
                        if (_d.current) {
                            this.form.year = _d.year
                        }
                    })
                }
            })
        },
        // 获取年级课程
        getGradeCourseList() {
            this.currentCourseId = [];
            this.gradeTableData = [];
            if (!this.currentGradId) {
                return;
            }
            if (!this.currentUnitId) {
                return;
            }
            this.emptyText = '正在加载中...';
            getGradeCourseList(this.currentGradId, this.form.year, this.form.term, this.currentUnitId).then((data) => {
                let list = data.data;
                if (list && list.length > 0) {
                    list.forEach((_data, i) => {
                        _data.isEdit = false;
                        this.currentCourseId.push(_data.courseId);
                    })
                    this.gradeTableData = list;
                } else {
                    this.gradeTableData = [];
                    this.emptyText = '暂无数据';
                }
            })
        },
        // 改变学年 刷新列表
        changeYear(val) {
            this.form.year = val;
            this.currentGradId = '';
            this.currentUnitId = '';
            this.getTree();
            if (this.isGrade) {
                this.getGradeCourseList();
            } else {
                this.getClassList();
            }
        },
        // 改变学期 刷新列表
        changeTerm(val) {
            this.form.term = val;
            this.currentGradId = '';
            this.currentUnitId = '';
            this.getTree();
            if (this.isGrade) {
                this.getGradeCourseList();
            } else {
                this.getClassList();
            }
        },
        // 编辑课程
        updataGradeCourse(msg) {
            this.editBtn = true;
            updataGradeCourse(msg).then((data) => {
                this.editBtn = false;
                if (data && data.status && data.status === 200 && data.code === 'ok' && data.data === 'success') {
                    this.editText = '修改';
                    this.status = 'edit';
                    this.$notify.success({
                        title: '成功',
                        message: '修改成功',
                        offset: 20
                    });
                    this.getGradeCourseList();
                } else {
                    // this.$notify.error({
                    //     title: '错误',
                    //     message: _.map(data.fieldErrors, 'message').join(',') + '！',
                    //     offset: 20
                    // });
                }
            })
        },
        // 编辑操作
        handlerEdit(status) {
            if (status === 'edit') {
                if (this.isGrade) {
                    if (this.multipleSelectionGrade.length === 0) {
                        this.$notify.info({
                            title: '提示',
                            message: '请选择至少一个',
                            offset: 20
                        });
                    } else {
                        this.multipleSelectionGrade.map((item) => {
                            item.isEdit = true;
                        })
                        this.editText = '保存';
                        this.status = 'save';
                    }
                } else {
                    if (this.multipleSelectionClass.length === 0) {
                        this.$notify.info({
                            title: '提示',
                            message: '请选择至少一个',
                            offset: 20
                        });
                    } else {
                        this.multipleSelectionClass.map((item) => {
                            item.isEdit = true;
                        })
                        this.editText = '保存';
                        this.status = 'save';
                    }
                }
            } else if (status === 'save') {
                this.editForm.yearValue = this.form.year;
                this.editForm.termValue = this.form.term;
                this.editForm.unitId = this.currentUnitId;
                if (this.isGrade) {
                    let gradVMS = {};
                    this.editForm.gradeId = this.currentGradId;
                    let pass = false;
                    if (this.multipleSelectionGrade.length > 0) {
                        this.multipleSelectionGrade.forEach((_grad, i) => {
                            gradVMS[`gradeCourseRDataFormVMS[${i}].courseId`] = _grad.courseId;
                            gradVMS[`gradeCourseRDataFormVMS[${i}].id`] = _grad.id;
                            if (!_grad.sumHour && _grad.sumHour != 0) {
                                console.log(_grad.weekHour, _grad.sumHour);
                                pass = false;
                            } else {
                                if (_grad.weekHour * 1 > _grad.sumHour * 1) {
                                    pass = true;
                                }
                            }

                            if (_grad.weekHour * 1 != 0) {
                                gradVMS[`gradeCourseRDataFormVMS[${i}].weekHour`] = _grad.weekHour * 1;
                            }
                            if (_grad.sumHour * 1 != 0) {
                                gradVMS[`gradeCourseRDataFormVMS[${i}].sumHour`] = _grad.sumHour * 1;
                            }
                        });
                        if (pass) {
                            this.$notify.error({
                                title: '错误',
                                message: '周课时数不能大于总课时数！',
                                offset: 20
                            });
                            return
                        }
                        this.updataGradeCourse({...gradVMS, ...this.editForm });
                    } else {
                        this.editText = '修改';
                        this.status = 'edit';
                        this.getGradeCourseList();
                    }
                } else {
                    let classVMS = {};
                    if (this.multipleSelectionClass.length > 0) {
                        this.multipleSelectionClass.forEach((_grad, i) => {
                            classVMS[`clazzCourseRDataFormVMS[${i}].id`] = _grad.id;
                            if (_grad.weekHour * 1 !== 0) {
                                classVMS[`clazzCourseRDataFormVMS[${i}].weekHour`] = _grad.weekHour * 1;
                            }
                        })
                        this.updataClassCourse({...classVMS, ...this.editForm });
                    } else {
                        this.editText = '修改';
                        this.status = 'edit';
                        this.getClassList();
                    }

                }
            } else if (status === 'remove') {
                if (this.isGrade) {
                    if (this.multipleSelectionGrade.length === 0) {
                        this.$notify.info({
                            title: '提示',
                            message: '请选择至少一个课程删除',
                            offset: 20
                        });
                    } else {
                        let ids = [];
                        this.multipleSelectionGrade.forEach((_d, i) => {
                            ids.push(_d.id);
                        })
                        this.editText = '保存';
                        this.status = 'save';
                        this.$confirm('是否确定删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.deleteGradeCourses({
                                unitId: this.currentUnitId,
                                termValue: this.form.term,
                                yearValue: this.form.year,
                                gradeId: this.currentGradId,
                                ids: ids.join(',')
                            });
                        }).catch(() => {

                        });
                    }
                } else {
                    if (this.multipleSelectionClass.length === 0) {
                        this.$notify.info({
                            title: '提示',
                            message: '请选择至少一个课程删除',
                            offset: 20
                        });
                    } else {
                        let classIds = [];
                        this.multipleSelectionClass.forEach((_d, i) => {
                            classIds.push(_d.id);
                        })
                        this.editText = '保存';
                        this.status = 'save';
                        this.$confirm('此操作将永久删除这些课程吗, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.deleteClass({
                                yearValue: this.form.year,
                                termValue: this.form.term,
                                unitId: this.currentUnitId,
                                ids: classIds.join(',')
                            });
                        }).catch(() => {

                        });
                    }
                }
            }
        },
        // 修改班级课程
        updataClassCourse(obj) {
            updataClass(obj).then((data) => {
                // console.log(data);
                if (data.data === 'success') {
                    this.editText = '修改';
                    this.status = 'edit';
                    this.$notify.success({
                        title: '成功',
                        message: '修改成功',
                        offset: 20
                    });
                    this.getClassList();
                }
            })
        },
        // 树节点点击事件
        handleNodeClick(data) {
            // console.log(data);
            this.editText = '修改';
            this.status = 'edit';
            if (data.unitType * 1 === 2) {
                this.isSchool = true;
            } else if (data.unitType * 1 === 1) {
                this.isSchool = false;
            }
            if (data.type === 'unit') {
                this.currentUnitId = data.id;
                this.currentUnit = data.name;
                this.currentClassId = '';
                this.currentGradId = '';
                this.gradeTableData = [];
                this.classTableData = [];
                this.emptyText = '暂无数据';
            } else if (data.type === 'grade') {
                this.isGrade = true;
                this.currentClassId = '';
                this.currentUnit = data.name;
                this.currentUnitId = data.parentId;
                this.currentGradId = data.id;
                this.getGradeCourseList();
                data.children = [];
                getClassByGradId({
                    gradeId: data.id,
                    schoolterm: this.form.term,
                    year: this.form.year
                }).then((cl) => {
                    if (cl && cl.data && cl.data.length > 0) {
                        cl.data.forEach((_cl, i) => {
                            _cl.type = 'clazz';
                            _cl.unitType = null;
                            _cl.parentId = data.id;
                        })
                        data.children = cl.data;
                    } else {
                        data.children = [];
                    }
                })
            } else if (data.type === 'clazz') {
                this.isGrade = false;
                this.currentGradId = data.parentId;
                this.currentUnit = data.name;
                this.currentClassId = data.id;
                let parent = _.find(this.oldTreeData, { id: data.parentId });
                this.currentUnitId = parent.parentId;
                this.getClassList();
            } else if (data.type === 'bdwgrade') {
                this.isGrade = true;
                this.currentGradId = data.id;
                this.currentUnitId = data.parentId;
                this.getGradeCourseList();
            }
        },
        // 删除年级课程
        deleteGradeCourses(obj) {
            this.deleteBtn = true;
            deleteGradeCourses(obj).then((data) => {
                this.deleteBtn = false;
                if (data && data.status && data.status === 200 && data.code === 'ok' && data.data === 'success') {
                    this.$notify.success({
                        title: '成功',
                        message: '删除成功'
                    });
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: _.map(data.fieldErrors, 'message').join(','),
                        offset: 20
                    });
                }
                this.getGradeCourseList();
            })
        },
        // 删除班级课程
        deleteClass(obj) {
            this.deleteBtn = true;
            deleteClass(obj).then((data) => {
                this.deleteBtn = false;
                if (data && data.status && data.status === 200 && data.code === 'ok' && data.data === 'success') {
                    this.$notify.success({
                        title: '成功',
                        message: '删除成功',
                        offset: 20
                    });
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: _.map(data.fieldErrors, 'message').join(','),
                        offset: 20
                    });
                }
                this.getClassList();
            })
        },
        handleSelectionChangeGrade(val) {
            this.multipleSelectionGrade = val;
        },
        handleSelectionChangeClass(val) {
            this.multipleSelectionClass = val;
        },
        // 打开批量新增
        openDialogAddMore() {
            this.plsaveBtn = false;
            // this.$refs.tree3.setCheckedKeys([]);
            this.defaultChecked = [];
            this.$refs.tree4.setCheckedKeys([]);
            this.gradeIds = [];
            this.classIds = [];
            this.courseIds = [];
            this.classData = [];
            getClassCourseTree({
                unitId: this.currentUnitId,
                term: this.form.term,
                year: this.form.year
            }).then((data) => {
                if (data && data.data && data.data.length > 0) {
                    let arr = [];
                    data.data.forEach((_d, i) => {
                        _d.children = [];
                        if (_d.type !== 'unit') {
                            arr.push(_d)
                        }
                    })
                    this.gradeData = this.$data2tree(arr, 'domId', 'domPid');
                } else {
                    this.gradeData = [];
                }
                getUnitClassListByUnitId(this.currentUnitId).then((data) => {
                    if (data && data.data && data.data.length > 0) {
                        let oldTreeData = _.cloneDeep(data.data);
                        let arr = [];
                        oldTreeData.forEach((_d, i) => {
                            if (_d.nodeAttribute === 'course') {
                                _d.isSshowCheckBox = true;
                            }
                            // if (!_.find(this.gradeTableData, { courseId: _d.id })) {
                            //     arr.push(_d);
                            // }
                        })
                        this.classData = this.$data2tree(oldTreeData, 'id', 'parentId');
                    } else {
                        this.classData = [];
                    }
                    this.dialogAddMore = true;
                })
            })

        },
        // 批量新增
        submitNewList() {
            let arrs = this.currentChexedKeys;
            let courseIds = this.$refs.tree4.getCheckedKeys();
            console.log(arrs);
            if (arrs.length === 0) {
                this.$notify({
                    title: '提示',
                    message: '请选择年级班级！',
                    type: 'warning',
                    offset: 20
                });
                return
            }
            if (courseIds.length === 0) {
                this.$notify({
                    title: '提示',
                    message: '请选择课程！',
                    type: 'warning',
                    offset: 20
                });
                return
            }
            let classIds = [],
                gradeIds = [];
            arrs.forEach((_arr, i) => {
                if (_arr.type === 'grade') {
                    gradeIds.push(_arr.id);
                } else if (_arr.type === 'clazz') {
                    classIds.push(_arr.id);
                }
            })
            if (arrs.length === 0 && courseIds.length === 0) {
                this.dialogAddMore = false;
                return;
            }
            let obj = {
                courseIds: courseIds.join(','),
                gradeIds: gradeIds.join(','),
                classIds: classIds.join(','),
                yearValue: this.form.year,
                termValue: this.form.term,
                unitId: this.currentUnitId
            };
            this.plsaveBtn = true;
            addGradeCourses(obj).then((data) => {
                if (data && data.status && data.status === 200 && data.data === 'success') {
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success',
                        offset: 20
                    });
                    this.dialogAddMore = false
                    if (this.isGrade) {
                        this.getGradeCourseList();
                    } else {
                        this.getClassList();
                    }
                }
                this.plsaveBtn = true;
            })
        },
        // 打开单个新增
        openDialogAddOne() {
            if (!this.currentGradId) {
                this.$notify.info({
                    title: '消息',
                    message: '请选择年级或者班级',
                    offset: 20
                });
                return;
            }
            this.httpBtn = false;
            this.courseIds = [];
            this.selectedIds = [];
            if (this.isGrade) {
                this.getUnitClassListByUnitId();
            } else {
                this.getUnitClassListByGrade();
            }
            // this.dialogAddOne = true;
        },
        // 新增年级课程
        addGradeCourse(obj) {
            this.httpBtn = true;
            addGradeCourse(obj).then((data) => {
                this.httpBtn = false;
                if (data && data.status && data.status === 200 && data.code === 'ok') {
                    this.dialogAddOne = false;
                    this.getGradeCourseList();
                } else {
                    this.$notify.error({
                        title: '失败',
                        message: data.fieldErrors,
                        offset: 20
                    });
                }
            })
        },
        // 提交新增
        saveNewClass() {
            let arr = this.$refs.tree2.getCheckedKeys();
            let obj = {
                yearValue: this.form.year,
                termValue: this.form.term,
                unitId: this.currentUnitId,
                courseIds: arr.join(',')
            }
            if (this.isGrade) {
                obj.gradeId = this.currentGradId;
                this.addGradeCourse(obj);
            } else {
                obj.classId = this.currentClassId;
                this.addClass(obj);
            }
        },
        // 添加班级课程
        addClass(obj) {
            this.httpBtn = true;
            addClass(obj).then((data) => {
                this.httpBtn = false;
                if (data && data.status && data.status === 200 && data.code === 'ok') {
                    this.dialogAddOne = false;
                    this.getClassList();
                } else {
                    this.$notify.error({
                        title: '失败',
                        message: data.fieldErrors,
                        offset: 20
                    });
                }
            })
        },
        // 根据年级查询课程
        getUnitClassListByGrade() {
            this.classData = [];
            if (!this.currentGradId) {
                this.$notify.info({
                    title: '消息',
                    message: '请选择年级或者班级添加课程',
                    offset: 20
                });
                return;
            }
            this.emptyauthText = '正在加载中...';
            getUnitClassListByGrade({
                gradeId: this.currentGradId,
                termValue: this.form.term,
                yearValue: this.form.year,
                unitId: this.currentUnitId
            }).then((data) => {
                let arr = [];
                this.dialogAddOne = true;
                if (data && data.data && data.data.length > 0) {
                    let oldTreeData = _.cloneDeep(data.data);
                    let arr = [];
                    oldTreeData.forEach((_d, i) => {
                        _d.isSshowCheckBox = true;
                        arr.push(_d);
                        // if (!_.find(this.classTableData, { courseId: _d.id })) {
                        //     arr.push(_d);
                        // }
                    })
                    this.classData = this.$data2tree(arr, 'id', 'parentId');
                    this.$refs.tree2.setCheckedKeys(_.map(this.classTableData, 'courseId'));
                } else {
                    this.classData = [];
                    this.emptyauthText = '暂无数据';
                }
            })
        },
        // 根据单位查询课程树
        getUnitClassListByUnitId() {
            this.classData = [];
            if (!this.currentUnitId) {
                this.$notify.info({
                    title: '消息',
                    message: '请选择组织添加课程',
                    offset: 20
                });
                return;
            }
            this.emptyauthText = '正在加载中...';
            getUnitClassListByUnitId(this.currentUnitId).then((data) => {
                this.dialogAddOne = true;
                if (data && data.data && data.data.length > 0) {
                    let oldTreeData = _.cloneDeep(data.data);
                    let arr = [];
                    oldTreeData.forEach((_d, i) => {
                        if (_d.nodeAttribute === 'course') {
                            _d.isSshowCheckBox = true;
                        }
                        arr.push(_d);
                        // if (!_.find(this.gradeTableData, { courseId: _d.id })) {
                        //     arr.push(_d);
                        // }
                    })
                    this.$refs.tree2.setCheckedKeys(_.map(this.gradeTableData, 'courseId'));
                    this.classData = this.$data2tree(arr, 'id', 'parentId');
                } else {
                    this.classData = [];
                    this.emptyauthText = '暂无数据';
                }

            })
        },
        // 获取班级下课程
        getClassList() {
            this.classTableData = [];
            this.emptyText = '正在加载中...';
            getClassList({
                classId: this.currentClassId,
                yearValue: this.form.year,
                termValue: this.form.term,
                unitId: this.currentUnitId
            }).then((data) => {
                if (data && data.status === 200) {
                    let list = data.data;
                    if (list && list.length > 0) {
                        list.forEach((_data, i) => {
                            _data.isEdit = false;
                        })
                        this.classTableData = list;
                    } else {
                        this.classTableData = [];
                        this.emptyText = '暂无数据';
                    }
                } else {

                }
            })
        },
        hanleBuleCheckNumber(row, key, num) {
            if (key == 'sumHour' && num < 1) {
                this.$notify({
                    message: "只能输入正整数！",
                    type: "warning"
                });
                row[key] = '';
            }
            if (num == 0.5) {
                return false;
            }
            if ((/^[0-9]+$/.test(num))) {
                if (num * 1 < 0) {
                    this.$notify({
                        message: key == "sumHour" ? "只能输入正整数！" : "只能输入正整数 和 0.5！",
                        type: "warning"
                    });
                    row[key] = '';
                    return false;
                } else {

                }
            } else {
                this.$notify({
                    message: key == "sumHour" ? "只能输入正整数！" : "只能输入正整数 和 0.5！",
                    type: "warning"
                });
                row[key] = '';
                return false;
            }
        }
    }
}