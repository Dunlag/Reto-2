var express = require('express');
var router = express.Router();
var datos = require("../data/dataprovider");

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.session.login) {
        return next();  // Si está autenticado, sigue con la solicitud
    }
    res.redirect('/login');  // Si no está autenticado, redirige al login
}

// Página de inicio
router.get('/', function(req, res, next) {
  res.render('home');
});

// Página de login
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res) {
  const usuario = req.body.usuario;
  const password = req.body.password;

  let user = datos.validateUser(usuario, password);

  if (user) {
      req.session.login = true;
      req.session.user = user;
      res.redirect("/biblioteca");  // Redirige a la página de administración
  } else {
      res.redirect("/login");  // Redirige de nuevo a login en caso de error
  }
});

// Cerrar sesión
router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect("/");
});

// Página de biblioteca protegida
router.get('/biblioteca', isAuthenticated, function(req, res, next) {
  const imagenes = datos.getAllPeliculas();
  res.render("biblioteca", {imagenes:imagenes});
});

// Página de detalle de película protegida
router.get('/biblioteca/:id', isAuthenticated, function(req,res){
  const pelicula = datos.getPelicula(req.params.id);
  res.render('pelicula',{pelicula:pelicula});
});

module.exports = router;
