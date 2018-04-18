<template>
  <div class="model-box">
    <div class="model-box-header">
      <span>相册</span>
      <el-button class="sy-photos-btn" type="text" style="float:right;" @click="open">
        <i class="fa fa-plus-square" aria-hidden="true"></i>
      </el-button>
      <!-- <el-button type="text" style="float:right;marginRight:10px;">
        <i style="color:#f00" class="fa fa-times" aria-hidden="true"></i>
      </el-button> -->
    </div>
    <div class="model-box-body">
      <el-carousel :interval="10000" ref="imgs1" height="130px" class="imgs-box" indicator-position="none" @change="hanleChangeImsg">
        <el-carousel-item v-for="(item,index) in imgList" :key="item.fildId">
          <img :src="item.url" @click="handlePictureCardPreview(item,index)">
        </el-carousel-item>
      </el-carousel>
      <el-tabs v-model="activeName" type="" style="height:100%;">
        <el-tab-pane v-for="(item,index) in imgList" :key="item.id" :name="item.id" style="padding:0;">
          <span slot="label" class="sub-imgs-box">
            <img :src="item.url" class="sub-imgs" @click="change(item,index)">
          </span>
          <div style="width:8px;height:40px;"></div>
        </el-tab-pane>
      </el-tabs>
      <slot></slot>
    </div>
    <sy-dialog title="相册管理" :close-on-click-modal="false" position="middle" height="500px" width="600px" slide="fade" :visible.sync="selfMsgDialog">
      <div slot="body" style="padding:10px;">
        <div class="img-nav">
          <el-checkbox v-model="isCheckedAll" @change="handleSelectAll" style="float:left;">全选</el-checkbox>
          <el-checkbox v-model="notCheckedAll" @change="handleRemoveAll" style="float:left;">反选</el-checkbox>
          <el-upload :action="imgUrl" name="fileUpload" class="upload-box" :data="data" :file-list="fileList" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <el-button type="primary" v-loading="loading">上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </div>
        <div draggable="true">
          <!-- <sy-draggable element="ul" v-model="imgList" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="handleEnd">
            <transition-group type="transition" :name="'flip-list'"> -->
            <ul>
              <li class="list-group-item" v-for="item in imgList" :key="item.fildId">
                <el-card :body-style="{ padding: '0px' }" class="img-card">
                  <img :src="item.url" class="image">
                  <div style="padding: 14px;">
                    <div class="bottom clearfix">
                      <el-checkbox v-model="item.isChecked">选择</el-checkbox>
                    </div>
                  </div>
                </el-card>
              </li>
            </ul>
            <!-- </transition-group>
          </sy-draggable> -->
        </div>
      </div>
      <div slot="footer">
        <el-button type="" size="small" @click="selfMsgDialog = false">取 消</el-button>
        <el-button type="danger" size="small" @click="deletePhotos" style="marginRight:15px;">删 除</el-button>
      </div>
    </sy-dialog>
    <sy-dialog 
      showImg
      class="sy-full-photos"
      :close-on-click-modal="false" position="middle" height="auto" width="80%" slide="fade"
      v-model="dialogVisible">
      <div slot="body"> 
        <el-carousel ref="imgs2" type="card" height="400px" :autoplay="false" indicator-position="none" :initial-index="initialIndex">
          <el-carousel-item v-for="item in imgList" :key="item.fildId">
            <img style="height:100%;width:100%" :src="item.url">
          </el-carousel-item>
        </el-carousel>
      </div>
    </sy-dialog>
  </div>
</template>

