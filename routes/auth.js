const { Router } = require('express');
const { check } = require('express-validator');
const { googleSingIn } = require('../controllers/auth');
const router = Router();
router.post('/google',[
    check('id_token', 'El token es obligatorio').not().isEmpty(),
],googleSingIn );

module.exports = router;
