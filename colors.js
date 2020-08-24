const scraper = require('images-scraper');
const species=require('./catalogs/species.json');
const download=require('image-downloader');
const merge =require('merge-img');
const colorthief = require('colorthief');
let LIMIT=1;

const google= new scraper({
    puppeteer:{
        headless:true
    }
})
async function seachAnalize(specie,query){
    const images = await google.scrape(query,3);
    console.log(images);
    // Promise.all()  devuelve una promesa que termina correctamente cuando todas las promesas en el argumento iterable
    const downloads = await Promise.all(images.map(async image => {
        let date= new Date();
        let filename=date.getTime();
        let options={
            url:image['url'],
            dest:`./images/${filename}.jpg`,
        };
        return await download.image(options)
    }));
    let img = await merge(downloads.map(download  =>download.filename));
    let path=`./collage/${specie}.png`;
    img.write(path , async ()=>{
        color = await colorthief.getColor(path);
        console.log(color);
    });
}
function init() {
    for (let index = 0; index < LIMIT; index++) {
        seachAnalize(species[index],`"${species[index]}" filetype:jpg -blue -white imagesize:medium`);  // Declaramos nuestra consulta de como buscara las imagenes de tipo jpg, ignorando las de color azul y blanco, de un tamaño mediano
    }
}

init();