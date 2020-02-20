import Vue from "vue";
import App from "./App";
import LoadScript from "vue-plugin-load-script";
import VueRouter from "vue-router";
import VueSweetalert2 from "vue-sweetalert2";
import VueClipboard from "vue-clipboard2";

// import "sweetalert2/dist/sweetalert2.min.css";
import "@sweetalert2/theme-dark/dark.scss";
Vue.use(VueSweetalert2);
Vue.use(VueClipboard);
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
