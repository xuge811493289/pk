<template>
    <div class="app-container-box">
      <total :type="false"></total>
    </div> 
</template>
<script>
import total from "../../../components/total/index.vue";
import index from "./index.js";
export default {
  components: {
    total
  },
  name: "notice",
  mixins: [index],
  data() {
    return {};
  },
  created() {
    this.$parent.$emit("currentPage", "/pk/kb/teachertotal");
  },
  methods: {}
};
</script>

<style scoped>

</style>