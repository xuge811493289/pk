const navList = [{
        isGroup: true,
        index: "1",
        name: '基础设置',
        iconClass: 'fa fa-cog',
        children: [{
                index: '/base/unit',
                iconClass: 'fa fa-caret-right',
                name: '单位信息'
            },
            {
                index: '/base/year',
                iconClass: 'fa fa-caret-right',
                name: '年度学期'
            },
            {
                index: '/base/orgsMag',
                iconClass: 'fa fa-caret-right',
                name: '部门管理'
            },
            {
                index: '/base/grade',
                iconClass: 'fa fa-caret-right',
                name: '年级班级'
            },
            {
                index: '/base/site',
                iconClass: 'fa fa-caret-right',
                name: '场地设置'
            }
        ]
    },
    {
        isGroup: true,
        index: "2",
        name: '用户管理',
        iconClass: 'fa fa-user',
        children: [{
                index: '/base/teachers',
                iconClass: 'fa fa-caret-right',
                name: '教职工管理'
            },
            {
                index: '/base/students',
                iconClass: 'fa fa-caret-right',
                name: '学生管理'
            },
            {
                index: '/base/parents',
                iconClass: 'fa fa-caret-right',
                name: '家长管理'
            }
        ]

    },
    {
        isGroup: true,
        index: '3',
        name: '资源权限',
        iconClass: 'fa fa-puzzle-piece',
        children: [{
            index: '/base/resAuth',
            iconClass: 'fa fa-caret-right',
            name: '资源管理'
        }, {
            index: '/base/roleAuth',
            iconClass: 'fa fa-caret-right',
            name: '角色授权'
        }, {
            index: '/base/orgAuth',
            iconClass: 'fa fa-caret-right',
            name: '组织授权'
        }, {
            index: '/base/overView',
            iconClass: 'fa fa-caret-right',
            name: '权限一览表'
        }]
    },
    {
        isGroup: true,
        index: '/test/1',
        name: '教务管理',
        iconClass: 'fa fa-book',
        children: [{
                index: '/base/course',
                iconClass: 'fa fa-caret-right',
                name: '学科课程管理'
            }, {
                index: '/base/studentClass',
                iconClass: 'fa fa-caret-right',
                name: '学生分班'
            }, {
                index: '/base/executiveClass',
                iconClass: 'fa fa-caret-right',
                name: '行政班课程'
            }, {
                index: '/base/executiveTeacher',
                iconClass: 'fa fa-caret-right',
                name: '行政班任教'
            }, {
                index: '/base/electiveClass',
                iconClass: 'fa fa-caret-right',
                name: '选修班课程'
            }, {
                index: '/base/tlLessons',
                iconClass: 'fa fa-caret-right',
                name: '教研备课组'
            },
            /*{
                       index: '/base/eduSettings',
                       iconClass: 'fa fa-caret-right',
                       name: '教研室设置'
                   }, */
            {
                index: '/base/eduAffair',
                iconClass: 'fa fa-caret-right',
                name: '教务查询'
            }
        ]
    },
    {
        isGroup: true,
        index: '4',
        name: '配置信息',
        iconClass: 'fa fa-address-card-o',
        children: [{
                index: '/base/dataDictionary',
                iconClass: 'fa fa-caret-right',
                name: '数据字典'
            },
            {
                index: '/base/attachmentStorager',
                iconClass: 'fa fa-caret-right',
                name: '附件储存'
            },
            {
                index: '/base/iiconfig',
                iconClass: 'fa fa-caret-right',
                name: '内网IP段设置'
            },
            {
                index: '/base/classTime',
                iconClass: 'fa fa-caret-right',
                name: '上课时间段'
            },
            {
                index: '/base/knowPointConf',
                iconClass: 'fa fa-caret-right',
                name: '知识点配置'
            },
            {
                index: '/base/loginConf',
                iconClass: 'fa fa-caret-right',
                name: '登录页面配置'
            }
        ]
    },
    {
        isGroup: true,
        index: '5',
        name: '日志查询',
        iconClass: 'fa fa-calendar-o',
        children: [{
            index: '/base/OperateLog',
            iconClass: 'fa fa-caret-right',
            name: '操作日志'
        }]
    },
    {
        isGroup: false,
        index: '/base/sysCopy',
        name: '系统备份',
        iconClass: 'fa fa-clone',
        children: []
    },
    {
        isGroup: false,
        index: '/base/AppCenter',
        name: '应用中心',
        iconClass: 'fa fa-suitcase',
        children: []
    }
]

export default {
    pageSize: window.ShiYue.pageSize,
    navList
}