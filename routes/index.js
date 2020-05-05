const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
module.exports = function() {
    //Rutas Para Clientes
    router.post('/clientes', clientesController.nuevoCliente);
    router.get('/clientes', clientesController.mostrarClientes);
    router.get('/clientes/:id', clientesController.mostrarCliente);
    router.put('/clientes/:id', clientesController.actualizarCliente);
    router.delete('/clientes/:id', clientesController.eliminarCliente);
    //Rutas Para Productos
    router.post('/productos', 
    productosController.subirArchivo,
    productosController.nuevoProducto);
    router.get('/productos', productosController.mostrarProductos);
    router.get('/productos/:id', productosController.mostrarProducto);
    router.put('/productos/:id',
    productosController.subirArchivo,
    productosController.actualizarProducto);
    router.delete('/productos/:id', productosController.eliminarProducto);
    router.post('/productos/busqueda/:query', productosController.buscarProducto);
    //Rutas Para Pedidos
    router.post('/pedidos/nuevo/:id', pedidosController.nuevoPedido);
    router.get('/pedidos', pedidosController.mostrarPedidos);
    router.get('/pedidos/:id', pedidosController.mostrarPedido);
    router.put('/pedidos/:id', pedidosController.actualizarPedido);
    router.delete('/pedidos/:id', pedidosController.eliminarPedido);
    return router;
}