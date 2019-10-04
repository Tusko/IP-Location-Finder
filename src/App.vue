<template>
  <div id="app">
    <vue-map v-show="!loading" :lat="coordinates.lat" :lng="coordinates.lng" />
    <loader v-if="loading || isError" />
    <marker-pulse v-if="!loading && !isError" :loading="false" />
    <form
      v-show="!loading"
      class="lookup"
      novalidate
      @submit.prevent="formLookup"
    >
      <h1>IP Lookup</h1>
      <div class="form-row">
        <input
          v-model="lookup"
          type="text"
          minlength="7"
          maxlength="15"
          size="15"
          pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
        />
        <button type="submit" class="icon-search"></button>
      </div>

      <h5 v-if="isError">IP Not Found</h5>
      <h5 v-else>
        <b>Location:</b>
        {{ location }}
      </h5>
    </form>
    <footer>
      <a href="https://arsmoon.com/" target="_blank">Created by Arsmoon</a>
    </footer>
  </div>
</template>

<script>
require("./styles.scss");
import axios from "axios";
import delayAdapterEnhancer from "axios-delay";

const api = axios.create({
  adapter: delayAdapterEnhancer(axios.defaults.adapter)
});

export default {
  name: "app",
  components: {
    "marker-pulse": () => import("./components/markerPulse"),
    "vue-map": () => import("./components/VueMaps"),
    loader: () => import("./components/loader")
  },
  data: () => ({
    location: null,
    isError: false,
    loading: true,
    lookup: "",
    coordinates: {
      lat: null,
      lng: null
    }
  }),
  beforeCreate() {
    if (!document.getElementById("mjuidHzeoaWw")) {
      this.$swal.fire({
        type: "error",
        title: "Oops...",
        text: "Please turn off AdBlock plugin to use webapp",
        footer:
          "<a href='https://www.softwarehow.com/disable-adblock/' target='_blank'>How to disable AdBlock?</a>"
      });
    }
  },
  created() {
    if (this.$route.query.lookup) {
      this.lookup = this.$route.query.lookup + "/";
      this.formLookup(new Event("load"));
    } else {
      this.formLookup(new Event("start"));
    }
  },
  methods: {
    formLookup(e) {
      e.preventDefault();
      this.loading = true;
      api
        .get(
          `${process.env.VUE_APP_IP_URL}${this.lookup}/geo?token=${process.env.VUE_APP_IP_KEY}`,
          { delay: 1e3 }
        )
        .then(res => this.dataIPfill(res.data))
        .catch(e => {
          this.isError = true;
        })
        .finally(() => (this.loading = false));
    },
    dataIPfill(o) {
      if (o.bogon) return (this.isError = true);
      const crdnts = o.loc.split(",");
      this.isError = false;
      this.coordinates.lat = crdnts[0];
      this.coordinates.lng = crdnts[1];
      this.lookup = o.ip;
      this.location =
        (o.city ? o.city + ", " : "") +
        (o.region ? o.region + ", " : "") +
        o.country;

      if (this.$route.query.lookup !== o.ip)
        this.$router.push({
          query: {
            lookup: o.ip
          }
        });
    }
  }
};
</script>
