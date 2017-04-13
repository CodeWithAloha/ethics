<template>
  <div class="wrapper">
    <Legislator :legislator="legislator" v-for="legislator in data"></Legislator>
  </div>
</template>

<script>
import Legislator from "./Legislator.vue";
export default {
  name: "home",
  components: {
    Legislator
  },
  props: ["data"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
