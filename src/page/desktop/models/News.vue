<template>
  <div class="model-box">
    <div class="model-box-header">
      <div class="border-bottom">
        <span>校园新闻</span>
        <el-button type="text" style="float:right;">更多</el-button>
      </div>
    </div>
    <div class="model-box-body">
      <div class="news-img">
        <img src="/common/images/bg2.jpg">
        <p>关于校印务室纸张采购的通知</p>
      </div>
      <div class="news-msg">
        <ul>
          <li v-for="i in 10" :key="'lsit' + i" class="border-bottom">
            <i class="fa fa-bookmark-o" aria-hidden="true"></i>&nbsp;
            <span>关于校印务室纸张采购的通知 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  2017-07-17</span>
          </li>
        </ul>
      </div>
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
  .model-box-body{
    position: absolute;
    top: 30px;
    width: 100%;
    bottom: 0;
    padding: 10px;
  }
  .news-img,.news-msg{
    position: relative;
    height: 50%;
  }
  .news-img>img{
    height: 100%;
    width: 100%;
  }
  .news-img>p{
    padding: 0;
    margin: 0;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(0,0,0, .4);
    position: absolute;
    bottom: 0;
    color: #fff;
    width: 100%;
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
