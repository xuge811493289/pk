<template>
    <div id="app">
        <transition name="fade" mode="out-in" appear>
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
	// 自定义组件
	import SyUI from './components';

	Vue.use(SyUI);
	import './css/index.css';
	import changeTheme from './theme/index.js'

	export default {
		created() {
			changeTheme(); // 更换主题
		}
	}
</script>

<style>

</style>