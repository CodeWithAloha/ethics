// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

import raw from "./data/data.csv";
import parse from "csv-parse/lib/sync";

const data = parse(raw, {
  columns: true
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  data() {
    return {
      data
    };
  },
  template: '<App :data="data"/>',
  components: { App }
});
