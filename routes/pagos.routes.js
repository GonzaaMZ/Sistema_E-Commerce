const {Router} = require('express');
const { crearPreferencia } = require('../controllers/pagos.controller');

const router = Router();

router.post('/:id', crearPreferencia);





module.exports = router;