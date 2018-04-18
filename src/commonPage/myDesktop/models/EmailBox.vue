<template>
  <div class="model-box">
    <div class="model-box-header">
      <div class="border-bottom">
        <span>收件箱</span>
        <el-button type="text" style="float:right;">更多</el-button>
      </div>
    </div>
    <div class="model-box-body">
      <ul>
        <li v-for="i in 10" :key="'lsit' + i" class="border-bottom">
          <i class="fa fa-square" aria-hidden="true"></i>
          &nbsp;
          <span>乒乓球馆场预约申请</span>
        </li>
      </ul>
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
    padding: 0 10px;
    font-weight: 700;
  }
  .border-bottom{
    border-bottom: 1px solid #ccc;
  }
  .model-box-body{
    position: absolute;
    top: 30px;
    width: 100%;
    bottom: 0;
    padding: 0 10px 10px;
  }
  ul{
    padding: 0;
    position: relative;
    height: 100%;
    overflow: hidden;
    margin: 0;
    list-style: none;
  }
  ul>li{
    line-height: 35px;
  }
</style>
