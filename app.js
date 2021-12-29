//para generar las variables de entorno, ex.PORT
require('dotenv').config();
//imoporta el archivo Server.js
const Server = require('./models/server');
//Crea una instancia de la clase Server
const server = new Server();
//Llama al metodo listen de la instancia,
//en otras palabras levanta el servidor
server.listen();
