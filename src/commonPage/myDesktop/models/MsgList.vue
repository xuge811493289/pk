<template>
  <div class="model-box">
    <div class="model-box-header">
      <span>通知公告</span>
      <el-button type="text" style="float:right;">更多</el-button>
    </div>
    <div class="model-box-body">
      <el-tabs v-model="activeName" type="border-card" style="height:100%;">
        <el-tab-pane label="全部" name="first">全部</el-tab-pane>
        <el-tab-pane label="校内通知" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="教研通知" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="加班通知" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="校园新闻" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="家校通" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="校园通知" name="fourth">定时任务补偿</el-tab-pane> 
        <el-tab-pane label="私人" name="fourth">定时任务补偿</el-tab-pane>                               
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassList',
  data(){
    return {
      tableData: [],
      activeName: 'first'
    }
  },
  watch: {
    
  },
  computed: {
    
  },
  beforeCreate(){
    
  },
  created(){
    // for(let i=0;i<30;i++){
    //   this.tableData.push({
    //     date: '12012',
    //     name: 'ddd',
    //     address: 'dasdfasdf'
    //   })
    // }
  },
  methods:{
    
  },
  mounted () {
    
  }
}
</script>

<style scoped>
  div{
    box-sizing: border-box;
  }
  .model-box{
    position: relative;
    height: 100%;
    width: 100%;
  }
  .model-box-header{
    height: 30px;
    line-height: 30px;
    padding: 0 13px;
    font-weight: 700;
  }
  .model-box-body{
    position: absolute;
    top: 30px;
    width: 100%;
    bottom: 0;
    padding: 0 10px 10px;
  }
</style>
