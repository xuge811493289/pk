<template>
	<div :class="{'sy-pk-optimeize_absolute': !isfullscreen,'sy-pk-optimeize_fixed': isfullscreen}">
		<div class="sy-pk-optimeize_head">
			<el-button :disabled="currentStep == '0'" @click="handleJumpPre('pre')">撤销</el-button> 
			<el-button :disabled="currentStep == step" @click="handleJumpEnd('end')">恢复</el-button>
			<el-button @click="handleSavePK" :loading="saveLoading">保存</el-button>
			<el-button style="margin-right: 10px;float: right;margin-top:5px;" type="text" @click="handleFullScren">
				<i v-show="!isfullscreen" title="全屏" class="fa fa-arrows-alt"></i>
				<i v-show="isfullscreen" title="取消全屏" class="fa fa-minus-square-o" aria-hidden="true"></i>
			</el-button>
		</div>
		<div class="sy-pk-step-optimeize_absolute sy-theme-tableBorder" v-loading="pageLoading"
    		element-loading-text="拼命加载中...">
			<el-row class="sy-pk-optimeize_body">
				<el-col class="sy-pk-optimeize-col" :span="3">
					<h3 @click="handleOpendataNumber" class="cp">待处理作务<span style="color: #FF4949"> ( {{dataNumber.length}} ) </span></h3>
					<el-select v-model="optimizeTypoeId" style="width: 100%;" placeholder="班级" @change="handleChangeOptimizeTypoe">
						<el-option v-for="item in optimizeTypoeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<div class="sy-pk-optimeize-tree-box sy-pk_bg_fff" v-if="optimizeTypoeId == '1' || optimizeTypoeId == '2' || optimizeTypoeId == '3'">
						<div class="sy-pk-optimeize-tree_head">
							<el-input placeholder="关键字" icon="search" v-model="keyWords" :on-icon-click="handleIconClick"></el-input>
						</div>
						<div class="sy-pk-optimeize-tree_body">
							<el-tree :data="classTreeData" style="border:0;" 
								:render-content="renderContent" 
								:default-expanded-keys="defaultExpandedKeys" 
								node-key="id" 
								ref="tree"
								highlight-current
								:props="defaultProps" 
								:current-node-key="currentNodeKey"
								@node-click="handleNodeClick"
								accordion>
							</el-tree>
						</div>
					</div>
				</el-col>
				<!-- 班级  教师  场地  -->
				<el-col :span="21" v-if="optimizeTypoeId == '1' || optimizeTypoeId == '2' || optimizeTypoeId == '3'">
					<el-row>
						<el-col class="sy-pk-optimeize-col" :span="14">
							<div>
								<el-row>
									<el-col :span="4">
										<h3><el-tag type="success">{{currentMsg.name}}课表</el-tag></h3>
									</el-col>
									<el-col :span="20" class="right" style="line-height: 40px;padding-right: 10px;">
										<el-checkbox v-if="optimizeTypoeId == '1' || optimizeTypoeId == '3'" v-model="checkList.class.teacher">教师</el-checkbox>
										<el-checkbox v-if="optimizeTypoeId == '2' || optimizeTypoeId == '3'" v-model="checkList.class.clazz">班级</el-checkbox>
										<el-checkbox v-if="optimizeTypoeId == '1' || optimizeTypoeId == '2'" v-model="checkList.class.address">场地</el-checkbox>
										<el-radio v-model="checkList.class.radio" label="all" style="margin-left: 10px;">课程全称</el-radio>
										<el-radio v-model="checkList.class.radio" label="short">课程简称</el-radio>
									</el-col>
								</el-row>
								<table class="sy-base-table-border">
									<thead>
										<tr>
											<th :title="currentMsg.name" style="width: 35px;"></th>
											<th v-for="item in columesList" :key="item.id">{{item.name}}</th>
										</tr>
									</thead>
									<tbody>
										<tr class="clazz_row" v-for="(item,index) in tableData" :key="index">
											<td style="line-height: 16px;background-color: #fff" class="sy-theme-extraLightGray">{{item.number}}</td>
											<td v-for="key in columesList" :key="key.id" 
												v-drop="{set:set, row: {weekId: key.id, festivalId: item.id, data: item, type: 'box'}}"
												style="line-height: 16px;"
												@click="handleClick(item, key, {})"
												:style="{
													'background': item[key.id + '_' + item.id + '_status'] == 2 ? '#13CE66' : item[key.id + '_' + item.id + '_status'] == 3 ? '#F7BA2A' : item[key.id + '_' + item.id + '_status'] == 1 ? '#FFF773' : item[key.id + '_' + item.id + '_status'] == 4 ? '#FF4949' :'#fff',
													'color': item[key.id + '_' + item.id + '_status'] == 0 ? '#333' : '#333'
												}">
												<el-tooltip placement="top" effect="light" v-if="item[key.id+'_'+item.id+'_hover']"
													v-for="week in item[key.id]" :key="week.id" @click.stop="handleClick(item, key, week)">
													<div slot="content" :style="{color: item[key.id + '_' + item.id + '_status'] == 2 ? '#13CE66' : '#FF4949'}">
														<p v-for="(info,s) in item[key.id+'_'+item.id+'_info']" :key="s+'_info'"> {{info}} </p>
														<p v-if="item[key.id + '_' + item.id + '_status'] == 2">调整后会减少冲突数量！</p>
														<p v-else>调整后会增加冲突数量！</p>
													</div>
													<div v-on:mouseenter="mounseOver(item, key, week, 'in')" v-on:mouseleave="mounseLeave(item, key, week, 'out')"
														draggable
														v-move="{set:set, row: {data: week, type: 'kb', weekId: key.id, festivalId: item.id}}" 
														:style="{
															'background': week.status == 2 ? '#13CE66' : week.status == 3 ? '#F7BA2A' : week.status == 1 ? '#FFF773' : 'transparent',
															'color': week.status == 0 ? '#333' : '#333',
															'line-height': !checkList.class.teacher && !checkList.class.address && !checkList.class.clazz ? '32px' : '16px'
														}">
														<div class="pk-selected">
															<div v-if="optimizeTypoeId == '1'">
																<div class="sy-pk-o" >
																	<span v-if="checkList.class.radio == 'all'">{{week.name}}</span>
																	<span v-if="checkList.class.radio == 'short'">{{week.courseShortName}}</span>
																	<span v-if="week.singleDoubleType != 0">《{{week.singleDoubleType==1? '单周':'双周'}}》</span><br>
																</div>
																<div class="sy-pk-o" v-if="week.datas.length != 0 && checkList.class.teacher" :title="$_.map(week.datas, 'teacherName').join('、')">({{$_.map(week.datas, 'teacherName').join('、')}})</div>
																<div v-if="checkList.class.address">{{week.roomName}}</div>
															</div>
															<div v-if="optimizeTypoeId == '2'">
																<div>
																	<span v-if="checkList.class.radio == 'all'">{{week.name}}</span>
																	<span v-if="checkList.class.radio == 'short'">{{week.courseShortName}}</span><br>
																	<span v-if="checkList.class.clazz">({{$_.map(week.datas, o=>{return o.gradeName+o.className}).join('、')}})</span>
																</div>
																<div v-if="checkList.class.address">{{week.roomName}}</div>
															</div>
															<div v-if="optimizeTypoeId == '3'">
																<div>
																	<span v-if="checkList.class.radio == 'all'">{{week.name}}</span>
																	<span v-if="checkList.class.radio == 'short'">{{week.courseShortName}}</span><br>
																	<span v-if="checkList.class.clazz">({{$_.map(week.datas, o=>{return o.gradeName+o.className}).join('、')}})</span>
																</div>
																<div class="sy-pk-o" v-if="week.datas.length != 0 && checkList.class.teacher" :title="$_.map(week.datas, 'teacherName').join('、')">({{$_.map(week.datas, 'teacherName').join('、')}})</div>
															</div>
														</div>
													</div>
												</el-tooltip>
												<div v-if="!item[key.id+'_'+item.id+'_hover']">
													<div v-for="week in item[key.id]" :key="week.id" @click.stop="handleClick(item, key, week)"
														v-on:mouseenter="mounseOver(item, key, week, 'in')" v-on:mouseleave="mounseLeave(item, key, week, 'out')"
														:style="{
															'background': week.status == 2 ? '#13CE66' : week.status == 3 ? '#F7BA2A' : week.status == 1 ? '#FFF773' : 'transparent',
															'color': week.status == 0 ? '#333' : '#333',
															'line-height': !checkList.class.teacher && !checkList.class.address && !checkList.class.clazz ? '32px' : '16px'
														}">
														<div class="pk-selected" 
															draggable
															v-move="{set:set, row: {data: week, type: 'kb', weekId: key.id, festivalId: item.id}}">
															<div v-if="optimizeTypoeId == '1'">
																<div class="sy-pk-o" >
																	<span v-if="checkList.class.radio == 'all'">{{week.name}}</span>
																	<span v-if="checkList.class.radio == 'short'">{{week.courseShortName}}</span>
																	<span v-if="week.singleDoubleType != 0">《{{week.singleDoubleType==1? '单周':'双周'}}》</span><br>
																</div>
																<div class="sy-pk-o" v-if="week.datas.length != 0 && checkList.class.teacher" :title="$_.map(week.datas, 'teacherName').join('、')">({{$_.map(week.datas, 'teacherName').join('、')}})</div>
																<div v-if="checkList.class.address">{{week.roomName}}</div>
															</div>
															<div v-if="optimizeTypoeId == '2'">
																<div>
																	<span v-if="checkList.class.radio == 'all'">{{week.name}}</span>
																	<span v-if="checkList.class.radio == 'short'">{{week.courseShortName}}</span><br>
																	<span v-if="checkList.class.clazz">({{$_.map(week.datas, o=>{return o.gradeName+o.className}).join('、')}})</span>
																</div>
																<div v-if="checkList.class.address">{{week.roomName}}</div>
															</div>
															<div v-if="optimizeTypoeId == '3'">
																<div>
																	<span v-if="checkList.class.radio == 'all'">{{week.name}}</span>
																	<span v-if="checkList.class.radio == 'short'">{{week.courseShortName}}</span><br>
																	<span v-if="checkList.class.clazz">({{$_.map(week.datas, o=>{return o.gradeName+o.className}).join('、')}})</span>
																</div>
																<div class="sy-pk-o" v-if="week.datas.length != 0 && checkList.class.teacher" :title="$_.map(week.datas, 'teacherName').join('、')">({{$_.map(week.datas, 'teacherName').join('、')}})</div>
															</div>
														</div>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div>
								<el-row style="padding-top: 10px;" :gutter="10">
									<el-col :span="12">
										<div>
											<div style="background: #FE9AFD;color: #fff;line-height: 32px;text-align:center;" v-drop="{set:set, row: {type: 'wa', data: {}}}">待排</div>
											<ul class="no_teacher_ul sy-theme-tableBorder" v-if="noTeacherList.length != 0">
												<el-tooltip placement="top" effect="light" v-for="(c,i) in noTeacherList" :key="i">
													<div slot="content">
														<p>年级：{{c.gradeName}}</p>
														<p>班级：{{c.className}}</p>
														<p>场地：{{$_.map(c.pkPlaceVMS, 'placeName').join('、')}}</p>
														<p>任教老师：{{$_.map(c.teacherVMS, 'teacherName').join('、')}}</p>
													</div>
													<li draggable 
														v-drop="{set:set, row: {type: 'wa', data: c}}"
                                       	 				v-move="{set:set, row: {type: 'wa', data: c}}" 
														class="sy-theme-tableBorder sy-pk-o" style="cursor: move;">
														{{c.courseName}}({{c.waitHandleNum}})
													</li>
												</el-tooltip>
												
											</ul>
											<div v-if="noTeacherList.length == 0" class="sy-theme-tableBorder center" style="line-height: 32px;border: 1px solid #ccc;border-top: 0;background: #fff;">
												暂无待排数据
											</div>
										</div>
									</el-col>
									<el-col :span="12">
										<table class="sy-base-table-border">
											<thead>
												<tr>
													<th :colspan="3" style="background: #FF4949;color: #fff;">冲突详情</th>
												</tr>
												<tr>
													<th>来源</th>
													<th>值</th>
													<th>名称</th>
												</tr>
											</thead>
											<tbody>
												<tr class="clazz_row" v-for="(item,index) in ignoreList" :key="index">
													<td style="line-height: 32px;cursor: default;">{{item.res}}</td>
													<td style="cursor: default;" :style="{'background': statusColor[item.value].color}">{{statusColor[item.value].text}}</td>
													<td style="line-height: 32px;cursor: default;">{{item.name}}</td>
												</tr>
												<tr v-if="ignoreList.length == 0">
													<td style="line-height: 32px;cursor: default;" :colspan="3">暂无数据</td>
												</tr>
											</tbody>
										</table>
									</el-col>
								</el-row>
							</div>
						</el-col>
						<el-col class="sy-pk-optimeize-col" :span="10">
							<div>
								<h3>{{teacherName1}}{{optimizeTypoeId=='1'?'老师':''}}课表<span style="color: #FF4949"> ( 调课{{optimizeTypoeId=='1'?'老师':'班级'}}课表 ) </span></h3>
								<table class="sy-base-table-border">
									<thead>
										<tr>
											<th style="width: 35px;"></th>
											<th v-for="item in columesList" :key="item.id" :title="item.name">{{item.name}}</th>
										</tr>
									</thead>
									<tbody>
										<tr class="clazz_row" v-for="(item,index) in moveTeacherList" :key="index">
											<td style="line-height: 16px;background-color: #fff" class="sy-theme-extraLightGray">{{item.number}}</td>
											<td v-for="key in columesList" :key="key.id" 
												:style="{'line-height': '16px'}"
												style="cursor: default;"
												class="sy-pk-o"
											>
												<div v-for="week in item[key.id]" :key="week.id">
													<div v-if="optimizeTypoeId == '1'">
														<div class="sy-pk-o" style="text-align: left;">
															<span>{{week.name}}</span>
															<span v-if="week.singleDoubleType != 0">《{{week.singleDoubleType==1? '单周':'双周'}}》</span><br>
														</div>
														<div class="sy-pk-o" style="text-align: left;" :title="week.gradeName+week.className">{{week.gradeName+week.className}}</div>
													</div>
													<div v-else>
														<span>{{week.name}}</span>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div>
								<h3>{{teacherName2}}老师课表<span style="color: #FF4949"> ( 被调课老师课表 ) </span></h3>
								<table class="sy-base-table-border">
									<thead>
										<tr>
											<th style="width: 35px;"></th>
											<th v-for="item in columesList" :key="item.id" :title="item.name">{{item.name}}</th>
										</tr>
									</thead>
									<tbody>
										<tr class="clazz_row" v-for="(item,index) in dragTeacherList" :key="index">
											<td style="line-height: 16px;background-color: #fff" class="sy-theme-extraLightGray">{{item.number}}</td>
											<td v-for="key in columesList" :key="key.id" 
												:style="{'line-height': '16px'}"
												style="cursor: default;"
											>
												<div v-for="week in item[key.id]" :key="week.id">
													<div class="sy-pk-o" style="text-align: left;">
														<span>{{week.name}}</span>
														<span v-if="week.singleDoubleType != 0">《{{week.singleDoubleType==1? '单周':'双周'}}》</span><br>
													</div>
													<div class="sy-pk-o" style="text-align: left;" :title="week.gradeName+week.className">{{week.gradeName+week.className}}</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</el-col>
					</el-row>
				</el-col>
				<!-- 教师总课表 -->
				<el-col :span="21" style="padding: 40px 10px 0px;" v-if="optimizeTypoeId == '4' || optimizeTypoeId == '5'">
					<el-row>
						<el-col :span="16">
							<el-select v-model="selectGradeId" style="width: 130px;" placeholder="请选择年级" @change="handleGradeChange">
								<!-- <el-option label="全部年级" value=""></el-option> -->
								<el-option v-for="item in classTreeData" :key="item.id" :label="item.label" :value="item.id"></el-option>
							</el-select>
						</el-col>
						<el-col :span="8" class="right" style="line-height: 30px;">
							<!-- <el-checkbox v-model="checkList.teacher.shortName">课程简称</el-checkbox> -->
							<el-checkbox v-if="optimizeTypoeId == '4'" v-model="checkList.teacher.clazz">班级</el-checkbox>
							<el-checkbox v-if="optimizeTypoeId == '5'" v-model="checkList.teacher.teacher">教师</el-checkbox>
							<el-switch v-model="checkList.teacher.shortName"
								on-color="#13ce66"
								:width="80"
								off-color="#20A0FF"
								on-text="课程全称"
								off-text="课程简称">
							</el-switch>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="24" style="padding: 10px;overflow-x:auto;" v-if="optimizeTypoeId == '4'">
					<table class="sy-base-table-border">
						<thead>
							<tr>
								<th style="width: 32px;"></th>
								<th style="width: 38px;">课节</th>
								<th style="width: 80px;" v-for="(item, index) in teacherList" :key="'t_'+index">
									{{item.name}}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in tableDataList" :key="item.id+'_'+index" class="clazz_row2">
								<td v-if="item.rowspan != 1" :rowspan="item.rowspan"><div style="width: 12px;display: inline-block;">{{item.week}}</div></td>
								<td style="line-height: 16px;"><div style="width: 26px;display: inline-block;">{{item.name}}</div></td>
								<td v-for="(key, index) in teacherList" :key="'t_'+index" 
									style="line-height: 16px;"
									class="cp"
									:style="{
										'background': item.status == 1 ? (item[key.id+'_status'] == 1 ? '#13CE66' : 'transparent') : item.status == 2 ? '#99FFFF' :'transparent'
									}"
									@click.stop="handleTeacherClick(item, key, {}, 'teacher')">
									<div v-for="row in item[key.id]" :key="row.courseId" style="text-align: left;padding: 0 5px;" class="cp"
										@click.stop="handleTeacherClick(item, key, row, 'teacher')"
										:style="{
											'background': row.status == 1 ? '#FFF773' : row.status == 2 ? (item[key.id+'_status'] == 1 ? 'transparent' : '#99FFFF') :'transparent'
										}">
										<div class="pk-selected">
											<span v-if="checkList.teacher.shortName">{{row.courseName}}</span>
											<span v-if="!checkList.teacher.shortName">{{row.courseShortName || row.courseName}}</span>
											<!-- <span v-if="checkList.teacher.clazz">({{row.gradeName+row.className}})</span> -->
											<span v-if="checkList.teacher.clazz">({{row.className}})</span>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</el-col>
				<el-col :span="24" style="padding: 10px;overflow-x:auto;" v-if="optimizeTypoeId == '5'">
					<table class="sy-base-table-border">
						<thead>
							<tr>
								<th style="width: 60px;" :rowspan="2"></th>
								<th v-for="item in teacherTotalTable" :colspan="item.children.length" :key="item.id">
									{{item.name}}
								</th>
							</tr>
							<tr>
								<th style="width: 50px;" v-for="item in clazzTableColums" :key="item.id" :title="item.name">
									{{item.num}}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in clazzTableDataList" :key="item.id+'_'+index" class="clazz_row2">
								<td style="line-height: 16px;background: #fff;" >{{item.name}}</td>
								<td v-for="key in clazzTableColums" :key="key.id"
									style="line-height: 14px;padding: 5px 0;"
									@click.stop="handleTeacherClick(item, key, {}, 'clazz')"
									:style="{
										'background': item.status == 2 ? (item[key.id+'_status'] == 1 ? '#13CE66' : '#99FFFF') : 'transparent'
									}"
								>
									<div v-for="row in item[key.id]" :key="row.id" style="text-align: left;padding: 0 5px;" class="cp"
										@click.stop="handleTeacherClick(item, key, row, 'clazz')"
										:style="{
											'background': row.status == 1 ? '#FFF773' : 'transparent'
										}">
										<div class="pk-selected">
											<div style="width: 12px;margin: 0 auto;">
												<span v-if="checkList.teacher.shortName">{{row.name}}</span>
												<span v-if="!checkList.teacher.shortName">{{row.courseShortName || row.name}}</span>
											</div>
											<div v-if="row.datas.length != 0 && checkList.teacher.teacher" :title="$_.map(row.datas, 'teacherName').join('、')">({{$_.map(row.datas, 'teacherName').join('、')}})</div>
										</div>
									</div>
								</td>
							</tr>
							<tr v-if="clazzTableDataList.length == 0">
								<td :colspan="clazzTableColums.length +1">暂无数据</td>
							</tr>
						</tbody>
					</table>
				</el-col>
			</el-row>
		</div>
		<div class="center" style="padding: 10px;">
			<el-button type="primary" @click="prev" disabled>上一步</el-button>
			<el-button type="primary" @click="next">下一步</el-button>
		</div>
		<sy-dialog title="待处理" :visible.sync="waitDialogVisible" height="450px" width="650px">
            <div slot="body">
                <sy-grad-4>
					<div slot="headerRight" style="line-height:40px;">
						<span>年级：</span>
						<el-select v-model="waitselectGradeId" style="width: 130px;" placeholder="请选择年级" @change="handleWaitGradeChange">
							<el-option label="全部年级" value=""></el-option>
							<el-option v-for="item in classTreeData" :key="item.id" :label="item.label" :value="item.id"></el-option>
						</el-select>
					</div>
					<div slot="bodyRight" style="padding: 10px;">
						<el-table :data="waitTableList" style="width: 100%; height: 100%;" height="100%" border>
							<el-table-column prop="courseName" label="课程" width="100" align="center"></el-table-column>
							<el-table-column label="老师" width="" align="center">
								<template scope="scope">
									<span>{{$_.map(scope.row.teacherVMS,'teacherName').join('、')}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="gradeName" label="年级" width="120" align="center"></el-table-column>
							<el-table-column prop="className" label="班级" width="70" align="center"></el-table-column>
						</el-table>
					</div>
                </sy-grad-4>
            </div>
        </sy-dialog>
	</div>
</template>
<script type="text/javascript">
// 0 -- 无白色  1 -- 选中黄色 2 -- 可调绿色 3 -- 冲突深黄色 4 -- 不可调红色
import screenfull from 'screenfull';
import {getPkWaitHandle,
	getPkGradeList,
	getClazzListByGradeId,
	selectConflictById,
	selectAdjustVeryNiceIndex,
	changePKweek,
	sheckedPKweek,
	selectAllRule,
	getTeacherListByGrade,
	saveCoursesheetvm,
	saveAddWaitHandle,
	saveRomveWaitHandle,
	getSelectGradeCourseTeacher,
	getPlaceTypes,
	getPlaceByTypeId,
	getBb,
	getFestival,
	selectCoursesheetvm} from '../request.js';
export default {
	directives: {
        // 放置容器指令
        drop: {
            bind(el, binding, vnode) {
                let drag = {
                    // 初始化
                    init: function () {
                        let me = this;
                        el.addEventListener('dragenter', me.onDragEnter, false);
                        el.addEventListener('dragover', me.onDragOver, false);
                        el.addEventListener('dragleave', me.onDragLeave, false);
                        el.addEventListener('drop', me.onDrop, false);
                    },
                    onDragEnter: function (e) {
                        let me = this;
                        let target = e.target;
                        target.classList.add('over-td')
                    },
                    onDragLeave: function (e) {
                        let target = e.target;
                        target.classList.remove('over-td')
                    },
                    onDragOver: function (e) {
                        e.preventDefault();
                    },
                    onDrop: function (e) {
                        e.stopPropagation();
                        let data = JSON.parse(e.dataTransfer.getData('data'));
                        let target = e.target;
                        target.classList.remove('over-td')
                        let tData = binding.value.row;
                        let argus = {
                            old: data,
                            target: tData
                        };
                        binding.value.set(argus);
                    }
                };
                drag.init()
            }
        },
        move: {
            bind(el, binding, vnode) {
                let drag = {
                    // 初始化
                    init: function () {
                        let me = this;
                        el.addEventListener('dragstart', me.onDragStart, false);
                        el.addEventListener('dragend', me.onDragEend, false);
                    },
                    onDragStart: function (e) {
                        el.classList.add('move')
                        e.dataTransfer.setData('data', JSON.stringify(binding.value.row));
                    },
                    onDragEend: function (e) {
                        el.classList.remove('move')
                    },
                };
                drag.init()
            }
        }
    },
	data() {
		return {
			intNum: 0,
			waitDialogVisible: false,
			waitselectGradeId: '', //待处理业务年级id
			waitTableList: [], 
			saveLoading: false,
			pageLoading: false, // ...
			id: this.$route.query.id, // 方案id
			teacherList: [],
			gradeId: "", // 教师总课表 年级下拉
			optimizeTypoeId: "1",
			optimizeTypoeOptions: [
				// 调课类型
				{ label: "按班级调课", value: "1" },
				{ label: "按教师调课", value: "2" },
				{ label: "按场地调课", value: "3" },
				{ label: "按教师总课表调课", value: "4" },
				{ label: "按班级总课表调课", value: "5" }
			],
			currentMsg: {
				id: '',
				name: ''
			},
			teacherName1: '', // ( 调课老师课表 )
			teacherName2: '', // ( 被调课老师课表 )
			classOptions: [
				{ value: "1", label: "1班" },
				{ value: "2", label: "2班" },
				{ value: "3", label: "3班" },
				{ value: "4", label: "4班" }
			],
			defaultProps: {
				children: "children",
				label: "label"
			},
			classId: "",
			keyWords: "",
			dataNumber: [],// 待处理作务
			classTreeData: [], // 树
			gradeListData: [], 
			placeListData: [],
			checkList: {
				// 复选组
				class: {
					address: false,
					teacher: false,
					clazz: false,
					radio: "short"
				},
				teacher: {
					shortName: false,
					clazz: true,
					teacher: false
				}
			},
			columesList: [],
			tableData: [],
			// 调课老师课表
			moveTeacherList: [],
			// 被调课老师课表
			dragTeacherList: [],
			showDargTeacherList: false, // 是否显示 被调课老师课表
			noTeacherList: [],
			showNoTeacherList: false, // 是否显示 待排老师列表
			// 1 独占元素冲突 2 不排 3 较好
			statusColor: {
				"0": { text: "独占元素冲突", color: "#FDC101" },
				"1": { text: "不排", color: "#FF4949" },
				"2": { text: "较差", color: "#F7BA2A" },
				"3": { text: "一般", color: "#73ccff" },
				"4": { text: "较好", color: "#13CE66" },
			},
			ignoreList: [],
			oldignoreList: [],
			isfullscreen: false, // 是否全屏
			step: '0',
			currentStep: '0',
			stepData: {}, // 数据
			oldSatates: [], // 冲突数据
			isSHOWtITLEinfo: false,
			oldPKcORSERiDS: '',
			optimizeClassId: '', // 调整科目的班级id
			teacherTotalTable: [], // 总课表节次星期对照
			tableDataList: [], // 
			selectGradeId: '',
			clazzTableDataList: [], // 班级总课表数据
			clazzTableColums: [], // 表头第二行
			defaultExpandedKeys: [], // 树结构默认展开 key数组
			currentNodeKey: '', // 当前选中节点
			oldCurrentNodeKey: '', // 当前选中节点
			treeDataObj: {}, 
			currentPKData: {
				id: '',
				classId: '',
				gradeId: '',
				teacherId: '',
				placeId: ''
			},
			ctrlTypeObj: {},
			addChangeData: {},
			addParmasData: {},
			removeChangeData: {}
		};
	},
	created(){
		this.init();
	},
  	methods: {
		init(){
			this.pageLoading = true;
			this.getNumbers().then(res=>{
				// 初始化为年级班级树
				this.loadTree('1');
				this.getBbList(); // 查询星期
				this.getPkList(); // 查询总课表
				this.getRuleList().then(res=>{}) // 查询规则
			});// 查询为安排作务
		},
		handleOpendataNumber(){
			this.waitselectGradeId = '';
			if(this.dataNumber.length > 0){
				this.waitDialogVisible = true;
				this.waitTableList = this.$_.cloneDeep(this.dataNumber);
			}
		},
		handleWaitGradeChange(val){
			if(val){
				this.waitTableList = this.$_.filter(this.dataNumber,o=>{return o.gradeId == this.waitselectGradeId});
			}else{
				this.waitTableList = this.$_.cloneDeep(this.dataNumber);
			}
		},
		// 查询为安排作务
		getNumbers(){
			return new Promise((resolve, reject) => {
				getPkWaitHandle(this.id).then(res=>{
					console.log(res);
					this.dataNumber = res || [];
					resolve(res)
				}).catch(err=>{
					this.dataNumber = [];
					reject(err)
				})
			})
		},
		// 方案类型改变
		handleChangeOptimizeTypoe(val){
			this.selectGradeId = '';
			this.teacherName1= ''; 
			this.currentNodeKey = '';
			this.treeDataObj={};
			this.oldCurrentNodeKey = null;
			this.teacherName2= ''; 
			this.currentMsg.id = '';
			this.currentMsg.name = '';
			this.classTreeData = [];
			this.defaultExpandedKeys = [];
			this.loadTree(val);
			this.clearCorseTable(); // 情况课表
			this.checkList.class.teacher = false; 
			this.checkList.class.address = false;
			this.checkList.class.clazz = false;
		},
		defaultData(){
			this.defaultExpandedKeys = this.classTreeData.length>0 ? [this.classTreeData[0].id] : [];
			this.handleNodeClick(this.classTreeData[0], null , null);
		},
		// 加载树
		loadTree(t){
			if(t == '1' || t == '2' || t == '4' || t == '5'){
				if(this.gradeListData.length==0){
					this.getGradeList().then(res=>{
						this.classTreeData = res;
						this.gradeListData = this.$_.cloneDeep(res);
						if(t == '4' || t == '5'){
							this.selectGradeId = this.classTreeData.length > 0 ? this.classTreeData[0].id : '';
							if(t == '4'){
								this.getTeacherList();
							}else{
								this.makeClazzTableData();
							}
						}
						this.defaultData();
					});
				}else{
					this.classTreeData =  this.$_.cloneDeep(this.gradeListData);;
					if(t == '4' || t == '5'){
						this.selectGradeId = this.classTreeData.length > 0 ? this.classTreeData[0].id : '';
						if(t == '4'){
							this.getTeacherList();
						}else{
							this.makeClazzTableData();
							this.getClazzTable();
						}
					}
					this.defaultData();
				}
			}else{
				if(this.placeListData.length == 0){
					this.getPlaceTypesList().then(res=>{
						this.classTreeData = res;
						this.placeListData = this.$_.cloneDeep(res);
						this.defaultData();
					});
				}else{
					this.classTreeData =  this.$_.cloneDeep(this.placeListData);
					this.defaultData();
				}
			}
		},
		// 教师总课表和班级总课表年级改变
		handleGradeChange(val){
			if(this.optimizeTypoeId == '5'){
				this.getClazzTable();
			}else if(this.optimizeTypoeId == '4'){
				this.getTeacherList();
			}
		},
		// 获取教师列表
		getTeacherList(){
			getTeacherListByGrade(this.id, this.selectGradeId).then(res=>{
				let heaerList = [];
				res.forEach((_s,s)=>{
					heaerList.push({id: _s.teacherId, name: _s.teacherName})
				})
				this.teacherList = heaerList;
				this.makeTeacherCourseTable();
			}).catch(err=>{
				
			})
		},
		// 制造教师总课表
		makeTeacherCourseTable(){
			this.tableDataList = [];
			let bodydata = [];
			this.teacherTotalTable.forEach((_d,d)=>{
				_d.children.forEach((_c,c)=>{
					let obj = {
						id: _d.id+'_'+_c.id,
						weekId: _d.id,
						festivalId: _c.id,
						status: 0,
						week: _d.name,
						name: _c.name,
						rowspan: c == 0 ? _d.children.length : 1
					}
					this.teacherList.forEach((_s,s)=>{
						obj[_s.id] = [];
						obj[_s.id+'_status'] = 0;
						obj[_s.id+'_hover'] = false;
						obj[_s.id+'_selected'] = false;
					})
					bodydata.push(obj)
				})
			})
			bodydata.forEach((_t,t)=>{
				this.teacherList.forEach((_s,s)=>{
					let arr = this.$_.filter(this.stepData[this.currentStep], o=>{
						return o.gradeId == this.selectGradeId && o.teacherId == _s.id && _t.weekId == o.weekId && o.festivalId == _t.festivalId
					})
					arr.forEach((_a,a)=>{
						_a.status = 0;
					})
					_t[_s.id] = arr;
				})
			})
			this.tableDataList = bodydata;
		},
		handleTeacherClick(item, key, row, type){
			let isselected = false, selectId = '';
			if(type == 'teacher'){
				this.tableDataList.forEach((_t,t)=>{
					this.teacherList.forEach((_s,s)=>{
						_t[_s.id].forEach((_a,a)=>{
							if(_a.status == 1){
								isselected = true;
								selectId = _a.courseId;
							}
						})
					})
				})
			}else{
				this.clazzTableDataList.forEach((_t,t)=>{
					this.clazzTableColums.forEach((_s,s)=>{
						_t[_s.id].forEach((_a,a)=>{
							if(_a.status == 1){
								isselected = true;
								selectId = _a.courseId;
							}
						})
					})
				})
			}
			if(isselected && selectId != row.courseId){ // 点击再没有课程安排的位置
				let msg = item.status == 2 ? '调整后会减少冲突数量！' : '调整后会增加冲突数量！';
				this.$confirm(msg+'是否确认调整课程?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let obj = {
						classId: this.optimizeClassId,
						codeXYVM: {
							festivalId: type == 'teacher' ? item.festivalId : key.festivalId,
							weekId: type == 'teacher' ? item.weekId : key.weekId
						},
						courseSheetId: this.oldPKcORSERiDS,
						courseSheetVMS: this.stepData[this.currentStep]
					}
					this.changePKweekList(obj);
				}).catch(() => {
				     
				});
			}else{ // 再次点击课位上
				if(row.courseId && selectId == row.courseId){
					row.status = 0;
					if(type == 'teacher'){
						this.tableDataList.forEach((_t,t)=>{
							_t.status = 0;
							this.teacherList.forEach((_s,s)=>{
								_t[_s.id].forEach((_a,a)=>{
									_a.status = 0;
								})
							})
						})
					}else{
						this.clazzTableDataList.forEach((_t,t)=>{
							_t.status = 0;
							this.clazzTableColums.forEach((_s,s)=>{
								_t[_s.id].forEach((_a,a)=>{
									_a.status = 0;
									
								})
								_t[_s.id+'_status'] = 0;
							})
						})
					}
					
				}else{
					if(type == 'teacher'){
						this.tableDataList.forEach((_t,t)=>{
							this.teacherList.forEach((_s,s)=>{
								_t[_s.id].forEach((_a,a)=>{
									if(_a.classId == row.classId){
										_a.status = 2;
									}
								})
							})
						})
					}else{
						item.status = 2;
					}
					row.status = 1;
					if(type == 'teacher'){
						this.optimizeClassId = row.classId;
						this.oldPKcORSERiDS = row.id;
					}else{
						this.optimizeClassId = row.classId;
						this.oldPKcORSERiDS = row.courseSheetId;
					}
					this.getCanTKW({
						solutionId: this.id,
						classId: this.optimizeClassId,
						courseSheetIds: [this.oldPKcORSERiDS],
						courseSheetVMS: this.stepData[this.currentStep]
					}).then(res=>{
						if(type == 'teacher'){
							this.tableDataList.forEach((_t,t)=>{
								_t.status = this.$_.filter(res.codeXYVMS, o=>{return o.weekId == _t.weekId && o.festivalId == _t.festivalId}).length>0 ? 1 : 0;
							})
							this.tableDataList.forEach((_t,t)=>{
								if(_t.status == 1){
									this.teacherList.forEach((_s,s)=>{
										if(this.$_.find(_t[_s.id], {classId: row.classId})　&&　_s.id != row.teacherId){
											_t[_s.id+'_status'] = 1;
										}
									})
									
								}
							})
						}else{
							this.clazzTableColums.forEach((_s,s)=>{
								if(this.$_.find(res.codeXYVMS, o=>{ return o.festivalId == _s.festivalId && o.weekId == _s.weekId && o.festivalId != key.festivalId && o.weekId != key.weekId})){
									item[_s.id+'_status'] = 1;
								}
							})
						}
					}).catch((err)=>{

					})
				}
			}
		},
		// 班级总课表
		makeClazzTableData(){
			let arr2 = [];
			this.teacherTotalTable.forEach((_d,d)=>{
				_d.children.forEach((_c,c)=>{
					let obj = {
						id: _d.id+'_'+_c.id,
						weekId: _d.id,
						festivalId: _c.id,
						name: _c.name,
						num: c+1
					}
					arr2.push(obj)
				})
			})
			this.clazzTableColums = arr2;
		},
		getClazzTable(){
			if(!this.selectGradeId){return}
			this.getClazzList(this.selectGradeId).then(res=>{
				let arr = [];
				res.forEach((_a,a)=>{
					let obj = {
						id: _a.id,
						name: _a.label,
						gradeName: _a.gradeName,
						status: 0
					}
					this.clazzTableColums.forEach((_s,s)=>{
						let _arr = this.$_.filter(this.stepData[this.currentStep], o=>{
							return o.gradeId == this.selectGradeId && o.classId == _a.id && _s.weekId == o.weekId && o.festivalId == _s.festivalId
						})
						let uniqCourse = this.$_.uniqBy(_arr, 'courseId');
						let _course = [];
						uniqCourse.forEach((_f,d)=>{
							_course.push({
								courseSheetId: _f.id,
								id: _f.courseId,
								courseId: _f.courseId,
								name: _f.courseName, // 简称
								courseShortName: _f.courseShortName, // 全称
								roomAddr: _f.roomAddr, // 场地
								roomName: _f.roomName,
								roomId: _f.roomId,
								status: 0,
								hover: false,
								className: _f.className,
								classId: _f.classId,
								gradeId: _f.gradeId,
								gradeName: _f.gradeName,
								singleDoubleType: _f.singleDoubleType,
								datas : this.$_.filter(_arr, o=>{return o.courseId == _f.courseId  && o.teacherId})
							})
						})
						obj[_s.id] = _course;
						obj[_s.id+'_status'] = 0;
						obj[_s.id+'_hover'] = false;
						obj[_s.id+'_selected'] = false;
					})
					arr.push(obj)
				})
				this.clazzTableDataList = arr;
			}).catch(err=>{
				
			})
		},
		// 加载子树
		handleNodeClick(data,node,vame){
			this.columesList.forEach((_s,s)=>{
				this.dragTeacherList.forEach((_d,d)=>{
					_d[_s.id] = [];
				})
				this.moveTeacherList.forEach((_f,f)=>{
					_f[_s.id] = [];
				})
			})
			if(this.optimizeTypoeId == '1'){ // 班级
				this.noTeacherList = [];
				if(data.type == 'grade'){
					if(!this.treeDataObj[data.id]){
						this.getClazzList(data.id).then(res=>{
							res.forEach((_a,a)=>{
								_a.gradeId = data.id;
							})
							data.children = res || [];
							this.treeDataObj[data.id] = res;
							this.currentNodeKey = res.length>0 ? res[0].id : '';
							if(res.length>0){
								this.handleNodeClick(res[0]);
							}
						}).catch(err=>{
							data.children = [];
						})
					}else{
						this.clearCorseTable(); // 情况课表
					}
				}else{
					this.currentMsg.id = data.id;
					this.currentMsg.name = data.gradeName + data.label;
					if(this.oldSatates.length == 0){
						this.pageLoading = true;
						this.getCTList().then(res=>{
							this.oldSatates = this.$_.cloneDeep(res);
							this.pageLoading = false;
							this.checkCTcolor(res);
						}).catch(err=>{
							this.pageLoading = false;
						})
					}else{
						this.checkCTcolor(this.oldSatates);
					}
					this.currentPKData.classId = data.id;
					this.currentPKData.gradeId = data.gradeId;
					this.refreshWaitData();
					
				}
			}
			if(this.optimizeTypoeId == '2'){ // 教师
				this.noTeacherList = [];
				if(data.type == 'grade'){
					if(!this.treeDataObj[data.id]){
						this.getSelectGradeCourseTeacherList(this.id, data.id).then(res=>{
							res.forEach((_s,s)=>{
								_s.gradeId = data.id;
								_s.children.forEach((_a,a)=>{
									_a.gradeId = data.id;
								})
							})
							data.children = res || [];
							this.treeDataObj[data.id] = res;
							if(res.length>0){
								this.defaultExpandedKeys.push(res[0].id);
								if(res[0].children.length>0){
									this.currentNodeKey = res[0].children[0].id;
									this.handleNodeClick(res[0].children[0]);
								}
							}
						}).catch(err=>{
							data.children = [];
						})
					}else{
						this.clearCorseTable(); // 情况课表
					}
				}else if(data.type == 'teacher'){
					this.currentMsg.id = data.id;
					this.currentMsg.name = data.label+'老师的';
					this.checkCTcolor(this.oldSatates);
					this.currentPKData.teacherId = data.id;
					this.currentPKData.gradeId = data.gradeId;
					this.refreshWaitData();
				}else{
					this.clearCorseTable(); // 情况课表
				}
			}
			if(this.optimizeTypoeId == '3'){ // 场地
				this.noTeacherList = [];
				if(data.type == 'placeType'){
					this.noTeacherList = [];
					if(!this.treeDataObj[data.id]){
						this.getPlaceByTypeId(data.id).then(res=>{
							data.children = res || [];
							this.treeDataObj[data.id] = res;
							this.currentNodeKey = res.length>0 ? res[0].id : '';
							if(res.length>0){
								this.handleNodeClick(res[0]);
							}
						}).catch(err=>{
							data.children = [];
						})
					}else{
						this.clearCorseTable(); // 情况课表
					}
				}else{
					this.currentMsg.id = data.id;
					this.currentMsg.name = data.label+'的';
					this.checkCTcolor(this.oldSatates);
					this.currentPKData.placeId = data.id;
					this.refreshWaitData();
				}
			}
		},
		// 年级班级树
		getGradeList(){
			return new Promise((resolve, reject) => {
				getPkGradeList(this.id).then(res=>{
					let arr = [];
					res.forEach((_a,a)=>{
						arr.push({
							id: _a.gradeId,
							label: _a.gradeName,
							type: 'grade',
							children: [{}]
						})
					})
					resolve(arr);
				}).catch(err=>{
					reject([])
				})
			})
		},
		// 根据年级id查询班级列表
		getClazzList(id){
			return new Promise((resolve, reject) => {
				getClazzListByGradeId(id).then(res=>{
					let arr = [];
					res.forEach((_a,a)=>{
						arr.push({
							id: _a.id,
							gradeName: _a.gradeName,
							gradeId: '',
							shortName: _a.shortName,
							label: _a.name,
							type: 'clazz',
							children: []
						})
					})
					resolve(arr)
				}).catch(err=>{
					reject([])
				})
			})
		},
		// 根据方案id和年级id查询课程教师集合
		getSelectGradeCourseTeacherList(solutionId,gradeId){
			return new Promise((resolve, reject) => {
				getSelectGradeCourseTeacher(solutionId,gradeId).then(res=>{
					let arr = [];
					res.forEach((_a,a)=>{
						let obj = {
							id: _a.courseId,
							label: _a.courseName,
							gradeId: '',
							type: 'course',
							children: []
						}
						_a.teacherVMS.forEach((_d,d)=>{
							obj.children.push({
								id: _d.teacherId,
								label: _d.teacherName,
								type: 'teacher',
								gradeId: '',
								children: []
							})
						})
						arr.push(obj)
					})
					resolve(arr)
				}).catch(err=>{
					reject([])
				})
			})
		},
		// 查询场地类型
		getPlaceTypesList(){
			return new Promise((resolve, reject) => {
				getPlaceTypes(this.$store.state.unitId).then(res=>{
					let arr = [];
					res.forEach((_a,a)=>{
						arr.push({
							id: _a.id,
							label: _a.name,
							type: 'placeType',
							children: [{}]
						})
					})
					resolve(arr)
				}).catch(err=>{
					reject([])
				})
			})
		},
		// 根据类型查询场地
		getPlaceByTypeId(id){
			return new Promise((resolve, reject) => {
				getPlaceByTypeId(id).then(res=>{
					let arr = [];
					res.forEach((_a,a)=>{
						arr.push({
							id: _a.id,
							placeId: '',
							label: _a.name,
							address: _a.address,
							capacity: _a.capacity,
							type: 'place',
							children: []
						})
					})
					resolve(arr)
				}).catch(err=>{
					reject([])
				})
			})
		},
		// 查询星期
		getBbList(){
			this.tableData = [];
			getBb('XQ').then(res=>{
				let arr = [];
				res.data.forEach((_d,d)=>{
					if(_d.value != '6' && _d.value != '7'){
						arr.push({
							id: _d.id,
							name: _d.name
						})
					}
				})
				this.columesList = arr;
				getFestival({unitId:this.$store.state.unitId}).then(data=>{
					let _arr = [],allArr = [];
					data.data.forEach((_d,d)=>{
						let obj = {
							id: _d.id,
							begin: _d.begin,
							end: _d.end,
							number: _d.name,
							sort: _d.sort
						};
						this.columesList.forEach((_s,s)=>{
							obj[_s.id] = [];
							obj[_s.id+'_selected'] = false;// 单击选中
							obj[_s.id+'_'+_d.id+'_info'] = false;
						})
						_arr.push(obj)
					})
					this.tableData = _arr;
					// 调课老师课表
					this.moveTeacherList =  this.$_.cloneDeep(_arr);
					// 被调课老师课表
					this.dragTeacherList = this.$_.cloneDeep(_arr);
					// 教师总课表
					this.columesList.forEach((_s,s)=>{
						let _obj = {
							id: _s.id,
							name: _s.name,
							children: []
						}
						data.data.forEach((_d,d)=>{
							_obj.children.push({
								id: _d.id,
								name: _d.name
							})
						})
						allArr.push(_obj);
					})
					this.teacherTotalTable = allArr;
				})
			}).catch(err=>{
				
			})
		},
		// 查询课表
		getPkList(){
			return new Promise((resolve, reject) => {
				selectCoursesheetvm(this.id).then(res=>{
					this.stepData[this.currentStep] = this.$_.cloneDeep(res);
					resolve(res);
				}).catch(err=>{
					reject([])
				})
			})
		},
		// 查询冲突
		getCTList(){
			return new Promise((resolve, reject) => {
				selectConflictById(this.id).then(res=>{
					resolve(res);
				}).catch(err=>{
					reject([])
				})
			})
		},
		// 检测冲突
		checkeCTList(obj){
			return new Promise((resolve, reject) => {
				sheckedPKweek(obj).then(res=>{
					resolve(res);
				}).catch(err=>{
					reject([])
				})
			})
		},
		// 查询可调课位
		getCanTKW(arr){
			return new Promise((resolve, reject) => {
				selectAdjustVeryNiceIndex(arr).then(res=>{
					resolve(res);
				}).catch(err=>{
					reject([])
				})
			})
		},		
		// 查询规则
		getRuleList(){
			return new Promise((resolve, reject) => {
				selectAllRule(this.id).then(res=>{
					let ignoreList = [];
					res.forEach((_b,b)=>{
						ignoreList.push({
							res: _b.timesSelType == 'clazz' ? '班级' : _b.timesSelType == 'teacher' ? '教师' : _b.timesSelType == 'course' ? '科目' : _b.timesSelType == 'place' ? '场地' : '',
							type: _b.timesSelType,
							value: _b.type+'',
							label: _b.typeName,
							name: _b.placeName || _b.teacherName || _b.className || _b.courseName,
							id: _b.courseId || _b.classId || _b.placeId || _b.teacherId,
							weekId: _b.weekId,
							festivalId: _b.festivalId
						})
					})
					this.oldignoreList = this.$_.cloneDeep(ignoreList);
					resolve(res);
				}).catch(err=>{
					reject([])
				})
			})	
		},		
		// 情况课表
		clearCorseTable(){
			this.currentMsg.id = '';
			this.currentMsg.name = '';
			this.columesList.forEach((_s,s)=>{
				this.moveTeacherList.forEach((_f,f)=>{
					_f[_s.id] = [];
				})
				this.tableData.forEach((_d,f)=>{
					_d[`${_s.id}_${_d.id}_status`] = 0;
					_d[`${_s.id}_${_d.id}_conflictData`] = [];
					_d[`${_s.id}_${_d.id}_danger`] = '';
					_d[_s.id] = [];
				})
			})
		},
		// 冲突检测反应到页面
		checkCTcolor(res){
			console.log(this.stepData);
			let keyid = this.optimizeTypoeId == 1 ? 'classId' : this.optimizeTypoeId == 2 ? 'teacherId' : this.optimizeTypoeId == 3 ? 'roomId' : '';
			this.columesList.forEach((_s,s)=>{
				this.tableData.forEach((_d,d)=>{
					let arr = this.$_.filter(this.stepData[this.currentStep], o=>{
						return o[keyid] == this.currentMsg.id && o.weekId == _s.id && o.festivalId == _d.id
					})
					let uniqCourse = this.$_.uniqBy(arr, 'courseId');
					let _course = [];
					uniqCourse.forEach((_f,d)=>{
						let datas = [];
						if(this.optimizeTypoeId == 1){
							datas = this.$_.filter(arr, o=>{return o.courseId == _f.courseId  && o.teacherId})
						}else{
							datas = this.$_.uniqBy(this.$_.filter(arr, o=>{return o.courseId == _f.courseId  && o.classId}), 'id') 
						}
						_course.push({
							courseSheetId: _f.id,
							id: _f.courseId,
							name: _f.courseName, // 简称
							courseShortName: _f.courseShortName, // 全称
							roomAddr: _f.roomAddr, // 场地
							roomName: _f.roomName,
							roomId: _f.roomId,
							status: 0,
							hover: false,
							className: _f.className,
							classId: _f.classId,
							gradeId: _f.gradeId,
							gradeName: _f.gradeName,
							data: arr,
							singleDoubleType: _f.singleDoubleType,
							datas : datas
						})
					})

					let conflictData = this.$_.filter(res, o=>{
						return o.weekId == _s.id && o.festivalId == _d.id && o[keyid] == this.currentMsg.id
					})
					let rules = this.$_.filter(this.oldignoreList, o=>{return o.weekId == _s.id && o.festivalId == _d.id });
					let status = 0;
					let redMsg = '';
					// 1.当前课位下 如果有班级不排
					// 'clazz'  '班级' 'teacher' ? '教师' 'course'  '科目'  'place'  '场地' 
					if(this.$_.find(rules, o=>{ return o.value == '1' && o.type == 'clazz'})){ // 判断班级
						status = '4';
					}else{ // 判断科目
						if(this.$_.find(rules, o=>{return o.type == 'course' && this.$_.find(uniqCourse, {courseId: o.id})})){
							status = '4';
						}else{ // 场地
							if(this.$_.find(rules, o=>{ return o.type == 'place' && uniqCourse.length > 0 && o.id == uniqCourse[0].roomId })){
								status = '4';
							}else{ // 教师
								if(this.$_.filter(rules, o=>{return o.type == 'teacher' && this.$_.find(arr, {teacherId: o.id})}).length>0){
									status = '4';
								}else{
									if(conflictData.length>0){
										status = '3';
									}
								}
							}
						}
					}
					_d[`${_s.id}_${_d.id}_status`] = status;
					_d[`${_s.id}_${_d.id}_conflictData`] = conflictData;
					_d[`${_s.id}_${_d.id}_infoData`] = {};
					_d[`${_s.id}_${_d.id}_info`] = '';
					_d[`${_s.id}_${_d.id}_hover`] = false;
					_d[`${_s.id}_${_d.id}_danger`] = redMsg;
					_d[_s.id] = _course;
				})
				
			})
		},
		// 点击课程
		handleClick(row, key, week) {
			week.hover = false;
			this.isSHOWtITLEinfo = true;
			row[key.id+'_'+row.id+'_info'] = true;
			let isSlecteChage = false,isSlecteChageId='';
			let weekId = '';
			let festivalId = '';
			this.columesList.forEach((_s,s)=>{
				this.tableData.forEach((_d,d)=>{
					_d[_s.id].forEach((_f,f)=>{
						if(_f.status == 1){
							festivalId = _d.id;
							weekId = _s.id;
							isSlecteChageId = _f.id;
							isSlecteChage = true;
						}
					})
				})
			})
			if(isSlecteChage && (festivalId != row.id || weekId != key.id)){
				let msg = row[key.id+'_'+row.id+'_status'] == 2 ? '调整后会减少冲突数量！' : '调整后会增加冲突数量！';
				this.$confirm(msg+'是否确认调整课程?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let obj = {
						classId: this.optimizeClassId,
						codeXYVM: {
							festivalId: row.id,
							weekId: key.id
						},
						courseSheetId: this.oldPKcORSERiDS,
						courseSheetVMS: this.stepData[this.currentStep]
					}
					this.changePKweekList(obj);
				}).catch(() => {
				     
				});
				return
			}else{
				// 规则
				let ignoreList = [];
				row[key.id+'_'+row.id+'_conflictData'].forEach((_b,b)=>{
					ignoreList.push({
						res: '冲突',
						type: 'ct',
						value: '0',
						name: _b.courseName || _b.teacherName
					})
				})
				this.ignoreList = ignoreList.concat(this.$_.filter(this.oldignoreList,o=>{return o.festivalId == row.id && o.weekId == key.id}));
				// -----第一次选中判断是否有科目
				if(row[key.id].length == 0){
					return
				}
				this.ignoreList = ignoreList.concat(this.$_.filter(this.oldignoreList,o=>{return o.festivalId == row.id && o.weekId == key.id}));
				this.oldPKcORSERiDS = week.courseSheetId;
				let isselect = false;
				row[key.id].forEach((_a,a)=>{
					if(_a.id == week.id){
						if(_a.status == 1){
							_a.status = 0;
							this.isSHOWtITLEinfo = false;
							row[key.id+'_'+row.id+'_info'] = false;
							isselect = false;
							this.ignoreList = [];
							this.columesList.forEach((_s,s)=>{
								this.moveTeacherList.forEach((_f,f)=>{
									_f[_s.id] = [];
								})
							})
							this.checkCTcolor(this.oldSatates);
						}else{
							_a.status = 1;
							isselect = true;
						}
					}
				})
				if(!isselect){
					return
				}
				if(this.optimizeTypoeId == '1'){
					this.optimizeClassId = this.currentMsg.id;
				}else if(this.optimizeTypoeId == '2' || this.optimizeTypoeId == '3'){
					this.optimizeClassId = week.datas.length>0 ? week.datas[0].classId : '';
				}else{

				}
				this.getCanTKW({
					solutionId: this.id,
					classId: this.optimizeClassId,
					courseSheetIds: [this.oldPKcORSERiDS],
					courseSheetVMS: this.stepData[this.currentStep]
				}).then(res=>{
					this.tableData.forEach((_a,a)=>{
						this.columesList.forEach((_s,s)=>{
							_a[_s.id].forEach((_d,d)=>{
								if(_d.id != week.id){
									_d.status = 0;
								}
							})
						})
					})
					let data = week.datas.length>0 ? week.datas[0] : [];
					if(this.optimizeTypoeId == '1'){
						this.teacherName1 = week.status == 1 ? (data ? data.teacherName : '') : '';
					}else if(this.optimizeTypoeId == '2' || this.optimizeTypoeId == '3'){
						this.teacherName1 = week.status == 1 ? (data ? data.gradeName+data.className : '') : '';
					}else{
						this.teacherName1 = '';
					}
					this.columesList.forEach((_s,s)=>{
						this.tableData.forEach((_d,d)=>{
							if(_s.festivalId != row.id && _s.weekId != key.id){
								_d[`${_s.id}_${_d.id}_status`] = this.$_.find(res.codeXYVMS, o=>{return o.festivalId == _d.id && o.weekId == _s.id}) ? 2 : _d[`${_s.id}_${_d.id}_status`];
								_d[`${_s.id}_${_d.id}_infoData`] = this.$_.find(res.conflictCodeXYVMS, o=>{return o.festivalId == _d.id && o.weekId == _s.id});
							}
						})
						this.moveTeacherList.forEach((_d,d)=>{
							if(this.optimizeTypoeId == '1'){
								let arr = this.$_.filter(this.stepData[this.currentStep], o=>{
									return o.teacherId == data.teacherId && o.weekId == _s.id && o.festivalId == _d.id
								})
								let uniqCourse = this.$_.uniqBy(arr, 'courseId');
								let _course = [];
								uniqCourse.forEach((_d,d)=>{
									_course.push({
										id: _d.courseId,
										name: _d.courseName, // 简称
										className: _d.className,
										gradeName: _d.gradeName,
										singleDoubleType: _d.singleDoubleType,
										datas: this.$_.filter(arr, o=>{return o.teacherId == _d.teacherId})
									})
								})
								_d[_s.id] = week.status == 1 ? _course : [];
							}else{
								let arr = this.$_.filter(this.stepData[this.currentStep], o=>{
									return o.classId == this.optimizeClassId && o.weekId == _s.id && o.festivalId == _d.id
								})
								let uniqCourse = this.$_.uniqBy(arr, 'classId');
								let _course = [];
								uniqCourse.forEach((_f,d)=>{
									_course.push({
										courseSheetId: _f.id,
										id: _f.courseId,
										name: _f.courseName, // 简称
										courseShortName: _f.courseShortName, // 全称
										roomAddr: _f.roomAddr, // 场地
										roomId: _f.roomId,
										roomName: _f.roomName,
										status: 0,
										hover: false,
										className: _f.className,
										classId: _f.classId,
										gradeId: _f.gradeId,
										gradeName: _f.gradeName,
										data: arr,
										singleDoubleType: _f.singleDoubleType,
										datas : this.$_.filter(arr, o=>{return o.courseId == _f.courseId  && o.teacherId})
									})
								})
								_d[_s.id] = _course;
							}
						})
					})
				})
			}
		},
		// 调课
		changePKweekList(arr){
			this.pageLoading = true;
			changePKweek(arr).then(data=>{
				this.ctrlTypeObj[this.currentStep] = 'change';
				this.ignoreList = []; // 情况冲突详情
				this.$notify({
					message: '调课成功',
					type: 'success'
				});
				this.isSHOWtITLEinfo = false;
				this.columesList.forEach((_s,s)=>{
					this.dragTeacherList.forEach((_d,d)=>{
						_d[_s.id] = [];
					})
					this.moveTeacherList.forEach((_f,f)=>{
						_f[_s.id] = [];
					})
				})
				if(this.currentStep != this.step){
					let sobj = {};
					Object.keys(this.stepData).forEach((_q,q)=>{
						if(_q <= this.currentStep){
							sobj[_q] = this.stepData[_q];
						}
					})
					this.stepData = sobj;
				}
				this.step++;
				this.currentStep = this.step;
				this.stepData[this.currentStep] = this.$_.cloneDeep(data);
				if(this.optimizeTypoeId == '4'){
					this.makeTeacherCourseTable();
					this.pageLoading = false;
					return
				}
				if(this.optimizeTypoeId == '5'){
					this.getClazzTable()
					this.pageLoading = false;
					return
				}
				let obj = {
					solutionId: this.id,
					courseSheetVMS: data
				}
				// 检测冲突
				this.checkeCTList(obj).then(res=>{
					this.oldSatates = this.$_.cloneDeep(res);
					this.pageLoading = false;
					this.checkCTcolor(res);
				}).catch(err=>{
					this.pageLoading = false;
				})
			}).catch(err=>{

			})
		},
		infoMsgConflictCodeXYVMS(row, key, week, t){
			let msgData = row[key.id+'_'+row.id+'_infoData'];
			let classId = week.classId;
			let roomId = week.roomId;
			let msg = [];
			if(msgData){
				let arr = this.$_.filter(msgData.conflictCourseSheetVMS, o=>{return o.classId != classId});
				if(arr.length>0){
					let teachers = this.$_.filter(arr, o=>{return o.teacherId})
					teachers.forEach((_a,a) => {
						if(this.$_.find(week.datas, {teacherId: _a.teacherId})){
							msg.push(`${_a.teacherName}老师同时任教${_a.gradeName}${_a.className}的课程！`)
						}
					});
					let places = this.$_.filter(arr, o=>{return o.roomId})
					places.forEach((_a,a) => {
						if(this.$_.find(week.datas, {roomId: _a.roomId})){
							msg.push(`${_a.roomName}同时包含${_a.courseName}课程！`)
						}
					});
				}else{
					msg = ['未知冲突原因！'];
				}
			}
			return msg;
		},
		// 鼠标进入
		mounseOver(row, key, week, t) {
			week.hover = week.status == 0 ? true : false;
			this.showDargTeacherList = week.status == 0 ? true : false;
			this.mounseMakeData(row, key, week, t,row, key, week, t)
		},
		// 鼠标移出
		mounseLeave(row, key, week, t) {
			week.hover = false;
			this.showDargTeacherList = false;
			this.mounseMakeData(row, key, week, t)
		},
		// 鼠标移入移出
		mounseMakeData(row, key, week, t){
			let isSlecteChage = false,isSlecteChageId='';
			let weekId = '';
			let festivalId = '';
			this.columesList.forEach((_s,s)=>{
				this.tableData.forEach((_d,d)=>{
					_d[_s.id].forEach((_f,f)=>{
						if(_f.status == 1){
							festivalId = _d.id;
							weekId = _s.id;
							isSlecteChageId = _f.id;
							isSlecteChage = true;
						}
					})
				})
			})
			if(isSlecteChage && (festivalId != row.id || weekId != key.id)){
				row[key.id+'_'+row.id+'_info'] = this.infoMsgConflictCodeXYVMS(row, key, week, t);
			}else{
				return
			}
			if(t=='in'){
				row[key.id+'_'+row.id+'_hover'] = week.status == 0 ? true : false;
			}else{
				row[key.id+'_'+row.id+'_hover'] = false;
			}
			if(row[key.id].length == 0){
				return
			}
			let data = week.datas.length>0 ? week.datas[0] : null;
			if(!data){return}
			this.teacherName2 = t == 'in' ? (data ? data.teacherName : '') : '';
			this.columesList.forEach((_s,s)=>{
				this.dragTeacherList.forEach((_d,d)=>{
					let arr = this.$_.filter(this.stepData[this.currentStep], o=>{
						return o.teacherId == data.teacherId && o.weekId == _s.id && o.festivalId == _d.id
					})
					let uniqCourse = this.$_.uniqBy(arr, 'courseId');
					let _course = [];
					uniqCourse.forEach((_d,d)=>{
						_course.push({
							id: _d.courseId,
							name: _d.courseName,
							className: _d.className,
							gradeName: _d.gradeName,
							singleDoubleType: _d.singleDoubleType,
							datas: this.$_.filter(arr, o=>{return o.teacherId == _d.teacherId})
						})
					})
					_d[_s.id] = t == 'in' ? _course : [];
				})
			})
		},
		handleIconClick() {},
		handleFullScren(){
			this.isfullscreen = !this.isfullscreen;
		},
		// 保存课位
		handleSavePK(){
			if ((new Date().getTime() - this.intNum) < 500) { //解决双击发两条请求的问题，只要点击相隔小于500毫秒就不发请求
                this.intNum = 0;
                console.error('二货点那么快要死啊！')
                return false;
            }else{
                this.intNum = new Date().getTime();
            }
			this.pageLoading = true;
			this.saveLoading = true;
			saveCoursesheetvm({
				solutionId: this.id,
				courseSheetVMS: this.stepData[this.currentStep]
			}).then(res=>{
				this.step = '0';
				this.currentStep = '0';
				this.stepData = {};
				this.$notify({
					title: '成功',
					message: '保存成功',
					type: 'success'
				});
				// 重新查询课表
				selectCoursesheetvm(this.id).then(res=>{
					this.stepData[this.step] = this.$_.cloneDeep(res);
					this.getCTList().then(res=>{
						this.oldSatates = this.$_.cloneDeep(res);
						this.pageLoading = false;
						this.checkCTcolor(res);
						this.saveLoading = false;
					}).catch(err=>{
						this.pageLoading = false;
						this.saveLoading = false;
					})
				}).catch(err=>{
					this.pageLoading = false;
					this.saveLoading = false;
				})
			}).catch(err=>{
				this.pageLoading = false;
				this.saveLoading = false;
			})
		},
		renderContent(h, { node, data, store }) {
			return (
				<span>
					<span>
						<i
						style={{
							display: node.childNodes.length == 0 ? "none" : "",
							fontSize: "16px",
							position: "relative",
							top: "2px"
						}}
						class={{
							fa: true,
							"fa-folder-o": !node.expanded,
							"fa-folder-open-o": node.expanded
						}}
						aria-hidden="true"
						/>
						<i style={{
							display: node.childNodes.length != 0 ? "none" : "",
							fontSize: "16px",
							position: "relative",
							top: "2px"
						}}
						class="fa fa-file-text-o"
						aria-hidden="true"
						/>
						<span> {node.label}</span>
					</span>
				</span>
			);
		},
		prev(){
			this.$router.push({path: '/pk/pre/manager/courseArranging', query: this.$route.query})
		},
		next(){
			this.$router.push({path: '/pk/pre/manager/previewSchedule/clazzSchedule', query: this.$route.query})
		},
		// 拖拽回调
        set(data) {
			
			// 带排拖动到课位
			if(data.old.type == 'wa' && data.target.type == 'box'){
				data.old.data.classId = data.old.data.classId || 'null_fill';
				data.old.data.courseId = data.old.data.courseId || 'null_fill';
				data.old.data.gradeId = data.old.data.gradeId || 'null_fill';
				data.old.data.mergeCourseId = data.old.data.mergeCourseId || 'null_fill';
				data.old.data.singleDoubleCourseId = data.old.data.singleDoubleCourseId || 'null_fill';
				data.old.data.singleDoubleType = data.old.data.singleDoubleType || 0;
				
				let obj = {
					codeXYVM: {
						festivalId: data.target.festivalId,
						weekId: data.target.weekId
					},
					courseSheetVMS: this.stepData[this.currentStep],
					solutionId: this.id,
					waitHandleVM: data.old.data
				}
				this.saveWaitKbHandle(obj, 'add');
			}
			// 移除
			if(data.old.type == 'kb' && data.target.type == 'wa'){
				console.log('拖拽成功',data);
				let obj = {
					data: {
						courseSheetVM: data.old.data.datas[0],
						courseSheetVMS: this.stepData[this.currentStep],
						solutionId: this.id
					},
					codeXYVM: {
						festivalId: data.old.festivalId,
						weekId: data.old.weekId
					}
				}
				this.removeKbHandle(obj, 'remove');
			}
		},
		// 撤销
		handleJumpPre(){
			console.log(this.ctrlTypeObj);
			if(this.ctrlTypeObj[this.currentStep] == 'add'){
				let obj ={
					data: {
						courseSheetVM: {
							id: this.removeChangeData[this.currentStep]
						},
						courseSheetVMS: this.stepData[this.currentStep],
						solutionId: this.id
					}
				}  
				this.removeKbHandle(obj).then(res=>{
					if(this.currentStep > 0){
						this.currentStep--
					}
				});
			}else if(this.ctrlTypeObj[this.currentStep] == 'remove'){
				let obj = this.addParmasData[this.currentStep];
				obj.courseSheetVMS = this.stepData[this.currentStep];
				this.saveWaitKbHandle(obj).then(res=>{
					if(this.currentStep > 0){
						this.currentStep--
					}
				});
			}else{
				if(this.currentStep > 0){
					this.currentStep--
				}
				// 检测冲突
				let obj = {
					solutionId: this.id,
					courseSheetVMS: this.stepData[this.currentStep]
				}
				this.pageLoading = true;
				this.checkeCTList(obj).then(res=>{
					this.oldSatates = this.$_.cloneDeep(res);
					this.pageLoading = false;
					this.checkCTcolor(res);
				}).catch(err=>{
					this.pageLoading = false;
				})
			}
			
		},
		// 恢复
		handleJumpEnd(){
			if(this.currentStep < this.step){
				this.currentStep++
			}
			if(this.ctrlTypeObj[this.currentStep] == 'add'){
				let obj = this.addChangeData[this.currentStep];
				this.saveWaitKbHandle(obj);
			}else if(this.ctrlTypeObj[this.currentStep] == 'remove'){
				let obj = {
					data: {
						courseSheetVM: {
							id: this.removeChangeData[this.currentStep]
						},
						courseSheetVMS: this.stepData[this.currentStep],
						solutionId: this.id
					}
				}  
				this.removeKbHandle(obj).then(res=>{});
			}else{
				// 检测冲突
				let obj = {
					solutionId: this.id,
					courseSheetVMS: this.stepData[this.currentStep]
				}
				this.pageLoading = true;
				this.checkeCTList(obj).then(res=>{
					this.oldSatates = this.$_.cloneDeep(res);
					this.pageLoading = false;
					this.checkCTcolor(res);
				}).catch(err=>{
					this.pageLoading = false;
				})
			}
		},
		refreshWaitData(){
			this.noTeacherList = [];
			setTimeout(() => {
				if(this.optimizeTypoeId == '1'){
					this.noTeacherList = this.$_.filter(this.dataNumber, o=>{return o.classId == this.currentPKData.classId && o.gradeId == this.currentPKData.gradeId});
				}else if(this.optimizeTypoeId == '2'){
					console.log(this.currentPKData.teacherId, this.currentPKData.gradeId);
					this.dataNumber.forEach((_s,s)=>{
						_s.teacherVMS.forEach((_a,a)=>{
							if(_a.teacherId == this.currentPKData.teacherId  && _s.gradeId == this.currentPKData.gradeId){
								this.noTeacherList.push(_s);
							}
						})
					})
				}else if(this.optimizeTypoeId == '3'){
					this.dataNumber.forEach((_s,s)=>{
						_s.pkPlaceVMS.forEach((_a,a)=>{
							if(_a.placeId == this.currentPKData.placeId){
								this.noTeacherList.push(_s);
							}
						})
					})
				}
			}, 50);
			
		},
		saveWaitKbHandle(obj,type){
			return new Promise((resolve,reject)=>{
				saveAddWaitHandle(obj).then(data=>{
					this.$notify({
						title: '成功',
						message: '安排成功',
						type: 'success'
					});
					if(type == 'add'){
						this.step++;
						this.currentStep = this.step;
						this.stepData[this.currentStep] = this.$_.cloneDeep(data.courseSheetVMS);
						this.addChangeData[this.currentStep] = this.$_.cloneDeep(obj);
						this.removeChangeData[this.currentStep] = data.id; // 移除时删除数组
						this.ctrlTypeObj[this.currentStep] = 'add';
					}else{
						this.stepData[this.currentStep] = this.$_.cloneDeep(data.courseSheetVMS);
						this.removeChangeData[this.currentStep] = data.id; // 移除时删除数组
					}
					this.getNumbers().then(request=>{
						this.refreshWaitData();
						let _obj = {
							solutionId: this.id,
							courseSheetVMS: data.courseSheetVMS
						}
						// 检测冲突
						this.checkeCTList(_obj).then(res=>{
							this.oldSatates = this.$_.cloneDeep(res);
							this.pageLoading = false;
							this.checkCTcolor(res);
							resolve(data)
						}).catch(err=>{
							this.pageLoading = false;
						})
					})
				}).catch(err=>{
					reject(err)
				})
			})
		},
		removeKbHandle(obj,type){
			return new Promise((resolve,reject)=>{
				saveRomveWaitHandle(obj.data).then(data=>{
					this.$notify({
						title: '成功',
						message: '移除成功',
						type: 'success'
					});
					if(type == 'remove'){
						this.step++;
						this.currentStep = this.step;
						this.stepData[this.currentStep] = this.$_.cloneDeep(data.courseSheetVMS);
						this.addParmasData[this.currentStep] = {
							codeXYVM: obj.codeXYVM,
							courseSheetVMS: [],
							solutionId: this.id,
							waitHandleVM: data.waitHandleVM
						};
						this.ctrlTypeObj[this.currentStep] = 'remove';
					}else{
						this.stepData[this.currentStep] = this.$_.cloneDeep(data.courseSheetVMS);
					}
					this.getNumbers().then(request=>{
						this.refreshWaitData();
						let _obj = {
							solutionId: this.id,
							courseSheetVMS: data.courseSheetVMS
						}
						// 检测冲突
						this.checkeCTList(_obj).then(res=>{
							this.oldSatates = this.$_.cloneDeep(res);
							this.pageLoading = false;
							this.checkCTcolor(res);
							resolve(data)
						}).catch(err=>{
							this.pageLoading = false;
						})
					})
				}).catch(err=>{

				})
			}).catch(err=>{
				reject(err)
			})
		},
  	}
};
</script>
<style scoped>
.sy-pk .sy-base-table-border tbody tr td {
	line-height: 22px;
	padding: 0;
}
.sy-pk .sy-base-table-border thead tr td,
.sy-pk .sy-base-table-border thead tr th {
	line-height: 32px;
	padding: 0 3px;
}
.sy-pk-o {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.sy-pk_border {
  border: 1px solid #ccc;
}
.sy-pk_bg_fff {
  background-color: #fff;
}
.sy-pk_noborder {
  line-height: 42px;
}
.sy-pk-step-optimeize_absolute{
	width: 99%;
	margin: 0 auto;
	padding-bottom: 10px;
	border: 1px solid #ccc;
}
.sy-pk-optimeize_absolute {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
}
.sy-pk-optimeize_fixed{
	position: fixed;
	top: 0;
	width: 100%;
	overflow: auto;
  	box-sizing: border-box;
	bottom: 0px;
	background-color: #fafcfb;
	z-index: 1000;
}
.sy-pk-optimeize_head {
  text-align: center;
  height: 38px;
  line-height: 38px;
  box-sizing: border-box;
  overflow-y: auto;
}
.sy-pk-optimeize_body {
  box-sizing: border-box;
}
.sy-pk-optimeize div {
  box-sizing: border-box;
}
.sy-pk-optimeize-col {
  position: relative;
  height: 100%;
  padding: 0 5px;
  box-sizing: border-box;
}
.sy-pk-optimeize-col h3 {
  margin: 0;
  height: 40px;
  line-height: 40px;
}
.sy-pk-optimeize-col .sy-pk-optimeize-tree-box {
  border: 1px solid #ccc;
  margin-top: 10px;
}
.sy-pk-optimeize-tree_head {
  margin: 0;
  line-height: 40px;
  padding: 0 10px;
}
.sy-pk-optimeize-tree_body {
  width: 100%;
  overflow-y: auto;
  height: 450px;
}
tr.clazz_row > td {
  cursor: pointer;
}
tr.clazz_row > td div.pk-selected:hover,
tr.clazz_row2 > td:hover {
  background: rgba(0, 0, 0, .2)!important;
}
ul.no_teacher_ul {
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
ul.no_teacher_ul > li {
  float: left;
  width: 33.33333%;
  box-sizing: border-box;
  line-height: 32px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  text-align: center;
  background-color: #98ff65;
}
</style>
