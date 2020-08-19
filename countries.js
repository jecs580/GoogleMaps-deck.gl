const csv = require('csvtojson');
const fs = require('fs');
const proj4= require('proj4');
const catalogCountries= require('./catalogs/countries.json');
const catalogSpecies= require('./catalogs/species.json');
const pathFile = './euforestspecies.csv';
const countries = './data/';
proj4.defs([
    [
        'EPSG:3035',
        '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs '
    ],
    [
        'EPSG:4326',
        '+proj=longlat +datum=WGS84 +no_defs '
    ]
  ]);
function transformCoordinates(x,y) {
    return proj4('EPSG:3035','EPSG:4326',[+x, +y]); // Con el signo mas convertimos los valores x,y de string a numeros.
}
function filterByCountries(rows) {
    catalogCountries.map(country=>{
        let selection=rows.filter(row => row['COUNTRY'] === country);
        console.log(`Country: ${country} - Selection: ${selection.length}`);
        let cleanData = selection.map(item =>{
            let coords= transformCoordinates(item['X'],item['Y']);
            return {
                lat: coords[1],
                lng: coords[0],
                specie: catalogSpecies.indexOf(item['SPECIES NAME'])
        }
    });
    fs.writeFileSync(`${countries}${country.toLowerCase().replace(/ /g,'')}.json`,JSON.stringify(cleanData));
    console.log(`${country} generado`);
});
}
async function init(){
    const rows=await csv().fromFile(pathFile);
    filterByCountries(rows);
}

init();