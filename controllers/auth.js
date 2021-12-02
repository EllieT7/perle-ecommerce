const { response, json } = require('express');
const { databaseService } = require('../services/databaseService');
const { googleVerify } = require('../helpers/google-verify');
const { fetch } = require('cross-fetch');
const login = async(req, res = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        // Generar el JWT
        const token = await generarJWT( usuario.id );
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}


const googleSingIn = async(req,res)=>{
    const { id_token }= req.body;
    
    try {
        const googleUser = await googleVerify( id_token );
        console.log(googleUser);
        res.json({
            msg: 'Todo de puta madre',
           id_token
        })
        let nombre = googleUser.nombre;
        let correo = googleUser.correo;
        let user = googleUser.nombre;
        let password = 123;
        let tipo_admin = 1;
        let transaccion ={ nombre: nombre, correo: correo, user:user, password: password,tipo_admin: tipo_admin};
        fetch('http://localhost:8080/dato',{
            method: 'POST',
            body: JSON.stringify(transaccion)
        }).then(x => console.log('ok'))
        .catch(e =>{
        console.log('error'+ e);
        });
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    googleSingIn
}
