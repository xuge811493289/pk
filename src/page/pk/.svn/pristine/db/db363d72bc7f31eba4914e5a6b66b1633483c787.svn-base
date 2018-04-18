<template>
	<div class="baseData">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="年级班级" name="classes"></el-tab-pane>
        <el-tab-pane label="学科课程管理" name="courses"></el-tab-pane>
        <el-tab-pane label="教师" name="teachers"></el-tab-pane>
        <el-tab-pane label="教学场地" name="sites"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="baseDataContent">
      <router-view></router-view>
    </div>
    <div class="nextStep">
      <el-button type="primary" @click="prev" v-show="active > 1">上一步</el-button>
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
	</div>
</template>
<script type="text/javascript">
  import path from 'path';
  import baseData from "../../syn-base.js";
	export default {
    mixins: [baseData],
		data(){
			return {
				name:'基础数据',
        activeName:'classes',
        active: 1,
        stepUrls:['classes','courses','teachers','sites'],
			}
		},
    methods:{
      handleClick() {
        switch (this.activeName){
          case 'classes':
            this.active = 1;
            break;
          case 'courses':
            this.active = 2;
            break;
          case 'teachers':
            this.active = 3;
            break;
          case 'sites':
            this.active = 4;
            break;
        }
        this.$router.push({
          path:path.join('/pk/pre/manager/baseData',this.stepUrls[this.active-1]),
          query: this.$route.query
        });
      },
      //下一步
      next() {
        if(this.active >= 1 && this.active < 4){
          this.active ++;
          this.activeName = this.stepUrls[this.active-1];
          this.handleClick();
        }else if(this.active ==4){
          this.$router.push({path: "/pk/pre/manager/courseManager/adminCourse", query: this.$route.query});
        }
        this.synBaseDataById(this.$route.query.id);
      },
      prev(){
        if(this.active >1 && this.active < 4){
          this.active --;
          this.activeName = this.stepUrls[this.active-1];
          this.handleClick();
        }
      },
    }
	}
</script>
<style type="text/css" scoped>
  .tabs{
    width:100%;
  }
  .nextStep{
    width:100%;
    text-align: center;
    padding:10px 0;
  }

</style>
