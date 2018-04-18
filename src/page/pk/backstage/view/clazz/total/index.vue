<template>
    <div class="sy-app-container">
        <total :type="true"></total>
    </div>
</template>
<script>
    import total from '../../../components/total/index.vue';
    export default {
        components:{total},
        created() {
            this.$parent.$emit("currentPage", "/pk/kb/clazztotal");
        },
    }
</script>