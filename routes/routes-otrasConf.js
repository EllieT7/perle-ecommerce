module.exports = function(app, databaseService){
    


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
    app.get('/datos', (request, response) =>{//sacas datos del admin
        databaseService.datos()
            .then(resultado=>{
                response.json(resultado);
                console.log(resultado);
                
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.get('/instagram', (request, response) =>{//sacas datos insta
        databaseService.insta()
            .then(resultado=>{
                response.json(resultado);
                console.log(resultado);
                
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.get('/whap', (request, response) =>{//sacas datos del whap
        databaseService.whap()
            .then(resultado=>{
                response.json(resultado);
                console.log(resultado);
                
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.get('/facebook', (request, response) =>{//sacas datos del facebook
        databaseService.facebook()
            .then(resultado=>{
                response.json(resultado);
                console.log(resultado);
                
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.get('/tel', (request, response) =>{//sacas datos del tel
        databaseService.tel()
            .then(resultado=>{
                response.json(resultado);
                console.log(resultado);
                
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.get('/email', (request, response) =>{//sacas datos del email
        databaseService.email()
            .then(resultado=>{
                response.json(resultado);
                console.log(resultado);
                
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.get('/LPP', (request, response) =>{//sacas datos del email
        databaseService.LPP()
            .then(resultado=>{
                response.json(resultado);
                console.log(resultado);
                
            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    
    app.get('/departamento', (request, response) =>{//sacas datos del admin
        databaseService.departamento()
            .then(resultado=>{
                response.json(resultado);
                console.log(resultado);
                
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
    });
    //para sacar la contraseña del usuario y compararla con la que ingresa
    app.get('/contra',(request, response) =>{ 
        databaseService.Contra()
        .then(resultado =>{
            response.json(resultado);
            console.log(resultado);
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    });
    app.get('/Administrador',(request, response) =>{ 
        databaseService.Admin()
        .then(resultado =>{
            
            
        }).catch(e=> {
            response.status(500).json(e)
            console.log(e);
        });
    });
    //actualiza datos
    app.post('/ActualizaC', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.ActualizaC(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.post('/UsuarioA', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.EditarAdminU(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.post('/UsuarioC', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.EditarAdminC(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.post('/UsuarioN', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.EditarAdminN(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    //Actualiza datos de contacto
    app.post('/InstagramA', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.EditarIns(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.post('/whapA', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.EditarWhap(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.post('/faceA', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.EditarFace(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.post('/telA', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.EditarTel(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    app.post('/emailA', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.EditarEmail(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });
    
    //actualiza preicio
    app.post('/precioA', (request, response) =>{
        const dato = request.body; //request.body -> la info que viene 
        console.log(dato);
        console.log('paso');
        databaseService.EditarPrecio(dato)
            .then(()=>{
                response.json({"mensaje":"dato ingresado!"});
                console.log('dato ingresado!');

            }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
            });
            
    });

    app.post('/Eliminar',(request, response) =>{
        const dato = request.body; //request.body-> la info que viene 
        console.log(dato);
        databaseService.EliminarAdmin(dato)
            .then(()=>{
                 response.json({"mensaje":"Admin eliminado!"});
                 console.log('Eliminado!');
             }).catch(e =>{
                response.status(500).json(e);
                console.log(e);
             });

        
    });
    app.post('/Editar',(request, response) =>{
        const dato = request.body; //request.body-> la info que viene 
        console.log(dato);
        databaseService.EditarAdmin(dato)
        .then(()=>{
            response.json({"mensaje":"Admin Editado!"});
            console.log('Editado!');
        }).catch(e =>{
            response.status(500).json(e);
            console.log(e);
        });

        
    });

    
};