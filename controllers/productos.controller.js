const { response } = require("express");

const Producto = require("../models/producto");


const crearProducto = async (req, res = response) => {

    const body = req.body;

    try {
        const existeProducto = await Producto.findOne({nombre: body.nombre});
        
        if(existeProducto){
            return res.status(400).json({
                msg: `El producto ${existeProducto.nombre} ya existe`
            })
        }

        const producto = new Producto(body);

        await producto.save();

        return res.status(201).json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

} 

const actualizarProducto = async (req, res = response) => {

    const id  = req.params.id;
    const body = req.body;

    try {
        const producto = await Producto.findByIdAndUpdate(id, body, {new: true});

        return res.status(201).json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const borrarProducto = async (req, res = response) => {

    const id = req.params.id;

    try {
        const producto = await Producto.findByIdAndDelete(id);
        return res.status(200).json(`Producto: ${producto.nombre} ha sido eliminado`)

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const obtenerProducto = async (req, res = response) => {

    const id = req.params.id;

    try {
        const producto = await Producto.findById(id)
        .populate('categoria', 'nombre');
        return res.status(200).json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const obtenerProductos = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments(),
        Producto.find()
        .skip(desde)
        .limit(limite)
        .populate('categoria', 'nombre')
    ])

    return res.status(200).json({
        total, productos
    });
}

module.exports = {
    crearProducto,
    actualizarProducto,
    borrarProducto,
    obtenerProducto,
    obtenerProductos

}