const Clientes = require('../models/Clientes');

//Agregar un nuevo cliente
exports.nuevoCliente = async(req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        //Almacenar el registro
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {
        //Si hay error, mostrar error
        res.send(error);
        next();
    }
}

//Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) =>{
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        res.send(error);
        next();
    }
}

//Muestra un cliente por id 
exports.mostrarCliente = async(req, res, next)=>{
    const cliente = await Clientes.findById(req.params.id);
    if(!cliente){
        res.json({mensaje: 'Ese cliente no existe'});
        next();
    }
    res.json(cliente);

}

//Actualiza un cliente por id 
exports.actualizarCliente = async(req, res, next) => {
try {
    const cliente = await Clientes.findOneAndUpdate({_id: req.params.id}, 
        req.body, {
        new: true
    });
    res.json(cliente);
} catch (error) {
    res.send(error);
    next();
}
}

//Eliminar cliente por su id
exports.eliminarCliente = async(req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id : req.params.id});
        res.json({mensaje: 'El cliente se ha eliminado'});
    } catch (error) {
        res.send(error);
        next();
    }
}