<template>
    <div class="sy-app-container">
        <sy-grad-4>
            <div slot="headerRight" style="line-height: 40px;text-align: right">
                <!-- <el-button>导出</el-button> -->
                <el-button @click="handlePrint">打印</el-button>
                <el-button @click="back">返回</el-button>
            </div>
            <div slot="bodyRight" style="width:100%;height:100%;padding: 10px;" id="print" v-loading="pageloading"
                element-loading-text="拼命加载中...">
                <div style="width: 800px;margin: 20px auto;border: 1px solid #ccc;padding: 15px 20px;background: #fff;" class="sy-theme-tableBorder" >
                    <p style="text-align: center;font-size: 16px;line-height: 32px;">{{parmasList.type == '2' ? '代课通知单' : '调课通知单'}}</p>
                    <p style="line-height: 20px;">
                        <span style="border-bottom: 1px solid #333;padding: 0 15px;">{{msgData.applyTeacherName}}</span>
                        <span>老师：</span>
                    </p>
                    <div v-if="parmasList.type == '2'" style="padding: 10px 10px 10px 60px;line-height: 20px;">
                        <span style="border-bottom: 1px solid #333;padding: 0 10px;"> {{msgData.classShortName || msgData.className}} </span>
                        的
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.applyDay"> {{$moment(msgData.applyDay) | moment('MM月DD日')}} </span>  
                        <!-- <span>{{msgData.applyWeekName}}</span>  -->
                        星期<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyWeekValue+'']}}</span>
                        的
                        <!-- <span>{{msgData.applyFestivalName}}</span>   -->
                        第<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyFestivalSort+'']}}</span>节  
                        <span>{{msgData.applyCourseName}}</span>    
                        由  
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;">{{msgData.adjustableTeacherName}}</span> 
                        老师
                        代课。请知照！
                    </div>
                    <div v-else style="padding: 10px 10px 10px 60px;line-height: 20px;">
                        <span style="border-bottom: 1px solid #333;padding: 0 10px;"> {{msgData.classShortName || msgData.className}} </span>
                        的
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.applyDay"> {{$moment(msgData.applyDay) | moment('MM月DD日')}} </span> 
                        <!-- <span>{{msgData.applyWeekName}}</span>  -->
                        星期<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyWeekValue+'']}}</span>
                        的
                        <!-- <span>{{msgData.applyFestivalName}}</span> -->
                        第<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyFestivalSort+'']}}</span>节
                        <span style="border-bottom: 1px solid #333;padding: 0 10px;" v-if="msgData.applyCourseName">{{msgData.applyCourseName}}</span>课 
                        调至
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.adjustableDay"> {{msgData.adjustableDay | moment('MM月DD日')}} </span> 
                        日
                        <span>{{msgData.adjustableWeekName}}</span> 
                        的
                        <span>{{msgData.adjustableFestivalName}}</span>   
                        ，请知照！
                    </div>
                    <div style="text-align: right;line-height: 20px;padding-right: 10px;">
                        <div style="text-align: center;display: inline-block;">
                            教务处<br>{{ $moment(msgData.applyTime) | moment('YYYY年MM月DD日')}}
                        </div>
                    </div>
                </div>
                <div style="width: 800px;margin: 20px auto;border: 1px solid #ccc;padding: 15px 20px;background: #fff;" class="sy-theme-tableBorder" >
                    <p style="text-align: center;font-size: 16px;line-height: 32px;">{{parmasList.type == '2' ? '代课通知单' : '调课通知单'}}</p>
                    <p style="line-height: 20px;">
                        <span style="border-bottom: 1px solid #333;padding: 0 15px;">{{msgData.adjustableTeacherName}}</span>
                        <span>老师：</span>
                    </p>
                    <div v-if="parmasList.type == '2'" style="padding: 10px 10px 10px 60px;line-height: 20px;">
                        <span style="border-bottom: 1px solid #333;padding: 0 10px;"> {{msgData.classShortName || msgData.className}} </span>
                        的
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.applyDay"> {{$moment(msgData.applyDay) | moment('MM月DD日')}} </span>  
                        星期<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyWeekValue+'']}}</span>
                        <!-- <span>{{msgData.applyWeekName}}</span>  -->
                        的第<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyFestivalSort+'']}}</span>节
                        <!-- <span>{{msgData.applyFestivalName}}</span>     -->
                        <span v-if="msgData.applyCourseName" style="border-bottom: 1px solid #333;padding: 0 5px;">{{msgData.applyCourseName}}</span>课由  
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;">{{msgData.adjustableTeacherName}}</span> 
                        老师
                        代课。请知照！
                    </div>
                    <div v-else style="padding: 10px 10px 10px 60px;line-height: 20px;">
                        <span style="border-bottom: 1px solid #333;padding: 0 10px;"> {{msgData.classShortName || msgData.className}} </span>
                        的
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.adjustableDay"> {{msgData.adjustableDay | moment('MM月DD日')}} </span> 
                        <span>{{msgData.adjustableWeekName}}</span> 
                        的
                        <span>{{msgData.adjustableFestivalName}}</span>    
                        <span style="border-bottom: 1px solid #333;padding: 0 10px;">{{msgData.adjustableCourseName}}</span>课 
                        调至
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.applyDay"> {{$moment(msgData.applyDay) | moment('MM月DD日')}} </span> 
                        日星期<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyWeekValue+'']}}</span>
                        <!-- <span>{{msgData.applyWeekName}}</span>  -->
                        的
                        <!-- <span>{{msgData.applyFestivalName}}</span> -->
                        第<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyFestivalSort+'']}}</span>节
                        ，请知照！
                    </div>
                    <div style="text-align: right;line-height: 20px;padding-right: 10px;">
                        <div style="text-align: center;display: inline-block;">
                            教务处<br>{{$moment(msgData.applyTime) | moment('YYYY年MM月DD日')}}
                        </div>
                    </div>
                </div>
                <div style="width: 800px;margin: 20px auto;border: 1px solid #ccc;padding: 15px 20px;background: #fff;" class="sy-theme-tableBorder" >
                    <p style="text-align: center;font-size: 16px;line-height: 32px;">{{parmasList.type == '2' ? '代课通知单' : '调课通知单'}}</p>
                    <p style="line-height: 20px;">
                        <span style="border-bottom: 1px solid #333;padding: 0 15px;">{{msgData.classShortName || msgData.className}}</span>
                        <span>班：</span>
                    </p>
                    <div v-if="parmasList.type == '2'" style="padding: 10px 10px 10px 60px;line-height: 20px;">
                        <span style="border-bottom: 1px solid #333;padding: 0 10px;"> {{msgData.applyTeacherName}}老师 </span>
                        的
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.applyDay"> {{msgData.applyDay | moment('MM月DD日')}} </span>  
                        <!-- <span>{{msgData.applyWeekName}}</span>  -->
                        星期<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyWeekValue+'']}}</span>
                        的
                        <!-- <span>{{msgData.applyFestivalName}}</span>    -->
                        第<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyFestivalSort+'']}}</span>节 
                        <span>{{msgData.applyCourseName}}</span>    
                        由  
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;">{{msgData.adjustableTeacherName}}</span> 
                        老师
                        代课。请知照！
                    </div>
                    <div v-else style="padding: 10px 10px 10px 60px;line-height: 20px;">
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.applyDay"> {{$moment(msgData.applyDay) | moment('MM月DD日')}} </span> 
                        <!-- <span>{{msgData.applyWeekName}}</span>  -->
                        星期<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyWeekValue+'']}}</span>
                        的
                        <!-- <span>{{msgData.applyFestivalName}}</span> -->
                        第<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyFestivalSort+'']}}</span>节
                        <span style="border-bottom: 1px solid #333;padding: 0 10px;">{{msgData.applyCourseName}}</span>课 
                        临时调至
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.adjustableDay"> {{msgData.adjustableDay | moment('MM月DD日')}} </span> 
                        日
                        <span>{{msgData.adjustableWeekName}}</span> 
                        的
                        <span>{{msgData.adjustableFestivalName}}</span>
                        ，
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.adjustableDay"> {{msgData.adjustableDay | moment('MM月DD日')}} </span> 
                        <span>{{msgData.adjustableWeekName}}</span> 
                        的
                        <span>{{msgData.adjustableFestivalName}}</span>    
                        <span style="border-bottom: 1px solid #333;padding: 0 10px;">{{msgData.adjustableCourseName}}</span>课 
                        临时调至
                        <span style="border-bottom: 1px solid #333;padding: 0 8px;" v-if="msgData.applyDay"> {{$moment(msgData.applyDay) | moment('MM月DD日')}} </span> 
                        日
                        <!-- <span>{{msgData.applyWeekName}}</span>  -->
                        星期<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyWeekValue+'']}}</span>
                        的
                        <!-- <span>{{msgData.applyFestivalName}}</span> -->
                        第<span style="border-bottom: 1px solid #333;padding: 0 5px;">{{number[msgData.applyFestivalSort+'']}}</span>节
                        ，请知照！
                    </div>
                    <div style="text-align: right;line-height: 20px;padding-right: 10px;">
                        <div style="text-align: center;display: inline-block;">
                            教务处<br>{{$moment(msgData.applyTime) | moment('YYYY年MM月DD日')}}
                        </div>
                    </div>
                </div>
            </div>
        </sy-grad-4>
    </div>
