import config from './config.js';
import {
  saveCombinationCourseStudent,
  selectStudentByMergeLayeredId
} from './request.js';

export default {
  /*
   * 选人控件-学生
   * row = {gradeIds:[],id:clazzId}
   */
  selectStudents(row){
    var clazzId = row.classes[0].classId;
    var classIds = row.classes.map((item)=>{
      return item.classId;
    });
    let _d = [];
    config.getStudents({
      unitId: this.unitId,
      clazzId: clazzId,
      yearValue: this.currentYear,
      termValue: this.currentTerm
    }).then((data) => {
      if (data && data.data) {
        for (let i in data.data) {
          _d.push(data.data[i].id)
        }
        //显示模态框
        this.$SelectUsers({
          unitType: this.unitType,
          selectUserType: 1,
          secondGroups: classIds,
          userTypes: [1],
          unitId: this.unitId,
          selectUserIds: _d
        }, (selectUsers, instance) => {
          if (selectUsers){
            var stus = selectUsers.map((user)=>{
              return {classId:user.classId, studentId:user.id };
            });
            //整理参数
            var params = {
              layeredCourseStudentVMS:stus,
              mergeCourseId:this.currentMergeCourse.mcNs.mergeCourseId,
              mergeLayeredId:this.currentMergeCourse.mcNs.id
            }
            saveCombinationCourseStudent(params).then((result)=>{
              if(result.status == 200){
                //重新查找学生，更新数据
                selectStudentByMergeLayeredId({
                  mergeLayeredId:this.currentMergeCourse.mcNs.id,
                  mergeCourseId:this.currentMergeCourse.mcNs.mergeCourseId
                }).then((result)=>{
                  if(result.status = 200){
                    this.students = result.data;
                  } else {
                    this.students = [];
                  }
                })
                this.$notify({title: '成功', message: '操作成功！', type: 'success'});
              }
            });
          }
        })
      }
    })
  }
}