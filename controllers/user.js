//desestructura y extrae response para darle las funciones 
//de response a "res", ex.status,jason, etc.
const { response } = require('express');
//importa modelo de usuario, se usa Usuario con U mayusta
//por que permite formar instancias del modelo user.
//se considera una nomenclatura standar
const Usuario = require('../models/user');
//requiere paquete para encriptar
const bcryptjs = require('bcryptjs');



const userGet = ((req = request, res = response) => {

    //extrae los parametros de los query params enviado en la url
    //y los que no trae, asignara valor por defecto, ej. si paGO NO TIENE
    //VALOR, ENTONCES LE ASIGNA valor 1
    const {q, nombre = 'no name', apikey, page = 1, limit = 20} = req.query;
    //se agrega status y el codigo que debe retornar
    //ya sea codigo de correcto o de error
    //los codigos 5XX son problemas del backend
    //los 4xx del frontend
    res.status(200).json({
        ok: true,
        msg: 'get API - Controllers',
        q,
        nombre,
        apikey,
        page,
        limit
    });
});

const userPut = ((req, res = response) => {
    
    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'put API - Controllers',
        id
    });
});

const userPost = async (req, res = response) => {
  
    
    //capturo contenido del body que parsie en server.js 
    //const body = req.body;  
    //const { nombre , edad, id } = req.body; 
    const { nombre, correo, password, rol, estado, img } = req.body;
    //crea instancia del uisuario
    const usuario = new Usuario({ nombre, correo, password, rol, estado, img });
    //Guarda la instancia en la BD, osea guarda el registro
    //en la BD mongoAtlas

    
    //*********validar si el correo ya existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
        return res.status(400).json({
            msg:'Ese correo ya esta registrado'
        });
    }

    //********encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //********guardar en base de datos */
    
    await usuario.save();


    res.json({
        ok: true,
        msg: 'post API - Controllers',
        //body
        usuario
    });
};

const userDelete = ((req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - Controllers'
    });
});


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}
