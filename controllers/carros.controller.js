const { response } = require("express");

const Carro = require("../models/carro");
const Producto = require("../models/producto");

const añadirProducto = async (req, res = response) => {

  const {id} = req.params;
  const {idProducto, cantidad} = req.body;

  let carro = await Carro.findOne({idUsuario: id}).populate('productos', 'nombre');

  const producto = await Producto.findById(idProducto)


  let productoFind;
 if (carro) {productoFind =  carro.productos.find((item) => item.producto == idProducto)} 

  try {

    if (!carro){ //Si no existe ninguno, se crea un carro 
      const carro = new Carro({
        idUsuario: id,
        productos: {
            producto: producto,
            cantidad: cantidad
          }
       });
       await carro.save();
       return res.json(carro);
    }
    else if(carro && !productoFind){ //Con el carro ya existente, se acumulan diferentes productos 
      carro = await Carro.findOneAndUpdate({idUsuario: id}, {
        $addToSet: 
                    {
                      productos: {
                        producto: producto, 
                        cantidad: cantidad
                    }
                    },
    }, {new : true}).exec();
    return res.json(carro);
    } 
    else if (carro && productoFind){ //Se actualiza la cantidad, si se modificó 
      
      const indexPro = carro.productos.indexOf(productoFind);

      const productos = {
        producto: producto,
        cantidad: cantidad
      }

      carro.productos[indexPro] = productos;
     
      await carro.save();

      return res.json(carro);
    }

  } catch (error) {
    console.log(error);
  }

}

const eliminarProducto = async (req, res = response) => {

  const {id} = req.params;
  const {idProducto} = req.body;

  try {
    let carro = await Carro.findOne({idUsuario: id});
  
    let productoFind;
    if (carro) {productoFind =  carro.productos.find((item) => item.producto == idProducto)} 
  
    console.log(productoFind);
  
    if(carro){
      const index = carro.productos.indexOf(productoFind);
    
      if(index != -1 ){
       carro.productos.splice(index, 1);
       await carro.save();
       return res.status(200).json(carro);
     }
     return res.status(400).json({
       msg: "No se elimino ningun producto - producto no válido",
       carro
     })
    }
    
  } catch (error) {
    console.log(error);
  }
}

const eliminarCarro = async (req, res = response) => {

  const {id} = req.params;

  try {
    const carro = await Carro.findOneAndDelete({idUsuario: id}, {new: true});
  
    if(!carro){
    return res.status(400).json({
      msg: 'Carro no existe, ingrese otro id de usuario'
    })
  }
    
  return res.status(200).json({
      msg: `Carro de usuario ${id}, eliminado con éxito`,
      carro
    })
    
  } catch (error) {
    console.log(error)
  }

}

const obtenerCarro = async (req, res = response) => {

  const {id} = req.params;

  try {
    const carro = await Carro.findOne({idUsuario: id});
    if (!carro) {
      return res.status(400).json({msg: "Carro no existe - ingrese otro id de usuario"});
    }

    return res.status(200).json(carro);

  } catch (error) {
    console.log(error)
  }


}

const obtenerCarros = async (req, res = response) => {

  const carros = await Carro.find();

  return res.json(carros);

}


module.exports = {
  añadirProducto,
  eliminarProducto,
  eliminarCarro,
  obtenerCarro,
  obtenerCarros
};