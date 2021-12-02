const { response } = require('express');
const usuariosGet = (req,res= response)=>{
    const {q,nombre,apikey}= req.query;

    res.json({
        msg: 'get API-controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req,res= response)=>{
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API-controlador',
        nombre,edad
    });
}

module.exports = {
    usuariosGet,
    usuariosPost
}
