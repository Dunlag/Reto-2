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

router.post('/login', function(req, res) {
  const usuario = req.body.usuario;
  const password = req.body.password;

  let user = datos.validateUser(usuario, password);

  if (user) {
      console.log("Login exitoso:", user);
      req.session.login = true;
      req.session.user = user;
      res.redirect("/biblioteca");
  } else {
      console.log("Login fallido");
      res.redirect("/login");
  }
});


router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect("/");
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
