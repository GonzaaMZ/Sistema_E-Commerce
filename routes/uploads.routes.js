
const {Router} = require('express');

const { cargarImagen, mostrarImagen, cargarImagenCloud, mostrarImagenCloud } = require('../controllers/uploads.controller');

const router = Router();


router.get('/:id', mostrarImagenCloud);

router.put('/:id', cargarImagenCloud);





/* 
Opcion Local
*/

//router.get('/:id', mostrarImagen);

//router.put('/:id', cargarImagen);



module.exports = router;
