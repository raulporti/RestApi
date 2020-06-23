const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const schema = mongoose.Schema;

const productosSchema = new schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String
    },
});
module.exports = mongoose.model('productos', productosSchema);