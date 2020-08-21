const $map = document.getElementById('map'); // Colocamos con un $ adelante a los selectores.
const $controls =document.getElementById('controls');
const EUROPE_CENTER = {lat: 47.582798, lng: 9.707756};
let GMAP;
function updateMap() {
  console.log(this.textContent);
}

function renderButtonElement(country) {
  const element = document.createElement('button')
  element.textContent = country
  element.addEventListener('click',updateMap)
  $controls.appendChild(element)
}
async function renderButtons() {
  const response = await fetch(`./catalogs/countries.json`)
  const countries = await response.json()
  countries.forEach(item =>renderButtonElement(item));
}

function initMap() {
  GMAP = new google.maps.Map($map, {
    zoom: 4,
    center: EUROPE_CENTER
  });
  renderButtons()
}
google.maps.event.addDomListener(window,'load', initMap);