</template>

<script>
import { selectAdjustinfoList} from "../../request.js";
export default {
    data(){
        return {
            number: {
                '1': '一',
                '2': '二',
                '3': '三',
                '4': '四',
                '5': '五',
                '6': '六',
                '7': '七',
                '8': '八',
                '9': '九',
                '10': '十',
                '11': '十一',
                '12': '十二',
                '13': '十三',
                '14': '十四',
                '15': '十五',
                '16': '十六',
                '17': '十七',
            },
            pageloading: false,
            tableData: [],
            parmasList: {
                type: this.$route.query.type,
                yearValue: this.$route.query.year,
                termValue: this.$route.query.term,
                typeValue: this.$route.query.typeValue || '',
                keywords: this.$route.query.keywords || '',
            },
            msgData: {}
        }
    },
    created() {
        this.$parent.$emit('currentPage', '/pk/kb/change');
        this.init();
    },
    methods: {
        init(){
            this.getList();
        },
        getList(){
            this.pageloading = true;
            this.tableData = [];
            selectAdjustinfoList(this.$store.state.unitId, this.parmasList.yearValue, this.parmasList.termValue, this.parmasList.typeValue, this.parmasList.keywords ).then((data)=>{
                this.pageloading = false;
                this.msgData = this.$_.find(data, {id: this.$route.query.id}) || null;
                console.log(this.msgData);
                this.tableData = data || [];
            }).catch(err=>{
                this.pageloading = false;
                this.tableData = [];
            })
        },
        back(){
            this.$router.push({path: '/pk/kb/change', query: {
                type: this.msgData.adjustType,
                year: this.parmasList.yearValue, 
                term: this.parmasList.termValue,
                typeValue: this.parmasList.typeValue,
                keywords: this.parmasList.keywords
            }})
        },
        handlePrint() {
            this.$print('#print')
        }
    }
}
</script>

