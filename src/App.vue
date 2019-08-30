<template>
  <div id="app">
    <vue-map
      v-show="!loading"
      api-key="AIzaSyA_GkVQfPLIp99nbA3tGNH7C1ADQl0ayWQ"
      :lat="coordinates.lat"
      :lng="coordinates.lng"
      :accuracy="coordinates.radius"
    />
  </div>
</template>

<script>
require("./styles.scss");
import axios from "axios";
export default {
  name: "app",
  components: {
    "vue-map": () => import("./components/VueMaps")
  },
  data: () => ({
    loading: true,
    coordinates: {
      lat: null,
      lng: null,
      radius: null
    }
  }),
  beforeCreate() {
    axios("http://www.geoplugin.net/json.gp?jsoncallback=").then(r => {
      this.coordinates.lat = r.data.geoplugin_latitude;
      this.coordinates.lng = r.data.geoplugin_longitude;
      this.coordinates.radius = r.data.geoplugin_locationAccuracyRadius;
      this.loading = false;
    });
  }
};
</script>
