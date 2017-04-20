<template>
  <div class="wrapper">
    <el-row type="flex" gutter=10 justify="space-between" align="top">
      <Legislator
        :legislator="legislator"
        v-for="legislator in data"></Legislator>
    </el-row>
  </div>
</template>

<script>
import Legislator from "./Legislator.vue";
export default {
  name: "home",
  components: {
    Legislator
  },
  data() {
    return {
      legs: []
    };
  },
  computed: {},
  mounted() {
    // fetch("https://openstates.org/api/v1/legislators/?state=hi&level=state")
    //   .then(res => res.json())
    //   .then(legs => Object.assign(this.$data, { legs }));
  },
  props: ["data"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }
  .selects {
    margin: 0 0 2em;
  }
  .el-row--flex {
    flex-wrap: wrap;
  }

</style>
