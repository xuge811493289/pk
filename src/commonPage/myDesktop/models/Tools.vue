<template>
  <div class="model-box">
    <div class="model-box-header">
      <span>工具箱</span>
      <!-- <el-button type="text" style="float:right;"><i style="color:#f00" class="fa fa-times" aria-hidden="true"></i></el-button> -->
    </div>
    <div class="model-box-body">
      <ul>
        <li v-for="item in list" :key="item.id">
          <a :href="item.url" target="_blank">
            <img :src="item.img">
            <p>{{item.text}}</p>
          </a>
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
      list: [
        {
          url: 'http://weather.news.sina.com.cn/',
          img: '/common/images/tqcx.jpg',
          text: '天气查询',
          id: 'tools_0'
        },
        {
          url: 'http://map.baidu.com/',
          img: '/common/images/bddt.png',
          text: '百度地图',
          id: 'tools_1'
        },
        {
          url: 'https://pan.baidu.com/',
          img: '/common/images/bdyp.png',
          text: '百度云盘',
          id: 'tools_2'
        },
        {
          url: 'http://www.iciba.com/',
          img: '/common/images/jsky.png',
          text: '金山快译',
          id: 'tools_3'
        },
        {
          url: 'http://wannianli.tianqi.com/',
          img: '/common/images/wnl.png',
          text: '万年历',
          id: 'tools_4'
        },
        {
          url: 'https://www.qunar.com/',
          img: '/common/images/qnw.png',
          text: '去哪儿',
          id: 'tools_5'
        },
        {
          url: 'https://www.baidu.com/',
          img: '/common/images/addIconlogo.png',
          text: '快捷方式',
          id: 'tools_6'
        }
      ]
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
    width: 100%;
    padding: 0 10px 10px;
  }
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }
  ul>li{
    display: inline-block;
    width: 50px;
    overflow: hidden;
    margin: 6px;
    text-align: center;
  }
  ul>li img{
    vertical-align: middle;
    width: 100%;
  }
  ul>li a{
    text-decoration: none;
  }
</style>
