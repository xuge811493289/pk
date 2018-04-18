import _ from 'lodash';
import {
    getTree,
    getTheacherList,
    getOrgByUnit,
    openCloseUser,
    getUserAuth,
    getRYCH,
    sortTeacher,
    getGrad,
    getClass,
    getExcelList,
    exportExcel,
    getTheacherById,
    deleteTeachers,
    validataEmail,
    validataIdcard,
    validataPin,
    validataMobile,
    validataAccount,
    getUsersRoles,
    roleDelegate,
    clearLoginErrorMsg,
    getGender,
    getOrgByUnitTree,
    updataTeacher,
    getNobuisiRole,
    getUnitClassListByUnitId,
    imgUrl,
    showImgUrl,
    addnewTeacher
} from '../request.js';
import { getRcCodeList } from '../../request.js';
import config from './config.js';
import pager from '../../config.js';
import Import from './Import.vue';
export default {
    name: 'teacher',
    components: {
        Import
    },
    data() {
        let checkLoginName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'));
            } else {
                if (this.oldTeacherName === value) {
                    callback()
                } else {
                    if (value.length > 50) {
                        return callback(new Error('长度小于于50位字符！'));
                    } else {
                        if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
                            return callback(new Error('只能输入字母、数字、下划线！'));
                        } else {
                            validataAccount(value).then((data) => {
                                // console.log(data);
                                if (data.data) {
                                    callback()
                                } else {
                                    callback(new Error('账号存在！'))
                                }
                            })
                        }
                    }
                }
            }
        };
        let checkPassword = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            } else {
                if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
                    return callback(new Error('只能输入字母、数字、下划线！'));
                } else {
                    if (value.length <= 16 && value.length >= 8) {
                        callback()
                    } else {
                        callback(new Error('长度在8~16位之间！'));
                    }
                }
            }
        };
        let checkPhone = (rule, value, callback) => {
            if (value) {
                if (this.oldloginMobile === value) {
                    callback();
                } else {
                    if (this.$checkPhoneNumber(value)) {
                        validataMobile(value).then((data) => {
                            if (!data.data) {
                                callback(new Error('手机号码已存在！'));
                                // setTimeout(() => {
                                //     this.editForm.loginMobile = '';
                                //     this.registerForm.loginMobile = '';
                                //     this.$refs.editForm.validateField('loginMobile');
                                //     this.$refs.registerForm.validateField('loginMobile');
                                // }, 500);
                            } else {
                                callback();
                            }
                        })
                    } else {
                        callback(new Error('手机号码格式有误！'));
                        // setTimeout(() => {
                        //     this.editForm.loginMobile = '';
                        //     this.registerForm.loginMobile = '';
                        //     this.$refs.editForm.validateField('loginMobile');
                        //     this.$refs.registerForm.validateField('loginMobile');
                        // }, 500);
                    }
                }
            } else {
                callback();
            }
        };
        let checkEmail = (rule, value, callback) => {
            if (value) {
                if (this.oldloginEmail === value) {
                    callback();
                } else {
                    if (this.$checkEmail(value)) {
                        if (value.length > 50) {
                            return callback(new Error('长度小于50个字符！'));
                        } else {
                            validataEmail(value).then((data) => {
                                if (!data.data) {
                                    callback(new Error('邮箱已存在！'));
                                    // setTimeout(() => {
                                    //     this.editForm.loginEmail = '';
                                    //     this.registerForm.loginEmail = '';
                                    //     this.$refs.editForm.validateField('loginEmail');
                                    //     this.$refs.registerForm.validateField('loginEmail');
                                    // }, 500);
                                } else {
                                    callback();
                                }
                            })
                        }
                    } else {
                        callback(new Error('邮箱格式有误！'));
                        // setTimeout(() => {
                        //     this.editForm.loginEmail = '';
                        //     this.registerForm.loginEmail = '';
                        //     this.$refs.editForm.validateField('loginEmail');
                        //     this.$refs.registerForm.validateField('loginEmail');
                        // }, 500);
                    }
                }
            } else {
                callback();
            }
        };
        let checkIdCard = (rule, value, callback) => {
            if (value) {
                if (this.oldidentificationNumber === value) {
                    callback();
                } else {
                    if (this.$checkIdCard(value)) {
                        validataIdcard(value).then((data) => {
                            if (!data.data) {
                                callback(new Error('身份证已存在！'));
                                // setTimeout(() => {
                                //     this.editForm.identificationNumber = '';
                                //     this.registerForm.identificationNumber = '';
                                //     this.$refs.editForm.validateField('identificationNumber');
                                //     this.$refs.registerForm.validateField('identificationNumber');
                                // }, 500);
                            } else {
                                callback();
                            }
                        })
                    } else {
                        callback(new Error('身份证格式有误！'));
                        // setTimeout(() => {
                        //     this.editForm.identificationNumber = '';
                        //     this.registerForm.identificationNumber = '';
                        //     this.$refs.editForm.validateField('identificationNumber');
                        //     this.$refs.registerForm.validateField('identificationNumber');
                        // }, 500);
                    }
                }
            } else {
                callback();
            }
        };
        let checkNumber = (rule, value, callback) => {
            if (value) {
                if (this.oldPin * 1 === value * 1) {
                    callback();
                } else {
                    if ((/^[0-9]+$/.test(value))) {
                        if (value * 1 < 0) {
                            return callback(new Error('请输入1-5位非负整数!'));
                        } else {
                            if (value.length > 5) {
                                return callback(new Error('请输入1-5位非负整数!'));
                            } else {
                                validataPin(this.listParmars.unitId, value).then((data) => {
                                    if (!data.data) {
                                        return callback(new Error('考勤号已存在！'));
                                    } else {
                                        callback();
                                    }
                                })
                            }
                        }
                    } else {
                        return callback(new Error('请输入1-5位非负整数!'));
                    }
                }
            } else {
                callback();
            }
        };
        let checkSort = (rule, value, callback) => {
            if (value) {
                if ((/^[0-9]+$/.test(value))) {
                    if (value * 1 < 0) {
                        return callback(new Error('请输入1-8位非负整数!'));
                    } else {
                        if (value.length > 8) {
                            return callback(new Error('请输入1-8位非负整数!'));
                        } else {
                            callback();
                        }
                    }
                } else {
                    return callback(new Error('请输入1-5位非负整数!'));
                }
            } else {
                callback();
            }
        };
        return {
            msg: '',
            emptyText: '正在加载中...',
            emptyTreeText: '正在加载中...',
            emptyauthText: '正在加载中...',
            isImport: true,
            isJUJ: false,
            uploaddata: {
                serverid: 'base',
                uploadtype: 'head'
            },
            ispassword: 'password',
            showImgUrl: '',
            editImgUrl: '',
            imgUrl: imgUrl,
            uploadId: '',
            editUploadId: '',
            activeNames: '',
            imgloading: false,
            keyWords: '',
            inputValue: '',
            currentText: '',
            currentNodeKey: '',
            openArrList: [],
            chenckedNode: [],
            checkListData: [],
            loading: false,
            authLoading: false,
            loadingRole: false,
            registerForm: {
                gender: '',
                address: '',
                identificationNumber: "",
                loginEmail: "",
                loginMobile: "",
                loginName: "",
                password: "",
                pin: '',
                realName: "",
                status: 0,
                unitId: '',
                img: '',
                rych: '',
                sort: ''
            },
            department: [],
            honoraryTitle: '',
            grade: [],
            addGrade: [],
            subject: [],
            courseIds: '',
            reqdepartment: [],
            reqgrade: [],
            reqsubject: [],
            departmentOptions: [], //所属部门
            gradeOptions: [], //所属年级
            honoraryTitleOptions: [], // 荣誉称号
            subjectOptions: [], // 所属课程
            registerFormRules: {
                realName: [
                    { required: true, message: '姓名不能为空!', trigger: 'blur' },
                    { min: 0, max: 50, message: '长度小于50个字符', trigger: 'blur' }
                ],
                address: [
                    { min: 0, max: 500, message: '家庭住址长度小于500个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: checkPassword, trigger: 'blur' }
                ],
                loginName: [
                    { required: true, validator: checkLoginName, trigger: 'blur' },
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' },
                ],
                loginMobile: [
                    { validator: checkPhone, trigger: 'blur' },
                ],
                loginEmail: [
                    { validator: checkEmail, trigger: 'blur' },
                ],
                identificationNumber: [
                    { validator: checkIdCard, trigger: 'blur' },
                ],
                pin: [
                    { validator: checkNumber, trigger: 'blur' },
                ],
                sort: [
                    { validator: checkSort, trigger: 'blur' },
                ],

            },
            editForm: {
                id: '',
                gender: '',
                address: '',
                identificationNumber: "",
                loginEmail: "",
                loginMobile: "",
                loginName: "",
                password: "shiyue_123",
                pin: '',
                realName: "",
                unitId: '',
                img: '',
                rych: '',
                sort: ''
            },
            oldPhoto: '',
            oldloginMobile: '',
            oldloginEmail: '',
            oldPin: '',
            oldidentificationNumber: '',
            downloadDatas: [],
            defaultSelected: [],
            downLoadForm: {
                unitId: null,
                departmentId: null,
                downloadOptions: []
            },
            registerDialog: false,
            sortingDialog: false,
            downLoadDialog: false,
            authorityDialog: false,
            editorDialog: false,
            delegateDialog: false,
            delegateData: [],
            multipleTable: [],
            multipleTable1: [],
            form: {
                text: ''
            },
            dialogFormVisible: false,
            dialogEditFormVisible: false,
            tableData: [],
            currentPage: 1,
            pageSizes: pager.pageSizes,
            pageSize: pager.pageSize,
            appColumn: config.list,
            totals: 0,
            data: [], //树结构数据
            oldTreeData: [],
            authData: [], // 权限树
            defaultProps: { //树结构关键字
                children: 'children',
                label: 'name'
            },
            multipleSelection: [], //多选
            multipleSelection1: [], //多选
            imageUrl: '',
            sortingData: [],
            oldSortingData: [],
            listParmars: { // 教师列表参数
                unitId: null,
                keyword: null,
                orgId: null,
                start: 1,
                size: 30
            },
            currentUnitId: '', // 当前选中的组织id
            oldTeacherName: '',
            filterText: '',
            genderOptions: [],
            courseTreeData: [],
            isHiddenTree: true,
            unitType: '',
            codeList: {
                'btn_base_teacher_register': false, // 注册
                'btn_base_teacher_import': false, // 导入
                'btn_base_teacher_sort': false, // 排序
                'btn_base_teacher_download': false, // 下载
                'btn_base_teacher_update': false, //修改
                'btn_base_teacher_showPer': false, // 权限
                'btn_base_teacher_delegate': false, // 委派
                'btn_base_teacher_logout': false, // 注销
                'btn_base_teacher_lock': false, // 锁定
                'btn_base_teacher_lock': false
            }
        }
    },
    watch: {
        'editForm.password': function(val, oldval) {
            if (val != 'shiyue_123') {
                this.ispassword = 'text';
            }
        },
        // filterText(val) {
        //     if (val) {
        //         this.$refs.tree.filter(val);
        //     } else {
        //         this.getTree();
        //     }
        // }
    },
    created() {
        this.$parent.$emit('currentPage', '/base/teachers');
        // 获取权限
        getRcCodeList('category_base_teacher', this.codeList).then(() => {
            this.getGender();
            this.getTree();
            this.getRYCH();
            this.getExcelList();
        });
    },
    mounted() {

    },
    methods: {
        // 查询Excel列
        getExcelList() {
            getExcelList().then((data) => {
                this.downloadDatas = [];
                if (data.data.length > 0) {
                    data.data.forEach((_d, i) => {
                        let value = '';
                        for (let key in _d) {
                            if (key !== 'required') {
                                value = key;
                            }
                        }
                        if (_d.required === "true") {
                            this.defaultSelected.push(value);
                        }
                        this.downloadDatas.push({
                            label: _d[value],
                            value: value,
                            isSelected: _d.required === "true" ? true : false
                        });
                    })
                }
            })
        },
        // 过滤
        handleIconClick() {
            if (this.filterText) {
                this.$refs.tree.filter(this.filterText);
            } else {
                this.getTree();
            }
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        make(datas, idprop, pIdprop) {
            if (!idprop) {
                idprop = 'id';
            }
            if (!pIdprop) {
                pIdprop = 'parentId';
            }
            let nodes = [];
            let pid = '';
            for (var i = 0; i < datas.length; i++) {
                let d = datas[i];
                if (d.unitType * 1 === 1) {
                    datas.push({
                        name: "本单位部门",
                        type: "zidingyi",
                        domId: "zidingyi_" + d.id,
                        domPid: d.domId,
                        sort: -100,
                        parentId: d.id
                    });
                    pid = d.domId;
                }
                if (d.type == "organization" && d.domPid === pid) {
                    d.domPid = 'zidingyi_' + d.unitId;
                }
            }
            let subNodes = [];
            let c = function(obj) {
                let _c = [];
                for (let i = 0; i < datas.length; i++) {
                    let _d = _.cloneDeep(datas[i]);
                    if (_d[pIdprop + ''] == obj[idprop + '']) {
                        _c.push(_d);
                        c(_d);
                    }
                }
                obj.children = _.sortBy(_c, function(item) {
                    return item.sort;
                });
                // obj.children = _c.sort((a, b) => { return a.sort > b.sort });
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
            getTree().then((data) => {
                if (data && data.data.length > 0) {
                    this.oldTreeData = _.cloneDeep(data.data);
                    this.data = this.make(data.data, 'domId', 'domPid');
                    if (this.oldTreeData.length === 1 && this.oldTreeData[0].unitType === 2) {
                        this.isHiddenTree = false;
                    } else {
                        this.isHiddenTree = true;
                    }
                    let params = this.$route.params;
                    let obj = '';
                    if (params.currentNodeKey) {
                        this.currentNodeKey = params.currentNodeKey;
                        obj = _.find(this.oldTreeData, { id: params.unitId });
                    } else {
                        obj = this.data[0];
                        this.currentNodeKey = obj.id;
                    }
                    if (obj.unitType === 1) {
                        this.isJUJ = false;
                    } else {
                        this.isJUJ = true;
                    }
                    this.unitType = obj.unitType;
                    this.listParmars.unitId = obj.id;
                    this.currentUnitId = obj.id;
                    this.openArrList.push(obj.id);
                    this.currentText = obj.name;
                    this.getTheacherList(this.listParmars);
                } else {
                    this.emptyTreeText = '暂无数据';
                }
            })
        },
        // 获取教职工列表
        getTheacherList(obj) {
            this.emptyText = '正在加载中...';
            getTheacherList(obj).then((data) => {
                if (data) {
                    // console.log(data);
                    this.tableData = data.data.list;
                    if (this.tableData.length === 0) {
                        this.emptyText = '暂无数据';
                    }
                    this.totals = data.data.total * 1;
                }
            })
        },
        // 提交编辑
        submitUpdata(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let baseobj = _.cloneDeep(this.editForm);
                    baseobj.password = this.editForm.password === 'shiyue_123' ? '' : this.editForm.password;
                    let orgList = {},
                        gradList = {},
                        subject = {};
                    if (this.department.length > 0) {
                        for (let i = 0; i < this.department.length; i++) {
                            orgList[`organizationListVMS[${i}].id`] = this.department[i];
                        }
                    }
                    if (this.grade.length > 0) {
                        for (let i = 0; i < this.grade.length; i++) {
                            gradList[`gradeSimpleVMS[${i}].id`] = this.grade[i];
                        }
                    }
                    if (this.subject.length > 0) {
                        for (let i = 0; i < this.subject.length; i++) {
                            subject[`courseSimpleVMS[${i}].id`] = this.subject[i];
                        }
                    }
                    let obj = {...baseobj, ...orgList, ...gradList, ...subject };
                    this.editBtn = true;
                    updataTeacher(obj).then((data) => {
                        this.editBtn = false;
                        if (data && data.code === 'ok') {
                            if (this.$isArry(data.data)) {
                                let msgList = _.map(data.data, 'message')
                                this.$notify({
                                    title: '错误',
                                    message: msgList.join('、'),
                                    type: 'error'
                                });
                            } else {
                                if (data.data.toLowerCase() === 'success') {
                                    this.$notify({
                                        title: '成功',
                                        message: '修改教职工成功！',
                                        type: 'success'
                                    });
                                    let userMsg = this.$getSess('user');
                                    if (userMsg && userMsg.data) {
                                        if (userMsg.data.additionalInformation.userId === this.editForm.id) {
                                            userMsg.data.additionalInformation.realName = this.editForm.realName;
                                            this.$setSess('user', userMsg);
                                            console.log('asdfasdfasdfasdfasdf---------------', userMsg)
                                            this.$parent.$emit('change-user-name', this.editForm.realName);
                                        }
                                    }
                                    this.getTheacherList(this.listParmars);
                                    this.editorDialog = false;
                                }
                            }
                        }
                    })
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        // 打开编辑弹框
        handleEdit(index, row) {
            this.editBtn = false;
            this.editForm.password = "shiyue_123";
            this.ispassword = 'password';
            this.editorDialog = true;
            this.loading = true;
            this.$refs.editForm.resetFields();
            this.departmentOptions = [];
            getOrgByUnitTree(this.currentUnitId).then((data) => {
                console.log('------1------', this.currentUnitId);
                if (data && data.data.length > 0) {
                    let tree = this.$data2tree(data.data, 'domId', 'domPid');
                    let newData = [];
                    let cen = 0;
                    let fun = function(arr, c) {
                        c += 1;
                        if (!arr && !arr.children) { return }
                        arr.forEach((_arr, i) => {
                            newData.push({
                                label: _arr.name,
                                value: _arr.id,
                                cen: c
                            })
                            if (_arr.children) {
                                fun(_arr.children, c)
                            }
                        })
                    }
                    fun(tree, 0);
                    this.departmentOptions = newData;
                    this.gradeOptions = [];
                }
                getGrad(this.currentUnitId).then((data) => {
                    if (data && data.data.length > 0) {
                        let arr = [];
                        data.data.forEach((_data, index) => {
                            if (_.find(this.reqgrade, { id: _data.id })) {
                                arr.push(_.find(this.reqgrade, { id: _data.id }));
                            }
                            this.gradeOptions.push({
                                label: _data.gradeName,
                                value: _data.id,
                                disabled: _.find(this.reqgrade, { id: _data.id }) ? _.find(this.reqgrade, { id: _data.id }).required : false
                            });
                        })
                        this.grade = _.map(arr, 'id')
                    }
                    this.subjectOptions = [];
                    getUnitClassListByUnitId(this.currentUnitId).then((data) => {
                        if (data && data.data.length > 0) {
                            let tree = this.$data2tree(data.data, 'id', 'parentId');
                            let newData = [];
                            let cen = 0;
                            let jcen = '';
                            let fun = function(arr, c) {
                                c += 1;
                                if (!arr && !arr.children) { return }
                                arr.forEach((_arr, i) => {
                                    if (_arr.nodeAttribute === 'course' && _arr.parentId) {
                                        newData.push({
                                            label: _arr.name,
                                            value: _arr.id,
                                            disabled: false,
                                            cen: c,
                                            children: _arr.children && _arr.children.length > 0 ? true : false
                                        })
                                    } else if (_arr.nodeAttribute === 'course' && !_arr.parentId) {
                                        newData.push({
                                            label: _arr.name,
                                            value: _arr.id,
                                            disabled: false,
                                            cen: c,
                                            children: _arr.children && _arr.children.length > 0 ? true : false
                                        })
                                    } else if (_arr.nodeAttribute === 'course_type') {
                                        newData.push({
                                            label: _arr.name,
                                            value: _arr.id,
                                            disabled: true,
                                            cen: c,
                                            children: _arr.children && _arr.children.length > 0 ? true : false
                                        })
                                        if (_arr.children) {
                                            jcen = cen;
                                            fun(_arr.children, c)
                                        }
                                    }
                                })
                            }
                            fun(tree, 0);
                            if (this.reqsubject.length > 0) {
                                this.reqsubject.forEach((_req, i) => {
                                    let reqs = _.find(newData, { value: _req.id });
                                    if (reqs) {
                                        reqs.disabled = true;
                                    }
                                })
                            }
                            this.subjectOptions = newData;
                        }
                        this.getTheacherById(row.id);
                    });
                });

            });

        },
        // 获取教职工/id
        getTheacherById(id) {
            this.subject = [];
            this.grade = [];
            this.department = [];
            getTheacherById(id).then((data) => {
                if (data && data.data) {
                    this.editForm.address = data.data.address;
                    this.editForm.id = data.data.id;
                    this.editForm.gender = data.data.gender + '' || '';
                    this.editForm.identificationNumber = data.data.identificationNumber;
                    this.editForm.loginEmail = data.data.loginEmail;
                    this.editForm.loginMobile = data.data.loginMobile;
                    this.editForm.loginName = data.data.loginName;
                    this.editForm.pin = data.data.pin;
                    this.editForm.sort = data.data.sort;
                    this.editForm.password = "shiyue_123";
                    this.editForm.realName = data.data.realName;
                    this.editForm.unitId = data.data.unitId;
                    this.editForm.rych = data.data.rych;
                    this.oldTeacherName = data.data.loginName;
                    this.oldloginMobile = data.data.loginMobile;
                    this.oldloginEmail = data.data.loginEmail;
                    this.oldidentificationNumber = data.data.identificationNumber;
                    this.editForm.img = data.data.img;
                    this.oldPhoto = data.data.img;
                    this.oldPin = data.data.pin;
                    if (data.data.img) {
                        this.editImgUrl = showImgUrl + data.data.img;
                    } else {
                        this.editImgUrl = this.imageUrl;
                    }
                    if (data.data.orgs && data.data.orgs.length > 0) {
                        this.reqdepartment = [];
                        for (let i = 0; i < data.data.orgs.length; i++) {
                            this.department.push(data.data.orgs[i].id);
                            // if (data.data.orgs[i].required) {
                            this.reqdepartment.push(data.data.orgs[i]);
                            // }
                        }
                    }
                    if (data.data.grades && data.data.grades.length > 0) {
                        this.reqgrade = [];
                        for (let i = 0; i < data.data.grades.length; i++) {
                            this.grade.push(data.data.grades[i].id);
                            // if (data.data.grades[i].required) {
                            this.reqgrade.push(data.data.grades[i]);
                            // }
                        }
                    }
                    if (data.data.courses && data.data.courses.length > 0) {
                        this.reqsubject = [];
                        for (let i = 0; i < data.data.courses.length; i++) {
                            this.subject.push(data.data.courses[i].id);
                            // if (data.data.courses[i].required) {
                            this.reqsubject.push(data.data.courses[i]);
                            // }
                        }
                    }
                    this.loading = false;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '获取用户信息失败'
                    });
                    this.loading = false;
                }
                this.loading = false;
            })
        },
        // 移除tag
        removeGradeTage(tag) {
            let obj = _.find(this.reqgrade, { id: tag.value });
            if (obj.required) {
                this.grade.push(tag.value);
                this.$notify.info({
                    title: '提示',
                    message: '不能修改此条目'
                });
            }
        },
        removeSubjectTage(tag) {
            let obj = _.find(this.reqsubject, { id: tag.value });
            if (obj.required) {
                this.subject.push(tag.value);
                this.$notify.info({
                    title: '提示',
                    message: '不能修改此条目'
                });
            }
        },
        removeOrgTage(tag) {
            if (_.find(this.reqdepartment, { id: tag.value })) {
                this.department.push(tag.value);
                this.$notify.info({
                    title: '提示',
                    message: '不能修改此条目'
                });
            }
        },
        // 获取单位下部门
        getSelectOrgList(id) {
            this.departmentOptions = [];
            getOrgByUnitTree(id).then((data) => {
                if (data && data.data.length > 0) {
                    let tree = this.$data2tree(data.data, 'domId', 'domPid');
                    let newData = [];
                    let cen = 0;
                    let fun = function(arr, c) {
                        c += 1;
                        if (!arr && !arr.children) { return }
                        arr.forEach((_arr, i) => {
                            newData.push({
                                label: _arr.name,
                                value: _arr.id,
                                cen: c
                            })
                            if (_arr.children) {
                                fun(_arr.children, c)
                            }
                        })
                    }
                    fun(tree, 0);
                    this.departmentOptions = newData;
                }
            });
        },
        // 获取性别
        getGender() {
            getGender().then((data) => {
                this.genderOptions = []
                if (data && data.data.length > 0) {
                    // console.log(data);
                    data.data.forEach((_data, index) => {
                        this.genderOptions.push({
                            label: _data.name,
                            value: _data.value
                        });
                    })
                }
            })
        },
        // 获取荣誉称号
        getRYCH() {
            this.honoraryTitleOptions = [];
            getRYCH().then((data) => {
                if (data && data.data.length > 0) {
                    // console.log(data);
                    data.data.forEach((_data, index) => {
                        this.honoraryTitleOptions.push({
                            label: _data.name,
                            value: _data.value
                        });
                    })
                }
            })
        },
        // 获取年级
        getSelectGradeList(id) {
            this.gradeOptions = [];
            getGrad(id).then((data) => {
                this.gradeOptions = [];
                // console.log(this.reqgrade);
                if (data && data.data.length > 0) {
                    let arr = [];
                    data.data.forEach((_data, index) => {
                        if (_.find(this.reqgrade, { id: _data.id })) {
                            arr.push(_.find(this.reqgrade, { id: _data.id }));
                        }
                        this.gradeOptions.push({
                            label: _data.gradeName,
                            value: _data.id,
                            disabled: _.find(this.reqgrade, { id: _data.id }) ? _.find(this.reqgrade, { id: _data.id }).required : false
                        });
                    })
                    this.grade = _.map(arr, 'id');
                    // console.log(arr);
                }
            });
        },
        // 获取课程
        getSelectCourseList(id) {
            this.subjectOptions = [];
            getUnitClassListByUnitId(id).then((data) => {
                if (data && data.data.length > 0) {
                    let tree = this.$data2tree(data.data, 'id', 'parentId');
                    // console.log(tree);
                    let newData = [];
                    let cen = 0;
                    let jcen = '';
                    let fun = function(arr, c) {
                        c += 1;
                        if (!arr && !arr.children) { return }
                        arr.forEach((_arr, i) => {
                            if (_arr.nodeAttribute === 'course' && _arr.parentId) {
                                newData.push({
                                    label: _arr.name,
                                    value: _arr.id,
                                    disabled: false,
                                    cen: c,
                                    children: _arr.children && _arr.children.length > 0 ? true : false
                                })
                            } else if (_arr.nodeAttribute === 'course' && !_arr.parentId) {
                                newData.push({
                                    label: _arr.name,
                                    value: _arr.id,
                                    disabled: false,
                                    cen: c,
                                    children: _arr.children && _arr.children.length > 0 ? true : false
                                })
                            } else if (_arr.nodeAttribute === 'course_type') {
                                newData.push({
                                    label: _arr.name,
                                    value: _arr.id,
                                    disabled: true,
                                    cen: c,
                                    children: _arr.children && _arr.children.length > 0 ? true : false
                                })
                                if (_arr.children) {
                                    jcen = cen;
                                    fun(_arr.children, c)
                                }
                            }
                        })
                    }
                    fun(tree, 0);
                    // console.log(this.reqsubject);
                    if (this.reqsubject.length > 0) {
                        this.reqsubject.forEach((_req, i) => {
                            let reqs = _.find(newData, { value: _req.id });
                            if (reqs) {
                                reqs.disabled = true;
                            }
                        })
                    }
                    this.subjectOptions = newData;
                }
            });
        },
        // 打开新增弹出框
        handleRegisterDialog() {
            console.log(this.grade);
            this.addNewBtn = false;
            this.showImgUrl = this.imageUrl;
            this.oldloginMobile = '';
            this.oldloginEmail = '';
            this.reqsubject = [];
            this.oldidentificationNumber = '';
            this.$emptyObj(this.registerForm);
            this.addGrade = [];
            this.$refs.registerForm.resetFields();
            this.department = this.listParmars.orgId ? [this.listParmars.orgId] : [];

            console.log(this.grade);
            this.subject = [];
            this.getSelectOrgList(this.currentUnitId);
            if (this.isJUJ) {
                this.getSelectGradeList(this.currentUnitId);
                this.getSelectCourseList(this.currentUnitId);
            }
            this.registerDialog = true;
        },
        // 提交新增教职工
        submitNewUser(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.registerForm.status = 0;
                    this.registerForm.img = this.uploadId;
                    this.registerForm.unitId = this.currentUnitId;
                    let orgList = {},
                        gradList = {},
                        subject = {};
                    if (this.department.length > 0) {
                        for (let i = 0; i < this.department.length; i++) {
                            orgList[`organizationListVMS[${i}].id`] = this.department[i];
                        }
                    }
                    if (this.addGrade.length > 0) {
                        for (let i = 0; i < this.addGrade.length; i++) {
                            gradList[`gradeSimpleVMS[${i}].id`] = this.addGrade[i];
                        }
                    }
                    if (this.subject.length > 0) {
                        for (let i = 0; i < this.subject.length; i++) {
                            subject[`courseSimpleVMS[${i}].id`] = this.subject[i];
                        }
                    }
                    let obj = {...this.registerForm, ...orgList, ...gradList, ...subject };
                    this.addnewTeacher(obj);
                } else {
                    return false;
                }
            });
        },
        // 新增教职工
        addnewTeacher(obj) {
            this.addNewBtn = true;
            addnewTeacher(obj).then((data) => {
                this.addNewBtn = false;
                if (data && data.data) {
                    if (this.$isArry(data.data)) {
                        let msgList = _.map(data.data, 'message')
                        this.$notify({
                            title: '错误',
                            message: msgList.join('、'),
                            type: 'error'
                        });
                    } else {
                        if (data.data.toLowerCase() === 'success' || data.data === null) {
                            this.$notify({
                                title: '成功',
                                message: '添加教职工成功！',
                                type: 'success'
                            });
                            this.getTheacherList(this.listParmars);
                            this.registerDialog = false;
                        }
                    }
                }
            })
        },
        // 批量删除
        deleteTeachers(list) {
            this.deleteBtn = true;
            deleteTeachers({ ids: list }).then((data) => {
                this.deleteBtn = false;
                if (data && data.code === 'ok') {
                    this.$notify({
                        title: '成功',
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.getTheacherList(this.listParmars);
                }
            })
        },
        // 注销教师
        handleDelegateTeacher() {
            if (this.multipleSelection.length === 0) {
                this.$notify({
                    title: '警告',
                    message: '没有选中',
                    type: 'warning'
                });
            } else {
                this.$confirm('是否确定注销?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let parmars = [];
                    if (this.multipleSelection.length > 0) {
                        this.multipleSelection.forEach((_mu, i) => {
                            parmars.push(_mu.id);
                        })
                    }
                    if (parmars.length > 0) {
                        this.deleteTeachers(parmars.join(','));
                    }
                }).catch(() => {

                });
            }

        },
        // 打开下载弹出框
        handleDownLoadDialog() {
            // 初始化
            this.downLoadForm.departmentId = null;
            this.getSelectOrgList(this.currentUnitId);
            this.downLoadDialog = true;
        },
        // 确认下载
        downLoad() {
            let obj = {
                unitId: this.currentUnitId,
                downloadOptions: this.downLoadForm.downloadOptions.join(','),
                departmentId: this.downLoadForm.departmentId || null
            };
            // console.log(obj);
            if (obj.unitId) {
                this.$downloade('/api/base/teacher/download', 'POST', obj);
                this.downLoadDialog = false;
                this.downLoadForm.downloadOptions = this.defaultSelected;
            } else {
                this.$notify({
                    title: '提示',
                    message: '请选择组织机构后点击下载',
                    type: 'warning'
                });
            }
        },
        handleSearchIconClick(ev) {
            // console.log(this.keyWords);
            this.listParmars.keyword = this.keyWords;
            this.getTheacherList(this.listParmars);
        },
        handleAvatarSuccess(res, file) {
            this.imgloading = false;
            // console.log(res)
            if (res.status === 200) {
                if (res.data && !res.data.error) {
                    // this.$notify.success({
                    //     message: res.data.msg
                    // });
                    this.uploadId = res.data.id;
                    this.showImgUrl = showImgUrl + res.data.id;
                } else {
                    this.isHaveImg = false;
                }
            } else {
                this.$notify.error({
                    message: res.data.msg || res.message
                });
                this.isHaveImg = false;
            }
        },
        handleAvatarSuccess1(res, file) {
            this.imgloading = false;
            // console.log(res)
            if (res.status === 200) {
                if (res.data && !res.data.error) {
                    // this.$notify.success({
                    //     message: res.data.msg
                    // });
                    this.editImgUrl = showImgUrl + res.data.id;
                    this.editForm.img = res.data.id;
                }
            } else {
                this.$notify.error({
                    message: res.data.msg || res.message
                });
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            if ((isJPG || isPNG) && isLt2M) {
                this.imgloading = true;
            } else {
                this.imgloading = false;
            }
            return (isJPG || isPNG) && isLt2M;
        },
        // 表格复选事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSelectable(row, index) {
            return row.admin === 1 ? false : true;
        },
        // 关键字搜索事件
        handleNodeClick(data) {
            this.unitType = data.unitType;
            if (data.unitType === 1) {
                this.isJUJ = false;
            } else {
                this.isJUJ = true;
            }
            this.currentNodeKey = data.id;
            this.listParmars.page = 1;
            this.keyWords = '';
            this.listParmars.keyword = '';
            if (data.type === 'unit' || data.type === 'root') {
                this.listParmars.unitId = data.id;
                this.listParmars.orgId = '';
                this.currentUnitId = data.id;
                this.currentText = data.name;
                this.getTheacherList(this.listParmars);
            } else if (data.type === 'organization') {
                this.listParmars.unitId = data.unitId;
                this.currentUnitId = data.unitId;
                this.listParmars.orgId = data.id;
                this.getTheacherList(this.listParmars);
            } else if (data.type === 'zidingyi') {
                this.listParmars.unitId = data.parentId;
                this.currentUnitId = data.parentId;
                this.listParmars.orgId = '';
                this.getTheacherList(this.listParmars);
            }
        },
        // 跳转导入页面
        toImportMsg() {
            this.$router.push({ 
                //name: 'teachersImport', 
                path:'/pk/manager/baseData/teacherImport',
                params: { unitId: this.currentUnitId, currentNodeKey: this.currentNodeKey, unitType: this.unitType } });
        },
        // 分页事件
        handleCurrentChange(val) {
            this.listParmars.start = val;
            this.getTheacherList(this.listParmars);
        },
        // 查看权限
        handleAuthority(index, row) {
            if (row && row.id) {
                this.authData = [];
                this.authorityDialog = true;
                this.emptyauthText = '正在加载中...';
                getUserAuth(row.id).then((data) => {
                    if (data && data.data.length > 0) {
                        this.authData = data.data;
                    } else {
                        this.emptyauthText = '暂无数据';
                    }
                });
            }
        },
        // 打开委派弹出框
        openDelegateDialog() {
            // console.log(this.multipleSelection);
            if (this.multipleSelection.length > 0) {
                this.loadingRole = true;
                let userIds = _.map(this.multipleSelection, 'id');
                getUsersRoles(userIds.join(',')).then((data) => {
                    // console.log(data);
                    if (data && data.code === 'ok') {
                        let arrs = data.data;
                        // 获取角色
                        getNobuisiRole({
                            unitId: this.currentUnitId
                        }).then((data) => {
                            // console.log(data);
                            if (data && data.data.length > 0) {
                                this.delegateData = data.data;
                                let selectArr = [];
                                if (arrs.length > 0) {
                                    arrs.forEach((_arr, i) => {
                                        selectArr.push(_.find(this.delegateData, { id: _arr }));
                                    })
                                }
                                // console.log(selectArr);
                                setTimeout(() => {
                                    if (selectArr) {
                                        selectArr.forEach(row => {
                                            this.$refs.multipleTable1.toggleRowSelection(row, true);
                                        });
                                    }
                                }, 500)
                                this.loadingRole = false;
                            } else {
                                this.loadingRole = false;
                                this.delegateData = [];
                            }
                        })
                    } else {
                        this.loadingRole = false;
                    }
                    this.delegateDialog = true;
                })
            } else {
                // this.$notify.info({
                //     title: '提示',
                //     message: '请选择至少一个教师后在执行委派操作'
                // });
            }
        },
        // 提交角色委派结果
        handleDelegateDialog() {
            this.roleDelegate();
        },
        handleSelectionChange1(val) {
            this.multipleSelection1 = val;
        },
        // 角色委派
        roleDelegate() {
            let roleIds = [];
            // console.log(this.multipleSelection1);
            let userIds = [];
            if (this.multipleSelection1.length > 0) {
                this.multipleSelection1.forEach((_role, index) => {
                    if (_role) {
                        roleIds.push(_role.id);
                    }
                })
            }
            console.log('sdfasdfasdf---', roleIds.join(','));
            if (this.multipleSelection.length > 0) {
                this.multipleSelection.forEach((_role, index) => {
                    userIds.push(_role.id);
                })
            }
            this.authBtn = true;
            roleDelegate(roleIds.length > 0 ? roleIds.join(',') : '', userIds.join(',')).then((data) => {
                this.authBtn = false;
                if (data && data.code === 'ok') {
                    this.$notify({
                        title: '成功',
                        message: '委派成功！',
                        type: 'success'
                    });
                    this.delegateDialog = false;
                }

            })
        },
        // 修改状态 0-禁用 1-启用
        handleTeacherOpen(row) {
            let status = 0;
            let id = '';
            status = row.status === 1 ? 0 : 1;
            id = row.id;
            if (id) {
                openCloseUser(id, status).then((data) => {
                    if (data && data.code === 'ok') {
                        this.$notify({
                            title: '成功',
                            message: '操作成功!',
                            type: 'success'
                        });
                        this.getTheacherList(this.listParmars);
                    }
                })
            }
        },
        // 打开排序弹出框
        openSortingDialog() {
            this.sortingDialog = true;
            this.sortingData = [];
            this.oldSortingData = [];
            getTheacherList({
                unitId: this.currentUnitId
            }).then((data) => {
                if (data && data.data && data.data.list && data.data.list.length > 0) {
                    // console.log(data);
                    data.data.list.forEach((_data, i) => {
                        this.sortingData.push({
                            id: _data.id,
                            account: _data.loginName,
                            name: _data.realName,
                            sort: _data.sort
                        });
                        this.oldSortingData.push({
                            id: _data.id,
                            account: _data.loginName,
                            name: _data.realName,
                            sort: _data.sort
                        });
                    })
                } else {
                    this.sortingData = [];
                }
            })
        },
        saveSortingDialog() {
            let isEdit = false;
            this.oldSortingData.forEach((_old, i) => {
                if (_old.sort !== this.sortingData[i].sort) {
                    isEdit = true;
                }
            })
            let obj = {};
            if (isEdit) {
                this.sortingData.forEach((_sort, i) => {
                    obj[`teacherSorts[${i}].id`] = _sort.id;
                    obj[`teacherSorts[${i}].sort`] = _sort.sort;
                })
                sortTeacher(obj).then((data) => {
                    // console.log(data);
                    this.$notify({
                        title: '成功',
                        message: '修改排序成功',
                        type: 'success'
                    });
                    this.getTheacherList(this.listParmars);
                    this.sortingDialog = false;
                })
            } else {
                this.$notify({
                    title: '提示',
                    message: '没有任何改动',
                    type: 'info'
                });
                this.sortingDialog = false;
            }
        },
        // 清除用户错误登录信息
        handleClearMsg(index, row) {
            clearLoginErrorMsg(row.id).then((data) => {
                if (data && data.code == 'ok') {
                    if (data.data == 'success') {
                        this.$notify({
                            title: '成功',
                            message: '操作成功！',
                            type: 'success'
                        });
                    }
                } else {
                    this.$notify({
                        title: '成功',
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        }
    }
}
