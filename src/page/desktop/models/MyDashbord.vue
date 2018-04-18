<template>
  <div class="model-box">
    <div class="model-box-header">
      <div class="border-bottom">我的代办</div>
    </div>
    <div class="model-box-body">
      
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
  .border-bottom{
    border-bottom: 1px solid #ccc;
  }s
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
  .model-box-body{
    position: absolute;
    top: 30px;
    width: 100%;
    bottom: 0;
    padding:10px;
  }
</style>
