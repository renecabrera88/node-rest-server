const mongoose = require('mongoose');


//Funcion que conecta a la base de datos y se llama
//desde server.js
const dbConnection = async () => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true, //*no soportado por nueva version de mongoose
            //useFindAndModify: false //*no soportado por nueva version de mongoose
            
        });

        console.log('Base de datos Online');
        
    } catch (error) {
        console.log('el error es -> ' + error);
        throw new Error('Error al tratar de iniciar BD');
        
    }

}

module.exports ={
    dbConnection
}