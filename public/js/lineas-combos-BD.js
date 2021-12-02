function botonAgregarLinea(){
    let nombre = document.getElementById('input-nombre-linea').value;
    let descripcion = document.getElementById('desc-linea').value;;
    let src = document.getElementById('input-imagen-linea').value;
    src = src.substring(12,src.length);
    let contenedorProductos = document.getElementById('opciones-productos-crear');
    let productos = contenedorProductos.getElementsByClassName('producto-seleccionado');
    productos = filtradoProductos(productos);
    let transaccion = {nombre: nombre, descripcion: descripcion, src: src, productos: productos};
    let transaccionJSON = JSON.stringify(transaccion);
    console.log(transaccionJSON);
    let campos = [nombre, src, descripcion];
    if(validar(campos)){
        fetch('http://localhost:8080/Administrador/lineas/agregar-linea', {
            method: 'Post',
            body: transaccionJSON
        }).then(x => console.log('ok'))
            .catch(e => {
            console.log(e);
        });  
    }else{
        alert('Completar todos los campos')
    }
    
}

function botonAgregarCombo(){
    let nombre = document.getElementById('input-nombre-combo').value;
    let descripcion = document.getElementById('desc-combo').value;;
    let src = document.getElementById('input-imagen-combo').value;
    let precio = document.getElementById('input-precio-combo').value;
    src = src.substring(12,src.length);
    let transaccion = {nombre: nombre, descripcion: descripcion, src: src, precio: precio};
    let transaccionJSON = JSON.stringify(transaccion);
    console.log(transaccionJSON);
    fetch('http://localhost:8080/Administrador/combos/agregar-combo', {
        method: 'Post',
        body: transaccionJSON
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });
}

function botonEditarLinea(idLinea){
    idLinea = idLinea.substring(12, idLinea.length);
    console.log(idLinea);
    let nombre = document.getElementById('input-nombre-editarLinea').value;
    let descripcion = document.getElementById('desc-linea-editar').value;;
    let src = document.getElementById('input-imagen-editarLinea').value;
    src = src.substring(12,src.length);
    let contenedorProductos = document.getElementById('opciones-productos-editar');
    let productos = contenedorProductos.getElementsByClassName('producto-seleccionado');
    productos = filtradoProductos(productos);
    let transaccion = {cod_linea: idLinea, nombre: nombre, descripcion: descripcion, src: src, productos: productos};
    let transaccionJSON = JSON.stringify(transaccion);
    console.log(transaccionJSON);
    fetch('http://localhost:8080/Administrador/lineas/editar-linea', {
        method: 'Post',
        body: transaccionJSON
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });
    // location.reload()  
}
function botonEditarCombo(idCombo){
    idCombo = idCombo.substring(12, idCombo.length);
    console.log(idCombo);
    let nombre = document.getElementById('input-nombre-editarCombo').value;
    let descripcion = document.getElementById('desc-combo-editar').value;;
    let src = document.getElementById('input-imagen-editarCombo').value;
    let precio = document.getElementById('input-precio-editarCombo').value;
    src = src.substring(12,src.length);
    let transaccion = {cod_combo: idCombo, nombre: nombre, descripcion: descripcion, src: src, precio: precio};
    let transaccionJSON = JSON.stringify(transaccion);
    console.log(transaccionJSON);
    fetch('http://localhost:8080/Administrador/combos/editar-combo', {
        method: 'Post',
        body: transaccionJSON
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });
}

//Ocultar combos
function ocultarCombo(clase_idCombo){
    let idCombo = clase_idCombo.substring(12, clase_idCombo.length);
    let cardIMG = document.getElementById('img-combo-'+idCombo);
    let card = document.getElementById('card-combo-'+idCombo);
    card.style.backgroundColor = "#ACACAC";
    cardIMG.style.filter = "grayscale(100%)";
    fetch('http://localhost:8080/Administrador/combos/ocultar-combo', {
        method: 'Post',
        body: JSON.stringify({cod_combo: idCombo, visible:0})
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });
    location.reload();
}

//Ocultar lineas

//Ocultar combos
function ocultarLinea(clase_idLinea){
    let idLinea = clase_idLinea.substring(12, clase_idLinea.length);
    let cardIMG = document.getElementById('img-linea-'+idLinea);
    let card = document.getElementById('card-linea-'+idLinea);
    card.style.backgroundColor = "#ACACAC";
    cardIMG.style.filter = "grayscale(100%)";
    fetch('http://localhost:8080/Administrador/lineas/ocultar-linea', {
        method: 'Post',
        body: JSON.stringify({cod_linea: idLinea, visible:0})
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });
    location.reload();
}


//Eliminar
function botonEliminarLinea(clase_idLinea){
    let idLinea = clase_idLinea.substring(12, clase_idLinea.length);
    fetch('http://localhost:8080/Administrador/lineas/eliminar-linea', {
        method: 'Post',
        body: JSON.stringify({cod_linea: idLinea})
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });

    location.reload();
    // alert('Se eliminó correctamente');
}
function botonEliminarCombo(clase_idCombo){
    let idCombo = clase_idCombo.substring(12, clase_idCombo.length);
    fetch('http://localhost:8080/Administrador/combos/eliminar-combo', {
        method: 'Post',
        body: JSON.stringify({cod_combo: idCombo})
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });

    location.reload();
    // alert('Se eliminó correctamente');
}
function filtradoProductos(lista){
    let nuevaLista = [];
    for(i=0;i<lista.length;i++){
        let id = (lista[i].id);
        id = id.substring(9, id.length);  
        nuevaLista.push(id);
    }
    return nuevaLista;
}

//Validar que el campo haya sido completado
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
