<template>
  <div class="model-box">
    <img src="/common/images/img.jpg" class="image">
    <div style="padding: 14px;">
        <span>系统管理员</span>
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
    text-align: center;
  }
  .model-box>img{
    width: 50%;
    border-radius: 50%;
    margin-top: 20px;
  }
  
</style>
