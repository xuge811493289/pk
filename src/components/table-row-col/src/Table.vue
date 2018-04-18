<template>
    <div class="sy-z-table sy-theme-tableBorder" :ref="idName + 'root_div'">
        <div :style="{height: height,overflow: 'auto'}" :ref="idName">
            <div class="t_l" :style="{width: parseFloat(cw)*fix.length + 1 + 'px', bottom: isScorllBarW ? sW : 0}">
                <div class="left_div1" :ref="idName + 'left_div1'">
                    <table border='0' cellpadding="0" cellspacing="0">
                        <thead>
                            <tr v-for="(row,index) in columList" :key="'h_'+index">
                                <th v-for="item in row" 
                                    v-if="item.show"
                                    :key="'h_1_'+item.id" 
                                    :style="{width: item.width || cw}" 
                                    :colspan="item.col"
                                    :rowspan="item.row">
                                    <span>{{item.name}}</span>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="left_div2" :ref="idName + 'left_div2'">
                    <table border='0' cellpadding="0" cellspacing="0">
                        <thead>
                            <tr v-for="(row,index) in columList" :key="'h_'+index">
                                <th v-for="item in row" 
                                    v-if="item.show"
                                    :key="'h_1_'+item.id" 
                                    :style="{width: item.width || cw}" 
                                    :colspan="item.col"
                                    :rowspan="item.row">
                                    <span>{{item.name}}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row,index) in data" 
                                :key="'t_1_'+index" 
                                :class="{'bg-grey': row.hover}"  
                                v-on:mouseenter="mounseOver(row,index)" 
                                v-on:mouseleave="mounseLeave(row,index)">
                                <td class="z-bg" 
                                    v-for="(item,i) in columList[columList.length-1]" 
                                    v-if="row[item.id+'-show']|| true"
                                    :class="{bmx: stripe}"
                                    :colspan="row[item.id+'-c'] || 1"
                                    :rowspan="row[item.id+'-r'] || 1"
                                    :key="'t_2_'+i">
                                    <span>{{row[item.id]}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="t_r">
                <div class="right_div1" :ref="idName + 'right_div1'" :style="{right: isScorllBarH ? sW : 0}">
                    <table border='0' cellpadding="0" cellspacing="0">
                        <thead>
                            <tr v-for="(row,index) in columList" :key="'h_'+index">
                                <th v-for="item in row" 
                                    v-if="item.show"
                                    :key="'h_1_'+item.id" 
                                    :style="{width: isScorllBarW ? (item.width || cw) : 'auto'}" 
                                    :colspan="item.col"
                                    :rowspan="item.row">
                                    <span>{{item.name}}</span>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="right_div2" :ref="idName + 'right_div2'" >
                    <table border='0' cellpadding="0" cellspacing="0">
                        <thead>
                            <tr v-for="(row,index) in columList" :key="'h_'+index">
                                <th v-for="item in row" 
                                    v-if="item.show"
                                    :key="'h_1_'+item.id" 
                                    :style="{width: isScorllBarW ? (item.width || cw) : 'auto'}" 
                                    :colspan="item.col"
                                    :rowspan="item.row">
                                    <span>{{item.name}}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row,index) in data" 
                                :key="'t_1_'+index" 
                                :class="{'bg-grey': row.hover}"  
                                v-on:mouseenter="mounseOver(row,index)" 
                                v-on:mouseleave="mounseLeave(row,index)">
                                <td class="z-bg" 
                                    v-for="(item,i) in columList[columList.length-1]" 
                                    v-if="row[item.id+'-show']|| true"
                                    :class="{bmx: stripe}"
                                    :colspan="row[item.id+'-c'] || 1"
                                    :rowspan="row[item.id+'-r'] || 1"
                                    :key="'t_2_'+i">
                                    <span>{{row[item.id]}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from '../../utile/debounce.js';
export default {
    name: 'syTableZ',
    props: {
        height: {
            type: String,
            default: '100%' // 100px 100% -- 固定表头  auto -- 不固定
        },
        stripe: {
            type: Boolean,
            default: false // -- 是否显示斑马线
        },
        sW: {
            type: String,
            default: '6px' // 滚动条宽度
        },
        model: {
            type: String,
            default: 'def' // mix 
        },
        idName:{
            type: String,
            default: 'table_1'
        },
        fix: { // 二维数组 id name col row show isclick sortbale
            type: Array,
            default: ()=>{
                return []
            }
        },
        col: { // 二维数组 id name col row show isclick sortbale
            type: Array,
            default: ()=>{
                return []
            }
        },
        cw: {
            type: String,
            default: 'auto'
        },
        data: {
            type: Array,
            default: ()=>{
                return []
            }
        },
    },
    data() {
        return {
            isScorllBarH: false,
            isScorllBarW: false,
            config: {
                fixedWidth: '80px',
                defaultWidth: '70px',
                rootHeight: 0
            },
            columList: [],
            tableData: [],
            __resizeHanlder: null
        }
    },
    computed:{
        fixColums: function(){
            let a = [];
            
            return a
        },
        row2Clums: function(){
            let a = [];
            
            return a
        },
    },
    created(){
        this.init();
    },
    updated: function () {
        this.$nextTick(function () {
            this.checkScorll()
        })
    },
    mounted(){
        this.$nextTick(()=>{
            let right_div2 = this.$refs[this.idName + 'right_div2'];
            let right_div1 = this.$refs[this.idName + 'right_div1'];
            let left_div2 = this.$refs[this.idName + 'left_div2'];
            if(right_div2){
                right_div2.onscroll = function(){
                    let right_div2_top = this.scrollTop;
                    let right_div2_left = this.scrollLeft;
                    if(right_div1){
                        right_div1.scrollLeft = right_div2_left;
                    }
                    if(left_div2){
                        left_div2.scrollTop = right_div2_top;
                    }
                }
            }
        })
        this.checkScorll(); 
        this.__resizeHanlder = debounce(() => {
            this.$nextTick(function () {
                this.checkScorll()
            })
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy(){
        // 页面销毁之前清除监听事件
        if(!this.__resizeHanlder){
            return
        }else{
            window.removeEventListener('resize', this.__resizeHanlder)
        }
        this.__resizeHanlder = null;
    },
    methods: {
        init(){
            let hrows = this.col.length;
            let cc = [];
            for(let i = 0; i<hrows ; i++){
                cc.push(
                    [...this.fix[i],...this.col[i]]
                ) 
            }
            this.columList = cc;
            this.$nextTick(()=>{
                // this.checkScorll()
            })
        },
        tdStyle(row){
            return this.$emit('td-style',row)
        },
        // 计算高宽度
        checkScorll(t){
            let box = this.$refs[this.idName + 'right_div2'];
            let _box = '';
            if(box){
                _box = box.firstChild
            }
            if(box && _box){
                if(this.cw == 'auto'){
                    this.isScorllBarW = false;
                }else{
                    this.isScorllBarW = this.columList[this.columList.length-1].length * parseFloat(this.cw) > box.offsetWidth ? true : false;
                }
                console.log('横向滚动条计算>>',this.isScorllBarW,this.columList[this.columList.length-1].length * parseFloat(this.cw), _box.offsetWidth , box.offsetWidth);
                this.isScorllBarH = _box.offsetHeight > box.offsetHeight ? true : false;
                console.log('纵向滚动条计算>>',this.isScorllBarH , _box.offsetHeight, box.offsetHeight);
            }
            if(this.$refs[this.idName + 'root_div']){
                this.config.rootHeight = this.$refs[this.idName + 'root_div'].offsetHeight;
            }
            console.log('根元素高度>>',this.config.rootHeight);
        },
        // 鼠标移出
        mounseLeave(data,index){
            data.hover = false;
        },
        // 鼠标进入
        mounseOver(data,index){
            data.hover = true;
            console.log(data);
        }
    },
    
}
</script>

<style scoped>
@import './table.css';
</style>




