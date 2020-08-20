const $map = document.getElementById('map'); // Colocamos con un $ adelante a los selectores.
const EUROPE_CENTER={lat: 47.582798, lng: 9.707756};
let GMAP;
function initMap() {

    GMAP = new google.maps.Map($map, {
        zoom: 4,
        center: EUROPE_CENTER,
      });
}
google.maps.event.addDomListener(window,'load',initMap);