//const { model } = require("mongoose")
const { validationResult } = require('express-validator');


//middleware tiene tres parametros, required, el responce
//y finalmente hacer next
const validarCampos = ( req, res, next) =>{
//valida que validacion de correo no retorno error
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json(errors);
    }
    //si pasa las lineas anterior, entonces continues con la 
    //ejecucion, en este caso 'next()'
    next();

}

module.exports = {
    validarCampos
}