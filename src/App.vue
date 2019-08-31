<template>
  <div id="app">
    <vue-map
      v-show="!loading"
      api-key="AIzaSyA_GkVQfPLIp99nbA3tGNH7C1ADQl0ayWQ"
      :lat="coordinates.lat"
      :lng="coordinates.lng"
    />
    <marker-pulse :loading="loading" />
    <form v-show="!loading" class="lookup" novalidate @submit.prevent="formLookup">
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
const ipInfoToken = "cc9000ffb074c6";

export default {
  name: "app",
  components: {
    "marker-pulse": () => import("./components/markerPulse"),
    "vue-map": () => import("./components/VueMaps")
  },
  data: () => ({
    location: null,
    isError: false,
    loading: true,
    lookup: null,
    coordinates: {
      lat: null,
      lng: null
    }
  }),
  created() {
    if (this.$route.query.lookup) {
      this.lookup = this.$route.query.lookup;
      this.formLookup(new Event("load"));
    } else {
      this.startLookup();
    }
  },
  methods: {
    startLookup() {
      this.loading = true;
      axios(`https://ipinfo.io/?token=${ipInfoToken}`)
        .then(res => this.dataIPfill(res.data))
        .finally(() => (this.loading = false));
    },
    formLookup(e) {
      e.preventDefault();
      this.loading = true;

      axios(`http://ipinfo.io/${this.lookup}/geo?token=${ipInfoToken}`)
        .then(res => this.dataIPfill(res.data))
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
