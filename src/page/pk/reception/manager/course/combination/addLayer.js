import {
	getPlaceType,
	getPlace,
	deleteLayeredBymergeLayereId
} from "./request.js";
export default {
	beforePlaceNodeClick(index){
		this.currentIndex = index;
	},
	//点击场地
	handlePlaceNodeClick(data){
		if(!data.hasOwnProperty('unitId')){
			//当点击场地的时候执行
			this.combinForm.mergeLayeredUpdateVMS.forEach((item)=>{
        if(item.index == this.currentIndex){
          item.placeId = data.id;
          item.placeName = data.name;
        }
      });
     	var currentInp = $('.el-dropdown input')[this.currentIndex]
     	$(currentInp).trigger('click');
		}
	},
	//下拉菜单状态改变
	dropdownChange(a){
		this.dropdownStatus = a;
	},
	//加载场地类型数据
	loadPlaceTypesData(){
		getPlaceType(this.unitId).then((d) => {
			this.placeTypesData = d.data;
    });
	},
	//加载场地数据（子元素）
	loadPlaceData(node,resolve){
		if(node.level === 1){
			getPlace({unitId: this.unitId, placeTypeId: node.data.id }).then((result)=>{
				if(result.data && result.data.list){
					resolve(result.data.list);
				}
			});
		} else {
			resolve([]);
		}
		
	},
	// 新增录入行
  toAddLayered(){
    var newLayer = {
      index:++this.combinForm.layerNum,
      mergeLayeredId:'',
      layeredName:'',
      teacherId:'',
      placeId:'',
      placeName:''
    }
    this.combinForm.mergeLayeredUpdateVMS.push(newLayer);
    //加载数据
    this.loadPlaceTypesData();
  },
	//删除录入行
  addDialoghandleDelete(index){
  	var mergeLayeredId ;
  	this.combinForm.mergeLayeredUpdateVMS.forEach((item)=>{
  		if(item.index == index){
  			mergeLayeredId = item.mergeLayeredId;
  		}
  	});
  	//执行删除操作
		deleteLayeredBymergeLayereId({mergeLayeredId:mergeLayeredId}).then(()=>{
			this.combinForm.mergeLayeredUpdateVMS = this.combinForm.mergeLayeredUpdateVMS.filter((item)=>{
       	return item.index != index
    	})
		})
    // this.combinForm.mergeLayeredUpdateVMS = this.combinForm.mergeLayeredUpdateVMS.filter((item)=>{
    //   return item.index != index
    // })
  },
  // 选择上课教师
  selectTeacher(index){
    let _m = [];
    if (this.addForm.teacher !== "" && this.addForm.teacher !== undefined)
      _m.push(this.addForm.teacher);
    this.$SelectUsers({
      unitType: this.unitType,
      selectUserType: 2,
      unitId: this.unitId,
      selectUserIds: _m,
      beforeClose: (selectUsers, instance)=>{
        if (selectUsers.length > 1) {
          this.$notify({
            title: '警告',
            message: '最多选择一个！',
            type: 'warning'
          });
          return true;
        } else {
          var currentUser = selectUsers[0];
          if (selectUsers.length === 1) {
            this.combinForm.mergeLayeredUpdateVMS.forEach((item)=>{
              if(item.index == index){
                item.teacherId = currentUser.id;
                item.teacherName = currentUser.realName;
              }
            });
          } 
        }
      }
    }, () => {})
  }
}