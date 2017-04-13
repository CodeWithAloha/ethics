<template lang="html">
  <div class="legislator">
    <h1>{{ name }}</h1>
    <p>Contributions: ${{ legislator.Amount }}</p>
    <p v-html="files"></p>
  </div>
</template>

<script>
export default {
  props: ["legislator"],
  computed: {
    name() {
      const {
        contribution_first_name,
        ethics_first_name,
        ethics_last_name
      } = this.legislator;
      const first_name = ethics_first_name === "NA"
        ? contribution_first_name
        : ethics_first_name;
      return `${first_name} ${ethics_last_name}`;
    },
    files() {
      const { original_url } = this.legislator;
      if (original_url === "NA") {
        return "";
      }
      return original_url
        .split(";")
        .map(url => `<a href="${url}">${url}</a>`)
        .join("<br/>");
    }
  }
};
</script>

<style lang="css">
</style>
