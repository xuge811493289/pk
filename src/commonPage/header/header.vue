<template>
    <div class="sy-header-nav">
		<div class="sy-header-nav-left">
			<img :src="getUnitLogo" :onerror="handleImgError" />
			<span class="sy-header-nav-title">{{title}}</span>
		</div>
		<div class="sy-header-nav-center">
			<slot></slot>
		</div>
		<div class="sy-header-nav-right">
			<img v-if="type == 'platform'" src="/common/images/header.png" />
			<span v-if="type == 'platform'">{{'欢迎您' + (userName ? (',' + userName) : userName) + '!'}}</span>
			<span v-if="back == '/' && type == 'platform'" title="返回桌面"><i style="color:#fff;" class="fa fa-home" @click="$router.push(back)"></i></span>
			<span v-if="$slots.back">
				<slot name="back"></slot>
			</span> 
			<span title="换肤"><i style="color:#fff;" class="fa fa-television" aria-hidden="true" @click="open('theme')"></i></span>   
			<span v-if="type == 'platform'" title="关于"><i style="color:#fff;" class="fa fa-exclamation-circle fa-rotate-180" @click="aboutDialog=true"></i></span>
			<span title="注销"><i style="color:#fff;" class="fa fa-power-off" aria-hidden="true"  @click="open('logout')"></i></span>
			<span v-if="env" :title="'开发端口'"  @click="open('host')">
				<i class="fa fa-connectdevelop" aria-hidden="true"></i>
			</span>
			<span title="全屏"  @click="open('full')">
				<i v-if="isfullscreen" style="color:#fff;" class="fa fa-window-maximize" aria-hidden="true" ></i>
				<i v-else style="color:#fff;" class="fa fa-window-restore" aria-hidden="true" ></i>
			</span>
		</div>
		<!-- 开发端口 -->
		<el-dialog title="开发端口" :visible.sync="dialogFormVisible" size="tiny">
			<div>
				<el-input placeholder="请输入地址"  @keyup.enter.native="changeHost"  v-model="inputHost"></el-input>
			</div>	
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="changeHost">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 关于 -->
		<el-dialog title="关于" :visible.sync="aboutDialog" size="tiny">
			<div class="sy-about-top">
				<img class="sy-about-logo" src="/common/images/aboutLogo.png">
				<span class="sy-about-logo-text">上海师悦信息科技有限公司</span>
			</div>
			<div class="sy-about-cont">
				<el-row style="line-height:28px;">
					<el-col :span="5" class="right">产品模块：</el-col>
					<el-col :span="19">{{versionList[versionList.length-1].model}}</el-col>
					<el-col :span="5" class="right">版本：</el-col>
					<el-col :span="19">{{versionList[versionList.length-1].version}}</el-col>
					<el-col :span="5" class="right">版本说明：</el-col>
					<el-col :span="19">
						<div v-for="(o , index) in versionList[versionList.length-1].metto" :key="'metto_'+index">{{index*1+1}}.{{o}}；</div>
					</el-col>
				</el-row>
			</div>
			<div class="sy-about-foot">
				<div>上海师悦信息科技有限公司</div>
				<div>版权所有2017 Shiyue Inc. 保留所有权利。</div>
			</div>
		</el-dialog>
		<!-- 主题设置 -->
		<sy-dialog
			title="主题设置"
			:close-on-click-modal="false"
			position="middle"
			height="auto"
			width="550px"
			slide="fade"
			:visible.sync="themeModelDialog">
			<div slot="body" style="padding:10px 20px;">
				<div class="sy-sy-theme-row">
				<p>系统主题</p>
				<ul class="sy-parmary-color">
					<li v-for="c in themeColorList" :key="c.color" @click="changeThemeColor(c.color)">
						<i :style="{background:c.color}"></i>
						<p class="center">{{c.name}}</p>
					</li>
					<li>
						<sy-color-picker class="color-other" defaultColor="#20a0ff" v-model="currentColor"></sy-color-picker>
						<p class="center">其他</p>
					</li>
				</ul>
				</div>
			</div>
		</sy-dialog>
    </div>
</template>

<script>
import header from './header.js';
export default {
	mixins: [header],
	props: {
		versionList: {
			type: Array,
			default: () => {
				return [{
					version: '4.0.0',
					model: '基础平台',
					metto: ['本版本中进行了页面扁平化的设计，在用户体验和流程上进行了大的优化，性能大大提升']
				}]
			}
		},
		type: {
			type: String,
			default: 'platform'  // desktop platform
		},
		title: {
			type: String,
			default: '管理平台'
		},
		back: {
			type: String,
			default: '/'
		},
		name: {
			type: String,
			default: ''
		}
	},
	methods:{
		handleImgError(){
			this.getUnitLogo = '/common/images/shiyuelogo.png';
		}
	}
}
</script>
<style scoped>
.sy-host{
	display: block;
	margin: 5px 0;
}
</style>
