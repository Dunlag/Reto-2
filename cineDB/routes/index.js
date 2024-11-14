var express = require('express');
var router = express.Router();

var datos = require("../data/dataprovider")

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.get('/', function(req, res, next) {
  res.render('home');
});

//pagina de login

router.get('/login', function(req, res, next) {
  res.render('login');
});

//pagina de biblioteca

router.get('/biblioteca', function(req, res, next) {
  const imagenes = datos.getAllPeliculas();
  res.render("biblioteca", {imagenes:imagenes});
});

//paginas especificas de cada pelicula

router.get('/biblioteca/:id', function(req,res){
  const pelicula = datos.getPelicula(req.params.id);
  //res.send(plato);
  res.render('pelicula',{pelicula:pelicula});
});

module.exports = router;
