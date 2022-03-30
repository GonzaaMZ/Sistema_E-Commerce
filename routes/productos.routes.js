const {Router} = require('express');

const { crearProducto, actualizarProducto, borrarProducto, obtenerProducto, obtenerProductos } = require('../controllers/productos.controller');

const router = Router();

router.post('/', crearProducto);

router.put('/:id', actualizarProducto);

router.delete('/:id', borrarProducto);

router.get('/:id', obtenerProducto);

router.get('/', obtenerProductos);


module.exports = router;
