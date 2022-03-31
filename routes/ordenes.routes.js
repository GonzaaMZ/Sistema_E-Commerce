const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo');
const { existeCategoria, existeProducto, existeCarro, existeOrden } = require('../helpers/db-validators');

const { generarOrden, eliminarOrden, obtenerOrden, obtenerOrdenes } = require('../controllers/ordenes.controller');


const router = Router();

router.post("/",[
    check(['id', 'calle', 'cp', 'ciudad', 'pais'], 'ID, Calle, CP, Ciudad, Pais son obligatorios').not().isEmpty(),
    check('id').custom( existeCarro ),
    validarCampos
], generarOrden);

router.delete('/:id',[
    check('id').custom( existeOrden ),
    validarCampos
], eliminarOrden);

router.get('/:id',[
    check('id').custom( existeOrden ),
    validarCampos
], obtenerOrden);

router.get('/', obtenerOrdenes);



module.exports = router;