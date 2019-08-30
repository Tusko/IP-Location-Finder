<template>
  <div id="map"></div>
</template>
<script>
let map, mapCircle;
export default {
  name: "gVueMap",
  props: {
    apiKey: {
      type: String,
      default: ""
    },
    lat: {
      type: String,
      default: 0
    },
    lng: {
      type: String,
      default: 0
    },
    accuracy: {
      type: String,
      default: 0
    }
  },
  mounted() {
    this.loadMapApiScript();
  },
  methods: {
    loadMapApiScript() {
      this.$loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`
      )
        .then(() => {
          map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: +this.lat, lng: +this.lng },
            streetViewControl: false,
            gestureHandling: "none",
            disableDefaultUI: true,
            zoomControl: false,
            draggable: false,
            zoom: 9
          });

          // Add the circle to the map.
          if (this.accuracy) {
            mapCircle = new google.maps.Circle({
              strokeColor: "#000",
              strokeOpacity: 0.6,
              strokeWeight: 3,
              fillColor: "#000",
              fillOpacity: 0.35,
              map: map,
              center: { lat: +this.lat, lng: +this.lng },
              radius: Math.sqrt(this.accuracy) * 1e4
            });
          }
        })
        .catch(e => alert("Google Maps API loading error"));
    },
    MapApiPanTo() {
      map.panTo(new google.maps.LatLng(+this.lat, +this.lng));
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
  height: 100vh;
}
</style>