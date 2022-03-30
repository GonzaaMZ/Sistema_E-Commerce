const path = require('path');
const  fs = require('fs');
const { response } = require('express');
const Producto = require('../models/producto');
const { subirArchivo } = require('../helpers/subir-archivo');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);


const cargarImagen = async (req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findById(id);
    
    try {
        if(!producto){
            return res.status(400).json({
                msg: `Producto con ID ${id} no existe, por favor intente con otro`
            })
        }
    
        if (producto.img) {
            const pathImagen = path.join(__dirname, '../uploads', 'productos' ,producto.img);
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen)
            }
        }
    
        const nombre = await subirArchivo(req.files, undefined, 'productos');
    
        producto.img = nombre;
    
        await producto.save();
    
        res.json(producto);
        
    } catch (error) {
    console.log(error)        
    }
}

const cargarImagenCloud = async (req, res = response) => {

    const {id} = req.params;

    let producto = await Producto.findById(id);

    try {
        if(!producto){
            return res.status(400).json({
                msg: `Producto con ID ${id} no existe, por favor intente con otro`
            })
        }
    
        if(producto.img){
            const nombreArr = producto.img.split('/');
            const nombre = nombreArr[nombreArr.length -1];
            const [cloudinary_id] = nombre.split('.');
            cloudinary.uploader.destroy(cloudinary_id);
        }
    
        const {tempFilePath} = req.files.archivo;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        producto.img = secure_url;
    
        await producto.save();
    
       return res.json(producto);
        
    } catch (error) {
        console.log(error);
    }



}




const mostrarImagen = async (req, res = response) => {

    const {id} = req.params;

    try {
        const producto = await Producto.findById(id);
        if(!producto){
            return res.status(400).json({
                msg: `Producto con ID ${id} no existe, por favor intente con otro`
            })
        }
    
        if(producto.img){
            const pathImage = path.join(__dirname, '../uploads', 'productos', producto.img);
            if(fs.existsSync(pathImage)){
                return res.sendFile(pathImage)
            }
        }

        const pathNoImagen = path.join(__dirname, '../assets/no-image.jpg')
        return res.sendFile(pathNoImagen);

    } catch (error) {
        console.log(error);
    }

}

 const mostrarImagenCloud = async (req, res = response) => {

    const {id} = req.params;

    try {
        const producto = await Producto.findById(id);
        if(!producto){
            return res.status(400).json({
                msg: `Producto con ID ${id} no existe, por favor intente con otro`
            })
        }

        if(producto.img){
            return res.redirect(producto.img);
        }

        const pathNoImagen = path.join(__dirname, '../assets/no-image.jpg')
        return res.sendFile(pathNoImagen);




    } catch (error) {
        console.log(error);
    }


 }



module.exports = {
    cargarImagen,
    mostrarImagen,
    cargarImagenCloud,
    mostrarImagenCloud
}