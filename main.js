const $map = document.getElementById('map'); // Colocamos con un $ adelante a los selectores.
const $controls =document.getElementById('controls');
const EUROPE_CENTER = {lat: 47.582798, lng: 9.707756};
const {ScatterplotLayer,GoogleMapsOverlay}=deck;
let GMAP, DECKGL_OVERLAY, DATA_COUNTRY;
async function updateMap() {
  const $activeElement = document.querySelector('.is-active');
  if($activeElement){
    $activeElement.classList.remove('is-active');
  }
  this.classList.add('is-active');
  let country=this.textContent.replace(/ /g,'').toLowerCase();
  let layer= await getLayer(country);
  DECKGL_OVERLAY.setProps({layers:[await layer]})
  if(country==='all'){
    GMAP.setCenter(EUROPE_CENTER);
    GMAP.setZoom(4);
  }else{
    GMAP.setCenter({lat:DATA_COUNTRY[0].lat,lng:DATA_COUNTRY[0].lng});
    GMAP.setZoom(5);
  }
}
async function getLayer(country='austria') {
  // Pinta de un punto en la posicion de cada arbol
  const request_country= await fetch(`./data/${country}.json`);
  DATA_COUNTRY = await request_country.json();
  return await new ScatterplotLayer({
    id:'trees',
    data:DATA_COUNTRY,
    radiusMinPixels:1,
    radiusMaxPixels:100,
    lineWidthMinPixels:1,
    getPosition:d=>[d.lng,d.lat],
    getRadius:d=>50,
    gerFillColor:d=>[0,155,115],
    getLineColor:d=>[30,30,30]
  });
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

async function initMap() {
  GMAP = new google.maps.Map($map, {
    zoom: 4,
    center: EUROPE_CENTER
  });
  DECKGL_OVERLAY= new GoogleMapsOverlay();  // Indicamos que genere una capa
  DECKGL_OVERLAY.setMap(GMAP); // Indicamos que la capa se colocara encima de GoogleMa p
  DECKGL_OVERLAY.setProps({layers: [await getLayer()]})
  renderButtons()
}
google.maps.event.addDomListener(window,'load', initMap);