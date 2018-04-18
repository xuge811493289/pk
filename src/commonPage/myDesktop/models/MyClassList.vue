<template>
  <div class="model-box">
    <div class="model-box-header">我的课表</div>
    <div class="model-box-body">
      <el-table
        :data="tableData"
        height="100%"
        border
        style="width: 100%; height: 100%;">
        <el-table-column
          prop="date"
          label="节次\星期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="星期一">
        </el-table-column>
        <el-table-column
          prop="address"
          label="星期二">
        </el-table-column>
        <el-table-column
          prop="name"
          label="星期三">
        </el-table-column>
        <el-table-column
          prop="address"
          label="星期四">
        </el-table-column>
        <el-table-column
          prop="name"
          label="星期五">
        </el-table-column>
        <el-table-column
          prop="address"
          label="星期六">
        </el-table-column>
        <el-table-column
          prop="name"
          label="星期日">
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
