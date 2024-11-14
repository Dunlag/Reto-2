var peliculas = require("./peliculas.json");

function getAllPeliculas(){
    return peliculas;
}

function getPelicula(id){
    const item = peliculas.filter( (a) => { return(a.id==id)} );
    return item[0];
}

module.exports = {
    getAllPeliculas,
    getPelicula
}