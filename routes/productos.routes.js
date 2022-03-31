const {Router} = require('express');
const { check } = require('express-validator');

const { crearProducto, actualizarProducto, borrarProducto, obtenerProducto, obtenerProductos } = require('../controllers/productos.controller');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campo');

const router = Router();

router.post('/', [
    check(['nombre', 'precio', 'descripcion'], 'Nombre, Precio y Descripcion son obligatorios').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo válido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
] ,crearProducto);

router.put('/:id',[
    check('id').custom( existeProducto ),
    validarCampos
], actualizarProducto);

router.delete('/:id',[
    check('id', 'ID no válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
] , borrarProducto);

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto);

router.get('/', obtenerProductos);


module.exports = router;
