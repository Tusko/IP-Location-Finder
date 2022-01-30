<template>
  <div id="map" ref="mapContainer"></div>
</template>
<script>
import { gMapStyle } from "./gmap-style";
import { loadScript } from "vue-plugin-load-script";

export default {
  name: "gVueMap",
  props: {
    lat: {
      type: [String, Number],
      default: 0,
    },
    lng: {
      type: [String, Number],
      default: 0,
    },
  },
  data: () => ({
    map: undefined,
  }),
  beforeMount() {
    this.loadMapApiScript();
  },
  computed: {
    latLng() {
      return { lat: +this.lat, lng: +this.lng };
    },
  },
  methods: {
    loadMapApiScript() {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_MAP_API_KEY}`
      )
        .then(() => {
          this.map = new google.maps.Map(this.$refs.mapContainer, {
            center: this.latLng,
            streetViewControl: false,
            gestureHandling: "none",
            disableDefaultUI: true,
            zoomControl: false,
            styles: gMapStyle,
            draggable: false,
            zoom: 9,
          });
        })
        .catch(() => alert("Google Maps API loading error"));
    },
    MapApiPanTo() {
      if (this.map)
        this.map.panTo(new google.maps.LatLng(+this.lat, +this.lng));
    },
  },
  watch: {
    latLng: {
      deep: true,
      immediate: true,
      handler() {
        this.MapApiPanTo();
      },
    },
  },
};
</script>

<style lang="scss">
#map {
  margin-top: -5vh;
  height: 110vh;
}
</style>
