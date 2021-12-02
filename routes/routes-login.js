module.exports = function(app){
    const { databaseService } = require('../services/databaseService');
    const dbService = databaseService();
    const express = require('express');
    app.use(express.json({
            type : '*/*'
            })
    );
    app.post('/dato',  (req, res) =>{
        console.log(req.body);
        let dato = req.body;
        dbService.crearAdmin(dato)
            .then(()=>{
                res.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');
            }).catch(e =>{
                res.status(500).json(e);
                console.log(e);
            });
    });
    app.get('/dato',(request, response) =>{
        dbService.leerAdmin()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    });
}

