<template>
  <div class="previewSchedule">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="班级课表" name="clazzSchedule"></el-tab-pane>
        <el-tab-pane label="教师课表" name="TeacherSchedule"></el-tab-pane>
        <el-tab-pane label="教室课表" name="classroom"></el-tab-pane>
        <el-tab-pane label="总课表" name="schedule"></el-tab-pane>
        <el-tab-pane label="总任课表" name="teachtable"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="coursesContent">
      <router-view></router-view>
    </div>
    <div class="center" style="padding: 10px;">
			<el-button type="primary" @click="$router.push('/pk')">返回</el-button>
		</div>
  </div>
</template>
<script type="text/javascript">
  import path from 'path';
  export default {
    data(){
      return {
        name:'预览课表',
        activeName:'clazzSchedule'
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab.index,tab.name, event);
        this.$router.push({
          path:path.join('/pk/pre/manager/previewSchedule',tab.name),
          query:this.$route.query
        });
      }
    }
  }
</script>
<style type="text/css" scoped>
  .tabs{
    width:100%;
    margin-bottom: 20px;
  }

</style>
