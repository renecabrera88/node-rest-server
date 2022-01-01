//este archivo se llama desde app.js en seccion "routes", protegiendo las rutas
//y las funciones de cada ruta se hace en controllers

//desestructura la funcion Router de express
const { Router } = require('express');
//extrae las funciones de user.js desde controllers
const { userGet, userPut, userPost, userDelete } = require('../controllers/user');
//requiero express validator para hacer validaciones de correo
const { check } = require('express-validator');
//exporta middleware validarCampos
const { validarCampos } = require('../middlewares/validar-campos');
//importar mi schema de roles
const Role = require('../models/role');


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

router.post('/',[
    //este array es un conjunto de middleware para validar
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El formato de correo no es valido').isEmail(),
    check('password','El correo debe tener 6 caracteres').isLength( {min: 6}),
    //check('rol','No es rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(async(rol='')=>{
        const existeRol = await Role.findOne({ rol });
        if (!existeRol) {
            throw new Error (`El rol ${rol} no esta registrado en la BD`)
        }
    }),
    //Si para le middleware para validar campos, pasa a ejecutar
    //el controlador "validarCampos".
    validarCampos
    
] ,userPost);

router.delete('/',userDelete);


module.exports = router;