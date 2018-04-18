import {
    getClassCourseTree,
    getClassTree,
    getClassByGradId,
    getStudentList,
    addNewStudentList,
    deleteStudent,
    getFreeStudentList,
    getClassStudentList,
    validataAccount,
    validataNumber,
    openCloseUser,
    validataEmail,
    validataIdcard,
    validataPin,
    clearLoginErrorMsg,
    validataMobile,
    getUserAuth,
    getStudentExcelList,
    getGrad,
    getClassList,
    deleteStudents,
    getStudentById,
    getGender,
    updataStudent,
    getStudentType,
    imgUrl,
    checkStudentTypeName,
    showImgUrl,
    updataStudentType,
    addStudentType,
    deleteStudentType
} from '../request.js';
import { getRcCodeList } from '../../request.js';
import _ from 'lodash';
import config from './config.js';
import pager from '../../config.js';
export default {
    name: 'students',
    mixins: [],
    components: {

    },
    data() {
        let checkStudentType_name = (rule, value, callback) => {
            // console.log(value);
            if (!value) {
                return callback(new Error('学生类型不能为空！'));
            } else {
                if (value.length > 50) {
                    return callback(new Error('长度小于50位字符！'));
                } else {
                    if (this.oldStudentTypeName === value) {
                        return callback()
                    } else {
                        checkStudentTypeName({
                            name: value,
                            unitId: this.listParmars.unitId
                        }).then((data) => {
                            // console.log(data);
                            if (data.data) {
                                return callback()
                            } else {
                                return callback(new Error('学生类型已存在！'))
                            }
                        })
                    }
                }

            }
        };
        let checkLoginName = (rule, value, callback) => {
            // console.log(value);
            if (!value) {
                return callback(new Error('账号不能为空！'));
            } else {
                if (value.length > 50) {
                    return callback(new Error('长度小于50位字符！'));
                } else {
                    if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
                        return callback(new Error('只能输入字母、数字、下划线！'));
                    } else {
                        if (this.oldloginName === value) {
                            callback()
                        } else {
                            validataAccount(value).then((data) => {
                                // console.log(data);
                                if (data.data) {
                                    callback()
                                } else {
                                    callback(new Error('账号已存在！'))
                                }
                            })
                        }
                    }

                }

            }
        };
        let checkStudentNumber = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('入学学号不能为空！'));
            } else {
                if (value.length > 49) {
                    callback(new Error('长度不能大于50！'));
                } else {
                    if (!(/^[a-zA-Z0-9]+$/.test(value))) {
                        return callback(new Error('只能输入字母、数字！'));
                    } else {
                        if (this.oldNumber === value) {
                            callback();
                        } else {

                            validataNumber(this.listParmars.unitId, value).then((data) => {
                                if (data.data) {
                                    callback()
                                } else {
                                    callback(new Error('入学学号已存在！'))
                                }
                            })
                        }
                    }
                }
            }
        };
        let checkPassword = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空！'));
            } else {
                if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
                    callback(new Error('只能输入字母、数字、下划线！'));
                    setTimeout(() => {
                        this.registerForm.parentLoginPasswd = '';
                        this.editForm.parentLoginPasswd = '';
                    }, 100);
                } else {
                    if (value.length <= 16 && value.length >= 8) {
                        callback()
                    } else {
                        callback(new Error('长度在8~16位之间！'));
                    }
                }
            }
        };
        let checkPpassword = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
                    callback(new Error('只能输入字母、数字、下划线！'));
                    // setTimeout(() => {
                    //     this.editForm.parentLoginPasswd = '';
                    //     this.registerForm.parentLoginPasswd = '';
                    //     this.$refs.editForm.validateField('parentLoginPasswd');
                    //     this.$refs.registerForm.validateField('parentLoginPasswd');
                    // }, 500);
                } else {
                    if (value.length <= 16 && value.length >= 8) {
                        callback()
                    } else {
                        callback(new Error('长度在8~16位之间！'));
                        // setTimeout(() => {
                        //     this.editForm.parentLoginPasswd = '';
                        //     this.registerForm.parentLoginPasswd = '';
                        //     this.$refs.editForm.validateField('parentLoginPasswd');
                        //     this.$refs.registerForm.validateField('parentLoginPasswd');
                        // }, 500);
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
        // let checkPphone = (rule, value, callback) => {
        //     if (value) {
        //         if (this.oldparentPhone === value) {
        //             callback();
        //         } else {
        //             if (this.$checkPhoneNumber(value)) {
        //                 callback();
        //             } else {
        //                 callback(new Error('手机号码格式有误！'));
        //                 // setTimeout(() => {
        //                 //     this.editForm.parentPhone = '';
        //                 //     this.registerForm.parentPhone = '';
        //                 //     this.$refs.editForm.validateField('parentPhone');
        //                 //     this.$refs.registerForm.validateField('parentPhone');
        //                 // }, 500);
        //             }
        //         }
        //     } else {
        //         callback();
        //     }
        // };
        var checkPphone = (rule, value, callback) => {
            if (this.$checkContact(value)) {
                return callback();
            }
            return callback(new Error("联系电话输入有误！"))
        };
        let checkEmail = (rule, value, callback) => {
            if (value) {
                if (this.oldloginEmail === value) {
                    callback();
                } else {
                    if (this.$checkEmail(value)) {
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
                if (this.oldPin == value) {
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
                                        // setTimeout(() => {
                                        //     this.editForm.pin = '';
                                        //     this.registerForm.pin = '';
                                        //     this.$refs.editForm.validateField('pin');
                                        //     this.$refs.registerForm.validateField('pin');
                                        // }, 500);
                                    } else {
                                        callback();
                                    }
                                })
                            }
                        }
                    } else {
                        callback(new Error('请输入1-5位非负整数!'));
                        // setTimeout(() => {
                        //     this.editForm.pin = '';
                        //     this.registerForm.pin = '';
                        //     this.$refs.editForm.validateField('pin');
                        //     this.$refs.registerForm.validateField('pin');
                        // }, 500);
                    }
                }
            } else {
                callback();
            }
        };
        let parentAccount = (rule, value, callback) => {
            // console.log(value);
            if (!value) {
                return callback(new Error('家长账号不能为空！'));
            } else {
                if (value.length > 50) {
                    return callback(new Error('长度小于50位字符！'));
                } else {
                    if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
                        return callback(new Error('只能输入字母、数字、下划线！'));
                    } else {
                        if (this.oldparentAccount === value) {
                            callback()
                        } else {
                            validataAccount(value).then((data) => {
                                // console.log(data);
                                if (data.data) {
                                    callback()
                                } else {
                                    callback(new Error('家长账号已存在！'))
                                }
                            })
                        }
                    }

                }

            }
        };
        let checkGrade1 = (rule, value, callback) => {
            console.log('----------', value, '+++++', this.editForm.gradeId);
            if (!this.editForm.gradeId) {
                return callback();
            } else {
                if (!this.editForm.classId) {
                    this.$refs.editForm.validateField('classId1');
                    return callback();
                } else {
                    return callback();
                }
            }

        };
        let checkClazz1 = (rule, value, callback) => {
            console.log('ashdjfhasdhfjhasdf', value, '+++++', this.editForm.gradeId);
            if (!this.editForm.classId) {
                if (this.editForm.gradeId) {
                    return callback(new Error('请选择班级！'));
                } else {
                    return callback();
                }
            } else {
                return callback();
            }
        };
        let checkGrade = (rule, value, callback) => {
            if (!value) {
                return callback();
            } else if (value && !this.registerForm.classId) {
                this.$refs.registerForm.validateField('classId');
                return callback();
            } else {
                return callback();
            }
        };
        let checkClazz = (rule, value, callback) => {
            if (!value) {
                if (this.registerForm.gradeId) {
                    return callback(new Error('请选择班级！'));
                } else {
                    return callback();
                }
            } else {
                return callback();
            }
        };
        return {
            emptyText: '正在加载中...',
            emptyTreeText: '正在加载中...',
            emptyauthText: '正在加载中...',
            imgUrl: imgUrl,
            showImgUrl: '',
            uploaddata: {
                serverid: 'base',
                uploadtype: 'head',
                userId: undefined
            },
            uploadId: '',
            editUploadId: '',
            oldloginName: '',
            oldparentAccount: '',
            imgloading: false,
            registerFormRules: {
                realName: [
                    { required: true, message: '姓名不能为空!', trigger: 'blur' },
                    { min: 0, max: 50, message: '长度小于50个字符', trigger: 'blur' }
                ],
                loginPasswd: [
                    { required: true, validator: checkPassword, trigger: 'blur' }
                ],
                loginName: [
                    { required: true, validator: checkLoginName, trigger: 'blur' },
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change,blur' },
                ],
                parentAccount: [
                    { required: true, validator: parentAccount, trigger: 'blur' }
                ],
                studentType: [
                    { required: true, message: '请选择学生类型', trigger: 'change' }
                ],
                number: [
                    { required: true, validator: checkStudentNumber, trigger: 'blur' }
                ],
                parentLoginPasswd: [
                    { validator: checkPpassword, trigger: 'blur' }
                ],
                nationNumber: [
                    { min: 0, max: 50, message: '长度小于50个字符', trigger: 'blur' }
                ],
                bnxh: [
                    { min: 0, max: 50, message: '长度小于50个字符', trigger: 'blur' }
                ],
                xjfh: [
                    { min: 0, max: 50, message: '长度小于50个字符', trigger: 'blur' }
                ],
                yxjfh: [
                    { min: 0, max: 50, message: '长度小于50个字符', trigger: 'blur' }
                ],
                parentName: [
                    { min: 0, max: 50, message: '长度小于50个字符', trigger: 'blur' }
                ],
                address: [
                    { min: 0, max: 500, message: '家庭住址长度小于500个字符', trigger: 'blur' }
                ],
                loginMobile: [
                    { validator: checkPhone, trigger: 'blur' }
                ],
                identificationNumber: [
                    { validator: checkIdCard, trigger: 'blur' }
                ],
                loginEmail: [
                    { validator: checkEmail, trigger: 'blur' }
                ],
                pin: [
                    { validator: checkNumber, trigger: 'blur' }
                ],
                parentPhone: [
                    { validator: checkPphone, trigger: 'blur' }
                ]
            },
            inputValue: '',
            currentText: '',
            genderOptions: [],
            registerForm: {
                address: '',
                unitId: '', // 组织id
                gradeId: '', // 年级id
                classId: '', // 班级id
                studentType: '', // 学生类型
                realName: '', // 姓名
                loginName: '', // 账号
                loginPasswd: '', // 密码
                gender: '', // 性别
                identificationNumber: '', // 身份证号
                loginMobile: '', // 手机号码
                loginEmail: '', // 邮箱
                pin: '', // 考勤号
                nationNumber: '', //全国学籍号
                yxjfh: '', // 原学籍副号
                xjfh: '', //学籍副号
                bnxh: '', // 班内学号
                number: '', // 入学学号
                parentPhone: '', // 家长电话
                parentLoginPasswd: '', // 家长密码
                parentName: '', // 家长姓名
                parentAccount: '', // 家长账号
            },
            editForm: {
                id: '',
                address: '',
                gradeId: '', // 年级id
                classId: '', // 班级id
                studentType: '', // 学生类型
                realName: '', // 姓名
                loginName: '', // 账号
                loginPasswd: 'shiyue_123', // 密码
                gender: '', // 性别
                identificationNumber: '', // 身份证号
                loginMobile: '', // 手机号码
                loginEmail: '', // 邮箱
                pin: '', // 考勤号
                nationNumber: '', //全国学籍号
                yxjfh: '', // 原学籍副号
                xjfh: '', //学籍副号
                bnxh: '', // 班内学号
                number: '', // 入学学号
                parentPhone: '', // 家长电话
                parentLoginPasswd: 'shiyue_123', // 家长密码
                parentName: '', // 家长姓名
                parentAccount: '', // 家长账号
                parentId: '',
                img: ''
            },
            oldPhoto: '',
            oldloginMobile: '',
            oldloginEmail: '',
            oldNumber: '',
            oldkqNumber: '',
            oldidentificationNumber: '',
            oldparentPhone: '',
            oldPin: '',
            downLoadForm: {
                unitId: null,
                gradeId: null,
                classId: null,
                downloadOptions: []
            },
            registerDialog: false,
            sortingDialog: false,
            downLoadDialog: false,
            authorityDialog: false,
            editorDialog: false,
            studentTypeDialog: false,
            addStudentTypeDialog: false,
            editorStudentTypeDialog: false,
            form: {
                text: ''
            },
            dialogFormVisible: false,
            dialogEditFormVisible: false,
            msg: 'Welcome to Your Vue.js App',
            tableData: [],
            currentPage: 1,
            pageSizes: pager.pageSizes,
            pageSize: pager.pageSize,
            appColumn: config.list,
            isvisible: false,
            obj: {
                color: '#f00'
            },
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            multipleSelection: [],
            isHasList: true,
            imageUrl: '/common/images/default.png',
            sortingData: [{
                account: '123456',
                name: '小刘',
                unit: '人事科',
                sort: 0
            }],
            studentTypeData: [],
            addStudentTypeForm: {
                id: null,
                name: '',
                sort: '',
                value: null
            },
            addStudentTypeFormRules: {
                sort: [
                    { required: true, message: '序号不能为空!' },
                    { type: 'number', message: '序号必须为数字值' }
                ],
                name: [
                    { required: true, validator: checkStudentType_name, trigger: 'blur' }
                ]
            },
            oldStudentTypeName: '',
            oldStudentTypeSort: '',
            editorStudentTypeForm: {
                id: null,
                name: '',
                sort: '',
                value: null
            },
            currentUnitId: '',
            currentgRadeId: '',
            currentClassId: '',
            listParmars: { // 列表参数
                unitId: null,
                keyword: null,
                start: 1,
                size: pager.pageSize,
                clazz: null,
                gradeId: null
            },
            passGradeId: '',
            passClazzId: '',
            oldFindStudentMsg: {},
            oldTreeData: [],
            currentNodeKey: '',
            defaultKeys: [],
            loading: false,
            loading1: false,
            totals: 0,
            treeData: [],
            authData: [],
            downloadDatas: [],
            defaultSelected: [],
            gradeOptions: [],
            classOptions: [],
            studentTypeOptions: [],
            isHaveClass: false,
            isNotSchool: false,
            ispassword: 'password',
            parentpassword: 'password',
            isHiddenTree: true,
            codeList: {
                'btn_base_student_register': false, // 注册
                'btn_base_student_import': false, // 导入
                'btn_base_student_tpye': false, // 学生类型
                'btn_base_student_studentId': false, // 学号
                'btn_base_student_sort': false, // 排序
                'btn_base_student_download': false, // 下载
                'btn_base_student_update': false, //修改
                'btn_base_student_showPermission': false, // 权限
                'btn_base_student_logout': false, // 注销
                'btn_base_student_lock': false, // 锁定
                'btn_base_student_dellock': false // 解锁
            },
            isEditSelectClazzId: false
        }
    },
    watch: {
        'registerForm.realName': function(newVal, oldVal) {
            if (!newVal) { return };
            setTimeout(() => {
                this.registerForm.parentName = newVal + '家长';
            }, 50)
        },
        'editForm.gradeId': function(newVal, oldVal) {
            if (!newVal) { return };
            if (newVal && !oldVal) { return }
            setTimeout(() => {
                this.editForm.classId = '';
            }, 50)
        },
        'registerForm.gradeId': function(newVal, oldVal) {
            if (!newVal) { return };
            if (newVal && !oldVal) { return }
            setTimeout(() => {
                this.registerForm.classId = '';
            }, 50)
        },
        'downLoadForm.gradeId': function(newVal, oldVal) {
            if (!newVal) { return };
            if (newVal && !oldVal) { return }
            setTimeout(() => {
                this.downLoadForm.classId = '';
            }, 50)
        },
        // inputValue: function(val) {
        //     if (val) {
        //         this.$refs.tree.filter(val);
        //     } else {
        //         this.getTree();
        //     }
        // }
    },
    created() {
        this.$parent.$emit('currentPage', '/base/students');
        // 获取权限
        getRcCodeList('category_base_student', this.codeList).then(() => {
            this.getTree();
            // 查询Excel列
            getStudentExcelList().then((data) => {
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
        });
    },
    methods: {
        passwordOnFocus() {
            this.editForm.loginPasswd = '';
            this.ispassword = 'text';
        },
        passwordParentOnFocus() {
            this.editForm.parentLoginPasswd = '';
            this.parentpassword = 'text';
        },
        // 树结构搜索
        // 过滤
        handleIconClick() {
            if (this.inputValue) {
                this.$refs.tree.filter(this.inputValue);
            } else {
                this.getTree();
            }
        },
        filterNode(value, data) {
            if (!value) return true;
            if (data.name) return data.name.indexOf(value) !== -1;
        },
        // 自动填充家长账号
        handleParentName() {
            this.registerForm.parentAccount = 'jz' + this.registerForm.loginName;
        },
        //自动填充家长密码
        handleParentPasswd() {
            this.registerForm.parentLoginPasswd = this.registerForm.loginPasswd;
        },
        make(datas, idprop, pIdprop) {
            if (!idprop) {
                idprop = 'id';
            }
            if (!pIdprop) {
                pIdprop = 'parentId';
            }
            let nodes = [];
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
                    obj.children = _.sortBy(_c, function(item) {
                        return item.sort;
                    });
                    // obj.children = _c.sort((a, b) => { return a.sort > b.sort });
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
            getClassTree().then((data) => {
                if (data && data.data.length > 0) {
                    console.log(data.data);
                    this.oldTreeData = _.cloneDeep(data.data);
                    if (this.oldTreeData.length === 1 && this.oldTreeData[0].unitType === 2) {
                        this.isHiddenTree = false;
                    } else {
                        this.isHiddenTree = true;
                    }
                    this.treeData = this.make(data.data, 'domId', 'domPid');
                    let obj = '';
                    let sessMsg = this.$route.params;
                    console.log(sessMsg);

                    console.log(data.data)

                    let arr = [];
                    let getId = function(child) {
                        if (!child && child.length > 0) { return };
                        child.forEach((_c, i) => {
                            if (_c.unitType === 2) {
                                arr.push(_c);
                            } else if (_c.unitType === 1 && _c.children.length > 0) {
                                getId(_c.children)
                            }
                        })
                    }
                    getId(this.treeData);

                    if (sessMsg.currentNodeKey) {
                        obj = _.find(this.oldTreeData, { id: sessMsg.parmas.unitId });
                        this.parmars = sessMsg.parmas;
                        if (sessMsg && sessMsg.parmas && sessMsg.parmas.clazz) {
                            this.currentNodeKey = sessMsg.parmas.gradeId;
                        } else {
                            this.currentNodeKey = sessMsg.currentNodeKey;
                        }
                    } else {
                        obj = arr[0];
                        this.currentNodeKey = obj.id;
                    }
                    this.defaultKeys.push(obj.id);
                    this.isNotSchool = true;
                    this.currentText = obj.name;
                    this.listParmars.unitId = obj.id;
                    this.getStudentList();

                } else {
                    this.emptyTreeText = '暂无数据';
                }
            })
        },
        // 树结构点击事件
        handleNodeClick(data) {
            console.log(data);
            this.isHaveClass = false;
            this.listParmars.keyword = null;
            this.currentNodeKey = data.id;
            if (data.unitType === 1) {
                this.isNotSchool = false;
            } else {
                this.isNotSchool = true;
            }
            if (data.type === 'unit') {
                this.isHaveClass = false;
                if (this.listParmars.clazz) {
                    this.listParmars.clazz = null;
                }
                if (this.listParmars.gradeId) {
                    this.listParmars.gradeId = null;
                }
                this.listParmars.unitId = data.id;
                this.getStudentList();
            } else if (data.type === 'grade') {
                if (this.listParmars.clazz) {
                    this.listParmars.clazz = null;
                }
                this.listParmars.unitId = data.parentId;
                this.listParmars.gradeId = data.id;
                this.getStudentList();
                this.isHaveClass = false;
                getClassByGradId({
                    gradeId: data.id
                }).then((cl) => {
                    if (cl && cl.data && cl.data.length > 0) {
                        cl.data.forEach((_cl, i) => {
                            _cl.type = 'clazz';
                            _cl.unitType = null;
                            _cl.parentId = data.id;
                        })
                        data.children = cl.data;
                        this.isHaveClass = true;
                    } else {
                        data.children = [];
                        this.isHaveClass = false;
                    }

                })
            } else if (data.type === 'clazz') {
                this.isHaveClass = true;
                this.listParmars.clazz = data.id;
                this.listParmars.gradeId = data.parentId;
                this.listParmars.unitId = _.find(this.oldTreeData, { id: data.parentId }).parentId;
                this.getStudentList();
            }
            this.currentText = data.name;
        },
        // 获取学生列表
        getStudentList() {
            this.emptyText = '正在加载中...';
            // this.loading = true;
            getStudentList(this.listParmars).then((data) => {
                if (data && data.data && data.data.list && data.data.list.length > 0) {
                    this.totals = data.data.total;
                    this.tableData = data.data.list;
                } else {
                    this.tableData = [];
                    this.emptyText = '暂无数据';
                }
                // this.loading = false;
            })
        },
        // 提交学生注册
        submitRegisterForm(formName) {
            // console.log(this.registerForm);
            this.addNewBtn = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.registerForm.studentType);
                    let obj = {
                        address: this.registerForm.address, // 家庭住址
                        unitId: this.listParmars.unitId, // 组织id
                        gradeId: this.registerForm.gradeId, // 年级id
                        classId: this.registerForm.classId, // 班级id
                        studentType: this.registerForm.studentType, // 学生类型
                        realName: this.registerForm.realName, // 姓名
                        loginName: this.registerForm.loginName, // 账号
                        loginPasswd: this.registerForm.loginPasswd, // 密码
                        gender: this.registerForm.gender, // 性别
                        identificationNumber: this.registerForm.identificationNumber, // 身份证号
                        loginMobile: this.registerForm.loginMobile, // 手机号码
                        loginEmail: this.registerForm.loginEmail, // 邮箱
                        pin: this.registerForm.pin, // 考勤号
                        nationNumber: this.registerForm.nationNumber, //全国学籍号
                        yxjfh: this.registerForm.yxjfh, // 原学籍副号
                        xjfh: this.registerForm.xjfh, //学籍副号
                        bnxh: this.registerForm.bnxh, // 班内学号
                        number: this.registerForm.number, // 入学学号
                        img: this.uploadId,
                        "parentUserSaveVM.loginMobile": this.registerForm.parentPhone, // 家长电话
                        "parentUserSaveVM.loginPasswd": this.registerForm.parentLoginPasswd, // 家长密码
                        "parentUserSaveVM.realName": this.registerForm.parentName, // 家长姓名
                        "parentUserSaveVM.loginName": this.registerForm.parentAccount, // 家长账号
                    }
                    this.addNewBtn = true;
                    addNewStudentList(obj).then((data) => {
                        this.addNewBtn = false;
                        if (data && data.status === 200 && data.code === 'ok') {
                            this.addNewBtn = false;
                            this.getStudentList();
                            this.registerDialog = false;
                        } else {
                            this.$notify({
                                title: "失败",
                                message: data.fieldErrors,
                                type: 'error'
                            });
                        }

                    })
                } else {
                    this.addNewBtn = false;
                    return false;
                }
            });

        },
        // 关键字搜索
        handleKeyIconClick() {
            this.getStudentList();
        },
        // 获取年级
        getSelectGradeList() {
            this.gradeOptions = [];
            return new Promise((resove,reject)=>{
                getGrad(this.listParmars.unitId).then((data) => {
                    this.gradeOptions = [];
                    if (data && data.data.length > 0) {
                        data.data.forEach((_data, index) => {
                            this.gradeOptions.push({
                                label: _data.gradeName,
                                value: _data.id
                            });
                        })
                    }
                    resove(data.data)
                }).catch((err)=>{
                    reject(err);
                });
            })
            
        },
        // 获取班级
        getClassLists(id) {
            this.classOptions = [];
            return new Promise((resove,reject)=>{
                getClassList(id).then((data) => {
                    if (data && data.data.length > 0) {
                        data.data.forEach((_data, index) => {
                            this.classOptions.push({
                                label: _data.name,
                                value: _data.id
                            });
                        })
                    }
                    if (!this.isEditSelectClazzId && this.classOptions.length > 0) {
                        this.registerForm.classId = this.classOptions[0].value;
                    }
                    if (this.isEditSelectClazzId) {
                        if (this.passClazzId){
                            this.editForm.classId = this.passClazzId;
                            this.passClazzId = '';
                        }else{
                            this.editForm.classId = this.classOptions.length > 0 ? this.classOptions[0].value : '';
                        }
                    }
                    resove(data)
                }).catch((err)=>{
                    reject(err)
                })
            })
            
        },
        // 选择年级
        handleChangeGrade(val) {
            if (!val) {
                this.downLoadForm.classId = '';
                this.classOptions = [];
                return;
            }
            this.getClassLists(val);
        },
        // 获取性别
        getGender() {
            getGender().then((data) => {
                this.genderOptions = []
                if (data && data.data.length > 0) {
                    data.data.forEach((_data, index) => {
                        this.genderOptions.push({
                            label: _data.name,
                            value: _data.value
                        });
                    })
                }
            })
        },
        // 打开新增学生弹出框
        handleRegisterDialog() {
            this.uploaddata.userId = undefined;
            this.isEditSelectClazzId = false;
            this.oldloginName = '';
            this.oldkqNumber = '';
            this.classOptions = [];
            this.oldparentAccount = '';
            this.showImgUrl = this.imageUrl;
            this.registerDialog = true;
            this.oldloginMobile = '';
            this.oldloginEmail = '';
            this.oldidentificationNumber = '';
            this.$emptyObj(this.registerForm);
            this.$refs.registerForm.resetFields();
            this.registerForm.gradeId = this.listParmars.gradeId;
            this.registerForm.classId = this.listParmars.clazz;
            this.addNewBtn = false;
            this.getGender();
            this.getSelectGradeList();
            this.getStudentType();
        },
        // 表格选取用户
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 注销教师
        handleDelegateTeacher() {
            if (this.multipleSelection.length === 0) {

            } else {
                this.$confirm('是否注销?', '提示', {
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
                        this.deleteBtn = true;
                        deleteStudents(parmars.join(',')).then((data) => {
                            // console.log(data);
                            this.deleteBtn = false;
                            if (data && data.code === 'ok') {
                                this.$notify({
                                    title: '成功',
                                    message: '注销成功！',
                                    type: 'success'
                                });
                                this.getStudentList();
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: data.fieldErrors,
                                    type: 'error'
                                });
                            }
                        })
                    }
                }).catch(() => {

                });
            }

        },
        // 打开下载弹出框
        openDownLoad() {
            this.isEditSelectClazzId = false;
            this.downLoadForm.gradeId = this.listParmars.gradeId;

            this.getSelectGradeList();
            if (this.downLoadForm.classId) {
                getClassByGradId({
                    gradeId: this.listParmars.gradeId,
                    // schoolterm: '1',
                    // year: '2017-2018'
                }).then((data) => {
                    this.classOptions = [];
                    if (data && data.data.length > 0) {
                        data.data.forEach((_data, index) => {
                            this.classOptions.push({
                                label: _data.name,
                                value: _data.id
                            });
                        })
                        this.downLoadForm.classId = this.listParmars.clazz;
                    }
                })
            } else {
                this.downLoadForm.classId = this.listParmars.clazz;
            }
            this.downLoadDialog = true;
        },
        // 下载学生
        downLoad() {
            let obj = {
                unitId: this.listParmars.unitId,
                downloadOptions: this.downLoadForm.downloadOptions.join(','),
                gradeId: this.downLoadForm.gradeId,
                classId: this.downLoadForm.classId,
            };
            if (obj.unitId) {
                this.$downloade('/api/base/student/download', 'POST', obj);
                this.downLoadDialog = false;
                this.downLoadForm.downloadOptions = this.defaultSelected;
            } else {
                this.$notify({
                    title: '警告',
                    message: '请选择组织机构后点击下载',
                    type: 'warning'
                });
            }
            this.downLoadDialog = false;
            // console.log(this.downLoadForm.checkList);
        },
        // 上传图片
        handleAvatarSuccess(res, file) {
            this.imgloading = false;
            if (res.status === 200) {
                if (res.data && !res.data.error) {
                    // this.$notify.success({
                    //     message: res.data.msg
                    // });
                    this.uploadId = res.data.id;
                    this.showImgUrl = showImgUrl + res.data.id;
                }
            } else {
                this.$notify.error({
                    message: res.data.msg || res.message
                });
            }
        },
        handleAvatarSuccess1(res, file) {
            this.imgloading = false;
            if (res.status === 200) {
                if (res.data && !res.data.error) {
                    // this.$notify.success({
                    //     message: res.data.msg
                    // });
                    this.editUploadId = res.data.id;
                    this.editForm.img = showImgUrl + res.data.id;
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
        // 分页切换
        handleCurrentChange(val) {
            this.listParmars.start = val;
            this.getStudentList();
        },
        // 打开编辑对话框
        handleEdit(index, row) {
            this.uploaddata.userId = row.id;
            this.isEditSelectClazzId = true;
            this.editBtn = false;
            this.ispassword = 'password';
            this.parentpassword = 'password';
            this.editForm.gradeId = '';
            this.editForm.classId = '';
            this.editorDialog = true;
            this.$refs.editForm.resetFields();
            this.getStudentType();
            this.getGender();
            this.loading1 = true;
            getStudentById(row.id).then((data) => {
                if (data && data.data) {
                    this.oldFindStudentMsg = _.cloneDeep(data.data);
                    this.editForm.id = data.data.id;
                    this.oldkqNumber = data.data.pin;
                    this.editForm.number = data.data.number;
                    this.editForm.loginName = data.data.loginName;
                    this.editForm.realName = data.data.realName;
                    this.editForm.gender = data.data.gender;
                    this.getSelectGradeList().then((res)=>{
                        if (data.data.gradeId){
                            if (this.$_.find(res, { id: data.data.gradeId})){
                                this.editForm.gradeId = data.data.gradeId;
                                this.passGradeId = data.data.gradeId;
                                this.passClazzId = data.data.classId;
                            }else{
                                this.editForm.gradeId = '';
                                this.editForm.classId = '';
                            }
                        }else{
                            this.editForm.gradeId = '';
                            this.editForm.classId = '';
                        }
                    }).catch((err)=>{

                    });
                    this.editForm.pin = data.data.pin;
                    this.editForm.yxjfh = data.data.yxjfh;
                    this.editForm.nationNumber = data.data.nationNumber;
                    this.editForm.identificationNumber = data.data.identificationNumber;
                    this.editForm.xjfh = data.data.xjfh;
                    this.editForm.bnxh = data.data.bnxh;
                    this.editForm.studentType = data.data.studentType;
                    this.editForm.loginMobile = data.data.loginMobile;
                    this.editForm.loginEmail = data.data.loginEmail;
                    this.editForm.address = data.data.address;
                    this.editForm.parentId = data.data.parentId;
                    this.editForm.parentAccount = data.data.parentAccount;
                    this.editForm.parentName = data.data.parentName;
                    this.editForm.parentPhone = data.data.parentPhone;
                    this.oldPhoto = data.data.img;
                    if (data.data.img) {
                        this.editForm.img = showImgUrl + data.data.img;
                    } else {
                        this.editForm.img = this.imageUrl;
                    }
                    this.editForm.loginPasswd = 'shiyue_123';
                    this.editForm.parentLoginPasswd = 'shiyue_123';
                    this.editForm.gender = this.editForm.gender + '';
                    this.loading1 = false;
                    this.oldloginName = data.data.loginName;
                    this.oldparentAccount = data.data.parentAccount;
                    this.oldloginMobile = data.data.loginMobile;
                    this.oldloginEmail = data.data.loginEmail;
                    this.oldidentificationNumber = data.data.identificationNumber;
                    this.oldparentPhone = data.data.parentPhone;
                    this.oldNumber = data.data.number;
                    this.oldPin = data.data.pin;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '获取用户信息失败'
                    });
                    this.loading1 = false;
                }
            })
        },
        // 编辑
        submitEditeForm(formName) {
            this.editBtn = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.editForm);
                    let isEidt = false;
                    Object.keys(this.editForm).forEach((key) => {
                        if (key != 'parentLoginPasswd' && key != 'loginPasswd' && key != 'img') {
                            this.oldFindStudentMsg[key] = this.oldFindStudentMsg[key] || '';
                            this.editForm[key] = this.editForm[key] || '';
                            if (this.editForm[key] + '' != this.oldFindStudentMsg[key] + '') {
                                isEidt = true;
                            }
                        }
                    })
                    if (this.oldPhoto != this.editUploadId) {
                        isEidt = true;
                    }
                    console.log(isEidt);
                    if (!isEidt && this.editForm.loginPasswd == 'shiyue_123') {
                        this.editorDialog = false;
                        this.editBtn = false;
                        return;
                    }
                    let obj = {
                        id: this.editForm.id,
                        unitId: this.listParmars.unitId,
                        address: this.editForm.address,
                        gradeId: this.editForm.gradeId, // 年级id
                        classId: this.editForm.classId, // 班级id
                        studentType: this.editForm.studentType, // 学生类型
                        realName: this.editForm.realName, // 姓名
                        loginName: this.editForm.loginName, // 账号
                        loginPasswd: this.editForm.loginPasswd, // 密码
                        gender: this.editForm.gender, // 性别
                        identificationNumber: this.editForm.identificationNumber, // 身份证号
                        loginMobile: this.editForm.loginMobile, // 手机号码
                        loginEmail: this.editForm.loginEmail, // 邮箱
                        pin: this.editForm.pin, // 考勤号
                        nationNumber: this.editForm.nationNumber, //全国学籍号
                        yxjfh: this.editForm.yxjfh, // 原学籍副号
                        xjfh: this.editForm.xjfh, //学籍副号
                        bnxh: this.editForm.bnxh, // 班内学号
                        number: this.editForm.number, // 入学学号
                        img: '',
                        'parentUserSaveVM.loginMobile': this.editForm.parentPhone, // 家长电话
                        'parentUserSaveVM.loginPasswd': this.editForm.parentLoginPasswd, // 家长密码
                        'parentUserSaveVM.realName': this.editForm.parentName, // 家长姓名
                        'parentUserSaveVM.loginName': this.editForm.parentAccount, // 家长账号
                        'parentUserSaveVM.id': this.editForm.parentId
                    };
                    if (this.oldPhoto !== this.editUploadId) {
                        if (this.editUploadId) {
                            obj.img = this.editUploadId;
                        } else {
                            obj.img = this.oldPhoto;
                        }
                    } else {
                        obj.img = this.oldPhoto;
                    }
                    if (this.editForm.loginPasswd === 'shiyue_123') {
                        obj.loginPasswd = null;
                    }
                    if (this.editForm.parentLoginPasswd === 'shiyue_123') {
                        obj['parentUserSaveVM.loginPasswd'] = null;
                    }
                    updataStudent(obj).then((data) => {
                        this.editBtn = false;
                        if (data && data.data === 'success') {
                            this.$notify.success({
                                title: '成功',
                                message: '编辑成功'
                            });
                            this.editorDialog = false;
                            this.getStudentList();
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: data.message
                            });
                        }
                    })
                } else {
                    this.editBtn = false;
                    return false;
                }
            });
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
        // 修改状态 0-禁用 1-启用
        handleTeacherOpen(row) {
            // console.log(row);
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
                        this.getStudentList();
                    }
                })
            }
        },
        // 打开学生类型弹出框
        openStudentTypeDilog() {
            this.studentTypeDialog = true;
            this.getStudentType();
        },
        // 获取学生类型列表
        getStudentType() {
            this.emptyText = '正在加载中...';
            getStudentType(this.listParmars.unitId).then((data) => {
                // console.log(data);
                this.studentTypeOptions = [];
                if (data.data && data.data.length > 0) {
                    this.studentTypeData = data.data;
                    if (data && data.data.length > 0) {
                        data.data.forEach((_data, index) => {
                            this.studentTypeOptions.push({
                                label: _data.name,
                                value: _data.id
                            });
                        })
                    }
                } else {
                    this.studentTypeData = [];
                    this.emptyText = '暂无数据';
                }
            })
        },
        // 打开新增学生类型弹出框
        openAddStudentTypeDialog() {
            this.addNewBtn1 = false;
            this.oldStudentTypeName = '';
            this.addStudentTypeDialog = true;
            this.$refs.addStudentTypeForm.resetFields();
            this.addStudentTypeForm.id = '';
            this.addStudentTypeForm.type = '';
        },
        // 新增学生类型
        handlerAddStudentType(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.studentTypeData.push({
                        sort: this.addStudentTypeForm.sort,
                        name: this.addStudentTypeForm.name
                    });
                    this.addNewBtn1 = true;
                    addStudentType({
                        id: null,
                        name: this.addStudentTypeForm.name,
                        sort: this.addStudentTypeForm.sort,
                        unitId: this.listParmars.unitId,
                        value: null
                    }).then((data) => {
                        this.addNewBtn1 = false;
                        if (data && data.status === 200 && data.code === 'ok') {
                            this.$notify({
                                title: '成功',
                                message: '新增成功',
                                type: 'success'
                            });
                            this.addStudentTypeDialog = false;
                            this.getStudentType();
                        } else {
                            this.$notify({
                                title: '失败',
                                message: data.fieldErrors,
                                type: 'error'
                            });
                        }
                    })
                } else {
                    this.addNewBtn1 = false;
                    return false;
                }
            });
        },
        // 更新学生类型
        handleEditorStudentType(row) {
            this.editBtn1 = false;
            this.$refs.editorStudentTypeForm.resetFields();
            this.oldStudentTypeName = row.name;
            this.oldStudentTypeSort = row.sort;
            this.editorStudentTypeDialog = true;
            this.editorStudentTypeForm.id = row.id;
            this.editorStudentTypeForm.name = row.name;
            this.editorStudentTypeForm.sort = row.sort;
        },
        handlerEditorStudentType(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.oldStudentTypeName == this.editorStudentTypeForm.name && this.oldStudentTypeSort == this.editorStudentTypeForm.sort) {
                        this.editorStudentTypeDialog = false;
                        return
                    }
                    this.editBtn1 = true;
                    updataStudentType(this.editorStudentTypeForm).then((data) => {
                        this.editBtn1 = false;
                        if (data && data.status === 200 && data.code === 'ok') {
                            this.$notify({
                                title: '成功',
                                message: '新增成功',
                                type: 'success'
                            });
                            this.editorStudentTypeDialog = false;
                            this.getStudentType();
                        } else {
                            this.$notify({
                                title: '失败',
                                message: data.fieldErrors,
                                type: 'error'
                            });
                        }
                    })
                } else {
                    this.editBtn1 = false;
                    return false;
                }
            });
        },
        // 删除学生类型
        handleDelateStudentType(row) {
            this.$confirm('是否删除该学生类型?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // console.log(row.id);
                deleteStudentType(row.id).then((data) => {
                    if (data && data.status === 200 && data.code === 'ok') {
                        this.$notify({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getStudentType();
                    } else {
                        this.$notify({
                            title: '失败',
                            message: data.fieldErrors,
                            type: 'error'
                        });
                    }
                })
            }).catch(() => {

            });
        },
        // 导入学生页面
        goStudentCodeImport(t) {
            if (t === 'import') {
                this.$router.push({ name: 'studentsImport', params: { currentNodeKey: this.currentNodeKey, parmas: this.listParmars } });
            } else if (t === 'number') {
                if ((this.listParmars.gradeId && this.isHaveClass) || this.listParmars.clazz) {
                    this.$router.push({ name: 'studentsId', params: { currentNodeKey: this.currentNodeKey, parmas: this.listParmars } });
                } else {
                    this.$notify.info({
                        title: '提示',
                        message: '请选择有班级的年级进行导入'
                    });
                }
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