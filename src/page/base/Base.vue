<template>
  <div class="sy-app-container">
    <div class="sy-home-header">
      <sy-header title="基础平台" :name="userName" :versionList="versionList"></sy-header>
    </div>
    <div class="sy-home-body">
      <div class="sy-home-body-left" :style="{width:leftWidth+'px'}">
        <div class="change-menu-icon">
          <i class="fa fa-outdent" aria-hidden="true" :class="{'iocn-rotate-l': isRotate}" @click="changeNavStyle"></i>
        </div>
        <sy-left-nav router :defaultActive="currentPage" :navList="navList" :isIcon="isShowText"></sy-left-nav>
      </div>
      <div class="sy-home-body-right" :style="{left: leftPosition + 'px'}">
        <transition name="fade" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <div class="sy-home-footer">
      <foot></foot>
    </div>
  </div>
</template>

<script>
import foot from '../../commonPage/footer/footer.vue';
import SyHeader from '../../commonPage/header/header.vue';
import { getCodeMenuList } from '../../service/index.js';
import version from './version.js';
export default {
  components: {
    foot,
    SyHeader
  },
  name: 'hello',
  data() {
    return {
      versionList: version,
      userName:'',
      isShowText: true,
      leftWidth: 230,
      leftPosition: 230,
      isRotate: false,
      currentPage: '',
      navList: [],
      currentMenu: '',
    }
  },
  created() {
    document.title = "基础平台";
    if (this.$store.state.realName) {
        this.userName = this.$store.state.realName;
    } else {
        this.name = '';
    }
    let _baseLanmu = window.sessionStorage.getItem('baseLanmu');
    if (_baseLanmu && JSON.parse(_baseLanmu) && JSON.parse(_baseLanmu).length > 0) {
        this.navList = JSON.parse(_baseLanmu);
    } else {
        getCodeMenuList('base').then((data) => {
            this.navList = data;
            this.$setSess('baseLanmu', data);
        }).catch(err=>{
          
        });
    }
    let _this = this;
    this.$on('currentPage', function(msg) {
        _this.currentPage = msg;
    });

    this.$on('currentMenu', function(msg) {
        _this.currentMenu = msg;
    })

    this.$on('change-user-name', function(name) {
        _this.userName = name;
    })
  },
  destroyed(){
    window.sessionStorage.removeItem('baseLanmu');
  },
  methods: {
    changeNavStyle() {
      this.isShowText = !this.isShowText;
      this.isRotate = !this.isRotate;
      this.leftWidth = this.isShowText ? 230 : 50;
      this.leftPosition = this.isShowText ? 230 : 50;
    },
  }
}
</script>

