const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pedidosSchema = new schema ({
    cliente: {
        type: schema.ObjectId,
        ref: 'clientes'
    },
    pedido: [{
        producto: {
            type: schema.ObjectId,
            ref: 'productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('pedidos', pedidosSchema);