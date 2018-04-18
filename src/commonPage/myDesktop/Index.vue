<template>
    <div class="sy-app-container" id="sy-desktop_model">
        <div class="sy-home-header">
            <sy-header title="个人桌面" back="/desktop" type="desktop">
                <div class="sy-desktop-header-menu">
                    <div class="sy-desktop-header-menu-btn" v-if="menuList.length > 6" v-toggle>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="sy-desktop-header-menu-box" draggable="true">
                        <!-- <sy-draggable element="ul" v-model="menuList" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="handleEnd">
                            <transition-group type="transition" :name="'flip-list'"> -->
                            <ul>
                                <li class="sy-list-group-item" v-for="element in menuList" :key="element.id" @click="jump(element.resourceId)">
                                    <div class="sy-list-group-item-icon">
                                        <img :src="imgs[element.resourceId] || imgs.default">
                                        <p class="sy-badge">{{element.name}}</p>
                                    </div>
                                </li>
                            </ul>
                            <!-- </transition-group>
                        </sy-draggable> -->
                        <i class="clear"></i>
                    </div>
                </div>
                <span slot="back">
					<span title="桌面">
						<i style="color:#fff;" class="fa fa-university" aria-hidden="true" @click="open('reload')"></i>
					</span>
					<span title="个人" v-if="codeLists['btn_base_desk_info']" style="padding: 0 10px;">
						<i style="color:#fff;" class="fa fa-user-o" aria-hidden="true" @click="open('user')"></i>
					</span>
					<span title="用户模块布局管理" v-if="codeLists['btn_base_desk_lets']">
						<i style="color:#fff;" class="fa fa-address-book-o" aria-hidden="true" @click="open('menu')"></i>
					</span>
				</span>
            </sy-header>
        </div>
        <div class="sy-home-body" style="overflow:auto;">
            <el-row style="height:100%;" class="sy-desktop-body">
                <el-col :span="4" style="padding: 4px;">
                    <div>
                        <div class="sy-bg-white" style="height: 200px;margin-bottom:10px;">
                            <div class="sy-my-msg-model-box">
                                <img :src="deskImgUrl" class="sy-image" @error="imgError">
                                <div style="padding: 14px;">
                                    <span @click="open('user')">{{selfMsgForm.realName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="sy-bg-white" style="height: 100px;margin-bottom:10px;" v-if="showModelList['app_desktop_motto']">
                            <Motto @select-type="onSelectType" :motto="selfMsgForm.motto"></Motto>
                        </div>
                        <div class="sy-bg-white" style="height: 220px;margin-bottom:10px;" v-if="showModelList['app_desktop_album']">
                            <photos></photos>
                        </div>
                        <div class="sy-bg-white" v-if="showModelList['app_desktop_toolCase']">
                            <tools></tools>
                        </div>
                    </div>
                </el-col>
                <el-col v-if="false" :span="14" class="sy-model-2" style="padding: 4px;">
                    <div class="sy-model-box">
                        <div class="sy-model-row-2 sy-model-row-2-1">
                            <div class="sy-bg-white sy-full">
                                <msg-list></msg-list>
                            </div>
                        </div>
                        <div class="sy-model-row-2 sy-model-row-2-2">
                            <div class="sy-bg-white sy-full">
                                <class-list></class-list>
                            </div>
                        </div>
                        <div class="sy-model-row-2 sy-model-row-2-3">
                            <div class="sy-model-row-2 sy-model-row-2-3-1">
                                <div class="sy-bg-white sy-full">
                                    <warring-msg></warring-msg>
                                </div>
                            </div>
                            <div class="sy-model-row-2 sy-model-row-2-3-2">
                                <div class="sy-bg-white sy-full">
                                    <MyDayWork></MyDayWork>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col v-if="false" :span="6" class="sy-model-3" style="padding: 4px;">
                    <div>
                        <div class="sy-model-row-2 sy-model-row-2-1">
                            <div class="sy-bg-white sy-full">
                                <MyDashbord></MyDashbord>
                            </div>
                        </div>
                        <div class="sy-model-row-2 sy-model-row-2-2">
                            <div class="sy-bg-white sy-full">
                                <news></news>
                            </div>
                        </div>
                        <div class="sy-model-row-2 sy-model-row-2-3">
                            <div class="sy-bg-white sy-full">
                                <EmailBox></EmailBox>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="sy-home-footer">
            <foot></foot>
        </div>
        <!-- 修改个人信息 -->
        <sy-dialog title="修改个人设置" :close-on-click-modal="false" position="middle" height="auto" width="450px" slide="fade" :visible.sync="selfMsgDialog">
            <div slot="body" style="padding:10px 15px 10px 5px;">
                <el-tabs v-model="activeName" @tab-click="handleClick" label-width="100px">
                    <el-tab-pane label="修改密码" name="first">
                        <el-form :model="passForm" :rules="rules" ref="passForm" label-width="100px" class="sy-demo-ruleForm">
                            <el-form-item label="原密码：" prop="oldPass">
                                <el-input type="password" v-model="passForm.oldPass"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码：" prop="pass">
                                <el-input type="password" v-model="passForm.pass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码：" prop="checkPass">
                                <el-input type="password" v-model="passForm.checkPass" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="个人设置" name="second">
                        <el-form label-position="right" :rules="rules" label-width="100px" :model="selfMsgForm" ref="selfMsgForm">
                            <el-row>
                                <el-col :span="17">
                                    <el-form-item label="账号：">
                                        {{selfMsgForm.loginName}}
                                        <!-- <el-input v-model="selfMsgForm.account"></el-input> -->
                                    </el-form-item>
                                    <el-form-item label="姓名：">
                                        {{selfMsgForm.realName}}
                                        <!-- <el-input v-model="selfMsgForm.name"></el-input> -->
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7">
                                    <div class="center sy-upload-box">
                                        <el-upload :action="imgUrl" name="fileUpload" :data="data" :multiple="false" v-loading="imgloading" element-loading-text="正在上传" :show-file-list="false" :on-success="handleAvatarSuccess"
                                                   :before-upload="beforeAvatarUpload">
                                            <img v-if="isHaveImg" :src="showImgUrl" class="sy-avatar">
                                            <i v-else class="fa fa-user-circle-o sy-upload-user-default-img" aria-hidden="true"></i>
                                            <!-- <el-button size="small" type="primary" style="marginTop:8px;">上传照片</el-button>  -->
                                        </el-upload>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-form-item label="邮箱：" prop="loginEmail">
                                <el-input v-model="selfMsgForm.loginEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码：" prop="loginMobile">
                                <el-input v-model="selfMsgForm.loginMobile"></el-input>
                            </el-form-item>
                            <el-form-item label="密保问题：" prop="question">
                                <el-input v-model="selfMsgForm.question"></el-input>
                            </el-form-item>
                            <el-form-item label="密保答案：" prop="answer">
                                <el-input v-model="selfMsgForm.answer"></el-input>
                            </el-form-item>
                            <el-form-item label="简介：">
                                <el-input :rows="4" resize="none" type="textarea" v-model="selfMsgForm.brief"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer">
                <el-button type="" size="small" @click="selfMsgDialog = false">取 消</el-button>
                <el-button v-if="activeName === 'first'" type="primary" size="small" @click="submitForm('passForm')">确 定</el-button>
                <el-button v-if="activeName === 'second'" type="primary" size="small" @click="submitForm('selfMsgForm')">确 定</el-button>
            </div>
        </sy-dialog>
        <!-- 模块菜单配置 -->
        <sy-dialog title="模块菜单配置" :close-on-click-modal="false" position="middle" height="auto" width="700px" slide="fade" :visible.sync="menuModelDialog">
            <div slot="body" style="padding:10px;">
                <el-table :data="tableData" border :height="tableData.length > 5 ? '261' : ''" style="width: 100%">
                    <el-table-column v-for="item in columX" :key="item.prop" :prop="item.prop" :label="item.label">
                        <template scope="scope">
                            <span v-if="item.prop === 'remove'">{{scope.row[item.prop] ? '允许' : '不允许'}}</span>
                            <span v-else-if="item.prop === 'expand'">{{scope.row[item.prop] ? '允许' : '不允许'}}</span>
                            <span v-else-if="item.prop === 'tabs'">{{scope.row[item.prop] ? '是' : '否'}}</span>
                            <span v-else>{{scope.row[item.prop]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="100" v-if="codeLists['btn_base_desk_lets_status'] || codeLists['btn_base_desk_lets_update']">
                        <template scope="scope">
                            <el-button type="text" size="small" v-if="scope.row.status == 0 && codeLists['btn_base_desk_lets_status']" @click="controlPortalletStatus(scope.row)">启用</el-button>
                            <el-button type="text" size="small" v-if="scope.row.remove && scope.row.status == 1 && codeLists['btn_base_desk_lets_status']" @click="controlPortalletStatus(scope.row)">停用</el-button>
                            <el-button v-if="codeLists['btn_base_desk_lets_update']" type="text" size="small" @click="dialogEdit(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer">
                <el-button @click="menuModelDialog = false" type="primary">取 消</el-button>
            </div>
        </sy-dialog>
        <!-- 编辑dialog -->
        <sy-dialog title="编辑" :close-on-click-modal="false" position="middle" height="auto" width="700px" slide="fade" :visible.sync="isEditDialog">
            <div slot="body" style="padding:10px;">
                <el-row style="height:25px;">
                    <el-col :span="4" v-for="(item,index) in dialogConfig" :key="index">{{item.label}}</el-col>
                </el-row>
                <el-row v-for="(item,index) in editData" :key="index">
                    <el-col :span="4">
                        {{item.name}}
                    </el-col>
                    <el-col :span="4">
                        <el-input v-model="item.height" size="small" class="el-input-min-small"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-select class="el-input-min-small" v-model="item.remove" placeholder="请选择">
                            <el-option label="允许" :value="true">
                            </el-option>
                            <el-option label="不允许" :value="false">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select class="el-input-min-small" v-model="item.expand" placeholder="请选择">
                            <el-option label="允许" :value="true">
                            </el-option>
                            <el-option label="不允许" :value="false">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select class="el-input-min-small" v-model="item.tabs" placeholder="请选择">
                            <el-option label="是" :value="true">
                            </el-option>
                            <el-option label="否" :value="false">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer">
                <el-button @click="isEditDialog = false">取 消</el-button>
                <el-button @click="saveEditDialog(editData[0])" type="primary">保 存</el-button>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
	import desk from './index.js';
	import foot from '../footer/footer.vue';
	import SyHeader from '../header/header.vue';

	export default {
		mixins: [desk],
		components: {
			foot,
			SyHeader
		},
		data() {
			return {
				defaultImgUrl: '/common/images/photo.gif'
			}
		},
		methods: {
			imgError() {
				this.deskImgUrl = this.defaultImgUrl
			}
		}
	}
</script>

