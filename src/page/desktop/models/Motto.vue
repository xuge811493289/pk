<template>
  <div class="model-box motto">
    <div class="model-box-header">
      <span>座右铭</span>
      <!-- <el-button type="text" style="float:right;"><i style="color:#f00" class="fa fa-times" aria-hidden="true"></i></el-button> -->
      <el-button class="sy-photos-btn" type="text" style="float:right;" @click="change"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></el-button>
    </div>
    <div class="model-box-body">
      <p v-show="isEdit" @click="change">{{motto}}</p>
      <el-input
        v-show="!isEdit"
        type="textarea"
        placeholder="请输入座右铭"
        @blur="handlesubmit"
        v-model="motto"
        resize="none"
        :autofocus="true"
        ref="mottoTextarea">
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassList',
  data(){
    return {
      isEdit: true
    }
  },
  props:{
    motto: {
      type: String
    }
  },
  watch: {
    
  },
  computed: {
    
  },
  beforeCreate(){
    
  },
  created(){
    //this.textarea = this.motto;
  },
  methods:{
    change(){
      this.isEdit = false;
      //this.autofocus = true;
      let motto = document.querySelector('.motto textarea')
      this.$nextTick(()=>{
        motto.focus()
      })
    },
    handlesubmit(){
      this.isEdit = true;
      this.autofocus = false;
      this.$emit('select-type', this.motto);
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
  .sy-photos-btn{
    display: none;
  }
  .model-box-header:hover > .sy-photos-btn{
    display: block;
  } 
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
  .model-box-body>p{
    cursor: pointer;
    line-height: 20px;
  }
</style>
