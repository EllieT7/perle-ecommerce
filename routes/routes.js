module.exports = function(app, databaseService){
    const express = require('express');
    app.use(express.json({
        type : '*/*'
        })
    );
    
    // //---------------------------------------------------------------------------------------------------------------------------------
    // ///Andre
    // //ruta para leer los productos de la linea -> get(navegador o postman)
    // app.get('/Administrador/linea-productos',(request, response) =>{
    //     databaseService.leerProductosLinea()
    //     .then(resultado =>{
    //         response.json(resultado);
    //     }).catch(e=> {
    //         response.status(500).json(e)
    //         console.log(e);
    //     });
    // });
    // app.get('/Administrador/lineas',(request, response) =>{
    //     databaseService.leerLineas()
    //     .then(resultado =>{
    //         response.json(resultado);
    //     }).catch(e=> {
    //         response.status(500).json(e)
    //         console.log(e);
    //     });
    // });
    // //ruta para leer(llenar combos) -> get(navegador o postman)
    // app.get('/Administrador/combos',(request, response) =>{
    //     databaseService.leerCombos()
    //     .then(resultado =>{
    //         response.json(resultado);
    //     }).catch(e=> {
    //         response.status(500).json(e)
    //         console.log(e);
    //     });
    // });
    // //ruta para leer(llenar modal productos) -> get(navegador o postman)
    // app.get('/Administrador/productos',(request, response) =>{
    //     databaseService.leerProductos()
    //     .then(resultado =>{
    //         response.json(resultado);
    //     }).catch(e=> {
    //         response.status(500).json(e)
    //         console.log(e);
    //     });
    // });
    // app.get('/Administrador/contacto',(request, response) =>{
    //     databaseService.leerContacto()
    //     .then(resultado =>{
    //         response.json(resultado);
    //     }).catch(e=> {
    //         response.status(500).json(e)
    //         console.log(e);
    //     });
    // });
    // app.post('/Cliente', (request, response) =>{
    //     const dato = request.body; //request.body -> la info que viene 
    //     console.log(dato);
    //     databaseService.crearCli(dato)
    //     /*    .then(()=>{
    //             response.json({"mensaje":"dato ingresado!"});
    //             console.log('dato ingresado!');
                
    //         }).catch(e =>{
    //             response.status(500).json(e);
    //             console.log(e);
    //         });*/
    // });
    
    // app.get('/Cliente', (request, response) =>{//sacas datos del admin
    //     databaseService.leerCli()
    //         .then(resultado=>{
    //             response.json(resultado);
    //             console.log(resultado);
                
    //         }).catch(e =>{
    //             response.status(500).json(e);
    //             console.log(e);
    //         });
            
    // });
    // //ruta para leer -> get(navegador o postman)
    // app.get('/ejemplo',(request, response) =>{
    //     databaseService.leer()
    //     .then(resultado =>{
    //         response.json(resultado);
    //     }).catch(e=> {
    //         response.status(500).json(e)
    //         console.log(e);
    //     });
    // });
    // //para sacar la contraseña del usuario y compararla con la que ingresa
    // app.get('/Cliente',(request, response) =>{ 
    //     databaseService.Contra()
    //     .then(resultado =>{
    //         response.json(resultado);
    //         console.log(resultado);
    //     }).catch(e=> {
    //         response.status(500).json(e)
    //         console.log(e);
    //     });
    // });
    
    // //actualiza datos
    // app.post('/ActualizaC', (request, response) =>{
    //     const dato = request.body; //request.body -> la info que viene 
    //     console.log(dato);
    //     console.log('paso');
    //     databaseService.ActualizaC(dato)
    //         .then(()=>{
    //             response.json({"mensaje":"dato ingresado!"});
    //             console.log('dato ingresado!');

    //         }).catch(e =>{
    //             response.status(500).json(e);
    //             console.log(e);
    //         });
            
    // });

    // app.post('/Eliminar',(request, response) =>{
    //     const dato = request.body; //request.body-> la info que viene 
    //     console.log(dato);
    //     databaseService.EliminarAdmin(dato)
    //         .then(()=>{
    //              response.json({"mensaje":"Admin eliminado!"});
    //              console.log('Eliminado!');
    //          }).catch(e =>{
    //             response.status(500).json(e);
    //             console.log(e);
    //          });

        
    // });
    // app.post('/Editar',(request, response) =>{
    //     const dato = request.body; //request.body-> la info que viene 
    //     console.log(dato);
    //     databaseService.EditarAdmin(dato)
    //     .then(()=>{
    //         response.json({"mensaje":"Admin Editado!"});
    //         console.log('Editado!');
    //     }).catch(e =>{
    //         response.status(500).json(e);
    //         console.log(e);
    //     }); 
    // });

    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    //----Mica y Nao --> lineas y combos, productos

    //ruta tipo post -> agregar datos
    // 2 argumentos, ruta y función
    app.post('/ejemplo', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        
        databaseService.crearDpto(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });

    //ruta para leer -> get(navegador o postman)
    app.get('/ejemplo',(request, response) =>{
        databaseService.leer()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
        // return resultado;
    });


    //ruta para leer(llenar modal productos) -> get(navegador o postman)
    app.get('/Administrador/productos',(request, response) =>{
        databaseService.leerProductos()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    });

    //ruta para leer(llenar lineas) -> get(navegador o postman)
    app.get('/Administrador/lineas',(request, response) =>{
        databaseService.leerLineas()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    });

    //ruta para leer(llenar combos) -> get(navegador o postman)
    app.get('/Administrador/combos',(request, response) =>{
        databaseService.leerCombos()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    });



    //Post agregar líneas
    app.post('/Administrador/lineas/agregar-linea',  (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.crearLinea(dato);
        console.log('linea -> dato ingresado!');
            // .then(()=>{
            //     // response.json({"mensaje":"dato ingresado!"});
            //     
            // }).catch(e =>{
            //     // response.status(500).json(e);
            //     console.log(e);
            // });
    });

    //Post agregar combos
    app.post('/Administrador/combos/agregar-combo',  (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.crearCombo(dato);
        console.log('combo -> dato ingresado!');
            // .then(()=>{
            //     // response.json({"mensaje":"dato ingresado!"});
                
            // }).catch(e =>{
            //     // response.status(500).json(e);
            //     console.log(e);
            // });
    });

    // Get editar lineas -- linea producto
    app.get('/Administrador/lineas/editar-linea', (request, response) =>{
        databaseService.leerLineaProducto()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    })
    app.post('/Administrador/lineas/editar-linea',  (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.updateLinea(dato);
        console.log('linea -> dato actualizado!');
    });

    // Get editar combos -- precio (historial_combo)
    app.get('/Administrador/lineas/editar-combo', (request, response) =>{
        databaseService.getHistorialCombo()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    })
    // post editar combos --
    app.post('/Administrador/combos/editar-combo',  (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.updateCombo(dato);
        console.log('combo -> dato actualizado!');
    });

    //post ocultar producto
    app.post('/Administrador/productos/ocultar-producto', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.ocultarProducto(dato)
            .then(()=>{
                console.log('producto '+ dato.cod_prod +' visible: '+dato.visible);
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
    })

    //post ocultar combo
    app.post('/Administrador/combos/ocultar-combo', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.ocultarCombo(dato)
            .then(()=>{
                console.log('combo '+ dato.cod_combo +' visible: '+dato.visible);
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
    })

    //post ocultar combo
    app.post('/Administrador/lineas/ocultar-linea', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.ocultarLinea(dato)
            .then(()=>{
                console.log('linea '+ dato.cod_linea +' visible: '+dato.visible);
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
    })
    //Post eliminar lineas
    app.post('/Administrador/lineas/eliminar-linea', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.eliminarLinea(dato)
            .then(()=>{
                console.log('linea '+ dato.cod_linea +' eliminada');
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
    })
    //Post eliminar combos
    app.post('/Administrador/combos/eliminar-combo', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.eliminarCombo(dato)
            .then(()=>{
                try {
                    fs.unlinkSync('E:\\Desktop\\conexionBD\\frontend\\resources\\images\\Administrador\\CRM.jpg')
                    console.log('file removed');
                } catch (error) {
                    console.error('Something wrong happened removing the file', error);
                }
                console.log('combo '+ dato.cod_combo +' eliminado');
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
    })

    //Post eliminar producto
    app.post('/Administrador/productos/eliminar-producto', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.eliminarProducto(dato)
            .then(()=>{
                console.log('producto'+ dato.cod_prod +' eliminado');
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
    })
    app.get('/Administrador/contacto',(request, response) =>{
        databaseService.leerContacto()
        .then(resultado =>{
            response.json(resultado);
            console.log(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    })
        //ruta tipo  post -> agregar datos - tabla producto
    //2 argumentos, ruta y función
    app.post('/Administrador/productos/agregar',  (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.crearProducto(dato);
        console.log('producto -> dato ingresado!');
    });

    //ruta para leer tipos de productos -> get(navegador o postman)
    app.get('/Administrador/productos/tipos',(request, response) =>{
        databaseService.leerTipos()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    });

    //ruta para leer el historial de precios de productos -> get(navegador o postman)
    app.get('/Administrador/productos/historialPrecios',(request, response) =>{
        databaseService.leerPrecios()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    });

    //ruta para leer las lineas de productos -> get(navegador o postman)
    app.get('/Administrador/productos/linea-producto',(request, response) =>{
        databaseService.leerLineaProducto()
        .then(resultado =>{
            response.json(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    });

    //ruta editar productos -> get(navegador o postman)
    app.post('/Administrador/productos/editar-producto',  (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        databaseService.updateProducto(dato);
        console.log('producto -> dato actualizado!');
    });
    //-----------------------------------------------------------------------------------------------------------------------------------------
};