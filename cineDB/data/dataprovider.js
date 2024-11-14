var peliculas = require("./peliculas.json");
var usuarios = require("./usuarios.json");

function getAllPeliculas() {
    return peliculas;
}

function getPelicula(id) {
    const item = peliculas.filter((a) => a.id == id);
    return item[0];
}

function validateUser(usuario, password) {
    const u = usuarios.filter((u) => u.usuario === usuario && u.password === password);
    console.log("Usuario encontrado:", u);
    return u.length > 0 ? u[0] : null;
}


module.exports = {
    getAllPeliculas,
    getPelicula,
    validateUser
};
