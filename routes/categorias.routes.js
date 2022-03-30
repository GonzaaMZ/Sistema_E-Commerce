const {Router} = require('express');
const { crearCategoria, actualizarCategoria, borrarCategoria, obtenerCategoria, obtenerCategorias } = require('../controllers/categorias.controller');


const router = Router();

router.post('/', crearCategoria);

router.put('/:id', actualizarCategoria);

router.delete('/:id', borrarCategoria);

router.get('/:id', obtenerCategoria);

router.get('/', obtenerCategorias);



module.exports = router;