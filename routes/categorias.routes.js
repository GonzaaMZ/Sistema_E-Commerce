const {Router} = require('express');
const { check } = require('express-validator');

const { crearCategoria, actualizarCategoria, borrarCategoria, obtenerCategoria, obtenerCategorias } = require('../controllers/categorias.controller');
const { validarCampos } = require('../middlewares/validar-campo');
const { existeCategoria } = require('../helpers/db-validators');


const router = Router();

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id',[
    check('nombre', 'El nombre de la categoria es necesario').not().isEmpty(),
    check('id', 'ID no válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria);

router.delete('/:id',[
    check('id', 'ID no válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria);

router.get('/:id',[
    check('id', 'ID no válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria);

router.get('/', obtenerCategorias);



module.exports = router;