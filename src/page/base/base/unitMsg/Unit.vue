<template>
	<div class="app-container-box">
		<sy-grad-4 :border="false">
			<div slot="headerRight" class="line-height-56">
				<el-form :inline="true" :model="paras" class="demo-form-inline sy-left">
					<el-form-item label="关键字：" prop="keyWord">
						<el-input v-model="paras.keyword" class="mt3 drop" placeholder="名称、简称、校长、地址、电话"></el-input>
					</el-form-item>
					<el-form-item label="上级单位：">
						<el-dropdown trigger="hover" placement="bottom">
							<span class="el-dropdown-link">
								<el-input class="mt3 drop" @click="clearUnitSelect" :readonly="true" :icon="inputSel && inputSel.length > 0 ? 'circle-close' : 'el-input__icon el-icon-caret-bottom'" v-model="inputSel" placeholder="请选择内容"></el-input>
							</span>
							<el-dropdown-menu slot="dropdown" class="drop">
								<el-tree :data="treeData" style="height:300px;overflow:auto;" :props="defaultProps" @current-change="currentChangeGetTree"></el-tree>
							</el-dropdown-menu>
						</el-dropdown>
					</el-form-item>
					<el-form-item>
						<el-button class="mt6" @click="addUnitUserList">查询</el-button>
					</el-form-item>
				</el-form>
				<el-button class="sy-right" @click="addUnitVal" style="margin-top:6px" v-if="codeList['btn_base_school_add'] && tplUnitType=='1'">新增</el-button>
			</div>
			<div slot="bodyRight">
				<div class="full-parent-height">
					<el-table :data="tableData"v-loading="unitLoading" :empty-text="emptyTextUnit" border height="100%" class="table_style" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55" :selectable="handleSelectable"></el-table-column>
						</el-table-column>
						<el-table-column v-for="item in appColumn" :prop="item.prop" :key="item.prop" :width="item.width" :label="item.label">
							<template scope="scope">
								<span v-if="item.prop !== 'unitType'">{{scope.row[item.prop]}}</span>
								<span v-else>{{scope.row[item.prop] === 1 ? '教育局' : '学校'}}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="120" align="center">
							<template scope="scope">
								<i class="fa fa-pencil-square-o" title="修改" style="cursor: pointer;" v-if="codeList['btn_base_school_update']" @click="handleEdit(scope.$index, scope.row)"></i>
								<i class="el-icon-delete" title="删除" style="cursor: pointer;margin-left:10px"  v-if="codeList['btn_base_school_delete'] && tplUnitType=='1'" @click="handleDelete(scope.$index, scope.row)"></i>
							</template>
						</el-table-column>
					</el-table>

					<!--新增-->
					<sy-dialog title="新增" :before-close="beforeClose" :visible.sync="addUnitVisible" class="addunit" :close-on-click-modal="false" position="middle"  height="auto" style="min-height:300px" width="735px" slide="fade" size="small">
						<div slot="body" style="padding: 20px;height:100%;" ref="addunit">
							<el-form label-position="right" :rules="rules" v-loading="addLoading" label-width="120px" :model="addUnitForm" ref="addUnitForm">
								<el-row>
									<el-col :span="12">
										<div class="register-form">
											<el-form-item label="单位名称：" prop="name">
												<el-input v-model="addUnitForm.name"></el-input>
											</el-form-item>
											<el-form-item label="单位类型：" class="input_width" prop="unitType">
												<el-select v-model="addUnitForm.unitType" placeholder="请选择" @change="handleUnitTypeSel">
													<el-option label="教育局" value="1">
													</el-option>
													<el-option label="学校" value="2">
													</el-option>
												</el-select>
											</el-form-item>
										</div>
										<div class="register-form">
											<el-form-item label="简称：" prop="xxjc">
												<el-input v-model="addUnitForm.xxjc"></el-input>
											</el-form-item>
											<el-form-item label="temp"  class="input_width" prop="shUnit">
												<span slot="label">
													<span class="red">*</span>单位类别：</span>
												<el-cascader :options="optionsLB" :disabled="unitClass" :props="optionsUnit" :show-all-levels="false" @change="currentClickNode" v-model="shUnit"></el-cascader>
											</el-form-item>
										</div>
									</el-col>
									<el-col :span="12" class="upPhoto">
										<el-upload class="avatar-uploader" :action="imgData" name="fileUpload" :data="imgWidth" v-loading="imgLoading" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
											<div class="avatar-content">
												<img :src="addImageUrl" class="avatar">
											</div>
											<p>上传照片38*38</p>
										</el-upload>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="temp" prop="stageIds"  :rules="[{required: true, validator: checkStageIds, trigger: 'change'}]">
											<span slot="label">
												所属学段：</span>
											<el-checkbox-group v-model="addUnitForm.stageIds" :min="1" :max="5">
												<el-checkbox label="1">学前教育</el-checkbox>
												<el-checkbox label="2">小学</el-checkbox>
												<el-checkbox label="3">初中</el-checkbox>
												<el-checkbox label="4">高中</el-checkbox>
												<el-checkbox label="5">其他</el-checkbox>
											</el-checkbox-group>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="temp" prop="froprovince">
											<span slot="label">
												<span class="red">*</span>所在行政区：</span>
											<el-cascader :options="optionsPro" @active-item-change="handleItemChange" :show-all-levels="false" v-model="city" :props="optionsCity"></el-cascader>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="统一编码：" prop="unityCode">
											<el-input class="unitCode" :disabled="true" v-model="addUnitForm.cityNumber"></el-input>
											<el-input class="unitCode" v-model="addUnitForm.unityCode"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="上级单位：">
											<el-dropdown trigger="hover">
												<span class="el-dropdown-link">
													<el-input class="mt3" @click="clearUnitSelect1" :icon="inputSel1 && inputSel1.length > 0 ? 'circle-close' : 'el-input__icon el-icon-caret-bottom'" v-model="inputSel1" placeholder="请选择内容"></el-input>
												</span>
												<el-dropdown-menu slot="dropdown" class="drop">
													<el-tree :data="treeData" style="height:300px;overflow:auto;" :props="defaultProps"  @current-change="currentChangeTree"></el-tree>
												</el-dropdown-menu>
											</el-dropdown>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="序号：" prop="sort">
											<el-input v-model="addUnitForm.sort"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="单位网站：" prop="website">
											<el-input placeholder="请输入内容" v-model="addUnitForm.website">
												<template slot="prepend">Http://</template>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="数据开始年度：" prop="dataStartYear">
											<el-input v-model="addUnitForm.dataStartYear"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="当前年度：" prop="yearValue" v-if="!yearTermShow">
											<el-input v-model="addUnitForm.yearValue" :disabled="yearTermShow"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="当前学期：" prop="termValue" class="input_width" v-if="!yearTermShow">
											<el-select v-model="addUnitForm.termValue" :disabled="yearTermShow" placeholder="请选择">
												<el-option label="第一学期" value="1">
												</el-option>
												<el-option label="第二学期" value="2">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :span="24">
									<el-form-item prop="memo" :label="addUnitForm.unitType=='1'?'单位简介：':'学校简介：'">
										<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addUnitForm.memo">
										</el-input>
									</el-form-item>
								</el-row>
								<el-row>
									<el-col :span="24">
										<div class="btn_show" style="cursor:pointer; border:1px solid #ccc;height:30px;line-height: 30px;margin-top:20px" @click="showAddData" @mouseenter="showMoreIsVisible=true" @mouseleave="showMoreIsVisible=false">
											<span class="el-icon-caret-bottom" v-show="!show"></span>
											<span class="el-icon-caret-top" v-show="show"></span>
											<span v-if="showMoreIsVisible">{{showMore}}</span>
										</div>
									</el-col>
								</el-row>
								<el-collapse-transition>
									<el-row v-show="show">
										<div class="transition-box">

											<el-col :span="12">
												<el-form-item :label="addUnitForm.unitType=='1'?'单位英文名称：':'学校英文名称：'" prop="xxywmc">
													<el-input v-model="addUnitForm.xxywmc"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="邮政编码：" prop="zipCode">
													<el-input v-model="addUnitForm.zipCode"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="法定代表人：" prop="fddbrh">
													<el-input v-model="addUnitForm.fddbrh"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item :label="addUnitForm.unitType=='1'?'单位办别：':'学校办别：'">
													<el-select v-model="addUnitForm.dwbb" placeholder="请选择">
														<el-option label="公办" value="1">
														</el-option>
														<el-option label="教育部门和集体办" value="2">
														</el-option>
														<el-option label="民办" value="3">
														</el-option>
														<el-option label="社会力量办" value="4">
														</el-option>
														<el-option label="其他部门办" value="5">
														</el-option>
														<el-option label="民办公助" value="6">
														</el-option>
														<el-option label="其他" value="7">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item :label="addUnitForm.unitType=='1'?'单位办别码：':'学校办别码：'" prop="xxbbm">
													<el-input v-model="addUnitForm.xxbbm"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="党委负责人号：" prop="dwfzrh">
													<el-input v-model="addUnitForm.dwfzrh"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item :label="addUnitForm.unitType=='1'?'单位主管部门：':'学校主管部门：'" prop="xxzgbmm">
													<el-input v-model="addUnitForm.xxzgbmm"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12" :style="{'display':addUnitForm.unitType=='1'?'none':''}">
												<el-form-item label="重点级别：">
													<el-select v-model="addUnitForm.priorityLeves" placeholder="请选择">
														<el-option label="省重点学校" value="1">
														</el-option>
														<el-option label="市重点学校" value="2">
														</el-option>
														<el-option label="县重点学校" value="3">
														</el-option>
														<el-option label="非重点级别" value="4">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="传真电话：" prop="fax">
													<el-input v-model="addUnitForm.fax"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12" :style="{'display':addUnitForm.unitType=='1'?'none':''}">
												<el-form-item label="示范级别：">
													<el-select v-model="addUnitForm.sfjb" placeholder="请选择">
														<el-option label="国家级示范学校" value="1">
														</el-option>
														<el-option label="省级示范学校" value="2">
														</el-option>
														<el-option label="市级示范学校" value="3">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="联系电话：" prop="phone">
													<el-input v-model="addUnitForm.phone"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="E-mail：" prop="email">
													<el-input v-model="addUnitForm.email"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="组织机构码：" prop="zzjgm">
													<el-input v-model="addUnitForm.zzjgm"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12" :style="{'display':addUnitForm.unitType=='1'?'none':''}">
												<el-form-item label="校庆日：" prop="xqr">
													<el-input v-model="addUnitForm.xqr" placeholder="例如：09-01"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="所在地区类别：">
													<el-select v-model="addUnitForm.szdqlb" placeholder="请选择">
														<el-option label="城市" value="1">
														</el-option>
														<el-option label="县镇" value="2">
														</el-option>
														<el-option label="农村" value="3">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="当地经济属性：">
													<el-select v-model="addUnitForm.szdjjsxm" placeholder="请选择">
														<el-option label="非贫困县" value="1">
														</el-option>
														<el-option label="国家级贫困县" value="2">
														</el-option>
														<el-option label="省级贫困县" value="3">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="当地民族属性：">
													<el-select v-model="addUnitForm.szdmzsx" placeholder="请选择">
														<el-option label="非民族自治区" value="1">
														</el-option>
														<el-option label="民族" value="2">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="成立年月：">
													<el-date-picker size="small" :readonly="true" v-model="addUnitForm.builtDate" type="date" placeholder="选择日期时间">
													</el-date-picker>
												</el-form-item>
											</el-col>
											<el-col :span="24">
												<el-form-item prop="address" :label="addUnitForm.unitType=='1'?'单位地址：':'学校地址：'">
													<el-input v-model="addUnitForm.address"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12" :style="{'display':addUnitForm.unitType=='1'?'none':''}">
												<el-form-item label="农民工子女定点学校：" labelWidth="150px">
													<el-radio-group v-model="addUnitForm.nmgznddxx">
														<el-radio :label="1">是</el-radio>
														<el-radio :label="0">否</el-radio>
													</el-radio-group>
												</el-form-item>
											</el-col>
										</div>
									</el-row>
								</el-collapse-transition>
								<el-row>
									<el-col :span="12">
										<h4>
											<span class="red">*</span>单位管理员维护</h4>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="账号：" prop="loginName">
											<el-input v-model="addUnitForm.loginName"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="姓名：" prop="realName">
											<el-input v-model="addUnitForm.realName"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="密码：" prop="loginPassWord">
											<el-input v-model="addUnitForm.loginPassWord"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="确认密码：" prop="loginqrPwd">
											<el-input v-model="addUnitForm.loginqrPwd"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</div>
						<span slot="footer" class="dialog-footer foot_btn">
							<el-button @click="handleClose">取 消</el-button>
							<el-button type="primary" :loading="addLoading" @click="addUnitSubmit('addUnitForm')">确 定</el-button>
						</span>
					</sy-dialog>
					<!--修改-->
					<sy-dialog title="修改" :before-close="beforeClose" :visible.sync="dialogEditFormVisible" :close-on-click-modal="false" position="middle"  height="auto" style="min-height:300px" width="735px" slide="fade">
						<div slot="body" ref="editunit">
							<el-form label-position="right" :rules="rulesing" label-width="120px" :model="editUnitForm" ref="editUnitForm">
								<el-row>
									<el-col :span="12">
										<div class="register-form">
											<el-form-item label="单位名称：" prop="name">
												<el-input v-model="editUnitForm.name"></el-input>
											</el-form-item>
											<el-form-item label="单位类型：">
												<el-select v-model="editUnitForm.unitType" :disabled="true" placeholder="请选择">
													<el-option :label="'教育局'" :value="1">
													</el-option>
													<el-option :label="'学校'" :value="2">
													</el-option>
												</el-select>
											</el-form-item>
										</div>
										<div class="register-form">
											<el-form-item label="简称：" prop="xxjc">
												<el-input v-model="editUnitForm.xxjc"></el-input>
											</el-form-item>
											<!--三级联动-->
											<el-form-item label="单位类别：">
												<el-cascader :options="optionsLB" :disabled="true" :placeholder="unitCName" :props="optionsUnit" :show-all-levels="false" v-model="shUnit"></el-cascader>
											</el-form-item>
										</div>
									</el-col>
									<el-col :span="12" class="upPhoto">
										<el-upload class="avatar-uploader" :action="imgData" 
											name="fileUpload" v-loading="imgLoading" :data="imgWidth" 
											:show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
											<div class="avatar-content">
												<img :src="editImageUrl" class="avatar">
											</div>
											<p>上传照片38*38</p>
										</el-upload>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="temp">
											<span slot="label">所属学段：</span>
											<el-checkbox-group v-model="editUnitForm.stageIds" :min="1" :max="5">
												<el-checkbox label="1" disabled >学前教育</el-checkbox>
												<el-checkbox label="2" disabled >小学</el-checkbox>
												<el-checkbox label="3" disabled >初中</el-checkbox>
												<el-checkbox label="4" disabled >高中</el-checkbox>
												<el-checkbox label="5" disabled>其他</el-checkbox>
											</el-checkbox-group>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="temp" prop="froprovince">
											<span slot="label">
												<span class="red">*</span>所在行政区：</span>
											<el-cascader ref="edit-cascader" :options="optionsPro1" @active-item-change="handleItemChange" :show-all-levels="false" v-model="city" :props="optionsCity"></el-cascader>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="统一编码：" prop="unityCode">
											<el-input class="unitCode" :disabled="true" v-model="editUnitForm.froprovince"></el-input>
											<el-input class="unitCode" v-model="editUnitForm.unityCode"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="上级单位：">
											<el-dropdown trigger="none">
												<span class="el-dropdown-link">
													<el-input class="mt3" :disabled="true" style="width:100%" :icon="inputSel2 && inputSel2.length > 0 ? 'circle-close' : 'el-input__icon el-icon-caret-bottom'" v-model="inputSel2" placeholder="请选择内容"></el-input>
												</span>
												<el-dropdown-menu slot="dropdown" class="drop">
													<el-tree :data="treeData" :props="defaultProps"></el-tree>
												</el-dropdown-menu>
											</el-dropdown>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="序号：" prop="sort">
											<el-input v-model="editUnitForm.sort"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="单位网站：" prop="website">
											<el-input v-model="editUnitForm.website" placeholder="请输入内容">
												<template slot="prepend">Http://</template>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="数据开始年度：" prop="dataStartYear">
											<el-input v-model="editUnitForm.dataStartYear" disabled></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="当前年度：">
											<el-input v-model="editUnitForm.yearValue" disabled placeholder="请选择"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="当前学期：">
											<el-select v-model="editUnitForm.termValue" disabled placeholder="请选择">
												<el-option label="第一学期" value="1">
												</el-option>
												<el-option label="第二学期" value="2">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :span="24">
									<el-form-item prop="memo" :label="editUnitForm.unitType=='1'?'单位简介：':'学校简介：'">
										<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="editUnitForm.memo">
										</el-input>
									</el-form-item>
								</el-row>
								<el-row>
									<el-col :span="24">
										<div class="btn_show" style="cursor:pointer; border:1px solid #ccc;height:30px;line-height: 30px;margin-top:20px" @click="showAddData" @mouseenter="showMoreIsVisible=true" @mouseleave="showMoreIsVisible=false">
											<span class="el-icon-caret-bottom" v-show="!show"></span>
											<span class="el-icon-caret-top" v-show="show"></span>
											<span v-if="showMoreIsVisible">{{showMore}}</span>
										</div>
									</el-col>
								</el-row>
								<el-collapse-transition>
									<div class="transition-box" v-show="show">
										<el-row>
											<el-col :span="12">
												<el-form-item prop="xxywmc" :label="editUnitForm.unitType=='1'?'单位英文名称：':'学校英文名称：'">
													<el-input v-model="editUnitForm.xxywmc"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												 <el-form-item :label="editUnitForm.unitType=='1'?'局长：':'校长：'">
												 	 <el-button v-model="editUnitForm.headofschool" @click="selectDeManager" class="selectBtn-in-dialog" :style="{color: dmName==='点击选择'?'#99A9BF':''}">{{dmName}}
                                                     </el-button>
									              </el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12">
												<el-form-item label="邮政编码：" prop="zipCode">
													<el-input v-model="editUnitForm.zipCode"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="成立年月：">
													<el-date-picker size="small" v-model="editUnitForm.builtDate" :editable="false" type="date" placeholder="选择日期时间">
													</el-date-picker>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12">
												<el-form-item label="法定代表人：" prop="fddbrh">
													<el-input v-model="editUnitForm.fddbrh"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item :label="editUnitForm.unitType=='1'?'单位办别：':'学校办别：'">
													<el-select v-model="editUnitForm.dwbb" placeholder="请选择">
														<el-option label="公办" value="1">
														</el-option>
														<el-option label="教育部门和集体办" value="2">
														</el-option>
														<el-option label="民办" value="3">
														</el-option>
														<el-option label="社会力量办" value="4">
														</el-option>
														<el-option label="其他部门办" value="5">
														</el-option>
														<el-option label="民办公助" value="6">
														</el-option>
														<el-option label="其他" value="7">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12">
												<el-form-item label="学校办别码：" prop="xxbbm" :label="editUnitForm.unitType=='1'?'单位办別码：':'学校办別码：'">
													<el-input v-model="editUnitForm.xxbbm"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="党委负责人号：" prop="dwfzrh">
													<el-input v-model="editUnitForm.dwfzrh"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12">
												<el-form-item :label="editUnitForm.unitType=='1'?'单位主管部门：':'学校主管部门：'" prop="xxzgbmm">
													<el-input v-model="editUnitForm.xxzgbmm"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="传真电话：" prop="fax">
													<el-input v-model="editUnitForm.fax"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12" :style="{'display':editUnitForm.unitType=='1'?'none':''}">
												<el-form-item label="重点级别：">
													<el-select v-model="editUnitForm.priorityLeves" placeholder="请选择">
														<el-option label="省重点学校" value="1">
														</el-option>
														<el-option label="市重点学校" value="2">
														</el-option>
														<el-option label="县重点学校" value="3">
														</el-option>
														<el-option label="非重点级别" value="4">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12" :style="{'display':editUnitForm.unitType=='1'?'none':''}">
												<el-form-item label="示范级别：">
													<el-select v-model="editUnitForm.sfjb" placeholder="请选择">
														<el-option label="国家级示范学校" value="1">
														</el-option>
														<el-option label="省级示范学校" value="2">
														</el-option>
														<el-option label="市级示范学校" value="3">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12">
												<el-form-item label="联系电话：" prop="phone">
													<el-input v-model="editUnitForm.phone"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="E-mail：" prop="email">
													<el-input v-model="editUnitForm.email"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12">
												<el-form-item label="组织机构码：" prop="zzjgm">
													<el-input v-model="editUnitForm.zzjgm"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="当地民族属性：">
													<el-select v-model="editUnitForm.szdmzsx" placeholder="请选择">
														<el-option label="非民族自治区" value="1">
														</el-option>
														<el-option label="民族" value="2">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12">
												<el-form-item label="所在地区类别：">
													<el-select v-model="editUnitForm.szdqlb" placeholder="请选择">
														<el-option label="城市" value="1">
														</el-option>
														<el-option label="县镇" value="2">
														</el-option>
														<el-option label="农村" value="3">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="当地经济属性：">
													<el-select v-model="editUnitForm.szdjjsxm" placeholder="请选择">
														<el-option label="非贫困县" value="1">
														</el-option>
														<el-option label="国家级贫困县" value="2">
														</el-option>
														<el-option label="省级贫困县" value="3">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="24">
												<el-form-item :label="editUnitForm.unitType=='1'?'单位地址：':'学校地址：'" prop="address">
													<el-input v-model="editUnitForm.address"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12" :style="{'display':editUnitForm.unitType=='1'?'none':''}">
												<el-form-item label="校庆日：" prop="xqr">
													<el-input v-model="editUnitForm.xqr" placeholder="例如：09-01"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12" :style="{'display':editUnitForm.unitType=='1'?'none':''}">
												<el-form-item label="农民工子女定点学校：" labelWidth="150px">
													<el-radio-group v-model="editUnitForm.nmgznddxx">
														<el-radio :label="1">是</el-radio>
														<el-radio :label="0">否</el-radio>
													</el-radio-group>
												</el-form-item>
											</el-col>
										</el-row>
									</div>
								</el-collapse-transition>
							</el-form>
						</div>
						<div slot="footer" class="dialog-footer foot_btn">
							<el-button @click="handleClose">取 消</el-button>
							<el-button type="primary" :loading="editLoading" @click="editUnitSubmit">确 定</el-button>
						</div>
					</sy-dialog>
				</div>
			</div>

			<div slot="footer">
				<el-button type="danger" @click="DeleteTableSel" v-if="codeList['btn_base_school_delete'] && tplUnitType=='1'" :disabled="this.sels.length===0">删除</el-button>
				<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" class="pagination-mf" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</sy-grad-4>
	</div>
