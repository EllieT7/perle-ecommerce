const { default: knex } = require('knex');

module.exports = function(app, databaseService){
    const express = require('express');
    //middleware
    app.use(express.json({
        type : '*/*'
        })
    );

    //conexion BD
    const knex = require('knex')({
        client : 'mssql',
        connection:{
            server : process.env.DB_HOST,
            user: process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB,
            port: 1433
        }
    });


    app.get('/',(req,res)=>{
        res.render('inicio.hbs');   //Devuelvo inicio.hbs como respuesta
    })
    app.get('/Login',(req,res)=>{
        res.render('index.hbs');   //Devuelvo inicio.hbs como respuesta
    })

    //:nombre para que el parametro sea dinámico
    app.get('/lineas/:nombre', async (req,res) =>{
        const {nombre} = req.params;                                        //Obtengo el nombre de la ruta
        let posicion = nombre.indexOf("-id=");                              //Determino la posicion en la que se encuentra este string
        let id_linea = nombre.substring(posicion+4,nombre.length);          //Modifico el string para obtener solo el cod_linea
        let aux = nombre.substr(posicion);                                  //obtengo '-id=...'
        let nombreFiltrado = nombre.substring(0,nombre.length-aux.length); //Obtengo el nombre de la linea
        //Super query
        const elementos = knex.raw(
            'SELECT p.cod_prod, p.nombre, p.src, h.precio FROM producto p, historial_producto h, linea_producto l '+
            'where h.Producto_cod_prod = p.cod_prod and p.cod_prod = l.Producto_cod_prod and '+
            'l.Linea_cod_linea = '+id_linea+' and h.flag = 1'
        ); 
        elementos.then(function(data){ //Obtengo los resultados del query
            console.log(data);                                                      //Imprimo el objeto
            console.log('nombre de la linea: '+nombreFiltrado);                     //Para ver si el nombre salío bien :D
            res.render('lineas.hbs',{data, nombreFiltrado});  //Mando como respuesta lineas.hbs, y paso la informacion a la interfaz(data, nombre)
        }); 
    })
}