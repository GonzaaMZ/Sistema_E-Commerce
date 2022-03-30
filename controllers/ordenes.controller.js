const { response } = require("express");
const { sumarMonto } = require("../helpers/sumar-monto");
const Carro = require("../models/carro");
const Orden = require("../models/orden");




const generarOrden = async (req, res = response) => {

    const {id, ...data} = req.body;

    try {
        const carro = await Carro.findOne({idUsuario: id});
        
            direccion = {
                calle: data.calle,
                cp: data.cp,
                ciudad: data.ciudad,
                pais: data.pais
            }
        
            const monto = await sumarMonto(id);
        
            const orden = new Orden({
                idUsuario: id,
                carro,
                direccion,
                monto,
            });

            await orden.save();

            return res.status(200).json({
                msg: 'Orden generada... continue con el proceso de pago',
                orden
            });
        
    } catch (error) {
        console.log(error)
    }
}

const eliminarOrden = async (req, res = response) => {

    const {id} = req.params

    const orden = await Orden.findOneAndDelete({idUsuario: id}).populate({path: 'carro'});

    if(!orden){
        return res.status(400).json({
            msg: 'Orden no encontrada'
        })
    }

    return res.json({
        msg: 'Orden eliminada',
        orden
    })

}

const obtenerOrden = async (req, res = response) => {

    const {id} = req.params;

    const orden = await Orden.findOne({idUsuario: id});

    if(!orden){
        return res.status(400).json({
            msg: 'Orden no encontrada'
        })
    }
    return res.json(orden)
}

const obtenerOrdenes = async (req, res = response) => {

    const ordenes = await Orden.find();

    return res.json(ordenes);

}



module.exports = {
    generarOrden,
    eliminarOrden,
    obtenerOrden,
    obtenerOrdenes
}