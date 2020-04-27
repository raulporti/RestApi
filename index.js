const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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
//Utilizar las rutas 
app.use('/', routes());

//Utilizar el puerto 
app.listen(3000);