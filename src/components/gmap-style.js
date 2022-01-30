export const gMapStyle = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 30 }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 7 }],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [{ color: "#000000" }, { lightness: 20 }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }, { lightness: 5 }, { weight: 1 }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 10 }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 22 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#000000" }, { lightness: 10 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }, { lightness: 0 }, { weight: 0.2 }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 22 }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 10 }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 19 }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 17 }],
  },
];
