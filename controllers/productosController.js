const Productos = require('../models/Productos');
const multer = require('multer');
const shortId = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb)=>{
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortId.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'imagen/png'){
            cb(null, true);
        }else{
            cb(new Error('Formato No Valido'))
        }
    },
}

//Pasar la configuracion y el campo 
const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo 
exports.subirArchivo = (req, res, next)=>{
    upload(req, res, function(error){
        if(error){
            res.json({mensaje: error})
        }
        return next();
    })
}
//Nuevo Producto
exports.nuevoProducto = async (req, res, next)=>{
    const producto = new Productos(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({mensaje: 'Se ha guardado el producto'})
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar todos los productos 
exports.mostrarProductos = async(req, res, next)=>{
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar Producto por id
exports.mostrarProducto = async(req, res, next)=>{
    const producto = await Productos.findById({_id: req.params.id});
    if(!producto){
        res.json({mensaje: 'No se encuentra el producto'});
        next();
    }
    res.json(producto);
}

//Actualizar Producto
exports.actualizarProducto = async(req, res, next)=>{
    try {
        const producto = await Productos.findOneAndUpdate({_id: req.params.id},
            req.body,{
            new: true
            });
            res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar Producto
exports.eliminarProducto = async (req, res, next)=>{
    try {
        const producto = await Productos.findOneAndDelete({_id: req.params.id});
        res.json({mensaje: 'Se Ha Eliminado El Producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}