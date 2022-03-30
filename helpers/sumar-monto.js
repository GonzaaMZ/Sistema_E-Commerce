const Producto = require("../models/producto");
const Carro = require("../models/carro");


exports.sumarMonto = async (id) => {

    const carro = await Carro.findOne({idUsuario: id}).select('productos');

    //obtengo los id de los productos
    const productosArr = carro.productos.map(producto => {
        return producto.producto
    })

    //Realizo la busquedo en la coleccion de productos con los IDs
    const products = await Producto.find({_id : {$in: productosArr}});

    //Obtengo la cantidad de productos en el carro
    const cantidad = carro.productos.map(c => {
        return c.cantidad;
    })

    //Obtengo el precio de esos productos
    const precios = products.map(precio => {
        return precio.precio
    });


    let total = 0;

    for (let i = 0; i < cantidad.length; i++) {

        total += cantidad[i] * precios[i];
        
    }

    return total;


}
