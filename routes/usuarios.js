const { Router } = require('express');

const { usuariosGet, usuariosPost} = require('../controllers/usuarios');


const router = Router();


router.get('/',  usuariosGet );


router.post('/',  usuariosPost );

router.put('/', function (req, res) {
    res.status(202).json({
        msg: 'post API'
  });
  
});


router.delete('/', function (req, res) {
    res.json({
        msg: 'delete API'
  });
});

module.exports =router;