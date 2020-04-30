const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//Cors Permite que un cliente se conecta a otro servidor para el intercambio de recursos
//Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
});
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
app.listen(5000);