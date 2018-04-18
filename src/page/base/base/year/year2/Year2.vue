<template>
	<div class="sy-row sy-body">
		<div class="sy-row">
			<el-select v-model="value" placeholder="请选择" class="sy-left" @change="getChangeValue">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="currentYear sy-right">当前年度：{{value}}</span>
		</div>
		<div class="sy-row">
			<el-table :data="tableData2" border>
				<el-table-column v-for="item in parentColumn" :prop="item.prop" :key="item.prop" :width="item.width" :label="item.label">
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible">
			<!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			    <el-form-item prop="dateTime1">
			        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.dateTime1" style="width: 100%;"></el-date-picker>
			    </el-form-item>
			</el-form>-->
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">更改</el-button>
    			<el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
        </el-dialog>
	</div>
</template>

<script>
import config from './config.js';
import pager from '../../../config.js';
export default {
    name: 'app',
    components: {
        
    },
    data () {
        return {
            form: {
                text: ''
            },
            value:'',
        	options:config.options,
            dialogFormVisible: false,
            dialogEditFormVisible: false,
            msg: 'Welcome to Your Vue.js App',
            tableData2:[],
            currentPage: 1,
            pageSizes: pager.pageSizes,
            pageSize: pager.pageSize,
            isvisible: false,
            parentColumn: config.parentList,
            obj:{
                color: '#f00'
            },
//          dateTime1:'',
            multipleSelection: [],
            isHasList: true
        }
    },
    beforeCreate(){
        
    },
    created(){
        this.$parent.$emit('currentPage','/base/year');
        for(let i = 0; i<2 ; i++){
            this.tableData2.push(
            	{
	            	shName:'第一学期',
	            	startDate:'2016-02-08',
	            	endDate:'2017-05-08'
            	}
            )
        }
    },
    methods:{
        getChangeValue (selVal){
    		console.log(selVal)
    	},
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