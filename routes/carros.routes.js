const {Router} = require('express');
const {check} = require('express-validator');

const { añadirProducto, eliminarProducto, eliminarCarro, obtenerCarro, obtenerCarros } = require('../controllers/carros.controller');
const {validarCampos} = require('../middlewares/validar-campo');
const { existeCategoria, existeProducto, existeCarro } = require('../helpers/db-validators');



const router = Router();

router.post('/:id',[
    check(['idProducto', 'id'], 'El ID del producto y usuario son obligatorio').not().isEmpty(),
    check('idProducto', 'El ID no es válido').isMongoId(),
    check('idProducto').custom( existeProducto ),
    validarCampos
], añadirProducto);

router.put('/:id',[
    check(['idProducto', 'id'], 'El ID del producto y usuario son obligatorio').not().isEmpty(),
    check('idProducto', 'El ID no es válido').isMongoId(),
    validarCampos
], eliminarProducto);

router.delete('/:id',[
   // check('id', 'ID no válido').isMongoId(),
    check('id').custom( existeCarro ),
    validarCampos
], eliminarCarro);

router.get('/:id',[
    check('id').custom( existeCarro ),
], obtenerCarro);

router.get('/', obtenerCarros);



module.exports = router;