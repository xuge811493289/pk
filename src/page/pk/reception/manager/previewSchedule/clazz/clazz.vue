<template>
  <div class="sy-pk-step-container sy-theme-tableBorder" style="height: auto;min-height: 440px;"
    v-loading="pageLoading" element-loading-text="拼命加载中...">
    <div style="padding: 10px;">
      <el-select v-model="parmas.gradeId" placeholder="请选择年级" size="small" style="width:130px;margin-right: 10px;" @change="handleGradeChange">
        <el-option label="全部年级" value=""></el-option>
        <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="parmas.classIds" placeholder="请选择班级" size="small" style="width:130px" @change="handleClazzChange">
        <el-option label="全部班级" value=""></el-option>
        <el-option v-for="items in classOptions" :key="items.value" :label="items.label" :value="items.value"></el-option>
      </el-select>
    </div>
    <div style="padding: 0 10px 10px;">
      <div v-for="(item,index) in tableData" :key="index" style="margin-bottom: 10px;">
        <el-table  :data="item.data" border style="width: 100%;">
          <el-table-column v-for="col in item.columes" :key="col.id" :prop="col.id" :label="col.name" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getClassSheetsById, getGradeListByPlan, getClazzByGradeId, getBb, getFestival } from "../../request.js";
export default {
  data(){
    return{
      parmas: {
        gradeId: '',
        classIds: ''
      },
      pageLoading: false,
      gradeOptions: [], // 年级列表
      classOptions: [], // 班级列表
      weekList: [], // 星期列表
      jieciList: [], // 节次列表
      tableData: []
    }
  },  
  created(){
    this.init();
  },
  methods:{
    init(){
      // 星期
      this.weekList = [];
      this.jieciList = [];
      getBb('XQ').then(res=>{
        if(res.code == 'ok'){
          this.weekList = res.data;
          getFestival({unitId: this.$store.state.unitId}).then(data=>{
            if(data.code == 'ok'){
              this.jieciList = data.data;
            }
            this.getList();
          })
        }
      })
      this.getGrade();
    },
    // 查询年级
    getGrade(){
      this.gradeOptions = [];
      getGradeListByPlan(this.$route.query.id).then(res=>{
        let arr = [];
        res.forEach(_d => {
          arr.push({
            value: _d.gradeId,
            label: _d.gradeName
          })
        });
        this.gradeOptions = arr;
      }).catch(err=>{

      })
    },
    handleGradeChange(val){
      this.parmas.classIds = '';
      this.classOptions = [];
      if(val){
        this.getClazz();
      }
      this.getList();
    },
    // 查询班级
    getClazz(){
      this.classOptions = [];
      getClazzByGradeId({
        unitId: this.$store.state.unitId,
        gradeId: this.parmas.gradeId
      }).then(res=>{
        let arr = [];
        res.forEach(_d => {
          arr.push({
            value: _d.id,
            label: _d.name
          })
        });
        this.classOptions = arr;
      }).catch(err=>{

      })
    },
    handleClazzChange(){
      this.getList();
    },
    // 查询课表
    getList(){
      this.pageLoading = true;
      getClassSheetsById({
        unitId: this.$store.state.unitId,
        year: this.$route.query.year,
        term: this.$route.query.term,
        solutionId: this.$route.query.id,
        classIds: this.parmas.classIds || this.$_.map(this.classOptions, 'value').join(','),
        gradeId: this.parmas.gradeId
      }).then(res=>{
        let datas = [];
        res.forEach((_r,r)=>{
          let obj = {
            columes: [],
            data: []
          };
          let _arr = [{id: 'name', name: _r.classShortName}]
          let _datas = [];
          this.weekList.forEach((_w,w)=>{
            _arr.push({id: _w.id, name: _w.name})
          })
          this.jieciList.forEach((_j,j)=>{
            let _jc = this.$_.filter(_r.courseSheets, {festivalId: _j.id})
            let _dataObj = {
              name: _j.name
            };
            let uniqWeekId = this.$_.uniq(this.$_.map(_jc, 'weekId'));
            uniqWeekId.forEach((_u,u)=>{
              let _strs = [];
              this.$_.filter(_jc, o=>{return o.weekId == _u}).forEach((_q,q)=>{
                _strs.push(_q.courseShortName + (_q.teacherNames ? ' （' + _q.teacherNames + '）' : ''))
              })
              _dataObj[_u] = _strs.join('、')
            })
            _datas.push(_dataObj);
          })
          obj.columes = _arr;

          obj.data = _datas;
          
          datas.push(obj);
        })
        this.tableData = datas;
        this.pageLoading = false;
      }).catch(err=>{
        this.pageLoading = false;
      })
    }
  }
}
</script>

<style scoped>

</style>