</template>
<script>
import {
	getUnitList, deleteUnitList,
	deleteUnitAllList, addUnitListVal,
	updataUnitList, addDropdownTreeList,
	getUnitData, verificationUnitName,
	verificationUnicode, getUnitProvince,
	getUnitCities, getUnitCounty,
	getUnitCountyNumber, getCodeId,
	getFullName, imgUrl, showImgUrl,
	checkUserName,
	getStageName, validataPhone
} from '../require.js';
import config from './config.js';
import pager from '../../config.js';
import { getRcCodeList } from '../../request.js';
import _ from 'lodash';
import moment from 'moment';
export default {
	data() {
		let xqrCheck = (rule, value, callback) => {
			let reg = /(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-9])))/
			if (value) {
				if (reg.test(value)) {
					callback()
				} else {
					callback(new Error('请输入有效日期！'))
				}
			} else {
				callback()
			}
		}
		let vifUnitName = (rule, value, callback) => {
			//提交前需要判断你的单位名称是否为空
			if (value == undefined || value.length == 0) {
				callback(new Error("单位名称不能为空"));
				return false;
			} else {
				verificationUnitName(value).then((res) => {
					if (res.data) {
						callback(new Error("单位名称重复"));
						return false;
					}
					callback();
				});
			}

		};
		let vifEditUnitName = (rule, value, callback) => {
			//提交前需要判断你的单位名称是否为空
			if (value == undefined || value.length == 0) {
				callback(new Error("单位名称不能为空"));
				return false;
			} else {
				if (this.editUnitForm.oldName == value) {
					callback();
					return false;
				};
				//在修改里面需要判断为修改前的数据还是修改后的数据
				verificationUnitName(value).then((res) => {
					if (res.data) {
						callback(new Error("单位名称重复"));
						return false;
					}
					callback();
				});
			}

		};
		let vifCode = (rule, value, callback) => {
			if (value) {
				let u = /^\d+$/;
                let v = value;
                if (u.test(v)) {
                    callback();
                } else {
                    callback(new Error("统一编码只能是数字"));
                };

			} else {
                callback(new Error("统一编码不能为空！"));
			}
		};
		//统一编码
		let vifUnityCode = (rule, value, callback) => {
			let n = (!this.addUnitForm.cityNumber || this.addUnitForm.cityNumber.length == 0);
			let c = (!this.addUnitForm.unityCode || this.addUnitForm.unityCode.length == 0);
			if (n || c) {
				callback(new Error((n ? "行政区编码" : "统一编码") + "不能为空"));
				return false;
			}
			verificationUnicode(this.addUnitForm.cityNumber + this.addUnitForm.unityCode).then((res) => {
				if (res.data) {
					callback(new Error("请输入正确的统一编码"));
					return false;
				} else {
					callback();
				}
			});
			let u = /^\d+$/;
			let v = this.addUnitForm.unityCode;
			if (u.test(v)) {
				callback();
			} else {
				callback(new Error("统一编码只能是数字"));
			};
		};
		//开始年度校验
		let vifDataStartYear = (rule, value, callback) => {
			let n = /^\d{4}-\d{4}$/;
			let v = value;
			if (n.test(v)) {
				let year = v.split('-');
				let year1 = parseInt(year[1]);
				let year2 = parseFloat(year[0]);
				if (year1 - year2 > 0) {
					if (year1 - year2 == 1) {
						callback();
					} else {
						callback(new Error("开始年度之间只能隔一年"));
					}
				} else {
					callback(new Error("开始年度不能大于结束年度"));
				}

			} else {
				callback(new Error("请输入开始年度格式。格式：2011-2012"));
			}
		};

		//序号校验
		let vifSort = (rule, value, callback) => {
			if (value) {
				let n = /^\d+$/;
				let v = value;
				if (n.test(v)) {
					if (value.length > 50) {
						callback(new Error("序号长度不能超过50个字符"));
					} else {
						callback();
					}
				} else {
					callback(new Error("请输入正确的数字"));
				}
			} else {
				callback();
			}
		};
		//电话号码
		let vifPhone = (rule, value, callback) => {
			if (value) {
				let n = /^1[3|4|5|8][0-9]\d{4,8}$/;
				let v = value;
				if (n.test(v)) {
                    return callback();
				} else {
					return callback(new Error("请输入正确的联系电话"));
				}
			} else {
				return callback();
			}
		};
		//用户名验证
		let vifLoginName = (rule, value, callback) => {
			if (value) {
				let n = /^[a-zA-Z0-9_]+$/;
				let v = value;
				if (n.test(v)) {
					callback();
				} else {
					callback(new Error("账号只能是数字，字母，下划线"));
				}
			} else {
				callback();
			}
		}
		//用户名的唯一性
		let userNameOnly = (rule, value, callback) => {
			checkUserName({ loginName: value }).then((res) => {
				if (res.data) {
					callback();
				} else {
					callback(new Error('账号不能重复！'));
				}
			})
		};
		let vifLoginPsw = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('密码不能为空'));
			} else {
				if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
					return callback(new Error('只能输入字母、数字、下划线！'));
				} else {
					if (value.length <= 16 && value.length >= 8) {
						callback()
					} else {
						callback(new Error('长度在8~16位之间！'));
					}
				}
			}
		};
		//密码的一致
		let vifPsword = (rule, value, callback) => {
			if (value) {
				if (value != this.addUnitForm.loginPassWord) {
					callback(new Error("前后密码不一致！"));
				} else {
					callback();
				}
			} else {
				callback();
			}
		};

		//邮箱验证
		let vifEmail = (rule, value, callback) => {
			if (value) {
				let t = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				let v = value;
				if (t.test(v)) {
					callback();
				} else {
					callback(new Error('邮箱格式不正确！'));
				};
				//唯一性校验
			} else {
				callback();
			}
		};
		//校验单位类别
		let vifxxlx = (rule, value, callback) => {
			if (this.addUnitForm.unitType == 1) {
				callback();
			} else if (this.addUnitForm.unitType == 2) {
				if (this.shUnit == undefined || this.shUnit.length == 0) {
					callback(new Error('单位类别不能为空！'));
				} else {
					callback();
				}
			}
		};
		//校验行政区
		let vifFroprName = (rule, value, callback) => {
			if (this.city == undefined || this.city.length == 0) {
				callback(new Error('所在行政区不能为空！'));
			} else {
				callback();
			}
		};
		//当前年度的校验
		let vifCrruentYear = (rule, value, callback) => {
                if (this.addUnitForm.unitType == 1) {
                    callback();
                } else if (this.addUnitForm.unitType == 2) {
                    if (this.addUnitForm.yearValue == undefined || this.addUnitForm.yearValue.length == 0) {
                        callback(new Error('当前年度不能为空！'));
                    } else {
                        let y = /^\d{4}-\d{4}$/;
                        if (y.test(value)) {
                            let year = value.split('-');
                            let year3 = parseInt(year[1]);
                            let year4 = parseInt(year[0]);
                            if (year3 - year4 > 0) {
                                if (year3 - year4 == 1) {
                                    callback();
                                } else {
                                    callback(new Error("当前年度之间只能隔一年"));
                                }
                            } else {
                                callback(new Error("开始年度不能大于结束年度"));
                            }

                        } else {
                            callback(new Error("请输入当前年度格式。格式：2011-2012"));
                        }
                    }
                }
            }; 
            //当前学期
            let vifCrruentTrem = (rule, value, callback) => {
                if (this.addUnitForm.unitType == 1) {
                    callback();
                } else if (this.addUnitForm.unitType == 2) {
                    if (this.addUnitForm.termValue == undefined || this.addUnitForm.termValue.length == 0) {
                        callback(new Error('当前学期不能为空！'));
                    } else {
                        callback();
                    }
                }
            };
			return {
                emptyTextUnit:'正在加载中...',
                unitLoading:false,
				imgWidth:{
					width:600,
					serverid: 'base',
					uploadtype: 'unit_head',
					unitId: undefined
                },
                dmName: "",
                showMore:"",
        		showMoreIsVisible:false,
				unitTypes:"",
				fro:"",//保存新增里面的行政区码（获取行政区名）
				editFro:'',//保存 修改里面的行政区码（点击第一级时候，获取第二级和第三级）
				yearTermShow:false,
				addLoading:false,
                editLoading:false,
				imgLoading:false,
				unitCName:"",
				imgData:imgUrl,
				editCity: '',
				city: [],
				oldCity: [],
				cities: [],
				shUnit:[],
				value1:'',
				value2:'',
				// keyWord:'',
				show: false,
				baseImageUrl: '/common/images/shiyuelogo.png',
				addImageUrl:"",
				editImageUrl:"",
				inputSel: '',
				inputSel1:'',
				inputSel2:'',
				optionsPro:[],
				optionsPro1:[],
				optionsLB:[],
				optionsUnit: {
		          label: 'name',
		          children: 'children'
			    },
				optionsCity: {
		          value: 'label',
		          children: 'children'
			   },
			    optionsCounty:{
			    	value: 'label'
			    },
				unitClass: false,
				addUnitVisible: false,
				dialogEditFormVisible: false,
				tableData: [],
				treeData:[],
				appColumn: config.UnitList,
				
				//分页数据
				total:0,
				currentPage:1,
				pageSize: pager.pageSize,
				parId:'',
				parId1:'',
				rowId:'',
				//新增界面数据
				addUnitForm: {
					cityNumber: '',//行政区码
					name: '', //单位名称
					unitType:'',//单位类型
					unityCode:'',//统一编码
					address:'',//地址
					phone:'',//联系电话
					dataStartYear:'',//开始年度
					builtDate: "",//建校年月
					dwbb: '',//单位班别码
					dwfzrh: "",//党委负责人号
                    email: "",
                    stageIds:[],
					fax: "",//传真
					fddbrh: "",//法定代表人
					img: "",//学校logo
					nmgznddxx:0,
					priorityLeves: "",//重点级别
					sfjb: "",//示范级别
					sort:'',//序号
					szdjjsxm: "",//经济
					szdmzsx: "",//民族
					szdqlb: "",//地区类别
					website: "",//单位班别
					xqr: "",//校庆日
					xxbbm: "",//班别码
					xxjc: "",//学校简称
					xxlx: "",//学校类型
					xxywmc: "",//学校英文名称
					xxzgbmm: "",//学校主管部门
					zipCode: "",//邮编
					zzjgm: "",//组织机构码
					parentId:'',//上级单位id
					loginName:'',//账号
					loginPassWord:'',//密码
					loginqrPwd:'',//确认密码
					realName:'',//姓名
					termValue:'',//当前学期
					yearValue:''//当前年度
				},
				//修改界面数据
				editUnitForm: {
					termValue:'',
					yearValue:'',
					cityNumber:'',
					name: '',
					unitType:'',
					unityCode:'',
					address:'',
					phone:'',
					id:'',
					parentId:'',
					froprovince:'',
                    dataStartYear:'',
                    oldName:'',
                    oldUnityCode:'',
                    oldUnitType:'',
                    builtDate: "",//建校年月
					dwbb: '',//单位班别码
					dwfzrh: "",//党委负责人号
					stageIds:[],
					email: "",
					fax: "",//传真
					fddbrh: "",//法定代表人
					headofschool: "",//校长
					img: "",//学校logo
					nmgznddxx:0,
					priorityLeves: "",//重点级别
					sfjb: "",//示范级别
					sort: '',
					szdjjsxm: "",//经济
					szdmzsx: "",//民族
					szdqlb: "",//地区类别
					website: "",//单位班别
					xqr: "",//校庆日
					xxbbm: "",//班别码
					xxjc: "",//学校简称
					xxlx: "",//学校类型
					xxywmc: "",//学校英文名称
					xxzgbmm: "",//学校主管部门
					zipCode: "",//邮编
					zzjgm: ""//组织机构码
				},
				//修改
				rulesing:{
					name:[
							{required: true,validator:vifEditUnitName,trigger: 'blur'},							
							{max: 50, message: '名称长度不能超过50个字符', trigger: 'blur' }
						],
					unityCode:[
							{ max: 50, message: '统一编码长度不能超过50个字符', trigger: 'blur' },
							{validator:vifCode,trigger: 'blur'}
						],
					xxjc:[
							{ max: 50, message: '简称长度不能超过50个字符', trigger: 'blur' }
						],
					 sort:[
					 	{validator:vifSort,trigger: 'blur'}
					 ],
					dataStartYear:[
						{ max: 50, message: '开始年度长度不能超过50个字符', trigger: 'blur' }
					],
					phone:[
						{validator:vifPhone,trigger: 'blur'},
						{ max: 50, message: '联系电话不能超过50个字符', trigger: 'blur' }
					],
					email:[
						{validator:vifEmail,trigger: 'blur'},
						{ max: 50, message: '邮箱长度不能超过50个字符', trigger: 'blur' }
					],
					shUnit:[
						{validator:vifxxlx,trigger: 'change'}
					],
					unitType:[
						{required: true,message:'单位类型不能为空！',trigger: 'change'}
					],
					website:[
						{ max: 50, message: '网址长度不能超过50个字符', trigger: 'blur' }
					],
					memo:[
						{ max: 500, message: '简介长度不能超过500个字符', trigger: 'blur' }
					],
					address:[
						{ max: 50, message: '地址长度不能超过50个字符', trigger: 'blur' }
					],
					xxywmc:[
						{ max: 50, message: '英文名称长度不能超过50个字符', trigger: 'blur' }
					],
					zipCode:[
						{ max: 50, message: '邮编长度不能超过50个字符', trigger: 'blur' }
					],
					xxbbm:[
						{ max: 50, message: '学校办别码长度不能超过50个字符', trigger: 'blur' }
					],
					dwfzrh:[
						{ max: 50, message: '党委负责人号长度不能超过50个字符', trigger: 'blur' }
					],
					xxzgbmm:[
						{ max: 50, message: '学校主管部门码长度不能超过50个字符', trigger: 'blur' }
					],
					fax:[
						{ max: 50, message: '传真长度不能超过50个字符', trigger: 'blur' }
					],
					zzjgm:[
						{ max: 50, message: '组织机构码长度不能超过50个字符', trigger: 'blur' }
					],
					fddbrh:[
						{ max: 50, message: '法定代表人长度不能超过50个字符', trigger: 'blur' }
					],
					froprovince:[
						{validator:vifFroprName,trigger: 'change'},
					],
					xqr: [
						{ validator: xqrCheck, trigger: 'blur' }
					]
				},
				//添加
				rules: {
					name:[	{required: true,validator:vifUnitName,trigger: 'blur'},
							{ max: 50, message: '名称长度不能超过50个字符', trigger: 'blur' }
						],
					unityCode:[
							{required: true,validator:vifUnityCode,trigger: 'blur'},
							{ max: 50, message: '统一编码长度不能超过50个字符', trigger: 'blur' }
						],
					xxjc:[
							{ max: 50, message: '简称长度不能超过50个字符', trigger: 'blur' }
						],
					termValue:[
								{required: true,validator:vifCrruentTrem,trigger:'change'}
							],
					yearValue:[
								{required: true,validator:vifCrruentYear,trigger:'blur'}
							],
					 sort:[
					 	{validator:vifSort,trigger: 'blur'}
					 ],
					dataStartYear:[
						{required: true,message: '开始年度不能为空',trigger: 'blur'},
						{validator:vifDataStartYear,trigger:'blur'},
						{ max: 50, message: '开始年度长度不能超过50个字符', trigger: 'blur' }
					],
					loginName:[
						{required: true,message: '账号不能为空',trigger: 'blur'},
						{validator:vifLoginName,trigger: 'blur'},
						{validator:userNameOnly,trigger: 'blur'}
					],
					realName:[
						{required: true,message: '姓名不能为空',trigger: 'blur'},
						{ max: 50, message: '姓名长度不能超过50个字符', trigger: 'blur' }
					],
					phone:[
						{validator:vifPhone,trigger: 'blur'},
						{ max: 50, message: '联系电话不能超过50个字符', trigger: 'blur' }
					],
					loginPassWord:[
						{required: true,message: '密码不能为空',trigger: 'blur'},
						{validator:vifLoginPsw,trigger: 'blur'}
					],
					loginqrPwd:[
						{required: true,message: '确认密码不能为空',trigger: 'blur'},
						{validator:vifPsword,trigger: 'blur'}
					],
					email:[
						{validator:vifEmail,trigger: 'blur'},
						{ max: 50, message: '邮箱长度不能超过50个字符', trigger: 'blur' }
					],
					shUnit:[
						{validator:vifxxlx,trigger: 'change'}
					],
					unitType:[
						{required: true,message:'单位类型不能为空！',trigger: 'change'}
					],
					website:[
						{ max: 50, message: '网址长度不能超过50个字符', trigger: 'blur' }
					],
					memo:[
						{ max: 500, message: '简介长度不能超过500个字符', trigger: 'blur' }
					],
					address:[
						{ max: 50, message: '地址长度不能超过50个字符', trigger: 'blur' }
					],
					xxywmc:[
						{ max: 50, message: '英文名称长度不能超过50个字符', trigger: 'blur' }
					],
					zipCode:[
						{ max: 50, message: '邮编长度不能超过50个字符', trigger: 'blur' }
					],
					xxbbm:[
						{ max: 50, message: '学校办别码长度不能超过50个字符', trigger: 'blur' }
					],
					dwfzrh:[
						{ max: 50, message: '党委负责人号长度不能超过50个字符', trigger: 'blur' }
					],
					xxzgbmm:[
						{ max: 50, message: '学校主管部门码长度不能超过50个字符', trigger: 'blur' }
					],
					fax:[
						{ max: 50, message: '传真长度不能超过50个字符', trigger: 'blur' }
					],
					zzjgm:[
						{ max: 50, message: '组织机构码长度不能超过50个字符', trigger: 'blur' }
					],
					fddbrh:[
						{ max: 50, message: '法定代表人长度不能超过50个字符', trigger: 'blur' }
					],
					froprovince:[
						{validator:vifFroprName,trigger: 'change'},
					],
					xqr: [
						{ validator: xqrCheck, trigger: 'blur' }
					]
                },
                tplUserType:'',
				sels: [], //列表选中列
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				paras: {
					keyword: '',
					parentId: '',
					start:this.currentPage,
					size:20
				},
			 codeList: {
                'btn_base_school_add':false,// 单位添加按钮
				'btn_base_school_update':false,//单位修改按钮
				'btn_base_school_delete':false,//单位删除按钮
           		 }
			} 
	    },
	watch: {
		city: {
			handler(newValue, oldValue) {
				var _this = this;
				if (_this.addUnitVisible) {
					if (newValue.length !== 0) {
						_this.addUnitForm.cityNumber = '';
						getUnitCountyNumber({
							provinceName: newValue[0],
							cityName: newValue[1],
							countyName: newValue[2]
						}).then((res) => {
							_this.addUnitForm.cityNumber = res.data;
						})
					}
				}
				if (_this.dialogEditFormVisible) {
					if (newValue.length !== 0) {
						_this.editUnitForm.froprovince = '';
						getUnitCountyNumber({
							provinceName: newValue[0],
							cityName: newValue[1],
							countyName: newValue[2]
						}).then((res) => {
							_this.editUnitForm.froprovince = res.data;
						})
					}
				}
			},
			deep: true
		}
	},
	created() {
		this.$parent.$emit('currentPage', '/base/unit');
		getRcCodeList('category_base_school', this.codeList).then(() => {
			this.showTreeNodeClick();
			this.addUnitUserList();
        });
         this.tplUnitType = this.$store.state.unitType;
	},
	methods: {
		merge(target) {
			for (let i = 1, j = arguments.length; i < j; i++) {
				let source = arguments[i] || {};
				for (let prop in source) {
					if (source.hasOwnProperty(prop)) {
						let value = source[prop];
						if (value !== undefined) {
							target[prop] = value;
						}
					}
				}
			}
		},
		//获取用户头像
		handleAvatarSuccess(res, file) {
			if (res.status === 200) {
				if (res.data && !res.data.error) {
					this.$notify.success({
						message: res.data.msg
					});
					this.addImageUrl = showImgUrl + res.data.id;
					this.addUnitForm.img = res.data.id;
				}
			} else {
				this.$notify.error({
					message: res.message || res.data.message
				});
			}
		},
		//编辑获取头像
		handleAvatarSuccess1(res, file) {
			if (res.status === 200) {
				if (res.data) {
					this.$notify.success({
						message: '上传照片成功！'
					});
					this.editImageUrl = showImgUrl + res.data.id;
					this.editUnitForm.img = res.data.id;
				}
			} else {
				this.$notify.error({
					message: res.message
				});
			}
		},
		//设置用户头像
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isPNG = file.type === 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG && !isPNG) {
				this.$notify({
					title: '错误',
					message: '上传头像图片只能是 JPG/PNG 格式！',
					type: 'error'
				});
			}
			if (!isLt2M) {
				this.$notify({
					title: '错误',
					message: '上传头像图片大小不能超过 2MB！',
					type: 'error'
				});
			}
			return (isJPG || isPNG) && isLt2M;
		},
		//新增弹出框中的更多
		showAddData() {
			this.show = !this.show;
			this.showMore = this.showMore === "点击展示更多" ? "点击收回" : "点击展示更多"
		},
		//全选
		handleSelectionChange(sels) {
			this.sels = sels;
		},
		//下拉树
		showTreeNodeClick() {
			addDropdownTreeList().then((result) => {
				this.treeData = this.$data2tree(result.data, 'unitId', 'parentId');
			})

		},
		//选择树的内容
		currentChangeGetTree(val, node) {
			this.inputSel = val.name;
			this.parId = val.unitId;
		},
		currentChangeTree(val, node) {
			this.inputSel1 = val.name;
			this.parId1 = val.unitId;
		},
		//上级单位选择
		clearUnitSelect() {
			this.inputSel = '';
			this.parId = "";
			this.addUnitUserList();
		},
		clearUnitSelect1() {
			this.inputSel1 = '';
		},
		//获取列表数据
		addUnitUserList() {
            this.unitLoading=true;
			this.paras.keyword = this.paras.keyword.trim();
			let params = { keyword: this.paras.keyword, parentId: this.parId, start: this.currentPage, size: this.pageSize }
			getUnitList(params).then((res) => {
                this.unitLoading=false;
				this.tableData = [];
				//获取到data
				if (res && res.status === 200 && res.data) {
                    if(res.data.list !=""){
                        res.data.list.forEach((val, index) => {
                            for (let item in val) {
                                if (item == "jxny") {
                                    if (val[item]) {
                                        val[item] = val[item].slice(0, 10)
                                    }
                                }
                            }
                            this.tableData.push(val)
                        })
                    }else{
                        this.emptyTextUnit="暂无数据"
                    }
					
					this.total = res.data.total;
					this.pageSize = res.data.pageSize
				} else {
					this.tableData = [];
					this.total = 0;
                    this.emptyTextUnit="暂无数据"
				}
			});
		},
		//分页当前页
		handleCurrentChange(val) {
			this.currentPage = val;
			this.addUnitUserList();
		},
		//显示新增界面
		handleClose(){
			this.addUnitVisible = false;
			this.dialogEditFormVisible = false;
			this.$refs.addunit.parentNode.scrollTop = 0;
			this.$refs.editunit.parentNode.scrollTop = 0;
		},
		beforeClose(done){
			done()
			this.$refs.editunit.parentNode.scrollTop = 0;
			this.$refs.addunit.parentNode.scrollTop = 0;
		},
		addUnitVal(index, row) {
             this.getCode();
            this.getProvinceList();
			this.imgWidth.unitId = undefined;
			this.$refs.addUnitForm.resetFields();
			this.addImageUrl = this.baseImageUrl;
			this.city = [];
			this.showMore = "点击展示更多"
			this.shUnit = [];
			this.inputSel1 = '';
			this.froprovince = '';
			if (this.show) {
				this.showAddData();
			};
			this.addUnitVisible = true;
			this.addUnitForm = {
				cityNumber: '',
				name: '',
				unitType: '',
				unityCode: '',
				address: '',
                phone: '',
                stageIds:[],
				unitId: '',
				dataStartYear: '',
				loginName: '',
				loginPassWord: '',
				realName: '',
				builtDate: "",//建校年月
				dwbb: '',//单位班别码
				dwfzrh: "",//党委负责人号
				email: "",
				fax: "",//传真
				fddbrh: "",//法定代表人
				headofschool: "",//校长
				img: "",//学校logo
				memo: "",//单位介绍
				parentId: '',
				nmgznddxx: 0,
				priorityLeves: "",//重点级别
				sfjb: "",//示范级别
				sort: '',
				szdjjsxm: "",//经济
				szdmzsx: "",//民族
				szdqlb: "",//地区类别
				website: "",//单位班别
				xqr: "",//校庆日
				xxbbm: "",//班别码
				xxjc: "",//学校简称
				xxlx: "",//学校类型
				xxywmc: "",//学校英文名称
				xxzgbmm: "",//学校主管部门
				zipCode: "",//邮编
				zzjgm: "",//组织机构码
				termValue: '',
				yearValue: ''
			}
		},
		//更具单位类别选取学段
		currentClickNode(value) {
			if (value) {
                let para = value[value.length - 1];
                let tage=[];
				getStageName(para).then((res) => {
					res.data.forEach((_p, i) => {
                       tage.push(_p.id + '');
                    })
                    this.addUnitForm.stageIds = tage;
                })
			}
		},
		//新增单位列表
		addUnitSubmit(addUnitForm) {
			this.$refs[addUnitForm].validate((valid) => {
				if (valid) {
					this.addLoading = true;
					this.addUnitForm.builtDate = this.addUnitForm.builtDate ? moment(this.addUnitForm.builtDate).format('YYYY-MM-DD') : '';
					let para = Object.assign({}, this.addUnitForm);
					let unitUserSaveVM = {
						'loginName': this.addUnitForm.loginName,
						'loginPassWord': this.addUnitForm.loginPassWord,
						'realName': this.addUnitForm.realName
					}
					para['unitUserSaveVM.loginName'] = this.addUnitForm.loginName;
					para['unitUserSaveVM.loginPassWord'] = this.addUnitForm.loginPassWord;
					para['unitUserSaveVM.realName'] = this.addUnitForm.realName;
					para.parentId = this.parId1;
					para.stageIds = this.addUnitForm.stageIds;
                    para.xxlx = this.shUnit[2];
                    if(this.addUnitForm.cityNumber){
                        para.froprovince = this.addUnitForm.cityNumber;
                    }
					addUnitListVal(para).then((res) => {
						this.addLoading = false;
						this.$notify({
							title: '成功',
							message: '提交成功',
							type: 'success'
						});
						this.addUnitVisible = false;
						this.showTreeNodeClick();
						this.addUnitUserList();
						this.$refs.addunit.parentNode.scrollTop = 0;
					});
				} else {
					return false;
				}
			})
		},
		//修改
		handleEdit(index, row) {
			this.imgWidth.unitId = row.unitId;
			this.dmName = "点击选择";
			this.editUnitForm.headofschool = "";
			this.$refs.editUnitForm.resetFields();
			if (this.show) {
				this.showAddData();
			};
			this.fro = "",
			this.editUnitForm = {};
			this.showMore = "点击展示更多"
			this.dialogEditFormVisible = true;
			this.rowId = row.unitId;
			getUnitData(row.unitId).then((res) => {
				if (!res.data) {
					return false;
				}
				this.fro = res.data.froprovince;
				this.editUnitForm = Object.assign({}, res.data);
				this.dmName = res.data.xzName;
				this.editUnitForm.oldName = this.editUnitForm.name;
				this.editUnitForm.oldUnityCode = this.editUnitForm.unityCode;
                this.editUnitForm.froprovince = res.data.froprovince;
                this.editUnitForm.cityNumber = res.data.froprovince;
				if (this.editUnitForm.unitType == 1) {
					this.unitCName = "请选择";
				} else if (this.editUnitForm.unitType == 2) {
					this.unitCName = res.data.xxlxName;
				};
				this.parent = this.editUnitForm.parentId;
				if (this.editUnitForm.nmgznddxx == true) {
					this.editUnitForm.nmgznddxx = 1;
				} else {
					this.editUnitForm.nmgznddxx = 0;
				}
				//图片上传数据处理
				if (this.editUnitForm.img) {
					this.editImageUrl = showImgUrl + this.editUnitForm.img;
				} else {
					this.editImageUrl = this.baseImageUrl;
				}
				if (res.data.stageVMS.length > 0) {
                    let stage=[];
					res.data.stageVMS.forEach((_p, i) => {
						stage.push(_p.id + "")
                    })
                    this.editUnitForm.stageIds = stage;
				}
				if (res.data.parentId && res.data.parentId.length > 0) {
					getUnitData(res.data.parentId).then((r) => {
						this.inputSel2 = r.data.name;
						this.editUnitForm.parentId = r.data.id;
					})
				};
				if (this.editUnitForm.froprovince == null) {
					this.city = [];
					this.oldCity = [];
					this.getProvinceList();
				} else {
					this.getFullsFrom();
				}
			});
        },
        
        //校验学段不能为空
        checkStageIds(rule,value,callback) {
            if(value.length>0){
                callback();
            }else{
                callback(new Error("学段不能为空"))
            }
        },

		//修改单位列表
		editUnitSubmit(editUnitForm) {
			this.dmName = "点击选择";
			this.$refs.editUnitForm.validate((valid) => {
				if (valid) {
					this.editLoading = true;
					this.editUnitForm.builtDate = this.editUnitForm.builtDate ? moment(this.editUnitForm.builtDate).format('YYYY-MM-DD') : '';
					let para = Object.assign({}, this.editUnitForm);
					updataUnitList(para).then((res) => {
						this.editLoading = false;
						this.$notify({
							title: '成功',
							message: '提交成功',
							type: 'success'
						});
						this.dialogEditFormVisible = false;
						this.addUnitUserList();
						this.$refs.editunit.parentNode.scrollTop = 0;
					});
				}
			});

		},
		//选人控件
		selectDeManager() {
			let _m = [];
            if (this.editUnitForm.headofschool !== "" && this.editUnitForm.headofschool !== undefined)
            _m.push(this.editUnitForm.headofschool);
            this.$SelectUsers({
                unitType: this.unitType,
                selectUserType: 2,
                unitId: this.unitId,
                selectUserIds: _m,
                beforeClose: (selectUsers, instance)=>{
                    if (selectUsers.length > 1) {
                    this.$notify({
                        title: '警告',
                        message: '最多选择一个！',
                        type: 'warning'
                    });
                    return true;
                    } else {
                        if (selectUsers.length === 1) {
                            this.dmName = selectUsers[0].realName;
                            this.editUnitForm.headofschool = selectUsers[0].id
                        } else {
                            this.dmName = "点击选择";
                            this.editUnitForm.headofschool = "";
                        }
                    }
                }
            }, () => {

            })
		},
		//获取行政区名
		getFullsFrom() {
            console.log(this.fro);
			let para = { countyId: this.fro };
			getFullName(para).then((res) => {
				if (res && res.data) {
					getUnitProvince().then((r) => {
						let pro = r.data.split(',');
						pro.forEach((_p, i) => {
							this.optionsPro1.push(
								{
									label: _p,
									children: []
								}
							);
						});
						let _cc = res.data.split('-');
						if (_cc.length > 0) {
							getUnitCities(_cc[0]).then((re) => {
								let optionsCity = re.data.split(',');
								let cities = [];
								optionsCity.forEach((_c, i) => {
									cities.push(
										{
											label: _c,
											children: []
										}
									);
								});
								_.find(this.optionsPro1, {
									label: _cc[0]
								}).children = cities;
								this.oldCity.shift();
							});
						}
						setTimeout(() => {
							if (_cc.length > 1) {
								getUnitCounty({
									provinceName: _cc[0],
									cityName: _cc[1]
								}).then((res1) => {
									let optionsCounty = res1.data.split(',');
									let county = [];
									optionsCounty.forEach((_y, i) => {
										county.push(
											{
												label: _y
											}
										);
									});
									let obj1 = _.find(this.optionsPro1, {
										label: _cc[0]
									});

									_.find(_.find(this.optionsPro1, {
										label: _cc[0]
									}).children, {
											label: _cc[1]
										}).children = county;

									this.oldCity.shift();
								})
							}
							this.city = _cc;
							this.oldCity = _.cloneDeep(_cc);
						}, 500);
					});
				}
			})
		},
		//删除操作
		handleDelete(index, row) {
			let userMsg = this.$getSess('user');
			if (userMsg.data.unitId == row.unitId) {
				this.$notify({
					title: '提示',
					message: '该单位不能删除！',
					type: 'warning'
				});
				return false;
			}
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = { id: row.unitId };
				deleteUnitList(para).then((res) => {
					this.$notify({
						title: '成功',
						message: '删除成功',
						type: 'success'
					});
					this.addUnitUserList();
					this.showTreeNodeClick();
				});
			}).catch(() => {

			});
		},
		//全选默认关闭效果
		handleSelectable(row, index) {
			let userMsg = this.$getSess('user');
			return !(userMsg.data.unitId == row.unitId);
		},
		//批量删除
		DeleteTableSel(val) {
			var ids = this.sels.map(item => item.unitId);
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					unitIds: ids.join(',')
				};
				deleteUnitAllList(para).then((res) => {
					if(res.code == 'ok'){
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						this.addUnitUserList();
					}
				});
			}).catch(() => {

			});

		},
		//单位类型选择
		handleUnitTypeSel(value) {
			if (value == 1) {
                this.shUnit=[];
				this.unitClass = true;
				this.yearTermShow = true;
                this.addUnitForm.stageIds = ['1', '2', '3', '4', '5'];
			} else if (value == 2) {
				this.unitClass = false;
                this.yearTermShow = false;
                //清空单个表单数据
                this.$refs.addUnitForm.fields.forEach((_r,i)=>{
                    if(_r.prop =='stageIds'){
                        _r.resetField();
                    }
                    if(_r.prop == 'shUnit'){
                        _r.resetField();
                    }
                })
                
			}
		},
		// 获取省份列表
		getProvinceList() {
			getUnitProvince().then((res) => {
				let pro = res.data.split(',');
				pro.forEach((_p, i) => {
					(this.dialogEditFormVisible ? this.optionsPro1 : this.optionsPro).push(
						{
							label: _p,
							children: []
						}
					);
				})
			})
		},
		//获取国标
		getCode() {
			let para = 'BXLX';
			getCodeId(para).then((res) => {
				let pro = res.data;
				this.optionsLB = this.$data2tree(pro, 'id', 'parentId');
			});
		},
		//所在行政区
		handleItemChange(val) {
			// 点击第一层，需要加载第二层
			if (val.length == 1) {
				getUnitCities(val).then((res) => {
					let optionsCity = res.data.split(',');
					let cities = [];
					optionsCity.forEach((_c, i) => {
						cities.push(
							{
								label: _c,
								children: []
							}
						);
					})
					_.find(this.dialogEditFormVisible ? this.optionsPro1 : this.optionsPro, {
						label: val[0]
					}).children = cities;
				});
			} else if (val.length == 2) {
				getUnitCounty({
					provinceName: val[0],
					cityName: val[1]
				}).then((res) => {
					let optionsCounty = res.data.split(',');
					let county = [];
					optionsCounty.forEach((_y, i) => {
						county.push(
							{
								label: _y
							}
						);
					});
					_.find(_.find(this.dialogEditFormVisible ? this.optionsPro1 : this.optionsPro, {
						label: val[0]
					}).children, {
							label: val[1]
						}).children = county;

				})
			}
			//end	
		},

		//展开按钮的hover效果
		showEnter() {

		}
	}
}
</script>

