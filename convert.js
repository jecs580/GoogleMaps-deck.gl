const csv = require('csvtojson');
const fs = require('fs');
const pathFile = './euforestspecies.csv';
const catalogs='./catalogs/';

async function init(){
    const rows=await csv().fromFile(pathFile);
    build({rows,key:'COUNTRY',filename:'countries'});   
    build({rows,key:'SPECIES NAME',filename:'species'});
}

function build({
    rows,key,filename,
}) {
    let full_collection = rows.map((item)=>item[key]);
    let collection=[... new Set(full_collection)];
    fs.writeFileSync(`${catalogs}${filename}.json`, JSON.stringify(collection));
}
init();