import {
	selectFestivlaByUnit,
  selectGB,
  saveTimeClassDetail,
  saveTimeTeacherDetail,
  saveTimeCourseDetail,
  saveTimePlaceDetail,
  selectTimeClassDetail,
  selectTimeTeacherDetail,
  selectTimeCourseDetail,
  selectTimePlaceDetail,
  delTimePlaceDetail,
  delTimeCourseDetail,
  delTimeTeacherDetail,
  delTimeClassDetail
} from './request.js'

export default {
  onMove(){
    return false;
  },
	//将数据与表格进行结合
  combineDetailAndFestivals(festivals,details){
    festivals.forEach((fest)=>{
      // 数据清洗
      var diff = 7 - fest.weekRModels.length;
      if(diff > 0){
        for(var i=0;i<diff;i++){
          fest.weekRModels.push({});
        }
      }
      // 数据与表格进行绑定
      fest.weekRModels.forEach((item)=>{
        if(item.weekId){
          details.forEach((data)=>{
            if(data.festivalId == item.festivalId && data.weekId == item.weekId){
              item.pkStatus = data;
            } 
          });
        } else {
          item.pkStatus = 'disable';
        }
        
      });
    });
    this.festivals = festivals;
  },
  //查询班级上课时间,将查询到的数据集成到表格中
  pkSelectTimeClassDetail(festivals){
     //刷新表格数据
    selectFestivlaByUnit({unitId:this.unitId}).then((festivals)=>{
      selectTimeClassDetail(this.pkStatus).then((details)=>{
        //查询年级排课时间
        this.combineDetailAndFestivals(festivals.data,details.data);
      });
    });
  },
  //查询教师上课时间,将查询到的数据集成到表格中
  pkSelectTimeTeacherDetail(){
    //刷新表格数据
    selectFestivlaByUnit({unitId:this.unitId}).then((festivals)=>{
      selectTimeTeacherDetail(this.pkStatus).then((details)=>{
        //查询年级排课时间
        this.combineDetailAndFestivals(festivals.data,details.data);
      });
    });
  },
  //科目
  pkSelectTimeCourseDetail(){
    //刷新表格数据
    selectFestivlaByUnit({unitId:this.unitId}).then((festivals)=>{
      selectTimeCourseDetail(this.pkStatus).then((details)=>{
        //查询年级排课时间
        this.combineDetailAndFestivals(festivals.data,details.data);
      });
    });
  },
  //场地
  pkSelectTimePlaceDetail(){
    //刷新表格数据
    selectFestivlaByUnit({unitId:this.unitId}).then((festivals)=>{
      selectTimePlaceDetail(this.pkStatus).then((details)=>{
        //查询年级排课时间
        this.combineDetailAndFestivals(festivals.data,details.data);
      });
    });
  },
  //保存班级上课时间
  saveDetail(){
    switch(this.optionsValue){
      case 'clazz':
        saveTimeClassDetail(this.pkStatus).then((result)=>{
          if(result.status == 200){
            this.$notify({title: '成功', message: result.message, type: 'success'});
             //查询
            this.pkSelectTimeClassDetail();
          } else if(result.status == 500){
            this.$notify({title: '失败', message: result.message, type: 'error'});
          }
        });
        break;
      case 'teacher':
        saveTimeTeacherDetail(this.pkStatus).then((result)=>{
          if(result.status == 200){
            this.$notify({title: '成功', message: result.message, type: 'success'});
             //查询
            this.pkSelectTimeTeacherDetail();
          } else if(result.status == 500){
            this.$notify({title: '失败', message: result.message, type: 'error'});
          }
        });
        break;
      case 'course':
        saveTimeCourseDetail(this.pkStatus).then((result)=>{
          if(result.status == 200){
            this.$notify({title: '成功', message: result.message, type: 'success'});
             //查询
            this.pkSelectTimeCourseDetail();
          } else if(result.status == 500){
            this.$notify({title: '失败', message: result.message, type: 'error'});
          }
        });
        break;
      case 'place':
        saveTimePlaceDetail(this.pkStatus).then((result)=>{
          if(result.status == 200){
            this.$notify({title: '成功', message: result.message, type: 'success'});
             //查询
            this.pkSelectTimePlaceDetail();
          } else if(result.status == 500){
            this.$notify({title: '失败', message: result.message, type: 'error'});
          }
        });
        break;
    }
  },
   //保存班级上课时间
  delDetail(){
    switch(this.optionsValue){
      case 'clazz':
        delTimeClassDetail(this.pkStatus).then((result)=>{
          if(result.status == 200){
            this.$notify({title: '成功', message: result.message, type: 'success'});
             //查询
            this.pkSelectTimeClassDetail();
          } else if(result.status == 500){
            this.$notify({title: '失败', message: result.message, type: 'error'});
          }
        });
        break;
      case 'teacher':
        delTimeTeacherDetail(this.pkStatus).then((result)=>{
          if(result.status == 200){
            this.$notify({title: '成功', message: result.message, type: 'success'});
             //查询
            this.pkSelectTimeTeacherDetail();
          } else if(result.status == 500){
            this.$notify({title: '失败', message: result.message, type: 'error'});
          }
        });
        break;
      case 'course':
        delTimeCourseDetail(this.pkStatus).then((result)=>{
          if(result.status == 200){
            this.$notify({title: '成功', message: result.message, type: 'success'});
             //查询
            this.pkSelectTimeCourseDetail();
          } else if(result.status == 500){
            this.$notify({title: '失败', message: result.message, type: 'error'});
          }
        });
        break;
      case 'place':
        delTimePlaceDetail(this.pkStatus).then((result)=>{
          if(result.status == 200){
            this.$notify({title: '成功', message: result.message, type: 'success'});
             //查询
            this.pkSelectTimePlaceDetail();
          } else if(result.status == 500){
            this.$notify({title: '失败', message: result.message, type: 'error'});
          }
        });
        break;
    }
  },
  pkStatusShow(week,festival){
    if(week == this.pkStatus.weekId && festival == this.pkStatus.festivalId){
      return 'level_'+this.pkStatus.type;
    }
  },
  //选中周内某一天某个节次
  checkDay(festival,week){
    if(this.pkStatus.type || this.pkStatus.labelId){
      this.pkStatus.weekId = week;
      this.pkStatus.festivalId = festival;
    } else {
      this.$notify({title: '警告', message: '请先选中一种类型或标签', type: 'warning'});
    }
  },
  //取消选中周内某一天节次
  unCheckDay(festival,week){
    this.pkStatus.weekId = week;
    this.pkStatus.festivalId = festival;
    alert(week);
  },
  //选中类型操作
  checkType(event,code){
    this.pkStatus.type = code;
  },
  //选中标签
  checkLabel(code){
    this.pkStatus.labelId = code;
  },
  //选中班级年级
  checkClazz(current){
    //设置年级班级
    this.pkStatus.gradeId = "";
    this.pkStatus.classId = "";
    if(current.gradeId){
      this.pkStatus.gradeId = current.gradeId;
      this.pkStatus.classId = current.id;
    } else {
      this.pkStatus.gradeId = current.id;
    }
    //查询数据渲染表格
    this.pkSelectTimeClassDetail();
  },
   //选中教师
  checkTeacher(current){
    if(current.children){
      this.pkStatus.courseId = current.id;
      this.pkStatus.teacherId = '';
    } else {
      this.pkStatus.teacherId = current.id;
      this.pkStatus.courseId='';
    }
    //刷新表格数据
    this.pkSelectTimeTeacherDetail();
  },
  //选中科目
  checkCourse(current){
    if(current.children){ 
      this.pkStatus.courseId = current.courseId;
    }else if(current.children == undefined){
      this.pkStatus.courseId = current.courseId;
      this.pkStatus.gradeClassCourseId = current.id;
    }
    this.pkSelectTimeCourseDetail();
  },
  //选中场地
  checkPlace(current){
    //将当前选中的元素的ID赋值给场地类型ID
    this.pkStatus.placeTypeId = current.placeTypeId;
    this.pkStatus.placeId = current.placeId;
    this.pkSelectTimePlaceDetail(); 
  },
  //获取样式
  getPKStatusClass(pkStatus){
    if(pkStatus){
      if(pkStatus == 'disable'){
        return 'background-color:#ddd;';
      } else {
        return 'background-color:'+this.colors[pkStatus.type];
      }
    } else {
      return 'background-color:#FFF';
    }
    //return pkStatus?'background-color:'+this.colors[pkStatus.type]:'background-color:#FFF';
  },
  //通过类型的编码转换为一个按钮类型
  btnType(code){
    var bt ;
    switch(code){
      case 1:
        bt = 'background-color:rgb(255, 73, 73)';
        break;
      case 2:
        bt = 'background-color:rgb(249, 200, 85)';
        break;
      case 3:
        bt = 'background-color:rgb(115, 204, 255)';
        break;
      case 4:
        bt = 'background-color:rgb(66, 216, 133)';
        break;
      default :
        bt = 'background-color:#FFF;color:#333;border:1px solid #c4c4c4';
    }
    return bt;
  }
}