const {Router} = require('express');

const { añadirProducto, eliminarProducto, eliminarCarro, obtenerCarro, obtenerCarros } = require('../controllers/carros.controller');


const router = Router();

router.post('/:id', añadirProducto);

router.put('/:id', eliminarProducto);

router.delete('/:id', eliminarCarro);

router.get('/:id', obtenerCarro);

router.get('/', obtenerCarros);



module.exports = router;