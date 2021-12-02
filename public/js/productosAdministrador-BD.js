/*-------------------------------------------------------------------------------------------------------------------------*/
/*Funcion agregar nuevo producto*/
function botonAgregarProducto(){
    let nombre = document.getElementById('nombre_producto').value;
    let Tipo_producto_cod_tipo = document.getElementById('tipo_producto').value;
    let Linea_cod_linea = $('#lineas_producto').val();
    let precio = document.getElementById('precio_producto').value;
    let descripcion = document.getElementById('descripcion_producto').value;
    let tiempo_espera = document.getElementById('tiempo_producto').value;
    let src = document.getElementById('input-imagen-producto').value;
    src = src.substring(12,src.length);
    let campos = [nombre, precio, descripcion, src];
    if (validar(campos)){
        let transaccion = {nombre: nombre, descripcion: descripcion, tiempo_espera: tiempo_espera, 
            visible: 1, src: src, Tipo_producto_cod_tipo: Tipo_producto_cod_tipo, Linea_cod_linea: Linea_cod_linea,
            precio: precio
        };
        let transaccionJSON = JSON.stringify(transaccion);
        console.log(transaccionJSON);
        document.getElementById('formulario_mensaje-confirmacion').classList.add('formulario__mensaje-confirmacion-activo');
        setTimeout(() => {
            document.getElementById('formulario_mensaje-confirmacion').classList.remove('formulario__mensaje-confirmacion-activo');
        }, 4000);
        limpiarformulario();
        fetch("http://localhost:8080/Administrador/productos/agregar", {
            method: 'Post',
            body: transaccionJSON
        }).then(x => console.log('ok'))
            .catch(e=> {
            console.log(e);
        });
    } else {
        document.getElementById('formulario_mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario_mensaje').classList.remove('formulario__mensaje-activo');
        }, 4000);
    }
}

/*-------------------------------------------------------------------------------------------------------------------------*/
/*Funcion editar producto existente*/
function botonEditarProducto(cod_prod){
    cod_prod = cod_prod.substring(19, cod_prod.length);
    console.log(cod_prod);
    let nombre = document.getElementById('nombre_producto-editar').value;
    let Tipo_producto_cod_tipo = document.getElementById('tipo_producto-editar').value;
    let Linea_cod_linea = $('#lineas_producto-editar').val();
    let precio = document.getElementById('precio_producto-editar').value;
    let descripcion = document.getElementById('descripcion_producto-editar').value;
    let tiempo_espera = document.getElementById('tiempo_producto-editar').value;
    let src = document.getElementById('input-imagen-producto-editar').value;
    src = src.substring(12,src.length);
    let campos = [nombre, precio, descripcion];
    if (validar(campos)){
        let transaccion = {cod_prod: cod_prod, nombre: nombre, descripcion: descripcion, tiempo_espera: tiempo_espera, 
            src: src, Tipo_producto_cod_tipo: Tipo_producto_cod_tipo, Linea_cod_linea: Linea_cod_linea,
            precio: precio, visible: 1
        };
        let transaccionJSON = JSON.stringify(transaccion);
        console.log(transaccionJSON);
        document.getElementById('formulario_mensaje-confirmacion-editar').classList.add('formulario__mensaje-confirmacion-activo');
        setTimeout(() => {
            document.getElementById('formulario_mensaje-confirmacion-editar').classList.remove('formulario__mensaje-confirmacion-activo');
        }, 4000);
        fetch("http://localhost:8080/Administrador/productos/editar-producto", {
            method: 'Post',
            body: transaccionJSON
        }).then(x => console.log('ok'))
            .catch(e=> {
            console.log(e);
        });
    } else {
        document.getElementById('formulario_mensaje-editar').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario_mensaje-editar').classList.remove('formulario__mensaje-activo');
        }, 4000);
    }
}

/*-------------------------------------------------------------------------------------------------------------------------*/
/*Validar que el campo no este vacío*/
function validar (campo){
    let flag = true;
    for (i=0; i<campo.length; i++){
        if (campo[i] == ""){
            flag = false;
            break;
        }
    }
    return flag;
};

/*-------------------------------------------------------------------------------------------------------------------------*/
/*Vaciar los datos del formulario*/
function limpiarformulario(){
    document.getElementById('nombre_producto').value="";
    document.getElementById('tipo_producto').value=1;
    document.getElementById('precio_producto').value="";
    document.getElementById('descripcion_producto').value="";
}

//Ocultar Producto
function ocultarProducto(clase_idProd){
    let idProd = clase_idProd.substring(20, clase_idProd.length);
    let cardIMG = document.getElementById('img-prod-'+idProd);
    let card = document.getElementById('card-prod-'+idProd);
    card.style.backgroundColor = "#ACACAC";
    cardIMG.style.filter = "grayscale(100%)";
    fetch('http://localhost:8080/Administrador/productos/ocultar-producto', {
        method: 'Post',
        body: JSON.stringify({cod_prod: idProd, visible:0})
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });
    location.reload();
}
//Eliminar producto
function botonEliminarProducto(clase_idProd){
    let idProd = clase_idProd.substring(21, clase_idProd.length);
    fetch('http://localhost:8080/Administrador/productos/eliminar-producto', {
        method: 'Post',
        body: JSON.stringify({cod_prod: idProd})
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });

    location.reload();
    // alert('Se eliminó correctamente');
}