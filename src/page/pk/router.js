const _import = require('@/router/' + process.env.NODE_ENV)

let routes = [
    //1. 根
    {
        path: '/pk',
        name: 'courseSchedule',
        component: _import('page/pk/index'),
        children: [
            // 前台排课路由
            {
                path: 'pre',
                name: 'courseSchedule',
                component: _import('page/pk/reception/Csdesk'),
                children: [
                    { path: '/', redirect: '/pk/pre/home' },
                    //1-3 任教设置
                    { path: 'teachingSetting', name: 'teachingsetting', component: _import('page/pk/reception/manager/course/admin/teachingSetting/teachingSetting') },
                    { path: 'importTeachSetting', name: 'importTeachSetting', component: _import('page/pk/reception/manager/course/admin/import') },
                    //1-1 资源首页
                    { path: 'home', name: 'pkhome', component: _import('page/pk/reception/home/Home') },
                    //1-1 资源首页 导入
                    { path: 'import', name: 'pkimport', component: _import('page/pk/reception/home/import') },
                    //1-2 管理首页
                    {
                        path: 'manager',
                        name: 'manager',
                        component: _import('page/pk/reception/manager/index'),
                        children: [
                            //2-1 管理首页-基础数据
                            {
                                path: 'baseData',
                                name: 'baseData',
                                component: _import('page/pk/reception/manager/baseData/index'),
                                children: [
                                    //2-1-1 基础数据中的班级年级管理
                                    { path: 'classes', name: 'classes', component: _import('page/pk/reception/manager/baseData/classes/classes') },
                                    //2-1-1-1 批量导入班级年级管理
                                    { path: 'historyClass', name: 'HistoryClass', component: _import('page/pk/reception/manager/baseData/classes/HistoryClass') },
                                    //2-1-2 基础数据中的课程管理
                                    { path: 'courses', name: 'courses', component: _import('page/pk/reception/manager/baseData/course/course') },
                                    //2-1-3 基础数据中的教师管理
                                    { path: 'teachers', name: 'teachers', component: _import('page/pk/reception/manager/baseData/teachers/Teachers') },
                                    { path: 'teacherImport', name: 'TeacherImport', component: _import('page/pk/reception/manager/baseData/teachers/Import') },
                                    //2-1-4 Sites
                                    { path: 'sites', name: 'sites', component: _import('page/pk/reception/manager/baseData/site/Site') }
                                ]
                            },
                            //2-2 课程管理
                            {
                                path: 'courseManager',
                                name: 'courseManager',
                                component: _import('page/pk/reception/manager/course/index'),
                                children: [
                                    //2-2-1 课程管理-行政课程
                                    { path: 'adminCourse', name: 'adminCourse', component: _import('page/pk/reception/manager/course/admin/admin')},
                                    //2-2-2 课程管理-选修班课程
                                    {
                                        path: 'electiveCourse',
                                        name: 'electiveCourse',
                                        component: _import('page/pk/reception/manager/course/elective/tab'),
                                        children: [
                                            //2-2-2-1选修班课程，课位管理
                                            { path: 'coursePosition', name: 'coursePosition', component: _import('page/pk/reception/manager/course/elective/coursePosition/coursePosition') },
                                            //2-2-2-2选修班课程，选修班课程
                                            { path: 'selectCourse', name: 'selectCourse', component: _import('page/pk/reception/manager/course/elective/selectCourse/selectCourse') }
                                        ]
                                    },
                                    //2-2-3 课程管理-合班分层课
                                    { path: 'combinationCourse', name: 'combinationCourse', component: _import('page/pk/reception/manager/course/combination/combination') },
                                    { path: 'oddevenCourse', name: 'oddevenCourse', component: _import('page/pk/reception/manager/course/oddevencourse/oddevenCourse') },
                                    { path: 'fixedCourse', name: 'fixedCourse', component: _import('page/pk/reception/manager/course/fixedCourse/index') }
                                ]

                            },
                            //2-3 规则设定
                            {
                                path: 'ruleSet',
                                name: 'ruleSet',
                                component: _import('page/pk/reception/manager/ruleSet/index'),
                                children: [
                                    //2-2-1 课程管理-行政课程
                                    { path: 'pkTime', name: 'pkTime', component: _import('page/pk/reception/manager/ruleSet/pkTime/pkTime') },
                                    //2-2-2 课堂互斥
                                    { path: 'courseMutex', name: 'courseMutex', component: _import('page/pk/reception/manager/ruleSet/courseMutex/courseMutex') },
                                    //2-2-3 连堂
                                    { path: 'continueCourse', name: 'continueCourse', component: _import('page/pk/reception/manager/ruleSet/continueCourse/continueCourse') },
                                    //2-2-3 连堂
                                    {
                                        path: 'others',
                                        name: 'others',
                                        component: _import('page/pk/reception/manager/ruleSet/others/others'),
                                        children: [
                                            { path: 'progress', name: 'Progress', component: _import('page/pk/reception/manager/ruleSet/others/progress/index') },
                                            { path: 'dayTeach', name: 'dayTeach', component: _import('page/pk/reception/manager/ruleSet/others/dayTeach/index') },
                                            { path: 'weekTeach', name: 'weekTeach', component: _import('page/pk/reception/manager/ruleSet/others/weekTeach/index') },
                                            { path: 'consecutive', name: 'consecutively', component: _import('page/pk/reception/manager/ruleSet/others/consecutively/index') }
                                        ]
                                    }
                                ]
                            },
                            //2-4 智能排课
                            { path: 'courseArranging', name: 'courseArranging', component: _import('page/pk/reception/manager/courseArranging/index') },
                            //2-5 优化调整
                            { path: 'optimize', name: 'optimize', component: _import('page/pk/reception/manager/optimize/index') },
                            //2-6 预览课表
                            {
                                path: 'previewSchedule',
                                name: 'previewSchedule',
                                component: _import('page/pk/reception/manager/previewSchedule/index'),
                                children: [
                                    //2-6-1 预览课表-班级课表
                                    { path: 'clazzSchedule', name: 'clazzSchedule', component: _import('page/pk/reception/manager/previewSchedule/clazz/clazz') },
                                    //2-6-2 课程管理-教师课表
                                    { path: 'TeacherSchedule', name: 'TeacherSchedule', component: _import('page/pk/reception/manager/previewSchedule/teacher/teacher') },
                                    //2-6-3 课程管理-教室课表
                                    { path: 'classroom', name: 'classroom', component: _import('page/pk/reception/manager/previewSchedule/classroom/classroom') },
                                    //2-6-4 课程管理-总课表
                                    { path: 'schedule', name: 'schedule', component: _import('page/pk/reception/manager/previewSchedule/schedule/schedule') },
                                    //2-6-5 课程管理-总任课表
                                    { path: 'teachtable', name: 'teachtable', component: _import('page/pk/reception/manager/previewSchedule/teachtable/teachtable') },
                                    // 重定向
                                    { path: '/', redirect: '/pk/pre/manager/previewSchedule/clazzSchedule' }
                                ]
                            }
                        ]
                    }
                ]
            },
            // 后台课表管理路由
            {
                path: 'kb',
                name: '',
                component: _import('page/pk/backstage/index'),
                children: [
                    // 欢迎
                    { path: 'hello', name: 'kbhello', component: _import('commonPage/hello/Hello') },
                    // 重定向
                    { path: '/', redirect: '/pk/kb/hello' },
                    //我的课表
                    { path: "my", name: 'My', component: _import('page/pk/backstage/view/my/index') },
                    // 班级课表
                    { path: "clazzday", name: 'clazzDay', component: _import('page/pk/backstage/view/clazz/day/index') },
                    { path: "clazzweek", name: 'clazzWeek', component: _import('page/pk/backstage/view/clazz/week/index') },
                    { path: "clazztotal", name: 'clazzTotal', component: _import('page/pk/backstage/view/clazz/total/index') },
                    // 教师课表
                    { path: "teacherday", name: 'teacherDay', component: _import('page/pk/backstage/view/teacher-schedule/tday/index') },
                    { path: "teacherweek", name: 'teacherWeek', component: _import('page/pk/backstage/view/teacher-schedule/tweek/index') },
                    { path: "teachertotal", name: 'teacherTotal', component: _import('page/pk/backstage/view/teacher-schedule/ttotal/index') },
                    // 场地课表
                    { path: "place", name: 'pkplace', component: _import('page/pk/backstage/view/place/index') },
                    // 组合课表
                    { path: "mix", name: 'pkmix', component: _import('page/pk/backstage/view/mix/index') },
                    // 调课代课
                    { path: "change", name: 'pkchange', component: _import('page/pk/backstage/view/change/index') },
                    { path: "add", name: 'pkadd', component: _import('page/pk/backstage/view/change/add') },
                    { path: "print", name: 'pkprint', component: _import('page/pk/backstage/view/change/print') },
                    //课时统计
                    { path: "stat", name: 'pkstat', component: _import('page/pk/backstage/view/stat/index') },
                ]
                    
            },
            // 重定向
            { path: '/', redirect: '/pk/kb/hello' },
        ]
    },
    
]
export default routes