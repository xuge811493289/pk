<template>
  <div class="sy-pk-step-container sy-theme-tableBorder">
    <sy-grad-4>
      <div slot="headerRight">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课位管理" class="coursePosition" name="coursePosition"></el-tab-pane>
          <el-tab-pane label="选修班课程" name="selectCourse"></el-tab-pane>
        </el-tabs> 
      </div>
      <div slot="bodyRight" >
          <router-view></router-view>
      </div>
    </sy-grad-4>
  </div>
</template>
<script type="text/javascript">
  import path from 'path';
  export default {
    data(){
      return {
        name:'课程课位管理',
        tabPosition:'top',
        activeName:'coursePosition'
      }
    },
    methods:{
      handleClick(tab, event) {
        this.$router.push({
          path:path.join('/pk/pre/manager/courseManager/electiveCourse',tab.name),
          query: this.$route.query
        });
      }
    }
  }
</script>
<style type="text/css" scoped>
  .app-container-box{
    top:185px;
    bottom:50px;
  }
  .el-tabs__content{
    display: none;
  }
</style>
