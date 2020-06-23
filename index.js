const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
//Cors Permite que un cliente se conecta a otro servidor para el intercambio de recursos
//Conectar Mongo
const uri = 'mongodb+srv://m001-student:prueba@sandbox-li4ev.mongodb.net/restpais?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://m001-student:prueba@sandbox-li4ev.mongodb.net/restpais?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
/*MongoClient.connect(uri, function(err, client) {
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    console.log('Connected...');
    // perform actions on the collection object
});*/
//Iniciar el servidor Express
const app = express();
//Habilitar body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Habilitar Cors
app.use(cors());
//Utilizar las rutas 
app.use('/', routes());

//Carpeta Publica
app.use(express.static('uploads'));
//Utilizar el puerto 
app.listen(process.env.PORT);