import Vue from "vue";
import App from "./App";
import LoadScript from "vue-plugin-load-script";

Vue.use(LoadScript);

if (process.env.NODE_ENV === "production") {
  Vue.config.productionTip = false;
  Vue.config.devtools = false;
} else {
  Vue.config.debug = true;
}

new Vue({
  render: h => h(App)
}).$mount("#app");
