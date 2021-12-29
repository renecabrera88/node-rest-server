//este archivo se llama desde app.js en seccion "routes", protegiendo las rutas
//y las funciones de cada ruta se hace en controllers

//desestructura la funcion Router de express
const { Router } = require('express');
//extrae las funciones de user.js desde controllers
const { userGet, userPut, userPost, userDelete } = require('../controllers/user');

//llamamo a la funcion Router
const router = Router();

//a continuacion a router le configuro las rutas
//se antepone el "router" antes de app, de esta manera tengo la misma ruta
//con get, put, post y delete para la misma ruta en un archivo, ya que este archivo
// se llama conla ruta '/api/usuarios'. Los otro que el callback 
//(las funciones que hacen algo) es una funcion que esta enuser.js de la carpeta controllers
//y aqui se llaman las funcionen con los nombres que se importan desde "require('../controllers/user')"

router.get('/', userGet);

//se le asigna el valor a variable id, para extraer el valor
//se hace extrae en params (rep.params.id) en user.js de controller
router.put('/:id', userPut);

router.post('/', userPost);

router.delete('/',userDelete);


module.exports = router;