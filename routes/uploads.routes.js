
const {Router} = require('express');
const {check} = require('express-validator');


const { cargarImagen, mostrarImagen, cargarImagenCloud, mostrarImagenCloud } = require('../controllers/uploads.controller');
const {validarCampos} = require('../middlewares/validar-campo');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');

const router = Router();


router.put('/:id',[
    validarArchivoSubir,
    check('id', 'ID no válido').isMongoId(),
    validarCampos
], cargarImagenCloud);

router.get('/:id',[
    check('id', 'ID no válido').isMongoId(),
    validarCampos
], mostrarImagenCloud);


/* 
Opcion Local
*/

/*  

router.get('/:id',[
    check('id', 'ID no válido').isMongoId(),
    validarCampos
], mostrarImagen);

router.put('/:id',[
    validarArchivoSubir,
    check('id', 'ID no válido').isMongoId(),
    validarCampos
], cargarImagen);

*/

module.exports = router;
