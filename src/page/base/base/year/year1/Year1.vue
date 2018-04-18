<template>
	<div class="sy-row sy-body">
		<div class="sy-row">
	   		<div class="sy-col sy-left">年度：</div>
	        <div class="sy-col sy-right">
	             <el-button type="primary" @click="addYearValue">新增</el-button>
	        </div>
	    </div>
		<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width:100%;">
			</el-table-column>
			<el-table-column v-for="item in appColumn1" :prop="item.prop" :key="item.prop" :width="item.width" :label="item.label">
			</el-table-column>
			<el-table-column label="操作" width="80">
				<template scope="scope">
					<el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="sy-row">
			<div class="sy-col sy-left" style="padding:15px 0;">学期: </div>
		</div>
		<el-table ref="multipleTable" :data="tableData1" border tooltip-effect="dark" style="width: 100%;">
			</el-table-column>
			<el-table-column v-for="item in appColumn2" :prop="item.prop" :key="item.prop" :width="item.width" :label="item.label">
			</el-table-column>
			<el-table-column label="操作" width="80">
				<template scope="scope">
					<el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="添加" :visible.sync="dialogFormVisible" size="tiny">
			  <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item
			    label="新增年度"
			    prop="addYear"
			    :rules="[
			      { required: true, message: '请填写你要新增的年度'},
			      { type: 'number', message: '填写的必须为数字'}
			    ]"
			  >
			    <el-input type="addYear" v-model.number="numberValidateForm.addYear" auto-complete="off"></el-input>
			  </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			     <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
				 <el-button @click="resetForm('numberValidateForm')">重置</el-button>
			  </div>
        </el-dialog>
	</div>
</template>

<script>
import config from './config.js';
import pager from '../../../config.js';
export default {
    data () {
        return {
            form: {
                text: ''
            },
            numberValidateForm: {
	          yearVal: ''
	        },
            dialogFormVisible: false,
            dialogEditFormVisible: false,
            tableData: [],
            tableData1:[],
            currentPage: 1,
            pageSizes: pager.pageSizes,
            pageSize: pager.pageSize,
            appColumn1: config.yearList,
            appColumn2:config.shList,
            isvisible: false,
            obj:{
                color: '#f00'
            },
            multipleSelection: [],
            isHasList: true
        }
    },
    beforeCreate(){
        
    },
    created(){
        this.$parent.$emit('currentPage','/base/year');
        for(let i = 0; i<2 ; i++){
            this.tableData.push(
                {	
                    year:'2016年-2017年',
                    yearVal:'2016-2017'
                }
            ),
            this.tableData1.push(
                {	
                    shName:'第一学期',
                    shVal:'1'
                }
            )
          
        }
    },
    methods:{
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

            // return target;
        },
        addYearValue(){
        	this.dialogFormVisible=true;
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          	}
        	});
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
        handleEdit(index,row){
            this.dialogEditFormVisible = true;
        }
    }
}
</script>

<style scoped>
    .sy-body{
        position: absolute;
        top: 25px;
        width: 100%;
        bottom: 45px;
    }
    .sy-bottom{
        position: absolute;
        height: 45px;
        width: 100%;
        bottom: 0;
    }
    .sy-row{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .sy-col{
        float: left;
        vertical-align: top;
        box-sizing: border-box;
    }
    .sy-1{
        width: 5%;
    }
    .sy-2{
        width: 10%;
    }
    .sy-3{
        width: 15%;
    }
    .sy-4{
        width: 20%;
    }
    .sy-5{
        width: 25%;
    }
    .sy-6{
        width: 30%;
    }
    .sy-7{
        width: 35%;
    }
    .sy-8{
        width: 40%;
    }
    .sy-9{
        width: 45%;
    }
    .sy-10{
        width: 50%;
    }
    .sy-11{
        width: 55%;
    }
    .sy-12{
        width: 60%;
    }
    .sy-13{
        width: 65%;
    }
    .sy-14{
        width: 70%;
    }
    .sy-15{
        width: 75%;
    }
    .sy-16{
        width: 80%;
    }
    .sy-17{
        width: 85%;
    }
    .sy-18{
        width: 90%;
    }
    .sy-19{
        width: 95%;
    }
    .sy-20{
        width: 100%;
    }
    .border{
        border: 1px solid #ccc;
    }
    .full-parent{
        position: relative;
        height: 100%;
    }
    .sy-left{
        float:left;
    }
    .sy-right{
        float:right;
    }
  
    .teacher-content,.teacher{
        position: relative;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 30px 20px;
    }
    .teacher-content{
        padding: 0;
    }
    .teacher-content-top{
        position: absolute;
        height: 30px;
        top: 0;
        width: 100%;
        line-height: 30px;
    }
    .teacher-content-bottom{
        position: absolute;
        top: 30px;
        bottom: 0;
        width: 100%;
    }
</style>