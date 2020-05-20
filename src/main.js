import Vue from "vue";
import App from "./App.vue";

import VeCharts from "ve-charts";
import "ve-charts/lib/ve-charts.min.css";
import VueSmartWidget from "vue-smart-widget";

Vue.use(VueSmartWidget);
Vue.use(VeCharts);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