<script>
import { imgUrl, showImgUrl, submitPicturs, getUserPhotos, showImgUrlAll, delete_self_photo } from '../request.js';
export default {
  name: 'ClassList',
  data() {
    return {
      data: {
        serverid: 'base',
        uploadtype: 'theme'
      },
      initialIndex: 0,
      imgUrl: imgUrl,
      selfMsgDialog: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      activeName: '',
      imgList: [],
      editable: true,
      loading: false,
      isCheckedAll: false,
      notCheckedAll: false
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 10,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost',
        userId: ''
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
  },
  created() {
    this.getPhotosList();
  },
  methods: {
    handleRemoveAll() {
      this.isCheckedAll = false;
      this.imgList.forEach((_img, i) => {
        _img.isChecked = !_img.isChecked;
      })
    },
    handleSelectAll() {
      this.notCheckedAll = false;
      if (this.isCheckedAll) {
        this.imgList.forEach((_img, i) => {
          _img.isChecked = true;
        })
      } else {
        this.imgList.forEach((_img, i) => {
          _img.isChecked = false;
        })
      }
    },
    handleEnd() {

    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    change(item, index) {
      // console.log(item,index);
      if(this.imgList.length>0){
        this.$refs.imgs1.setActiveItem(index);
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    hanleChangeImsg(index){
      if(this.imgList.length>0){
        this.activeName = this.imgList[index].id;
      }
      
    },
    handlePictureCardPreview(file,index) {
      this.dialogImageUrl = showImgUrlAll + file.fildId;
      this.dialogVisible = true;
      this.$refs.imgs2.setActiveItem(index);
    },
    // 获取保存的照片
    getPhotosList() {
      getUserPhotos().then((data) => {
        if (data && data.data && data.data.length > 0) {
          let arr = [];
          data.data.forEach((_d, i) => {
            arr.push({
              id:_d.id,
              name: _d.fileName,
              url: showImgUrlAll + _d.fileId,
              fildId: _d.fileId,
              sort: _d.sort,
              userId: _d.userId,
              isChecked: false,
              type:_d.type
            })
          })
          this.imgList = arr;
          this.activeName = arr[0].id;
        } else {
          this.imgList = [];
        }
      })
    },
    handleAvatarSuccess(res, file) {
      // console.log('file', file);
      // console.log('res', res);
      this.loading = false;
      if (res.status === 200) {
        if (res.data && !res.data.error) {
          submitPicturs({
            fileId: res.data.id,
            fileName: file.name,
            type: 1
          }).then((data) => {
            if (data && data.status == 200) {
              if (data.data === 'success') {
                this.$notify.success({
                  title: '成功',
                  message: '保存成功'
                });
                this.getPhotosList();
              } else {
                this.$notify.error({
                  title: '错误',
                  message: data.message
                });
              }
            } else {
              this.$notify.error({
                message: data.message
              });
              this.getPhotosList();
            }

          })
        }
      } else {
        this.$notify.error({
          message: res.message
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if ((isJPG || isPNG) && isLt2M) {
        this.loading = true;
      } else {
        this.loading = false;
      }
      return (isJPG || isPNG) && isLt2M;
    },
    open() {
      this.selfMsgDialog = true;
    },
    deletePhotos() {
      let arr = this.imgList.filter((_img, i) => {
        return _img.isChecked == true
      }).map((_img, i) => {
        return _img.id
      })
      let parmar = {
        userPhotoRIds:arr.toString()
      }
      if (!arr.length) {
        this.$message({
          type: 'warning',
          message: '请选择待删除元素'
        })
      }
      else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_self_photo(parmar).then((data) => {
            if(data&&data.status==200){
              this.isCheckedAll = false
              this.getPhotosList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  },
  mounted() {

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
div {
  box-sizing: border-box;
}

.model-box {
  position: relative;
  height: 100%;
  width: 100%;
}

.model-box-header {
  height: 30px;
  line-height: 30px;
  padding: 0 13px;
  font-weight: 700;
}

.model-box-body {
  position: absolute;
  top: 30px;
  width: 100%;
  bottom: 0;
  padding: 0 10px 10px;
}

.imgs-box img {
  display: block;
  width: 100%;
  cursor: pointer;
}

.sub-imgs {
  cursor: pointer;
  position: absolute;
  left: 1px;
  top: 3px;
  width: 30px;
  height: 34px;
}

.image {
  width: 100%;
  display: block;
}

.img-card img {
  height: 120px;
}

.upload-box {
  display: inline-block;
}

.list-group-item {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  list-style: none;
  margin: 5px;
  width: 130px;
  height: 170px;
}

.list-group-item-icon {
  position: relative;
  height: 50px;
  width: 60px;
  text-align: center;
  top: 50%;
  transform: translateY(-50%)
}

.list-group-item-icon>img {
  display: inline-block;
  width: 30px;
}

.list-group-item-icon>p {
  margin: 0;
  font-size: 12px;
}

ul {
  margin: 0;
  padding: 0;
}

.flip-list-move {
  transition: transform 0.5s;
}

.img-nav {
  text-align: right;
  padding: 5px;
}
</style>
