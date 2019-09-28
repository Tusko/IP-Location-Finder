<template>
  <div id="map"></div>
</template>
<script>
let map;
import { gMapStyle } from "./gmap-style";

export default {
  name: "gVueMap",
  props: {
    lat: {
      type: String,
      default: "0"
    },
    lng: {
      type: String,
      default: "0"
    }
  },
  mounted() {
    this.loadMapApiScript();
  },
  methods: {
    loadMapApiScript() {
      this.$loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_MAP_API_KEY}`
      )
        .then(() => {
          map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: +this.lat, lng: +this.lng },
            streetViewControl: false,
            gestureHandling: "none",
            disableDefaultUI: true,
            zoomControl: false,
            styles: gMapStyle,
            draggable: false,
            zoom: 9
          });
        })
        .catch(() => alert("Google Maps API loading error"));
    },
    MapApiPanTo() {
      if (map) map.panTo(new google.maps.LatLng(+this.lat, +this.lng));
    }
  },
  watch: {
    lat() {
      this.MapApiPanTo();
    },
    lng() {
      this.MapApiPanTo();
    }
  }
};
</script>

<style lang="scss">
#map {
  margin-top: -5vh;
  height: 110vh;
}
</style>
