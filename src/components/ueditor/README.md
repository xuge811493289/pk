## 使用方法

<sy-ue :defaultMsg="defaultMsg" :config="config" ref="ue"></sy-ue>

### Attribute
defaultMsg	 | 默认显示文字	string	
config | 	配置	Object
#配置 http://fex.baidu.com/ueditor/#start-config

### 获取输入内容方法
# let content = this.$refs.ue.getUEContent();

# 示例
<template>
    <div class="sy-app-container">
        <sy-ue :defaultMsg="defaultMsg" :config="config" ref="ue"></sy-ue>
    </div>
</template>

<script>
export default {
    name: 'dyjd',
    data() {
        return {
            defaultMsg: '这里是UE测试',
            config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            }
        }
    },
    created(){
        
    },
    methods: {
        getUEContent() {
            let content = this.$refs.ue.getUEContent();
            this.$notify({
                title: '获取成功，可在控制台查看！',
                message: content,
                type: 'success'
            });
            console.log(content)
        }
    }
}
</script>
