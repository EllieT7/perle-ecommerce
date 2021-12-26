//cliente knex
const databaseService = () => {

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

    //Leer productos.
    const leerProductosLinea = () => {
        let id_linea = 1009;
        return knex.raw(
            'SELECT p.cod_prod, p.nombre, p.src, h.precio FROM producto p, historial_producto h, linea_producto l '+
            'where h.Producto_cod_prod = p.cod_prod and p.cod_prod = l.Producto_cod_prod and '+
            'l.Linea_cod_linea = '+id_linea+' and h.flag = 1'
        )
    };
    //leer informacion de contacto
    const leerContacto = () => {
        return knex('contacto').select();
    }
    const leerCombos = () => {
        return knex('historial_combo').where('flag',1)
        .join('combo', 'combo.cod_combo', 'historial_combo.combo_cod_combo')
        .select('combo.cod_combo','combo.nombre','combo.descripcion','combo.src','historial_combo.precio','combo.visible')
        .orderBy('combo.visible','desc');
    }
    const leerLineas = () => {
        return knex('linea').select().orderBy('visible','desc');;
    }
    const leerProductos = () => {
        return knex('historial_producto').where('flag',1)
        .join('producto', 'producto.cod_prod', 'historial_producto.Producto_cod_prod')
        .select('producto.cod_prod','producto.nombre','producto.descripcion','producto.tiempo_espera','producto.src','producto.tipo_producto_cod_tipo','producto.visible', 'historial_producto.precio')
        .orderBy('producto.visible','desc');
    }
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------
    // ------------------Andre -----Carrito -> confirmacion pedido

    const table = 'Cliente';

    const crearCli = ({nombre, celular,correo,fecha_cumple,ci,direccion,Departamento_cod_dpto,metodo,envio,vcurrier}) =>{ //Deconstruyendo json
        /*knex(table).raw(
            'insert into cliente'
        )*/
     /* return*/ knex(table).insert({
            nombre : nombre,
            celular: celular,
            correo : correo,
            fecha_cumple:fecha_cumple,
            ci:ci,
            direccion:direccion,
            Departamento_cod_dpto:Departamento_cod_dpto
        })//retorna una promesa*/
        .returning("cod_cli")
        .then((id) => {
            if(metodo !=0){
                console.log('Hola'+id)
            
            var today = new Date();
            var today1 = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //Enerio es 0!
            var yyyy = today.getFullYear();

            const moment  = require('moment')

            var hora = moment().format('hh:mm:ss');
            var de = dd+5;
            var aceptado  = true;
           

            today = yyyy+'-'+mm+'-'+dd;
            today1 = yyyy+'-'+mm+'-'+de;
            
            return knex('Pedido').insert({
                fecha_pedido: today,
                fecha_aproximada_entrega:today1,
                Hora:hora,
                precio_envio:envio,
                currier:vcurrier,
                Cliente_cod_cli: id,
                Metodo_pago_cod_mp:metodo
            });
        }
    })
    
};

    const leerCli = () => {
        return knex('cliente').select();
    };
    
    const ActualizaC =({newpassword})=>{// importante poner entre {} caso contrario tomara como si fuera un objeto
        return knex(table).where('cod_admin',777).update({'password': newpassword});
    };
    
    const EliminarAdmin =({cod_admin})=>{
        return knex(table).where('cod_admin',cod_admin).del();
    };

    const EditarAdminN =({cod_admin,nombre})=>{ 
        return knex(table).where('cod_admin',cod_admin).update({'nombre': nombre});
    };
    const EditarAdminC =({cod_admin,correo})=>{ 
        return knex(table).where('cod_admin',cod_admin).update({'correo':correo});
    };
    const EditarAdminU =({cod_admin,usuario})=>{ 
        return knex(table).where('cod_admin',cod_admin).update({'usuario':usuario});
    };
    
    const leer = () =>{
        return knex(table).select();
    };

    const Contra = ()=>{
        return knex(table).select('password').where('cod_admin',777);// saca la contraseña del usuario por ahora es un solo codigo 777
    }
    const datos = ()=>{
        return knex(table,).select('nombre').where('cod_admin',777);// saca datos del admin
    }

    //--------> Administrador
    const crearAdmin = ({nombre, correo,user,password,tipo_admin}) =>{ //Deconstruyendo json
        let comprobar = correo;
        return knex('administrador').select()
        .where('correo',comprobar)
        .then(function(rows){
        if(rows.length===0){
        return knex('administrador').insert({
            nombre : nombre,
            correo: correo,
            user:user,
            password:password,
            tipo_admin:tipo_admin
        });//retorna una promesa
        }else{
            console.log('Este correo ya se encuentra registrado');
        }
        })
    };
    
    const leerAdmin = () =>{
        return knex('administrador').select('correo').where('cod_admin',1);
    };
    
    //--------------------------------------------------------------------------------------------------------------------------------------------
    //---> Mica y Nao --> producto, lineas y combos
    //Crear producto.
    const crearProducto = ({nombre, descripcion, tiempo_espera, visible, 
        src, Tipo_producto_cod_tipo, Linea_cod_linea,
        precio}) => { //Deconstruyendo json
        knex('Producto').insert({
            nombre: nombre,
            descripcion: descripcion,
            tiempo_espera: tiempo_espera,
            visible: visible,
            src: src,
            Tipo_producto_cod_tipo: Tipo_producto_cod_tipo,
        })
        .returning("cod_prod")
        .then((id) => {
            if (Linea_cod_linea.length !=0){
                let listaLineas = [];
                for(i=0;i<Linea_cod_linea.length;i++){
                    dato2 = {
                        Producto_cod_prod: id,
                        Linea_cod_linea: Linea_cod_linea[i]
                    }
                    listaLineas.push(dato2);
                }
                console.log(listaLineas);
                knex('linea_producto').insert(listaLineas)
            }
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //Enerio es 0!
            var yyyy = today.getFullYear();
            today = yyyy+'-'+mm+'-'+dd;
            return knex('historial_producto').insert({
                fecha: today,
                precio: precio,
                flag: visible,
                Producto_cod_prod: id
            });
        })
    };

    //Editar producto.
    const updateProducto = ({cod_prod, nombre, descripcion, tiempo_espera, src, 
        Tipo_producto_cod_tipo, Linea_cod_linea, precio, visible}) => { //Deconstruyendo json) =>{
        let datoUpdate;
        if(src!=""){
            datoUpdate = {
                nombre: nombre,
                descripcion: descripcion,
                tiempo_espera: tiempo_espera,
                src: src,
                Tipo_producto_cod_tipo: Tipo_producto_cod_tipo
            };
        }else{
            datoUpdate = {
                nombre: nombre,
                descripcion: descripcion,
                tiempo_espera: tiempo_espera,
                Tipo_producto_cod_tipo: Tipo_producto_cod_tipo
            }
        }
        knex('producto').where('cod_prod', cod_prod)
        .update(datoUpdate)
        .then(() => {
            if (Linea_cod_linea.length !=0){
                let listaLineas = [];
                console.log('esta es linea_cod_linea',Linea_cod_linea);
                for(i=0;i<Linea_cod_linea.length;i++){
                    dato = {
                        Producto_cod_prod: cod_prod,
                        Linea_cod_linea: Linea_cod_linea[i]
                    }
                    listaLineas.push(dato);
                }
                console.log(listaLineas);
                knex('linea_producto').where('Producto_cod_prod', cod_prod).del()
                .then(()=>{
                    knex('linea_producto').insert(listaLineas)
                })
            }
            knex('historial_producto').where('Producto_cod_prod', cod_prod)
            .update('flag', 0)
            .then(() => {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //Enerio es 0!
                var yyyy = today.getFullYear();
                today = yyyy+'-'+mm+'-'+dd;
                return knex('historial_producto').insert({
                    fecha: today,
                    precio: precio,
                    flag: visible,
                    Producto_cod_prod: cod_prod
                });
            })
        })
    }

    // const leerProductos = () => {
    //     return knex('historial_producto').where('flag',1)
    //     .join('producto', 'producto.cod_prod', 'historial_producto.Producto_cod_prod')
    //     .select('producto.cod_prod','producto.nombre','producto.descripcion','producto.tiempo_espera','producto.src','producto.tipo_producto_cod_tipo','producto.visible', 'historial_producto.precio')
    //     .orderBy('producto.visible','desc');
    // }
    //leer lineas

    //Leer tipos de productos.
    const leerTipos = () => {
        return knex('tipo_producto').select();
    };

    const crearLinea = ({nombre, descripcion, src, productos}) =>{ //Deconstruyendo json
        knex('linea').insert({
            nombre: nombre,
            descripcion: descripcion,
            src: src,
            visible:1
        })
        .returning("cod_linea")
        .then((id) => {
            let lista = [];
            for(i=0;i<productos.length;i++){
                dato = {
                    producto_cod_prod: productos[i],
                    linea_cod_linea: id
                }
                lista.push(dato);
            }
            console.log(lista);
            return knex('linea_producto').insert(lista);
        })
    };

    const crearCombo = ({nombre, descripcion, src, precio}) =>{ //Deconstruyendo json
        knex('combo').insert({
            nombre: nombre,
            descripcion: descripcion,
            src: src,
            visible: 1
        })
        .returning("cod_combo")
        .then((id) => {
            console.log(id);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy+'-'+mm+'-'+dd;
            return knex('historial_combo').insert({
                fecha: today,
                precio: precio,
                flag: 1,
                combo_cod_combo: id
            })
        });
        
    };


    //Edicion de lineas
//#yellow
    const leerLineaProducto = () => {
        return knex('linea_producto').select();   
    };
//#
    //Leer el historial de precios de los productos.
    const leerPrecios = () => {
        return knex('historial_producto').select();
    };

    //Leer las etiquetas existentes de los productos.
    const leerEtiquetas = () => {
        return knex('etiqueta').select();
    };

    const updateLinea = ({cod_linea, nombre, descripcion, src, productos }) =>{
        let datoUpdate;
        if(src != ""){
            datoUpdate = {
                nombre: nombre,
                descripcion: descripcion,
                src: src
            };
        }else{
            datoUpdate = {
                nombre: nombre,
                descripcion: descripcion
            }
        }
        knex('linea').where('cod_linea', cod_linea)
        .update(datoUpdate)
        .then(() => {
            let lista = [];
            for(i = 0 ; i < productos.length; i++){
                dato = {
                    producto_cod_prod: productos[i],
                    linea_cod_linea: cod_linea
                }
                lista.push(dato);
            }
            console.log(lista);
            knex('linea_producto').where('Linea_cod_linea', cod_linea).del()
            .then(()=>{
                return knex('linea_producto').insert(lista);
            });
            
        })
    }

    // Edicion Combos
    const getHistorialCombo = () => {
        return knex('historial_combo').select().where('flag',1);   
    };
    const updateCombo = ({cod_combo, nombre, descripcion, src, precio }) =>{
        let datoUpdate;
        if(src != ""){
            datoUpdate = {
                nombre: nombre,
                descripcion: descripcion,
                src: src
            };
        }else{
            datoUpdate = {
                nombre: nombre,
                descripcion: descripcion
            }
        }
        knex('combo').where('cod_combo', cod_combo)
        .update(datoUpdate)
        .then(() => {
            knex('historial_combo').where('Combo_cod_combo', cod_combo).update({flag: 0})
            .then(()=>{
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy+'-'+mm+'-'+dd;
                return knex('historial_combo').insert({
                    fecha: today,
                    precio, precio,
                    flag: 1,
                    Combo_cod_combo: cod_combo
                });
            });
            
        })
    }
    //Ocultar combo
    const ocultarCombo = ({cod_combo, visible}) =>{
        return knex('combo').where('cod_combo', cod_combo)
        .update({
            visible: visible
        })
    }

    //Ocultar lineas
    const ocultarLinea = ({cod_linea, visible}) =>{
        return knex('linea').where('cod_linea', cod_linea)
        .update({
            visible: visible
        })
    }

    //Ocultar producto
    const ocultarProducto = ({cod_prod, visible}) =>{
        return knex('producto').where('cod_prod', cod_prod)
        .update({
            visible: visible
        })
    }
    const eliminarLinea = ({cod_linea}) => {
        return knex('linea').where('cod_linea', cod_linea).del();
    }
    const eliminarCombo = ({cod_combo}) => {
        return knex('combo').where('cod_combo', cod_combo).del();
    }
    const eliminarProducto = ({cod_prod}) => {
        return knex('producto').where('cod_prod', cod_prod).del();
    }
    //----------------------------------------------------------------------------------------------------------------
    //--------Mica -pedidos
    //Leer pedidos nuevos, aceptado = null.
    const leerPedidosNuevos = () => {
        return knex.raw(
            'select p.nro_pedido, p.fecha_pedido, p.fecha_aproximada_entrega, p.precio_envio, '+
            'c.nombre, c.celular, '+
            'd.nombre, d.costo_envio, '+
            'mp.descripcion, '+
            'pp.cantidad, pp.precio, '+
            'pr.nombre '+
            'from pedido p, cliente c, departamento d, metodo_pago mp, pedido_producto pp, producto pr '+
            'where d.cod_dpto = c.Departamento_cod_dpto and c.cod_cli = p.Cliente_cod_cli and '+
            'p.Metodo_Pago_cod_mp = mp.cod_mp and p.aceptado =  null and p.nro_pedido = pp.Pedido_nro_pedido '+
            'and pp.Producto_cod_prod = pr.cod_prod'
        )
    };

    //Leer pedidos aceptados, aceptado = 1.
    const leerPedidosAceptados = () => {
        return knex.raw(
            'select p.nro_pedido, p.fecha_pedido, p.fecha_aproximada_entrega, p.precio_envio, '+
            'c.nombre, c.celular, '+
            'd.nombre, d.costo_envio, '+
            'mp.descripcion, '+
            'pp.cantidad, pp.precio, '+
            'pr.nombre '+
            'from pedido p, cliente c, departamento d, metodo_pago mp, pedido_producto pp, producto pr '+
            'where d.cod_dpto = c.Departamento_cod_dpto and c.cod_cli = p.Cliente_cod_cli and '+
            'p.Metodo_Pago_cod_mp = mp.cod_mp and p.aceptado = 1 and p.nro_pedido = pp.Pedido_nro_pedido '+
            'and pp.Producto_cod_prod = pr.cod_prod'
        )
    };

    //Leer pedidos rechazados, aceptado = 0.
    const leerPedidosRechazados = () => {
        return knex.raw(
            'select p.nro_pedido, p.fecha_pedido, p.fecha_aproximada_entrega, p.precio_envio, '+
            'c.nombre, c.celular, '+
            'd.nombre, d.costo_envio, '+
            'mp.descripcion, '+
            'pp.cantidad, pp.precio, '+
            'pr.nombre '+
            'from pedido p, cliente c, departamento d, metodo_pago mp, pedido_producto pp, producto pr '+
            'where d.cod_dpto = c.Departamento_cod_dpto and c.cod_cli = p.Cliente_cod_cli and '+
            'p.Metodo_Pago_cod_mp = mp.cod_mp and p.aceptado = 0 and p.nro_pedido = pp.Pedido_nro_pedido '+
            'and pp.Producto_cod_prod = pr.cod_prod'
        )
    };

    //Leer clientes.
    const leerClientes = () => {
        return knex.raw('select * from cliente')
    };

    const updatePedido = ({nro_pedido, estado}) =>{
        return knex.raw('update pedido set aceptado = '+estado+' where nro_pedido = '+nro_pedido+'')
    };
    //_--------------------------------------------------------------------------------------------
    //Funciones a utilizar.
    return {leerProductosLinea, leerLineas,
    leerCombos, leerProductos, 
    crearCli, leerCli,ActualizaC,EliminarAdmin,
    EditarAdminN,EditarAdminC,EditarAdminU,leer,
    Contra,datos,crearAdmin, leerAdmin,
    crearLinea, crearCombo, 
    leerLineaProducto, 
    updateLinea, 
    getHistorialCombo,
    updateCombo,
    ocultarCombo,
    ocultarLinea,
    eliminarLinea,
    eliminarCombo,
    leerContacto,
    leerEtiquetas,
    leerPrecios,leerTipos,
    updateProducto,
    crearProducto,
    ocultarProducto,
    eliminarProducto,
    leerPedidosNuevos, leerPedidosAceptados, leerPedidosRechazados, 
    leerClientes, updatePedido};
};




//Exportamos a toda la aplicacion.
module.exports = {
    databaseService
};