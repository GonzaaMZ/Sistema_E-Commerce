const Carro = require("../models/carro");
const Categoria = require("../models/categoria");
const Orden = require("../models/orden");
const Producto = require("../models/producto");


//Categorias

const existeCategoria = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El ID ${id} no existe`);
    }
}

//Productos

const existeProducto = async (id) => {

    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`El ID ${id} no existe`);
    }
}


//Carros

const existeCarro = async (id) => {

    const existeCarro = await Carro.findOne({idUsuario: id})
    if(!existeCarro){
        throw new Error(`No existe carro de usuario: ${id}`)
    }

}

//Orden

const existeOrden = async (id) => {
    const existeOrden = await Orden.findOne({idUsuario: id});
    if(!existeOrden){
        throw new Error(`No existe orden de usuario: ${id}`)
        
    }  

}



module.exports = {
    existeCategoria,
    existeProducto,
    existeCarro,
    existeOrden
}