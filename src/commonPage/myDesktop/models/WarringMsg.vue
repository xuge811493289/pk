<template>
  <div class="model-box">
    <div class="model-box-header">预警信息</div>
    <div class="model-box-body">
        <el-table
            :data="tableData"
            height="100%"
            border
            style="width: 100%; height: 100%;">
            <el-table-column
            prop="date"
            label="序号"
            width="70">
            </el-table-column>
            <el-table-column
            prop="name"
            label="敏感字">
            </el-table-column>
            <el-table-column
            prop="address"
            label="信息标题">
            </el-table-column>
            <el-table-column
            prop="name"
            label="发布人">
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassList',
  data(){
    return {
      tableData: []
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
