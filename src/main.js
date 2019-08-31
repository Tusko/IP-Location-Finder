import Vue from "vue";
import App from "./App";
import LoadScript from "vue-plugin-load-script";
import VueRouter from "vue-router";

Vue.use(LoadScript);
Vue.use(VueRouter);

if (process.env.NODE_ENV === "production") {
  Vue.config.productionTip = false;
  Vue.config.devtools = false;
} else {
  Vue.config.debug = true;
}

const router = new VueRouter({
  mode: "history",
  routes: [{ path: "/", component: App }]
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
