const {Router} = require('express');
const { generarOrden, eliminarOrden, obtenerOrden, obtenerOrdenes } = require('../controllers/ordenes.controller');


const router = Router();

router.post("/", generarOrden);

router.delete('/:id', eliminarOrden);

router.get('/:id', obtenerOrden);

router.get('/', obtenerOrdenes);



module.exports = router;