<style scoped>
.bodyPadding {
	padding: 0 10px;
}

.el-dropdown-menu {
	margin: 0;
	padding: 0;
}

.foot_btn {
	padding-right: 20px;
	bottom: 5px;
}

.drop {
	width: 220px;
    /* height:300px;

    overflow:auto; */
}


/* .inputWidth{
		width:198px;
	} */

.sy-left {
	float: left;
}

.sy-right {
	float: right;
}

.table_style {
	width: 100%;
	height: 100%;
}

.avatar-uploader {
	border: 1px solid #ccc;
	border-radius: 2px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	margin: 0 auto;
	width: 100%;
	height: 100%;
	text-align: center;
}

.unitCode {
	width: 49%;
}

.upPhoto {
	margin-left: 80px;
	width: 200px;
	height: 200px;
}

.page_style {
	padding: 20px 20px;
}

.avatar-uploader p {
	position: absolute;
	height: 30px;
	line-height: 30px;
	padding: 0;
	margin: 0;
	z-index: 10;
	bottom: 0;
	left: 0;
	width: 100%;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	text-align: center;
	width: 100px;
	height: 100px;
	line-height: 100px;
}

.avatar-content {
	position: absolute;
	overflow: hidden;
	top: 10px;
	left: 10px;
	right: 10px;
	bottom: 30px;
}

.avatar {
	width: 100%;
	height: 100%;
}

.red {
	color: red;
	margin-right: 5px;
}

.btn_show {
	width: 99%;
	height: 20px;
	margin: 0 0 10px auto;
	text-align: center;
	border-radius: 5px;
}

.sy-dialog-full-box .el-select,
.sy-dialog-full-box .el-cascader,
.sy-dialog-full-box .el-dropdown,
.sy-dialog-full-box .el-date-editor.el-input {
	width: 100%;
}

.mt3 {
	margin-top: 3px;
}

.mt6 {
	margin-top: 6px;
}

.timeHeight {
	height: 30px;
}

.txt_showMore-enter-active,
.txt_showMore-leave-active {
	transition: opacity .3s
}

.txt_showMore-enter,
.txt_showMore-leave-to {
	opacity: 0
}
.selectBtn-in-dialog{
    width:100%;
    padding:3px 10px;
    border-color: #bfcbd9;
    height:30px;
    font-size: 12px;
    text-align: left;
  }
</style>


