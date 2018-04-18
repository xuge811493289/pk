import { findSchools, findUserGroups, findUserByGroup, findUserById } from './request.js';
import utils from './utils.js';

export default {
    fetchSelectUserIds() {
        if (this.selectUserIds && this.$isArry(this.selectUserIds)) {
            this.selectUserIds.forEach((el, i) => {
                if (el && el.length > 0) {
                    findUserById(el).then((res) => {
                        if (res.status == 200 && res.data && res.data.id) {
                            this.checkedUserJson.push({
                                id: res.data.id,
                                realName: res.data.realName,
                                userType: res.data.userType
                            });
                        }
                    })
                }
            })
        }
    },
    search() {
        this.userJson = _.filter(this.userJsonBack || [], (o) => {
            return ((o.loginName && o.loginName.indexOf(this.keyWord) != -1) || (o.realName && o.realName.indexOf(this.keyWord) != -1));
        });
    },
    trash() {
        this.checkedUserJson = [];
        this.selectUserIds = [];
        this.checkAll = false;
        this.isIndeterminate = false;
    },
    createGroupTypes() {
        this.tabs = [];
        if (this.groups.length == 0) {
            if (this.selectUserType == 2) {
                this.tabs.push({
                    id: 'all',
                    name: '全部',
                    type: 'all'
                });
                this.tabs.push({
                    id: 'department',
                    name: '部门',
                    type: 'department'
                });
                this.tabs.push({
                    id: 'subject',
                    name: '学科',
                    type: 'subject'
                });
            }
            this.tabs.push({
                id: 'gradeclass',
                name: '年级班级',
                type: 'gradeclass'
            });
            /*if (this.selectUserType == 2) {
                this.tabs.push({
                    id: 'diy',
                    name: '自定义组',
                    type: 'diy'
                });
            }*/
        } else {
            if (this.selectUserType == 2) {
                if (-1 != utils.inArray('department', this.groups) || -1 != utils.inArray('departmentManager', this.groups)) {
                    this.tabs.push({
                        id: 'department',
                        name: '部门',
                        type: 'department'
                    });
                }
                if (-1 != utils.inArray('subject', this.groups) || -1 != utils.inArray('teachGroup', this.groups) || -1 != utils.inArray('prepareLesson', this.groups)) {
                    this.tabs.push({
                        id: 'subject',
                        name: '学科',
                        type: 'subject'
                    });
                }
            }
            if (-1 != utils.inArray('headTeacher', this.groups) || -1 != utils.inArray('grade', this.groups) || -1 != utils.inArray('gradeHeadman', this.groups) || -1 != utils.inArray('lessonTeacher', this.groups)) {
                this.tabs.push({
                    id: 'gradeclass',
                    name: '年级班级',
                    type: 'gradeclass'
                });
            }
        }
        this.tabsSelect = this.tabs[0].type;
    },
    createUsers() {
        if (!this.groupType || this.groupType == 0 || !this.selectUserType || this.selectUserType.length == 0) {
            return false;
        }
        // 计算新值
        if (this.selectUserType == 2) {
            let newGroupId = this.newGroupId;
        }
        findUserByGroup({
            userType: this.selectUserType,
            unitId: this.unitId,
            groupId: this.groupId,
            groupType: this.groupType,
            secondGroups: (this.childrenIds || []).join(',')
        }).then((data) => {
            this.userJsonBack = (!data.data || !data.data.length) ? [] : data.data;
            this.userJson = (!data.data || !data.data.length) ? [] : data.data;
            if (this.ignore.length > 0 && (data.data || data.data.length > 0)) {
                let users = [];
                this.userJson.forEach((_e, i) => {
                    if (this.ignore.indexOf(_e.id) == -1) {
                        users.push(_e);
                    }
                })
                this.userJson = users;
            }
            let _this = this;
            _.forEach(_this.selectUserIds, function(id) {
                if (_.filter(_this.checkedUserJson, function(n) {
                        return n.id == id;
                    }).length == 0) {
                    let _su = _.find(_this.userJson, {
                        id: id
                    });
                    if (_su) {
                        _this.checkedUserJson.push(_su);
                    }
                }
            });
            _this.checkAllBut();
        });
    },
    checkAllBut() {
        let userList = _.filter(this.checkedUserJson, (n) => {
                return n.userType == (this.selectUserType || 2) && _.filter(this.userJson, (r) => {
                    return r.id == n.id
                }).length > 0;
            }) || [],
            checkedCount = userList.length;
        this.checkAll = (this.userJson.length > 0 && checkedCount === this.userJson.length);
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.userJson.length;
    },
    createUnits() {
        findSchools({
            unitType: this.unitType,
            unitIds: this.unitIds.toString()
        }).then((data) => {
            if (!data.data || !data.data.length) {
                return false;
            }
            this.units = data.data;
            this.unitId = this.units[0].id;
        });
    },
    createUserGroups() {
        findUserGroups({
            userType: this.selectUserType,
            groups: this.groups.toString(),
            secondGroups: this.secondGroups.toString(),
            unitId: this.unitId,
            userId: this.userId,
            groupType: (this.tabsSelect ? this.tabsSelect : 'all')
        }).then((data) => {
            if (!this.secondGroups) {
                this.secondGroups = [];
            }
            this.parentIds = [];
            this.childrenIds = [];
            this.treeDatas = [];
            this.treeDatasBack = [];
            this.currentTreeId = '';
            let _datas = [];
            if (this.selectUserType == 1 && this.tabsSelect == 'gradeclass') {
                this.parentIds = _.map(_.filter(data.data, (n) => {
                    return n.type == 'grade' && this.secondGroups.indexOf(n.id.replace('grade_', '')) != -1;
                }), 'id');
                this.childrenIds = _.map(_.filter(data.data, (n) => {
                    return n.type == 'class' && this.secondGroups.indexOf(n.id) != -1;
                }), 'id');
            }
            if (!data.data || !data.data.length) {
                return false;
            }
            for (var i = 0; i < data.data.length; i++) {
                let _d_ = data.data[i];
                if (this.parentIds.length == 0 && this.childrenIds.length == 0) {
                    _datas.push(_d_);
                    continue;
                }
                if (this.parentIds.indexOf(_d_.id || '') != -1 || this.childrenIds.indexOf(_d_.id || '') != -1 || (this.childrenIds.length == 0 && this.parentIds.indexOf(_d_.parentId || '') != -1)) {
                    _datas.push(_d_);
                }
            }
            this.treeDatasBack = (_datas || []);
            this.treeDatas = utils.data2tree((_datas || []), 'id', 'parentId');
            let _g = this.treeDatas[0];
            this.currentTreeId = _g.id;
            this.gradeClassTreeChange({
                id: this.currentTreeId,
                type: _g.type
            });
        });
    },
    closeDialog() {
        this.$destroy();
    },
    cancelHandle() {
        this.visible = false;
    },
    okHandle() {
        this.callback(this.checkedUserJson, this);
    },
    handleCheckAll(e) {
        var _this = this;
        if (e.target.checked) {
            _.forEach(this.userJson, function(u) {
                if (_.filter(_this.checkedUserJson, function(n) {
                        return n.id == u.id;
                    }).length == 0) {
                    _this.checkedUserJson.push(u);
                    _this.selectUserIds.push(u.id);
                }
            });
        } else if (!e.target.checked) {
            this.checkedUserJson = _.filter(this.checkedUserJson, function(n) {
                return n.userType != (_this.selectUserType || 2);
            });
            this.selectUserIds = [];
            _.forEach((this.checkedUserJson || []), function(u) {
                _this.selectUserIds.push(u.id);
            });
        }
        this.checkAllBut();
    },
    handleCheckedUser(e) {
        if (e.target.checked) {
            this.checkedUserJson.push(_.find(this.userJson, {
                id: e.target.value
            }));
            if (!_.find(this.selectUserIds, e.target.value)) {
                this.selectUserIds.push(e.target.value);
            }
        } else if (!e.target.checked) {
            this.checkedUser(e);
            let ids = [];
            $.each(this.selectUserIds, function(i, v) {
                if (v != e.target.value) {
                    ids.push(v);
                }
            });
            this.selectUserIds = ids;
        }
        this.selectUserIds = _.uniq(this.selectUserIds);
        this.checkAllBut();
    },
    checkedUser(e) {
        let old = _.clone(this.checkedUserJson);
        _.remove(old, function(n) {
            return n.id == e.target.value;
        });
        this.checkedUserJson = old;
    },
    gradeClassTreeChange(o) {
        this.groupId = o.id;
        this.groupType = o.type;
        this.createUsers();
    }
};