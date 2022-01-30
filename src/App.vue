<template>
  <div id="app">
    <vue-map v-show="!loading" :lat="coordinates.lat" :lng="coordinates.lng" />
    <loader v-if="loading || isError" />
    <marker-pulse v-if="!loading && !isError" :loading="false" />
    <form
      v-show="!loading"
      class="lookup"
      novalidate
      id="search"
      @submit.prevent="formLookup"
    >
      <h1>IP Address Tracker</h1>
      <div class="form-row">
        <input
          id="ip-search"
          v-model="lookup"
          type="text"
          minlength="7"
          maxlength="15"
          size="15"
          autocomplete="off"
          data-lpignore="true"
          pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
        />
        <i
          class="icon-copy"
          v-clipboard:copy="lookup"
          v-clipboard:success="onCopySuccess"
          v-clipboard:error="onCopyError"
        ></i>
        <button type="submit" class="icon-search"></button>
      </div>

      <h5 v-if="isError">IP Not Found</h5>
      <div v-else-if="apiResponse" class="ip-details">
        <div>
          <h5>Location</h5>
          <b>{{ formatLocation }}</b>
        </div>
        <div>
          <h5>Timezone</h5>
          <b>{{ apiResponse.timezone }}</b>
        </div>
        <div>
          <h5>ISP</h5>
          <b>{{ apiResponse.org || "N/A" }}</b>
        </div>
      </div>
    </form>
    <footer>
      <a href="https://frontend.im/" target="_blank" rel="nofollow noopener"
        >Created by Tusko Trush</a
      >
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import delayAdapterEnhancer from "axios-delay";

const api = axios.create({
  adapter: delayAdapterEnhancer(axios.defaults.adapter),
});

export default {
  name: "app",
  components: {
    "marker-pulse": () => import("./components/markerPulse"),
    "vue-map": () => import("./components/VueMaps"),
    loader: () => import("./components/loader"),
  },
  data: () => ({
    isError: false,
    loading: true,
    lookup: null,
    apiResponse: null,
    coordinates: {
      lat: null,
      lng: null,
    },
  }),
  beforeCreate() {
    if (!document.getElementById("mjuidHzeoaWw")) {
      this.$swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please turn off AdBlock plugin to use webapp",
        footer:
          "<a href='https://www.softwarehow.com/disable-adblock/' target='_blank'>How to disable AdBlock?</a>",
      });
    }
  },
  created() {
    if (this.$route.query.lookup) {
      this.lookup = this.$route.query.lookup;
      this.formLookup(new Event("load"));
    } else {
      this.formLookup(new Event("start"));
    }
  },
  computed: {
    formatLocation() {
      const { postal, city, region, country } = this.apiResponse ?? {};
      return [postal, city, region, country].filter(Boolean).join(", ");
    },
  },
  methods: {
    formLookup(e) {
      e.preventDefault();
      this.loading = true;
      const lookupURI = this.lookup ? this.lookup + "/" : "";
      api
        .get(
          `${process.env.VUE_APP_IP_URL}${lookupURI}geo?token=${process.env.VUE_APP_IP_KEY}`,
          { delay: 1e3 }
        )
        .then(({ data }) => this.dataIPfill(data))
        .catch(() => {
          this.isError = true;
          this.apiResponse = null;
        })
        .finally(() => (this.loading = false));
    },
    dataIPfill(o) {
      if (o.bogon) return (this.isError = true);
      const crdnts = o.loc.split(",");
      this.isError = false;

      this.coordinates.lat = crdnts[0];
      this.coordinates.lng = crdnts[1];

      this.apiResponse = { ...o };
      this.lookup = o.ip;

      if (this.$route.query.lookup !== o.ip)
        this.$router.push({
          query: {
            lookup: o.ip,
          },
        });
    },
    onCopySuccess() {
      this.$swal.fire({
        icon: "success",
        title: "Copied!",
        text: "IP successfully copied to clipboard.",
        showConfirmButton: false,
        showCancelButton: false,
        toast: true,
        position: "top-end",
        timer: 3000,
      });
    },
    onCopyError() {
      this.$swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Try again!",
        showConfirmButton: false,
        showCancelButton: false,
        toast: true,
        position: "top-end",
        timer: 3000,
      });
    },
  },
};
</script>

<style lang="scss" src="./styles.scss"></style>
