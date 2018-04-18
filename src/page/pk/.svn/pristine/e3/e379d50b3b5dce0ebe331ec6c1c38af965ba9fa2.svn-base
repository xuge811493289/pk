<template>
  <div class="ruleSet">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="排课时间" name="pkTime"></el-tab-pane>
        <el-tab-pane label="课堂互斥" name="courseMutex"></el-tab-pane>
        <el-tab-pane label="连堂" name="continueCourse"></el-tab-pane>
        <el-tab-pane label="其他" name="others/consecutive"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="ruleSetContent">
      <router-view></router-view>
    </div>
    <div class="nextStep">
      <el-button type="primary" @click="prev">上一步</el-button>
      <el-button type="primary" @click="next" disabled>下一步</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import path from 'path';
  export default {
    data(){
      return {
        name:'规则设定',
        activeName:'pkTime',
        stepUrls:['pkTime','courseMutex','continueCourse','others/consecutive'],
        active:1
      }
    },
    methods:{
       handleClick(tab, event) {
        switch (this.activeName){
          case 'pkTime':
            this.active = 1;
            break;
          case 'courseMutex':
            this.active = 2;
            break;
          case 'continueCourse':
            this.active = 3;
            break;
          case 'others/consecutive':
            this.active = 4;
            break;
        }
        this.$router.push({
          path:path.join('/pk/pre/manager/ruleSet',this.stepUrls[this.active-1]),
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
          this.$router.push({path: "/pk/pre/manager/courseArranging", query: this.$route.query});
        }
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
    margin-bottom: 20px;
  }
  .nextStep{
    width:100%;
    text-align: center;
    padding:10px 0;
  }
</style>
