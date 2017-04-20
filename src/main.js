// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueLazyLoad from "vue-lazyload";
import "element-ui/lib/theme-default/index.css";
import ElementUi from "element-ui";
import _ from "lodash";

Vue.use(VueLazyLoad, {
  error: "https://placehold.it/200/200"
});
Vue.use(ElementUi);
Vue.config.productionTip = false;

import raw from "./data/data.csv";
import parse from "csv-parse/lib/sync";

const data = _.sortBy(
  parse(raw, {
    columns: true
  }),
  "ethics_last_name"
);

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
