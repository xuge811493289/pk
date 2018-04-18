const _import = require('@/router/' + process.env.NODE_ENV)

// 教务管理
const Course = _import('page/base/educational/course/course');
const StudentClass = _import('page/base/educational/studentClass/index');
const ExecutiveClass = _import('page/base/educational/executiveClass/index');
const ExecutiveTeacher = _import('page/base/educational/executiveTeacher/index');
const ImportTeacher = _import('page/base/educational/executiveTeacher/import');
const ElectiveClass = _import('page/base/educational/electiveClass/index');
const Elective_importSs = _import('page/base/educational/electiveClass/importSs');
const Elective_importCs = _import('page/base/educational/electiveClass/importCs');
const TlLessons = _import('page/base/educational/tlLessons/index');
const EduAffair = _import('page/base/educational/eduAffair/index');

const Base = _import('page/base/Base');

const Unit = _import('page/base/base/unitMsg/Unit');

const Year = _import('page/base/base/year/Year');
const Grade = _import('page/base/base/grade/Grade');
const Org = _import('page/base/base/orgsMag/Org');
const Site = _import('page/base/base/site/Site');
const HistoryClass = _import('page/base/base/grade/HistoryClass');
const ImportSite = _import('page/base/base/site/ImportSite');
// 用户管理
const Parents = _import('page/base/user/parents/Parents');
const Students = _import('page/base/user/students/Students');
const Teachers = _import('page/base/user/teachers/Teachers');
const TeachersImport = _import('page/base/user/teachers/Import');
const StudentsImport = _import('page/base/user/students/Import');
const StudentsId = _import('page/base/user/students/StudentId');

//配置信息
const DataDictionary = _import('page/base/configInfo/dataDictionary/Index');
const DataDicTurnTo = _import('page/base/configInfo/dataDictionary/DataDictionary');
const ClassTime = _import('page/base/configInfo/classTime/classTime');
const IiConf = _import('page/base/configInfo/iiConfig/IiConf');
const KPConf = _import('page/base/configInfo/KnowPointConf/KPConf');
const LoginConf = _import('page/base/configInfo/loginConf/LoginConf');
const BaseJcml = _import('page/base/configInfo/jcml/rcjcml/Jcml');

// 资源权限
const OrgAuth = _import('page/base/resource/orgAuth/OrgAuth');
const ResAuth = _import('page/base/resource/resourceAuth/ResAuth');
const OverView = _import('page/base/resource/overview/OverView');
const RoleAuth = _import('page/base/resource/roleAuth/RoleAuth');

// 日志查询
const OperateLog = _import('page/base/log/opreateLog/OperateLog');
const LoginLog = _import('page/base/log/loginLog/LoginLog');

//应用中心
const AppCenter = _import('page/base/appCenter/AppCenter');
const AppApi = _import('page/base/appCenter/ApiRc');
const AppCodes = _import('page/base/appCenter/Codes');
const AppServer = _import('page/base/appCenter/Server');
const AppRc = _import('page/base/appCenter/Rc');
// 系统备份
const SysCopy = _import('page/base/systemCopy/sys');

// 欢迎页面
const Hello = _import('commonPage/hello/Hello');

let routes = [{
	path: '/base',
	name: '',
	component: Base,
	children: [
		// 欢迎
		{path: 'hello', name: 'basehello', component: Hello},
		// 教务
		{path: 'course', name: 'course', component: Course},
		{path: 'studentClass', name: 'studentClass', component: StudentClass},
		{path: 'executiveClass', name: 'executiveClass', component: ExecutiveClass},
		{path: 'executiveTeacher', name: 'executiveTeacher', component: ExecutiveTeacher},
		{path: 'electiveClass', name: 'electiveClass', component: ElectiveClass},
		{path: 'elective_importSs/:id/:unitId/:sYear/:sTerm/:sClass/:sGrade', name: 'elective_importSs', component: Elective_importSs},
		{path: 'elective_importCs/:id/:unitId/:sYear/:sTerm/:sClass/:sGrade', name: 'elective_importCs', component: Elective_importCs},
		{path: 'tlLessons', name: 'tlLessons', component: TlLessons},
		{path: 'eduAffair', name: 'eduAffair', component: EduAffair},
		{path: 'importTeacher', name: 'importTeacher', component: ImportTeacher},

		// 基础设置
		{path: 'unit', name: 'unit', component: Unit},
		{path: 'year', name: 'year', component: Year},
		{path: 'grade', name: 'grade', component: Grade},
		{path: 'historyClass', name: 'historyClass', component: HistoryClass},
		{path: 'orgsMag', name: 'orgsMag', component: Org},
		{path: 'site', name: 'site', component: Site},
		{path: 'importSite/:unitId', name: 'importSite', component: ImportSite},
		{path: 'basejcml', name: 'basejcml', component: BaseJcml},

		//配置信息
		{path: 'dataDictionary', name: 'dataDictionary', component: DataDictionary},
		{path: 'dataDicTurnTo/:codeId', name: 'dataDicTurnTo', component: DataDicTurnTo},
		{path: 'classTime', name: 'classTime', component: ClassTime},
		{path: 'iiconfig', name: 'iiconfig', component: IiConf},
		{path: 'knowPointConf', name: 'knowPointConf', component: KPConf},
		{path: 'loginconf', name: 'loginconf', component: LoginConf},

		// 用户管理
		{path: 'parents', name: 'parents', component: Parents},
		{path: 'teachers', name: 'teachers', component: Teachers},
		{path: 'students', name: 'students', component: Students},
		{path: 'teachersImport', name: 'teachersImport', component: TeachersImport},
		{path: 'studentsImport', name: 'studentsImport', component: StudentsImport},
		{path: 'studentsId', name: 'studentsId', component: StudentsId},

		// 资源权限
		{path: 'orgAuth', name: 'orgAuth', component: OrgAuth},
		{path: 'resAuth', name: 'resAuth', component: ResAuth},
		{path: 'overView', name: 'overView', component: OverView},
		{path: 'roleAuth', name: 'roleAuth', component: RoleAuth},

		// 日志查询
		{path: 'operateLog', name: 'operateLog', component: OperateLog},
		{path: 'loginLog', name: 'loginLog', component: LoginLog},

		//应用中心
		{path: 'appCenter', name: 'appCenter', component: AppCenter},
		{path: 'api', name: 'api', component: AppApi},
		{path: 'codes', name: 'codes', component: AppCodes},
		{path: 'server', name: 'server', component: AppServer},
		{path: 'rc', name: 'rc', component: AppRc},

		//系统备份
		{path: 'sysCopy', name: 'sysCopy', component: SysCopy},

		// 重定向
		{path: '/', redirect: '/base/hello'}
	]
}];

export default routes