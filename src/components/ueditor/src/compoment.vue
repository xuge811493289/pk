<template>
	<div>
		<script :id="name" type="text/plain"></script>
	</div>
</template>
<script>
export default {
	name: "SyUe",
	data() {
		return {
			editor: null,
			content: "",
			text: "",
			contentLength: 0,
			euConfig: {},
			name: "myEditor",
			courrentValue: this.value
		};
	},
	props: {
		idName: {
			type: String
		},
		value: [String, Number],
		defaultMsg: {
			type: String
		},
		disbled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		config: {
			type: Object,
			default: ()=>{return {}}
		},
		maxLen: {
			type: Number,
			default: 1000
		},
		overflowMsg: {
			type: String,
			default: '字数超出最大限制！'
		},
		height: {
			type: [String,Number],
			default: 200
		},
		width: {
			type: [String,Number],
			default: '100%'
		},
		model: {
			type: String,
			default: 'large' // large small mini
		}
	},
	watch: {
		value(val) {
			console.log('>>>>>>>>>>>>>>>>',val);
			if (this.editor) {
				this.editor.setContent(val);
			}
			this.courrentValue = val;
		},
		courrentValue(val) {
			this.$emit("input", val);
		},
		disbled: function(newVal, oldVal) {
			if (newVal) {
				this.editor.setDisabled("fullscreen");
			} else {
				this.editor.setEnabled();
			}
		}
	},
	created() {
		this.init();
	},
	mounted() {
		const _this = this;
		this.editor = UE.getEditor(this.name, this.euConfig); // 初始化UE
		this.$emit("get-ue-editor", this.editor);
		this.editor.addListener("ready", function() {
			_this.editor.setContent(_this.defaultMsg || ''); // 确保UE加载完成后，放入内容。
			_this.$emit("ueditor", _this.editor);
		});
	},
	methods: {
		init() {
			//初始化
			if(this.idName){
				this.name = this.idName;
			}else{
				this.name = this.uuid(5, 10);
			}
			let toolbars = [];
			if(this.model == 'large'){
				toolbars = [
					'undo', //撤销
					'redo', //重做
 					'formatmatch', //格式刷
					'|', 
					'bold', //加粗
					'italic', //斜体
					'underline', //下划线
					'strikethrough', //删除线
					'forecolor', //字体颜色
					'backcolor', //背景色
					'fontfamily', //字体
					'fontsize', //字号
					'paragraph', //段落格式
					'customstyle', //自定义标题
					'|', 
					'simpleupload', //单图上传
					'insertimage',
					'link', //超链接
					'unlink', // 去掉链接
					'background', //背景
					'|', 
					'justifyleft', //居左对齐
					'justifyright', //居右对齐
					'justifycenter', //居中对齐
					'justifyjustify', //两端对齐
					'insertorderedlist', //有序列表
					'insertunorderedlist', //无序列表
					'indent', //首行缩进
					'fullscreen', //全屏
					'rowspacingtop', //段前距
					'rowspacingbottom', //段后距
					'lineheight', //行间距
					'edittip ', //编辑提示
				]
			}else if(this.model == 'small'){
				toolbars = [
					'bold', //加粗
					'italic', //斜体
					'underline', //下划线
					'strikethrough', //删除线
					'fontsize', //字号
					'|', 
					'justifyleft', //居左对齐
					'justifyright', //居右对齐
					'justifycenter', //居中对齐
					'justifyjustify', //两端对齐
					'insertorderedlist', //有序列表
					'insertunorderedlist', //无序列表
					'indent', //首行缩进
					'fullscreen', //全屏
					'rowspacingtop', //段前距
					'rowspacingbottom', //段后距
					'lineheight', //行间距
					'edittip ', //编辑提示
				]
			}else{
				toolbars = [
					'bold', //加粗
					'italic', //斜体
					'underline', //下划线
					'strikethrough', //删除线
					'fontsize', //字号
				]
			}
			this.euConfig = {
				maximumWords: this.maxLen, //初始化最大字数限制
				initialFrameWidth: this.width,
				wordOverFlowMsg: `<span style="color:red;">${this.overflowMsg}</span>`, //初始化字数超出提示
				readonly: this.disbled,
				initialFrameHeight: this.height, 
				toolbars:  [toolbars], //初始化编辑栏
				...this.config
			};
		},
		uuid(len, radix) {
			var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
			var uuid = [], i;
			radix = radix || chars.length;
			if (len) {
				for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
			} else {
				var r;
				uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
				uuid[14] = "4";
				for (i = 0; i < 36; i++) {
					if (!uuid[i]) {
						r = 0 | (Math.random() * 16);
						uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
					}
				}
			}
			return 'editer' + uuid.join("");
		}
	},
	destroyed() {
		this.editor.destroy();
	}
};
</script>
