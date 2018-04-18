<!--其他-->
<template>
  <div class="sy-pk-step-container sy-theme-tableBorder" id="others">
    <sy-grad-4 :border="false">
      <!-- 左侧开始 -->
      <div slot="bodyLeft">
        <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item align="center" v-for="item in OtherRule" :key="item.code" :index="item.code.toString()" 
          @click="selectOtherRule(item.code)">
            <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <!-- 左侧结束 -->
      <!-- 右侧开始 -->
      <div slot="bodyRight">
        <router-view></router-view>
      </div>
      <!-- 右侧结束 -->
    </sy-grad-4>
  </div>
</template>
<script>
  import {getOtherRule,getGradeListandCourse} from "./request"
  export default{
    data(){
      return {
        current:"progress",
        OtherRule:[],
        solutionId:'',
      }
    },
    created(){
      this._getSession();
      //排课规则
      getOtherRule().then((results) =>{
        if(results && results.code =='ok'){
          this.OtherRule = results.data
        }
      })
    },
    methods:{
      _getSession() {
        let solution = this.$getSess('solutionId');
        if(solution){
          this.solutionId = solution;
        }
      },
      selectOtherRule(index){
        switch(index){
          case 1:
            this.$router.push({
              path:'/pk/pre/manager/ruleSet/others/'+'progress'
            })
            break;
          case 2:
            this.$router.push({
              path:'/pk/pre/manager/ruleSet/others/'+'weekTeach'
            })
            break;
          case 3:
            this.$router.push({
              path:'/pk/pre/manager/ruleSet/others/'+'dayTeach'
            })
            break;
          case 4:
            this.$router.push({
              path:'/pk/pre/manager/ruleSet/others/'+'consecutive'
            })
            break;
        }
      }
    }
  }
</script>
<style scoped>
  a {
    color: #000;
    text-decoration: none;
  }
  .app-container-box {
    top:185px;
    bottom:50px;
    overflow-y: scroll;
  }
  #others {
    
  }
  #others .others_navLeft {
    border-right: 1px solid #ededed;
    position: absolute;
    top: 0;
    bottom:0;
    width: 98%;
  }
  #others .others_navLeft li {
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    width: 100%;
  }
  #others .others_navLeft li .icon{
    position: absolute;
    left: 26%;
    top: 14px;
    color: #276b5c;
  }
   #others .others_navLeft li>*:hover{
    color: #276b5c;
  }
</style>






