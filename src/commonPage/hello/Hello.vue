<template>
    <div class="app-container-box">
        <div class="hello">
            <div class="welcome">—— Welcome</div>
            <img src="./hello.png"> 
            <span>{{msg}} , {{name}} !</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: new Date().getHours() < 12 ? '早上好' : '下午好',
                name: this.$store.state.realName || ''
            }
        }
    }
</script>
<style scoped>
    .hello{
        position: absolute;
        top: 50%;
        left: 50%;
        box-sizing: border-box;
        transform: translate(-50%,-50%);
    }
    .hello>img{
        height: 50px;
        margin: 0 20px;
        vertical-align: middle;
    }
    .hello>span{
        font-size: 20px;
        font-weight: 700;
        position: relative;
        top: 6px;
    }
    .welcome{
        font-size: 16px;
        color: #EDA02F;
        line-height: 30px;
        text-align: right
    }
</style>
