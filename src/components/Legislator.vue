<template lang="html">
  <el-col :xs="24" :span="6">
    <div class="legislator">
      <h1 class="title">{{ name }}</h1>
      <p class="">Contributions: <span style="font-weight: bold;">${{ legislator.Amount }}</span></p>
      <div class="image-wrap">
        <img class="image" v-lazy="image" :alt="name">
      </div>
      <p v-html="files"></p>
    </div>
  </el-col>
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
    image() {
      return `http://capitol.hawaii.gov/Members/Images/RepSenPhotos/${this.legislator.ethics_last_name.toLowerCase()}.jpg`;
    },
    files() {
      const { original_url } = this.legislator;
      if (original_url === "NA") {
        return "";
      }
      return original_url
        .split(";")
        .map(url => `<a href="${url}">Download PDF</a>`)
        .join("<br/>");
    }
  }
};
</script>

<style lang="css" scoped>
.legislator {
  margin: 0 0 2em;
}
.title {
  font-size: 19px;
}
.image-wrap {
  position: relative;
  overflow: hidden;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: 0 auto;
}
.image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}
.el-col {
  border-right: 1px solid #cacaca;
  margin: 0 0 3em;
}
.el-col:nth-child(4n) {
  border-right-width: 0;
}
</style>
