<template>
    <div class="sy-app-container">
        <day :type="false"></day>
    </div>
</template>
<script>
    import day from '../../../components/day/index.vue';
    export default {
        components:{day},
        created() {
            this.$parent.$emit("currentPage", "/pk/kb/teacherday");
        },
    }
</script>