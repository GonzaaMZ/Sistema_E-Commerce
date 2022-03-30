const { response } = require("express");
const Categoria = require("../models/categoria");


const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    try {
        const existeCategoria = await Categoria.findOne({nombre});

        if (existeCategoria){
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe`
            });
        }

        const categoria = new Categoria({nombre});
        await categoria.save();

        return res.status(200).json(categoria);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const actualizarCategoria = async (req, res = response) => {

    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const categoria = await Categoria.findByIdAndUpdate(id, {nombre}, {new : true});

    res.json(categoria);

}

const borrarCategoria = async (req, res = response) => {

    const {id} = req.params;

    const categoria = await Categoria.findByIdAndDelete(id, {new : true});

    res.json({
        msg: 'Categoria ha sido eliminada',
        categoria
    });
}

const obtenerCategoria = async (req, res = response) => {

    const {id} = req.params;

    const categoria = await Categoria.findById(id);

    res.json(categoria);

}

const obtenerCategorias = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find()
        .skip(desde)
        .limit(limite)
    ])

    res.json({
        total,
        categorias
    })

}




module.exports = {
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
    obtenerCategoria,
    obtenerCategorias
}