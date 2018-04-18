<template>
  <sy-grad-4 v-loading="loading" element-loading-text="正在导入...">
    <div slot="bodyRight">
      <div class="sy-up" style="text-align: right;">
        <el-button @click="download">下载批量导入模板</el-button>
        <el-button @click="v_back">返回</el-button>
      </div>
      <div class="sy-import sy-down">
        <div class="sy-import-title">导入文件：</div>
        <el-upload
          ref="upload"
          :action="baseUrl + action"
          :on-change="onChange"
          :data="data"
          :before-upload="handleBeforeUpload"
          :on-success="onSuccess"
          :multiple="false"
          :show-file-list="false"
          :auto-upload="false">
          <div slot="trigger" class="sy-import-file-name el-input__inner">
            <div class="sy-import-file-name-div" ref="img">{{uploadValue}}</div>
            <span class="fa fa-folder-o"></span>
          </div>
          <el-button class="sy-import-button" size="small" @click="submitUpload">导入</el-button>
        </el-upload>

        <div class="sy-import-title" style="margin-top: 15px;" v-if="importMsg && importMsg.length > 0">导入日志：</div>
        <div class="sy-import-msg" v-if="importMsg && importMsg.length > 0">
          <div v-for="(o, index) in importMsg" :key="index" class="sy-import-msg-div">
            <span :class="'fa ' + o.type"></span>
            <span v-if="!o.success" style="color:#ff4949">{{o.msg}}</span>
            <span v-else style="color:#13CE66">{{o.msg}}</span>
          </div>
        </div>

        <div class="sy-import-title" style="margin-top: 15px;">导入提示：</div>
        <div class="sy-import-info">
          <div class="sy-import-info-node"><span class="fa"></span>Excel导入格式如下</div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="a1" label="选修班名称"></el-table-column>
            <el-table-column prop="a3" label="选修课程名称"></el-table-column>
            <el-table-column prop="a4" label="任课教师"></el-table-column>
            <el-table-column prop="a5" label="学生来源"></el-table-column>
            <el-table-column prop="a6" label="课程学期"></el-table-column>
            <el-table-column prop="a7" label="周课时数"></el-table-column>
            <el-table-column prop="a8" label="总课时数"></el-table-column>
            <el-table-column prop="a9" label="上课教室"></el-table-column>
          </el-table>
          <div class="sy-import-info-node">
            <p><span class="fa"></span>选修班名称、选修课程名称、课程学期必须填写。</p>
            <p><span class="fa"></span>如果任教教师有重名的，请手动设置。</p>
            <p><span class="fa"></span>多个任课教师之间用“,”隔开。</p>
            <p><span class="fa"></span>多个学生来源之间用“,”隔开，来源的年级必须和系统的年级名称一致。</p>
          </div>
        </div>
      </div>
    </div>
  </sy-grad-4>
</template>

<script>
  import config from './config.js';
  export default {
    components: {},
    name: 'improtMsg',
    data () {
      return {
        data: {
          unitId: ''
        },
        uploadValue: '',
        tableData: config.excelTable || [],
        importMsg: [],
        loading: false,
        currentUnitId: '',
        action: config.importClazz,
        baseUrl: window.ShiYue.base
      }
    },
    beforeCreate(){

    },
    created(){
      this.$parent.$emit('currentPage', '/base/electiveClass');
      this.currentUnitId = this.$route.params.unitId;
      console.log(this.$route.params)
    },
    watch: {},
    computed: {},
    methods: {
      //返回
      v_back(){
        this.$router.push({name: 'electiveClass', params: this.$route.params})
      },
      // 下载
      download(){
        this.$downloade(config.downClassTemplat, 'POST', {})
      },
      submitUpload() {
        if(!this.uploadValue){
          this.$notify({
            title: '提示',
            message: '选择文件后导入！',
            type: 'warning'
          });
          return;
        }
        this.data.unitId = this.currentUnitId;
        this.$refs.upload.submit();
      },
      // 上传文件改变函数
      onChange(file, fileList){
        this.uploadValue = file.name;
      },
      // 上传之前回调函数
      handleBeforeUpload(file){
        this.importMsg = [];
        this.loading = true;
        const isXLS = file.type === 'application/vnd.ms-excel';
        const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isXLS && !isXLSX) {
          this.$notify({
            title: '提示',
            message: '导入文件只能是 xls/xlsx 格式!',
            type: 'error'
          });
        }
        if (!isLt10M) {
          this.$notify({
            title: '提示',
            message: '导入文件大小不能超过 10MB!',
            type: 'error'
          });
        }
        if ((isXLS || isXLSX) && isLt10M) {
          this.loading = true;
        } else {
          this.loading = false;
        }
        return (isXLS || isXLSX) && isLt10M;
      },
      // 上传成功
      onSuccess(response, file, fileList){
        setTimeout(() => {
          this.uploadValue = '';
        }, 100);
        if (response.code !== 'ok') {
          this.$notify({
            title: '失败',
            message: response.message,
            type: 'error'
          });
          this.loading = false;
          return;
        }
//          this.$notify({
//              title: '成功',
//              message: '操作成功！导入结果详见导入日志。',
//              type: 'success'
//          });
        let arr = [];
        if (response && response.data) {
          if(!response.data.error||response.data.error.length==0){
            this.$notify({
              title: '成功',
              message: '导入成功！',
              type: 'success'
            });
          }else if(!response.data.success||response.data.success.length==0){
            this.$notify({
              title: '失败',
              message: '导入失败！',
              type: 'error'
            });
          } else {
            this.$notify({
              title: '警告',
              message: '导入数据部分有误！',
              type: 'warning'
            });
          }
//          this.$notify({
//            title: '成功',
//            message: '操作成功！导入结果详见导入日志。',
//            type: 'success'
//          });
          if(response.data.error)
          response.data.error.forEach((_res, i) => {
            arr.push({
              msg: _res,
              success: false,
              type: 'fail'
            })
          });
          if(response.data.success)
          response.data.success.forEach((_res, i) => {
            arr.push({
              msg: _res,
              success: true,
              type: 'success'
            })
          });
        } else {
          arr = [];
        }
        this.importMsg = arr;
        this.loading = false;

      }
    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
