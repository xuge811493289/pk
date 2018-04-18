<template>
	<div class="sy-app-container sy-pk">
		<div class="sy-home-header">
			<sy-header title="课表" :versionList="versionList">
				<span slot="back" title="排课首页">
					<i style="color:#fff;" class="fa fa-envira" @click="$router.push('/pk/pre/home')"></i>
				</span>
			</sy-header>
		</div>
		<div class="sy-home-body" >
			<div class="sy-home-body-left" :style="{width:leftWidth+'px'}">
				<div class="change-menu-icon">
				<i class="fa fa-outdent" aria-hidden="true" :class="{'iocn-rotate-l': isRotate}" @click="changeNavStyle"></i>
				</div>
				<sy-left-nav router :defaultActive="currentPage" :navList="navList" :isIcon="isShowText"></sy-left-nav>
			</div>
			<div class="sy-home-body-right sy-sc" :style="{left: leftPosition + 'px'}">
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
import foot from '../../../commonPage/footer/footer.vue';
import SyHeader from '../../../commonPage/header/header.vue';
import congif from './config.js';
import { getCodeMenuList } from '@/service/index.js';
import version from '../version.js';
export default {
	components: {
		foot,
		SyHeader
	},
	name: 'hello',
	data() {
		return {
      		versionList: version,
			isShowText: true,
			leftWidth: 230,
			leftPosition: 230,
			isRotate: false,
			currentPage: '',
			navList: [],
			currentMenu: '',
			isShowFullMenu: false
		}
	},
	watch:{

	},
	created() {
		document.title = '课表';
		getCodeMenuList('app_my_table').then((data) => {
			this.navList = data;
		});
		let _this = this;
		this.$on('currentPage', function(msg) {
			_this.currentPage = msg;
		});
		this.$on('isShowFullMenu', function(msg) {
			this.changeNavStyle();
		});
		this.$on('currentMenu', function(msg) {
			_this.currentMenu = msg;
		})
	},
	destroyed(){
		
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
<style>
@import url('./css/index');
</style>


