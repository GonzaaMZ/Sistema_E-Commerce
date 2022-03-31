// SDK de Mercado Pago
const { response } = require("express");
const mercadopago = require("mercadopago");
const Carro = require("../models/carro");

const Orden = require("../models/orden");
const Producto = require("../models/producto");


// Agrega credenciales
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MP,
  });

  const crearPreferencia = async (req, res = response) => {

    const {id} = req.params;

    const orden = await Orden.findOne({idUsuario: id}).lean();
    
    //Extraigo la info que se necesita del la orden
    let {
        carro: idCarro,
        direccion,
        monto
    } = orden;
    
    //Busco el carro de la orden generada
    const carro = await Carro.findById(idCarro);

    productosMap = carro.productos.map(p => {
        return p.producto
    });

    //Busco la informacion de los productos del carro
    const productosDB = await Producto.find({'_id': {'$in': productosMap}})

    let productos = [];

    for (let i = 0; i < productosDB.length; i++) {
         productos.push({
            title: productosDB[i].nombre,
            unit_price: productosDB[i].precio,
            picture_url: productosDB[i].img,
            description: productosDB[i].descripcion,
            quantity: carro.productos[i].cantidad
        })
    }
    console.log(productos);

  

    const address = {
            street_name: direccion.calle,
            zip_code: direccion.cp.toString()
    }

    console.log(address);

    let preference = {
        items: productos,

       payer: {
           address: address
        },
    }

    mercadopago.preferences
    .create(preference)
    .then(response => {
        res.json({
            id: response.body.id,
        })
    })
    .catch(error => {
        console.log(error)
    })

  }

  module.exports = {
      crearPreferencia
  }
