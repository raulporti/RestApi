const Pedidos = require('../models/Pedidos');

//Ingresar Nuevo Pedido
exports.nuevoPedido = async(req, res, next)=>{
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje: 'Se Ha Ingresado El Pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar Todos Los Pedidos
exports.mostrarPedidos = async(req, res, next)=>{
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar Pedido Por id
exports.mostrarPedido = async(req, res, next)=>{
    const pedido = await Pedidos.findOne({_id: req.params.id}).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'productos'
    });
    if(!pedido){
        res.json({mensaje: 'El Pedido No Existe'});
        next();
    }
    res.json(pedido);
}

//Actualizar Pedido
exports.actualizarPedido = async(req, res, next)=>{
    try {
        const pedido = await Pedidos.findOneAndUpdate({_id: req.params.id},
            req.body,{
                new: true
            });
            res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }        
}

//Eliminar Pedido
exports.eliminarPedido = async(req, res, next)=>{
    try {
        await Pedidos.findOneAndDelete({_id: req.params.id});
        res.json({mensaje: 'Se Ha Eliminado El Pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}