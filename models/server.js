const express = require('express')
const cors = require('cors')

//hago un clase servidor 
class Server {

    constructor(){
        //este cnstructor es la aplicacion 
        //como una propiedad del servidor
        this.app  = express();
        this.port = process.env.PORT;
        //con esta linea se ve inmediatamente los path de susuarios
        this.usuarioPath = '/api/usuarios';

        //middlewares-> funciones que siempre se ejecutan cuando
        //se levanta el servidor
        this.middlewares();

        
        //Rutas de la aplicacion-> cuando ser llame el constructor tb se llama
        //a las rutas
        this.routes();

    }

    middlewares(){
        //Directorio publico
        this.app.use(express.static('public'));

        //este middleware puede restringir el acceso desde ciertas 
        //direcciones. Usarlo siempre, para configurar leer documentacion.
        this.app.use(cors());

        //parseo y lectura del body de la peticion post
        //para extraer el body, hacer req.body en archivo user de controllers
        this.app.use( express.json() );
    }

    //metodo que configura las rutas, requeridas de '../routes/user'  
    routes(){
        this.app.use(this.usuarioPath, require('../routes/user'));

    }

    //en este metodo escucho en el puerto del constructor
    //que tiene la variable de entorno
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}

//exporta la clase Server
module.exports = Server;
